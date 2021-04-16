import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { persistStore } from 'redux-persist';
import { PURGE } from 'redux-persist';
import { connect } from 'react-redux';


class Settings extends Component {   
    constructor(props) {
        super(props);
    }

    onPurgeStoredState(e) { 
        e.preventDefault();
 
         const { dispatch } = this.props;   // Grab a ref to the mapped dispatch method

         // Create and dispatch the action which will cause redux-persist to purge
         dispatch({ 
              type: PURGE,
              key: "root",       // The "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
             result: () => null              // Func expected on the submitted action. 
          });        
   }

    render() {
        return (
            <View style={styles.buttonSection}>
                <Button
                    buttonStyle={styles.buttonSubmit}
                    onPress={this.onPurgeStoredState.bind(this)}
                    title='Reset local cache'
                />
            </View>
        );
    }
}

function mapStateToProps(
    state
) { 
    return state;
}

function mapDispatchToProps( 
    dispatch
) {
   return { dispatch };     // Map dispatch method to this.props.dispatch
}





const styles = StyleSheet.create({
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);