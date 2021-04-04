import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { postDog } from '../redux/ActionCreators';
import { connect } from 'react-redux';


const mapDispatchToProps = {
    postDog: (imageurl, dogname, dogbreed, comment) => (postDog(imageurl, dogname, dogbreed, comment))
};

class ProfileEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            dogName: '',
            dogBreed: '',
            comment: ''
        };
    }

    handleImageChange = (path) => {this.setState({imageUrl: path})};
    

    handleProfile() {
        console.log(JSON.stringify(this.state));
        //this.props.postProfile(profileId, this.state.imageUrl, this.state.dogBreed, this.state.comment);
        if (!this.state.imageUrl) {
            Alert.alert(
                'Image Required',
                'You must select an image for your dog profile',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('No image selected'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('OK selected. Trying again.'),
                    }
                ],
                { cancelable: false }
            );
        } else if (!this.state.dogName) {
            Alert.alert(
                'Name Required',
                "You must enter your dog's name for your profile.",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('No dog name entered'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('OK selected. Trying again.'),
                    }
                ],
                { cancelable: false }
            );
        } else if (!this.state.dogBreed) {
            Alert.alert(
                'Breed Required',
                "You must enter your dog's breed (or other) for your profile.",
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('No dog breed entered'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('OK selected. Trying again.'),
                    }
                ],
                { cancelable: false }
            );
        } else {
            this.props.postDog(this.state.imageUrl, this.state.dogName, this.state.dogBreed, this.state.comment);
            Alert.alert(
                "Profile Submitted",
                "You're all set! Your dog profile will be posted momentarily.",
                [
                  {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate('Home')
                  },
                ],
                { cancelable: false }
            );
            this.resetForm();
        }
    }

    resetForm() {
        this.setState({
            imageUrl: '',
            dogName: '',
            dogBreed: '',
            comment: '' 
        });
    }


    getImageFromGallery = async () => {
        //const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const cameraRollPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraRollPermissions.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        } else {
            Alert.alert(
                'Image Permissions Required',
                'Sorry, we need camera roll permissions to make this work. Please check your settings',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('No image selected'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('OK selected. Trying again.'),
                    }
                ],
                { cancelable: false }
            );
        }
    }

    writeImageToGallery = async (imgUri) => {
        const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermissions.status === 'granted') {
            const savedImage = await MediaLibrary.saveToLibraryAsync (imgUri);
        }
    }

    processImage = async(imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
                imgUri,
                [{resize: {width:400}}],
                { format: ImageManipulator.SaveFormat.PNG }
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri});
        //this.writeImageToGallery(processedImage.uri);
    }


    render() {
        const imageUrl = this.state.imageUrl;

        return (
        <KeyboardAwareScrollView style={{ flex: 1}}>

            <View style={styles.centerContainer}>
                <Text style={[styles.title, { color: '#9020d1'}]}>
                    Tell us about your dawg!
                </Text>

                <View style={styles.imageContainer}>
                    <TouchableOpacity  onPress={this.getImageFromGallery}>
                        {!imageUrl ? (
                            <ImageBackground
                                source={require('../assets/images/placeholder.png')}
                                style={styles.imageBox}
                                resizeMode='contain'
                            />
                        ) : (
                            <ImageBackground
                                source={{ uri: imageUrl }}
                                style={styles.imageBox}
                                resizeMode='contain'
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Dog Breed</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.dogBreed}
                    onValueChange={itemValue => this.setState({dogBreed: itemValue})}
                >
                    <Picker.Item label="Choose a value..." value=""/>
                    <Picker.Item label="Australian Shepherd" value="1" />
                    <Picker.Item label="Beagle" value="2" />
                    <Picker.Item label="Border Terrier" value="3" />
                    <Picker.Item label="Boxer" value="4" />
                    <Picker.Item label="Bulldog" value="5" />
                    <Picker.Item label="Cairn Terrier" value="6" />
                    <Picker.Item label="Cavalier King Charles Spaniel" value="7" />
                    <Picker.Item label="Chihuahua" value="8" />
                    <Picker.Item label="Dachshund" value="9" />
                    <Picker.Item label="Dalmatian" value="10" />
                    <Picker.Item label="Doberman Pinscher" value="11" />
                    <Picker.Item label="English Cocker Spaniel" value="12" />
                    <Picker.Item label="English Springer Spaniel" value="13" />
                    <Picker.Item label="German Shepherd" value="14" />
                    <Picker.Item label="Golden Retriever" value="15" />
                    <Picker.Item label="Irish Setter" value="16" />
                    <Picker.Item label="Jack Russell Terrier" value="17" />
                    <Picker.Item label="Labrador Retriever" value="18" />
                    <Picker.Item label="Pomeranian" value="19" />
                    <Picker.Item label="Poodle" value="20" />
                    <Picker.Item label="Pug" value="21" />
                    <Picker.Item label="Rottweiler" value="22" />
                    <Picker.Item label="Shih Tzu" value="23" />
                    <Picker.Item label="Schnauzer" value="24" />
                    <Picker.Item label="Scottish Terrier" value="25" />
                    <Picker.Item label="Staffordshire Bull Terrier" value="26" />
                    <Picker.Item label="Welsh Corgi" value="27" />
                    <Picker.Item label="West Highland White Terrier" value="28" />
                    <Picker.Item label="Yorkie" value="29" />
                    <Picker.Item label="Other" value="30" />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <TextInput
                    required
                    style={[styles.formInput, {height: 35}]}
                    mode="outlined"
                    label="Dog's Name"
                    autoCompleteType="name"
                    keyboardType="default"
                    textContentType="givenName"
                    placeholder="Dog's Name"
                    onChangeText={value => this.setState({ dogName: value })}
                    value = {this.state.dogName}
                />
            </View>

            <View style={styles.formRow}>
                <TextInput
                    multiline
                    blurOnSubmit
                    numberOfLines={5}
                    style={[styles.formInput, {height: 70, paddingTop: 0}]}
                    mode="outlined"
                    label="Comment"
                    placeholder="Comment"
                    onChangeText={value => this.setState({ comment: value })}
                    value = {this.state.comment}
                />
            </View>
            <View style={styles.buttonSection}>
                <Button
                 buttonStyle={styles.buttonSubmit}
                    onPress={() => {
                        this.handleProfile();
                    }}
                    title='Submit'
                />

                <Button
                    buttonStyle={styles.buttonCancel}
                    onPress={() => {
                        this.resetForm();
                        this.props.navigation.navigate('Home');
                    }}
                    title='Cancel'
                />
            </View>
        </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        alignItems: 'center',
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
    title: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold'
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 5
    },
    formLabel: {
        fontSize: 16,
        flex: 1
    },
    formItem: {
        flex: 2,
        backgroundColor: '#cdcdcd',
    },
    formInput: {
        flex: 1, 
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        textAlignVertical: 'top',
        backgroundColor: '#cdcdcd',
        padding: 5,
        borderWidth: 1,
        borderRadius:5
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    buttonSection: {
        width: '75%',
        alignSelf: 'center',
        marginTop: 20
     },
     buttonSubmit: {
        backgroundColor: '#5637DD',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,        
    },
    buttonCancel: {
        backgroundColor: '#808080',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5  
    }
});

export default connect(null, mapDispatchToProps) (ProfileEditor);