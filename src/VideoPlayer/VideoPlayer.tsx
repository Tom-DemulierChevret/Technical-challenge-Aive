import React, { FunctionComponent, SyntheticEvent, useCallback } from 'react'
import cx from 'classnames'
import './VideoPlayer.scss'

type VideoPlayerProps = {
  classname?: string
  timeChange: (time: number) => void
  renderingScaleChange: (renderingScale: number) => void
}

const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  classname,
  timeChange,
  renderingScaleChange,
}) => {
  const className = cx(classname)

  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement, Event>) => {
      timeChange((event.target as HTMLVideoElement).currentTime * 1000)
    },
    [timeChange],
  )

  const onLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement, Event>) => {
      const videoElement = event.target as HTMLVideoElement
      renderingScaleChange(videoElement.scrollWidth / videoElement.videoWidth)
    },
    [renderingScaleChange],
  )

  return (
    <video
      className={className}
      controls
      src={'/data/porshe.mp4'}
      onTimeUpdate={onTimeUpdate}
      onLoadedMetadata={onLoadedMetadata}
    ></video>
  )
}

export default VideoPlayer
