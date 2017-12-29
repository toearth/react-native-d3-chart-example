'use strict'
import React, {Component} from 'react'
import {G, Polygon,Circle} from 'react-native-svg'

export default class Areas extends Component {

    static defaultProps = {
    colors:[
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
        ]
    }

    //
    constructor(props) {
        super(props)
        this.state = {}
    }



    render() {
        let {areas,colors} = this.props
        let render = areas.map(
            (items, index) => (
                <G key={'area' + index}>
                    <Polygon
                        points={items.area}
                        fill={colors[index]}
                        fillOpacity={"0.5"}
                        stroke={colors[index]}
                    />
                    {items.circles.map(
                        (item, inSideindex) => (
                            <Circle
                                key={'circle' + index + inSideindex}
                                cx={item.x}
                                cy={item.y}
                                r={3}
                                stroke={colors[index]}
                                fill={'white'}
                                // strokeWidth={3}
                            />
                        )
                    )
                    }
                </G>
            )
        )
        return (
            <G>
                {render}
            </G>
        )
    }
}
