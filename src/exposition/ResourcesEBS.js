import express from 'express'
import {
  findResources as findResourcesLBS,
  createResource as createResourceLBS,
  getResource as getResourceLBS,
  deleteResource as deleteResourceLBS
} from '../business/ResourcesLBS'
import { RoomResourceBE } from '../objects/business/be/RoomResourceBE'
import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum'
import { BusinessException, EntityNotFoundBusinessException } from 'iris-common'
import { ExceptionHandler } from 'winston'

const handleException = (error, res) => {
  if (error instanceof EntityNotFoundBusinessException) {
    res.status(404).send(error)
  } else if (error instanceof BusinessException) {
    res.status(400).send(error)
  } else {
    res.status(500).send(error)
  }
}

export const getRouter = () => {
  const resourcesRouter = express.Router()

  resourcesRouter.get('/', async (req, res) => {
    try {
      console.debug('GET Request received over /')
      //res.json({ success: true })
      res.send(await findResourcesLBS())
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

  resourcesRouter.delete('/:resourceId', async (req, res) => {
    try {
      res.send(await deleteResourceLBS(req.params.resourceId))
    } catch (error) {
      handleException(error, res)
    }
  })

  /**
   * POST /resource
   * Resource creation
   *
   */
  resourcesRouter.post('/', async (req, res) => {
    try {
      console.debug('POST Request received /: ' + JSON.stringify(req.body))

      if (!req.body.type) {
        // NO RESOURCE TYPE
        throw Error('Le type de la ressource doit être renseigné')
      } else if (req.body.type == ResourceTypeEnum.ROOM) {
        // ROOM RESOURCE
        const roomResourceBE = new RoomResourceBE(req.body)
        console.debug(roomResourceBE)
        res.send(await createResourceLBS(roomResourceBE))
      } else {
        // RESOURCE TYPE UNKNOWN
        throw Error(`Le type de la ressource n'est pas connu`)
      }
    } catch (error) {
      handleException(error, res)
    }
  })

  return resourcesRouter
}
