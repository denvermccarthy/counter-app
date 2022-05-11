import { useEffect, useState, useReducer } from 'react'

const pink = `rgb(236, 72, 153)` // pink
const initialCount = 0
const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET_COUNT: 'reset',
  SET_COLOR: 'set-color',
}

const countReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return state + 1
    case ACTIONS.DECREMENT:
      return state - 1
    case ACTIONS.RESET_COUNT:
      return 0
    default:
      return state
  }
}

const colorReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_COLOR:
      return { color: action.payload.color }
    default:
      return state
  }
}

export default function Counter() {
  const [count, dispatchCount] = useReducer(countReducer, initialCount)
  const [color, dispatchColor] = useReducer(colorReducer, pink)

  useEffect(() => {
    if (count === 0) {
      dispatchColor({ type: ACTIONS.SET_COLOR, payload: { color: pink } })
    }

    if (count > 0) {
      dispatchColor({ type: ACTIONS.SET_COLOR, payload: { color: `rgb(52, 211, 153)` } }) // green
    }

    if (count < 0) {
      dispatchColor({ type: ACTIONS.SET_COLOR, payload: { color: `rgb(239, 68, 68)` } }) // red
    }
  }, [count])

  const increment = () => {
    dispatchCount({ type: ACTIONS.INCREMENT })
  }

  const decrement = () => {
    dispatchCount({ type: ACTIONS.DECREMENT })
  }

  const reset = () => {
    dispatchCount({ type: ACTIONS.RESET_COUNT })
  }

  return (
    <main className="bg-black bg-opacity-90 min-h-screen flex flex-col items-center justify-center text-4xl text-pink-500">
      <h1 className="mb-5" style={{ color: color.color }}>
        {count}
      </h1>
      <div className="flex w-1/2 justify-around">
        <button
          className="text-green-400 border-2 border-green-400 p-3"
          type="button"
          onClick={increment}
          aria-label="increment"
        >
          Increment
        </button>
        <button
          className="text-red-500 border-2 border-red-500 p-2"
          type="button"
          onClick={decrement}
          aria-label="decrement"
        >
          Decrement
        </button>
        <button
          className="text-pink-500 border-2 border-pink-500 p-2"
          type="button"
          aria-label="reset"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </main>
  )
}
