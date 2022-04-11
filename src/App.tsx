import React, { useMemo, useState } from 'react'
import './App.scss'
import VideoPlayer from './VideoPlayer/VideoPlayer'
import VideoOverlay from './VideoOverlay/VideoOverlay'
import { OverlayItem } from './VideoOverlay/types'
import overlayPosition from './porshe-video-object-detections.json'
import { AppearanceBox, BaseData } from './types'

const App = () => {
  const [currentTime, setCurrentTime] = useState(0)
  const [baseData, setBaseData] = useState<BaseData>(
    overlayPosition as BaseData,
  )

  const items: OverlayItem[] = useMemo(() => {
    return baseData.data.analysis.objects
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
  }, [baseData, currentTime])

  return (
    <div className={'App'}>
      <div className={'videoContainer'}>
        <VideoPlayer classname={'videoPlayer'} timeChange={setCurrentTime} />
        <VideoOverlay classname={'videoOverlay'} items={items} />
      </div>
    </div>
  )
}

export default App
