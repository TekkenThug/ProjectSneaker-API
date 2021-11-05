import {
  isNewUser,
  isPair,
} from '../../../app/middlewares/validation.js';

describe('validation', () => {
  describe('isNewUser()', () => {
    test('should return true if all user fields is valid', async () => {
      const req = {
        body: {
          email: 'vadim@gmail.com',
          nickname: 'tekkenthug',
          password: 'Biboran228',
          repeatPassword: 'Biboran228',
        },
      };
      const expected = true;

      const result = await isNewUser(req);

      expect(result).toEqual(expected);
    });

    test('should return error message if email field is broken', async () => {
      const req = {
        body: {
          email: 'vadim@',
          nickname: 'tekkenthug',
          password: 'Biboran228',
          repeatPassword: 'Biboran228',
        },
      };
      const expected = 'Email is not valid';

      const result = await isNewUser(req);

      expect(result).toEqual(expected);
    });

    test('should return error message if nickname field is empty', async () => {
      const req = {
        body: {
          email: 'vadim@gmail.com',
          nickname: '',
          password: 'Biboran228',
          repeatPassword: 'Biboran228',
        },
      };
      const expected = 'Nickname is not exist';

      const result = await isNewUser(req);

      expect(result).toEqual(expected);
    });

    test('should return error message if password field is not matches for regex', async () => {
      const req = {
        body: {
          email: 'vadim@gmail.com',
          nickname: 'tekkenthug',
          password: 'Biboran',
          repeatPassword: 'Biboran228',
        },
      };
      const expected = 'Password is not regex';

      const result = await isNewUser(req);

      expect(result).toEqual(expected);
    });

    test('should return error message if confirm password is not equal', async () => {
      const req = {
        body: {
          email: 'vadim@gmail.com',
          nickname: 'tekkenthug',
          password: 'Biboran228',
          repeatPassword: 'Biboran222',
        },
      };
      const expected = 'Password is not equal';

      const result = await isNewUser(req);

      expect(result).toEqual(expected);
    });
  });

  describe('isPair()', () => {
    test('should return true if all pair fields is valid', async () => {
      const data = {
        body: {
          model: 'Adidas',
          colorway: 'Red Hat',
          vendorCode: 'RX560',
          price: 12000,
          releaseDate: '2001-07-15',
        },
      };
      const expected = true;

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });

    test('should return error message if model field is empty', async () => {
      const data = {
        body: {
          model: '',
          colorway: 'Red Hat',
          vendorCode: 'RX560',
          price: 12000,
          releaseDate: '2001-07-15',
        },
      };
      const expected = 'Model is empty';

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });

    test('should return error message if colorway field is empty', async () => {
      const data = {
        body: {
          model: 'Adidas',
          colorway: '',
          vendorCode: 'RX560',
          price: 12000,
          releaseDate: '2001-07-15',
        },
      };
      const expected = 'Colorway is empty';

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });

    test('should return error message if vendor code field is empty', async () => {
      const data = {
        body: {
          model: 'Adidas',
          colorway: 'Red Hat',
          vendorCode: '',
          price: 12000,
          releaseDate: '2001-07-15',
        },
      };
      const expected = 'Vendor code is empty';

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });

    test('should return error message if price field is empty', async () => {
      const data = {
        body: {
          model: 'Adidas',
          colorway: 'Red Hat',
          vendorCode: 'RX560',
          price: '',
          releaseDate: '2001-07-15',
        },
      };
      const expected = 'Price is empty';

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });

    test('should return error message if price field is not numeric', async () => {
      const data = {
        body: {
          model: 'Adidas',
          colorway: 'Red Hat',
          vendorCode: 'RX560',
          price: 'hello',
          releaseDate: '2001-07-15',
        },
      };
      const expected = 'Price is not numeric';

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });

    test('should return error message if date field is empty', async () => {
      const data = {
        body: {
          model: 'Adidas',
          colorway: 'Red Hat',
          vendorCode: 'RX560',
          price: 12000,
          releaseDate: '',
        },
      };
      const expected = 'Date is empty';

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });

    test('should return error message if date field is not correct date format', async () => {
      const data = {
        body: {
          model: 'Adidas',
          colorway: 'Red Hat',
          vendorCode: 'RX560',
          price: 12000,
          releaseDate: '09-08-2001',
        },
      };
      const expected = 'Date field is not date format';

      const result = await isPair(data);

      expect(result).toEqual(expected);
    });
  });
});
