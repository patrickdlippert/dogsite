import React, { Component } from 'react';
import { FlatList , View } from 'react-native';
import { Tile } from 'react-native-elements';
import { EVENTS } from '../shared/events';

class Events extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: EVENTS
        };
    }

    static navigationOptions = {
        title: 'Events'
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
        const renderEventsItem = ({item}) => {
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
                data={this.state.events}
                renderItem={renderEventsItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent = { this.FlatListItemSeparator }
            />
        );
    }
}

export default Events;