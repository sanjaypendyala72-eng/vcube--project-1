import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'

// Optional copy of local logo if available without breaking build
try {
  const possibleSrcs = [
    path.resolve(__dirname, 'public/logo.png'),
    path.resolve(__dirname, '../ChatGPT Image Sep 24, 2026, 11_38_08 AM.png')
  ];
  const dest = path.resolve(__dirname, 'public/logo.png');
  const validSrc = possibleSrcs.find(p => fs.existsSync(p) && p !== dest);
  if (validSrc && !fs.existsSync(dest)) {
    if (!fs.existsSync(path.dirname(dest))) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
    }
    fs.copyFileSync(validSrc, dest);
  }
} catch {
  // Silent fallback to avoid breaking build in container/production
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
