import React, { Component } from 'react';

import MLBGameCard from './MLBGameCard';
import MLBAPIClient from '../utils/MLBAPIClient';
import { transformGameObject } from '../utils/MLBUtils';
import { 
	getYearMonthDay, 
	padZero, 
	genericErrorHandling 
} from '../utils/utils';
import { 
	Headline,
	Title,
	Button
} from 'react-mdc-web/lib';
import { teamShort } from '../utils/MLBConstants';

// Emergency offline development
import { scoreboard } from '../emergency_scoreboard';

const DEFAULT_LIST_STATE = {
	date: new Date(2016, 2, 29),
	// Data is populated as 
	// [{gameData1}, {gameData2}, ...]
	data: [],
	numberOfGames: 0,
	isDataLoaded: false,
	favoriteTeam: 'Blue Jays'
};

const sortByFavoriteTeam = (gameData, favoriteTeam) => {
	// Modifies the gameData array to sort by favorite team
	let front = 0;
	let i = 0;

	for (let i = 0; i < gameData.length; i++) {
		// Check the home team name and away team name
		let { home_team_name, away_team_name } = gameData[i];
		// If one of them is a match, swap with the "front" game
		if (home_team_name === favoriteTeam || away_team_name === favoriteTeam) {
			// Swap index `i` with index `front`
			let temp = gameData[i];
			gameData[i] = gameData[front];
			gameData[front] = temp;
			front++;
		} 		
	}
	return gameData;
};

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

		const { favoriteTeam } = this.state;	

		data = scoreboard;
		data = transformGameObject(data['data']['games']['game']);
		numberOfGames = data.length;
		this.setState({
			data: sortByFavoriteTeam(data, favoriteTeam),
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
		console.log(teamShort);
		return (<div>
			<Title>
				<strong>March 29th, 2017 </strong>
			</Title>
			<Headline>
				Favorite Team: Blue Jays
			</Headline>
			{ this.generateGameRows() }
		</div>);
	}
}

export default MLBListView;
