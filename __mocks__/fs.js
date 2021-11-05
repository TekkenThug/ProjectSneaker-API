import path from 'path';

const fs = jest.createMockFromModule('fs');

let mockFiles = Object.create(null);
const __setMockFiles = (newMockFiles) => {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
};

const readdirSync = (directoryPath) => {
  return mockFiles[directoryPath] || [];
};

const renameSync = (oldPath, newPath) => {
  const file = mockFiles[oldPath];
  delete mockFiles[oldPath];
  mockFiles[newPath] = file;
};

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.renameSync = renameSync;

export default fs;
