import React, { Component } from 'react';
import MLBGameCard from './MLBGameCard';
import MLBAPIClient from '../utils/MLBAPIClient';
import { transformGameObject } from '../utils/MLBUtils';
import { 
	getYearMonthDay, 
	padZero, 
	genericErrorHandling 
} from '../utils/utils';
import { sortByFavoriteTeam } from '../utils/MLBUtils';
import { 
	Button,
	Headline,
	Title
} from 'react-mdc-web/lib';
import { MLB_TEAMS, DEFAULT_LIST_STATE } from '../utils/MLBConstants';

const PREVIOUS_DAY = 1;
const NEXT_DAY = -1;
const EPOCH_DAY = 24 * 60 * 60 * 1000;

class MLBListView extends Component {
	constructor() {
		super();
		this.state = DEFAULT_LIST_STATE;
		this.fetchDataFromApi = this.fetchDataFromApi.bind(this);
		this.generateGameRows = this.generateGameRows.bind(this);
		this.switchDay = this.switchDay.bind(this);
	}

	componentDidMount() {
		this.fetchDataFromApi();
	}

	switchDay(changeDay) {
		const { date } = this.state;
		/*
		Why this logic?
		new Date(new Date() + -1 * (24 * 60 * 60 * 1000))
		Invalid Date
		new Date(new Date() + (-1 * (24 * 60 * 60 * 1000)))
		Invalid Date
		new Date(new Date() - (-1 * (24 * 60 * 60 * 1000)))
		Wed Jan 31 2018 08:28:16 GMT+0000 (UTC)
		new Date(new Date() - (1 * (24 * 60 * 60 * 1000)))
		Mon Jan 29 2018 08:28:21 GMT+0000 (UTC)
		*/
		const newDate = new Date(date - changeDay * EPOCH_DAY);

		// On day switch, reset the states
		this.setState(DEFAULT_LIST_STATE);
		this.setState({
			date: newDate
		});

		// Re-fetch data from endpoint
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

		MLBAPIClient
			.get(`year_${year}/month_${month}/day_${day}/master_scoreboard.json`)
			.then((response) => {
				isDataLoaded = true;
				data = response.data;
				data = transformGameObject(data['data']['games']['game']);
				data = sortByFavoriteTeam(data, favoriteTeam);
				numberOfGames = data.length;
			})
			.then(() => {
				this.setState({
					data,
					numberOfGames,
					isDataLoaded
				});
			})
			.catch(genericErrorHandling);
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
		const { date } = this.state;
		return (<div>
			<Title>
				<Button
					onClick={() => this.switchDay(PREVIOUS_DAY)}
				>Previous Day</Button>
				<strong>{ date.toDateString() } </strong>
				<Button
					onClick={() => this.switchDay(NEXT_DAY)}
				>Next Day</Button>
			</Title>
			<Headline>
				Favorite Team: Blue Jays
			</Headline>
			{ this.generateGameRows() }
		</div>);
	}
}

export default MLBListView;
