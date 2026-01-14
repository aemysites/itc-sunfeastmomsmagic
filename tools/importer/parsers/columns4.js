/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract left (text) and right (image) columns from a product-details-card
  function extractColumns(card) {
    // Left column: title and description
    const details = card.querySelector('.product-details-card__details');
    let leftCol = document.createElement('div');
    if (details) {
      // Title
      const title = details.querySelector('.product-details-card__details--title');
      if (title) {
        const h2 = document.createElement('h2');
        h2.innerHTML = title.innerHTML;
        leftCol.appendChild(h2);
      }
      // Description
      const desc = details.querySelector('.product-details-card__details--description');
      if (desc) {
        Array.from(desc.childNodes).forEach((node) => {
          leftCol.appendChild(node.cloneNode(true));
        });
      }
    }
    // Right column: image
    const media = card.querySelector('.product-details-card__media img');
    let rightCol = document.createElement('div');
    if (media) {
      rightCol.appendChild(media);
    }
    return [leftCol, rightCol];
  }

  // Find all product-details-card sections
  const cards = Array.from(document.querySelectorAll('.product-details-card'));
  const rows = [ ['Columns (columns4)'] ]; // header row

  cards.forEach(card => {
    const [left, right] = extractColumns(card);
    rows.push([left, right]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the first card with the table (remove all cards)
  if (cards.length) {
    cards[0].replaceWith(table);
    for (let i = 1; i < cards.length; i++) {
      cards[i].remove();
    }
  } else {
    // fallback: replace the element itself
    element.replaceWith(table);
  }
}
