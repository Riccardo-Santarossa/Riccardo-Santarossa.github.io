import { defineConfig } from 'vite';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const contentFile = resolve(root, 'src/content.js');
const renderFile = resolve(root, 'src/build/render.js');

// Bakes src/content.js into index.html as static HTML (<!--slot:name--> markers).
function contentSlots() {
  return {
    name: 'content-slots',
    async transformIndexHtml(html) {
      const t = Date.now();
      const content = await import(pathToFileURL(contentFile).href + '?t=' + t);
      const { renderSlots } = await import(pathToFileURL(renderFile).href + '?t=' + t);
      const slots = renderSlots(content);
      return html.replace(/<!--slot:(\w+)-->/g, (m, k) => (k in slots ? slots[k] : m));
    },
    handleHotUpdate({ file, server }) {
      const f = file.split(String.fromCharCode(92)).join('/');
      if (f.endsWith('/src/content.js') || f.includes('/src/build/')) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  plugins: [contentSlots()],
  build: { target: 'es2020' },
});
