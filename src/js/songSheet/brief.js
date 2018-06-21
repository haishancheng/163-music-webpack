export default function(){
  let view = {
    el: 'section.brief',
    render(data){
      $(this.el).html(data.brief.replace(/\r|\n/g,"<br>"))
    }
  }

  let model = {
    data:{
    }
  }

  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.bindEvents()
      this.bindEventHub()
    },
    bindEvents(){
      $(this.view.el).on('click', ()=>{
        if($(this.view.el).hasClass('show')){
          $(this.view.el).removeClass('show')
        }else{
          $(this.view.el).addClass('show')
        }
      })
    },
    bindEventHub(){
      window.eventHub.on('songSheetId',(data)=>{
        this.model.data = data
        this.view.render(this.model.data)
      })
    }
  }

  controller.init(view, model)
}