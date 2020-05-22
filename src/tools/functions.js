function getDatasLevel(p, level) {

    switch (level) {

        case 1:
            return {
                image: p.backImage1,
                author: "Image par Arek Socha de Pixabay",
                maxAliens: 4,
                // maxAliens: 10,
                vitesseAlien: 0.3,
                compteurTirAlien: 120,
                probaShot: 40
            };

        case 2:
            return {
                image: p.backImage2,
                author: "Image par CharlVera de Pixabay",
                maxAliens: 4,
                // maxAliens: 14,
                vitesseAlien: 0.4,
                compteurTirAlien: 100,
                probaShot: 50
            };

        case 3:
            return {
                image: p.backImage3,
                author: "Image par ipicgr de Pixabay",
                maxAliens: 4,
                // maxAliens: 16,
                vitesseAlien: 0.45,
                compteurTirAlien: 80,
                probaShot: 60
            };

        case 4:  //Big Boss
            return {
                image: p.backImage4,
                author: null,
                maxAliens: 1,
                vitesseAlien: 1,
                compteurTirAlien: 40,
                probaShot: 70
            };

        default:
            break;
    }
}

function getPixelsList(obj) {

    const listPixels = [];

    for (var i = 0; i < obj.matrix.length; i++) {  // Tous les pixels en Y

        for (var j = 0; j < obj.matrix[i].length; j++) {  //Chaque valeur de X

            if (obj.matrix[i][j]) { //Si le point est actif

                let posYStart = parseInt(obj.coordY + i*5);
                let posXStart = parseInt(obj.coordX + j*5);

                for(let t = 0 ; t < 5 ; t++){ //Creation coord pixel sous forme (coordX,coordY)

                    let posY = parseInt(posYStart + t);

                    for(let m = 0 ; m < 5 ; m++){
                        let posX = parseInt(posXStart + m);
                        let newPixel = [posX,posY];
                        listPixels.push(newPixel);
                    }
                }
            }
        }
    }

    return listPixels;
}

function gimmeText(p, datas) {
		p.textAlign(p.CENTER);
		p.textSize(p.height * datas.size);
		p.textFont(datas.font);
		p.fill(datas.color[0], datas.color[1], datas.color[2]);
		p.text(datas.text, p.width * 0.5, parseInt(p.height * datas.coordY));
}

export { getDatasLevel, getPixelsList, gimmeText };


