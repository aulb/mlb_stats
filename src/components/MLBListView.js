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
				<Button>Previous Day</Button>
				<strong>{ date.toDateString() } </strong>
				<Button>Next Day</Button>
			</Title>
			<Headline>
				Favorite Team: Blue Jays
			</Headline>
			{ this.generateGameRows() }
		</div>);
	}
}

export default MLBListView;
