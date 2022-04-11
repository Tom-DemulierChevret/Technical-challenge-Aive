import React from 'react'
import './App.scss'
import VideoPlayer from './VideoPlayer/VideoPlayer'
import VideoOverlay from './VideoOverlay/VideoOverlay'

const App = () => {
  return (
    <div className={'App'}>
      <div className={'videoContainer'}>
        <VideoPlayer classname={'videoPlayer'} />
        <VideoOverlay classname={'videoOverlay'} />
      </div>
    </div>
  )
}

export default App
