import express from 'express'
import * as resourcesLBS from '../business/ResourcesLBS'
import { ResourceBE } from '../objects/business/be/ResourceBE'
import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum'
import * as mappers from './mappers/Mappers'
// Import *again* WINSTON => Ugly, what is the good way to do this?
import * as winston from '../config/winston'
import { debug } from 'util'

const logger = winston.logger

export const getRouter = () => {
	let resourcesRouter = express.Router()

	resourcesRouter.get('/', async (req, res) => {
		try {
			logger.info('GET Request received over /')
			//res.json({ success: true })
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
		console.log(req)
		try {
			logger.info('POST Request received over /: ' + JSON.stringify(req.body))
			if (!req.body.type) {
				throw Error('Le type de la ressource doit être renseigné')
			} else if (req.body.type == ResourceTypeEnum.ROOM) {

				let roomResourceBE = mappers.jsonToRoomResourceBE(req.body)
				logger.debug(roomResourceBE)
				
				res.send(await resourcesLBS.createResource(roomResourceBE))
			}
		} catch (error) {
			console.log('An error occured', error)
			res.status(500).send('An error occured')
		}
	})

	resourcesRouter.post('/init', async (req,res) => {
		try {
			logger.debug('ResourcesEBS - /init')
			let resources = await resourcesLBS.init()
			res.send(resources)
		} catch (error) {
			console.log('An error occured', error)
			res.status(500).send('An error occured')		
		}
	})

	return resourcesRouter
}
