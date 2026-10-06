import { about, projectSummaries } from './about';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// The page's content as plain HTML, for crawlers, link unfurlers and screen readers: the terminal
// only shows it behind commands, and the root div is empty until JavaScript runs. Visually
// hidden, so the page looks the same.
export function staticMain(): string {
  const paragraphs = about.map((p) => `<p>${escape(p)}</p>`).join('\n      ');
  const projects = projectSummaries
    .map(({ name, summary }) => `<li><strong>${escape(name)}</strong>: ${escape(summary)}</li>`)
    .join('\n        ');
  return `<main class="sr-only">
      <h1>Mike Bates, Full Stack Engineer</h1>
      ${paragraphs}
      <h2>Projects</h2>
      <ul>
        ${projects}
      </ul>
      <h2>Links</h2>
      <ul>
        <li><a href="https://github.com/mbates">GitHub</a></li>
        <li><a href="https://bates-solutions.com">Bates Solutions</a></li>
      </ul>
    </main>`;
}
