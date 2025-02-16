import "./App.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Footer } from "./components/layout/footer/Footer"
import { Grid } from "./components/layout/grid/Grid"
import { ReleaseNotes } from "./components/layout/release/ReleaseNotes";
import { Themetoggle } from "./components/layout/themetoggle/Themetoggle";
import { Header } from "./components/layout/header/Header";
import { ThemeProvider } from "./components/layout/themetoggle/Themecontext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="app-wrapper">
          <Header/>
          <main className="app-wrap" id="main">
              <Routes>
                <Route path="/" element={
                  <>
                  <div className="app-container">
                    <h1 aria-label="URLifySVG - URL Encoder">
                      URL Encoder
                      {/* <span>Encode, Copy, Use</span> */}
                      <span>CSS is all you need!</span>
                    </h1>
                  </div>
                  <Grid/>
                  </>
                }></Route>
                <Route path='/releasenotes' element={<ReleaseNotes/>}></Route>
                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
          </main>
          <Themetoggle/>
          <Footer/>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
