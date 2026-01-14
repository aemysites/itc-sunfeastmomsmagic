/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block guidelines
  const headerRow = ['Video (video5)'];

  // Find the video element
  const video = element.querySelector('video');
  let videoUrl = '';
  if (video) {
    // Preserve the full src including any fragment
    videoUrl = video.getAttribute('src') || '';
  }

  // Extract all text content from the banner
  let bannerText = '';
  const textContainer = element.querySelector('.fmm-banner__text');
  if (textContainer) {
    bannerText = textContainer.textContent.trim();
  }

  // Build the cell with clear separation: headline above video link, using <br> for clarity
  let videoCellContent = [];
  if (bannerText) videoCellContent.push(bannerText);
  if (bannerText && videoUrl) videoCellContent.push(document.createElement('br'));
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    videoCellContent.push(link);
  }
  if (videoCellContent.length === 0) {
    videoCellContent = [''];
  }

  // Build the table
  const rows = [
    headerRow,
    [videoCellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
