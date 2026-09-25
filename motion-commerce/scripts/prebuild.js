import fs from 'node:fs';
import path from 'node:path';

const pagesDir = path.resolve('src/pages');
const viewsDir = path.resolve('src/views');

try {
  if (fs.existsSync(pagesDir)) {
    if (fs.existsSync(viewsDir)) {
      fs.rmSync(pagesDir, { recursive: true, force: true });
    } else {
      fs.renameSync(pagesDir, viewsDir);
    }
    console.log('[prebuild] Successfully moved src/pages to src/views to ensure Next.js App Router exclusivity.');
  }
} catch (err) {
  console.warn('[prebuild] Directory adjustment notice:', err.message);
}
