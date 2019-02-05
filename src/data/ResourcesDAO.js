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
  const resourcesDB = await connect()
  const resources = await resourcesDB
    .collection('Resources')
    .find()
    .toArray()
  return resources
}

export const getResource = async resourceId => {
  let result = db.collection('resources').doc(resourceId)
  let resultGet = await result.get()
  return resultGet.data()
}

// export const createResource = async resourceBE => {
//   const resourcesDB = await connect()
//   const newResource = await resourcesDB
//     .collection('Resources')
//     .insertOne(resourceBE)
//   return newResource.ops[0]
// }
export const createResource = async resourceBE => {
  //console.log('createResource db ', db)
  let doc = db.collection('resources').doc()
  //console.log('createResource doc ', doc)
  let r = JSON.parse(JSON.stringify(resourceBE))
  console.log(r)
  await doc.set(r)
  return doc.id
}

export const deleteResource = async resourceId => {
  try {
    let doc = db.collection('resources').doc(resourceId)
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
