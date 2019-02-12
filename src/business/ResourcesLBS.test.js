import * as ResourcesDAO from '../data/ResourcesDAO'
import * as ResourcesLBS from './ResourcesLBS'
import { RoomResourceBE } from '../objects/business/be/RoomResourceBE'
import * as ValidatorLBS from './ValidatorLBS'

describe('ResourcesLBS', () => {
  let resourceBE

  beforeAll(() => {
    resourceBE = new RoomResourceBE({
      name: 'name',
      mail: 'mail@systeme-u.com',
      nbSeatsAvailable: 12
    })
  })

  describe('createResource', () => {
    ResourcesDAO.createResource = jest.fn(() => resourceBE)
    ValidatorLBS.checkResourceBE = jest.fn()

    it('should call the createResourceDAO function', () => {
      let result = ResourcesLBS.createResource(resourceBE)
      expect(ResourcesDAO.createResource).toHaveBeenCalledTimes(1)
      expect(ValidatorLBS.checkResourceBE).toHaveBeenCalledTimes(1)
    })
  })
})
