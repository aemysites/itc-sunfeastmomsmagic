/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Cards (cards8)'];

  // 2. Find the parent container holding all cards
  const swiperWrapper = element.querySelector('.video-cards__swiper .swiper-wrapper');
  if (!swiperWrapper) return;

  // 3. Find all card slides
  const slides = Array.from(swiperWrapper.querySelectorAll('.swiper-slide'));

  // 4. Build card rows
  const rows = slides.map((slide, idx) => {
    // Card container
    const card = slide.querySelector('.video-card');
    if (!card) return null;

    // Video element (use as 'image' for card)
    const video = card.querySelector('video');
    let videoPreview = null;
    if (video) {
      videoPreview = video;
    }

    // Title (below video)
    const titleDiv = card.querySelector('.video-card__title');
    let title = '';
    if (titleDiv) {
      title = titleDiv.textContent.trim();
    }

    // Compose the text cell
    const textCell = document.createElement('div');

    // For the third card, add the description above the title
    if (idx === 2) {
      const desc = document.createElement('div');
      desc.textContent = "Did you know, just like this lakhs of mom's calls are being missed on a daily basis?";
      textCell.appendChild(desc);
    }
    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title;
      textCell.appendChild(heading);
    }

    // Each row: [video preview, text cell]
    return [videoPreview, textCell];
  }).filter(Boolean);

  // 5. Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 6. Replace the original element
  element.replaceWith(table);
}
