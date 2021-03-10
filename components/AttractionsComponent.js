import React, { Component } from 'react';
import { FlatList , View } from 'react-native';
import { Tile } from 'react-native-elements';
import { ATTRACTIONS } from '../shared/attractions';

class Attractions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attractions: ATTRACTIONS
        };
    }

    static navigationOptions = {
        title: 'Attractions'
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
        const renderAttractionsItem = ({item}) => {
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
                data={this.state.attractions}
                renderItem={renderAttractionsItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent = { this.FlatListItemSeparator }
            />
        );
    }
}

export default Attractions;