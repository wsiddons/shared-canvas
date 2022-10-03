import React, { useEffect, useRef, useState } from 'react'
import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

function PixelCanvas() {
    const canvasRef = useRef(null)
    const canvasOutRef = useRef(null)
    const contextRef = useRef(null)

    const [color, setColor] = useState('blue')
    const [isDrawing, setIsDrawing] = useState(false)
    const [getDocState, setGetDocState] = useState({})

    useEffect(() => {
        const canvas = canvasRef.current
        const canvasOut = canvasOutRef.current
        console.log(canvas)
        // canvas.width = window.innerWidth
        // canvas.height = window.innerHeight
        // canvas.style.width = `${window.innerWidth}px`
        // canvas.style.height = `${window.innerHeight}px`
        canvasOut.width = 50
        canvasOut.height = 50
        // canvasOut.style.width = '600px'
        // canvasOut.style.height = '600px'
        // canvas.width = 50
        // canvas.height = 50
        // canvas.style.width = '50px'
        // canvas.style.height = '50px'
        // console.log(canvas.style.width)


        // const context = canvas.getContext('2d')
        // // context.scale(2, 2)
        // // context.lineCap = 'round'
        // context.fillStyle = color
        // context.strokeStyle = 'black'
        // context.lineWidth = 0.1
        // contextRef.current = context

        const contextOut = canvasOut.getContext('2d')
        canvasOutRef.current = contextOut

        // var bw = 800;
        // // Box height
        // var bh = 800;
        // // Padding
        // var p = 0;
        // function drawBoard() {
        //     for (var x = 0; x <= bw; x += 10) {
        //         context.moveTo(0.5 + x + p, p);
        //         context.lineTo(0.5 + x + p, bh + p);
        //     }

        //     for (var x = 0; x <= bh; x += 10) {
        //         context.moveTo(p, 0.5 + x + p);
        //         context.lineTo(bw + p, 0.5 + x + p);
        //     }
        //     context.strokeStyle = "black";
        //     context.stroke();
        // }

        // drawBoard()
    }, [])

    useEffect(() => {
        canvasOutRef.current.fillStyle = color

    }, [color])

    useEffect(() => {
        const docRef = doc(db, 'grid', 'draw')
        const _getDoc = async () => {
            const docSnap = await getDoc(docRef);
            // setGetDocState(docSnap)
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().board);
                const uinct8Arr = new Uint8ClampedArray(docSnap.data().board.length)
                // console.log(uinct8Arr)
                const populatedArr = uinct8Arr.map((val, idx) =>
                    val = docSnap.data().board[idx]
                )
                let data = canvasOutRef.current.getImageData(0, 0, 50, 50)
                data.data.set(populatedArr)
                canvasOutRef.current.putImageData(data, 0, 0)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        _getDoc()
        console.log(getDocState)
        let docSnap = getDocState

    }, [])

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {

        contextRef.current.closePath()
        setIsDrawing(false)

    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }
        // console.log(contextRef)

        const { offsetX, offsetY } = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const handleColor = (event) => {
        setColor(event.target.value)
    }

    const pixel = async ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent

        canvasOutRef.current.fillRect(offsetX, offsetY, 1, 1)
        console.log(offsetX, offsetY)
        let data = canvasOutRef.current.getImageData(0, 0, 50, 50)

        let newArr = Array.prototype.slice.call(data.data)

        canvasOutRef.current.putImageData(data, 0, 0)
        await setDoc(doc(db, 'grid', 'draw'), {
            board: newArr
        })
    }

    const showCanvas = async () => {
        const docRef = doc(db, 'grid', 'draw')
        const docSnap = await getDoc(docRef);
        // console.log(docSnap)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().board);
            const uinct8Arr = new Uint8ClampedArray(docSnap.data().board.length)
            // console.log(uinct8Arr)
            const populatedArr = uinct8Arr.map((val, idx) =>
                val = docSnap.data().board[idx]
            )
            let data = contextRef.current.getImageData(0, 0, 50, 50)
            console.log(data)
            data.data.set(populatedArr)
            canvasOutRef.current.putImageData(data, 0, 0)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    return (
        <>
            <h1>Pixel Canvas</h1>
            <div>
                <select onChange={handleColor}>
                    <option value='blue'>blue</option>
                    <option value='red'>red</option>
                    <option value='green'>green</option>
                    <option value='black'>black</option>
                </select>
            </div>
            {/* <canvas
                // onMouseDown={startDrawing}
                // onMouseUp={finishDrawing}
                // onMouseMove={draw}
                onClick={pixel}
                ref={canvasRef}
                style={{ border: '1px solid black', margin: '40px' }}
            /> */}
            <button onClick={showCanvas}>show new canvas</button>
            <canvas
                onClick={pixel}
                ref={canvasOutRef}
                style={{ border: '1px solid black', margin: '40px' }}
            />
        </>

    )
}

export default PixelCanvas