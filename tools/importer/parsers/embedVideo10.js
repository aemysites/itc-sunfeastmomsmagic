/* global WebImporter */

export default function parse(element, { document }) {
  // 1. Block header row
  const headerRow = ['Embed (embedVideo10)'];

  // 2. Find the video element and extract the video URL (prefer src, keep fragment)
  const videoEl = element.querySelector('video');
  let videoUrl = '';
  if (videoEl) {
    videoUrl = videoEl.getAttribute('src') || '';
  }

  // 3. Extract all text content from the HTML (should only include actual HTML text)
  let allText = '';
  // Only include non-empty text nodes from div, span, p
  const textBlocks = element.querySelectorAll('div, span, p');
  textBlocks.forEach(tb => {
    const txt = tb.textContent.trim();
    if (txt) {
      allText += txt + '\n';
    }
  });
  allText = allText.trim();

  // 4. Build the cell content: all text (if any) above the video link
  const cellContent = [];
  if (allText) cellContent.push(document.createTextNode(allText));
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cellContent.push(link);
  }

  // Defensive: If no video URL, leave cell blank
  const contentRow = [cellContent.length ? cellContent : ''];

  // 5. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
