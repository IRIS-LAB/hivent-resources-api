import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum';
import * as RoomResourceBE from '../objects/business/be/RoomResourceBE';
import { BusinessException, ErrorDO, checkMail as irisElementsCheckMail } from 'iris-elements';

/** 
 * RoomResource Check
 * @function checkRoomResourceBE
 * @param {RoomResourceBE} resourceBE RoomResource to check
 * @throws {BusinessException} when RoomResource is invalid
 **/
export const checkRoomResourceBE = resourceBE => {
	let errors = [];
	errors = [...checkName(resourceBE), ...checkType(resourceBE), ...checkMail(resourceBE), 
		...checkNbSeatsAvailable(resourceBE), ...checkProjectorAvailable(resourceBE), ...checkChromeboxAvailable(resourceBE)];
	if (errors.length > 0) {
		throw new BusinessException(errors);
	}
};

export function checkName(resourceBE) {
	// name
	let errors = [];
	if (!resourceBE.name) {
		errors.push(new ErrorDO('name', 'resource.name.required', 'Le nom est obligatoire.'));
	} else {
		if (resourceBE.name.length > RoomResourceBE.MAX_NAME_LENGTH) {
			errors.push(
				new ErrorDO('name', 'resource.name.length', `La longueur du nom ne doit pas dépasser ${RoomResourceBE.MAX_NAME_LENGTH} caractères.`)
			);
		}
	}
	return errors;
};

export function checkType(resourceBE) {
	// type
	let errors = [];
	if (!resourceBE.type) {
		errors.push(new ErrorDO('type', 'resource.type.required', 'Le type est obligatoire.'));
	} else {
		if (resourceBE.type !== ResourceTypeEnum.ROOM) {
			errors.push(new ErrorDO('type', 'resource.type.invalid', `Le type ${resourceBE.type} doit être ROOM.`));
		}
	}
	return errors;
};

export function checkMail(resourceBE) {
	// mail
	let errors = [];
	if (!resourceBE.mail) {
		errors.push(new ErrorDO('mail', 'resource.mail.required', "L'email est obligatoire."));
	} else {
		if (!irisElementsCheckMail(resourceBE.mail)) {
			errors.push(new ErrorDO('mail', 'resource.mail.invalid', "L'email est invalide."));
		}
	}

	return errors;
};

export function checkNbSeatsAvailable(resourceBE) {
	// nbSeatsAvailable
	let errors = [];
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
			if (resourceBE.nbSeatsAvailable > RoomResourceBE.MAX_SEATS_NUMBER) {
				errors.push(
					new ErrorDO(
						'nbSeatsAvailable',
						'resource.nbSeatsAvailable.max',
						'Le nombre de places doit inférieur à ' + RoomResourceBE.MAX_SEATS_NUMBER
					)
				);
			}
		}
	}
	return errors;
};

export function checkProjectorAvailable(resourceBE) {
	// projectorAvailable
	let errors = [];
	if (typeof resourceBE.projectorAvailable != 'boolean') {
		errors.push(
			new ErrorDO(
				'projectorAvailable',
				'resource.projectorAvailable.invalid',
				"L'indicateur de disponibilité de projecteur est incorrect."
			)
		);
	}
	return errors;
};

export function checkChromeboxAvailable(resourceBE) {
	// chromeboxAvailable
	let errors = [];
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
