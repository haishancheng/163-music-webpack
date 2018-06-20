export default function(){
  let view = {
    el: '.newSongSheet',
    active(){
      $(this.el).addClass('active')
    },
    deActive(){
      $(this.el).removeClass('active')
    }

  }

  let model = {
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
        window.eventHub.emit('newSongSheet')
      })
    },
    bindEventHub(){
      window.eventHub.on('selectSongSheet', ()=>{
        this.view.deActive()
      })
      window.eventHub.on('newSongSheet', ()=>{
        this.view.active()
      })
      window.eventHub.on('creatSongSheetSuccess', () => {
        this.view.active()
      })
      window.eventHub.on('deleteSongSheet', () => {
        this.view.active()
      })
    }
  }
  controller.init(view, model)
}