import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import Slick from 'react-native-slick';
 
const styles = StyleSheet.create({
  wrapper: {
    height: 275
},
  slide1: {
    flex: 1,
    backgroundColor: '#5637DD',
  },
  text: {
    margin: 10,
    textAlign: 'center', 
    fontSize: 15,
    fontWeight: 'bold',
  }
});


function ConstructCard({resource}) {
    if( {resource} ) {
        return(
            <Card
                featuredTitle={resource.displayName ? resource.name : ''}
                image={resource.image}>
                <Text
                style={styles.text}>
                    {resource.description}
                </Text>
            </Card>
        );
    }
    return ( <Text /> );
}


function RenderCards({resources}) {
    const cardslide = resources.map(resource => {
        return (
            <View key={resource.id} style={styles.slide1}>
                <ConstructCard resource={resource} />
            </View>
        );
    });

    return (
      <Slick style={styles.wrapper} showsButtons={true} autoplay={true}>
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