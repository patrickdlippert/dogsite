import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
//import { TextInput } from 'react-native-paper';
import SimpleImagePicker from './SimpleImagePickerComponent';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


class ProfileEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imagePath: '',
            dogName: '',
            dogBreed: '',
            comment: ''
        };
    }

    handleImageChange = (path) => {this.setState({imagePath: path})};
    

    handleProfile() {
        console.log(JSON.stringify(this.state));
        //this.props.postProfile(profileId, this.state.imagePath, this.state.dogBreed, this.state.comment);
        if (!this.state.imagePath) {
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
            imagePath: '',
            dogName: '',
            dogBreed: '',
            comment: '' 
        });
    }

    render() {
        const imagePath = this.state.imagePath;

        return (
        <KeyboardAwareScrollView style={{ flex: 1}}>
            <SimpleImagePicker imagePath={imagePath} onImageChange={this.handleImageChange} />
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Dog Breed</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.dogBreed}
                    onValueChange={itemValue => this.setState({dogBreed: itemValue})}
                >
                    <Picker.Item label="Choose a value..." value=""/>
                    <Picker.Item label="Beagle" value="beagle" />
                    <Picker.Item label="Border Terrier" value="borderterrier" />
                    <Picker.Item label="Boxer" value="boxer" />
                    <Picker.Item label="Bulldog" value="bulldog" />
                    <Picker.Item label="Cavalier King Charles Spaniel" value="ckcspaniel" />
                    <Picker.Item label="Chihuahua" value="chihuahua" />
                    <Picker.Item label="Dachshund" value="dachsund" />
                    <Picker.Item label="Dalmatian" value="dalmatian" />
                    <Picker.Item label="English Cocker Spaniel" value="ecspaniel" />
                    <Picker.Item label="English Springer Spaniel" value="esspaniel" />
                    <Picker.Item label="German Shepherd" value="germanshepherd" />
                    <Picker.Item label="Golden Retriever" value="goldenretriever" />
                    <Picker.Item label="Labrador Retriever" value="labrador" />
                    <Picker.Item label="Poodle" value="poodle" />
                    <Picker.Item label="Pug" value="pug" />
                    <Picker.Item label="Rottweiler" value="rottweiler" />
                    <Picker.Item label="Shih Tzu" value="shihtzu" />
                    <Picker.Item label="Schnauzer" value="schnauzer" />
                    <Picker.Item label="Staffordshire Bull Terrier" value="sbullterrier" />
                    <Picker.Item label="Welsh Corgi" value="corgi" />
                    <Picker.Item label="West Highland White Terrier" value="westie" />
                    <Picker.Item label="Yorkie" value="yorkie" />
                    <Picker.Item label="Other" value="other" />
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

export default ProfileEditor;