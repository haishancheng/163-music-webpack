export default function(){
  let view = {
    el: ".editArea-wrapper",
    template: `
      <div class="editArea">
        <h1>新建歌单</h1>
        <div class="row">
          <label>歌单名称</label>
          <input type="text" name="name" value="__name__">
        </div>
        <div class="row">
          <label>歌单简介</label>
          <textarea name="brief">__brief__</textarea>
          </div>
        <div class="row">
          <label>封面外链</label>
          <input type="text" name="cover" value="__cover__">
        </div>
        <div class="row">
            <label>包含歌曲</label>
            <ol class="songList-box"></ol>
        </div>
        <div class="button-wrapper">
            <div class="button delete">删&nbsp;&nbsp;除</div>
            <div class="button confirm">确&nbsp;&nbsp;定</div>
        </div>
      </div>
    `,
    reset(){
      this.render()
      this.renderSongListBox()
    },
    render(data = {songSheet:{name:'',cover:'',brief:'',id:''}, songSheetSongs:[]}){
      let placeholders = ['name', 'brief', 'cover']
      let html = data.songSheet.id ? this.template.replace('新建歌单','编辑歌单') : this.template
      
      placeholders.map((placeholder) => {
        html = html.replace(`__${placeholder}__`, data.songSheet[placeholder] || '')//data[placeholder]为undefined的话就换成''
      })
      $(this.el).html(html)
    },
    renderSongListBox(data = {songSheet:{name:'',cover:'',brief:'',id:''}, songSheetSongs:[]}){
      $(this.el).find('.songList-box').empty()
      if(data.songSheetSongs.length){
        data.songSheetSongs.map((songSheetSong) => {
          $(this.el).find('.songList-box').append(
            $(`
                <li class="song">
                  __songName__
                  <svg class="icon icon-delete1" aria-hidden="true">
                    <use xlink:href="#icon-delete1"></use>
                  </svg>
                </li>
              `.replace('__songName__', songSheetSong.name)
            ).attr('data-song-id', songSheetSong.id)
          )
        })
      }else{
        $(this.el).find('.songList-box').append($('<p class="prompt">请选取右列的歌曲加入本歌单</p>'))
      }
    }
  }

  let model = {
    data: {
      songSheet: {
        name:'', cover:'', brief:'', id:''
      },
      songSheetSongs: []
    },
    create(data){
      var SongSheet = AV.Object.extend('SongSheet');
      var songSheet = new SongSheet()

      return songSheet.save(data).then((newSongSheet) => {
        let {id, attributes} = newSongSheet
        Object.assign(this.data.songSheet, Object.assign({id: id}, attributes))

        //设置关联
        this.data.songSheetSongs.forEach((songSheetSong)=>{
          var song = AV.Object.createWithoutData('Song', songSheetSong.id)
          song.set('dependent', songSheet)
          song.save()
        })
      })
    },
    update(data){
      var songSheet = AV.Object.createWithoutData('SongSheet', this.data.songSheet.id);
      songSheet.set('name', data.name);
      songSheet.set('cover', data.cover);
      songSheet.set('brief', data.brief);

      //先解除之前的依赖
      this.removeDependent(this.data.songSheet.id)

      return songSheet.save().then((newSongSheet) => {
        Object.assign(this.data.songSheet, Object.assign({id: newSongSheet.id}, newSongSheet.attributes))
        //设置关联
        this.data.songSheetSongs.forEach((songSheetSong)=>{
          var song = AV.Object.createWithoutData('Song', songSheetSong.id)
          song.set('dependent', songSheet)
          song.save()
        })
      })
    },
    delete(data){
      var songSheet = AV.Object.createWithoutData('SongSheet', data.songSheet.id)
      return songSheet.destroy().then((success) => {
        this.data = {songSheet:{name:'',cover:'',brief:'',id:''}, songSheetSongs:[]}
        return success.id
      })
    },
    removeDependent(songSheetId){
      var songSheet = AV.Object.createWithoutData('SongSheet', songSheetId);
      var query = new AV.Query('Song');
      query.equalTo('dependent', songSheet);
      query.find().then((songs) => {
        songs.map((song)=>{
          var song = AV.Object.createWithoutData('Song', song.id);
          var songSheet2 = AV.Object.createWithoutData('SongSheet', '5b2a26779f54540035a990fe');
          song.set('dependent', songSheet2);
          return song.save()
        })
      })
    }
  }

  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      this.bindEvents()
      this.bindEventHub()
    },
    creatSongSheet(){
      let needs = ['name', 'brief','cover']
      let data = {}
      needs.map((need) => {
          data[need] = $(this.view.el).find(`[name="${need}"]`).val()
      })
      this.model.create(data).then(() => {
        window.eventHub.emit('creatSongSheetSuccess', JSON.parse(JSON.stringify(this.model.data)))
        window.eventHub.emit('clearSongListAcitve',{songSheet:{name:'',cover:'',brief:'',id:''}, songSheetSongs:[]})
        this.view.reset()
      })
    },
    updateSongSheet(){
      let needs = ['name', 'brief','cover']
      let data = {}
      needs.map((need) => {
          data[need] = $(this.view.el).find(`[name="${need}"]`).val()
      })
      this.model.update(data).then(() => {
        //更新成功后通知song-list更新
        window.eventHub.emit('updateSongSheet', JSON.parse(JSON.stringify(this.model.data))) //同上面的新建，需要深拷贝
      })

    },
    deleteSongSheet(){
      this.model.delete(this.model.data).then((id) => {
        window.eventHub.emit('deleteSongSheet', {id: id})
        window.eventHub.emit('clearSongListAcitve',{songSheet:{name:'',cover:'',brief:'',id:''}, songSheetSongs:[]})
        this.view.reset()
      })
    },
    bindEvents(){
      $(this.view.el).on('click', 'li', (e)=>{
        let id = $(e.currentTarget).attr('data-song-id')
        this.model.data.songSheetSongs = this.model.data.songSheetSongs.filter((songSheetSong)=>{
          return songSheetSong.id !== id
        })
        this.view.renderSongListBox(this.model.data)
        window.eventHub.emit('deleteSong', JSON.parse(JSON.stringify(this.model.data)))
      })
      $(this.view.el).on('click', '.confirm', (e) => {
        if(this.model.data.songSheet.id){
          //id存在，相当于已存入数据库的，修改的歌单
          this.updateSongSheet()
        }else{
          //id不存在，相当于未存入数据库的，新建的歌单
          this.creatSongSheet()
        }
      })
      $(this.view.el).on('click', '.delete', (e) => {
        if(this.model.data.songSheet.id){
          this.deleteSongSheet()
        }
      })
    },
    bindEventHub(){
      window.eventHub.on('addSong', (data)=>{
        this.model.data.songSheetSongs = data.songSheetSongs
        this.view.renderSongListBox(this.model.data)
      })
      window.eventHub.on('selectSongSheet', (data)=>{
        this.model.data = data
        this.view.render(this.model.data)
        this.view.renderSongListBox(this.model.data)
      })
      window.eventHub.on('newSongSheet',() => {
        if(this.model.data.songSheet.id){
          this.model.data = {songSheet:{name:'',cover:'',brief:'',id:''}, songSheetSongs:[]}
          this.view.render(this.model.data)
          window.eventHub.emit('clearSongListAcitve', JSON.parse(JSON.stringify(this.model.data)))
        }
      })
    }
  }

  controller.init(view, model)

}