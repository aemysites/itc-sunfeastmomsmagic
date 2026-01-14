/* global WebImporter */
export default function parse(element, { document }) {
  // Critical Review: Ensure dynamic extraction, correct table structure, and semantic preservation

  // 1. Find the main section
  const section = element.querySelector('section.available-now');
  if (!section) return;

  // 2. Extract left column: heading and subheading
  const titles = section.querySelector('.available-now__titles');
  let leftCol = '';
  if (titles) {
    // Create a fragment to preserve semantic structure
    const frag = document.createDocumentFragment();
    const title = titles.querySelector('.available-now__titles--title');
    const subtitle = titles.querySelector('.available-now__titles--sub-title');
    if (title) {
      const h = document.createElement('strong');
      h.textContent = title.textContent.trim();
      frag.appendChild(h);
      frag.appendChild(document.createElement('br'));
    }
    if (subtitle) {
      const p = document.createElement('span');
      p.textContent = subtitle.textContent.trim();
      frag.appendChild(p);
    }
    leftCol = frag;
  }

  // 3. Extract right column: store links and note
  let rightCol = '';
  const storesLinks = section.querySelector('.available-now__stores--links');
  const note = section.querySelector('.available-now__stores--note');
  if (storesLinks || note) {
    const frag = document.createDocumentFragment();
    if (storesLinks) {
      // Reference the actual links container (preserves all images/links)
      frag.appendChild(storesLinks);
    }
    if (note) {
      // Add a line break between icons and note for clarity
      frag.appendChild(document.createElement('br'));
      // Reference the note paragraph
      Array.from(note.childNodes).forEach((n) => frag.appendChild(n.cloneNode(true)));
    }
    rightCol = frag;
  }

  // 4. Build table rows
  const headerRow = ['Columns (columns6)'];
  const rows = [
    headerRow,
    [leftCol, rightCol]
  ];

  // 5. Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element with the new table
  element.replaceWith(table);
}
