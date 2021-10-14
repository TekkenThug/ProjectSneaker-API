import {
  isNewUser
} from './validation.js';

describe('isNewUser()', () => {
  test('should return true if all user fields is valid', async () => {
    const req = {
      body: {
        email: 'vadim@gmail.com',
        nickname: 'tekkenthug',
        password: 'Biboran228',
        repeatPassword: 'Biboran228'
      }
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
        repeatPassword: 'Biboran228'
      }
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
        repeatPassword: 'Biboran228'
      }
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
        repeatPassword: 'Biboran228'
      }
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
        repeatPassword: 'Biboran222'
      }
    };
    const expected = 'Password is not equal';

    const result = await isNewUser(req);

    expect(result).toEqual(expected);
  });
})