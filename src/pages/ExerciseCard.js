import React,{Component} from 'react';
import {View, TextInput, Picker, ActivityIndicator, Text, ScrollView,Alert} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { Card, Header, Icon, Button } from 'react-native-elements';
import {addexercise,removeexercise} from '../actions';
const uuid = require('uuid/v1');
import NumericInput,{ calcSize } from 'react-native-numeric-input';


class ExerciseCard extends Component { 

    state ={
        showLoader:false,
        intensity:"1",
        exName:"",
        exid:null,
        duration:"1",
        numeric:"1"
    }

    componentWillMount = () => {
        if(this.props.firstTime){
            this.setState({showLoader:true});
        } else{
            this.setState({
                showLoader:true,
                intensity:this.props.item.intensity,
                duration:this.props.item.duration,
                exName:this.props.item.exName,
                exid:this.props.item.exid
            });
        }
    }


    
 
    componentDidMount = () => {
        if(this.props.firstTime){
            this.setState({
                showLoader:false,
                exName:this.props.item.exName 
            })
        } else{
            this.setState({
                showLoader:false,
                exName: this.props.item.exName,
                exid:this.props.item.exid,
                intensity:this.props.item.intensity,
                duration:this.props.item.duration
            })
        }
      
    }



    goBack = () => {
       Actions.exerciselog();
    } 

    Add = () => {
        if(this.props.firstTime){
            let id = uuid();
        id = id.split("-").join("");
        let obj={
            exid:id,
            exName:this.props.item.exName ,
            intensity:this.props.item.intensity,
            duration:this.props.item.duration 
        }

        this.props.addexercise(obj,this.props.firstTime,this.props.userId,this.props.date);
        } else{
            let obj={
                exid:this.state.exid,
                exName:this.state.exName,
                intensity:this.state.intensity,
                duration:this.state.duration 
            }
            
              this.props.addexercise(obj,this.props.firstTime,this.props.userId,this.props.date);
        }

    }

    // when user wants to delete a exercise
    onRemove = () => {
        let obj={
            exid:this.state.exid,
            exName:this.state.exName,
            intensity:this.state.intensity,
            duration:this.state.duration 
        }
          this.props.removeexercise(obj,this.props.userId,this.props.date);
    }

    onDurationChange = (text) =>{
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                Alert.alert("please enter numbers only");
            }
        }
        this.setState({ duration:newText });   
      }
        

    render = () => {

        let check = (
            <Icon
                name='check'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.Add}
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
            <ScrollView>
                <Header
                    outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                    leftComponent={backButton}
                    centerComponent={{ text: "Add Exercise", style: { color: '#fff',fontSize:15 }}}
                    rightComponent={check}
                />
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                    <ScrollView style={{backgroundColor:"white", height:"100%"}}>

                                <Card>
                                       <Text style={{
                                         color: "maroon",
                                         fontSize: 15,
                                         marginBottom: 5
                                     }}>{this.state.exName}</Text>
                                 </Card>
                               
                                 <Card flexDirection='column'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5, 
                                        }}>intensity</Text>
                                        <Picker selectedValue={this.state.intensity} onValueChange={value => this.setState({intensity:value})} >
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                        </Picker>    
                                 </Card>
                              

                                <Card style={{ flex:1,height:40,flexDirection: 'row',alignItems: 'center'}}>
                                <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            flex:1
                                        }}>Duration</Text>
                                <TextInput  
                                     keyboardType = 'numeric'
                                     style={{  color:'#000',
                                     paddingRight:5,
                                     paddingLeft:5,
                                     fontSize:15,
                                     lineHeight:23,
                                     flex:2}}
                                     onChangeText={this.onDurationChange.bind(this)}
                                     value={this.state.duration}
                                     />
                
                                </Card>
                                                         
                                 <Card>
                                    <Button
                                    title='Remove' 
                                    disabled={this.props.firstTime}
                                    backgroundColor="blue"
                                    onPress={this.onRemove}
                                    />
                                 </Card> 
                               
                    </ScrollView>
                     
                }
            </ScrollView>
        )
    }
}


const mapStateToProps = state => {
    return {
        exerciseArray: state.exercise.exerciseArray,
        userId: state.auth.userId,
        date : state.auth.date 
    };
};

export default connect(mapStateToProps, {addexercise,removeexercise}) (ExerciseCard);


