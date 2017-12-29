import React from 'react'
import {G, Rect, Text} from 'react-native-svg'

const getX = (index,xPadding, marginLeft=0) => {
    if (index<=2) {return marginLeft + xPadding + index*90}
    if (index>2 && index <= 5) {return marginLeft + xPadding + (index-3)*90}
    if (index>5) {return marginLeft + xPadding + (index-6)*90}


}

const getY = (index,marginLeft=0) => {
    if (index<=2) {return 10 - marginLeft}
    if (index>2 && index <= 5) {return 24 - marginLeft}
    if (index>5) {return 38 - marginLeft}

}

const Legend = ({legend,colors, xPadding}) => (
    <G>
        {legend.map((item,index)=>(
            <G key={index}>
                <Rect
                    fill={colors[index]}
                    x={getX(index,xPadding)}
                    y={getY(index)}
                    width={10}
                    height={10}/>
                <Text
                    fill="#000000"
                    x={getX(index,xPadding,12)}
                    y={getY(index,2.5)}
                    fontSize='10'>
                    {item}
                </Text>
            </G>
        ))}
    </G>
)

export default Legend
