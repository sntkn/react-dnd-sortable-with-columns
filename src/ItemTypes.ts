export const ItemTypes = {
  CARD: 'card',
}

export interface DragItem {
  index: number
  id: string
  column: number
  firstIndex: number
  lastIndex: number
  type: string
}
