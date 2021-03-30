import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import Slick from 'react-native-slick';
import { LinearGradient } from 'expo-linear-gradient';
 
const styles = StyleSheet.create({
  wrapper: {
    height: 120,
},
  slide: {
    flex: 1,

  },
  text: {
    margin: 5,
    textAlign: 'center', 
    fontSize: 15,
    fontWeight: 'bold',
  },
  imageBox: {
    alignSelf: 'center',
    height: 82,
    width: 300,
    margin: 5

}
});


function ConstructCard({resource}) {
    if( {resource} ) {
        return(
            <View style={{marginBottom:15}}>
                <TouchableOpacity key={resource.id} onPress={ ()=>{ Linking.openURL(`${resource.url}`)}}>
                    <Card
                        featuredTitle={resource.displayName ? resource.name : ''}
                        image={resource.image}>
                        <Text
                        style={styles.text}>
                            {resource.description}
                        </Text>
                    </Card>
                </TouchableOpacity>
            </View>
        );
    }
    return ( <Text /> );
}


function RenderCards({resources}) {
    const cardslide = resources.map(resource => {
        return (
            <View key={resource.id} style={styles.slide}>
                <LinearGradient
                    colors={['#60106B', '#3046C5', '#d5fafa']}
                    style={styles.linearGradient}
                >
                <TouchableOpacity key={resource.id} onPress={ ()=>{ Linking.openURL(`${resource.url}`)}}>
                    <ImageBackground source={resource.image} style={styles.imageBox} />
                </TouchableOpacity>

                </LinearGradient>
            </View>
        );
    });

    return (
      <Slick style={styles.wrapper} showsButtons={false} autoplay={true} showsPagination={false}>
          {cardslide}
      </Slick>
    );
}



function CardCarousel(props) {
    if(props.resources) {
        return(
            <View>
                <RenderCards resources={props.resources} />
            </View>
        );
    }
    return( <Text> This is failing </Text>) ;
}

export default CardCarousel;