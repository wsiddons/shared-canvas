import React, { useState } from 'react'
import { ChromePicker } from 'react-color';


function ColorPicker() {
    const [color, setColor] = useState('#000')
    const [showColorPicker, setShowColorPicker] = useState(false)

    return (
        <div>
            <button onClick={() => setShowColorPicker(!showColorPicker)}>{showColorPicker ? 'close color picker' : 'pick color'}</button>
            {showColorPicker ? <ChromePicker
                color={color}
                onChange={updatedColor => setColor(updatedColor.hex)}
            />
                :
                <></>
            }

            <p>you picked {color}</p>
        </div>
    )
}

export default ColorPicker