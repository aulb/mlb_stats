import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
	Tabbar,
	Tab,
	Grid,
	Cell
} from 'react-mdc-web/lib';
import {
	HOME_TEAM,
	AWAY_TEAM,
	DEFAULT_TAB_STATE
} from '../utils/MLBConstants';

const makePitcherGrid = (pitcherData) => {
	const pitchers = pitcherData['pitcher'];
	const pitcherCells = pitchers.map((pitcher, index) => {
		// order: name, AB, R, H, RBI, BB, SO, ERA 
		const {
			name_display_first_last,
			ab,
			r,
			h,
			rbi,
			bb,
			so,
			era
		} = pitcher;

		const cells = [name_display_first_last, ab, r, h, rbi, bb, so, era].map((stat, innerIndex) => {
			const cellSize = innerIndex === 0? 3: 1;
			return (<Cell col={cellSize} key={`${innerIndex}`}>{stat}</Cell>);
		});	
		return (<Grid key={index}>{cells}</Grid>)
	});

	return (<section>
		<Grid>
			<Cell col={3}>Name</Cell>
			<Cell col={1}>AB</Cell>
			<Cell col={1}>R</Cell>
			<Cell col={1}>H</Cell>
			<Cell col={1}>RBI</Cell>
			<Cell col={1}>BB</Cell>
			<Cell col={1}>SO</Cell>
			<Cell col={1}>ERA</Cell>
		</Grid>
		{ pitcherCells }
	</section>);
};

class MLBGameTab extends Component {
	constructor(props) {
		super(props);
		this.state = DEFAULT_TAB_STATE;
		this.tabSwitch = this.tabSwitch.bind(this);
	}

	componentDidMount() {
		const {
			homeTeamName,
			awayTeamName,
			pitching,
			isDetailsLoaded
		} = this.props;

		let awayData = {};
		let homeData = {};
		for (let i = 0; i < pitching.length; i++) {
			let currentPitch = pitching[i];
			if (currentPitch['team_flag'] === 'home') {
				homeData = currentPitch;
			} else {
				awayData = currentPitch;
			}
		}

		this.setState({
			homeTeamName,
			awayTeamName,
			homeData,
			awayData,
			pitching,
			isDetailsLoaded
		});
	}

	tabSwitch() {
		const { active } = this.state;
		// Toggle between states
		this.setState({ active: !active });
	}

	render() {
		const { 
			active, 
			homeTeamName, 
			awayTeamName,
			homeData,
			awayData,
			isDetailsLoaded
		} = this.state;

		return (<div>
		<Tabbar>
			<Tab
				active={active === HOME_TEAM}
				onClick={this.tabSwitch}
			>
			{ homeTeamName }
			</Tab>
			<Tab
				active={active === AWAY_TEAM}
				onClick={this.tabSwitch}
			>
			{ awayTeamName }
			</Tab>
			<span className="mdc-tab-bar__indicator"></span>
		</Tabbar>
		{ isDetailsLoaded? makePitcherGrid(active === HOME_TEAM ? homeData: awayData): null }
		</div>)
	}
}

MLBGameTab.propTypes = {
	homeTeamName: propTypes.string.isRequired,
	awayTeamName: propTypes.string.isRequired,
	pitching: propTypes.array.isRequired,
	isDetailsLoaded: propTypes.bool
}

export default MLBGameTab;
