!function(e){var n={};function t(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(i,s,function(n){return e[n]}.bind(null,s));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=19)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){window.eventHub={events:{},emit:function(e,n){for(var t in this.events)t===e&&this.events[t].map(function(e){e.call(void 0,n)})},on:function(e,n){void 0===this.events[e]&&(this.events[e]=[]),this.events[e].push(n)}}}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){AV.init({appId:"IbKHNlRGRAFjYmmzC1gxhtdE-gzGzoHsz",appKey:"6SlQPqCcy8KwHVEhJpFeBFpG"})}},,,,,,,,function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n,this.view.init(),this.bindEventHub()},bindEventHub:function(){var e=this;window.eventHub.on("choose",function(n){e.view.show(),e.model.data=n,e.view.render(e.model.data)}),window.eventHub.on("clearSearch",function(){e.view.hide()}),window.eventHub.on("searchSuccess",function(n){e.view.show(),e.model.data.songs=n.songs,e.view.render(e.model.data)})}}).init({el:".best-match",template:'\n      <li>\n        <h3>{{name}}</h3>\n        <p>\n          <svg class="SQsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="#FE672E">\n            <path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z"></path>\n            <path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z"></path>\n            <path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z"></path>\n          </svg>{{singer}}\n        </p>\n        <a class="playButton" href="./song.html?id={{id}}">\n          <svg class="icon icon-play" aria-hidden="true">\n              <use xlink:href="#icon-play"></use>\n          </svg>\n        </a>\n      </li>\n    ',init:function(){this.$el=$(this.el)},render:function(e){var n=this;if(this.$el.find(".matchList").empty(),e.songs.length)e.songs.map(function(e){var t=$(n.template.replace("{{name}}",e.name).replace("{{singer}}",e.singer).replace("{{id}}",e.id));n.$el.find(".matchList").append(t)});else{var t=$('<p class="notFind">不好意思,没有你要听的歌 ╮(╯﹏╰)╭</p>');this.$el.find(".matchList").append(t)}},show:function(){this.$el.addClass("show")},hide:function(){this.$el.removeClass("show")}},{data:{songs:[]}})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n,this.view.init(),this.bindEvents(),this.bindEventHub()},bindEvents:function(){var e=this;this.view.$el.find(".hot-search-simple").on("click","li",function(n){var t=$(n.currentTarget).text();e.model.query(t).then(function(){var n=JSON.stringify(e.model.data),t=JSON.parse(n);window.eventHub.emit("choose",t)})})},bindEventHub:function(){var e=this;window.eventHub.on("choose",function(){e.view.hide()}),window.eventHub.on("clearSearch",function(){e.view.show()}),window.eventHub.on("searchSuccess",function(){e.view.hide()})}}).init({el:".hot-search",init:function(){this.$el=$(this.el)},show:function(){this.$el.addClass("show")},hide:function(){this.$el.removeClass("show")}},{data:{songs:[]},query:function(e){var n=this,t=new AV.Query("Song");return t.equalTo("name",e),t.find().then(function(e){n.data.songs=e.map(function(e){return Object.assign({id:e.id},e.attributes)})})}})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n,this.view.init(),this.bindEvents(),this.bindEventHub()},bindEvents:function(){var e=this;this.view.$el.find(".icon-delete").on("click",function(n){e.view.render(),e.view.hideDeleteIcon(),window.eventHub.emit("clearSearch")}),this.view.$el.find("input").on("input propertychange",function(n){""===$(n.currentTarget).val()?(e.view.hideDeleteIcon(),window.eventHub.emit("clearSearch")):(e.view.showDeleteIcon(),e.model.searchLock=!0,e.model.search($(n.currentTarget).val()).then(function(){var n=JSON.stringify(e.model.data),t=JSON.parse(n);window.eventHub.emit("searchSuccess",t),e.model.searchLock=!1}))})},bindEventHub:function(){var e=this;window.eventHub.on("choose",function(n){e.view.render(n.songs[0].name),e.view.showDeleteIcon()})}}).init({el:".search-area",init:function(){this.$el=$(this.el)},render:function(e){this.$el.find("input").val(e||"")},showDeleteIcon:function(){this.$el.find(".icon-delete").addClass("show")},hideDeleteIcon:function(){this.$el.find(".icon-delete").removeClass("show")}},{data:{songs:[],searchLock:!1},search:function(e){var n=this,t=new AV.Query("Song");return t.contains("name",e),t.find().then(function(e){n.data.songs=e.map(function(e){return Object.assign({id:e.id},e.attributes)})})}})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n,this.view.init(),this.bindEventHub(),(0,i.default)(),(0,s.default)(),(0,o.default)()},bindEventHub:function(){var e=this;window.eventHub.on("selectTab",function(n){"page3"===n?e.view.show():e.view.hide()})}}).init({el:"#page3",init:function(){this.$el=$(this.el)},show:function(){this.$el.addClass("active")},hide:function(){this.$el.removeClass("active")}},{})};var i=a(t(11)),s=a(t(10)),o=a(t(9));function a(e){return e&&e.__esModule?e:{default:e}}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){var t=this;this.view=e,this.model=n,this.view.init(),this.model.fetch().then(function(){t.view.render(t.model.data)})}}).init({el:"section.hotList",template:'\n      <li>\n        <span class="order">{{order}}</span>\n        <h3>{{name}}</h3>\n        <p>\n          <svg class="SQsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="#FE672E">\n            <path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z"></path>\n            <path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z"></path>\n            <path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z"></path>\n          </svg>{{singer}}\n        </p>\n        <a class="playButton" href="./song.html?id={{id}}">\n          <svg class="icon icon-play" aria-hidden="true">\n              <use xlink:href="#icon-play"></use>\n          </svg>\n        </a>\n      </li>\n    ',init:function(){this.$el=$(this.el)},render:function(e){var n=this;e.songs.map(function(e,t){var i=2===(t+1).toString().length?t+1:"0"+(t+1),s=$(n.template.replace("{{name}}",e.name).replace("{{singer}}",e.singer).replace("{{id}}",e.id).replace("{{order}}",i));n.$el.find("ol.songList").append(s)}),this.$el.find("ol.songList").append($('<p class="tip">已显示所有热歌</p>'))}},{data:{songs:[]},fetch:function(){var e=this,n=new AV.Query("Song");return n.equalTo("isHot",!0),n.find().then(function(n){e.data.songs=n.map(function(e){return Object.assign({id:e.id},e.attributes)})})}})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n,this.view.init(),this.bindEventHub(),(0,o.default)()},bindEventHub:function(){var e=this;window.eventHub.on("selectTab",function(n){"page2"===n?e.view.show():e.view.hide()})}}).init({el:"#page2",init:function(){this.$el=$(this.el),this.setTime()},show:function(){this.$el.addClass("active")},hide:function(){this.$el.removeClass("active")},setTime:function(){var e=new Date,n=e.getMonth()+1,t=e.getDate();this.$el.find(".hotTop .month").text(n),this.$el.find(".hotTop .day").text(t)}},{})};var i,s=t(13),o=(i=s)&&i.__esModule?i:{default:i}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n}}).init({el:"section.songSheet"},{})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){var t=this;this.view=e,this.model=n,this.view.init(),this.view.render(this.model.data),this.model.fetch().then(function(){t.view.render(t.model.data)})}}).init({el:"section.newestMusic",template:'\n      <li>\n        <h3>{{name}}</h3>\n        <p>\n          <svg class="SQsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="#FE672E">\n            <path d="M537.456788 684.682921l198.722994 0 18.48398 18.023492c5.709025 5.565762 13.102413 8.336876 20.490683 8.336876 7.636934 0 15.266705-2.962471 21.018709-8.859785 11.317767-11.607362 11.083429-30.191626-0.522909-41.509393l-17.499559-17.063631L778.150686 373.540532c0-16.210193-13.143345-29.352515-29.353538-29.352515L537.456788 344.188017c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 281.788851C508.104273 671.539576 521.246595 684.682921 537.456788 684.682921zM566.810327 402.893047l152.634306 0L719.444633 586.367755l-2.808976-2.739391c-11.611455-11.317767-30.193673-11.081383-41.509393 0.522909-11.317767 11.607362-11.083429 30.191626 0.522909 41.509393l0.323365 0.315178L566.810327 625.975844 566.810327 402.893047z"></path>\n            <path d="M220.442668 625.976868c-16.210193 0-29.352515 13.143345-29.352515 29.353538s13.143345 29.352515 29.352515 29.352515l211.342406 0c16.210193 0 29.352515-13.143345 29.352515-29.352515L461.137589 514.433422c0-16.210193-13.143345-29.353538-29.352515-29.353538L249.796206 485.079884l0-82.187861 181.989891 0c16.210193 0 29.352515-13.143345 29.352515-29.352515 0-16.210193-13.143345-29.352515-29.352515-29.352515L220.442668 344.186993c-16.210193 0-29.352515 13.143345-29.352515 29.352515l0 140.893914c0 16.210193 13.143345 29.352515 29.352515 29.352515l181.989891 0 0 82.189907L220.442668 625.975844z"></path>\n            <path d="M933.722904 236.364289 88.354304 236.364289c-13.508665 0-24.461111 10.952446-24.461111 24.461111L63.893192 768.045537c0 13.508665 10.952446 24.461111 24.461111 24.461111l845.367577 0c13.508665 0 24.461111-10.952446 24.461111-24.461111L958.182992 260.824377C958.182992 247.315712 947.230546 236.364289 933.722904 236.364289zM909.261793 743.584426 112.815415 743.584426 112.815415 285.285488l796.446377 0L909.261793 743.584426z"></path>\n          </svg>{{singer}}\n        </p>\n        <a class="playButton" href="./song.html?id={{id}}">\n          <svg class="icon icon-play" aria-hidden="true">\n              <use xlink:href="#icon-play"></use>\n          </svg>\n        </a>\n      </li>\n    ',init:function(){this.$el=$(this.el)},render:function(e){var n=this;e.songs.map(function(e){var t=$(n.template.replace("{{name}}",e.name).replace("{{singer}}",e.singer).replace("{{id}}",e.id));n.$el.find("ol.songList").append(t)})}},{data:{songs:[]},fetch:function(){var e=this,n=new AV.Query("Song");return n.equalTo("isNewest",!0),n.find().then(function(n){e.data.songs=n.map(function(e){return Object.assign({id:e.id},e.attributes)})})}})}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n,this.view.init(),this.bindEventHub(),(0,i.default)(),(0,s.default)()},bindEventHub:function(){var e=this;window.eventHub.on("selectTab",function(n){"page1"===n?e.view.show():e.view.hide()})}}).init({el:"#page1",init:function(){this.$el=$(this.el)},show:function(){this.$el.addClass("active")},hide:function(){this.$el.removeClass("active")}},{})};var i=o(t(16)),s=o(t(15));function o(e){return e&&e.__esModule?e:{default:e}}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(){({init:function(e,n){this.view=e,this.model=n,this.view.init(),this.bindEvents()},bindEvents:function(){this.view.$el.on("click","li",function(e){var n=$(e.currentTarget),t=n.attr("data-tab-name");n.addClass("active").siblings(".active").removeClass("active"),window.eventHub.emit("selectTab",t)})}}).init({el:".topTabs",init:function(){this.$el=$(this.el)}},{})}},function(e,n,t){"use strict";t(33);var i=u(t(1)),s=u(t(0)),o=u(t(18)),a=u(t(17)),c=u(t(14)),l=u(t(12));function u(e){return e&&e.__esModule?e:{default:e}}(0,i.default)(),(0,s.default)(),(0,o.default)(),(0,a.default)(),(0,c.default)(),(0,l.default)()},,,,,,,,,,,,,,function(e,n){}]);