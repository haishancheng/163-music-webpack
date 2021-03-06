export default function(){
  let view = {
    el: '.best-match',
    template: `
      <li>
        <a href="./song.html?id={{id}}">
          <h3>{{name}}</h3>
          <p>
            <svg class="SQsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="#FE672E">
              <path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z"></path>
              <path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z"></path>
              <path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z"></path>
            </svg>{{singer}}
          </p>
          <svg class="icon icon-play" aria-hidden="true">
              <use xlink:href="#icon-play"></use>
          </svg>
        </a>
      </li>
    `,
    init(){
      this.$el = $(this.el)
    },
    render(data){
      this.$el.find('.matchList').empty()
      if(data.songs.length){
        data.songs.map((song) => {
          let $li = $(
            this.template.replace('{{name}}', song.name)
                        .replace('{{singer}}', song.singer)
                        .replace('{{id}}', song.id)
          )
          this.$el.find('.matchList').append($li)
        })
      }else{
        let $li = $('<p class="notFind">不好意思,没有你要听的歌 ╮(╯﹏╰)╭</p>')
        this.$el.find('.matchList').append($li)
      }
    },
    show(){
      this.$el.addClass('show')
    },
    hide(){
      this.$el.removeClass('show')
    }
  }

  let model = {
    data:{
      songs:[]
    }
  }

  let controller = {
    init(view, model){
      this.view = view
      this.model = model
      this.view.init()
      this.bindEventHub()
    },
    bindEventHub(){
      window.eventHub.on('choose', (data)=>{
        this.view.show()
        this.model.data = data
        this.view.render(this.model.data)
      })
      window.eventHub.on('clearSearch', ()=>{
        this.view.hide()
      })
      window.eventHub.on('searchSuccess', (data)=>{
        this.view.show()
        this.model.data.songs = data.songs
        this.view.render(this.model.data)
      })
    }
  }

  controller.init(view, model)
}