 import React, {Component} from 'react'
 import {G, Line, Text} from 'react-native-svg'

 const TICKSIZE = 7

 export default class Axis extends Component {

     getTickPoints (vertical,start, end, numTicks) {
         let res = []
         let ticksEvery = Math.ceil((end - start) / (numTicks - 1))
         // if (vertical) {
         //     for (let cur = start; cur >= end; cur -= ticksEvery) {
         //         res.push(cur)
         //     }
         // } else {
         //     for (let cur = start; cur <= end; cur += ticksEvery) {
         //         res.push(cur)
         //         // console.log(start)
         //         // console.log(end)
         //         console.log(cur)
         //     }
         // }
         //console.log((end - start) / (numTicks - 1))
         for (let cur = start; cur <= end; cur += ticksEvery) {
             res.push(cur)
             // console.log(start)
             // console.log(end)
             // console.log(cur)
         }
         return res
     }

     render () {
         let { width, ticks, xStart, yStart, startVal, endVal, vertical } = this.props
         xStart = xStart || 0
         yStart = yStart || 0
         let xEnd = vertical ? xStart : xStart + width
         let yEnd = vertical ? yStart - width : yStart
         let scale = this.props.scale
         if (!scale) {
             scale = typeof startVal === 'number' ? scale.scaleLinear() : scale.scaleTime()
             scale.domain(vertical ? [yStart, yEnd] : [xStart, xEnd]).range([startVal, endVal])
         }
         let tickPoints =  this.getTickPoints(vertical,startVal, endVal, ticks)
         return (
             <G>
                 <Line
                     stroke="#000000"
                     strokeWidth="0.75"
                     x1={xStart}
                     y1={yStart}
                     x2={xEnd}
                     y2={yEnd}/>
                 {tickPoints.map(
                     pos => <Line
                         key={pos}
                         stroke='#000000'
                         strokeWidth='0.75'
                         x1={vertical ? xStart : scale.invert(pos)}
                         y1={vertical ? scale.invert(pos) : yStart}
                         x2={vertical ? xStart - TICKSIZE : scale.invert(pos)}
                         y2={vertical ? scale.invert(pos) : yStart + TICKSIZE} />
                 )}
                 {tickPoints.map(
                     pos => <Text
                         key={pos}
                         fill='#555555'
                         stroke='#555555'
                         fontSize='10'
                         textAnchor='middle'
                         dy=".32em"
                         x={vertical ? xStart - 2 * TICKSIZE : scale.invert(pos)}
                         y={vertical ? scale.invert(pos) : yStart + 2 * TICKSIZE}>
                         {typeof startVal === 'number' ? pos : scale(pos).toLocaleDateString()}
                     </Text>
                 )}
             </G>
         )

     }
 }
