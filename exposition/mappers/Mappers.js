import ResourceTypeEnum from '../../objects/business/be/ResourceTypeEnum'
import { RoomResourceBE } from '../../objects/business/be/RoomResourceBE'

exports.jsonToResourceBE = json => {
	let resource
	if (json.resourceType == ResourceTypeEnum.ROOM) {
		resource = new RoomResourceBE(json.name, json.mail, json.resourceType)
		resource.nbSeatsAvailable = json.nbSeatsAvailable
		resource.projectorAvailable = json.projectorAvailable
		resource.chromeboxAvailable = json.chromeboxAvailable
	}
	return resource
}
