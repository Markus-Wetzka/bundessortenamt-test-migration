/**
 * shortcuts — the home page sidebar (prototype: stardust/prototypes/bsa-proposed.html,
 * aside.bsa-marginal): the ministry logo link, then the "Schnellzugriff" link list.
 *
 * Authoring (one cell, classified by content):
 *   - a paragraph with an image (optionally linked) → the logo
 *   - a heading                                      → the list's (visually hidden) title;
 *                                                       its text also labels the <nav>
 *   - a list of links                                → the shortcut links
 *   - anything else stays visible after the list (leftovers pass)
 */

function el(tag, className, ...children) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.append(...children);
  return node;
}

export default function decorate(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div')].flatMap((cell) => [...cell.children]);
  if (!nodes.length) return;
  const aside = el('aside', 'shortcuts-aside');
  const logos = nodes.filter((n) => n.matches('picture, img') || n.querySelector('picture, img'));
  const heading = nodes.find((n) => /^H[1-6]$/.test(n.tagName));
  const lists = nodes.filter((n) => n.matches('ul, ol'));
  const rest = nodes.filter((n) => !logos.includes(n) && n !== heading && !lists.includes(n));

  if (logos.length) aside.append(el('div', 'shortcuts-logo', ...logos));
  if (heading || lists.length) {
    const nav = el('nav', 'shortcuts-links');
    if (heading) {
      nav.setAttribute('aria-label', heading.textContent.trim());
      nav.append(el('div', 'shortcuts-title', heading));
    }
    nav.append(...lists);
    aside.append(nav);
  }
  if (rest.length) aside.append(el('div', 'shortcuts-rest', ...rest));
  block.replaceChildren(aside);
}
