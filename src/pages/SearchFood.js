
import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Text, Image, View, FlatList, TouchableOpacity, ActivityIndicator, ToastAndroid, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Header, SearchBar, ButtonGroup, Card, ListItem, Button, Icon } from 'react-native-elements'
import {searchResult} from '../actions';

import { HaH_Header, HaH_NavBar } from '../components/common';
import testReponse from '../testdata/searchresult_pizza'

import {colors, margin, padding, fonts} from '../styles/base.js'

class SearchFood extends Component{
    state = {
        choices:[],
        totalResults:0,
        page:1,  
        count:0,
        showLoader:false,
        searchText:"",
        category: 0
    }
    
    componentWillMount = () => {
    }

    componentWillReceiveProps = (nextProps) => {
        (this.state.category == 0) ? this.setState({response: nextProps.searchArray, choices:nextProps.searchArray.common, showLoader:false}) : this.setState({response: nextProps.searchArray, choices:nextProps.searchArray.branded, showLoader:false})
    }
    
    endReached = () => {
        ToastAndroid.show('Loading more data...',3000,"BOTTOM")
    }



    onPress = (item) => {
        Actions.push("foodcard", {
            itemName:item.food_name,
            category:this.state.category,
            firstTime:true,
            mealNo:this.props.mealNo,
            onBack:this.props.onBack
        });
    }

    searchTextChanged = (text) => {
        if(text)
        {
            let food = text
            this.setState({choices:[], searching: true, showLoader: true, searchText: text})
          //  const request = BASE_URL + '/search/' + food
            //console.log(request)
            this.props.searchResult(food); 

         //   this.formData(request)
        }
    }

    submitEditing = () => {
        let food = this.state.searchText
        this.props.searchResult(food); 
    }


    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    findThumbnail(thumb) {
        if(thumb != null) {
            return {uri: thumb}
        }
        else {
            return {uri: "https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png"}
        }
    }

    updateCategory = (category) => {
        this.setState({showLoader: true});
        (category == 0) ? this.setState({choices: testReponse.common, category, showLoader: false}) : this.setState({choices: testReponse.branded, category, showLoader: false})
    }

    render() {
        return (
            <View style = {{flex: 1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = 'Add Food'/>
                <View style={{flex:1,flexDirection: 'column'}}>
                    
                    <SearchBar
                        lightTheme
                        round
                        onChangeText = {this.searchTextChanged}
                        onSubmitEditing = {this.submitEditing}
                        placeholder='Type Here...' />
                    <View style={{padding: 10}}>
                        <ButtonGroup
                            onPress={this.updateCategory}
                            selectedIndex={this.state.category}
                            buttons={['Common', 'Branded']}
                            containerStyle={styles.categoryContainer}
                            selectedTextStyle={styles.categoryTextSelected}
                            textStyle={styles.categoryTextUnselected}
                            selectedButtonStyle={styles.categoryButtonSelected}
                            buttonStyle={styles.categoryButtonUnselected}
                        />
                    </View>
                    {
                        (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> :
                        <View style={{flex:1}}>
                            
                            <FlatList
                                data={this.state.choices}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        
                                        style = {{paddingBottom: 7}}
                                        onPress = {() => this.onPress(item)}
                                        underLayColor="transparent"
                                    >
                                        <Card
                                            containerStyle = {styles.cardContainer}
                                            wrapperStyle = {styles.cardWrapper}>
                                            <Image
                                                style={{width: 30, height: 30}}
                                                source={this.findThumbnail(item.photo.thumb)}
                                            />
                                            <Text style = {styles.cardHeader}>
                                                {this.capitalize(item.food_name)}
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                )}
                                onEndReachedThreshold={0.5}
                                onEndReached={this.endReached}
                                keyExtractor={item => item.food_name}
                            />
                        </View>
                    }
                </View>
                <HaH_NavBar
                    selected = {2}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cardHeader: {
        flex: 3,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary, 
        color: colors.primary,
        textAlign:'left',
        marginRight: 25,
        alignSelf: 'center',
        paddingLeft: 15
    },
    cardContainer: {
        marginTop: 0,
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 0
    },
    categoryContainer: {
        height: 50,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        borderRadius: 15,
        borderColor: colors.brandblue
    },
    categoryTextUnselected: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary,
        color: colors.primary
    },
    categoryTextSelected: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary,
        color: colors.brandwhite
    },
    categoryButtonSelected: {
        opacity: 0.8, 
        backgroundColor: colors.brandblue
    }
});

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray,
        searchArray: state.search.searchArray
    };
};

export default connect(mapStateToProps, {searchResult}) (SearchFood);
