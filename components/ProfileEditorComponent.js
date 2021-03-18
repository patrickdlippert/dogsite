import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, Alert,  TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import SimpleImagePicker from './SimpleImagePickerComponent';


class ProfileEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imagePath: '',
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
            dogBreed: '',
            comment: '' 
        });
    }

    render() {
        const imagePath = this.state.imagePath;

        return (
        <ScrollView>
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
                    <Picker.Item label="West Highland White Terrier" value="westie" />
                    <Picker.Item label="Yorkie" value="yorkie" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Input
                    placeholder="Comment"
                    leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                    leftIconContainerStyle = {{paddingRight: 10}}
                    onChangeText={value => this.setState({ comment: value })}
                    value = {this.state.comment}
                />
            </View>
            <View style={styles.buttonSection}>
                <Button
                    onPress={() => {
                        this.handleProfile();
                    }}
                    color='#5637DD'
                    title='Submit'
                />
            </View>
            <View style={styles.buttonSection}>
                <Button
                    onPress={() => {
                        this.resetForm();
                        this.props.navigation.navigate('Home');
                    }}
                    color='#808080'
                    title='Cancel'
                />
            </View>

        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 1
    },
    formItem: {
        flex: 2,
        backgroundColor: '#cdcdcd'
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    buttonSection: {
        width: '50%',
        alignSelf: 'center',
        marginBottom: 10
     }
  
});

export default ProfileEditor;