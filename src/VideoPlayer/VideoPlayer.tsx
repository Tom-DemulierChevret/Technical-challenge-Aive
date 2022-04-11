import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import './VideoPlayer.scss'

type VideoPlayerProps = {
  classname: string
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({ classname }) => {
  const className = cx(classname)

  return <video className={className} controls src={'/data/porshe.mp4'}></video>
}

export default VideoPlayer
