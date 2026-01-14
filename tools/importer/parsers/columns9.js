/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main section
  const section = element.querySelector('section.available-now');
  if (!section) return;

  // Left column: Titles (text)
  const leftCol = document.createElement('div');
  const title = section.querySelector('.available-now__titles--title');
  const subtitle = section.querySelector('.available-now__titles--sub-title');
  if (title) leftCol.appendChild(document.createTextNode(title.textContent.trim()));
  if (subtitle) {
    leftCol.appendChild(document.createElement('br'));
    leftCol.appendChild(document.createTextNode(subtitle.textContent.trim()));
  }

  // Right column: Store links and note (all text and images)
  const rightCol = document.createElement('div');
  // Store links (icons)
  const linksDiv = section.querySelector('.available-now__stores--links');
  if (linksDiv) {
    Array.from(linksDiv.querySelectorAll('a')).forEach(a => {
      rightCol.appendChild(a.cloneNode(true));
    });
  }
  // Note (text)
  const noteDiv = section.querySelector('.available-now__stores--note');
  if (noteDiv) {
    rightCol.appendChild(document.createElement('br'));
    rightCol.appendChild(document.createTextNode(noteDiv.textContent.trim()));
  }

  // Compose the table
  const headerRow = ['Columns (columns9)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
