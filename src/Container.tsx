import { FC, useState, useCallback, useEffect } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'

const style = {
  width: 400,
  height: '100%',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '.5rem',
}

export interface Item {
  id: number
  text: string
  column: number
}

export interface ContainerState {
  cards: Item[]
}

export const Container: FC = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Write a cool JS library',
      column: 0,
    },
    {
      id: 2,
      text: 'Make it generic enough',
      column: 0,
    },
    {
      id: 3,
      text: 'Write README',
      column: 0,
    },
    {
      id: 4,
      text: 'Create some examples',
      column: 0,
    },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      column: 0,
    },
    {
      id: 6,
      text: '???',
      column: 1,
    },
    {
      id: 7,
      text: 'PROFIT',
      column: 1,
    },
  ])

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number, columnIndex: number | null) => {
      setCards((prevCards: Item[]) => {
        if (columnIndex !== null) {
          prevCards[dragIndex].column = columnIndex
        }
        return update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      })
    },
    []
  )

  type ColumnType = {
    name: string
    items: Item[]
  }

  const [columnInCards, setColumnInCards] = useState<ColumnType[]>([])

  useEffect(() => {
    const columns = ['Todo', 'Doing', 'Done']
    setColumnInCards(() => {
      return columns.map((name, i) => ({
        name,
        items: cards.filter((v) => v.column === i),
      }))
    })
  }, [cards])

  const renderCard = useCallback(
    (
      card: { id: number; text: string; column: number },
      index: number,
      firstIndex: number,
      lastIndex: number
    ) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          column={card.column}
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          moveCard={moveCard}
        />
      )
    },
    []
  )

  let index = 0
  return (
    <div style={{ display: 'flex' }}>
      {columnInCards.map((column, i) => {
        const firstIndex = index
        const lastIndex =
          index + (column.items.length ? column.items.length - 1 : 0)
        return (
          <section key={i} style={style}>
            <div>{column.name}</div>
            <div style={{ marginTop: '.5rem', minHeight: '10rem' }}>
              {column.items.map((card) =>
                renderCard(card, index++, firstIndex, lastIndex)
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
