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
    PanResponder,
    LayoutAnimation
} from 'react-native';
import Svg, {Path} from 'react-native-svg'
import * as d3shape from 'd3-shape'
import * as d3scale from 'd3-scale'
import * as d3Array from 'd3-array'
import Axis from './aixs/axis'
import Legend from './legend/legend'
import Unit from './unit'

import Morph from 'art/morph/path'
import SvgPath from 'art/modes/svg/path'

import * as d3 from 'd3'

// var numberOfSeries = 3,
//     numberOfDataPoint = 51,
//     dataaa = [];
//
// for (var i = 0; i < numberOfSeries; ++i) {
//     dataaa.push(d3Array.range(numberOfDataPoint).map(function (i) {
//         return {x: i, y: Math.random() * 9};
//     }));
// }
// console.log(dataaa)

let datas = [
    d3Array.range(90).map(function (i) {
        return {x: i, y: i+2};
    }),

    d3Array.range(90).map(function (i) {
        return {x: i, y: i+7};
    })
];
// console.log(111111,datas)

// var stack = d3shape.stack().keys(['y']).offset(d3shape.stackOffsetNone)
// stack(datas); //<-B

// console.log(222222,stack(datas))

let padding = 40
let xPadding = 40

var data = [
    {month: 1, apples: 3840, bananas: 1920, cherries: 960, dates: 400},
    {month: 2, apples: 1600, bananas: 1440, cherries: 960, dates: 400},
    {month: 3, apples:  640, bananas:  960, cherries: 640, dates: 400},
    {month: 4, apples:  320, bananas:  480, cherries: 640, dates: 400}
];
// console.log(111111,data)
var stack = d3shape.stack()
    .keys(["apples", "bananas", "cherries", "dates"])
    .order(d3shape.stackOrderNone)
    .offset(d3shape.stackOffsetNone);

var series = stack(data);
// console.log(222222,series)


let width = Dimensions.get('window').width
let height = Dimensions.get('window').height / 2
const colors = ["#D96D69", "#FC993D","#47B2F8","#D22D35"]
const legend = ["apples", "bananas","cherries", "dates"]
const unit = "kg"
let yPadding = padding + Math.floor(legend.length/3) * 14 -2
const AnimationDurationMs = 250


export default class StackedArea extends Component {

    constructor(props) {
        super(props)

        var initPath = data.map(()=> '')



        this.state = {
            path: initPath,
            // datas:this.slice(30,60),
            datas: series,
            xStart:1,
            xEnd:4,
        }

        this.previous = initPath
        this.animating
    }

    componentWillMount() {
        this.computeNextState()
    }

