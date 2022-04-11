import React, { FunctionComponent, SyntheticEvent, useCallback } from 'react'
import cx from 'classnames'
import './VideoPlayer.scss'

type VideoPlayerProps = {
  classname?: string
  timeChange: (time: number) => void
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  classname,
  timeChange,
}) => {
  const className = cx(classname)

  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement, Event>) => {
      timeChange((event.target as HTMLVideoElement).currentTime * 1000)
    },
    [timeChange],
  )

  return (
    <video
      className={className}
      controls
      src={'/data/porshe.mp4'}
      onTimeUpdate={onTimeUpdate}
    ></video>
  )
}

export default VideoPlayer
