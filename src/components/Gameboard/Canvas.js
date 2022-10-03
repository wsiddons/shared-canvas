import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRow, changeColor, colorize } from '../../store/gridReducer'
import Row from './Row'

function Canvas() {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const [color, setColor] = useState('red')

    // const CANVAS_ROWS = 40
    // const CANVAS_COLS = 40
    // const [color, setColor] = useState('blue')

    // let canvas = []
    // for (let rows = 0; rows < CANVAS_ROWS; rows++) {
    //     canvas[rows] = []
    //     for (let cols = 0; cols < CANVAS_COLS; cols++) {
    //         canvas[rows][cols] = '#FFF'
    //     }
    // }

    // const gridHandle = (event) => {
    //     console.dir(event.target.cellIndex)
    //     console.log(event.target.parentElement.id)

    // }
    console.log(state)
    return (
        <div>
            <table>
                <tbody>
                    {state.grid.map((itm, idx) =>
                        <Row
                            key={idx}
                            data={itm}
                            color={color}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Canvas


{/* {canvas.map((row, idx) =>
                <tr id={idx}>
                    {row.map((cell, cellIdx) =>
                        <td className='cell-row' style={{ backgroundColor: `${color}` }} onClick={gridHandle}></td>
                    )}
                </tr>
            )} */}