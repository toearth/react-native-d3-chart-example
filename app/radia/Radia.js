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
import Svg, {Path, G, Text, Polyline, Polygon, Line, Circle} from 'react-native-svg'
import Web from './Web'
import Areas from './Areas'

const padding = 40
const xPadding = 40

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height / 2
const yPadding = 40
const radius = 100
const total = 5
const level = 3
const rangeMin = 0
const rangeMax = 100
const arc = 2 * Math.PI
const onePiece = arc / total


var data = {
    fieldNames: ['语文','数学','外语','物理','化学'],
    values: [
        [10,20,30,40,50],
        [70,80,90,100,20],
        [30,80,10,80,20],
    ]
}

var result = {
    webs:[],
    webPoints: [],
    areas: []
}

for (var k = 1; k < level +1; k++ ) {
    let webs = ''
    let webPoints = []
    let r = radius/level * k
    let textPoint = []
    let textRadius = radius + 20

    for (var i=0; i<total; i++) {
        let x = getX(r, i)
        let y = getY(r, i)
        webs += `${x},${y} `
        webPoints.push({
            x,y
        })

        let textX = getX(textRadius, i)
        let textY = getY(textRadius, i)
        textPoint.push({
            x: textX,
            y: textY
        })

    }
    result.webPoints.push(webPoints)
    result.webs.push(webs)

    if (!result.textPoints) {
        result.textPoints = textPoint
    }
}

var circlesArray = []
var areaArray = []


data.values.forEach((items, index) => {
        let circles = []
        let area = ''
        items.forEach((item, insideIndex) => {
            let radiaRadius = radius * (data.values[index][insideIndex] - rangeMin)/(rangeMax - rangeMin)
            let x = getX(radiaRadius, insideIndex)
            let y = getY(radiaRadius, insideIndex)
            area += `${x},${y} `
            circles.push({
                x,
                y
            })
        })
        result.areas.push({area,circles})
    }
)


console.log(result)

function getX(r, i) {
    return r * Math.sin(i * onePiece)
}

function getY(r, i) {
    return -r * Math.cos(i * onePiece)
}


export default class Radia extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: result,
        }
        //
        // this.previous = initPath
        // this.animating
    }

    midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    render() {
        return (
            <View>
                <View style={{marginTop: 35}}>
                    <Svg height={height} width={width}>

                        <G x={width/2} y={radius+yPadding} >
                            <Web
                                webs={result.webs}
                                webPoints={result.webPoints}
                                level={level}
                                textPoints={result.textPoints}
                                fieldNames={data.fieldNames}
                            />
                            <Areas
                                areas={result.areas}
                            />
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
