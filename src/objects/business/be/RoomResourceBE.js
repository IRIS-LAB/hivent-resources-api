import { ResourceBE } from './ResourceBE'
import { ResourceTypeEnum } from './ResourceTypeEnum'

export class RoomResourceBE extends ResourceBE {
	constructor(name, mail, nbSeatsAvailable) {
		super(name, mail, ResourceTypeEnum.ROOM)
		this.nbSeatsAvailable = nbSeatsAvailable
		this.projectorAvailable = false
		this.chromeboxAvailable = false
	}

	/*
	get nbSeatsAvailable() {
		return this.nbSeatsAvailable
	}

	get projectorAvailable() {
		return this.projectorAvailable
	}

	set projectorAvailable(projectorAvailable) {
		this.projectorAvailable = projectorAvailable
	}

	get chromeboxAvailable() {
		return this.chromeboxAvailable
	}

	set chromeboxAvailable(chromeboxAvailable) {
		this.chromeboxAvailable = chromeboxAvailable
	}
	*/
}
