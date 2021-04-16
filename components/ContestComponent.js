import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        dogs: state.dogs,
        sponsors: state.sponsors
    };
};



class Contest extends Component {   
    render() {
        const { navigate } = this.props.navigation;

        const now = new Date();
        const startDate= new Date(now.getFullYear(), now.getMonth() - 1, 1).toJSON();
        const endDate = new Date(now.getFullYear(), now.getMonth(), 0).toJSON();


        // Find all dogs entered into the contest last month
        const dogsLastMonth = this.props.dogs.dogs.filter(dog => ((dog.date >= startDate && dog.date <= endDate) && dog.enterContest));
        
        // Find the highest rated dog out of this group
        const dog = [...dogsLastMonth].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).filter(dog => (dog.rating > 0))[0];

        // Find all dogs entered in the contest this month
        const dogsThisMonth = this.props.dogs.dogs.filter(dog => ((dog.date > endDate) && dog.enterContest));
        // Sort these dogs in order, newest first
        const pageData = [...dogsThisMonth].sort((a, b) => new Date(b.date) - new Date(a.date));


        const needsUri = dog.image.toString().includes('.png'); // Check for full file path vs imported image
        // Find the featured sponsor for the contest
        const sponsor = this.props.sponsors.sponsors.filter(sponsor => sponsor.featured)[0];


        const getHeader = () => {
            return(
                <Animatable.View 
                    animation='tada'
                    duration={2000}
                    delay={500}
                    marginBottom={10}
                >
                <Card>
                    <Card.Title style={styles.title}>Winner of last month's contest!</Card.Title>
                    <Text style={[styles.title, { color: '#9020d1', textAlign: 'center'}]}>
                        {dog.name}
                    </Text>
                    <View style={styles.cardContainer}>
                        {needsUri
                        ? <ImageBackground source={{uri: dog.image}} style={styles.cardImage}/>
                        : <ImageBackground source={dog.image} style={styles.cardImage}/>
                        }
                        
                        <Animatable.View 
                        animation='bounceInUp'
                        duration={3000}
                        delay={1000}
                        style={{position: 'absolute', top: 220, left: 0, right: 220, bottom: 0}}>
                            <Icon
                                name='trophy'
                                type='font-awesome'
                                color='#f1c410'
                                size={64}
                                />
                        </Animatable.View>

                    </View>

                    {/* Beneath the image, display the sponsor's image, description/comment that was submitted with the
                        image. 
                    */}
                    <TouchableOpacity onPress={ ()=>{ Linking.openURL(`${sponsor.url}`)}}>
                        <ImageBackground source={sponsor.image} style={styles.sponsorImage}/>
                    </TouchableOpacity>
       
                    <Text style={styles.textQuote}>
                        {dog.description}
                    </Text>

                    <Text style={{margin: 10}}>
                        Submit your dawg by checking the entry box on the profile tab.  The winner receives a year's supply of pet food compliments of {sponsor.name}!{"\n\n"}
                        Here are the latest entries for this month's pageant:
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
    sponsorImage: {
        alignSelf: 'center',
        height: 54,
        width: 288,
        margin: 0
    },
    title: {
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },
    textQuote: {
        fontStyle: 'italic',
        fontSize: 14,
        fontWeight: 'bold',
        margin:10
    }
});

export default connect(mapStateToProps)(Contest);