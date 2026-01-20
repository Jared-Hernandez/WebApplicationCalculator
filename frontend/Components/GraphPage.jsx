import React from 'react'
import {useState, useEffect} from 'react'
import "../App.css"


let equations = [
    "","","","","","","","","",""
]
let color = ["Blue", "Aqua", "DarkGreen", "Orange", "FireBrick", "Gold", "Lime", "PaleVioletRed", "purple", "Green"]




function Graph(){

const[xMin, setx] = useState(-10)
const[yMin,sety] = useState(-10)
const[xMax, setxMax] = useState(10)
const[yMax,setyMax] = useState(10)
const[problems, setProblems] = useState(equations)
const [imageSrc, setImageSrc] = useState(null)

const ColorText = ({children}) => {
return <span
 style = {{color: color[8]}}>{children}</span>

}


useEffect(() => {
  fetch("http://127.0.0.1:8000/graph", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    equations: problems,
    xMin,
    yMin,
    xMax,
    yMax
  })
})
  
  .then(res => res.json())
  .then(data => {setImageSrc(`data:image/png;base64,${data.image}`);
  })
  .catch(err => console.error(err));
}, [problems,xMin,xMax,yMin,yMax]);


function ColoredText(i) {
  return (
    <span style={{ color: color[i] }}><sub>{i}</sub></span>
  );
}

function handleChange(index, thing) {   //adjusting equations
    const nextProblems = problems.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return thing;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setProblems(nextProblems);
  }


    return(
      <div className = "containerdiv">
        <div className = "containerdiv">
           <h2>Equation Input</h2>
            <br/>
            <div className = "vertical-menu">
            <ul className = "no-bullets-list">
              {problems.map((problems, i) => (
                <li key={i}>
                {"F(x)"}{ColoredText(i)} =
                {problems}
                <input className = "large-input"
                  onChange = {e => handleChange(i, e.target.value)}>
                </input>
                </li>
              ))}
            </ul>
             <>please use *x when writing an equation</> 
            </div>

        </div>
      <div>
                
      <h2>Graphing</h2>
      <br/>
      <div className = "viewBox">
        {imageSrc && (
          <img 
          src = {imageSrc}
          alt = "Graph"
          width = "550"
          height = "550"
          />
        )}
      </div>

      
                
                   {/*lines 107-142 is the code for size of plot*/}
    <label>
      <br/>
      X min:
      <input type='number' className = 'calcBound-input'
        value = {xMin}        
        onChange = {e => setx((xMin) => Number(e.target.value))}>
      </input>
    </label>


    <label>            
      X max:
      <input type='number' className = 'calcBound-input'
        value = {xMax}
        onChange = {e => setxMax((xMax) => Number(e.target.value))}>
      </input>
    </label>
    

    <label>
      Y min:
      <input type='number' className = 'calcBound-input'
        value = {yMin}
        onChange = {e => sety((yMin) => Number(e.target.value))}>
      </input>
    </label>


    <label>
      Y Max:
      <input type='number' className = 'calcBound-input'
        value = {yMax}
        onChange = {e => setyMax((yMax) => Number(e.target.value))}>
      </input>
     </label>

    </div>       
  </div>
    )
}

export default Graph

/*                          previous versions:
<div class = 'container'>
    
<div>
    <h2>Equation Input</h2>

    

<input name = "fx1" className='large-input' label= "F(x)"></input><br />
<input name = "fx2" className='large-input'></input><br />
<input name = "fx3" className='large-input'></input><br />
<input name = "fx4" className='large-input'></input><br />
<input name = "fx5" className='large-input'></input><br />
<input name = "fx6" className='large-input'></input><br />
<input name = "fx7" className='large-input'></input><br />
<input name = "fx8" className='large-input'></input><br />
<input name = "fx9" className='large-input'></input><br />
<input name = "fx10"className='large-input'></input>

</div>

<div><h2>Graphing</h2></div>
    

</div> */