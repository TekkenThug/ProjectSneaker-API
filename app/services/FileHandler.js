import { v4 as uuid } from 'uuid';
import * as path from 'path';

class FileHandler {
    saveFile(file) {
        try {
            const fileName = `${uuid()}.${file.mimetype.split('/')[1]}`;
            const filePath = path.resolve('public', fileName);

            file.mv(filePath);

            return fileName;
        } catch (e) {
            console.log(e)
        }
    }
}

export default new FileHandler();