    // panResponder = PanResponder.create({
    //     onStartShouldSetResponder: () => true,
    //     onMoveShouldSetPanResponder: () => true,
    //     onPanResponderGrant: (evt,gestureState) => {
    //         let touches = evt.nativeEvent.touches
    //         if (touches.length == 2) {
    //             let touch1 = touches[0]
    //             let touch2 = touches[1]
    //             this.touch1OriginX = touch1.pageX
    //             this.touch2OriginX = touch2.pageX
    //         } else {
    //             this.touch1OriginX = undefined
    //             this.touch2OriginX = undefined
    //             this.slideXorigin = gestureState.dx
    //         }
    //
    //     },
    //     onPanResponderMove: (evt,gestureState) => {
    //         let touches = evt.nativeEvent.touches
    //         if (touches.length == 2) {
    //             let touch1 = touches[0]
    //             let touch2 = touches[1]
    //             this.touch1DestX = touch1.pageX
    //             this.touch2DestX = touch2.pageX
    //         } else {
    //             this.touch1DestX = undefined
    //             this.touch2DestX = undefined
    //             this.slideXdest = gestureState.dx
    //         }
    //     },
    //     onPanResponderRelease: (evt,gestureState) => {
    //         let svgWidth = width - xPadding * 2
    //
    //         if (this.touch1OriginX != undefined) {
    //             let originXdif = Math.abs(this.touch1OriginX - this.touch2OriginX)
    //             let destXdif = Math.abs(this.touch1DestX - this.touch2DestX)
    //             if (destXdif < originXdif) {
    //                 //zoom in
    //                 let increment = originXdif - destXdif
    //                 let left,right
    //                 // if (touch1Xdif >= 0) {
    //                 //     left = this.state.xStart + Math.floor(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
    //                 //     right = this.state.xEnd - Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
    //                 // } else {
    //                 //     left = this.state.xStart + Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
    //                 //     right = this.state.xEnd - Math.floor(Math.abs(touch1Xdif) / svgWidth * this.state.datas[0].length)
    //                 // }
    //                 left = this.state.xStart + Math.floor(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
    //                 right = this.state.xEnd - Math.ceil(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
    //                 if (left < 0) left = 0
    //                 if (right > datas[0].length) right = datas[0].length
    //                 if (right-left > 8) {
    //                     this.setState({
    //                         datas:this.slice(left,right),
    //                         xStart:left,
    //                         xEnd:right,
    //                     })
    //                 }
    //             }
    //
    //             if (destXdif > originXdif) {
    //                 //zoom out
    //                 let increment =destXdif - originXdif
    //                 let left,right
    //                 // if (touch1Xdif >= 0) {
    //                 //     left = this.state.xStart - Math.floor(Math.abs(touch1Xdif) / svgWidth * this.state.datas[0].length)
    //                 //     right = this.state.xEnd + Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
    //                 // } else {
    //                 //     left = this.state.xStart - Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
    //                 //     right = this.state.xEnd + Math.floor(Math.abs(touch1Xdif) / svgWidth * this.state.datas[0].length)
    //                 // }
    //                 left = this.state.xStart - Math.floor(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
    //                 right = this.state.xEnd + Math.ceil(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
    //                 if (left < 0) left = 0
    //                 if (right > datas[0].length) right = datas[0].length
    //                 if (right-left > 8) {
    //                     this.setState({
    //                         datas:this.slice(left,right),
    //                         xStart:left,
    //                         xEnd:right,
    //                     })
    //                 }
    //             }
    //         } else {
    //             let offset = this.slideXdest - this.slideXorigin
    //             let offsetLength = Math.ceil(Math.abs(offset) / svgWidth * this.state.datas[0].length)
    //             let left, right
    //             if (offset > 0) {
    //                 //go to right
    //                 let marginRight = datas[0].length - this.state.xEnd
    //                 if (offsetLength > marginRight) {
    //                     left = this.state.xStart + marginRight
    //                     right = this.state.xEnd + marginRight
    //                 } else {
    //                     left = this.state.xStart + offsetLength
    //                     right = this.state.xEnd + offsetLength
    //                 }
    //
    //                 if (left >= 0 && right<= datas[0].length) {
    //                     this.setState({
    //                         datas:this.slice(left,right),
    //                         xStart:left,
    //                         xEnd:right,
    //                     })
    //                 }
    //             }
    //             if (offset < 0) {
    //                 //go to right
    //                 let marginLeft = this.state.xStart
    //                 if (offsetLength > this.state.xStart) {
    //                     left = this.state.xStart - this.state.xStart
    //                     right = this.state.xEnd - this.state.xStart
    //                 } else {
    //                     left = this.state.xStart - offsetLength
    //                     right = this.state.xEnd - offsetLength
    //                 }
    //                 if (left >= 0 && right<= datas[0].length) {
    //                     this.setState({
    //                         datas:this.slice(left,right),
    //                         xStart:left,
    //                         xEnd:right,
    //                     })
    //                 }
    //             }
    //
    //         }
    //         this.computeNextState()
    //     },
    // })

    // componentWillReceiveProps(nextProps) {
    //     this.computeNextState(nextProps)
    // }

    xScale = d3scale.scaleLinear().domain([xPadding, width - xPadding])

    yScale = d3scale.scaleLinear().domain([height - yPadding, yPadding])

    lineGenerator = d3shape.line()
        .x(d => this.xScale.invert(d.x))
        .y(d => this.yScale.invert(d.y))

    area = d3shape.area()
        .x(d => this.xScale.invert(d.data.month))
        .y0(d => this.yScale.invert(d[0]))
        .y1(d => this.yScale.invert(d[1]))

    // var stack = d3.layout.stack() //<-A
    //     .offset('zero');
    // stack(_data); //<-B
    //
    // renderLines(_data);
    //
    // renderAreas(_data);

