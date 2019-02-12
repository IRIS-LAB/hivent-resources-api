import {
  findResources as findResourcesDAO,
  createResource as createResourceDAO,
  updateResource as updateResourceDAO,
  deleteResource as deleteResourceDAO,
  getResource as getResourceDAO
} from '../data/ResourcesDAO'
import { buildResourceFromType, checkResourceBE, checkCapacityFilter } from './ValidatorLBS'
import { EntityNotFoundBusinessException, ErrorDO } from 'iris-common'

export const findResources = async (filters) => {
  if (filters && filters.capacity) {
    filters.capacity = checkCapacityFilter(filters.capacity)
  }
  return await findResourcesDAO(filters)
}

export const getResource = async resourceId => {
  const result = await getResourceDAO(resourceId)
  if (!result) {
    throw new EntityNotFoundBusinessException(
      new ErrorDO(
        'id',
        'resource.id.notFound',
        `Resource (id: ${resourceId}) not found`
      )
    )
  } else {
    return result
  }
}

export const createResource = async data => {
  // validators
  let resourceBE = buildResourceFromType(data)
  checkResourceBE(resourceBE)
  // creation
  return await createResourceDAO(resourceBE)
}

export const updateResource = async (resourceId, data) => {
  // validators
  let resourceBE = buildResourceFromType(data)
  resourceBE.id = resourceId
  checkResourceBE(resourceBE)
  // check if resource exists
  await getResource(resourceId)
  // update
  return await updateResourceDAO(resourceBE)
}

export const deleteResource = async resourceId => {
  // check if resource exists
  await getResource(resourceId)
  // deletion
  await deleteResourceDAO(resourceId)
}