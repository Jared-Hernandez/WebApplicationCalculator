import React from 'react'
import '../App.css'

function Header(){
    
const ColorText = ({children}) => {
return <span
        style = {{color:'dodgerblue'}}>{children}</span>

}

    return(
        <div>

        <h1>Calculat<ColorText>o</ColorText>r</h1>
        </div>
    )
}

export default Header