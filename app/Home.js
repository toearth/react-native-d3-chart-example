'use strict'
import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet,  FlatList, Text, View} from 'react-native'

const ChartList = ['Line', 'StackedArea', 'PieChartLabels', 'Radia']

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderItem = ({item}) => (
        <TouchableOpacity style={styles.row} onPress={()=>{this.props.navigation.navigate(item)}}>
            <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
    )

    renderSeparator = (sectionId, rowId, adjacentRowHighlighted) => {
        return (
            <View
                key={`${sectionId}-${rowId}`}
                style={styles.separator}
            />
        )
    }

    render() {
        return (
            <FlatList
                style={{flex: 1}}
                data={ChartList}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={item => item}
            />
        )
    }
}

const styles = StyleSheet.create({
    row:{
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    text:{
        fontSize: 18,
        marginLeft: 30
    },
    separator:{
        height: 1/3,
        backgroundColor: '#d5d5d5'
    }
})
