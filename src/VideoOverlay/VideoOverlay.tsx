import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import './VideoOverlay.scss'

type VideoOverlayProps = {
  classname?: string
}

const VideoOverlay: FunctionComponent<VideoOverlayProps> = ({ classname }) => {
  const className = cx(classname)

  return <g className={className}></g>
}

export default VideoOverlay
