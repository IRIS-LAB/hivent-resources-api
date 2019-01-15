import {
  findResources as findResourcesDAO,
  createResource as createResourceDAO,
  getResource as getResourceDAO,
  init as initDAO
} from '../data/ResourcesDAO'
import { checkRoomResourceBE } from './ValidatorLBS'

export const findResources = async () => {
  return await findResourcesDAO()
}

export const getResource = async resourceId => {
  return await getResourceDAO(resourceId)
}

export const createResource = async resourceBE => {
  console.debug('createResource entry')
  checkRoomResourceBE(resourceBE)
  console.debug('RoomResourceBE checked')
  return await createResourceDAO(resourceBE)
}

export const init = async () => {
  return await initDAO()
}
