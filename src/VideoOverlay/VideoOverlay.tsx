import React, { FunctionComponent } from 'react'
import cx from 'classnames'
import './VideoOverlay.scss'
import { OverlayItem } from './types'
import { BaseOverItemType } from '../types'

type VideoOverlayProps = {
  classname?: string
  items?: OverlayItem[]
}

const colors = ['orange', 'red', 'blue', 'green']

const classLabelMap: Record<BaseOverItemType, string> = {
  [BaseOverItemType.Person]: 'Person',
}

const VideoOverlay: FunctionComponent<VideoOverlayProps> = ({
  classname,
  items = [],
}) => {
  const className = cx(classname)
  const textPadding = 4

  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg">
      {items.map(({ id, x, y, width, height, type }, index) => (
        <g key={id} className={'overlayItem'}>
          <rect
            x={x}
            y={y - 20}
            width={classLabelMap[type].length * 8 + textPadding * 2}
            height={21}
            rx={4}
            fill={colors[index]}
          ></rect>
          <text x={x + textPadding} y={y - textPadding}>
            {classLabelMap[type]}
          </text>
          <rect
            className={'border'}
            x={x}
            y={y}
            width={width}
            height={height}
            rx={4}
            stroke={colors[index]}
          />
        </g>
      ))}
    </svg>
  )
}

export default VideoOverlay
