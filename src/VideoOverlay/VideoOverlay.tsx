import React, { FunctionComponent, useEffect, useRef } from 'react'
import cx from 'classnames'
import './VideoOverlay.scss'
import { OverlayItem } from './types'
import { BaseOverItemType } from '../types'
import * as d3 from 'd3'
import { BaseType, Selection, Transition } from 'd3'

type VideoOverlayProps = {
  classname?: string
  items?: OverlayItem[]
}

const colors = ['orange', 'red', 'blue', 'green']

const classLabelMap: Record<BaseOverItemType, string> = {
  [BaseOverItemType.Person]: 'Person',
  [BaseOverItemType.Car]: 'Car',
}

const VideoOverlay: FunctionComponent<VideoOverlayProps> = ({
  classname,
  items = [],
}) => {
  const svgRef = useRef(null)
  const className = cx(classname)

  useEffect(() => {
    const textPadding = 4

    const select = (
      className: string,
      element: string,
      transform: (
        selection: Selection<BaseType, OverlayItem, BaseType, OverlayItem> &
          Transition<BaseType, OverlayItem, BaseType, OverlayItem>,
      ) => void,
    ) =>
      d3
        .select(svgRef.current)
        .select('.overlayContainer')
        .selectAll<BaseType, OverlayItem>(`.${className}`)
        .data(items, ({ id }) => id)
        .join(
          (enter) =>
            enter
              .append(element)
              .attr('class', className)
              .call(
                transform as (
                  selection: Selection<
                    BaseType,
                    OverlayItem,
                    BaseType,
                    OverlayItem
                  >,
                ) => void,
              ),
          (update) =>
            update
              .transition()
              .duration(180)
              .ease(d3.easeLinear)
              .call(
                transform as (
                  selection: Transition<
                    BaseType,
                    OverlayItem,
                    BaseType,
                    OverlayItem
                  >,
                ) => void,
              ),
          (exit) => exit.remove(),
        )
        .attr('class', className)

    select('border', 'rect', (selection) =>
      selection
        .attr('rx', 4)
        .attr('stroke', (_, index) => colors[index])
        .attr('x', ({ x }) => x)
        .attr('y', ({ y }) => y)
        .attr('width', ({ width }) => width)
        .attr('height', ({ height }) => height),
    )

    select('textContainer', 'rect', (selection) =>
      selection
        .attr('rx', 4)
        .attr('fill', (_, index) => colors[index])
        .attr('x', ({ x }) => x)
        .attr('y', ({ y }) => y - 20)
        .attr(
          'width',
          ({ type }) => (classLabelMap[type].length + 2) * 8 + textPadding * 2,
        )
        .attr('height', 21),
    )

    select('text', 'text', (selection) =>
      selection
        .text(({ type }, index) => `${classLabelMap[type]} ${index + 1}`)
        .attr('x', ({ x }) => x + textPadding)
        .attr('y', ({ y }) => y - textPadding),
    )
  }, [items])

  return (
    <svg ref={svgRef} className={className} xmlns="http://www.w3.org/2000/svg">
      <g className={'overlayContainer'}></g>
    </svg>
  )
}

export default VideoOverlay
