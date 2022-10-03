import React, { useEffect, useMemo, useRef, useState } from 'react'
import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Navbar from '../Navbar/Navbar'
import ColorPicker from './ColorPicker'
import { ChromePicker } from 'react-color';


function PixelCanvasV2() {
    const [loading, setLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [htmlState, setHtmlState] = useState('')
    const [color, setColor] = useState('#000')
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const [isDrawing, setIsDrawing] = useState(false)
    const [stroke, setStroke] = useState('50')

    //input canvas
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    //output canvas
    const canvasOutRef = useRef(null)
    const contextOutRef = useRef(null)

    //initial canvas
    useEffect(() => {
        //input canvas
        // const canvas = canvasRef.current
        // canvas.width = 1000
        // canvas.height = 1000
        // const context = canvas.getContext('2d')
        // contextRef.current = context

        //output canvas
        const canvasOut = canvasOutRef.current
        canvasOut.width = 1000
        canvasOut.height = 1000
        const contextOut = canvasOut.getContext('2d')
        canvasOut.lineCap = 'round'
        contextOutRef.current = contextOut
        //to url stuff
        const docRef = doc(db, 'canvas', 'drawing')
        const getData = async () => {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log('doc data:', docSnap.data())
                setImgSrc(docSnap.data().img)
                let imgObj = new Image()
                imgObj.src = docSnap.data().img
                console.log(contextOutRef.current)
                setLoading(!loading)
                contextOutRef.current.drawImage(imgObj, 0, 0)
            }
        }
        getData()
        let imgObj = new Image()
        imgObj.src = imgSrc
        console.log(contextOutRef.current)
        contextOutRef.current.drawImage(imgObj, 0, 0)

    }, [imgSrc])

    useEffect(() => {
        const strokeNum = stroke / 10
        contextOutRef.current.lineWidth = strokeNum
    }, [stroke])

    useEffect(() => {
        // contextOutRef.current.fillStyle = color
        contextOutRef.current.strokeStyle = color
    }, [color])

    // useEffect(() => {
    //     let imgObj = new Image()
    //     imgObj.src = imgSrc
    //     console.log(contextOutRef.current)
    //     contextOutRef.current.drawImage(imgObj, 0, 0)
    // }, [imgSrc])

    const pixel = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        contextRef.current.fillRect(offsetX, offsetY, 10, 10)


    }
    const pixel2 = async ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        console.log('cursor', offsetX, offsetY)
        if (offsetX % 10 === 0 || offsetY % 10 === 0) {
            return
        }
        contextOutRef.current.fillRect(offsetX, offsetY, 10, 10)
        let dataURL = canvasOutRef.current.toDataURL('image/png')
        console.log(dataURL)
        // const test = canvasOutRef.current.toBlob(blob => URL.createObjectURL(blob))
        // console.log(test)
        await setDoc(doc(db, 'canvas', 'drawing'), {
            img: dataURL
        })
    }

    /// TIME TO SEND IMAGE TO DB!
    // I HAVE THE IMAGE ELE SO I JUST NEED TO SEND THE SRC TO DB
    const sendUrl = () => {
        var dataURL = canvasRef.current.toDataURL('image/png')
        console.log(dataURL)
        setImgUrl(dataURL)
        var img = document.getElementById("scream");
        console.log(img)
        let imgObj = new Image()
        imgObj.src = dataURL
        // setHtmlState(img)
        // console.log(htmlState)
        contextOutRef.current.drawImage(imgObj, 0, 0)
        // contextOutRef.current.fillRect(10, 10, 10, 10)
    }

    const handleColor = (event) => {
        console.log(color)
        setColor(event.target.value)
    }

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent
        contextOutRef.current.beginPath()
        contextOutRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = async () => {
        let dataURL = canvasOutRef.current.toDataURL('image/png')
        contextOutRef.current.closePath()
        setIsDrawing(false)
        await setDoc(doc(db, 'canvas', 'drawing'), {
            img: dataURL
        })

    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return
        }
        // console.log(contextRef)
        const { offsetX, offsetY } = nativeEvent
        contextOutRef.current.lineTo(offsetX, offsetY)
        contextOutRef.current.stroke()
    }

    // const dataURL = canvasRef.current.toDataURL('image/png')

    // if (loading) {
    //     console.log(dataURL)
    // }

    return (
        <>
            <Navbar />
            <div className='color-picker'>
                <p>Stroke</p>
                <input defaultValue="1" onChange={(event) => setStroke(event.target.value)} type="range" min="1" max="100" />
                <button onClick={() => setShowColorPicker(!showColorPicker)}>color picker</button>
                {showColorPicker ? <ChromePicker
                    color={color}
                    onChange={updatedColor => setColor(updatedColor.hex)}
                />
                    :
                    <></>
                }
            </div>

            <div className='pixel-canvas-container'>
                <h2>Pixel Canvas</h2>
                {/* <canvas
                    onClick={pixel}
                    ref={canvasRef}
                    style={{ border: '1px solid black' }}
                /> */}
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    // onClick={pixel2}
                    ref={canvasOutRef}
                    style={{ border: '1px solid black', marginLeft: '40px' }}
                />
            </div>

        </>
    )
}

export default PixelCanvasV2