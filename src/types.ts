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
  objectClass: BaseOverItemType
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

export enum BaseOverItemType {
  Person = 'OBJECT_CLASS_PERSON',
}
