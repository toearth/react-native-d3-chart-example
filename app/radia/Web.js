'use strict'
import React, {Component} from 'react'
import Svg, {Path, G, Text, Polyline, Polygon, Line, Circle} from 'react-native-svg'

export default class Web extends Component {
    //
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let { webs, webPoints, level, textPoints, fieldNames} = this.props
        return (
            <G>
                {webs.reverse().map(
                    (points, index) => {
                        return (
                            <Polygon
                                key={index}
                                points={points}
                                fill={index % 2 === 1 ? 'white' : 'lightgray'}
                                fillOpacity={"0.5"}
                                stroke={'gray'}
                                strokeDasharray={[10,5]}
                            />
                        )
                    }
                )}
                {webPoints[level-1].map(
                    (item, index) => (
                        <G key={'G' + index}>
                            <Line
                                key={index}
                                stroke="gray"
                                strokeWidth="0.5"
                                strokeDasharray={[10,5]}
                                x1={0}
                                y1={0}
                                x2={item.x}
                                y2={item.y}/>
                            <Text
                                fill='#555555'
                                // stroke={colors[index]}
                                dy=".35em"
                                textAnchor='middle'
                                // fillOpacity="0.2"
                                x={textPoints[index].x}
                                y={textPoints[index].y -10}
                                key={'text'+index}>
                                {fieldNames[index]}
                            </Text>
                        </G>
                    )
                )
                }
            </G>
        )
    }
}

