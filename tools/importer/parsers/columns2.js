/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns2)'];

  // --- COLUMN 1: Logos and License ---
  const leftSection = element.querySelector('.footer-brand__left');
  let col1Content = [];
  if (leftSection) {
    // Get all images
    const imgs = Array.from(leftSection.querySelectorAll('img'));
    col1Content.push(...imgs);
    // Get the license text (look for text containing 'Lic. No.')
    let licenseText = '';
    const walker = document.createTreeWalker(leftSection, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => node.textContent.trim().includes('Lic. No.') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    });
    let node = walker.nextNode();
    if (node) {
      licenseText = node.textContent.trim();
      col1Content.push(document.createTextNode(licenseText));
    }
  }

  // --- COLUMN 2: Our Story, Products, Mom's Corner, Contact Us ---
  const navbarLeft = element.querySelector('.footer-brand__navbar--left');
  let col2Content = [];
  if (navbarLeft) {
    const lists = navbarLeft.querySelectorAll('.footerList');
    lists.forEach(list => col2Content.push(list));
  }

  // --- COLUMN 3: Sitemap, #TryTheMagic ---
  const navbarRight = element.querySelector('.footer-brand__navbar--right');
  let col3Content = [];
  if (navbarRight) {
    const lists = navbarRight.querySelectorAll('.footerList');
    if (lists[0]) col3Content.push(lists[0]);
  }

  // --- COLUMN 4: Terms of Use, Privacy Policy ---
  let col4Content = [];
  if (navbarRight) {
    const lists = navbarRight.querySelectorAll('.footerList');
    if (lists[1]) col4Content.push(lists[1]);
  }

  // Build the table
  const cells = [
    headerRow,
    [col1Content, col2Content, col3Content, col4Content]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
