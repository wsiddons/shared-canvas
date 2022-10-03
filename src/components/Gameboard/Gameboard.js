import React, { useEffect, useState } from 'react'
import AddWordToBoard from './AddWordToBoard'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import Canvas from './Canvas';
import ColorButton from './ColorButton';


function Gameboard() {
    const [loading, setLoading] = useState(true)
    // const { data } = useAuth()
    const [state, setState] = useState({})

    const GAMEBOARD_ROWS = 20
    const GAMEBOARD_COLS = 20

    let canvas = []

    for (let rows = 0; rows < GAMEBOARD_ROWS; rows++) {
        canvas[rows] = []
        for (let cols = 0; cols < GAMEBOARD_COLS; cols++) {
            canvas[rows][cols] = 'blue'
        }
    }
    const showstuff = async () => {
        setLoading(false)
        const testything = await getDocs(collection(db, 'words'))
        testything.forEach((doc) => {
            // console.log(`${doc.id} and ${doc.data()}`)
            console.log(doc._document.data.value.mapValue.fields.words.stringValue)
        })
        return testything
        // return console.log(await data())

    }

    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(collection(db, 'words'))
            console.log(data)
            setState(data)
        }
        getData()
    }, [])

    useEffect(() => {

    }, [state])

    // console.log(state.docs)
    if (state.docs) {
        // state.docs.map(element => {
        //     console.log(element._document.data.value.mapValue.fields.words.stringValue)
        // })
        console.log(state.docs)
    }



    return (
        <>
            <h1>Gameboard</h1>
            <h2>NEED TO REFACTOR TO USE FIRESTORE RATHER THAN STOOPID REDUX</h2>
            <AddWordToBoard />
            <button onClick={showstuff}>show stuff</button>
            {state.docs ?
                // <h1>{state.docs[0]._document.data.value.mapValue.fields.words.stringValue}</h1>
                state.docs.map(element =>
                    <div>
                        {`${element._document.data.value.mapValue.fields.words.stringValue}
                        - submitted by -
                        ${element._document.data.value.mapValue.fields.user.stringValue}`}
                    </div>
                )
                :
                <div>loading...</div>
            }
            <ColorButton />
            <Canvas />


        </>
    )
}

export default Gameboard