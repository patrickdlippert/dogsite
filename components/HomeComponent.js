import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { Card, Tile } from 'react-native-elements';
import { DOGS } from '../shared/dogs';
import { SPONSORS } from '../shared/sponsors';
import CardCarousel from './CardCarouselComponent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dogs: DOGS
        };
    }

    static navigationOptions = {
        title: 'Home'
    };



    render() {
        const { navigate } = this.props.navigation;
        const renderImageItem = ({item}) => {
            return (
                <View style={styles.itemContainer}>
                    <TouchableOpacity onPress={() => navigate('HighlightInfo', { highlight: item }  )} >
                    <ImageBackground
                        source={item.image}
                        borderRadius={10}
                        style={{
                            alignSelf: 'center',
                            height: 150,
                            width: 120,

                          }}
                    />
                     <View style={{position: 'absolute', top: 0, left: 4, right: 0, bottom: 0, justifyContent: 'flex-end'}}>
                        <Text style={styles.itemName}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                </View>
            );
        };

        const dataTop = [...this.state.dogs].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        const dataNew = [...this.state.dogs].sort((a, b) => new Date(b.date) - new Date(a.date));
        const dataBottom = [...this.state.dogs].sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));

        return (
            <SectionGrid
                itemDimension={90}
                sections={[
                    {
                      id: 0,
                      title: 'Top Dawgs',
                      data: dataTop.slice(0, 6),
                      pageData: dataTop
                    },
                    {
                      id: 1,
                      title: 'Newest Posts',
                      data: dataNew.slice(0, 6),
                      pageData: dataNew
                    },
                    {
                      id: 2,
                      title: 'Bottom Dawgs',
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
                  <TouchableOpacity onPress={() => navigate('FullList', { id: section.id }, { data: section.pageData }  )} >
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

export default Home;