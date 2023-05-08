const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

async function copyDir(source, target) {
  try {
    await fs.promises.mkdir(target, { recursive: true });
    const files = await fs.promises.readdir(source, { withFileTypes: true });
    for (const file of files) {
      const sourcePath = path.join(source, file.name);
      const targetPath = path.join(target, file.name);
      if (file.isFile()) {
        await fs.promises.copyFile(sourcePath, targetPath);
      } else if (file.isDirectory()) {
        await copyDir(sourcePath, targetPath);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir(sourceDir, targetDir);
