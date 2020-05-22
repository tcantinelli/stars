export default function giveMeTheScores(p, score, pseudo) {

	let highScores = p.highScores;

	if(highScores) {

		const newScore = {
			"pseudo": pseudo,
			"score": score
		}

		//Insertion du score
		highScores.push(newScore);

		//Tri
		highScores.sort(compare);

		//Position de user
		const userPosition = highScores.indexOf(newScore);

		//Construction de la liste
		let list = '';

		//Ajout des 5 premiers
		for (let i = 0; i < (highScores.length > 5 ? 5 : highScores.length); i++) {
			let theScore = highScores[i];

			list += `${i + 1}. ${theScore.pseudo}  ${theScore.score} pts\n`;
		}

		if(userPosition > 4 && score > 0) {
			list += "................\n";
			list += `${userPosition + 1}. ${newScore.pseudo}  ${newScore.score} pts\n`;
		}

		return {
			image: 'rgba(0%, 0%, 0%, 1)',
			author: null,
			texts: [
				{
					text: "Top 5 high scores",
					font: p.fontBig,
					size: 0.071,
					coordY: 0.11,
					color: [255, 0, 0]
				},{
					text: list,
					font: p.fontMedium,
					size: 0.065,
					coordY: 0.23,
					color: [255, 0, 0]
				},{
					text: "Press q to quit",
					font: p.fontMedium,
					size: 0.065,
					coordY: 0.9,
					color: [255, 0, 0]
				}
			]
		}
	}

	return {
		image: 'rgba(0%, 0%, 0%, 1)',
		author: null,
		texts: [
			{
				text: "No connexion => No HighScores",
				font: p.fontBig,
				size: 0.071,
				coordY: 0.11,
				color: [255, 0, 0]
			},{
				text: "Press q to quit",
				font: p.fontMedium,
				size: 0.065,
				coordY: 0.9,
				color: [255, 0, 0]
			}
		]
	}
}

const compare = (a, b) => {
	const score1 = a.score;
	const score2 = b.score;

	let comparison = 0;
	if (score1 > score2) {
		comparison = -1;
	} else if (score1 < score2) {
		comparison = 1;
	}
	return comparison;
}
