import Element from '../classes/element';
import Ship from '../classes/ship';
import Alien from '../classes/alien';
import Boss from '../classes/boss';

export default function createObject(type, dimensions) {

    //Colors for Aliens
    const colorsCodes = [[249, 250, 114], [35, 206, 247], [250, 116, 206], [255, 0, 0]];

    switch (type) {
        case "ship":

            //Calcul du point de départ
            let coordX = Math.round(dimensions.width / 2 - 65 / 2);
            let coordY = Math.round(dimensions.height - 56);

            return new Ship (65, 36, coordX, coordY, 0, 0, 0, 5, [
            [null,null,null,null,null,null,[0, 0, 0],null,null,null,null,null,null],
            [null,null,null,null,null,[111, 102, 102],[111, 102, 102],[111, 102, 102],null,null,null,null,null],
            [null,null,[77, 93, 178],[111, 102, 102],[111, 102, 102],[111, 102, 102],[255, 255, 255],[111, 102, 102],[111, 102, 102],[111, 102, 102],[77, 93, 178],null,null],
            [null,[77, 93, 178],[77, 93, 178],[111, 102, 102],[111, 102, 102],[255, 255, 255],[255, 255, 255],[255, 255, 255],[111, 102, 102],[111, 102, 102],[77, 93, 178],[77, 93, 178],null],
            [[77, 93, 178],[77, 93, 178],[77, 93, 178],[111, 102, 102],[111, 102, 102],[255, 255, 255],[255, 255, 255],[255, 255, 255],[0, 0, 0],[111, 102, 102],[77, 93, 178],[77, 93, 178],[77, 93, 178]],
            [[77, 93, 178],[77, 93, 178],null,null,[111, 102, 102],[111, 102, 102],[111, 102, 102],[111, 102, 102],[111, 102, 102],null,null,[77, 93, 178],[77, 93, 178]],
            [[77, 93, 178],null,null,[255, 0, 0],[245, 130, 7],[250, 184, 114],[249, 250, 114],[250, 184, 114],[245, 130, 7],[255, 0, 0],null,null,[77, 93, 178]]
            ]);

        case "alien":

            //Tirage d'une couleur
            let c = colorsCodes[Math.floor(Math.random() * colorsCodes.length)];

            //Tirage d'un alien
            let alien = randomAlien();

            //Creation de l'alien coloré
            let colorAlien = [];

            for(let i = 0; i < alien.length ; i++) {
                let newLine = [];
                for (let j = 0; j < alien[i].length ; j++) {
                    if(alien[i][j] === 1){
                        newLine.push(c);
                    } else {
                        newLine.push(null);
                    }
                }
                colorAlien.push(newLine);
            }

            return new Alien (45, 40, 100, 80, 0, 1, 0, 1, colorAlien);

        case "heart":
            return new Element (35, 30, 20, 20, null, null, null, 1, [
            [null,[255, 0, 0],[255, 0, 0],null,[255, 0, 0],[255, 0, 0],null], [[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0]],
            [[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0]], [null,[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],[255, 0, 0],null],
            [null,null,[255, 0, 0],[255, 0, 0],[255, 0, 0],null,null], [null,null,null,[255, 0, 0],null,null,0]
            ]);

        case "badHeart":

            //Calcul du point de départ
            let x = Math.round(dimensions.width - 270);

            return new Element (35, 30, x, 20, null, null, null, 1, [
            [null,[0, 0, 0],[0, 0, 0],null,[0, 0, 0],[0, 0, 0],null], [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]],
            [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]], [null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null],
            [null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null], [null,null,null,[0, 0, 0],null,null,0]
            ]);

        case "boss":
            //Coordonnees au centre du canvas
			let bossX = (dimensions.width / 2) - 32.5;
			let bossY = (dimensions.height / 2) - 37.5;

            return new Boss (65, 75, bossX, bossY, 1, 1, 1, 5, [
            [null,null,null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null,null,null],
            [null,null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null,null],
            [null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null],
            [null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null],
            [null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null],
            [null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null],
            [null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null],
            [null,[0, 0, 0],[0, 0, 0],null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null,[0, 0, 0],[0, 0, 0],null],
            [null,[0, 0, 0],[0, 0, 0],null,null,null,[0, 0, 0],null,null,null,[0, 0, 0],[0, 0, 0],null],
            [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null,[0, 0, 0],[0, 0, 0],[0, 0, 0],null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]],
            [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[255, 0, 0] ,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]],
            [[0, 0, 0],[0, 0, 0],[0, 0, 0],null,[0, 0, 0],null,[0, 0, 0],null,[0, 0, 0],null,[0, 0, 0],[0, 0, 0],[0, 0, 0]],
            [null,null,null,[0, 0, 0],[0, 0, 0],null,[0, 0, 0],null,[0, 0, 0],[0, 0, 0],null,null,null],
            [null,null,null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null,null,null],
            [null,null,null,null,null,[0, 0, 0],[0, 0, 0],[0, 0, 0],null,null,null,null,null]
            ]);

        default:
            break;
    }
}

function randomAlien() {
    let aliens = [
    [
    [0,0,0,1,1,1,0,0,0],
    [0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1],
    [1,0,0,1,1,1,0,0,1],
    [1,1,1,1,1,1,1,1,1],
    [0,0,1,0,0,0,1,0,0],
    [0,1,0,1,1,1,0,1,0],
    [1,0,0,0,0,0,0,0,1]
    ],[
    [0,0,0,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,0],
    [1,1,0,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1],
    [0,0,1,0,0,0,1,0,0],
    [0,1,0,1,1,1,0,1,0],
    [1,0,1,0,0,0,1,0,1]
    ],[
    [0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,1,0,0],
    [1,0,0,1,1,1,0,0,1],
    [1,0,1,1,1,1,1,0,1],
    [1,1,1,0,1,0,1,1,1],
    [0,1,1,1,1,1,1,1,0],
    [0,0,1,0,0,0,1,0,0],
    [0,1,0,0,0,0,0,1,0]
    ],[
    [0,1,0,0,0,0,0,1,0],
    [0,0,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,0,0,1,0,0,1,0],
    [0,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0],
    [1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1]
    ]
    ];

    return aliens[Math.floor(Math.random() * aliens.length)];
}
