import express from 'express'
import * as resourcesLBS from '../business/ResourcesLBS'

export const  getRouter = () => {
  let resourcesRouter = express.Router()

  resourcesRouter.get('/', async (req, res) => {
    try {
      res.send(await resourcesLBS.findResources())
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  resourcesRouter.get('/:resourceId', async (req, res) => {
    try {
      res.send(await resourcesLBS.getResource(req.params.resourceId))
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  resourcesRouter.post('/', async (req, res) => {
    try {
      res.send(await resourcesLBS.createResource(req.body))
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  return resourcesRouter
}

