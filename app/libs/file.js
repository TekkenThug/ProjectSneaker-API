import { v4 as uuid } from 'uuid';
import * as path from 'path';

export const saveFile = (file) => {
  const fileName = `${uuid()}${path.extname(file.name)}`;
  const filePath = path.resolve('public', fileName);

  file.mv(filePath);

  return fileName;
};
