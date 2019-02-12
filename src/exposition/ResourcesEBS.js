import express from 'express'
import {
  findResources as findResourcesLBS,
  createResource as createResourceLBS,
  getResource as getResourceLBS,
  updateResource as updateResourceLBS,
  deleteResource as deleteResourceLBS
} from '../business/ResourcesLBS'
import { BusinessException, EntityNotFoundBusinessException, TechnicalException, ErrorDO } from 'iris-common'
import { ExceptionHandler } from 'winston'

const handleException = (error, res) => {
  if (error instanceof EntityNotFoundBusinessException) {
    res.status(404).send(error)
  } else if (error instanceof BusinessException) {
    res.status(400).send(error)
  } else if (error instanceof TechnicalException) {
    res.status(500).send(error)
  } else {
    console.log('A technical error occured', error)
    res.status(500).send(new ErrorDO('', '500', 'A technical error occured'))
  }
}

export const getRouter = () => {
  const resourcesRouter = express.Router()

  resourcesRouter.get('/', async (req, res) => {
    try {
      console.debug('GET Request received over /')
      // filtres possibles : name, type, minCapacity
      res.send(await findResourcesLBS(req.query))
    } catch (error) {
      handleException(error, res)
    }
  })

  resourcesRouter.get('/:resourceId', async (req, res) => {
    try {
      res.send(await getResourceLBS(req.params.resourceId))
    } catch (error) {
      handleException(error, res)
    }
  })

  /**
   * POST /resource
   * Resource creation
   */
  resourcesRouter.post('/', async (req, res) => {
    try {
      res.send(await createResourceLBS(req.body))
    } catch (error) {
      handleException(error, res)
    }
  })

  /**
   * PUT /resource
   * Resource update
   */
  resourcesRouter.put('/:resourceId', async (req, res) => {
    try {
      console.log('EBS', req.body)
      res.send(await updateResourceLBS(req.params.resourceId, req.body ))
    } catch (error) {
      handleException(error, res)
    }
  })

  /**
   * DELETE /resource
   * Resource deletion
   */
  resourcesRouter.delete('/:resourceId', async (req, res) => {
    try {
      res.send(await deleteResourceLBS(req.params.resourceId))
    } catch (error) {
      handleException(error, res)
    }
  })

  return resourcesRouter
}
