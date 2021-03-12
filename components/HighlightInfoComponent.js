import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Rating } from 'react-native-elements';
import { SPONSORS } from '../shared/sponsors';
import CardCarousel from './CardCarouselComponent';

function RenderHighlight({highlight}) {
    if (highlight) {
        
        return (
            <Card 

                image={highlight.image}
                imageStyle={{
                    width: "100%",
                    height: 300,
                   resizeMode: 'cover'
                  }}
            >
                <Text style={{margin: 10}}>
                    {highlight.description}
                </Text>
                <Text style={{margin: 10}}>
                    {highlight.address}
                </Text>
                <Rating imageSize={20} readonly startingValue={highlight.rating}  />
            </Card>
        );
    }
    return <View />;
}

class HighlightInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sponsors: SPONSORS
        };
    }

   // static navigationOptions = {
  //      title: 'Highlight Information'
 //   }

    static navigationOptions = ({ navigation }) => { 
        const highlight = navigation.getParam('highlight', [] );
        return {
            title: `${highlight.name}`,
            headerTitleStyle: {
                flex: 1,
                fontWeight: 'bold',
            }  
        }
     };


    render() {
        const highlight = this.props.navigation.getParam('highlight');
        return (
            <View>
            <RenderHighlight highlight={highlight} />
            <CardCarousel resources={this.state.sponsors} />
            </View>
        );
    }
}

export default HighlightInfo;