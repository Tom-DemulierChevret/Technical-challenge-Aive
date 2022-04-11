import React, { useMemo, useState } from 'react'
import './App.scss'
import VideoPlayer from './VideoPlayer/VideoPlayer'
import VideoOverlay from './VideoOverlay/VideoOverlay'
import { OverlayItem } from './VideoOverlay/types'
import baseData from './porshe-video-object-detections.json'
import { AppearanceBox, BaseData, BaseOverItemType } from './types'

const App = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const [renderingScale, setRenderingScale] = useState(1)

  const scaledData: BaseData = useMemo(() => {
    return {
      data: {
        analysis: {
          objects: baseData.data.analysis.objects.map(
            ({ appearances, objectClass, ...rest }) => ({
              appearances: appearances.map(({ boxes, ...rest }) => ({
                boxes: boxes.map(({ box, ...rest }) => ({
                  box: {
                    bottomRight: {
                      x: box.bottomRight.x * renderingScale,
                      y: box.bottomRight.y * renderingScale,
                    },
                    topLeft: {
                      x: box.topLeft.x * renderingScale,
                      y: box.topLeft.y * renderingScale,
                    },
                  },
                  ...rest,
                })),
                ...rest,
              })),
              objectClass: objectClass as BaseOverItemType,
              ...rest,
            }),
          ),
        },
      },
    }
  }, [renderingScale])

  const items: OverlayItem[] = useMemo(() => {
    return scaledData.data.analysis.objects
      .filter(({ appearances }) =>
        appearances.some(
          ({ boxes }) =>
            boxes[0].time <= currentTime &&
            boxes[boxes.length - 1].time >= currentTime,
        ),
      )
      .map(({ id, appearances, objectClass }) => {
        const appearanceBox: AppearanceBox | undefined =
          appearances[0].boxes.find(({ time }) => time >= currentTime)
        return (
          appearanceBox && {
            id,
            x: appearanceBox.box.topLeft.x,
            y: appearanceBox.box.topLeft.y,
            width:
              appearanceBox.box.bottomRight.x - appearanceBox.box.topLeft.x,
            height:
              appearanceBox.box.bottomRight.y - appearanceBox.box.topLeft.y,
            type: objectClass,
          }
        )
      })
      .filter(
        (overlayItem: OverlayItem | undefined): overlayItem is OverlayItem =>
          !!overlayItem,
      )
  }, [scaledData, currentTime])

  return (
    <div className={'App'}>
      <div className={'videoContainer'}>
        <VideoPlayer
          classname={'videoPlayer'}
          timeChange={setCurrentTime}
          renderingScaleChange={setRenderingScale}
        />
        <VideoOverlay classname={'videoOverlay'} items={items} />
      </div>
    </div>
  )
}

export default App
