import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import AdCarousel from './AdCarouselComponent';


const mapStateToProps = state => {
    return {
        dogs: state.dogs,
        breeds: state.breeds,
        favorites: state.favorites,
        sponsors: state.sponsors
    };
};



class Contest extends Component {   
    render() {
        const { navigate } = this.props.navigation;

        const pageData = [...this.props.dogs.dogs].sort((a, b) => new Date(b.date) - new Date(a.date)).filter(dog => (dog.enterContest));
        const breeds = this.props.breeds.breeds;
        const dog = [...pageData].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).filter(dog => (dog.rating > 0))[0];
        //const dog = pageData[0];
        const needsUri = dog.image.toString().includes('.png'); // Check for full file path vs imported image

        //pageData=this.props.dogs.dogs.filter(
        //    dog => this.props.favorites.includes(dog.id)
        //);

        const getHeader = () => {
            return(
                <Animatable.View 
                animation='tada'
                duration={2000}
                delay={500}
                margin={20}
                >
                <Card>
                    <Card.Title>Winner of last month's contest!</Card.Title>
                    <Text style={[styles.title, { color: '#9020d1', textAlign: 'center'}]}>
                        {dog.name}
                    </Text>
                    <View style={styles.cardContainer}>
                        {needsUri
                        ? <ImageBackground source={{uri: dog.image}} style={styles.cardImage}/>
                        : <ImageBackground source={dog.image} style={styles.cardImage}/>
                        }
                        
                        <Animatable.View 
                        animation='bounceOutUp'
                        duration={3000}
                        delay={1000}
                        style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0}}>
                            <Icon
                                name='trophy'
                                type='font-awesome'
                                color='#f1c410'
                                size={96}
                                />
                        </Animatable.View>

                    </View>

                    {/* Beneath the image, display the description/comment that was submitted with the
                        image. This is followed by the dog's breed that was selected at upload time.
                    */}

                    <Text style={{margin: 10}}>
                        {dog.description}
                    </Text>
                    <Text style={{margin: 10}}>
                        Dog Breed: {breeds[dog.breed].name}
                    </Text>
                    <Text style={{margin: 10}}>
                        Here are the latest contest entries for this month.
                    </Text>
                </Card>
                </Animatable.View>
            );
        };

        const renderImageItem = ({item}) => {
            const needsUri = item.image.toString().includes('.png'); // Check for full file path vs imported image
            return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigate('DogDetail', { dogId: item.id, dogName: item.name }  )} >

                    {needsUri
                      ? <ImageBackground source={{uri: item.image}} style={styles.itemImage}/>
                      : <ImageBackground source={item.image} style={styles.itemImage}/>
                    }
                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end'}}>
                        <Text style={styles.itemName}>
                        {item.name}
                        </Text>
                    </View>
                    </TouchableOpacity>
                </View>
            );
        };

        if(pageData.length) {
            return (
                <FlatGrid
                    itemDimension={90}
                    data={pageData}
                    style={styles.gridView}
                    spacing={10}
                    renderItem={renderImageItem}
                    ListHeaderComponent={getHeader}
                />
            );
        } else {
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.textItem}>There currently are no contests.</Text>
                </View>
            );

        }
    }
}



const styles = StyleSheet.create({
    textItem: {
        color: '#636e72',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textContainer: {
        flex:1,
        margin: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSubmit: {
        backgroundColor: '#5637DD',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,        
    },
    gridView: {
        backgroundColor: "#c8bee6",
        marginTop: 0,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 0,
        height: 150,
    },
    itemImage: {
        alignSelf: 'center',
        height: 150,
        width: 120,
        overflow: 'hidden',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 1
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
    cardContainer: {
        borderRadius: 5,
        padding: 0,
        height: 300
    },
    cardImage: {
        alignSelf: 'center',
        height: 300,
        width: "100%",
        overflow: 'hidden',
        borderColor: '#636e72',
        borderWidth: 1,
        borderRadius: 5
    },
    title: {
        marginVertical: 5,
        fontSize: 22,
        fontWeight: 'bold'
    }
});

export default connect(mapStateToProps)(Contest);