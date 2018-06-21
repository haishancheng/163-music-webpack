export default function(){
  let view = {
    el: '.songSheetList',
    template: `
      <li>
        <img src="__url__" alt="封面">
        <p>__brief__</p>
      </li>
    `,
    init(){
      this.$el = $(this.el)
    },
    render(data){
      let {songs} = data
      songs.map((song,index) => {
        let order = (index + 1).toString().length === 2 ? (index + 1) : ('0' + (index + 1))
        let $li = $(
          this.template.replace('{{name}}', song.name)
            .replace('{{singer}}', song.singer)
            .replace('{{id}}', song.id)
            .replace('{{order}}', order)
        )
        this.$el.find('ol.songList').append($li)
      })
      this.$el.find('ol.songList').append($('<p class="tip">已显示所有热歌</p>'))
    }
  }
  let model = {
    data:{
      songSheets:[]
    },
    fetch(){
      var query = new AV.Query('Song');
      query.equalTo('isHot', true);
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
      this.view.init()
      this.model.fetch().then(() => {
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view, model)
}