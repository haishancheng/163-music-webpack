import '../../css/songSheet.css'
import av from '../common/av'
import eventHub from '../common/event-hub'

import title from './title'
import brief from './brief'
import musicList from './musicList'

{
  let view = {}

  let model = {
    data:{
    },
    fetch(id){
      var query = new AV.Query('SongSheet')
      return query.get(id).then((songSheet) => {
        Object.assign(this.data, Object.assign({id: songSheet.id}, songSheet.attributes))
      })
    }
  }
  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      title()
      brief()
      musicList()

      let id = this.getSongId()
      this.model.fetch(id).then(()=>{
        window.eventHub.emit('songSheetId', JSON.parse(JSON.stringify(this.model.data)))
      })
      
    },
    getSongId(){
      let search = window.location.search
      if(search.indexOf('?') === 0){
        search = search.substring(1)
      }
      let array = search.split('&').filter((v) => {
        return v
      })
      let id = ''
      for(let i=0; i<array.length; i++){
        let kv = array[i].split('=')
        let k = kv[0]
        let v = kv[1]
        if(k === 'id'){
          id = v
          break
        }
      }

      return id
    }
  }

  av()
  eventHub()
  controller.init(view, model)
}