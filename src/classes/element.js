import collisions from '../scripts/collisions';

/*
* @class
* @param {Number} largeur
* @param {Number} hauteur
* @param {Number} coordY
* @param {Number} coordX
* @param {Number} directionX
* @param {Number} directionY
* @param {Number} vitesse
* @param {Number} shot
* @param {Number} lives
* @param {Number} [[matrix]]
*/

// eslint-disable-next-line no-unused-vars
export default class Element {

    constructor(largeur, hauteur, coordX, coordY, directionX, directionY, vitesse, lives, matrix){
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.coordY = coordY;
        this.coordX = coordX;
        this.directionX = directionX;
        this.directionY = directionY;
        this.vitesse = vitesse;
        this.lives = lives;
        this.matrix = matrix;
    }

    //Affichage
    show(p5) {
        for (let i = 0; i < this.matrix.length; i++) {  // Tous les 5 pixels en Y
            for (let j = 0; j < this.matrix[i].length; j++) {  //Tous les 5 pixels en X

                let carre = this.matrix[i][j];

                if (carre) { //pixel colore donc carre dessine

                    //Calcul des positions x,y du coin gauche superieur du carre
                    const x = this.coordX + j*5;
                    const y = this.coordY + i*5;

                    //Affichage du carre
                    p5.strokeWeight(1);
                    p5.stroke(carre[0], carre[1], carre[2]);
                    p5.fill(carre[0], carre[1], carre[2]);
                    p5.rect(x, y, 5, 5);

                }
            }
        }
    }

    //Deplacement Aliens et tirs dans le sens de la hauteur
    moove(p5) {
        this.coordY = this.coordY + this.directionY * this.vitesse;
    }

    //Test collision
    hit(shots) {
        let result = null;
        shots.forEach((shot, index) => {
            if(collisions(this, shot)) {
                this.lives--;
                result = index;
            }
        })
        return result;
    }
}
