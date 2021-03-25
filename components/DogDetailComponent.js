import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { SPONSORS } from '../shared/sponsors';
import { BREEDS } from '../shared/breeds';

const PAW_IMAGE = require('../assets/images/pawr.png')

function RenderDogDetail({dog}) {
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
                    Dog Breed: {BREEDS[dog.breed].name}
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
        return (
            <RenderDogDetail dog={dog} />
        );
    }
}

export default DogDetail;