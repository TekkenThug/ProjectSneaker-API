import {
  saveFile,
} from '../../../app/libs/file.js';

jest.mock('fs');

describe('file', () => {
  describe('saveFile()', () => {
    test('should return new filename', async () => {
      const file = {
        name: 'test.png',
      };
      const expected = new RegExp(/.(png|jpg|jpeg)$/g);

      const result = saveFile(file, 'test');

      expect(result).toMatch(expected);
    });
  });
});
