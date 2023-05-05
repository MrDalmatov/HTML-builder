const readline = require('readline');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '02-write-file', 'text.txt');

console.log('Введите текст');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
  } else {
    fs.appendFile(filePath, line + '\n', (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Введите текст');
    });
  }
});

rl.on('close', () => {
  console.log('До свидания!');
  process.exit();
});

process.on('SIGINT', () => {
  rl.close();
});


