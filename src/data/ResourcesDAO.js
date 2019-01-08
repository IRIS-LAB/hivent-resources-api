import { MongoClient, ObjectId } from 'mongodb'
import {resourcesInit} from './init/resources-init'

const url = 'mongodb://localhost:27020/'
// const url = 'mongodb://10.178.150.3:27017/'

const connect = async () => {
	const connection = await MongoClient.connect(
		url,
		{ useNewUrlParser: true }
	)
	const db = connection.db('Resources')
	return db
}

export const findResources = async () => {
	const resourcesDB = await connect()
	const resources = await resourcesDB
		.collection('Resources')
		.find()
		.toArray()
	return resources
}

export const getResource = async resourceId => {
	const resourcesDB = await connect()
	const oid = new ObjectId(resourceId)
	const resource = await resourcesDB.collection('Resources').findOne({ _id: oid })
	return resource
}

export const createResource = async resourceBE => {
	const resourcesDB = await connect()
	const newResource = await resourcesDB
		.collection('Resources')
		.insertOne(resourceBE)
	return newResource.ops[0]
}

export const init = async () => {
	const resourcesDB = await connect()
	const newResources = await resourcesDB.collection('Resources').insertMany(resourcesInit)
	console.log(newResources.ops)
	return newResources.ops
}
