import { createSlice } from '@reduxjs/toolkit'

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

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        addRow: (state) => {
            const numCols = state.grid[0].length
            const newRow = Array(numCols).fill('')
            return { ...state, grid: [...state.grid, newRow] }
        },
        changeColor: (state, color) => {
            return { ...state, selectedColor: color }
        },
        colorize: (state, row, col) => {
            const newGrid = [...state.grid]
            newGrid[row] = [...newGrid[row]]
            newGrid[row][col] = state.selectedColor
            return { ...state, grid: newGrid }
        }

    }
})

export const { addRow, changeColor, colorize } = gridSlice.actions
export default gridSlice.reducer