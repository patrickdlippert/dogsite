import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { SPONSORS } from '../shared/sponsors';

// The FullList component generates a scrollable list of thumbnails for one set of data.
// This is used when displaying a full list of: top dogs, newest posts or bottom dogs.
// Each thumbnail is clickable and will navigate to the DogDetail view for a larger image,
// dog breed, dog description/caption and rating.

class FullList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sponsors: SPONSORS
        };
    }


    render() {
        const { navigate } = this.props.navigation;
        const renderImageItem = ({item}) => {
            const needsUri = item.image.toString().includes('.png'); // Check for full file path vs imported image
            //const needsUri = item.image.toString().includes('http'); // Check for full file path vs imported image
            return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigate('DogDetail', { dogId: item.id, dogName: item.name }  )} >
                    {needsUri
                      ? <ImageBackground source={{uri: item.image}} style={styles.itemImage}/>
                      : <ImageBackground source={item.image} style={styles.itemImage}/>
                    }

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
                data={this.props.route.params.pageData}
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