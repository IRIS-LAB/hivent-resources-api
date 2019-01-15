import { RoomResourceBE } from '../../objects/business/be/RoomResourceBE'

exports.jsonToRoomResourceBE = json => {
	let resource = new RoomResourceBE(json.name, json.mail, json.nbSeatsAvailable)
	resource.projectorAvailable = json.projectorAvailable
	resource.chromeboxAvailable = json.chromeboxAvailable

	return resource
}
