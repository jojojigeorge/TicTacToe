import React from 'react'

function Square({ value, squareClick }) {//*******************************component SQUARE
    // const [value, setValue] = useState()
    // const handleClick = () => {
    //   setValue('O')
    // }
    return (<button className="square" onClick={squareClick}>{value}</button>);
  }
export default Square