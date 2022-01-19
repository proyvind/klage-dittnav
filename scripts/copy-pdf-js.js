const path = require('path');
const fs = require('fs');

const pdfWorkerPath = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'build', 'pdf.worker.js');

fs.mkdirSync('./public', { recursive: true });
fs.copyFileSync(pdfWorkerPath, './public/pdf.worker.js');
