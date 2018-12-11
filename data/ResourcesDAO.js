import { MongoClient, ObjectId } from 'mongodb'
import {resourcesInit} from './init/resources-init'

const url = 'mongodb://localhost:27020/'
// const url = 'mongodb://10.178.150.3:27017/'

const connect = async () => {
	let connection = await MongoClient.connect(
		url,
		{ useNewUrlParser: true }
	)
	let db = connection.db('Resources')
	return db
}

export const findResources = async () => {
	let resourcesDB = await connect()
	let resources = await resourcesDB
		.collection('Resources')
		.find()
		.toArray()
	return resources
}

export const getResource = async resourceId => {
	let resourcesDB = await connect()
	let oid = new ObjectId(resourceId)
	let resource = await resourcesDB.collection('Resources').findOne({ _id: oid })
	return resource
}

export const createResource = async resource => {
	let resourcesDB = await connect()
	let newResource = await resourcesDB
		.collection('Resources')
		.insertOne(resource)
	return newResource.ops[0]
}

export const init = async () => {
	console.log('ResourcesDAO : init')
	let resourcesDB = await connect()
	let newResources = await resourcesDB.collection('Resources').insertMany(resourcesInit)
	console.log(newResources.ops)
	return newResources.ops
}
