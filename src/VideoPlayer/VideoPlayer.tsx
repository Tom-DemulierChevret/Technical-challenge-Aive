import React, {
  FunctionComponent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'
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
  const videoRef = useRef(null)
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

  useEffect(() => {
    function handleResize() {
      if (videoRef.current) {
        const videoElement = videoRef.current as HTMLVideoElement
        renderingScaleChange(videoElement.scrollWidth / videoElement.videoWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [renderingScaleChange])

  return (
    <video
      ref={videoRef}
      className={className}
      controls
      src={'/data/porshe.mp4'}
      onTimeUpdate={onTimeUpdate}
      onLoadedMetadata={onLoadedMetadata}
    ></video>
  )
}

export default VideoPlayer
