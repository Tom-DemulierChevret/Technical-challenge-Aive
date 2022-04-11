export type BaseData = {
  data: {
    analysis: {
      objects: BaseOverlayItem[]
    }
  }
}

export type BaseOverlayItem = {
  appearances: {
    boxes: AppearanceBox[]
  }[]
  id: string
  objectClass: string
}

export type AppearanceBox = {
  box: {
    bottomRight: {
      x: number
      y: number
    }
    topLeft: {
      x: number
      y: number
    }
  }
  time: number
}
