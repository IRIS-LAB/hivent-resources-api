import { MongoClient, ObjectId } from 'mongodb'
import { resourcesInit } from './init/resources-init'
import { db } from './db'

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
  // Set up path
  let result = db.collection('resources')
  // Find documents
  let querySnapshot = await result.get()
  // Construct result
  let results = []
  querySnapshot.forEach(doc => {
    results.push(doc.data())
  })
  // Return data
  return results
}

export const getResource = async resourceId => {
  // Set up path
  let result = db.collection('resources').doc(resourceId)
  // Read document
  let doc = await result.get()
  // Return data
  return doc.data()
}

export const createResource = async resourceBE => {
  // Construct resource
  let resource = JSON.parse(JSON.stringify(resourceBE))
  // Set up path
  let doc = db.collection('resources').doc()
  resource.id = doc.id
  // Create document
  await doc.set(resource)
  // Return data
  return resource
}

export const deleteResource = async resourceId => {
  try {
    // Set up path
    let doc = db.collection('resources').doc(resourceId)
    // Delete document
    await doc.delete()
  } catch (error) {
    console.log('erreur lors de la suppression', error)
  }
}

export const init = async () => {
  const resourcesDB = await connect()
  const newResources = await resourcesDB
    .collection('Resources')
    .insertMany(resourcesInit)
  console.log(newResources.ops)
  return newResources.ops
}
