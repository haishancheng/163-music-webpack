export default function(){
  let view = {
    el: '.songSheetList',
    template: `
      <li>
        <a href="./songSheet.html?id=__id__">
          <img src="__cover__" alt="封面">
          <p>__name__</p>
        </a>
      </li>
    `,
    init(){
      this.$el = $(this.el)
    },
    render(data){
      data.songSheets.map((songSheet)=>{
        let $li = $(
          this.template.replace('__cover__',songSheet.cover)
                  .replace('__name__', songSheet.name)
                  .replace('__id__', songSheet.id)
        ).attr('data-songSheet-id', songSheet.id)
        this.$el.append($li)
      })
    }
  }
  let model = {
    data:{
      songSheets:[]
    },
    fetch(){
      var query = new AV.Query('SongSheet');
      return query.find().then((songSheets) => {
        this.data.songSheets = songSheets.map((songSheet) => {
          return Object.assign({id: songSheet.id}, songSheet.attributes)
        })
      })
    }
  }
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.init()
      this.model.fetch().then(()=>{
        this.view.render(this.model.data)
      })
    }
  }
  controller.init(view, model)
}