export default function giveMeBreak(p, state, level, score) {

	switch (state) {
		case 'intro':
			return {
				image: p.backImage0,
				author: "Image par Christian Dorn de Pixabay",
				texts: [
					{
						text: "SoapAndSoft  -  Cantinelli Thomas",
						font: p.fontSmall,
						size: 0.03,
						coordY: 0.05,
						color: [255, 0, 0]
					}, {
						text: "Stars Invaders Wars",
						font: p.fontBig,
						size: 0.1,
						coordY: 0.16,
						color: [255, 0, 0]
					}, {
						text: "Press key to start:\n" +
							"key 1 ........... Level 1\n" +
							"key 2 ........... Level 2\n" +
							"key 3 ........... Level 3\n" +
							"   key 4 ........... Big Boss\n"
						,
						font: p.fontMedium,
						size: 0.04,
						coordY: 0.6,
						color: [255, 0, 0]
					}, {
						text: "To move: Mouse Left/Right  To shoot: Left Button",
						font: p.fontMedium,
						size: 0.04,
						coordY: 0.9,
						color: [255, 0, 0]
					}
				]
			}

		case 'break':
			return {
				image: 'rgba(0%, 0%, 0%, 1)',
				author: null,
				texts: [
					{
						text: `Level ${level} completed\n`,
						font: p.fontBig,
						size: 0.1,
						coordY: 0.42,
						color: [255, 0, 0]
					}, {
						text: `Your score: ${score} pts`,
						font: p.fontMedium,
						size: 0.08,
						coordY: 0.53,
						color: [255, 0, 0]
					}, {
						text: `Press n to continue`,
						font: p.fontMedium,
						size: 0.071,
						coordY: 0.67,
						color: [255, 0, 0]
					}
				]
			}
		case 'over':
		case 'success':
			return {
				image: 'rgba(0%, 0%, 0%, 1)',
				texts: [
					{
						text: `${state === 'over' ? 'GAME OVER' : 'YOU WIN !!!'}\n`,
						font: p.fontBig,
						size: 0.1,
						coordY: 0.22,
						color: [255, 0, 0]
					}, {
						text: `Your score: ${score} pts`,
						font: p.fontMedium,
						size: 0.08,
						coordY: 0.38,
						color: [255, 0, 0]
					}, {
						text: `${score > 0 ? 'Enter your name and press enter' : 'Press Enter to continue'}`,
						font: p.fontMedium,
						size: 0.071,
						coordY: 0.58,
						color: [255, 0, 0]
					}
				]
			}

		default:
			return false;
	}
}
