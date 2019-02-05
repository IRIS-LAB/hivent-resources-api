import {
  findResources as findResourcesDAO,
  createResource as createResourceDAO,
  deleteResource as deleteResourceDAO,
  getResource as getResourceDAO
} from '../data/ResourcesDAO'
import { checkRoomResourceBE } from './ValidatorLBS'

export const findResources = async () => {
  return await findResourcesDAO()
}

export const getResource = async resourceId => {
  return await getResourceDAO(resourceId)
}

export const deleteResource = async resourceId => {
  return await deleteResourceDAO(resourceId)
}

export const createResource = async resourceBE => {
  checkRoomResourceBE(resourceBE)
  return await createResourceDAO(resourceBE)
}
