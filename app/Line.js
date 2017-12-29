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

let datas = [
    d3Array.range(90).map(function (i) {
        return {x: i, y: i+2};
    }),

    d3Array.range(90).map(function (i) {
        return {x: i, y: i+7};
    })
];

let padding = 40
let xPadding = 40


let width = Dimensions.get('window').width
let height = Dimensions.get('window').height / 2
const colors = ["#D96D69", "#FC993D","#47B2F8"]
const legend = ["滚筒轴承温度", "主电机轴承温度","滚筒轴承温度"]
const unit = "km/h"
let yPadding = padding + Math.floor(legend.length/3) * 14 -2
const AnimationDurationMs = 250


export default class Line extends Component {

    constructor(props) {
        super(props)

        var initPath = datas.map(()=> '')

        this.state = {
            path: initPath,
            datas:this.slice(30,60),
            xStart:30,
            xEnd:60,
        }

        this.previous = initPath
        this.animating
    }

    componentWillMount() {
        this.computeNextState()
    }

    panResponder = PanResponder.create({
        onStartShouldSetResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt,gestureState) => {
            let touches = evt.nativeEvent.touches
            if (touches.length == 2) {
                let touch1 = touches[0]
                let touch2 = touches[1]
                this.touch1OriginX = touch1.pageX
                this.touch2OriginX = touch2.pageX
            } else {
                this.touch1OriginX = undefined
                this.touch2OriginX = undefined
                this.slideXorigin = gestureState.dx
            }

        },
        onPanResponderMove: (evt,gestureState) => {
            let touches = evt.nativeEvent.touches
            if (touches.length == 2) {
                let touch1 = touches[0]
                let touch2 = touches[1]
                this.touch1DestX = touch1.pageX
                this.touch2DestX = touch2.pageX
            } else {
                this.touch1DestX = undefined
                this.touch2DestX = undefined
                this.slideXdest = gestureState.dx
            }
        },
        onPanResponderRelease: (evt,gestureState) => {
            let svgWidth = width - xPadding * 2

            if (this.touch1OriginX != undefined) {
                let originXdif = Math.abs(this.touch1OriginX - this.touch2OriginX)
                let destXdif = Math.abs(this.touch1DestX - this.touch2DestX)
                if (destXdif < originXdif) {
                    //zoom in
                    let increment = originXdif - destXdif
                    let left,right
                    // if (touch1Xdif >= 0) {
                    //     left = this.state.xStart + Math.floor(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
                    //     right = this.state.xEnd - Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
                    // } else {
                    //     left = this.state.xStart + Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
                    //     right = this.state.xEnd - Math.floor(Math.abs(touch1Xdif) / svgWidth * this.state.datas[0].length)
                    // }
                    left = this.state.xStart + Math.floor(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
                    right = this.state.xEnd - Math.ceil(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
                    if (left < 0) left = 0
                    if (right > datas[0].length) right = datas[0].length
                    if (right-left > 8) {
                        this.setState({
                            datas:this.slice(left,right),
                            xStart:left,
                            xEnd:right,
                        })
                    }
                }

                if (destXdif > originXdif) {
                    //zoom out
                    let increment =destXdif - originXdif
                    let left,right
                    // if (touch1Xdif >= 0) {
                    //     left = this.state.xStart - Math.floor(Math.abs(touch1Xdif) / svgWidth * this.state.datas[0].length)
                    //     right = this.state.xEnd + Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
                    // } else {
                    //     left = this.state.xStart - Math.ceil(Math.abs(touch2Xdif) / svgWidth * this.state.datas[0].length)
                    //     right = this.state.xEnd + Math.floor(Math.abs(touch1Xdif) / svgWidth * this.state.datas[0].length)
                    // }
                    left = this.state.xStart - Math.floor(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
                    right = this.state.xEnd + Math.ceil(Math.abs(increment/2) / svgWidth * this.state.datas[0].length)
                    if (left < 0) left = 0
                    if (right > datas[0].length) right = datas[0].length
                    if (right-left > 8) {
                        this.setState({
                            datas:this.slice(left,right),
                            xStart:left,
                            xEnd:right,
                        })
                    }
                }
            } else {
                let offset = this.slideXdest - this.slideXorigin
                let offsetLength = Math.ceil(Math.abs(offset) / svgWidth * this.state.datas[0].length)
                let left, right
                if (offset > 0) {
                    //go to right
                    let marginRight = datas[0].length - this.state.xEnd
                    if (offsetLength > marginRight) {
                        left = this.state.xStart + marginRight
                        right = this.state.xEnd + marginRight
                    } else {
                        left = this.state.xStart + offsetLength
                        right = this.state.xEnd + offsetLength
                    }

                    if (left >= 0 && right<= datas[0].length) {
                        this.setState({
                            datas:this.slice(left,right),
                            xStart:left,
                            xEnd:right,
                        })
                    }
                }
                if (offset < 0) {
                    //go to right
                    let marginLeft = this.state.xStart
                    if (offsetLength > this.state.xStart) {
                        left = this.state.xStart - this.state.xStart
                        right = this.state.xEnd - this.state.xStart
                    } else {
                        left = this.state.xStart - offsetLength
                        right = this.state.xEnd - offsetLength
                    }
                    if (left >= 0 && right<= datas[0].length) {
                        this.setState({
                            datas:this.slice(left,right),
                            xStart:left,
                            xEnd:right,
                        })
                    }
                }

            }
            this.computeNextState()
        },
    })

    // componentWillReceiveProps(nextProps) {
    //     this.computeNextState(nextProps)
    // }

    xScale = d3scale.scaleLinear().domain([xPadding, width - xPadding])

    yScale = d3scale.scaleLinear().domain([height - yPadding, yPadding])

    lineGenerator = d3shape.line()
        .x(d => this.xScale.invert(d.x))
        .y(d => this.yScale.invert(d.y))



    createScales = (width, height, xPadding, yPadding) => {
        //let xScale = d3scale.scaleTime().domain([padding, width - padding])
        let xScale = d3scale.scaleLinear().domain([xPadding, width - xPadding])
        // y grows to the bottom in SVG, but our y axis to the top
        let yScale = d3scale.scaleLinear().domain([height - yPadding, yPadding])
        if (!this.state) {
            xScale.range([0, datas.length])
        } else {
            xScale.range([this.state.xStart, this.state.xEnd])
        }
        yScale.range([0, 97])
        return {xScale, yScale}
    }

    computeNextState(nextProps) {
        this.xScale.range([this.state.xStart, this.state.xEnd])
        this.yScale.range([0, 97])
        const path = this.state.datas.map(lineDataPoints => {
            return this.lineGenerator(lineDataPoints)
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
        //console.log(this.state.path[0])
        //console.log(SvgPath(this.state.path[0]).toString())
        let {xScale, yScale} = this.createScales(width, height, xPadding,yPadding)
        // let data = []
        // this.state.datas && this.state.datas.forEach(lineDataPoints => {
        //     data.push(lineGenerator(lineDataPoints))
        // })
        return (
            <View>
                <View style={{marginTop: 35}} {...this.panResponder.panHandlers}>
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
                            endVal={97}
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
                                            fill='none'
                                            stroke={colors[index]}
                                            strokeWidth='1.5'
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
