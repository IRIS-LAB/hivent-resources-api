import * as resourcesDAO from '../data/ResourcesDAO';
import { checkRoomResourceBE } from './ValidatorLBS';

export const findResources = async () => {
	return await resourcesDAO.findResources();
};

export const getResource = async resourceId => {
	return await resourcesDAO.getResource(resourceId);
};

export const createResource = async resourceBE => {
	console.debug('createResource entry');
	checkRoomResourceBE(resourceBE);
	console.debug('RoomResourceBE checked');
	return await resourcesDAO.createResource(resourceBE);
};

export const init = async () => {
	return await resourcesDAO.init();
};
