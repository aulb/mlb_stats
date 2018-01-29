import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
	Tabbar,
	Tab,
	Grid,
	Cell
} from 'react-mdc-web/lib';

const HOME_TEAM = 0;
const AWAY_TEAM = 1;
const DEFAULT_TAB_STATE = {
	active: HOME_TEAM,
	homeTeamName: '',
	awayTeamName: '',
	homeData: {},
	awayData: {},
	pitching: {}
};

const makePitcherGrid = (pitcher) => {
	return (<section>
		<Grid>
			<Cell col={3}>Name</Cell>
			<Cell col={1}>AB</Cell>
			<Cell col={1}>R</Cell>
			<Cell col={1}>H</Cell>
			<Cell col={1}>RBI</Cell>
			<Cell col={1}>BB</Cell>
			<Cell col={1}>SO</Cell>
			<Cell col={1}>AVG</Cell>
		</Grid>
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
			pitching
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
			pitching
		});
	}

	tabSwitch() {
		const { active } = this.state;
		// Toggle between states
		this.setState({ active: !active });
	}

	render() {
		const { active, homeTeamName, awayTeamName } = this.state;
		return (<Tabbar>
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
		</Tabbar>)
	}
}
	

MLBGameTab.propTypes = {
	homeTeamName: propTypes.string.isRequired,
	awayTeamName: propTypes.string.isRequired,
	pitching: propTypes.array.isRequired
}

export default MLBGameTab;
