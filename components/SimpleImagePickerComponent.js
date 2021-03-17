import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


export default function SimpleImagePicker(props) {
    const [imageSource, setImage] = useState(null);
    const [selectedDogBreed, setSelectedDogBreed] = useState();

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
        setImage(result.uri);
        props.onImageChange(result.uri);
        }
    };


  return (
    <View
      style={[
        styles.flex,
        styles.centerContainer
      ]}
    >
        <Text style={[styles.title, { color: '#9020d1'}]}>
            Tell us about your dawg!
        </Text>

        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage}>
                {imageSource === null ? (
                    <ImageBackground
                        source={require('../assets/images/placeholder.png')}
                        style={styles.imageBox}
                        resizeMode='contain'
                    />
                ) : (
                    <ImageBackground
                        source={{ uri: imageSource }}
                        style={styles.imageBox}
                        resizeMode='contain'
                    />
                )}
            </TouchableOpacity>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    centerContainer: {
        alignItems: 'center',
   
    },
    title: {
        marginTop: 10,
        fontSize: 22
    },
    // add below
    selectButtonContainer: {
        margin: 20,
        borderRadius: 5
    },
    selectButtonTitle: {
        padding: 10,
        fontSize: 18
    },
    imageContainer: {
        marginVertical: 10,
        borderWidth: 0,
        borderColor: '#ff5555'
        
    },
    imageBox: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        overflow: 'hidden',
        borderColor: '#636e72',
        borderWidth: 1,
        borderRadius: 5
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    }
  });
  