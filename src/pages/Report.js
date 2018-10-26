import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Header, SearchBar } from 'react-native-elements';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { VictoryLine, VictoryLabel, VictoryChart, VictoryAxis, VictoryVoronoiContainer } from "victory-native";

import {colors, margin, padding, fonts} from '../styles/base.js'

const sample = [
	{ date: "10/1", weight: 360 },
	{ date: "10/2", weight: 355 },
	{ date: "10/3", weight: 340 },
	{ date: "10/4", weight: 320 },
	{ date: "10/5", weight: 290 },
	{ date: "10/6", weight: 274 },

];


class ReportCard extends React.Component {
	showHome = () => {
		Actions.home();
	}
  
	showAddFood = () => {  
		Actions.push("addfood",{type:"addfood"});
	}
  
	showAddExercise = () => {
		Actions.push("addexercise",{type:"addexercise"});
	}
  
	showAddFoodNotes = () => {
		Actions.push("foodnotes");
	}
  
	showAddExerciseNotes = () => {
	Actions.push("exercisenotes");
	}
  
	showReport = () => {
		Actions.push("report");
	}

	render() {
		return (
			<View style = {{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
				<Header
					outerContainerStyles={{height:60,backgroundColor:colors.primary, opacity:0.8}}
					//leftComponent={hamburger}
					centerComponent={{ text: 'Report Card', style: styles.headerCenter}}
					//rightComponent={search}
				/>
				
				<View style={styles.chartView}>
					<VictoryChart
						domainPadding={{x: 30, y: 30}}
						containerComponent = {<VictoryVoronoiContainer 
							labels={(d) => (d.y)}/>}>
						<VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} tickFormat={sample.date}/>
						<VictoryLine
							style={{
								data:{
									stroke: colors.brandblue, strokeWidth: 3
								},
								labels: {
									fontSize: fonts.md,
									fill: (sample) => sample.date === '10/6' ? colors.brandgold : colors.brandlbue
								}
							}}
							
							labelComponent={<VictoryLabel renderInPortal dy={-10}/>}
							interpolation="natural"
							data={sample}
							labels={(sample) => sample.weight}
							
							x="date"
							y="weight"
						/>
					</VictoryChart>
				</View>
				<View style={{flexDirection: 'row', height:60, backgroundColor: colors.primary, justifyContent:"space-around", opacity: 0.8}}>
					<Icon
						name='tachometer'
						type='font-awesome'
						color={colors.secondary}
						onPress={this.showHome}
						size={30}
						underlayColor='transparent'>
					</Icon>
					<Icon
						name='food'
						type='material-community'
						color={colors.brandwhite}
						onPress={this.showAddFood}
						size={30}
						underlayColor='transparent'>
					</Icon>
					<Icon
						name='run'
						type='material-community'
						color={colors.brandwhite}
						onPress={this.showAddExercise}
						size={30}
						underlayColor='transparent'>
					</Icon>
					<Icon
						name='message'
						type='Entypo'
						color={colors.brandwhite}
						onPress={this.showReport}
						size={30}
						underlayColor='transparent'> 
					</Icon>
					<Icon
						name='settings'
						type='Feather'
						color={colors.brandwhite}
						onPress={this.showAddExercise}
						size={30}
						underlayColor='transparent'>
					</Icon>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chartView: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	pointsHeader: {
		backgroundColor: 'transparent',
		//position: 'absolute',
		//top: 72,
		//left: 56,
		//width: 90,
		textAlign: 'center',
		color: colors.secondary,
		fontSize: 20,
		fontWeight: "100",
		justifyContent: 'center',
		alignItems: 'center'
	},
	points:{
		backgroundColor: 'transparent',
		textAlign: 'center',
		color: colors.primary,
		opacity: 0.8,
		fontSize: 70,
		fontWeight: "100",
		justifyContent: 'center',
		alignItems: 'center'
	},
	pointsLabel:{
		backgroundColor: 'transparent',
		//position: 'absolute',
		//top: 72,
		//left: 56,
		//width: 90,
		textAlign: 'center',
		color: '#7591af',
		fontSize: 14,
		fontWeight: "100",
		justifyContent: 'center',
		alignItems: 'center'
	},
	pointsDelta: {
		color: '#4c6479',
		fontSize: 50,
		fontWeight: "100"
	},
	pointsDeltaActive: {
		color: '#fff',
	},
	headerCenter: {
		color: colors.brandwhite,
		fontSize:30, 
		fontWeight: 'bold',
		fontFamily: 'sans-serif-condensed'
	}
});

export default ReportCard;