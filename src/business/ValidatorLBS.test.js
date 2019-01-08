import * as validatorLBS from './ValidatorLBS';
import { RoomResourceBE, MAX_SEATS_NUMBER } from '../objects/business/be/RoomResourceBE';
import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum';
import { BusinessException } from 'iris-elements';

describe('ValidatorLBS', () => {
	describe('checkRoomResource', () => {
		it('should throw no exception when roomresource is valid', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			let err = () => { validatorLBS.checkRoomResourceBE(resourceBE) };
			expect(err).not.toThrow();
			expect(resourceBE.name).toBe('name');
			expect(resourceBE.type).toBe(ResourceTypeEnum.ROOM);
			expect(resourceBE.mail).toBe('mail@systeme-u.com');
			expect(resourceBE.nbSeatsAvailable).toBe(12);
			expect(resourceBE.projectorAvailable).toBe(false);
			expect(resourceBE.chromeboxAvailable).toBe(false);
		})
	});
	describe('checkRoomResource', () => {
		it('should throw an exception when roomresource is invalid', () => {
			let resourceBE = new RoomResourceBE(null, null, null);
			let err = () => { validatorLBS.checkRoomResourceBE(resourceBE) };
			expect(err).toThrow(BusinessException);
		})
	});

	describe('checkName', () => {
		it('should return no error when name is valid', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkName(resourceBE)
			expect(err).toHaveLength(0)
			expect(resourceBE.name).toBe('name')
		})

		it('should return an error when the room name is empty', () => {
			let resourceBE = new RoomResourceBE('', 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkName(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('name');
			expect(err[0].errorCode).toBe('resource.name.required');
		});

		it('should return an error when the room name is null', () => {
			let resourceBE = new RoomResourceBE(null, 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkName(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('name');
			expect(err[0].errorCode).toBe('resource.name.required');
		});

		it('should return an error when the room name is undefined', () => {
			let resourceBE = new RoomResourceBE(undefined, 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkName(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('name');
			expect(err[0].errorCode).toBe('resource.name.required');
		});

		it('should return an error when the room name is too long (> 100)', () => {
			let resourceBE = new RoomResourceBE('A'.repeat(101), 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkName(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('name');
			expect(err[0].errorCode).toBe('resource.name.length');
		});
	});

	describe('checkType', () => {
		it('should return no error when type is valid', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkType(resourceBE)
			expect(err).toHaveLength(0)
			expect(resourceBE.type).toBe(ResourceTypeEnum.ROOM)
		})

		it('should return an error when the room type is empty', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.type = null;
			let err = validatorLBS.checkType(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('type');
			expect(err[0].errorCode).toBe('resource.type.required');
		});

		it('should return an error when the room type is unknown', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.type = 'BAD_TYPE';
			let err = validatorLBS.checkType(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('type');
			expect(err[0].errorCode).toBe('resource.type.invalid');
		});

		it('should return an error when the room type is not ROOM', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.type = ResourceTypeEnum.MATERIAL;
			let err = validatorLBS.checkType(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('type');
			expect(err[0].errorCode).toBe('resource.type.invalid');
		});
	});

	describe('checkMail', () => {

		it('should return no error when mail is valid', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkMail(resourceBE)
			expect(err).toHaveLength(0)
			expect(resourceBE.mail).toBe('mail@systeme-u.com')
		})

		it('should return an error when the room mail is empty', () => {
			let resourceBE = new RoomResourceBE('name', '', 12);
			let err = validatorLBS.checkMail(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('mail');
			expect(err[0].errorCode).toBe('resource.mail.required');
		});

		it('should return an error when the room mail is missing "@"', () => {
			let resourceBE = new RoomResourceBE('name', 'mail.com', 12);
			let err = validatorLBS.checkMail(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('mail');
			expect(err[0].errorCode).toBe('resource.mail.invalid');
		});

		it('should return an error when the room mail is missing "."', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@com', 12);
			let err = validatorLBS.checkMail(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('mail');
			expect(err[0].errorCode).toBe('resource.mail.invalid');
		});

		it('should return an error when the room mail domain is too short', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.f', 12);
			let err = validatorLBS.checkMail(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('mail');
			expect(err[0].errorCode).toBe('resource.mail.invalid');
		});
		
		it('should return an error when the room mail domain is too long', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.comfr', 12);
			let err = validatorLBS.checkMail(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('mail');
			expect(err[0].errorCode).toBe('resource.mail.invalid');
		});

		it('should return an error when the room mail domain has digits', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.f2', 12);
			let err = validatorLBS.checkMail(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('mail');
			expect(err[0].errorCode).toBe('resource.mail.invalid');
		});

		it('should return an error when the room mail begining is missing', () => {
			let resourceBE = new RoomResourceBE('name', '@systeme-u.comfr', 12);
			let err = validatorLBS.checkMail(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('mail');
			expect(err[0].errorCode).toBe('resource.mail.invalid');
		});
	});

	describe('checkNbSeatsAvailable', () => {
		
		it('should return no error when the number of seats of the room is valid', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			let err = validatorLBS.checkNbSeatsAvailable(resourceBE)
			expect(err).toHaveLength(0)
			expect(resourceBE.nbSeatsAvailable).toBe(12)
		})

		it('should return an error when the number of seats of the room is empty', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', '');
			let err = validatorLBS.checkNbSeatsAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('nbSeatsAvailable');
			expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.required');
		});

		it('should return an error when the number of seats of the room is 0', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 0);
			let err = validatorLBS.checkNbSeatsAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('nbSeatsAvailable');
			expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.invalid');
		});

		it('should return an error when the number of seats of the room is negative', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', -1);
			let err = validatorLBS.checkNbSeatsAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('nbSeatsAvailable');
			expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.invalid');
		});

		it('should return an error when the number of seats of the room is a float', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 1.5);
			let err = validatorLBS.checkNbSeatsAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('nbSeatsAvailable');
			expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.invalid');
		});

		it('should return an error when the number of seats of the room is too high', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', MAX_SEATS_NUMBER + 1);
			let err = validatorLBS.checkNbSeatsAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('nbSeatsAvailable');
			expect(err[0].errorCode).toBe('resource.nbSeatsAvailable.max');
		});
	});

	describe('checkProjectorAvailable', () => {
		it('should have a default false value', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			expect(resourceBE.projectorAvailable).toBe(false);
		});
		it('should not return an error when the room projector availability is true', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.projectorAvailable = true;
			expect(validatorLBS.checkProjectorAvailable(resourceBE)).toHaveLength(0);
		});
		it('should return an error when the room projector availability is a number', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.projectorAvailable = 42;
			let err = validatorLBS.checkProjectorAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('projectorAvailable');
			expect(err[0].errorCode).toBe('resource.projectorAvailable.invalid');
		});

		it('should return an error when the room projector availability is a string', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.projectorAvailable = 'toto';
			let err = validatorLBS.checkProjectorAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('projectorAvailable');
			expect(err[0].errorCode).toBe('resource.projectorAvailable.invalid');
		});
	});

	describe('checkChromeboxAvailable', () => {
		it('should have a default false value', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			expect(resourceBE.chromeboxAvailable).toBe(false);
		});
		it('should not return an error when the room chromebox availability is true', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.chromeboxAvailable = true;
			expect(validatorLBS.checkChromeboxAvailable(resourceBE)).toHaveLength(0);
		});
		it('should return an error when the room chromebox availability is a number', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.chromeboxAvailable = 42;
			let err = validatorLBS.checkChromeboxAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('chromeboxAvailable');
			expect(err[0].errorCode).toBe('resource.chromeboxAvailable.invalid');
		});

		it('should return an error when the room chromebox availability is a string', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.chromeboxAvailable = 'toto';
			let err = validatorLBS.checkChromeboxAvailable(resourceBE);
			expect(err).toHaveLength(1);
			expect(err[0].errorField).toBe('chromeboxAvailable');
			expect(err[0].errorCode).toBe('resource.chromeboxAvailable.invalid');
		});
	});
});
