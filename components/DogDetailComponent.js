import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Card, Rating, Icon } from 'react-native-elements';
import { SPONSORS } from '../shared/sponsors';
import { connect } from 'react-redux';
import { postFavorite,  deleteFavorite } from '../redux/ActionCreators';
import AdCarousel from './AdCarouselComponent';

const PAW_IMAGE = require('../assets/images/pawr.png');

const mapStateToProps = state => {
    return {
        breeds: state.breeds,
        favorites: state.favorites,
        resources: state.sponsors
    };
  };

const mapDispatchToProps = {
    postFavorite: dogId => (postFavorite(dogId)),
    deleteFavorite: dogId => (deleteFavorite(dogId))
};

// The RenderDogDetail function assembles the card for the dog. Note that a clickable icon is
// placed on top of the image to mark/unmark the dog as a favorite. The dog's data is received
// as props, and two functions are also received as props to mark or remove a favorite.

function RenderDogDetail(props) {

    const {dog, breeds, favorite} = props;
    if (dog) {
        const needsUri = dog.image.toString().includes('.png'); // Check for full file path vs imported image
        return (
            <Card>
                <View style={styles.itemContainer}>
                {needsUri
                      ? <ImageBackground source={{uri: dog.image}} style={styles.itemImage}/>
                      : <ImageBackground source={dog.image} style={styles.itemImage}/>
                    }

                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 245, justifyContent: 'flex-end'}}>
                        <Icon
                            name={favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='tomato'
                            size={18}
                            raised
                            reverse
                            onPress={() => favorite ? 
                                props.removeFavorite() : props.markFavorite()}
                            />
                    </View>
                </View>

                <Text style={{margin: 10}}>
                    {dog.description}
                </Text>
                <Text style={{margin: 10}}>
                    Dog Breed: {breeds[dog.breed].name}
                </Text>

                {dog.rating
                    ? <Rating
                        type='custom'
                        ratingImage={PAW_IMAGE}
                        ratingColor='#f1c410' 
                        ratingBackgroundColor='#c8c7c8'
                        ratingCount={5}
                        imageSize={25}
                        startingValue={dog.rating}
                        readonly
                        style={{ paddingVertical: 10 }}
                        />
                    : (<View>
                        <Text style={styles.textItem}>Not rated yet</Text>
                        </View>)
                }

            </Card>
        );
    }
    return <View />;
}


// The DogDetail component creates a full screen view of a single dog's information.
// A card is created within a scroll view, and it contains a larger image, dog breed,
// dog description/caption and a rating value. The Rating component is using a custom
// gold paw icon instead of the standard ones.

class DogDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sponsors: SPONSORS
        };
    }

    markFavorite(dogId) {
        this.props.postFavorite(dogId);
    }

    removeFavorite(dogId) {
        this.props.deleteFavorite(dogId);
    }

    render() {
        const dog = this.props.route.params.dog;
        const breeds = this.props.breeds.breeds;
        
        return (
            <View style={styles.adContainer}>
                <View style={{flex: .85}}>
                <ScrollView>
                    <RenderDogDetail 
                        dog={dog} 
                        breeds={breeds} 
                        favorite={this.props.favorites.includes(dog.id)}
                        markFavorite={() => this.markFavorite(dog.id)}
                        removeFavorite={() => this.removeFavorite(dog.id)}
                    />
                </ScrollView>
                </View>
                <View  style={{flex: .15, position: 'absolute', left: 0, right: 0, bottom: 0}}>
                    <AdCarousel resources={this.state.sponsors} />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 5,
        padding: 0,
        height: 300
    },
    itemImage: {
        alignSelf: 'center',
        height: 300,
        width: "100%",
        overflow: 'hidden',
        borderColor: '#636e72',
        borderWidth: 1,
        borderRadius: 5
    },
    textItem: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    adContainer: {
        flex: 1,

    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(DogDetail);