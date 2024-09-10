// if (process.env.NODE_ENV === 'production') {
//   // use minified verion for production
//   // module.exports = require('pdfjs-dist/build/pdf.worker.min.js');
//   try {
//     module.exports = require('pdfjs-dist/build/pdf.worker.min.js');
//   } catch (error) {
//     module.exports = require('pdfjs-dist/build/pdf.worker.js');
//   }
// } else {
//   module.exports = require('pdfjs-dist/build/pdf.worker.js');
// }


// src/components/common/pdf-viewer/pdf-viewer.tsx
import { pdfjs } from 'pdfjs-dist';

// ワーカースクリプトのパスを直接設定
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// もしCDNが使えない場合、以下のように設定して直接パスを指定する
// pdfjs.GlobalWorkerOptions.workerSrc = '/path/to/pdf.worker.min.mjs'; // ビルド済みのワーカーファイルをプロジェクトのパブリックディレクトリに配置
