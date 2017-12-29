import React from 'react'
import {G, Rect, Text} from 'react-native-svg'

const getX = (index,padding, marginLeft=0) => {
    if (index<3) {return marginLeft + padding + index*90}
    if (index>2) {return marginLeft + padding + (index-3)*90}
    if (index>5) {return marginLeft + padding + (index-6)*90}
}

const getY = (index,padding,marginLeft=0) => {
    if (index<3) {return 10 - marginLeft}
    if (index>2) {return 22 - marginLeft}
    if (index>5) {return 34 - marginLeft}
}

const Legend = ({legend,colors, padding}) => (
    <G>
        {legend.map((item,index)=>(
            <G key={index}>
                <Rect
                    fill={colors[index]}
                    x={getX(index,padding)}
                    y={getY(index,padding)}
                    width={10}
                    height={10}/>
                <Text
                    fill="#000000"
                    x={getX(index,padding,12)}
                    y={getY(index,padding,2.5)}
                    fontSize='10'>
                    {item}
                </Text>
            </G>
        ))}
    </G>
)

export default Legend
