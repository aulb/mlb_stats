import React, { Component } from 'react';

import MLBAPIClient from '../utils/MLBAPIClient';
import MLBGameCard from './MLBGameCard';
import { getYearMonthDay, padZero } from '../utils/utils';
import { transformGameObject } from '../utils/MLBUtils';
// import Calendar from 'rc-calendar';
// TODO: Ordering by faves
// TODO: Adding homeruns
// TODO: Ability to change dates
// TODO: Everything to maps, no for loops
// TODO: Stop loading when GAME CARD CLICKED
// TODO: Why playedInnings?
// TODO: Convert detail button to reveal and hide details button
// TODO: Use inning_line_score instead
// Innings into its new component
// Stats into its new stats toggle

class MLBListView extends Component {
	constructor() {
		super();
		this.state = {
			date: new Date(2016, 2, 29),
			data: [],
			numberOfGames: 0,
			isDataLoaded: false,
		}
		this.fetchDataFromApi = this.fetchDataFromApi.bind(this);
		this.generateGameRows = this.generateGameRows.bind(this);
	}

	componentDidMount() {
		this.fetchDataFromApi();
	}


	fetchDataFromApi() {
		let { year, month, day } = getYearMonthDay(this.state.date);
		month = padZero(String(month), 2);
		day = padZero(String(day), 2);

		let data = [];
		let numberOfGames = 0;		
		let isDataLoaded = true;		

		MLBAPIClient
			.get(`year_${year}/month_${month}/day_${day}/master_scoreboard.json`)
			.then((response) => {
				isDataLoaded = true;
				data = response.data;
				data = transformGameObject(data['data']['games']['game']);
				numberOfGames = data.length;
			})
			.then(() => {
				this.setState({
					data,
					numberOfGames,
					isDataLoaded
				});
			})
			.catch(() => {
				console.log('Network Error :(')
			});

	}

	generateGameRows() {
		let { data, numberOfGames, isDataLoaded } = this.state;
		let gameRows = [];
		// Guarantee the data object to be an array
		if (isDataLoaded) {
			if (numberOfGames > 0 && data !== []) {
				for (let i = 0; i < data.length; i++) {
					gameRows.push(
					<MLBGameCard
						key={i}
						gameData={data[i]}
					/>);
				}
			} else {
				gameRows.push(<div>No games today</div>);
			}
		} 
		return gameRows;
	}

	render() {
		return (
			<div>
				<div>
					March 29th, 2017 
				</div>
				<div>
					Favorite Team: Blue Jays
				</div>
				{ this.generateGameRows() }
			</div>
		);
	}
}

export default MLBListView;
