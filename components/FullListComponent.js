import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { DOGS } from '../shared/dogs';
import { SPONSORS } from '../shared/sponsors';
import CardCarousel from './CardCarouselComponent';


const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
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
    },
  });

class FullList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: DOGS
        };
    }

    static navigationOptions = ({ navigation }) => {
        const id = navigation.getParam('id', 0);
        return {headerTitle: `${(id === 1) ? 'Newest Dawgz'
            : (id === 2) ? 'Bottom Dawgz'
            : 'Top Dawgz'}`}
     };


    render() {
        const id = this.props.navigation.getParam('id', 0);
        const { navigate } = this.props.navigation;
        const renderImageItem = ({item}) => {
            return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigate('HighlightInfo', { highlight: item }  )} >
                    <ImageBackground
                        source={item.image}

                        style={{
                            alignSelf: 'center',
                            height: 150,
                            width: 120,
                            borderWidth: 1,

                          }}
                    />
                     <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end'}}>
                        <Text style={styles.itemName}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                </View>
            );
        };

        const dataTop = [...this.state.dogs].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        const dataNew = [...this.state.dogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        const dataBottom = [...this.state.dogs].sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));



        return (
            <FlatGrid
                itemDimension={90}
                data={ id === 0 ? dataTop
                    : id === 1 ? dataNew
                    : id === 2 ? dataBottom
                    : dataTop }
                style={styles.gridView}
                spacing={10}
                renderItem={renderImageItem}
            />
        );
    }
}

export default FullList;