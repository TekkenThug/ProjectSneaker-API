import * as fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dictionary = {
  'en': JSON.parse(fs.readFileSync(path.join(__dirname, '/en.json'), 'utf8')),
  'ru': JSON.parse(fs.readFileSync(path.join(__dirname, '/ru.json'), 'utf8'))
}

export const gettext = (id) => {
  return dictionary['ru'][id];
}


