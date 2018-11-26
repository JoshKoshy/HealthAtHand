import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood, removeMeal, addMealToMealLog, initializemealObj } from '../actions';
import { HaH_Header, HaH_NavBar } from '../components/common';

import {colors, margin, padding, fonts, button} from '../styles/base.js'

var data=[];

class AddFood extends Component {

    state = {
        showLoader:true, 
        showSearch:false, 
        searchText:""
        }

    componentWillMount = () => {
        this.props.initializemealObj(this.props.item); 
        let array= this.props.item.food;
        //this.loadData(array); 
    }


    componentWillReceiveProps = (nextProps) => { 
        let array= nextProps.mealObj.food;
        //this.loadData(array);
    } 

    //happens on edit food
    onPress = (item) => {
        Actions.push("foodcard",{item:item,firstTime:false,mealNo:this.props.mealObj.mealName,meal:this.props.mealObj,onBack:this.props.item});
    }

    /*
    loadData = (array) => {
       data=[]; 
       if(array.length>0){
            array.map((item, i) => {

                data.push(
                    <TouchableHighlight
                        key={i}
                        onPress = {() => this.onPress(item)}
                        underLayColor="transparent"
                    >
                    <View>   
                        <Card 
                            flexDirection='row'
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text style={styles.cardHeader}>
                                {this.capitalize(item.foodname)}
                            </Text>
                            <Text style={styles.cardHeader}>
                                {item.totalCalories / item.Calories}
                                <Text style={styles.servingSizeUnit}>
                                    {' ' + item.servingSize + '(s)'}
                                </Text>
                            </Text> 
                            <Text style={styles.cardHeader}>
                                {item.totalCalories}
                                <Text style={styles.servingSizeUnit}>
                                    {' cals'}
                                </Text>
                            </Text> 
                        </Card>
                    </View> 
                    </TouchableHighlight>
                )
            })
        } 
    } 
    */

    //onadd meal post request 
    goBack = () => {
        this.props.addMealToMealLog(this.props.userId,this.props.date,this.props.mealObj);
    }
   
    // when search button is pressed
    showFoodSearch = () => {
        Actions.push("searchfood", {
            mealName:this.props.item.mealName, onBack:this.props.item}); 
    }

    // when entire meal is deleted
    deleteMeal = () => {
        this.props.removeMeal(this.props.userId,this.props.date,this.props.mealObj);
    }

    calculateMealCal(item) {
        for(i = 0; i < item.length; i++)
        {
            totalCals += item[i].totalCalories
        }
    }
 
    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    render = () => {
        let search = (
            <Icon
                name='add-box'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.showFoodSearch}
            />
        )

        let backButton = (
            <Icon
                name='ios-arrow-back'
                type='ionicon'
                color={"white"} 
                onPress = {this.goBack}
                underlayColor={"transparent"}
            />
        )

        return (
            <View style={{flex:1}}>
                <HaH_Header
                    text = {'Meal ' + this.props.item.mealName}
                    right = {search}
                />
                <View style={{flex: 1, paddingTop: '2%', paddingBottom: '2%'}}>
                {
                    (this.props.item.food.length == 0) ? <View style={{flex: 1}}></View>: 
                    <View style={{flex: 1}}>
                        <FlatList
                            data={this.props.item.food}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    onPress = {() => this.onPress(item)} 
                                    underLayColor="transparent"
                                    style = {{padding: 7}}
                                > 
                                    <Card
                                        flexDirection = 'row' 
                                        containerStyle = {styles.cardContainer}
                                        wrapperStyle = {styles.cardWrapper}>
                                        <Text style={styles.cardHeader}>
                                            {this.capitalize(item.itemName)}
                                        </Text>
                                        <Text style={styles.cardHeader}>
                                            {item.totalCalories / item.Calories}
                                            <Text style={styles.servingSizeUnit}>
                                                {' ' + item.servingSize + '(s)'}
                                            </Text>
                                        </Text> 
                                        <Text style={styles.cardHeader}>
                                            {item.totalCalories}
                                            <Text style={styles.servingSizeUnit}>
                                                {' cals'}
                                            </Text>
                                        </Text> 
                                    </Card>
                                </TouchableOpacity>
                            )}
                            onEndReachedThreshold={0.5}
                            onEndReached={this.endReached}
                            keyExtractor={item => (item.itemName)}
                        />
                        <View style ={styles.totalCalView}>
                            <Text style={[styles.totalCal, {fontSize: 25}]}>
                                Total Calories
                            </Text>
                            <Text style={[styles.totalCal, {fontSize: 25}]}>
                                {totalCals}
                            </Text>
                        </View>
                    </View>
                    }   
                    <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                        <TouchableOpacity
                            style = {styles.deleteButton}
                            onPress={this.deleteMeal}>
                            
                            <Text style = {styles.deleteText}>
                                Delete Meal
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        (data.length == 0) ? <View/>:
                        <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                            <TouchableOpacity
                                style = {styles.confirmButton}
                                onPress = {this.goBack}>
                                <Text style = {styles.confirmText}>
                                    Add Meal To Log
                                </Text>
                            </TouchableOpacity>
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
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.primary
    },
    cardContainer: {
        
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 2,
        paddingRight: 2
    },
    foodName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: fonts.primary, 
        color: colors.primary,
        flex: 3
    },
    foodCals: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: fonts.primary, 
        color: colors.primary,
        marginRight: '10%',
        flex: 4
    },
    confirmButton: {
		backgroundColor: colors.brandgold,
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
    },
    confirmText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
	confirmContainer: {
		flexDirection:'row'
	},
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: fonts.primary, 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
    deleteButton: {
		backgroundColor: 'red',
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7
    },
    deleteText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
    totalCalView: {
        flexDirection: 'row',
        paddingLeft: '12%',
        paddingRight: '12%',
        justifyContent: 'space-between'
    },
    totalCal: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: fonts.primary, 
        color: colors.primary,
        paddingTop: '2%',
    },
});


const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray,
        userId: state.auth.userId,
        date : state.auth.date,
        mealObj: state.food.mealObj
    };
};

export default connect(mapStateToProps, {initializefood, removeMeal, addMealToMealLog, initializemealObj}) (AddFood);
