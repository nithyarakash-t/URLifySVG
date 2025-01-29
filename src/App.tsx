import "./App.scss"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Footer } from "./components/layout/footer/Footer"
import { Grid } from "./components/layout/grid/Grid"
import { ReleaseNotes } from "./components/layout/release/ReleaseNotes";
import { Themetoggle } from "./components/layout/themetoggle/Themetoggle";
// import { Flyout } from "./components/storage/historyflyout/Flyout";
import { StorageProvider } from "./components/storage/data/storageContext";
function App() {
  

  return (
    <Router>
      <StorageProvider>
        <div className="app-wrapper">
          <main className="app-wrap" id="main">
            <div className="app-container">
              <h1 className='app-title' aria-label="URLifySVG - URL Encoder for SVG">
                URLifySVG
                <span>URL Encoder for SVG</span>
              </h1>
            </div>
              <Routes>
                <Route path="/" element={<Grid/>}></Route>
                <Route path='/releasenotes' element={<ReleaseNotes/>}></Route>
              </Routes>
          </main>
          <Themetoggle/>
          <Footer/>
        </div>
      </StorageProvider>
    </Router>
  )
}

export default App
