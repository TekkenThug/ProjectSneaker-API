import { v4 as uuid } from 'uuid';
import * as path from 'path';

class FileHandler {
    saveFile(file) {
        try {
            const fileName = `${uuid()}${path.extname(file.name)}`;
            const filePath = path.resolve('public', fileName);

            file.mv(filePath);

            return fileName;
        } catch (e) {
            console.log(e)
        }
    }
}

export default new FileHandler();