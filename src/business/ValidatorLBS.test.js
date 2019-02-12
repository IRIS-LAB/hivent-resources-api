import * as validatorLBS from './ValidatorLBS'
import {
  RoomResourceBE,
  MAX_SEATS_NUMBER
} from '../objects/business/be/RoomResourceBE'
import { MAX_NAME_LENGTH } from '../objects/business/be/ResourceBE'
import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum'
import { BusinessException } from 'iris-common'

describe('ValidatorLBS', () => {
  describe('checkRoomResource', () => {
    it('should throw no exception when roomresource is valid', () => {
      let resourceBE = new RoomResourceBE({
        name: 'name',
        mail: 'mail@systeme-u.com',
        nbSeatsAvailable: 12
      })
      let err = () => {
        validatorLBS.checkRoomResourceBE(resourceBE)
      }
      expect(err).not.toThrow()
      expect(resourceBE.name).toBe('nerame')
      expect(resourceBE.type).toBe(ResourceTypeEnum.ROOM)
      expect(resourceBE.mail).toBe('mail@systeme-u.com')
      expect(resourceBE.nbSeatsAvailable).toBe(12)
      expect(resourceBE.projectorAvailable).toBe(false)
      expect(resourceBE.chromeboxAvailable).toBe(false)
    })

    it('should throw an exception when roomresource is invalid', () => {
      let resourceBE = new RoomResourceBE({
        name: null,
        mail: null,
        nbSeatsAvailable: null
      })
      let err = () => {
        validatorLBS.checkRoomResourceBE(resourceBE)
      }
      expect(err).toThrow(BusinessException)
    })
  })

  describe('checkName', () => {
    let resourceBE

    beforeAll(() => {
      resourceBE = new RoomResourceBE({
        name: 'name',
        mail: 'mail@systeme-u.com',
        nbSeatsAvailable: 12
      })
    })

    it('should return no error when name is valid', () => {
      let err = validatorLBS.checkName(resourceBE)
      expect(err).toHaveLength(0)
      expect(resourceBE.name).toBe('name')
    })

    it('should return an error when the room name is empty', () => {
      resourceBE.name = ''
      let err = validatorLBS.checkName(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('name')
      expect(err[0].errorCode).toBe('resource.name.required')
    })

    it('should return an error when the room name is null', () => {
      resourceBE.name = null
      let err = validatorLBS.checkName(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('name')
      expect(err[0].errorCode).toBe('resource.name.required')
    })

    it('should return an error when the room name is undefined', () => {
      resourceBE.name = undefined
      let err = validatorLBS.checkName(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('name')
      expect(err[0].errorCode).toBe('resource.name.required')
    })

    it('should return an error when the room name is too long', () => {
      resourceBE.name = 'A'.repeat(MAX_NAME_LENGTH + 1)
      let err = validatorLBS.checkName(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('name')
      expect(err[0].errorCode).toBe('resource.name.length')
    })
  })

  describe('checkType', () => {
    let resourceBE

    beforeAll(() => {
      resourceBE = new RoomResourceBE({
        name: 'name',
        mail: 'mail@systeme-u.com',
        nbSeatsAvailable: 12
      })
    })

    it('should return no error when type is valid', () => {
      let err = validatorLBS.checkType(resourceBE)
      expect(err).toHaveLength(0)
      expect(resourceBE.type).toBe(ResourceTypeEnum.ROOM)
    })

    it('should return an error when the room type is empty', () => {
      resourceBE.type = null
      let err = validatorLBS.checkType(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('type')
      expect(err[0].errorCode).toBe('resource.type.required')
    })

    it('should return an error when the room type is unknown', () => {
      resourceBE.type = 'BAD_TYPE'
      let err = validatorLBS.checkType(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('type')
      expect(err[0].errorCode).toBe('resource.type.invalid')
    })

    it('should return an error when the room type is not ROOM', () => {
      resourceBE.type = ResourceTypeEnum.MATERIAL
      let err = validatorLBS.checkType(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('type')
      expect(err[0].errorCode).toBe('resource.type.invalid')
    })
  })

  describe('checkMail', () => {
    let resourceBE

    beforeAll(() => {
      resourceBE = new RoomResourceBE({
        name: 'name',
        mail: 'mail@systeme-u.com',
        nbSeatsAvailable: 12
      })
    })

    it('should return no error when mail is valid', () => {
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(0)
      expect(resourceBE.mail).toBe('mail@systeme-u.com')
    })

    it('should return an error when the room mail is empty', () => {
      resourceBE.mail = ''
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('mail')
      expect(err[0].errorCode).toBe('resource.mail.required')
    })

    it('should return an error when the room mail is missing "@"', () => {
      resourceBE.mail = 'mail.com'
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('mail')
      expect(err[0].errorCode).toBe('resource.mail.invalid')
    })

    it('should return an error when the room mail is missing "."', () => {
      resourceBE.mail = 'mail@com'
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('mail')
      expect(err[0].errorCode).toBe('resource.mail.invalid')
    })

    it('should return an error when the room mail domain is too short', () => {
      resourceBE.mail = 'mail@systeme-u.f'
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('mail')
      expect(err[0].errorCode).toBe('resource.mail.invalid')
    })

    it('should return an error when the room mail domain is too long', () => {
      resourceBE.mail = 'mail@systeme-u.comfr'
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('mail')
      expect(err[0].errorCode).toBe('resource.mail.invalid')
    })

    it('should return an error when the room mail domain has digits', () => {
      resourceBE.mail = 'mail@systeme-u.f2'
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('mail')
      expect(err[0].errorCode).toBe('resource.mail.invalid')
    })

    it('should return an error when the room mail begining is missing', () => {
      resourceBE.mail = '@systeme-u.comfr'
      let err = validatorLBS.checkMail(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('mail')
      expect(err[0].errorCode).toBe('resource.mail.invalid')
    })
  })

  describe('checkNbSeatsAvailable', () => {
    let resourceBE

    beforeAll(() => {
      resourceBE = new RoomResourceBE({
        name: 'name',
        mail: 'mail@systeme-u.com',
        nbSeatsAvailable: 12
      })
    })

    it('should return no error when the number of seats of the room is valid', () => {
      let err = validatorLBS.checkNbSeatsAvailable(resourceBE)
      expect(err).toHaveLength(0)
      expect(resourceBE.nbSeatsAvailable).toBe(12)
    })

    it('should return an error when the number of seats of the room is empty', () => {
      resourceBE.nbSeatsAvailable = ''
      let err = validatorLBS.checkNbSeatsAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('nbSeatsAvailable')
      expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.required')
    })

    it('should return an error when the number of seats of the room is 0', () => {
      resourceBE.nbSeatsAvailable = 0
      let err = validatorLBS.checkNbSeatsAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('nbSeatsAvailable')
      expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.invalid')
    })

    it('should return an error when the number of seats of the room is negative', () => {
      resourceBE.nbSeatsAvailable = -1
      let err = validatorLBS.checkNbSeatsAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('nbSeatsAvailable')
      expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.invalid')
    })

    it('should return an error when the number of seats of the room is a float', () => {
      resourceBE.nbSeatsAvailable = 1.2
      let err = validatorLBS.checkNbSeatsAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('nbSeatsAvailable')
      expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.invalid')
    })

    it('should return an error when the number of seats of the room is too high', () => {
      resourceBE.nbSeatsAvailable = MAX_SEATS_NUMBER + 1
      let err = validatorLBS.checkNbSeatsAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('nbSeatsAvailable')
      expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.max')
    })
  })

  describe('checkProjectorAvailable', () => {
    let resourceBE

    beforeAll(() => {
      resourceBE = new RoomResourceBE({
        name: 'name',
        mail: 'mail@systeme-u.com',
        nbSeatsAvailable: 12
      })
    })

    it('should have a default false value', () => {
      expect(resourceBE.projectorAvailable).toBe(false)
    })
    it('should not return an error when the room projector availability is true', () => {
      resourceBE.projectorAvailable = true
      expect(validatorLBS.checkProjectorAvailable(resourceBE)).toHaveLength(0)
    })
    it('should return an error when the room projector availability is a number', () => {
      resourceBE.projectorAvailable = 42
      let err = validatorLBS.checkProjectorAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('projectorAvailable')
      expect(err[0].errorCode).toBe('resource.projectorAvailable.invalid')
    })

    it('should return an error when the room projector availability is a string', () => {
      resourceBE.projectorAvailable = 'toto'
      let err = validatorLBS.checkProjectorAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('projectorAvailable')
      expect(err[0].errorCode).toBe('resource.projectorAvailable.invalid')
    })
  })

  describe('checkChromeboxAvailable', () => {
    let resourceBE

    beforeAll(() => {
      resourceBE = new RoomResourceBE({
        name: 'name',
        mail: 'mail@systeme-u.com',
        nbSeatsAvailable: 12
      })
    })

    it('should have a default false value', () => {
      expect(resourceBE.chromeboxAvailable).toBe(false)
    })
    it('should not return an error when the room chromebox availability is true', () => {
      resourceBE.chromeboxAvailable = true
      expect(validatorLBS.checkChromeboxAvailable(resourceBE)).toHaveLength(0)
    })
    it('should return an error when the room chromebox availability is a number', () => {
      resourceBE.chromeboxAvailable = 42
      let err = validatorLBS.checkChromeboxAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('chromeboxAvailable')
      expect(err[0].errorCode).toBe('resource.chromeboxAvailable.invalid')
    })

    it('should return an error when the room chromebox availability is a string', () => {
      resourceBE.chromeboxAvailable = 'toto'
      let err = validatorLBS.checkChromeboxAvailable(resourceBE)
      expect(err).toHaveLength(1)
      expect(err[0].errorField).toBe('chromeboxAvailable')
      expect(err[0].errorCode).toBe('resource.chromeboxAvailable.invalid')
    })
  })
})
