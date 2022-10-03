import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import Gameboard from "./components/Gameboard/Gameboard";
import PixelCanvasV2 from "./components/PiexelCanvas/PixelCanvasV2";
import PixelCanvas from "./components/PiexelCanvas/PixelCanvas";
import { doc, setDoc, collection, getDoc } from 'firebase/firestore'
import { db } from './firebase'
import Navbar from "./components/Navbar/Navbar";
function App() {

  const [imgSrc, setImgSrc] = useState('')

  // useEffect(() => {
  //   const docRef = doc(db, 'canvas', 'drawing')
  //   const getData = async () => {
  //     const docSnap = await getDoc(docRef)
  //     if (docSnap.exists()) {
  //       console.log('doc data:', docSnap.data())
  //       setImgSrc(docSnap.data().img)
  //       // let imgObj = new Image()
  //       // imgObj.src = docSnap.data().img
  //       // console.log(contextOutRef.current)
  //       // setLoading(!loading)
  //       // contextOutRef.current.drawImage(imgObj, 0, 0)
  //     }
  //   }
  //   getData()
  // }, [])
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />} >
            <Route exact path='/' element={<Dashboard />} />
          </Route>
          <Route path='/update-profile' element={<PrivateRoute />}>
            <Route path='/update-profile' element={<UpdateProfile />} />
          </Route>
          <Route path='/gameboard' element={<PrivateRoute />}>
            <Route path='/gameboard' element={<Gameboard />} />
          </Route>
          <Route path='/pixel-canvas' element={<PrivateRoute />}>
            <Route path='/pixel-canvas' element={<PixelCanvasV2 imgSrc={imgSrc} />} />
            {/* <Route path='/pixel-canvas' element={<PixelCanvas />} /> */}
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          {/* <Route path='/gameboard' element={<Gameboard />} /> */}
        </Routes>
      </AuthProvider>


    </>
  );
}

export default App;
