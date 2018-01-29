import React, { Component } from 'react';

import MLBGameCard from './MLBGameCard';
import MLBAPIClient from '../utils/MLBAPIClient';
import { transformGameObject } from '../utils/MLBUtils';
import { 
	getYearMonthDay, 
	padZero, 
	genericErrorHandling 
} from '../utils/utils';

// Emergency offline development
import { scoreboard } from '../emergency_scoreboard';

const DEFAULT_LIST_STATE = {
	date: new Date(2016, 2, 29),
	data: [],
	numberOfGames: 0,
	isDataLoaded: false,
}

class MLBListView extends Component {
	constructor() {
		super();
		this.state = DEFAULT_LIST_STATE;
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

		data = scoreboard;
		data = transformGameObject(data['data']['games']['game']);
		numberOfGames = data.length;
		this.setState({
			data,
			numberOfGames,
			isDataLoaded
		});

		// MLBAPIClient
		// 	.get(`year_${year}/month_${month}/day_${day}/master_scoreboard.json`)
		// 	.then((response) => {
		// 		isDataLoaded = true;
		// 		data = response.data;
		// 		data = transformGameObject(data['data']['games']['game']);
		// 		numberOfGames = data.length;
		// 	})
		// 	.then(() => {
		// 		this.setState({
		// 			data,
		// 			numberOfGames,
		// 			isDataLoaded
		// 		});
		// 	})
		// 	.catch(genericErrorHandling);
	}

	generateGameRows() {
		let { data, numberOfGames, isDataLoaded } = this.state;
		// Make sure data is loaded so we don't see
		// ghost "no games today" load
		if (isDataLoaded) {
			if (numberOfGames > 0) {
				return data.map((gameData, index) => (
					<MLBGameCard
						key={index}
						gameData={gameData}
					/>
				))
			} 
			return (<div>No games today</div>);
		}
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
