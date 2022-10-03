import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import store from "../../store/store"


function Row(props) {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const arrUpdater = (event) => {
        let col = event.target.cellIndex
        let row = event.target.parentElement.rowIndex
        store.dispatch({ type: 'COLORIZE', row: row, col: col })
    }

    return (
        <>
            <tr>
                {props.data.map((itm, idx) => <td className='cell-row' style={{ backgroundColor: itm }} onClick={arrUpdater} key={idx} ></td>)}
            </tr>
        </>
    )
}

export default Row