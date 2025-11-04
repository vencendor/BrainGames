import React from 'react'
import Svg, { Polygon } from 'react-native-svg'


export default function ArrowBackground({ direction = 'up', size = 100, color = 'rgba(234, 234, 232, 0.7)' }) {


    let points
  
    switch (direction) {
      case 'up':
        points = `${size / 2},0 0,${size} ${size},${size}`
        break
      case 'down':
        points = `0,0 ${size},0 ${size / 2},${size}`
        break
      case 'left':
        points = `${size},0 ${size},${size} 0,${size / 2}`
        break
      case 'right':
        points = `0,0 ${size},${size / 2} 0,${size}`
        break
    }
  
    return (
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Polygon points={points} fill={color} />
      </Svg>
    )

  }

