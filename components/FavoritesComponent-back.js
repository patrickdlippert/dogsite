import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { deleteFavorite } from '../redux/ActionCreators';
import AdCarousel from './AdCarouselComponent';


const mapStateToProps = state => {
    return {
        dogs: state.dogs,
        favorites: state.favorites,
        sponsors: state.sponsors
    };
};

const mapDispatchToProps = {
    deleteFavorite: dogId => (deleteFavorite(dogId))
};


class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {
        const { navigate } = this.props.navigation;
        pageData=this.props.dogs.dogs.filter(
            dog => this.props.favorites.includes(dog.id)
        );
        console.log(pageData);
        if(pageData.length) {
            navigate('FullList', { pageData: pageData, title: 'Favorite Dawgz' });
        return (
            <View />

        );
        } else {
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.textItem}>You currently have no favorites. To add to your favorites, click the red heart on any dawg.</Text>
                </View>
            );

        }
    }
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    },
    textItem: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textContainer: {
        flex:1,
        margin: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSubmit: {
        backgroundColor: '#5637DD',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,        
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);