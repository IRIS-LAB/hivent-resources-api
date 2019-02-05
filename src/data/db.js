// const Firestore = require('@google-cloud/firestore')
import Firestore from '@google-cloud/firestore'

export const db = new Firestore({
  projectId: 'hivent-resources-api',
  keyFilename: 'firestore/hivent-resources-api-a5c386e046b3.json'
})
