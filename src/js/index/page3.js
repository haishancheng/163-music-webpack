import page3SearchArea from './page3-searchArea'
import page3HotSearch from './page3-hotSearch'
import page3BestMatch from './page3-bestMatch'

export default function(){
  let view = {
    el: '#page3',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    }
  }

  let model = {}

  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.init()
      this.bindEventHub()
      page3SearchArea()
      page3HotSearch()
      page3BestMatch()
    },
    bindEventHub(){
      window.eventHub.on('selectTab', (tabName)=>{
        if(tabName === 'page3'){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    }
  }

  controller.init(view, model)
}