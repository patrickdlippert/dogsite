import React, { Component } from 'react';
import { FlatList , View } from 'react-native';
import { Tile } from 'react-native-elements';
import { RESTAURANTS } from '../shared/restaurants';

class Restaurants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: RESTAURANTS
        };
    }

    static navigationOptions = {
        title: 'Restaurants'
    };


    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      }

    render() {
        const { navigate } = this.props.navigation;
        const renderRestaurantsItem = ({item}) => {
            return (
                <Tile
                    imageSrc={item.image}
                    title={item.name}
                    featured caption={item.type}
                    onPress={() => navigate('HighlightInfo', { highlight: item }  )}
                    icon={{ name: 'play-circle', type: 'font-awesome' }}
                />
            );
        };

        return (
            <FlatList
                data={this.state.restaurants}
                renderItem={renderRestaurantsItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent = { this.FlatListItemSeparator }
            />
        );
    }
}

export default Restaurants;