import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
      dogs: state.dogs,
      sponsors: state.sponsors
  };
};


class Home extends Component {

    static navigationOptions = {
        title: 'Home',
        headerStyle: {
          backgroundColor: '#9020D1',
          height: 30,
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign: 'center',
          flex: 1,
          alignSelf: 'center',
          fontWeight: 'bold',
        }
    };


    // The renderImageItem function creates the image component for each dog thumbnail in each of
    // the three sections (top, new, bottom dogs). The dog's name is overlaid on the image using
    // white text with a black drop shadow for clarity. Each image is clickable and navigates to the
    // DogDetail view for a larger image with breed name, description and rating.

    render() {
        const { navigate } = this.props.navigation;
        const renderImageItem = ({item}) => {
          const needsUri = item.image.toString().includes('http'); // Check for full file path vs imported image

            return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigate('DogDetail', { dogId: item.id, dogName: item.name} )} >

                    {needsUri
                      ? <ImageBackground source={{uri: item.image}} style={styles.itemImage}/>
                      : <ImageBackground source={item.image} style={styles.itemImage}/>
                    }
                     <View style={{position: 'absolute', top: 0, left: 4, right: 0, bottom: 0, justifyContent: 'flex-end'}}>
                        <Text style={styles.itemName}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                </View>
            );
        };

        // Filter out dogs that are unrated from the top and bottom lists
        const dataTop = [...this.props.dogs.dogs].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).filter(dog => (dog.rating > 0));
        const dataNew = [...this.props.dogs.dogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        const dataBottom = [...this.props.dogs.dogs].sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating)).filter(dog => (dog.rating > 0));

        // The SectionGrid component creates a scrollable area with three subsections on the page. 
        // Functions are provided to create the header (simple Text) and footer (links to a full page view
        // of that section's items)
        
        return (
          <SectionGrid
              itemDimension={90}
              sections={[
                  {
                    id: 0,
                    title: "Top Dawgs",
                    data: dataTop.slice(0, 6),
                    pageData: dataTop
                  },
                  {
                    id: 1,
                    title: "Newest Posts",
                    data: dataNew.slice(0, 6),
                    pageData: dataNew
                  },
                  {
                    id: 2,
                    title: "Bottom Dawgs",
                    data: dataBottom.slice(0, 6),
                    pageData: dataBottom
                  },
                ]}


              style={styles.gridView}
              // staticDimension={300}
              // fixed
              spacing={10}
              renderItem={renderImageItem}
              renderSectionHeader={({ section }) => (
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
              renderSectionFooter={({ section }) => (
                <TouchableOpacity onPress={() => navigate('FullList', { pageData: section.pageData, title: section.title })} >
                  <View style={{textAlignVertical: 'center'}}>
                    <Text style={styles.sectionFooter}>See more <FontAwesomeIcon icon={  faLongArrowAltRight } size={ 16 } />
                    </Text>
                  </View>
                </TouchableOpacity>
                )}
          />
        );
    }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 0,
    height: 150,
  },
 itemImage: {
    alignSelf: 'center',
    height: 150,
    width: 120,
    overflow: 'hidden',
    borderColor: '#636e72',
    borderWidth: 1,
    borderRadius: 5
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: 'black', 
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3, 
    fontWeight: '800'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff'
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10
  },
  sectionFooter: {
    justifyContent: 'center',
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'right',
    backgroundColor: 'white',
    color: 'black',
    paddingBottom: 10,
    paddingRight: 10
  }
});

export default connect(mapStateToProps)(Home);