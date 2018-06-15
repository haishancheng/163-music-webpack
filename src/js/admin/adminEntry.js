import '../../css/default.css'

import av from '../common/av'
import eventHub from '../common/event-hub'
import editSong from './edit-song'
import loading from './loading'
import newSong from './new-song'
import songList from './song-list'
import uploadSong from './upload-song'
av()
eventHub()
editSong()
// loading() 暂不开启此功能
newSong()
songList()
uploadSong()