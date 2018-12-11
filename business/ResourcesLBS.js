import * as resourcesDAO from '../data/ResourcesDAO'
import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum';
const MAX_NAME_LENGTH = 100
const MAX_SEATS_NUMBER = 1000

const checkRoomResourceBE = resourceBE => {
	// name
	if (!resourceBE.name) {
		throw Error('Le nom est obligatoire')
	} else {
		if (resourceBE.name.length > MAX_NAME_LENGTH) {
			throw Error('La longueur du nom ne doit pas dépasser 100 caractères')
		}
	}
	// type
	if (!resourceBE.type) {
		throw Error('Le type est obligatoire')
	} else {
		if (resourceBE.type in ResourceTypeEnum) {
			throw Error('Le type ' + resourceBE.type + ' n\'est pas connu')
		}
	}
	// mail
	if (!resourceBE.mail) {
		throw Error('L\'email est obligatoire')
	} else {
		let regex = /^(\s*|[a-zA-Z0-9._-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})$/
		if (!regex.test(resourceBE.email)) {
			throw Error('L\'email est invalide')
		}
	}
	// nbSeatsAvailable
	if (!resourceBE.nbSeatsAvailable) {
		throw Error('Le nombre de places est obligatoire')
	} else {
		if (!Number.isInteger(resourceBE.nbSeatsAvailable)) {
			throw Error('Le nombre de places doit être un entier')
		} else {
			if (resourceBE.nbSeatsAvailable > MAX_SEATS_NUMBER) {
				throw Error('Le nombre de places doit inférieur à ' + MAX_SEATS_NUMBER)
			}
		}
	}
	// projectorAvailable
	if (typeof resourceBE.projectorAvailable != 'boolean') {
		throw Error('L\'indicateur de disponibilité de projecteur est incorrect')
	}
	// chromeboxAvailable
	if (typeof resourceBE.chromeboxAvailable != 'boolean') {
		throw Error('L\'indicateur de disponibilité de chromebox est incorrect')
	}
}

export const findResources = async () => {
	return await resourcesDAO.findResources()
}

export const getResource = async resourceId => {
	return await resourcesDAO.getResource(resourceId)
}

export const createResource = async resourceBE => {
	console.log('ResourceLBS : ' + resourceBE)
	checkRoomResourceBE(resourceBE)
	return await resourcesDAO.createResource(resourceBE)
}

export const init = async ()  => {
	console.log('ResourcesLBS init ' )
	return await resourcesDAO.init()
}
