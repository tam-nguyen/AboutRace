import React from 'react'
import styled from 'styled-components'

const SVGChevron = ({color, rotate}) => {
  if(!rotate) rotate = -90

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.177 30.139">
      <path 
        fill={color} 
        d="M15.2,15.034a2.2,2.2,0,0,1,.159-.226Q21.785,7.639,28.224.48a1.027,1.027,0,0,1,1.585.04,1.367,1.367,0,0,1,.02,1.76Q22.912,9.974,16,17.667a1.106,1.106,0,0,1-1.859,0Q7.975,10.763,1.806,3.858c-.494-.554-1-1.1-1.481-1.671A1.372,1.372,0,0,1,.555.2,1.07,1.07,0,0,1,2.013.413Q3.177,1.7,4.338,3q3.147,3.5,6.295,7,2.174,2.421,4.352,4.841a1.261,1.261,0,0,1,.127.2C15.14,15.039,15.168,15.034,15.2,15.034Z"
        transform={`translate(0 30.139) rotate(${rotate})`}
      />
    </svg>
  )
}
///

export default SVGChevron;