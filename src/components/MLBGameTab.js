import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
	Tabbar,
	Tab,
	List,
	ListItem
} from 'react-mdc-web/lib';

const HOME_TEAM = 0;
const AWAY_TEAM = 1;
const DEFAULT_TAB_STATE = {
	active: HOME_TEAM,
	homeTeamName: '',
	awayTeamName: '',
	pitching: {}
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

		this.setState({
			homeTeamName,
			awayTeamName,
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
	pitching: propTypes.object.isRequired
}

export default MLBGameTab;
