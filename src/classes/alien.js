import Element from './element';

/*
* @class
*/

// eslint-disable-next-line no-unused-vars
export default class Alien extends Element {

    //Tir aleatoire selon fréquence (nb de frames) et probabilite (> à pourcentage)
    shot = (p5, game) => {
        if((p5.frameCount % game.compteurTirAlien === 0) && (Math.random() * 100 < game.probaShot)) {
            return [new Element (5, 10, this.coordX + this.largeur / 2, this.coordY + this.hauteur, 0, 1, 5, 1, [[[255, 0, 0]],[[255, 0, 0]]])];
        }
        return null;
    }
}
