import { getDatasLevel } from '../tools/functions';
import giveMeBreak from '../tools/giveMeBreak';
import giveMeTheScores from '../tools/giveMeTheScores';

/*
* @class
* @param {Number} level
* @param {Object} starShip
* @param {Object} [aliens]
* @param {Object} [shotsShip]
* @param {Object} [shotsAlien]
* @param {Number} score
*/

// eslint-disable-next-line no-unused-vars
export default class Game {

    constructor(starShip){
        this.level = 0;
        this.state = 'intro'; //
        this.starShip = starShip;
        this.aliens = [];
        this.shotsShip = [];
        this.shotsAlien = [];
        this.score = 0;
        this.fond = null;
        this.author = null;
        this.maxAliens = null;
        this.vitesseAlien = null;
        this.compteurTirAlien = null;
        this.probaShot = null;
        this.texts = [];
        this.pseudo = '';
    }

    // Update des proprietes selon niveau
    initiateLevel = (p5, level) => {

        //Récupération des datas du niveau
        const newLevel = getDatasLevel(p5, level);

        //Update image background
        this.fond = newLevel.image;
        this.author = newLevel.author;

        //Update des datas
        if(this.state === 'play') {   //Games
            this.maxAliens = newLevel.maxAliens;
            this.vitesseAlien = newLevel.vitesseAlien;
            this.compteurTirAlien = newLevel.compteurTirAlien;
            this.probaShot = newLevel.probaShot;
        }
    }

    initiateBreaks = (p5) => {
        let theDatas = giveMeBreak(p5, this.state, this.level, this.score);

        this.fond = theDatas.image;
        this.texts = theDatas.texts;
        this.author = theDatas.author;
    }

    initiateScores = (p5) => {
        let theScoresDatas = giveMeTheScores(p5, this.score, this.pseudo);

        this.fond = theScoresDatas.image;
        this.author = theScoresDatas.author;
        this.texts = theScoresDatas.texts;
    }

    // Update des vies pour Aliens et tirs
    updateElements = () => {
        //Aliens
        this.aliens = this.aliens.filter(alien => alien.lives > 0);

        //Shots
        this.shotsShip = this.shotsShip.filter(shotS => shotS.lives > 0);
        this.shotsAlien = this.shotsAlien.filter(shot => shot.lives > 0);
    }

    // Update level
    setLevel(level) {
        this.level = level;
    }

    //Update score
    setScore(points) {
        this.score += points;
    }
}
