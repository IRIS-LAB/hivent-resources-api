import { ResourceBE } from './ResourceBE'
import { ResourceTypeEnum } from './ResourceTypeEnum'

export const MAX_NAME_LENGTH = 100;
export const MAX_SEATS_NUMBER = 1000;

export class RoomResourceBE extends ResourceBE {
	constructor(name, mail, nbSeatsAvailable) {
		super(name, mail, ResourceTypeEnum.ROOM)
		this.nbSeatsAvailable = nbSeatsAvailable
		this.projectorAvailable = false
		this.chromeboxAvailable = false
	}
}
