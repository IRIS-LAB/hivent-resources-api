import * as resourcesDAO from '../data/ResourcesDAO'

export const findResources = async () => {
	return await resourcesDAO.findResources()
}

export const getResource = async resourceId => {
	return await resourcesDAO.getResource(resourceId)
}

export const createResource = async resource => {
	console.log('ResourceLBS : ' + resource)
	return await resourcesDAO.createResource(resource)
}

export const init = async ()  => {
	console.log('ResourcesLBS init ' )
	return await resourcesDAO.init()
}
