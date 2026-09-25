const fs = require('fs');
const path = require('path');

const srcLogo = path.join(__dirname, 'ChatGPT Image Sep 24, 2026, 11_32_11 AM (1).png');
const destLogo = path.join(__dirname, 'motion-commerce', 'public', 'custom-logo.png');

const srcBg = path.join(__dirname, 'ChatGPT Image Sep 24, 2026, 11_38_08 AM.png');
const destBg = path.join(__dirname, 'motion-commerce', 'public', 'custom-bg.png');

fs.copyFileSync(srcLogo, destLogo);
fs.copyFileSync(srcBg, destBg);

console.log('Files copied successfully!');
