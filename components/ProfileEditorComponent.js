import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
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
        this.handleImagechange = this.handleImageChange.bind(this);
    }

    handleImageChange(path) {
        this.setState({imagePath: path});
    }

    handleProfile() {
        console.log(JSON.stringify(this.state));
        //this.props.postProfile(profileId, this.state.imagePath, this.state.dogBreed, this.state.comment);
        this.resetForm();
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
                    <Picker.Item label="Beagle" value="beagle" />
                    <Picker.Item label="Border Terrier" value="borderterrier" />
                    <Picker.Item label="Boxer" value="boxer" />
                    <Picker.Item label="Cavalier King Charles Spaniel" value="ckcspaniel" />
                    <Picker.Item label="Chihuahua" value="chihuahua" />
                    <Picker.Item label="English Cocker Spaniel" value="ecspaniel" />
                    <Picker.Item label="English Springer Spaniel" value="esspaniel" />
                    <Picker.Item label="German Shepherd" value="germanshepherd" />
                    <Picker.Item label="Golden Retriever" value="goldenretriever" />
                    <Picker.Item label="Labrador Retriever" value="labrador" />
                    <Picker.Item label="Poodle" value="poodle" />
                    <Picker.Item label="Staffordshire Bull Terrier" value="sbullterrier" />
                    <Picker.Item label="West Highland White Terrier" value="westie" />
                    <Picker.Item label="Yorkie" value="yorkie" />
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
                <View style={{ margin: 10 }}>
                    <Button
                        onPress={() => {
                            this.handleProfile();
                        }}
                        color='#5637DD'
                        title='Submit'
                    />
                </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                this.resetForm();
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
    }
});

export default ProfileEditor;