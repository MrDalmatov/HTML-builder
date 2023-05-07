const fs = require('fs').promises;
const path = require('path');

async function readFilesInfo() {
  const dirPath = path.join(__dirname, 'secret-folder');
  const files = await fs.readdir(dirPath, { withFileTypes: true });
  
  for (const file of files) {
    if (!file.isFile()) continue;
    
    const { name, ext } = path.parse(file.name);
    const stat = await fs.stat(path.join(dirPath, file.name));
    const size = stat.size;
    
    console.log(`${name} - ${ext.substr(1)} - ${size} bytes`);
  }
}

readFilesInfo();
