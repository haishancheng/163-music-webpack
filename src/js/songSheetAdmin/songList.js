export default function(){
  let view = {
    el: ".songList",
    template: `
      <li>
        <svg class="icon icon-music" aria-hidden="true">
          <use xlink:href="#icon-music"></use>
        </svg>
        <div class="songInfo">
          <p title="{{name}}" class="song">{{name}}</p>
          <p title="{{singer}}" class="singer">
            <svg class="icon icon-music" aria-hidden="true">
              <use xlink:href="#icon-geshou"></use>
            </svg>
            {{singer}}
          </p>
        </div>
      </li>
    `,
    render(data){
      $(this.el).empty()
      let {songs, songSheetSongs} = data
      songs.map((song) => {
        let $li = $(
          this.template.replace(/{{name}}/g, song.name)
          .replace(/{{singer}}/g, song.singer)
        ).attr('data-song-id', song.id)
        for(let i = 0; i < songSheetSongs.length; i++){
          if(songSheetSongs[i].id === song.id){
            $li.addClass('active')
            break
          }
        }
        $(this.el).append($li)
      })
    }
  }

  let model = {
    data: {
      songs: [],
      songSheetSongs: []
    },
    fetch(){
      var query = new AV.Query('Song');
      return query.find().then((songs) => {
        this.data.songs = songs.map((song) => {
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
      this.getAllSongs()
    },
    getAllSongs(){
      return this.model.fetch().then(() => {
        this.view.render(this.model.data)
      })
    },
    bindEvents(){
      $(this.view.el).on('click', 'li', (e) => {
        let songId = $(e.currentTarget).attr('data-song-id')
        let isActive = $(e.currentTarget).hasClass('active')
        if(!isActive){
          let songName = this.model.data.songs.find((song)=>{
            return song.id === songId
          }).name
          this.model.data.songSheetSongs.push({id: songId, name: songName})
        }else{
          this.model.data.songSheetSongs = this.model.data.songSheetSongs.filter((songSheetSong)=>{
            return songSheetSong.id !== songId
          })
        }

        this.view.render(this.model.data)
        let object = JSON.parse(JSON.stringify(this.model.data))
        window.eventHub.emit('addSong', object)
      })
    },
    bindEventHub(){
      window.eventHub.on('deleteSong', (data)=>{
        this.model.data.songSheetSongs =  data.songSheetSongs
        this.view.render(this.model.data)
      })
      window.eventHub.on('selectSongSheet', (data)=>{
        this.model.data.songSheetSongs = data.songSheetSongs
        this.view.render(this.model.data)
      })
      window.eventHub.on('clearSongListAcitve', (data)=>{
        this.model.data.songSheetSongs = data.songSheetSongs
        this.view.render(this.model.data)
      })
    }
  }

  controller.init(view, model)

}