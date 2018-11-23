export class ResourceBE {
	constructor(name, mail, resourceType) {
		this._name = name
		this._mail = mail
		this._resourceType = resourceType
	}

	get name() {
		return this._name
	}

	get mail() {
		return this._name
	}

	get resourceType() {
		return this._resourceType
	}
}
