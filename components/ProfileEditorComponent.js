import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert, TextInput, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { postDog } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import ContestRules from './ContestRulesComponent';

const mapStateToProps = state => {
    return {
        breeds: state.breeds
    };
};

const mapDispatchToProps = {
    postDog: (imageurl, dogname, dogbreed, comment, enterContest) => (postDog(imageurl, dogname, dogbreed, comment, enterContest))
};

class ProfileEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '',
            dogName: '',
            dogBreed: '',
            comment: '',
            enterContest: false,
            showModalRules: false
        };
        this.toggleModalRules = this.toggleModalRules.bind(this);
    }

    toggleModalRules() {
        this.setState({showModalRules: !this.state.showModalRules});
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
        } else if (!this.state.dogBreed.toString().length) { // Allow for zero, but not empty string
            Alert.alert(
                'Breed Required',
                "You must enter your dog's breed (or unknown) for your profile.",
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
            this.props.postDog(this.state.imageUrl, this.state.dogName, this.state.dogBreed, this.state.comment, this.state.enterContest);
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
            comment: '',
            enterContest: false 
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
        const breeds = this.props.breeds.breeds;

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
                    {/* Dynamically load the list of breeds from the state into the Picker.Item */}
                    <Picker.Item label="Choose a value..." value=""/>

                    {breeds.map( (breed)=>{
                        return <Picker.Item label={breed.name} value={breed.id} key={breed.id} />
                    })}

                    
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

            <View style={styles.formRow}>
                <CheckBox
                    title={ 
                        <Text>
                            <Text>Check to enter this month's Pooch Pageant contest.</Text>
                            <Text
                                style={{color: '#5637DD' }} 
                                onPress={() => this.toggleModalRules()}> Official Rules.
                            </Text>
                        </Text>
                    }

                    center
                    checkedColor='#5637DD'
                    checked={this.state.enterContest}
                    onPress={() => this.setState({enterContest: !this.state.enterContest})}
                    containerStyle={styles.formCheckbox}
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
   

        {/* This is a Modal within a Modal for when the user clicks "Official Rules link within
        the outer Modal. This is a simple ScrollView with the text for the rules. */}
        <Modal
            animationType = {"slide"}
            transparent={false}
            visible={this.state.showModalRules}
            onRequestClose={() => this.toggleModalRules()}
        >
            <ScrollView style={{marginTop:15}}>
                <ContestRules/>
            </ScrollView>
            
            <View style={styles.buttonSection}>
                <Button
                    buttonStyle={styles.buttonSubmit}
                    onPress={() => {
                        this.toggleModalRules();
                    }}
                    title='Close'
                />
            </View>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps) (ProfileEditor);