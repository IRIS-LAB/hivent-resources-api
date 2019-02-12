import { db } from './db'

export const findResources = async (filters) => {
  // Set up path
  let resourcesRef = db.collection('resources')
  if (filters) {
    resourcesRef = !filters.name ? resourcesRef : resourcesRef.where("name", "==", filters.name)
    resourcesRef = !filters.type ? resourcesRef : resourcesRef.where("type", "==", filters.type)
    resourcesRef = !filters.minCapacity ? resourcesRef : resourcesRef.where("nbSeatsAvailable", ">=", filters.minCapacity)
  }
  console.log(resourcesRef)
  // Find documents
  let querySnapshot = await resourcesRef.get()
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

export const updateResource = async (resourceBE) => {
  // Construct resource
  let resource = JSON.parse(JSON.stringify(resourceBE))
  // Set up path
  let doc = db.collection('resources').doc(resourceBE.id)
  // Update document
  await doc.set(resource)
  // Return data
  return resource
}

export const deleteResource = async resourceId => {
  // Set up path
  let doc = db.collection('resources').doc(resourceId)
  // Delete document
  await doc.delete()
}
