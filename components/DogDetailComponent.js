import React, { Component } from 'react';
import { Text, View, Modal, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Card, Rating, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { postFavorite,  deleteFavorite, postDogRating, postReview } from '../redux/ActionCreators';
import AdCarousel from './AdCarouselComponent';
import { format } from 'date-fns';

const PAW_IMAGE = require('../assets/images/pawr.png');

const mapStateToProps = state => {
    return {
        dogs: state.dogs,
        breeds: state.breeds,
        favorites: state.favorites,
        reviews: state.reviews,
        sponsors: state.sponsors
    };
  };

const mapDispatchToProps = {
    postFavorite: dogId => (postFavorite(dogId)),
    deleteFavorite: dogId => (deleteFavorite(dogId)),
    postDogRating: (dogId, rating) => (postDogRating(dogId, rating)),
    postReview: (dogId, rating) => (postReview(dogId, rating))
};

// The RenderDogDetail function assembles the card for the dog. Note that a clickable icon is
// placed on top of the image to mark/unmark the dog as a favorite. The dog's data is received
// as props, and two functions are also received as props to mark or remove a favorite.

function RenderDogDetail(props) {

    const {dog, breeds, favorite, reviewed } = props;
    if (dog) {
        const needsUri = dog.image.toString().includes('.png'); // Check for full file path vs imported image
        return (
            <Card>
                <View style={styles.itemContainer}>
                {needsUri
                      ? <ImageBackground source={{uri: dog.image}} style={styles.itemImage}/>
                      : <ImageBackground source={dog.image} style={styles.itemImage}/>
                    }

                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 245}}>
                        <Icon
                            name={favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='tomato'
                            size={16}
                            raised
                            reverse
                            onPress={() => favorite ? 
                                props.removeFavorite() : props.markFavorite()}
                            />

                        <Icon
                            name={'paw'}
                            type='font-awesome-5'
                            color={reviewed ? '#808080' : '#f1c410'}   
                            size={16}
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                            //onPress={() => props.updateRating()}
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
                    ? <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Rating
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
                            <Text>  ({dog.numRatings} votes)</Text>
                        </View>
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
            showModal: false,
            newRating: 3,
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            showModal: false,
            newRating: 3
        });
    }

    markFavorite(dogId) {
        this.props.postFavorite(dogId);
    }

    removeFavorite(dogId) {
        this.props.deleteFavorite(dogId);
    }

    updateRating(dogId, rating) {
        this.props.postDogRating(dogId, rating);
        this.props.postReview(dogId, rating);
        this.toggleModal();
    }

    render() {
        const dogId = this.props.route.params.dogId;
        const dog = this.props.dogs.dogs[dogId];
        const breeds = this.props.breeds.breeds;
        //const reviewed = this.props.reviews.includes(dog.id);
        const reviewed = this.props.reviews.filter(review => review.dogId === dogId)[0];
        
        return (
            <View style={styles.adContainer}>
                <View style={{flex: .85}}>
                    <ScrollView>
                        <RenderDogDetail 
                            dog={dog} 
                            breeds={breeds} 
                            favorite={this.props.favorites.includes(dog.id)}
                            reviewed={reviewed}
                            markFavorite={() => this.markFavorite(dog.id)}
                            removeFavorite={() => this.removeFavorite(dog.id)}
                            onShowModal={() => this.toggleModal()}
                            updateRating={() => this.updateRating(dog.id, 4)}
                        />
                        <Modal
                            animationType={'fade'}
                            transparent={true}
                            visible={this.state.showModal}
                            onRequestClose={() => this.toggleModal()}
                        >
                            <View style={styles.modal}>
                            <View style={{
                                backgroundColor: 'rgb(255,255,255)',
                                alignItems: 'center',
                                width: 300,
                                height: 300,
                                }}
                            >   

                            { reviewed ?
                                (<View>
                                    <Text style={[styles.title, { color: '#9020d1'}]}>
                                        You have already reviewed this dawg!
                                    </Text>
                                    <View style={styles.buttonSection}>
                                    <Text style={styles.textInfo}>Your Rating: {reviewed.rating}</Text>
                                    <Text style={styles.textInfo}>Date: {format(new Date(reviewed.date), 'MMMM do, yyyy H:mma')}{'\n\n'}</Text>
                                    
                                        <Button
                                            buttonStyle={styles.buttonCancel}
                                            onPress={() => {
                                                this.toggleModal();
                                                this.resetForm();
                                            }}
                                            title='Cancel'
                                        />
                                    </View>
                                </View>)

                            :   (<View>
                                    <Text style={[styles.title, { color: '#9020d1'}]}>
                                        Rate this dawg!
                                    </Text>
                                    <Rating
                                        startingValue={parseInt(this.state.newRating)}
                                        imageSize={40}
                                        minValue={1}
                                        showRating
                                        onFinishRating={newRating => this.setState({newRating: newRating})} 
                                        style={{paddingVertical: 10}}

                                        type='custom'
                                        ratingImage={PAW_IMAGE}
                                        ratingColor='#f1c410' 
                                        ratingBackgroundColor='#c8c7c8'
                                    />

                                
                                    <View style={styles.buttonSection}>
                                        <Button
                                            buttonStyle={styles.buttonSubmit}
                                            onPress={() => {
                                                this.updateRating(dog.id, this.state.newRating);
                                                this.toggleModal();
                                            }}
                                            title='Submit'
                                        />

                                        <Button
                                            buttonStyle={styles.buttonCancel}
                                            onPress={() => {
                                                this.toggleModal();
                                                this.resetForm();
                                            }}
                                            title='Cancel'
                                        />
                                    </View>
                                </View>)

                            }
                            </View>
                            </View>

                        </Modal>


                    </ScrollView>
                </View>

            
                <View  style={{flex: .15, position: 'absolute', left: 0, right: 0, bottom: 0}}>
                    <AdCarousel resources={this.props.sponsors.sponsors} />
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
    textInfo: {
        color: 'black',
        fontSize: 12,
    },
    adContainer: {
        flex: 1,

    },
    modal: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    title: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonSection: {
        width: 225,
        alignSelf: 'center',
        marginTop: 20
    },
    buttonSubmit: {
        backgroundColor: '#5637DD',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,        
    },
    buttonCancel: {
        backgroundColor: '#808080',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5  
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(DogDetail);