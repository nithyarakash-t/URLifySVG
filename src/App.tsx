import "./App.scss"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Footer } from "./components/layout/footer/Footer"
import { Grid } from "./components/layout/grid/Grid"
import { ReleaseNotes } from "./components/layout/release/ReleaseNotes";

function App() {

  return (
    <Router>
      <div className="app-wrapper">
        <main className="app-wrap" id="main">
          <div className="app-container">
            <Link to={'/'} className='app-title' aria-label="URLifySVG - URL Encoder for SVG">
              URLifySVG
              <span>URL Encoder for SVG</span>
            </Link>
          </div>
            <Routes>
              <Route path="/" element={<Grid/>}></Route>
              <Route path='/releasenotes' element={<ReleaseNotes/>}></Route>
            </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
