import { useState } from 'react'
import './App.css'
import { StrictMode } from 'react'
import React from 'react'
import { useEffect } from 'react'
import Main from './main'




function underOperatorLimit(str : string) : boolean{
  let limit = true
  let highest = 0

  for(let i = 0; i < str.length; i++){
    if(str.at(i) === ")" || str.at(i) === "(" ||
      str.at(i) === "+" || str.at(i) === "-" ||
      str.at(i) === "/" || str.at(i) === "*"
      ){
      highest++
    }
    if(highest >= 26){
    return false
    }
  }

return limit
}
function underDigitLimit(str : string): boolean{
let limit = true
let highest = 0

  for(let i = 0; i < str.length; i++){
    if(Number(str.at(i)) <= 9 && Number(str.at(i)) >= 0){
      highest++
    }
    if(highest >= 16){
    return false
    }
  }

return limit
}

//this function is called when the user presses =. It ensures the expression has an even amount of parenthesis
function validparenthesis(str : string): boolean{  
  let balance = 0 

  for(let i = 0; i < str.length; i++){
    if(str[i] === "("){
      balance ++
    }
    else if (str[i] === ")"){
      balance--
    }
    if(balance < 0){
      return false
    }
  }
  return balance ===0
}


function Calculator(){
    const [problem, setProblem] = useState("") //this React state reflects input and output
    const [Enable, setDisable] = useState(false) // this React State affects if a button is disabled
    const [showNotification, setShowNotification] = useState(false); //enables error message for misplaced operator
    const [limitNotification, setLimitNotification] = useState(false);
    const [operatorLimit, setoperatorLimit] = useState(false);
    const [parEqual, setParEqual] = useState(true) //Make sure '(' and ')' and equal prior to solving the equation
    const [answer, setAnswer] = useState("")
    

  useEffect(() => {
  if (problem.at(-1) === "=") {
    fetch("http://127.0.0.1:8000/calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem })
    })
      .then(res => res.json())
      .then(data => setProblem((data.result)))
      .catch(err => console.error("Something went wrong", err));
  }
}, [problem]);



  
  const ColorText = ({children}) => { //for using color on letters, used on the o in calculat"o"r
  return <span
    style = {{color:'dodgerblue'}}>{children}</span>
  }

  return(
    <StrictMode>
    <> {/*Error messages: */}
    {operatorLimit ? <div>{"!! Please reduce your expression, 25 operator limit!!"}</div>:""}
    {limitNotification ? <div>{"!! Numbers cannot be beyond 15 digits in length !!"}</div>:""}
    {showNotification ? <div>{"!! Cannot place operator there !!"}</div> :""}
    {parEqual? "": <div>{"Must close Parenthesis"}</div>}
    <p> <progress></progress></p> {/* this is a aesthetic choice, */}

    {/*This stores the input of the user into value*/}
    <input name = "Result" className='large-input'   
    value = {problem}
    onChange = { e => setProblem(e.target.value)}
    size={40}
    />
    </>

    <div className="card">
      <button onClick={() => {
        if(Number(problem.at(-1)) <= 9 || problem.at(-1) === ")"){
          setProblem((problem) => problem + "*(")
        }
        else{
          setProblem((problem) => (problem + "("))
        }
        if(problem.at(-1) === "."){
          setDisable((Enable) => false)
          setProblem((problem) => (problem.slice(0,-2)) + "*(")
        }
        {setParEqual((parEqual) => true)}
        }}>
        {"("}
      </button>{/*adds an open parenthesis*/}


      <button onClick={() => {
        (problem.at(-1) === "-" ||
        problem.at(-1) === "*" || problem.at(-1) === "/" ||
        problem.at(-1) === "+")? setProblem((problem) => (problem.slice(0,-1)) + ")" ):setProblem((problem) => (problem + ")"))  
        if(problem.at(-1) === "."){
          setDisable((Enable) => false)
          setProblem((problem) => (problem.slice(0,-2)) + ")")
        }
        {setParEqual((parEqual) => true)}
        }}>
        {")"}
        </button>{/*adds a closing parenthesis*/}


      <button onClick={() => {
        if(problem.at(-1) === "."){
        setDisable((Enable) => false)
        }
        {setProblem((problem) => (problem = problem.slice(0,-1)))}
        {setParEqual((parEqual) => true)}
        }}>
        {"c"}
      </button> {/*deletes the latest addition to value*/}


      <button onClick={() => { 
        setProblem((problem) => problem = "")
        setDisable((Enable) => false)
        setShowNotification((showNotification) => false)
        setParEqual((perEqual) => true)
        }}>
        {"ac"}
        </button> {/*resets everything*/}
        <br />


        <button onClick={() => 
          {setProblem((problem) => problem + "1")
          
        }}>
          {"1"}
        </button>
        <button onClick={() => {
          setProblem((problem) => problem + "2")
         
        }}>
          2
        </button>
        <button onClick={() => 
          {setProblem((problem) => problem + "3")
        
          }}>
          
          3
        </button>
         <button onClick={() =>

         {if(problem.length === 0 || problem.at(-1) === "(" ||
            problem.at(-1) === "." ){ 

              setShowNotification((showNotification) => true)
            }
          else if (problem.at(-1) === "-" ||
            problem.at(-1) === "*" || problem.at(-1) === "/" ||
            problem.at(-1) === "+"){ 
              setShowNotification((showNotification) => false)
              if(problem.at(-2) != "("){
              {setProblem((problem) => (problem.slice(0,-1) + "*"))}
            }
            }
            
          else{setProblem((problem) => problem + "/")}
          
          {setDisable((Enable) => false)}
         }}>
          /
        </button>
        < br />
        <button onClick={() => 
          {setProblem((problem) => problem + "4")
         
        }}>
          4
        </button>
        <button onClick={() => 
          {setProblem((problem) => problem + "5")
          
        }}>
          5
        </button>
        <button onClick={() => 
          {setProblem((problem) => problem + "6")
          
        }}>
          6
        </button>
         <button onClick={() => 
           {if(problem.length === 0 || problem.at(-1) === "(" ||
            problem.at(-1) === "."){ 

              setShowNotification((showNotification) => true)
            }
          else if (problem.at(-1) === "-" || problem.at(-1) ==="("||
            problem.at(-1) === "*" || problem.at(-1) === "/" ||
            problem.at(-1) === "+"){
            setShowNotification((showNotification) => false)
            if(problem.at(-2) != "("){
              {setProblem((problem) => (problem.slice(0,-1) + "*"))}
            }
              
            }
          else{setProblem((problem) => problem + "*")}
          
          {setDisable((Enable) => false)}  
          

         }}>
          *
        </button>
        <br />
        <button onClick={() => 
          {setProblem((problem) => problem + "7")
          
        }}>
          7
        </button>
        <button onClick={() => 
          {setProblem((problem) => problem + "8")
          
        }}>
          8
        </button>
        <button onClick={() => 
          {setProblem((problem) => problem + "9")
        
        }}>
          9
        </button>
         <button onClick={() => 
         {
          if(
            problem.at(-1) === "." ) {
             setShowNotification((showNotification) => true)
            }
            else if(problem.at(-1) === "-" ||
            problem.at(-1) === "*" || problem.at(-1) === "/" ||
            problem.at(-1) === "+"){
              setProblem((problem) => (problem + "(-"))
              setShowNotification((showNotification ) => false)
          } 
          else{setProblem((problem) => problem + "-")}
              setShowNotification((showNotification ) => false)

    
         
          {setDisable((Enable) => false)}
        }}>
          -
        </button>
        <br />
        <button onClick={() => setProblem((problem) => problem + 0)}>
          0
        </button>
       
          <button disabled = {Enable}  onClick={() => 
          { if(problem === "" || problem.at(-1) === "-" ||
            problem.at(-1) === "*" || problem.at(-1) === "/" ||
            problem.at(-1) === "+"){
            setProblem((problem) => problem + "0.") 
          }
          
          else{setProblem((problem) => problem + ".") }
          
           {setDisable((Enable) => true)}  
           
           }}>
            .
          </button>
        

        <button onClick={() => {
          if(validparenthesis(problem) === true)
          {
            if(underDigitLimit(problem) == false){
              setLimitNotification((limitNotification) => true)
            }
            else if(underOperatorLimit(problem) == false){
              setoperatorLimit((operatorLimit) => true)
            }
            else if((problem.at(-1) === "+" || problem.at(-1) === "-" ||
            problem.at(-1) === "*" || problem.at(-1) === "/")){
              setShowNotification((showNotification) => true)
            }
            else{
              
              setDisable((Enable) => false)
              setShowNotification((showNotification) => false)
              setParEqual((parEqual) => true)
              setProblem((problem) => problem + "=")

            }
          }
          else{
            setParEqual((parEqual) => false)
          }
              
        }}>
          <ColorText>=</ColorText>
        </button>

         <button onClick={() => 
         {if(problem.length === 0 || problem.at(-1) === "(" ||
            problem.at(-1) === "."){ 

              setShowNotification((showNotification) => true)
            }
          else if (problem.at(-1) === "-" ||
            problem.at(-1) === "*" || problem.at(-1) === "/" ||
            problem.at(-1) === "+" ||problem.at(-1) === "(")
            {
              if(problem.at(-2) != "("){
              {setProblem((problem) => (problem.slice(0,-1) + "*"))}
            }
            setShowNotification((showNotification) => false)
            }
          else{setProblem((problem) => problem + "+")}
          
          {setDisable((Enable) => false)}  
         

         }}>
          +
        </button>
      </div>
         
      
    </StrictMode>
  )
    
}

export default Calculator