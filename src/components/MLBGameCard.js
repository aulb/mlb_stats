import React, { Component } from 'react';
import propTypes from 'prop-types';
import { 
	Card, 
	CardHeader, 
	CardTitle,
	CardSubtitle,
	CardText, 
	CardActions, 
	Button,
	Grid,
	Cell,
	Tabbar,
	Tab
} from 'react-mdc-web/lib';
import MLBAPIClient from '../utils/MLBAPIClient';

const styles = {
	winningTeam: {
		fontWeight: 'bold'
	}
};

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
};

const transformInningScores = (inningScores) => {
	const result = {
		'home': [], 
		'away': []
	};

	for (let i = 0; i < inningScores.length; i++) {
		result['home'].push(inningScores[i]['home']);
		result['away'].push(inningScores[i]['away']);
	}

	return result;
}

const makeInningScoreCells = (inningScores) => {
	return inningScores.map((inningScore, index) => 
		(<Cell col={1} key={`${index}${inningScore}`}>
			{ inningScore !== undefined ? inningScore: 'x' }
		</Cell>)
	);
}

class MLBGameCard extends Component {
	constructor(props) {
		super(props);
		this.state = DEFAULT_GAME_STATE;

		this.getGameDetail = this.getGameDetail.bind(this);
		this.generateGameDetail = this.generateGameDetail.bind(this);
		this.generateTeamTabs = this.generateTeamTabs.bind(this);
		this.generateButton = this.generateButton.bind(this);
	}

	getGameDetail() {
		const { detailEndpoint } = this.state
		let isDetailsLoaded = false;

		MLBAPIClient
			.get(detailEndpoint)
			.then((response) => {
				console.log(response.data);
				isDetailsLoaded = true;
			})
			.then(() => {
				this.setState({
					isDetailsLoaded
				});
			})
			.catch(() => {
				console.log('Network Error :(')
			});		
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
			homeCode,
			awayCode,
			linescore,
			playedInnings
		} = this.state;

		const { r, h, e, inning } = linescore;
		const inningScores = transformInningScores(inning);

		inningScores['home'].map((inningScore) => (<Cell col={1}>{ inningScore !== undefined ? inningScore: 0 }</Cell>));
		console.log(inningScores)

		let playedInningCells = [];
		for (let i = 0; i < playedInnings; i++) {
			playedInningCells.push(<Cell col={1} key={i}>{i + 1}</Cell>)
		}

		console.log(playedInningCells, playedInnings);

		return (<section>
		<Grid>
			<Cell col={2}></Cell>
			{ playedInningCells }
		</Grid>
		<Grid>
			<Cell col={2}> { homeCode.toUpperCase() } </Cell>
			{ makeInningScoreCells(inningScores['home']) }
		</Grid>
		<Grid>
			<Cell col={2}> { awayCode.toUpperCase() } </Cell>
			{ makeInningScoreCells(inningScores['away']) }
		</Grid>
		<Tabbar>
			<Tab
				active={true}
			>
			homeTeamName
			</Tab>
			<Tab
				active={false}
			>
			homeTeamName
			</Tab>
			<span className="mdc-tab-bar__indicator"></span>
		</Tabbar>
		</section>
		);
	}

	generateButton() {
		return (<CardActions>
			<Button onClick={this.getGameDetail}>Details</Button>
		</CardActions>);
	}

	generateTeamTabs() {
		return (<Tabbar>
			

		</Tabbar>);
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
