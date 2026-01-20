import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Calculator from './Calculator.tsx'
import './App.css'
import './Calculator.tsx'
import {Routes, Route, Link} from 'react-router-dom'
import Graph from './Components/GraphPage.jsx'

function Main(){
return(

    <React.Fragment>
        <Header/>
        <nav>
          <Link to="/Calculator"> Head to Calculator </Link> | {" "}
          <Link to="/Graph">Head to Graph</Link>
        </nav>
        
      
        <Routes>
          <Route path= '/Calculator' element = {<Calculator/>}/>
          <Route path='/Graph' element = {<Graph/>}/>
        </Routes>
       <Footer/>
    </React.Fragment>


)
}

export default Main;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
