import React, { Component } from 'react';
import propTypes from 'prop-types';
import { 
	Card, 
	CardHeader, 
	CardTitle,
	CardSubtitle,
	CardText, 
	CardActions, 
	Button
} from 'react-mdc-web/lib';
import MLBGameTab from './MLBGameTab';
import MLBGameInnings from './MLBGameInnings';
import MLBAPIClient from '../utils/MLBAPIClient';

// Emergency offline development
import { detail } from '../emergency_detail';

const styles = {
	winningTeam: {
		fontWeight: 'bold'
	}
};

const HIDE = false;
const SHOW = true;

const DEFAULT_GAME_STATE = {
	gameStatus: '',
	homeTeamName: '',
	awayTeamName: '',
	homeCode: '',
	awayCode: '',
	homeScore: 0,
	awayScore: 0,
	detailEndpoint: '',
	// Game details from ListView
	isDataLoaded: false,
	// Details from the first card click
	isDetailsLoaded: false,
	// Number of innings
	playedInnings: 0,
	revealDetails: false,
	// Data after Details button is clicked
	detailedData: {},
	// Turn the detail button into hide button
	buttonAction: SHOW
};

class MLBGameCard extends Component {
	constructor(props) {
		super(props);
		this.state = DEFAULT_GAME_STATE;

		this.getGameDetail = this.getGameDetail.bind(this);
		this.generateGameDetail = this.generateGameDetail.bind(this);
		this.generateButton = this.generateButton.bind(this);
		this.toggleDetail = this.toggleDetail.bind(this);
	}

	toggleDetail() {
		const { buttonAction } = this.state;
		this.getGameDetail();

		this.setState({
			buttonAction: !buttonAction
		});
	}

	getGameDetail() {
		const { detailEndpoint } = this.state
		let isDetailsLoaded = false;
		let detailedData = null;

		detailedData = detail;
		isDetailsLoaded = true;
		this.setState({
			isDetailsLoaded,
			detailedData
		});


		// MLBAPIClient
		// 	.get(detailEndpoint)
		// 	.then((response) => {
		// 		detailedData = response.data;
		// 		isDetailsLoaded = true;
		// 	})
		// 	.then(() => {
		// 		this.setState({
		// 			isDetailsLoaded,
		// 			detailedData
		// 		});
		// 	})
		// 	.catch(() => {
		// 		console.log('Network Error :(')
		// 	});		
	}

	componentDidMount() {
		// TODO: REDO this
		const { gameData } = this.props;
		const { 
			status,
			home_team_name,
			away_team_name,
			home_file_code,
			away_file_code,
			home_win,
			away_win,
			game_data_directory,
			linescore = null
		} = gameData;

		let homeScore = 0;
		let awayScore = 0;
		if (linescore !== null) {
			homeScore = linescore['r']['home'];
			awayScore = linescore['r']['away'];
		}

		console.log(`${game_data_directory.replace('/components/game/mlb/', '')}/boxscore.json`);

		this.setState({
			gameStatus: status['status'],
			homeTeamName: home_team_name,
			awayTeamName: away_team_name,
			homeCode: home_file_code,
			awayCode: away_file_code,
			homeScore: homeScore,
			awayScore: awayScore,
			linescore: linescore,
			playedInnings: parseInt(status['inning']),
			detailEndpoint: `${game_data_directory.replace('/components/game/mlb/', '')}/boxscore.json`,
			isDataLoaded: true,
		});
	}

	generateGameDetail() {
		const { 
			linescore,
			playedInnings,
			homeCode,
			awayCode,
			detailedData,
			homeTeamName,
			awayTeamName,
			isDetailsLoaded
		} = this.state;

		const pitching = detailedData['data']['boxscore']['pitching'];
		const inningData = detailedData['data']['boxscore']['inning'];

		return (<section>
		<MLBGameInnings 
			linescore={linescore}
			playedInnings={playedInnings}
			homeCode={homeCode}
			awayCode={awayCode}
			isDetailsLoaded={isDetailsLoaded}
		/>
		<MLBGameTab
			pitching={pitching}
			homeTeamName={homeTeamName}
			awayTeamName={awayTeamName}
			isDetailsLoaded={isDetailsLoaded}
		/>
		</section>);
	}

	generateButton() {
		const { buttonAction } = this.state;
		return (<CardActions>
			<Button onClick={this.toggleDetail}>
				{ buttonAction === SHOW? 'Details': 'Hide Details' }
			</Button>
		</CardActions>);
	}

	render() {
		const {
			gameStatus,
			homeTeamName,
			awayTeamName,
			homeScore,
			awayScore,
			isDataLoaded,
			isDetailsLoaded,
		} = this.state;

		console.log(isDetailsLoaded, 'GAMECARD')
		// Should be under game details
		return (
			<Card style={{width: '600px'}}>
				<CardHeader>
				<CardTitle>
					<span style={ homeScore > awayScore ? styles.winningTeam: null }>
						{ `${homeTeamName} (${homeScore})` }
					</span>
					&nbsp; | &nbsp;
					<span style={ awayScore > homeScore ? styles.winningTeam: null }>
						{ `${awayTeamName} (${awayScore})` }
					</span>
				</CardTitle>
				<CardSubtitle>{ gameStatus }</CardSubtitle>
				</CardHeader>
			{ gameStatus !== 'Cancelled' ? this.generateButton(): null }
			{ isDetailsLoaded ? this.generateGameDetail(): null }
			</Card>
		);
	}
}

MLBGameCard.propTypes = {
	gameData: propTypes.object.isRequired,
}

export default MLBGameCard;
