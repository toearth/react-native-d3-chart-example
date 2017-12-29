/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import Svg, {Path} from 'react-native-svg'
import * as d3shape from 'd3-shape'
import * as d3scale from 'd3-scale'
import * as d3Array from 'd3-array'
import Axis from './axis'
import Legend from './legend'
import Unit from './unit'

let datas = [ // <-C
    [
        {x: 0, y: 5}, {x: 1, y: 9}, {x: 2, y: 7},
        {x: 3, y: 5}, {x: 4, y: 3}, {x: 6, y: 4},
        {x: 7, y: 2}, {x: 8, y: 3}, {x: 9, y: 2}
    ],

    d3Array.range(9).map(function (i) {
        return {x: i, y: Math.sin(i) + 5};
    })
];

let padding = 40


let width = Dimensions.get('window').width
let height = Dimensions.get('window').height / 2
const colors = ["#D96D69", "#FC993D"]
const legend = ["滚筒轴承温度", "主电机轴承温度"]
const unit = "km/h"

export default class Line extends Component {

    createScales = (datas, width, height, padding) => {
        //let xScale = d3scale.scaleTime().domain([padding, width - padding])
        let xScale = d3scale.scaleLinear().domain([padding, width - padding])
        // y grows to the bottom in SVG, but our y axis to the top
        let yScale = d3scale.scaleLinear().domain([height - padding, padding])
        let dateTimes = datas.map(pair => pair.x)
        let values = datas.map(pair => pair.y)
        xScale.range([0, 10])
        yScale.range([0, 10])
        return {xScale, yScale}
    }

    render() {
        let {xScale, yScale} = this.createScales(datas, width, height, padding)
        let lineGenerator = d3shape.line()
            .x(d => xScale.invert(d.x))
            .y(d => yScale.invert(d.y))
        let data = []
        // lines is an array of arrays of pairs
        // where an array of pairs represents a line
        datas.forEach(lineDataPoints => {
            data.push(lineGenerator(lineDataPoints))
        })
        return (

            <View>
                <View style={{height: 100, backgroundColor: '#FB7B2C'}}/>
                <Svg height={height} width={width}>
                    {/*<Rect*/}
                    {/*x="15"*/}
                    {/*y="15"*/}
                    {/*width="70"*/}
                    {/*height="70"*/}
                    {/*stroke="red"*/}
                    {/*strokeWidth="2"*/}
                    {/*fill="#28A4F3"*/}
                    {/*/>*/}
                    <Legend
                        legend={legend}
                        colors={colors}
                        padding={padding}
                    />
                    <Unit
                        x={width - padding}
                        unit={unit}
                        y={padding}
                    />
                    <Axis
                        width={width - 2 * padding}
                        xStart={padding}
                        yStart={height - padding}
                        ticks={8}
                        startVal={0}
                        endVal={10}
                        scale={xScale}/>
                    <Axis
                        width={height - 2 * padding}
                        xStart={padding}
                        yStart={height - padding}
                        ticks={8}
                        startVal={0}
                        endVal={10}
                        scale={yScale}
                        vertical/>
                    {data.map(
                        (d, i) => <Path
                            fill='none'
                            stroke={colors[i % colors.length]}
                            strokeWidth='1.5'
                            d={d}
                            key={i}/>
                    )}
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});