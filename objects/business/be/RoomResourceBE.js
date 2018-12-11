import { ResourceBE } from './ResourceBE'
import { ResourceTypeEnum } from './ResourceTypeEnum'

export class RoomResourceBE extends ResourceBE {
	constructor(name, mail, nbSeatsAvailable) {
		super(name, mail, ResourceTypeEnum.ROOM)
		this._nbSeatsAvailable = nbSeatsAvailable
		this._projectorAvailable = false
		this._chromeboxAvailable = false
	}

	get nbSeatsAvailable() {
		return this._nbSeatsAvailable
	}

	get projectorAvailable() {
		return this._projectorAvailable
	}

	set projectorAvailable(projectorAvailable) {
		this._projectorAvailable = projectorAvailable
	}

	get chromeboxAvailable() {
		return this._chromeboxAvailable
	}

	set chromeboxAvailable(chromeboxAvailable) {
		this._chromeboxAvailable = chromeboxAvailable
	}
}
