import './App.css'
import Main from './main'
import {BrowserRouter as Router} from 'react-router-dom'

//const [showNotification, setShowNotification] = useState(false);


//const EnableDisable = () =>{
//setDisable(!Enable)

//}
//function notification():boolean{
 
//setShowNotification(!showNotification)

//return showNotification
//}


function App() {// React state, variables for UI changes

  return (
    <Router>
      <Main/>
    </Router>
  )
}

export default App

/* NOTES:
      obects:
let user: {name: string; age: number} = {
name: "Alice"
age: 20
} 
      Arrays
let nums: number[] = [1,2,3]
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

      functions
   function add( a: number, b: number): number{
   return a+b
   }

   <add /> if theres no parameters in function

      Variable types
let count: number = 5
let title: string = "hello"

    React State: variables for UI changes

const [count, setCount] = useState(0) 
count = current value
  setCount() tells React to re-render



      Components:
  A component is a piece of the UI 
  that has its own logic and appearance

    cant return multiple JSX tags, you have to wrap
    them into a shared aprent, like <div></div>
    or <></> wrapper

      className:
  you can specify a CSS class with className
  <img className = "avatar" />
  then you write the CSS rules for it in a 
  seperate CSS file
   In your CSS:
.avatar {
border-radius: 50%;



      Displaying data:
  curly braces let you escape back into JavaScript
  return( <h1> {user.name} </h1>);

      Concatenating strings:
let s = "my" + "string";
  (2 + 2 + "1"); = "41", it is read
  from right to left and after encountering
  a string the rest is converted to a string

    +variable or Number(variable) 
    converts strings/variables to numbers

      Rendering Lists:
    li, ul (unordered lists), ol (ordered)
    you can use the map function to
    transform an array of porudcts into an
    array of <li> items:
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);


      Responding to Events
  declare event handler functions 
  inside your components
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}




const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}

*/           //   Practice on React's Website
/*import { useState } from 'react'
export default function MyForm() {
  const [problem, setProblem] = useState("0")
  return (
    <>
      <label>
        Text input:  <input name = "Result"
      value = {problem}
      onChange = {e => setProblem(e.target.value)}
      size={30}
      />
      </label>
      <button onClick={() => setProblem((problem) => problem + 9)}>
          9
        </button>
         <button onClick={() => setProblem((problem) => problem + "-")}>
          -
        </button>
        <button onClick={() => setProblem((problem) => problem + 0)}>
          0
        </button>
        <button onClick={() => setProblem((problem) => problem + ".")}>
          .
        </button>
      <hr />*/ 
/*<div>   using links: and photos

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

                    this makes a button reveal or disappear
      {Enable &&(
          <button onClick={() => {setProblem((problem) => problem + "."); 
           {setDisable((Enable) => false)} }}>
            .
          </button>
        )}
      */