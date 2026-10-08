import '@fontsource-variable/anybody/standard.css';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import './styles/style.css';

const html = document.documentElement;

if (html.classList.contains('motion')) {
  import('./journey.js')
    .then((m) => m.start())
    .catch((err) => {
      // Any failure falls back to the static, fully readable version.
      console.error(err);
      html.classList.remove('motion', 'formed');
    });
}
