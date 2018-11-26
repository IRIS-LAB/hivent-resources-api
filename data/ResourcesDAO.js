import {MongoClient, ObjectId} from 'mongodb'

const url = 'mongodb://localhost:27020/'

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
  let resources = await resourcesDB.collection('Resources').find().toArray()
  // resourcesDB.connection.close()
  return resources
}

export const getResource = async resourceId => {
  let resourcesDB = await connect()
  let oid = new ObjectId(resourceId)
  let resource = await resourcesDB.collection('Resources').findOne({ _id: oid })
  //ResourcesDB.connection.close()
  return resource
}

export const createResource = async resource => {
  let resourcesDB = await connect()
  let newResource = await resourcesDB.collection('Resources').insertOne(resource)
  //resourcesDB.connection.close()
  return newResource.ops[0]
}
