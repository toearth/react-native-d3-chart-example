'use strict'
import React, {Component} from 'react'
import {View, StyleSheet,} from 'react-native'
import Home from './Home'
import Line from './Line'
import StackedArea from './StackedArea'
import PieChartLabels from './PieChartLabels'
import Radia from './radia/Radia'
import { StackNavigator } from 'react-navigation'

const RootNavigator = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: 'Home',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTitleStyle: {
                color: '#333',
                alignSelf: 'center',
                fontSize: 18
            },
        },
    },
    Line: {
        screen: Line,
        navigationOptions: {
            headerTitle: 'Line',
            headerStyle: {
                backgroundColor: '#FB7B2C',
            },
            headerTitleStyle: {
                color: '#fff',
                alignSelf: 'center',
                fontSize: 18
            },
        },
    },
    StackedArea: {
        screen: StackedArea,
        navigationOptions: {
            headerTitle: 'StackedArea',
            headerStyle: {
                backgroundColor: '#FB7B2C',
            },
            headerTitleStyle: {
                color: '#fff',
                alignSelf: 'center',
                fontSize: 18
            },
        },
    },
    PieChartLabels: {
        screen: PieChartLabels,
        navigationOptions: {
            headerTitle: 'PieChartLabels',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTitleStyle: {
                color: '#333',
                alignSelf: 'center',
                fontSize: 18
            },
        },
    },
    Radia: {
        screen: Radia,
        navigationOptions: {
            headerTitle: 'PieChartLabels',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTitleStyle: {
                color: '#333',
                alignSelf: 'center',
                fontSize: 18
            },
        },
    },
});


export default class App extends Component {
    //
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <RootNavigator />
        )
    }
}

// const styles = StyleSheet.create({})
