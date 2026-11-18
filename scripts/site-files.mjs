import { projects } from '../content.js';

export const pages = ['/', '/studio', '/work', '/services', '/contact', ...new Set(projects.map(({ id }) => `/work/${id}`))];
export const files = ['index.html', 'styles.css', 'app.js', 'pages.js', 'content.js', 'translations.js'];
