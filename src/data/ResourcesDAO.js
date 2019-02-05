import { MongoClient, ObjectId } from 'mongodb'
import { db } from './db'
import {
  TechnicalException,
  EntityNotFoundBusinessException,
  ErrorDO
} from 'iris-common'

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
  try {
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
  } catch (e) {
    console.log('Error while finding resources', e)
    throw new TechnicalException(
      new ErrorDO('N/A', 'N/A', 'Error while finding resources')
    )
  }
}

export const getResource = async resourceId => {
  try {
    // Set up path
    let result = db.collection('resources').doc(resourceId)
    // Read document
    let doc = await result.get()
    if (doc.exists) {
      // Return data
      return doc.data()
    } else {
      throw new EntityNotFoundBusinessException(
        new ErrorDO(
          'id',
          'resource.id.notFound',
          `Resource (id: ${resourceId}) not found`
        )
      )
    }
  } catch (e) {
    if (!e instanceof EntityNotFoundBusinessException) {
      console.log('Error while getting resource', e)
      throw new TechnicalException(
        new ErrorDO('N/A', 'N/A', 'Error while getting resource')
      )
    } else {
      throw e
    }
  }
}

export const createResource = async resourceBE => {
  try {
    // Construct resource
    let resource = JSON.parse(JSON.stringify(resourceBE))
    // Set up path
    let doc = db.collection('resources').doc()
    resource.id = doc.id
    // Create document
    await doc.set(resource)
    // Return data
    return resource
  } catch (e) {
    console.log('Error while creating resource', e)
    throw new TechnicalException(
      new ErrorDO('N/A', 'N/A', 'Error while creating resource')
    )
  }
}

export const deleteResource = async resourceId => {
  try {
    // Set up path
    let doc = db.collection('resources').doc(resourceId)
    // Delete document
    let foundDoc = await doc.get()

    if (!foundDoc.exists) {
      throw new EntityNotFoundBusinessException(
        new ErrorDO(
          'id',
          'resource.id.notFound',
          `Resource (id: ${resourceId}) not found`
        )
      )
    } else {
      await doc.delete()
    }
  } catch (e) {
    if (!e instanceof EntityNotFoundBusinessException) {
      console.log('Error while getting resource', e)
      throw new TechnicalException(
        new ErrorDO('N/A', 'N/A', 'Error while getting resource')
      )
    } else {
      throw e
    }
  }
}
