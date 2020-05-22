import Element from './element';
import collisions from '../scripts/collisions';

/*
* @class
*/

// eslint-disable-next-line no-unused-vars
export default class Boss extends Element {


    //Deplacement BigBoss
    moove(p5) {

        //Modificateurs de direction, toutes les 250 frames, la direction est aleatoirement modifiee
        if(p5.frameCount % 100 === 0) {
            let modifs = [1, -1];

            this.directionX = modifs[Math.floor(Math.random() * modifs.length)];
            this.directionY = modifs[Math.floor(Math.random() * modifs.length)];
        }

        //Calculs coordonnées
        let newCoordX = this.coordX + this.directionX * this.vitesse;
        let newCoordY = this.coordY + this.directionY * this.vitesse;

        //Gestion impacts avec bords canvas
        if (newCoordX < 33 || newCoordX > p5.width - this.largeur) {
            this.directionX = this.directionX * -1;
            newCoordX = this.coordX + this.directionX * this.vitesse;
        }

        if (newCoordY < 50 || newCoordY > p5.height - this.hauteur - 100) {
            this.directionY = this.directionY * -1;
            newCoordY = this.coordY + this.directionY * this.vitesse;
        }

        this.coordX = newCoordX;
        this.coordY = newCoordY;
    }

    //Collision: 1 chance / 2 d'éviter le tir, esquive en fonction des bords du canvas
    hit(shots, dimensions) {
        let result = null;
        shots.forEach((shot, index) => {
            if(collisions(this, shot)) {
                if(Math.random() * 100 < 51) {
                    this.lives--;
                    result = index;
                } else {
                    //Esquive selon position bords gauche et droite
                    if(this.coordX < 100 || this.coordX < dimensions.width - 150) {
                        this.coordX = this.coordX + 60;
                    } else {
                        this.coordX = this.coordX - 60;
                    }

                    //Esquive selon position bords haut et bas
                    if(this.coordY < 150 || this.coordY < dimensions.height - 200) {
                        this.coordY = this.coordY + 60;
                    } else {
                        this.coordY = this.coordY - 60;
                    }

                    result = 'esquive';
                }
            }
        })
        return result;
    }

    // 2 Tirs aleatoire selon fréquence (nb de frames) et probabilite (> à pourcentage)
    shot = (p5, game) => {

        const coordXTirs = [2.5, 63.5];

        if((p5.frameCount % game.compteurTirAlien === 0) && (Math.random() * 100 < game.probaShot)) {
            let shots = [];

            for(let i = 0; i < coordXTirs.length ; i++) {
                shots.push(new Element (5, 10, this.coordX + + coordXTirs[i], this.coordY + this.hauteur, 0, 1, 5, 1, [[[255, 0, 0]],[[255, 0, 0]]]));
            }

            return shots;
        }
        return null;
    }
}
