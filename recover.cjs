const fs = require('fs');
const text = fs.readFileSync('C:/Users/User/.gemini/antigravity/brain/4309b9b4-f844-4510-9fa6-ad56e2a28ebf/.system_generated/logs/overview.txt', 'utf-8');

const unescaped = text.replace(/\\n/g, '\n').replace(/\\"/g, '"');

let startIdx = 0;
while (true) {
  startIdx = unescaped.indexOf('Showing lines 1 to 800', startIdx);
  if (startIdx === -1) break;
  console.log("Found at", startIdx);
  console.log(unescaped.slice(startIdx, startIdx + 300));
  console.log("-------");
  startIdx += 10;
}
