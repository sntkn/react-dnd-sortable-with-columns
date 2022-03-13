import { FC, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import { ItemTypes } from './ItemTypes'

const style = {
  border: '1px dashed gray',
  minHeight: '10rem',
}

export interface CardProps {
  column: number
  firstIndex: number
  lastIndex: number
  moveCard: (
    dragIndex: number,
    hoverIndex: number,
    columnIndex: number | null
  ) => void
}

interface DragItem {
  index: number
  column: number
  firstIndex: number
  lastIndex: number
}

export const EmptyCard: FC<CardProps> = ({
  moveCard,
  column,
  firstIndex,
  lastIndex,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor) {
      if (item.column !== column) {
        const toIndex = item.column > column ? item.firstIndex : item.lastIndex
        moveCard(monitor.getItem().index, toIndex, column)
        item.column = column
        item.index = toIndex
      }
    },
  })

  const [, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => ({ column, firstIndex, lastIndex }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))
  return <div ref={ref} style={{ ...style }} data-handler-id={handlerId} />
}
