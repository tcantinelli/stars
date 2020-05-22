import Element from './element';

/*
* @class
*/

// eslint-disable-next-line no-unused-vars
export default class Ship extends Element {

    //Deplacement
    moove(p5) {
        //Arrêt trajectoire en x s'il atteint les bords
        if(p5.mouseX > 35 && p5.mouseX < p5.width - this.largeur / 2) {
            this.coordX = p5.mouseX - 32.5;
        }
    }

    //Tir
    shot = () => {
        return new Element (5, 10, this.coordX + 32.5, this.coordY, 0, -1, 20, 1, [[[54, 232, 85]],[[54, 232, 85]]]);
    }
}
