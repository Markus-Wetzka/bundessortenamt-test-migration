import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/*
 * Bundessortenamt chrome — template-slotted (prototype: stardust/prototypes/bsa-proposed.html).
 * The /footer document is default content; its elements are classified by content and MOVED:
 *   - the list            → footer navigation (Impressum | Datenschutz | …)
 *   - a block with an image → right column (LinkedIn)
 *   - any other block     → left column (© line)
 */

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  const flex = document.createElement('div');
  flex.className = 'bsa-container footer-flex';
  const colA = document.createElement('div');
  colA.className = 'bsa-footer-col bsa-footer-col-a footer-reset';
  const nav = document.createElement('nav');
  nav.className = 'bsa-footer-navigation';
  nav.id = 'bsa-footer-navigation';
  nav.setAttribute('aria-label', 'Fußnavigation');
  const colC = document.createElement('div');
  colC.className = 'bsa-footer-col bsa-footer-col-c footer-reset';

  fragment.querySelectorAll('.default-content-wrapper').forEach((wrapper) => {
    [...wrapper.children].forEach((child) => {
      if (child.matches('ul, ol')) {
        [...child.childNodes].forEach((n) => {
          if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim()) n.remove();
        });
        child.querySelectorAll(':scope > li').forEach((li) => {
          li.querySelectorAll(':scope > p').forEach((p) => p.replaceWith(...p.childNodes));
          li.classList.add('bsa-footer-navigation-item');
        });
        nav.append(child);
      } else if (child.querySelector('picture, img')) {
        colC.append(child);
      } else {
        colA.append(child);
      }
    });
  });

  flex.append(colA, nav, colC);
  block.textContent = '';
  block.append(flex);
}
