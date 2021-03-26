import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { SPONSORS } from '../shared/sponsors';
import { connect } from 'react-redux';
//import CardCarousel from './CardCarouselComponent';

const PAW_IMAGE = require('../assets/images/pawr.png');

const mapStateToProps = state => {
    return {
        breeds: state.breeds
    };
  };

function RenderDogDetail({dog, breeds}) {
    if (dog) {
        return (
            <Card>
                <Image
                    style={{
                        width: "100%",
                        height: 300,
                      }}
                    resizeMode="cover"
                    source={dog.image}
                />
   
                <Text style={{margin: 10}}>
                    {dog.description}
                </Text>
                <Text style={{margin: 10}}>
                    Dog Breed: {breeds[dog.breed].name}
                </Text>
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
            </Card>
        );
    }
    return <View />;
}

class DogDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sponsors: SPONSORS
        };
    }

    render() {
        const dog = this.props.route.params.dog;
        const breeds = this.props.breeds.breeds;
        
        return (
            <ScrollView>
                <RenderDogDetail dog={dog} breeds={breeds} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(DogDetail);