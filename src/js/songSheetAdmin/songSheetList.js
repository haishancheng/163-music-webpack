export default function(){
  let view = {
    el: '.songSheetList',
    template: `
      <li>
        <svg class="icon icon-playlist" aria-hidden="true">
            <use xlink:href="#icon-playlist"></use>
        </svg>
        <p title="{{name}}" class="song">{{name}}</p>
      </li>
    `,
    render(data){
      $(this.el).empty()
      let {songSheets, selectSongSheetId} = data
      songSheets.map((songSheet)=>{
        let $li = $(
          this.template.replace(/{{name}}/g, songSheet.name||'无名歌单')
        ).attr('data-songSheet-id', songSheet.id)
        if(songSheet.id === selectSongSheetId){
          $li.addClass('active')
        }
        $(this.el).append($li)
      })
    },
    clearActive(){
      $(this.el).find('.active').removeClass('active')
    }

  }

  let model = {
    data: {
      songSheets: [],
      selectSongSheetId: undefined,
      selectSongSheetSongs: []
    },
    fetch(){
      var query = new AV.Query('SongSheet');
      return query.find().then((songSheets) => {
        this.data.songSheets = songSheets.map((songSheet) => {
          return Object.assign({id: songSheet.id}, songSheet.attributes)
        })
      })
    },
    findSongSheetSongs(songSheetId){
      var songSheet = AV.Object.createWithoutData('SongSheet', songSheetId);
      var query = new AV.Query('Song');
      query.equalTo('dependent', songSheet);
      return query.find().then((songs) => {
        this.data.selectSongSheetSongs = songs.map((song)=>{
          return Object.assign({id: song.id}, song.attributes)
        })
      })
    }
  }

  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.bindEvents()
      this.bindEventHub()
      this.getAllSongSheets()
    },
    getAllSongSheets(){
      return this.model.fetch().then(() => {
        this.view.render(this.model.data)
      })
    },
    bindEvents(){
      $(this.view.el).on('click', 'li', (e) => {
        let songSheetId = $(e.currentTarget).attr('data-songSheet-id')
        this.model.data.selectSongSheetId = songSheetId
        this.view.render(this.model.data)
        this.model.findSongSheetSongs(this.model.data.selectSongSheetId).then(()=>{
          let data = {}
          data['songSheetSongs'] = this.model.data.selectSongSheetSongs
          let songSheets = this.model.data.songSheets
          for(let i = 0; i < songSheets.length; i++){
            if(songSheets[i].id === songSheetId){
              data['songSheet'] = songSheets[i]
              break
            }
          }
          let object = JSON.parse(JSON.stringify(data))
          window.eventHub.emit('selectSongSheet', object)
        })
      })
    },
    bindEventHub(){
      window.eventHub.on('creatSongSheetSuccess', (data)=>{
        this.model.data.songSheets.push(data.songSheet)
        this.view.render(this.model.data)
      })
      window.eventHub.on('deleteSongSheet', (data)=>{
        this.model.data.songSheets = this.model.data.songSheets.filter((songSheet) => {
          return songSheet.id !== data.id
        })
        this.model.data.selectSongSheetId = undefined
        this.view.render(this.model.data)
      })
      window.eventHub.on('newSongSheet', () => {
        this.view.clearActive()
        this.model.data.selectSongSheetSongs = []
        this.model.data.selectSongSheetId = undefined
      })
      window.eventHub.on('updateSongSheet', (data) => {
        let songSheets = this.model.data.songSheets
        for(let i = 0; i < songSheets.length; i++){
          if(songSheets[i].id === data.songSheet.id){
            songSheets[i] = data.songSheet
          }
        }
        this.view.render(this.model.data)
      })
    }
  }

  controller.init(view, model)
}