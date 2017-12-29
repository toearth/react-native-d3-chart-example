/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import Svg, {Path, G, Text, Polyline} from 'react-native-svg'
import * as d3shape from 'd3-shape'
import * as d3scale from 'd3-scale'
import * as d3Array from 'd3-array'
import Axis from './aixs/axis'
import Legend from './legend/legend'
import Unit from './unit'

import Morph from 'art/morph/path'
import SvgPath from 'art/modes/svg/path'

// for (var i = 0; i < numberOfSeries; ++i) {
//     dataaa.push(d3Array.range(numberOfDataPoint).map(function (i) {
//         return {x: i, y: Math.random() * 9};
//     }));
// }

const padding = 40
const xPadding = 40

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height / 2
const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]
const legend = ["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed"]
const unit = "kg"
let yPadding = padding + Math.floor(legend.length/3) * 14 -2
const AnimationDurationMs = 250
const radius = width / 2 - yPadding;

var data = legend.map(label => {
    return { label: label, value: Math.random()}
})

var sacle = d3scale.scaleOrdinal()
    .domain(legend)
    .range(colors)

var pie = d3shape.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    })

var arc = d3shape.arc()
    .innerRadius(0)
    .outerRadius(radius * 0.8)

var innerArc = d3shape.arc()
    .innerRadius(radius * 0.4)
    .outerRadius(radius * 0.8)

var outerArc = d3shape.arc()
    .innerRadius(radius)
    .outerRadius(radius)


export default class PieChartLabels extends Component {

    constructor(props) {
        super(props)

        // var initPath = data.map((item)=> pie(item))
        var initPath = pie(data)

        this.state = {
            path: initPath,
        }
        //
        // this.previous = initPath
        // this.animating
    }

    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    render() {
        // console.log('data: ', data)
        // console.log('path: ',this.state.path)
        //console.log(SvgPath(this.state.path[0]).toString())
        // let {xScale, yScale} = this.createScales(width, height, xPadding,yPadding)
        // let data = []
        // this.state.datas && this.state.datas.forEach(lineDataPoints => {
        //     data.push(lineGenerator(lineDataPoints))
        // })
        return (
            <View>
                <View style={{marginTop: 35}}>
                    <Svg height={height} width={width}>
                        <Legend
                            legend={legend}
                            colors={colors}
                            xPadding={xPadding}
                        />
                        {/*<Unit*/}
                            {/*x={width - xPadding}*/}
                            {/*unit={unit}*/}
                            {/*y={yPadding}*/}
                        {/*/>*/}
                        <G x={width/2} y={radius+yPadding} >
                            {this.state.path.map(
                                (path, index) => {
                                    let originCoordinate = innerArc.centroid(path)
                                    let coordinate = outerArc.centroid(path)
                                    let textCoordinate = [...coordinate]
                                    textCoordinate[0] = radius * (this.midAngle(path) < Math.PI ? 1 : -1);
                                    let endCoordinate = [...coordinate]
                                    endCoordinate[0] = radius * 1.05 * (this.midAngle(path) < Math.PI ? 1 : -1)
                                    return (
                                        <G key={'G'+index}>
                                            <Path
                                                fill={colors[index]}
                                                stroke={colors[index]}
                                                strokeWidth='1.5'
                                                // fillOpacity="0.2"
                                                d={arc(path)}
                                                key={index} />
                                            <Text
                                                fill='#555555'
                                                // stroke={colors[index]}
                                                dy=".35em"
                                                textAnchor='middle'
                                                // fillOpacity="0.2"
                                                x={textCoordinate[0]}
                                                y={textCoordinate[1]}
                                                // d={arc(path)}
                                                key={'text'+index}>
                                                {path.data.label}
                                            </Text>
                                            <Polyline
                                                points={[...originCoordinate,...coordinate,...endCoordinate]}
                                                fill="none"
                                                stroke="#555555"
                                                strokeWidth="1"
                                            />
                                        </G>
                                    )
                                }
                            )}
                        </G>

                    </Svg>
                </View>
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
