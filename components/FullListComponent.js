import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { SPONSORS } from '../shared/sponsors';

class FullList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sponsors: SPONSORS
        };
    }


    render() {
        const id = this.props.route.params.section.id;
        const { navigate } = this.props.navigation;
        const renderImageItem = ({item}) => {
            return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigate('DogDetail', { dog: item }  )} >
                    <ImageBackground
                        source={item.image}
                        style={styles.itemImage}
                    />
                     <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end'}}>
                        <Text style={styles.itemName}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                </View>
            );
        };


        return (
            <FlatGrid
                itemDimension={90}
                data={this.props.route.params.section.pageData}
                style={styles.gridView}
                spacing={10}
                renderItem={renderImageItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 0,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 0,
        height: 150,
    },
    itemImage: {
        alignSelf: 'center',
        height: 150,
        width: 120,
        overflow: 'hidden',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 1
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        textShadowColor: 'black', 
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 3, 
        fontWeight: '800'
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
  });

export default FullList;