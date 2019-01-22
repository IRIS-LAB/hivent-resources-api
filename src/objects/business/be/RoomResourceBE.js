import { ResourceBE } from './ResourceBE'
import { ResourceTypeEnum } from './ResourceTypeEnum'

export const MAX_SEATS_NUMBER = 1000

export class RoomResourceBE extends ResourceBE {
  constructor(json) {
    super(json.name, json.mail, ResourceTypeEnum.ROOM)
    this.nbSeatsAvailable = json.nbSeatsAvailable
    this.projectorAvailable = json.projectorAvailable || false
    this.chromeboxAvailable = json.chromeboxAvailable || false
  }
}
