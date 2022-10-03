import { createStore, applyMiddleware } from 'redux'

// We'll soon revisit the initial state of this application.
const initialState = {
    grid: [
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),
        Array(20).fill(''),

    ],
    selectedColor: 'red'
}

// ACTION TYPES
/* we'll add some action types soon */
const ADD_ROW = 'ADD_ROW'
const CHANGE_COLOR = 'CHANGE_COLOR'
const COLORIZE = 'COLORIZE'

// ACTION CREATORS
/* we'll also add the corresponding action creators */
export const addRow = () => ({ type: ADD_ROW })
export const changeColor = (color) => ({ type: CHANGE_COLOR, color })
export const colorize = (row, col) => ({ type: colorize, row, col })


// And we'll revisit this reducer.
function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ROW:
            const numCols = state.grid[0].length
            const newRow = Array(numCols).fill('')
            return { ...state, grid: [...state.grid, newRow] }
        case CHANGE_COLOR:
            return { ...state, selectedColor: action.color }
        case COLORIZE:
            const newGrid = [...state.grid]
            newGrid[action.row] = [...newGrid[action.row]]
            newGrid[action.row][action.col] = state.selectedColor
            return { ...state, grid: newGrid }
        default:
            return state
    }
}

const store = createStore(
    reducer,
)

export default store