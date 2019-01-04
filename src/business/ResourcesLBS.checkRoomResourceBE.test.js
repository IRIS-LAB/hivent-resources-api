import * as resourcesLBS from './ResourcesLBS';
import { RoomResourceBE } from '../objects/business/be/RoomResourceBE';
import { ResourceTypeEnum } from '../objects/business/be/ResourceTypeEnum';

describe('checkRoomResourceBE', () => {
	it('Should not return errors when the room is valid', () => {
		let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
		expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(0);
	});
	it('Should return an array of errors when the room has several errors', () => {
		let resourceBE = new RoomResourceBE(null, null, null);
		expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(3);
	});

	describe('name', () => {
		it('Should return an error when the room name is empty', () => {
			let resourceBE = new RoomResourceBE('', 'mail@systeme-u.com', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('name');
			expect(err.errorCode).toBe('resource.name.required');
		});

		it('Should return an error when the room name is null', () => {
			let resourceBE = new RoomResourceBE(null, 'mail@systeme-u.com', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('name');
			expect(err.errorCode).toBe('resource.name.required');
		});

		it('Should return an error when the room name is undefined', () => {
			let resourceBE = new RoomResourceBE(undefined, 'mail@systeme-u.com', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('name');
			expect(err.errorCode).toBe('resource.name.required');
		});
		it('should return an error when the room name is too long (> 100)', () => {
			let resourceBE = new RoomResourceBE('A'.repeat(101), 'mail@systeme-u.com', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('name');
			expect(err.errorCode).toBe('resource.name.length');
		});
	});

	describe('type', () => {
		it('Should return an error when the room type is empty', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.type = null;
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('type');
			expect(err.errorCode).toBe('resource.type.required');
		});

		it('should return an error when the room type is unknown', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.type = 'BAD_TYPE';
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('type');
			expect(err.errorCode).toBe('resource.type.invalid');
		});

		it('should return an error when the room type is not ROOM', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.type = ResourceTypeEnum.MATERIAL;
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('type');
			expect(err.errorCode).toBe('resource.type.invalid');
		});
	});

	describe('mail', () => {
		it('Should return an error when the room mail is empty', () => {
			let resourceBE = new RoomResourceBE('name', '', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('mail');
			expect(err.errorCode).toBe('resource.mail.required');
		});

		it('should return an error when the room mail is missing "@"', () => {
			let resourceBE = new RoomResourceBE('name', 'mail.com', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('mail');
			expect(err.errorCode).toBe('resource.mail.invalid');
		});

		it('should return an error when the room mail is missing "."', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@com', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('mail');
			expect(err.errorCode).toBe('resource.mail.invalid');
		});

		it('should return an error when the room mail domain is too short', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.f', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('mail');
			expect(err.errorCode).toBe('resource.mail.invalid');
		});
		it('should return an error when the room mail domain is too long', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.comfr', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('mail');
			expect(err.errorCode).toBe('resource.mail.invalid');
		});
		it('should return an error when the room mail domain has digits', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.f2', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('mail');
			expect(err.errorCode).toBe('resource.mail.invalid');
		});
		it('should return an error when the room mail begining is missing', () => {
			let resourceBE = new RoomResourceBE('name', '@systeme-u.comfr', 12);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('mail');
			expect(err.errorCode).toBe('resource.mail.invalid');
		});
	});

	describe('nbSeatsAvailable', () => {
		it('Should return an error when the number of seats of the room is empty', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', '');
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('nbSeatsAvailable');
			expect(err.errorCode).toBe('resource.nbSeatsAvailable.required');
		});

		it('should return an error when the number of seats of the room is 0', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 0);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('nbSeatsAvailable');
			expect(err.errorCode).toBe('resource.nbSeatsAvailable.invalid');
		});

		it('should return an error when the number of seats of the room is negative', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', -1);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('nbSeatsAvailable');
			expect(err.errorCode).toBe('resource.nbSeatsAvailable.invalid');
		});

		it('should return an error when the number of seats of the room is a float', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 1.5);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('nbSeatsAvailable');
			expect(err.errorCode).toBe('resource.nbSeatsAvailable.invalid');
		});

		it('should return an error when the number of seats of the room is too high', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', resourcesLBS.MAX_SEATS_NUMBER + 1);
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('nbSeatsAvailable');
			expect(err.errorCode).toBe('resource.nbSeatsAvailable.max');
		});
	});

	describe('projectorAvailable', () => {
		it('Should have a default false value', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			expect(resourceBE.projectorAvailable).toBe(false);
		});
		it('Should not return an error when the room projector availability is true', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.projectorAvailable = true;
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(0);
		});
		it('Should return an error when the room projector availability is a number', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.projectorAvailable = 42;
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('projectorAvailable');
			expect(err.errorCode).toBe('resource.projectorAvailable.invalid');
		});

		it('Should return an error when the room projector availability is a string', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.projectorAvailable = 'toto';
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('projectorAvailable');
			expect(err.errorCode).toBe('resource.projectorAvailable.invalid');
		});
	});

	describe('chromeboxAvailable', () => {
		it('Should have a default false value', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			expect(resourceBE.chromeboxAvailable).toBe(false);
		});
		it('Should not return an error when the room chromebox availability is true', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.chromeboxAvailable = true;
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(0);
		});
		it('Should return an error when the room chromebox availability is a number', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.chromeboxAvailable = 42;
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('chromeboxAvailable');
			expect(err.errorCode).toBe('resource.chromeboxAvailable.invalid');
		});

		it('Should return an error when the room chromebox availability is a string', () => {
			let resourceBE = new RoomResourceBE('name', 'mail@systeme-u.com', 12);
			resourceBE.chromeboxAvailable = 'toto';
			expect(resourcesLBS.checkRoomResourceBE(resourceBE)).toHaveLength(1);
			let err = resourcesLBS.checkRoomResourceBE(resourceBE)[0];
			expect(err.errorField).toBe('chromeboxAvailable');
			expect(err.errorCode).toBe('resource.chromeboxAvailable.invalid');
		});
	});
});
