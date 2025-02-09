import "./App.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Footer } from "./components/layout/footer/Footer"
import { Grid } from "./components/layout/grid/Grid"
import { ReleaseNotes } from "./components/layout/release/ReleaseNotes";
import { Themetoggle } from "./components/layout/themetoggle/Themetoggle";
import { Header } from "./components/layout/header/Header";

function App() {
  return (
    <BrowserRouter>
        <div className="app-wrapper">
          <Header/>
          <main className="app-wrap" id="main">
              <Routes>
                <Route path="/" element={<Grid/>}></Route>
                <Route path='/releasenotes' element={<ReleaseNotes/>}></Route>
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
          </main>
          <Themetoggle/>
          <Footer/>
        </div>
    </BrowserRouter>
  )
}

export default App
