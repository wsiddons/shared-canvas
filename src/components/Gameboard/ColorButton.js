import React from 'react'
import store from "../../store/store"

function ColorButton() {
    const handleChange = (event) => {
        console.log(event.target.value)
        const color = event.target.value
        store.dispatch({ type: 'CHANGE_COLOR', color: color })
    }
    return (
        <div>
            <select onChange={handleChange}>
                <option value='red'>red</option>
                <option value='blue'>blue</option>
                <option value='yellow'>yellow</option>
                <option value='green'>green</option>
            </select>
        </div>
    )
}

export default ColorButton