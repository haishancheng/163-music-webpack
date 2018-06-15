import '../../css/song.css'
import av from '../common/av'
import eventHub from '../common/event-hub'
{
  let view = {
    el: '#app',
    render(data){
      let {song} = data
      if(song.cover){
        $(this.el).find('.page-cover').css('background-image', `url(${song.cover})`)
        $(this.el).find('.cover').css('background-image', `url(${song.cover})`)
      }else{
        $(this.el).find('.page-cover').css('background-image', `url(http://p9lfootse.bkt.clouddn.com/default-show.jpg)`)
        $(this.el).find('.cover').css('background-image', `url(http://p9lfootse.bkt.clouddn.com/default-show.jpg})`)
      }
      $(this.el).find('audio').attr('src', song.url)
      $(this.el).find('.song-description h1>.name').text(`${song.name} - `)
      $(this.el).find('.song-description h1>.singer').text(song.singer)
      let {lyrics} = song
      if(lyrics){
        $(this.el).find('.lines').empty()
        lyrics.split('\n').map((lineLyric) => {
          let p = document.createElement('p')
          let regex = /\[([\d:.]+)\](.*)/
          let matches = lineLyric.match(regex)
          if(matches){
            p.textContent = matches[2]
            let time = matches[1]
            let parts = time.split(':')
            let minutes = parts[0]
            let seconds = parts[1]
            let newTime = parseInt(minutes, 10) * 60 + parseFloat(seconds, 10)
            p.setAttribute('data-time', newTime)
          }else{
            p.textContent = lineLyric
          }
          $(this.el).find('.lyric > .lines').append(p)
        })
      }
    },
    showLyric(time){
      let $allP = $(this.el).find('.lyric > .lines > p')
      let $findP
      
      for(let i = 0; i < $allP.length; i++){
        if(i === $allP.length -1){
          $findP = $allP.eq(i)
          break
        } else{
          let currentTime = $allP.eq(i).attr('data-time')
          let nextTime = $allP.eq(i + 1).attr('data-time')
          //这里不能用currentTime <= time && time < nextTime)，因为前几句歌词的的time大于0的时候，会找不到对应的p，从而找到最后一个p，导致一开始lines块就上移
          if(time < nextTime){
            $findP = $allP.eq(i)
            break
          }
        }
      }
     
      let pHeight = $findP.offset().top
      let linesHeight = $(this.el).find('.lyric >.lines').offset().top//这里算的是lines距离顶部的高度，而不是lyric距离顶部的高度，因为下面是一次性移动lines（lines上面只能有一个transform:translateY属性），而不是叠加移动！！！*****
      let height = pHeight - linesHeight
      $(this.el).find('.lyric > .lines').css('transform', `translateY(-${height - 24}px)`)
      $findP.addClass('active').siblings('.active').removeClass('active')
    },
    play(){
      $(this.el).find('.disc-container').addClass('playing')
      $(this.el).find('audio')[0].play()
    },
    pause(){
      $(this.el).find('.disc-container').removeClass('playing')
      $(this.el).find('audio')[0].pause()
    }
  }

  let model = {
    data: {
      song:{
        id: '',
        name: '',
        singer: '',
        url: '',
        cover: ''
      }
    },
    get(id){
      var query = new AV.Query('Song')
      return query.get(id).then((song) => {
        Object.assign(this.data.song, Object.assign({id: song.id}, song.attributes))
      })
    }
  }

  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      let id = this.getSongId()
      this.model.get(id).then(() => {
        this.view.render(this.model.data)
      })
      this.bindEvents()
    },
    bindEvents(){
      $(this.view.el).find('.icon-play').on('click', ()=>{
        this.view.play()
      })
      $(this.view.el).find('.icon-pause').on('click', ()=>{
        this.view.pause()
      })
      $(this.view.el).find('audio').on('ended', ()=>{
        this.view.pause()
      })
      $(this.view.el).find('audio').on('timeupdate', (e)=>{
        this.view.showLyric(e.currentTarget.currentTime)
      })
    },
    getSongId(){
      let search = window.location.search
      // 查询参数search可能等于,需要解析:
      // ?id=2343214234234343&a=1&&b=2
      if(search.indexOf('?') === 0){
        search = search.substring(1)
      }
      let array = search.split('&').filter((v) => {
        // search.split('&') => ["id=2343214234234343", "a=1", "", "b=2"] 
        // fiter来过滤空字符串 => ["id=2343214234234343", "a=1", "b=2"]
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