import { getPixelsList } from '../tools/functions';

/*Gestion des collisions
 Source: https://openclassrooms.com/courses/theorie-des-collisions/formes-simples

 Ce test verifie si 2 objets sont situes dans la meme zone de l'ecran, si oui, on teste alors s'ils partagent un meme pixel a l'ecran, pixel par pixel
 
 NOTES:
 - Les coordonnees etant du type float, pour les tests de collisions, elles sont converties en int, pour que la detection d'un pixel commun soit facilite
 - Les collisions entre les tirs ne sont pas testes
 */

export default function collisions (objet, target) {

  //Verification rapide de proximite des 2 objets
    if ((objet.coordX >= target.coordX + target.largeur)	// trop à droite
		&& (objet.coordX + objet.largeur <= target.coordX)	// trop à gauche
		&& (objet.coordY >= target.coordY + target.hauteur)	// trop en bas
		&& (objet.coordY + objet.hauteur <= target.coordY))	// trop en haut
		return false;

		// Comparaison pixel par pixel
		const theList = getPixelsList(objet);
		const enemyList = getPixelsList(target);

		//Détermination du plus petit objet
		const smaller = theList.length > enemyList.length ? enemyList : theList;
		const bigger = theList.length < enemyList.length ? enemyList : theList;

		for (let k = 0; k < bigger.length ; k++) {
			for (var l = 0; l < smaller.length; l++) {
				if ((bigger[k][0] === smaller[l][0]) && (bigger[k][1] === smaller[l][1])) {
					return true;
				}
			}
		}

  return false;
}

