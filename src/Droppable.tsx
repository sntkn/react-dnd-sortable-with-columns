import { FC, useRef } from 'react'
import { useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import { ItemTypes, DragItem } from './ItemTypes'

const style = {
  border: '1px dashed gray',
  minHeight: '10rem',
}

export interface DroppableProps {
  column: number
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    columnIndex: number | null
  ) => void
}

export const Droppable: FC<DroppableProps> = ({ moveCard, column }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    hover(item: DragItem) {
      if (item.column !== column) {
        const toIndex = item.column > column ? item.firstIndex : item.lastIndex
        moveCard(item.index, toIndex, column)
        item.column = column
        item.index = toIndex
      }
    },
  })

  drop(ref)
  return <div ref={ref} style={{ ...style }} data-handler-id={handlerId} />
}
