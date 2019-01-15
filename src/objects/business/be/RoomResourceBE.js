import { ResourceBE } from './ResourceBE';
import { ResourceTypeEnum } from './ResourceTypeEnum';

export const MAX_NAME_LENGTH = 100;
export const MAX_SEATS_NUMBER = 1000;

export class RoomResourceBE extends ResourceBE {
	constructor(json) {
		super(json.name, json.mail, ResourceTypeEnum.ROOM);
		this.nbSeatsAvailable = json.nbSeatsAvailable;
		this.projectorAvailable = false;
		this.chromeboxAvailable = false;
	}
}
