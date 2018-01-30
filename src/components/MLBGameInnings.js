import React from 'react';
import propTypes from 'prop-types';
import { 
	Grid,
	Cell
} from 'react-mdc-web/lib';
import { transformInningScores } from '../utils/MLBUtils';

const makeInningScoreCells = (inningScores) => {
	return inningScores.map((inningScore, index) => 
		(<Cell col={1} key={`${index}${inningScore}`}>
			{ inningScore !== undefined ? inningScore: 'x' }
		</Cell>)
	);
}

function MLBGameInnings({
	linescore,
	inningData,
	playedInnings,
	homeCode,
	awayCode
}) {
	const { r, h, e, inning } = linescore;
	const inningScores = transformInningScores(inning);
	inningScores['home'].map((inningScore) => (<Cell col={1}>{ inningScore !== undefined ? inningScore: 0 }</Cell>));

	// Default innings...
	let playedInningCells = [];
	for (let i = 0; i < playedInnings; i++) {
		playedInningCells.push(<Cell col={1} key={i}>{i + 1}</Cell>)
	}

	const extraStats = [r, h, e];

	return (<div><section>
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
	</section>

	<section>
	<Grid>
		<Cell col={2}></Cell>
		<Cell col={1}>R</Cell>
		<Cell col={1}>H</Cell>
		<Cell col={1}>E</Cell>
	</Grid>
	<Grid>
		<Cell col={2}> { homeCode.toUpperCase() } </Cell>
		{ makeInningScoreCells(extraStats.map(stat => stat['home'])) }
	</Grid>
	<Grid>
		<Cell col={2}> { awayCode.toUpperCase() } </Cell>
		{ makeInningScoreCells(extraStats.map(stat => stat['away'])) }
	</Grid>
	</section>
	</div>);
}


MLBGameInnings.propTypes = {
	// Default linescore that comes with the first API call
	linescore: propTypes.object.isRequired,
	// Default inning scores that comes with second API call
	inningData: propTypes.object,
	playedInnings: propTypes.number.isRequired,
	homeCode: propTypes.string.isRequired,
	awayCode: propTypes.string.isRequired,
	isDetailsLoaded: propTypes.bool
}

export default MLBGameInnings;
