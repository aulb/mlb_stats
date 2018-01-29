import React from 'react';
import propTypes from 'prop-types';
import { 
	Grid,
	Cell
} from 'react-mdc-web/lib';

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
	</section>
	);
}


MLBGameInnings.propTypes = {
	// Default linescore that comes with the first API call
	linescore: propTypes.object.isRequired,
	// Default inning scores that comes with second API call
	inningData: propTypes.object,
	playedInnings: propTypes.number.isRequired,
	homeCode: propTypes.string.isRequired,
	awayCode: propTypes.string.isRequired
}

export default MLBGameInnings;
