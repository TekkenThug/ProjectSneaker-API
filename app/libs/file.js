import * as path from 'path';
import fs from 'fs';
import { generateUniqueName } from '../utils.js';

/**
 * Save file in public directory
 * and return path to the picture
 * @param {object} file - input file
 * @param {string} pathToFolder - path to folder for save
 * @returns {string} - name of saved file
 */
export const saveFile = (file, ...pathToFolder) => {
  const fileName = `${generateUniqueName()}${path.extname(file.name)}`;
  const filePath = path.resolve('public', ...pathToFolder, fileName);

  fs.renameSync(file.tempFilePath, filePath);

  return fileName;
};
