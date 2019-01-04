import * as resourcesDAO from '../data/ResourcesDAO';
import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum';
import { BusinessException, ErrorDO } from 'iris-elements';

export const MAX_NAME_LENGTH = 100;
export const MAX_SEATS_NUMBER = 1000;

export const checkRoomResourceBE = resourceBE => {
	let errors = [];
	// name
	if (!resourceBE.name) {
		errors.push(new ErrorDO('name', 'resource.name.required', 'Le nom est obligatoire.'));
	} else {
		if (resourceBE.name.length > MAX_NAME_LENGTH) {
			errors.push(
				new ErrorDO('name', 'resource.name.length', 'La longueur du nom ne doit pas dépasser 100 caractères.')
			);
		}
	}
	// type
	if (!resourceBE.type) {
		errors.push(new ErrorDO('type', 'resource.type.required', 'Le type est obligatoire.'));
	} else {
		if (resourceBE.type !== ResourceTypeEnum.ROOM) {
			errors.push(new ErrorDO('type', 'resource.type.invalid', `Le type ${resourceBE.type} doit être ROOM.`));
		}
	}
	// mail
	if (!resourceBE.mail) {
		errors.push(new ErrorDO('mail', 'resource.mail.required', "L'email est obligatoire."));
	} else {
		let regex = /^(\s*|[a-zA-Z0-9._-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})$/;
		if (!regex.test(resourceBE.mail)) {
			errors.push(new ErrorDO('mail', 'resource.mail.invalid', "L'email est invalide."));
		}
	}
	// nbSeatsAvailable
	if (!resourceBE.nbSeatsAvailable && resourceBE.nbSeatsAvailable !== 0) {
		errors.push(
			new ErrorDO('nbSeatsAvailable', 'resource.nbSeatsAvailable.required', 'Le nombre de places est obligatoire.')
		);
	} else {
		if (!Number.isInteger(resourceBE.nbSeatsAvailable) || resourceBE.nbSeatsAvailable < 1) {
			errors.push(
				new ErrorDO('nbSeatsAvailable', 'resource.nbSeatsAvailable.invalid', 'Le nombre de places doit être un entier.')
			);
		} else {
			if (resourceBE.nbSeatsAvailable > MAX_SEATS_NUMBER) {
				errors.push(
					new ErrorDO(
						'nbSeatsAvailable',
						'resource.nbSeatsAvailable.max',
						'Le nombre de places doit inférieur à ' + MAX_SEATS_NUMBER
					)
				);
			}
		}
	}
	// projectorAvailable
	if (typeof resourceBE.projectorAvailable != 'boolean') {
		errors.push(
			new ErrorDO(
				'projectorAvailable',
				'resource.projectorAvailable.invalid',
				"L'indicateur de disponibilité de projecteur est incorrect."
			)
		);
	}
	// chromeboxAvailable
	if (typeof resourceBE.chromeboxAvailable != 'boolean') {
		errors.push(
			new ErrorDO(
				'chromeboxAvailable',
				'resource.chromeboxAvailable.invalid',
				"L'indicateur de disponibilité de chromebox est incorrect."
			)
		);
	}

	return errors;
};

export const findResources = async () => {
	return await resourcesDAO.findResources();
};

export const getResource = async resourceId => {
	return await resourcesDAO.getResource(resourceId);
};

export const createResource = async resourceBE => {
	console.log('ResourceLBS : ' + resourceBE);
	let errors = checkRoomResourceBE(resourceBE);
	if (errors.length > 0) {
		throw new BusinessException(errors);
	}
	return await resourcesDAO.createResource(resourceBE);
};

export const init = async () => {
	console.log('ResourcesLBS init ');
	return await resourcesDAO.init();
};
