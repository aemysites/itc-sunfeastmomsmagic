/* global WebImporter */
export default function parse(element, { document }) {
  // Find all product-details-card sections
  const cards = Array.from(document.querySelectorAll('.product-details-card'));
  if (!cards.length) return;

  // Header row as required
  const headerRow = ['Columns (columns3)'];

  // Build rows: each row is [media, text]
  const rows = cards.map(card => {
    // Media (image)
    const mediaDiv = card.querySelector('.product-details-card__media');
    let img = mediaDiv ? mediaDiv.querySelector('img') : null;
    // Details (title + description)
    const detailsDiv = card.querySelector('.product-details-card__details');
    let title = detailsDiv ? detailsDiv.querySelector('.product-details-card__details--title') : null;
    let desc = detailsDiv ? detailsDiv.querySelector('.product-details-card__details--description') : null;
    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    return [img, textCell];
  });

  // Table: header row, then each card as a row with two columns
  const tableRows = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the first card element with the block
  cards[0].replaceWith(block);
  // Remove the rest of the card elements
  for (let i = 1; i < cards.length; i++) {
    cards[i].remove();
  }
}
