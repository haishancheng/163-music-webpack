export default function(){
  let view = {
    el: 'header',
    template:`
      <div class="cover">
        <img src="__cover__">
      </div>
      <p class="songSheetName">__name__</p>
    `,
    render(data){
      $(this.el).css('background-image', `url(${data.cover})`)
      let $template = $(this.template.replace('__cover__', data.cover)
                                .replace('__name__', data.name))
      $(this.el).append($template)
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
      this.bindEventHub()
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