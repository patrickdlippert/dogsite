import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { SPONSORS } from '../shared/sponsors';

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
                    {dog.address}
                </Text>
                <Rating imageSize={20} readonly startingValue={dog.rating}  />
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