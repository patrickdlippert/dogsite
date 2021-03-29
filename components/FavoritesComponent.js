import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import { deleteFavorite } from '../redux/ActionCreators';
import CardCarousel from './CardCarouselComponent';


const mapStateToProps = state => {
    return {
        dogs: state.dogs,
        favorites: state.favorites,
        sponsors: state.sponsors
    };
};

const mapDispatchToProps = {
    deleteFavorite: dogId => (deleteFavorite(dogId))
};


class Favorites extends Component {   
    render() {
        const { navigate } = this.props.navigation;
        pageData=this.props.dogs.dogs.filter(
            dog => this.props.favorites.includes(dog.id)
        );
        const renderImageItem = ({item}) => {
            const needsUri = item.image.toString().includes('.png'); // Check for full file path vs imported image
            return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigate('DogDetail', { dog: item }  )} >

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

        if(pageData.length) {
            return (
                <FlatGrid
                    itemDimension={90}
                    data={pageData}
                    style={styles.gridView}
                    spacing={10}
                    renderItem={renderImageItem}
                />
            );
        } else {
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.textItem}>You currently have no favorites. To add to your favorites, click the red heart on any dawg.</Text>
                </View>
            );

        }
    }
}



const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    },
    textItem: {
        color: '#636e72',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textContainer: {
        flex:1,
        margin: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSubmit: {
        backgroundColor: '#5637DD',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,        
    },
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);