import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import './VideoOverlay.scss'
import { OverlayItem } from './types'

type VideoOverlayProps = {
  classname?: string
  items?: OverlayItem[]
}

const VideoOverlay: FunctionComponent<VideoOverlayProps> = ({
  classname,
  items = [],
}) => {
  const className = cx(classname)

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg">
      {items.map(({ id, x, y, width, height, label }) => (
        <g key={id} className={'overlayItem'}>
          <text x={x} y={y - 10}>
            {label}
          </text>
          <rect x={x} y={y} width={width} height={height} rx={4} />
        </g>
      ))}
    </svg>
  )
}

export default VideoOverlay
