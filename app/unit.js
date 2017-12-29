import React from 'react'
import {G,Text} from 'react-native-svg'

const Unit = ({unit, x,y}) => (
    <Text
        text-anchor="end"
        fill="#333333"
        x={x-50}
        y={y-20}
        dy=".41em"
        fontSize={10}
    >
        {'单位：'+unit}
    </Text>
)

export default Unit
