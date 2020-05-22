import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";
import Game from '../classes/game';
import createObject from '../scripts/createObject';
import { gimmeText } from '../tools/functions';

const PlayGround = ({ dimensions }) => {

	//Ref
	const myRef = useRef(null);

	useEffect(() => {
		let canvas = new p5(Sketch, myRef.current);
		return () => {
			canvas.remove();
		}
	});

	//Sketch
	const Sketch = (p) => {

		/* PRELOAD */
		p.preload = () => {

			// Chargement des images
			p.backImage0 = p.loadImage(`img/level0.png`);
			p.backImage1 = p.loadImage(`img/level1.jpg`);
			p.backImage2 = p.loadImage(`img/level2.jpg`);
			p.backImage3 = p.loadImage(`img/level3.jpg`);
			p.backImage4 = p.loadImage(`img/level4.jpg`);
			p.mute = p.loadImage(`img/mute.png`);
			p.mute.resize(20, 0);
			p.sound = p.loadImage(`img/sound.png`);
			p.sound.resize(20, 0);

			// Fonts
			p.fontBig = p.loadFont('data/TitilliumWeb-SemiBold.ttf');
			p.fontMedium = p.loadFont('data/TitilliumWeb-Light.ttf');
			p.fontSmall = p.loadFont('data/TitilliumWeb-ExtraLight.ttf');

			// Sounds
			p.soundFormats('mp3');
			p.imperial = p.loadSound('data/imperialMarch');
			p.esquive = p.loadSound('data/esquive');
			p.explosionAlien = p.loadSound('data/explosionAlien');
			p.explosionShip = p.loadSound('data/explosionShip');
			p.intro = p.loadSound('data/intro');
			p.shipFire = p.loadSound('data/shipFire');
			p.shootAlien = p.loadSound('data/shootAlien');

			//Fetch des scores
			p.httpGet('https://xxxxxxxxxxxxxxxxxxx', 'json', false, function (response) {
				p.highScores = response;
			});
		}

		/* SETUP */
		p.setup = () => {
			//Initialisation du Canvas
			p.createCanvas(dimensions.width, dimensions.height)
		}

		//Variables
		let changeLevel = false;
		let shoooot = false;
		let decompte = 2000;
		let mute = true;

		//Enum état de la partie
		const states = {
			INTRO: 'intro',
			PLAY: 'play',
			BREAK: 'break',
			OVER: 'over',
			SUCCESS: 'success',
			HIGHSCORES: 'highScores'
		}

		//Initialisation du ship
		let starShip = createObject('ship', dimensions);

		//Initialisation de la partie
		let game = new Game(starShip);

		/* DRAW */
		p.draw = () => {

			//Dimensions
			const theDimensions = dimensions;

			//Changement level
			if (changeLevel) {

				changeLevel = false;

				//Reset decompte
				decompte = game.level === 4 ? 4000 : 2000;

				//Chargement datas level
				game.initiateLevel(p, game.level);

				if (game.state === 'play') {	// Levels

					//Reset des donnees de game
					game.aliens = [];
					game.shotsShip = [];
					game.shotsAlien = [];

					//Creation des Aliens
					if ([1, 2, 3].includes(game.level)) {

						//Calcul du nb d'aliens à afficher en fonction de la largeur du canvas, minoré si > maxAliens
						let nbAliens = Math.floor(theDimensions.width / 75);
						if (nbAliens > game.maxAliens) nbAliens = game.maxAliens;

						let startX = (theDimensions.width - nbAliens * 75) / 2;

						for (let i = 0; i < nbAliens; i++) {
							let newAlien = createObject('alien');
							newAlien.coordX = startX + (75 * i);
							newAlien.vitesse = game.vitesseAlien;
							game.aliens.push(newAlien);
						}

					} else if (game.level === 4) { //BigBoss
						let bigBoss = createObject('boss', theDimensions);
						bigBoss.vitesse = game.vitesseAlien
						game.aliens.push(bigBoss);
					}
				}
				play(p);

			} else {

				p.clear();

				switch (game.state) {
					case 'intro':
					case 'break':
					case 'over':
					case 'success':

						pause(p);

						game.initiateBreaks(p);

						p.background(game.fond);

						if (game.author) getTheAuthor(p, game.author, theDimensions.height * 0.99);

						//Affichage texts
						game.texts.forEach(text => {
							gimmeText(p, text);
						})

						//Affichage input pour pseudo si score > 0
						if ((game.state === 'over' || game.state === 'success') && game.score > 0) {
							p.inp = p.createInput('');
							p.inp.attribute('maxlength', "10")
							p.inp.input(scoreInputEvent);
							p.inp.size(200, 50);
							p.inp.center('horizontal');
							p.inp.position(null, dimensions.height * 0.65);
							p.inp.style('border', '3px solid red');
							p.inp.style('border-radius', '5px');
							p.inp.style('text-align', 'center');
							p.inp.style('font-size', '25px');
							p.inp.style('color', 'red');
							p.inp.style('background-color', 'black');
						}

						//Sounds
						if (game.state === 'intro') {
							p.image(mute ? p.mute : p.sound, dimensions.width - 150, 50);
							if (p.imperial.isPlaying()) p.imperial.stop();
							if (!mute) {
								p.intro.play();
							} else if(p.intro.isPlaying()) {
								p.intro.pause();
							}
						}

						break;

					case 'play':
						if (p.intro.isPlaying()) p.intro.stop();

						if (game.fond) p.background(game.fond);
						if (game.author) getTheAuthor(p, game.author, theDimensions.height * 0.99);

						//Tir ship
						if (shoooot) {
							game.shotsShip.push(game.starShip.shot());
							shoooot = false;
						}

						//Tirs Aliens
						let allowSound = false;

						game.aliens.forEach(item => {
							let tir = item.shot(p, game);

							if (tir) {
								game.shotsAlien = game.shotsAlien.concat(tir);
								allowSound = true;
							}
						})

						if (allowSound) {
							p.shootAlien.play();
							allowSound = false;
						}

						//Collisions shots VS Ship
						let shipVSshots = game.starShip.hit(game.shotsAlien);
						if (shipVSshots !== null) game.shotsAlien[shipVSshots].lives--;

						//Collisions shots VS aliens
						game.aliens.forEach(alien => {
							let aliensVSshots = alien.hit(game.shotsShip, theDimensions);
							if (aliensVSshots !== null) {
								if (aliensVSshots === 'esquive') {
									p.esquive.play();
								} else {
									game.shotsShip[aliensVSshots].lives--;
									game.score += 200;
									p.explosionAlien.play();
								}
							}
						})

						//Collisions tirs Ship VS bordures
						game.shotsShip.forEach((shot, index) => {
							if (shot.coordY <= 0) game.shotsShip[index].lives--;
						})

						//Collisions tirs Aliens VS bordures
						game.shotsAlien.forEach((shot, index) => {
							if (shot.coordY > theDimensions.height - 10) game.shotsAlien[index].lives--;
						})

						//Collisions Aliens VS Ship
						if (game.aliens[0].coordY + 30 >= game.starShip.coordY) game.starShip.lives = 0;

						//Affichage coeurs
						for (let a = 0; a < game.starShip.lives; a++) {
							let heart = createObject('heart');
							heart.coordX += (a * 50);
							heart.show(p);
						}

						if (game.level === 4) {
							for (let b = 0; b < game.aliens[0].lives; b++) {
								let bossHeart = createObject('badHeart', theDimensions);
								bossHeart.coordX += (b * 50);
								bossHeart.show(p);
							}
						}

						//Update elements
						game.updateElements();

						//Update score
						decompte--;

						let elements = [game.starShip].concat(game.aliens, game.shotsShip, game.shotsAlien);

						elements.forEach(item => {
							item.show(p);
							play(p);
						});

						//This is the end?
						if (game.starShip.lives === 0) {
							p.explosionShip.play();
							game.state = states.OVER;

						} else if (game.aliens.length === 0) {
							game.setScore(decompte);

							if (game.level === 4) {
								game.setScore(game.starShip.lives * 500); //Bonus nb de vies
								game.state = states.SUCCESS;
							} else {
								game.state = states.BREAK;
							}

						} else {
							elements.forEach(item => {
								item.moove(p);
							});
						}

						break;

					case 'highScores':

						p.imperial.play();

						p.removeElements();
						game.initiateScores(p);
						p.background(game.fond);

						//Affichage texts
						game.texts.forEach(text => {
							gimmeText(p, text);
						})

						//Sauvegarde score si connexion internet
						if(game.score > 0 && p.highScores) p.httpPost('https://xxxxxxxxxxxxxxxxxxx','json', {
							pseudo: game.pseudo,
							score: game.score
						});

						break;

					default:
						break;
				}
			}
		}

		//Pause
		const pause = () => {
			;
			p.noLoop();
		}

		// Play
		const play = () => {
			p.loop();
		}

		//Click souris
		p.mouseClicked = () => {
			if (!shoooot && game.state === 'play') {
				shoooot = true;
				p.shipFire.play();
			} else if (game.state === 'intro') {
				if (p.mouseX >= p.width - 150 && p.mouseX <= p.width - 98) {
					if (p.mouseY >= 50 && p.mouseY <= 102) {
						mute = !mute;
						p.redraw();
					}
				}
			}
		}

		//Sauvegarde pseudo
		function scoreInputEvent() {
			game.pseudo = this.value();
		}

		//Touche clavier
		p.keyPressed = () => {
			const theKey = p.key;

			if (game.state === 'intro' && ['1', '2', '3', '4'].includes(theKey)) {	//Choix niveau
				game.level = parseInt(theKey);
				game.state = states.PLAY;
				changeLevel = true;
				p.redraw();

			} else if (game.state === 'break' && theKey === 'n') {	//Niveau suivant
				game.setLevel(game.level + 1);
				game.state = states.PLAY;
				changeLevel = true;
				p.redraw();

			} else if ((game.state === 'over' || game.state === 'success') && theKey === 'Enter' && (game.pseudo !== '' || game.score === 0)) { //Validation pseudo
				game.state = states.HIGHSCORES;
				p.redraw();

			} else if (game.state === 'highScores' && theKey === 'q') { // Back to intro
				game = new Game(createObject('ship', dimensions));	// Réinitialisation de la partie
				p.redraw();
			}
		}

		//Affichage auteur image
		function getTheAuthor(p, text, positionY) {
			p.textAlign(p.LEFT);
			p.textSize(p.height * 0.02);
			p.textFont(p.fontSmall);
			p.fill(p.color(0, 0, 255));
			p.noStroke();
			p.text(text, 0, positionY);
		}
	}


	return (
		<div ref={myRef}>

		</div>
	)

}

export default PlayGround;