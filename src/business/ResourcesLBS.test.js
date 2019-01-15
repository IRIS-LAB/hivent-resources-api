import { createResource as createResourceDAO } from '../data/ResourcesDAO'
import * as ResourcesLBS from './ResourcesLBS'
import { checkRoomResourceBE } from './ValidatorLBS'

const mathjs = require('mathjs')
describe('ResourcesLBS', () => {
  describe('createResource', () => {
    it('should call the createResourceDAO function', () => {
      jest.mock('createResourceDAO', () => jest.fn('responseCreate'))
      ResourcesLBS.createResource()
      expect(createResourceDAO.mock.calls.length).toBe(1)
    })
  })
})
