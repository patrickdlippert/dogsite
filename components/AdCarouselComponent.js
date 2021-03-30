import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, ImageBackground } from 'react-native';
import Slick from 'react-native-slick';
import { LinearGradient } from 'expo-linear-gradient';
 
function RenderAds({resources}) {
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

// This functional component creates an automated carousel advertisement box that is displayed on
// top of a blue gradient background. The images will be wide banners 320 x 60

function AdCarousel(props) {
    if(props.resources) {
        return(
            <View>
                <RenderAds resources={props.resources} />
            </View>
        );
    }
    return( <Text> This is failing </Text>) ;
}

const styles = StyleSheet.create({
    wrapper: {
        height: 80,
    },
    slide: {
        flex: 1
    },
    imageBox: {
        alignSelf: 'center',
        height: 60,
        width: 320,
        margin: 5
    }
  });

export default AdCarousel;