    // function renderLines(stackedData) {
    //     _line = d3.svg.line()
    //         .x(function (d) {
    //             return _x(d.x); //<-C
    //         })
    //         .y(function (d) {
    //             return _y(d.y + d.y0); //<-D
    //         });
    //
    //     _bodyG.selectAll("path.line")
    //         .data(stackedData)
    //         .enter()
    //         .append("path")
    //         .style("stroke", function (d, i) {
    //             return _colors(i);
    //         })
    //         .attr("class", "line");
    //
    //     _bodyG.selectAll("path.line")
    //         .data(stackedData)
    //         .transition()
    //         .attr("d", function (d) {
    //             return _line(d);
    //         });
    // }
    //
    // function renderAreas(stackedData) {
    //     var area = d3.svg.area()
    //         .x(function (d) {
    //             return _x(d.x); //<-E
    //         })
    //         .y0(function(d){return _y(d.y0);}) //<-F
    //         .y1(function (d) {
    //             return _y(d.y + d.y0); //<-G
    //         });
    //
    //     _bodyG.selectAll("path.area")
    //         .data(stackedData)
    //         .enter()
    //         .append("path")
    //         .style("fill", function (d, i) {
    //             return _colors(i);
    //         })
    //         .attr("class", "area");
    //
    //     _bodyG.selectAll("path.area")
    //         .data(_data)
    //         .transition()
    //         .attr("d", function (d) {
    //             return area(d);
    //         });
    // }


    createScales = (width, height, xPadding, yPadding) => {
        //let xScale = d3scale.scaleTime().domain([padding, width - padding])
        let xScale = d3scale.scaleLinear().domain([xPadding, width - xPadding])
        // y grows to the bottom in SVG, but our y axis to the top
        let yScale = d3scale.scaleLinear().domain([height - yPadding, yPadding])
        if (!this.state) {
            xScale.range([0, data.length])
        } else {
            xScale.range([this.state.xStart, this.state.xEnd])
        }
        yScale.range([0, 8000])
        return {xScale, yScale}
    }

    computeNextState(nextProps) {
        this.xScale.range([this.state.xStart, this.state.xEnd])
        this.yScale.range([0, 8000])
        // const path = this.state.datas.map(lineDataPoints => {
        //     return this.lineGenerator(lineDataPoints)
        // })
        const path = this.state.datas.map(lineDataPoints => {
            return this.area(lineDataPoints)
        })


        //console.log(path)

        // this.setState({
        //     path:path
        // })

        if (!this.previous) {
            this.previous = path
        }

        // if (this.props !== nextProps) {

            const pathFrom = this.previous
            const pathTo = path

            cancelAnimationFrame(this.animating)
            this.animating = null

            LayoutAnimation.configureNext(
                LayoutAnimation.create(
                    AnimationDurationMs,
                    LayoutAnimation.Types.easeInEaseOut,
                    LayoutAnimation.Properties.opacity
                )
            )

            this.setState({
                path: pathTo.map((item,index) => Morph.Tween(pathFrom[index],item))
            }, () => {
                // Kick off our animations!
                this.animate()})

            this.previous = path
        // }
    }

    animate(start) {
        this.animating = requestAnimationFrame(timestamp => {
            if (!start) {
                start = timestamp
            }

            const delta = (timestamp - start) / AnimationDurationMs

            if (delta > 1) {
                this.animating = null
                this.setState({
                    path: this.previous
                })
                return
            }

            datas.forEach((item,index) => {
                this.state.path[index].tween(delta)
            })

            this.setState(this.state, () => {
                this.animate(start)
            })
        })
    }

    slice = (start,end) => (
        datas.map((item) => item.slice(start,end))
    )

    render() {
        // console.log('path: ',this.state.path)
        //console.log(SvgPath(this.state.path[0]).toString())
        let {xScale, yScale} = this.createScales(width, height, xPadding,yPadding)
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
                        <Unit
                            x={width - xPadding}
                            unit={unit}
                            y={yPadding}
                        />
                        <Axis
                            width={width - 2 * xPadding}
                            height={height}
                            xPadding={xPadding}
                            yPadding={yPadding}
                            startVal={this.state.xStart}
                            endVal={this.state.xEnd}
                            ticks={8}
                            scale={xScale}/>
                        <Axis
                            width={height - 2 * xPadding}
                            height={height}
                            xPadding={xPadding}
                            yPadding={yPadding}
                            startVal={0}
                            endVal={8000}
                            scale={yScale}
                            ticks={8}
                            vertical/>
                        {/*{this.state.path.map(*/}
                            {/*(path, index) => <Path*/}
                                {/*fill='none'*/}
                                {/*stroke={colors[index]}*/}
                                {/*strokeWidth='1.5'*/}
                                {/*d={SvgPath(path).toString()}*/}
                                {/*key={index}/>*/}
                        {/*)}*/}
                        {this.state.path.map(
                            (path, index) => {
                                // console.log(typeof path)
                                if (typeof path == 'string') {
                                    return (<Path
                                            fill={colors[index]}
                                            stroke={colors[index]}
                                            strokeWidth='1.5'
                                            fillOpacity="0.2"
                                            d={SvgPath(path).toString()}
                                            key={index}/>
                                    )
                                }
                            }
                        )}
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
