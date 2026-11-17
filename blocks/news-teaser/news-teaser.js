/**
 * news-teaser — the home page's news list (prototype: stardust/prototypes/bsa-proposed.html,
 * #bsa-content .frame.news). Each teaser is one clickable card: image left, meta line
 * (date | category), headline, text and a "Weiterlesen" line right.
 *
 * Authoring: one row per teaser (cells in any order), or all teasers flat in one cell.
 * Classified by content, never by index:
 *   - picture / img                       → teaser image
 *   - a paragraph that is a date (dd.mm.yyyy) → date
 *   - a link-free paragraph before the heading → category
 *   - h2–h6                               → headline (one per teaser; starts a new teaser)
 *   - a paragraph holding only one link   → the card link (its text = the read-more line)
 *   - anything else                       → teaser text
 */

const DATE = /^\s*\d{1,2}\.\d{1,2}\.\d{4}\s*$/;

function el(tag, className, ...children) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.append(...children);
  return node;
}

const isHeading = (n) => /^H[2-6]$/.test(n.tagName);
const media = (n) => (n.matches('picture, img') ? n : n.querySelector('picture, img'));
const onlyLink = (n) => {
  const links = n.querySelectorAll('a');
  if (links.length !== 1 || media(n)) return null;
  return n.textContent.trim() === links[0].textContent.trim() ? links[0] : null;
};

/** the authored elements of every cell, in order (the delivered cells keep their <p>) */
function collectNodes(row) {
  const out = [];
  [...row.children].forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      // HARNESS-ONLY fallback (EW5): a bare text cell — move its text nodes into a <p>
      const p = document.createElement('p');
      p.append(...cell.childNodes);
      out.push(p);
    }
  });
  return out;
}

/** split a flat node list into teasers: a heading opens one; pre-heading nodes are buffered */
function segment(nodes) {
  const groups = [];
  let pending = [];
  let current = null;
  nodes.forEach((n) => {
    if (isHeading(n)) {
      current = { nodes: [...pending, n] };
      groups.push(current);
      pending = [];
    } else if (current && !media(n) && !DATE.test(n.textContent)) {
      current.nodes.push(n);
    } else {
      // an image or a date after a complete teaser belongs to the next one
      if (media(n) || DATE.test(n.textContent)) current = null;
      pending.push(n);
    }
  });
  return { groups, rest: pending };
}

function buildTeaser(nodes) {
  const headingIndex = nodes.findIndex(isHeading);
  const heading = nodes[headingIndex];
  const parts = {
    image: null, date: null, category: null, link: null, text: [],
  };
  nodes.forEach((n, i) => {
    if (n === heading) return;
    if (!parts.image && media(n)) parts.image = n;
    else if (!parts.date && DATE.test(n.textContent)) parts.date = n;
    else if (onlyLink(n) && !parts.link) parts.link = n;
    else if (!parts.category && i < headingIndex) parts.category = n;
    else parts.text.push(n);
  });

  const card = el('a', 'news-teaser-link');
  const anchor = parts.link ? onlyLink(parts.link) : heading.querySelector('a');
  if (anchor) {
    card.href = anchor.href;
    card.title = heading.textContent.trim();
  }
  if (parts.image) {
    const picture = media(parts.image);
    if (parts.image !== picture && !parts.image.textContent.trim()) parts.image.remove();
    card.append(el('div', 'news-teaser-image', picture));
  }
  const footer = el('div', 'news-teaser-footer');
  if (parts.date) footer.append(el('div', 'news-teaser-meta news-teaser-date', parts.date));
  if (parts.date && parts.category) footer.append(' ');
  if (parts.category) footer.append(el('div', 'news-teaser-meta news-teaser-category', parts.category));
  if (footer.childNodes.length) card.append(footer);
  card.append(el('div', 'news-teaser-header', heading));
  const text = el('div', 'news-teaser-text', ...parts.text);
  if (parts.link) {
    // EW6: the card is the link — keep the authored paragraph, unwrap its anchor
    const inner = onlyLink(parts.link);
    inner.replaceWith(...inner.childNodes);
    text.append(el('div', 'news-teaser-more', parts.link));
  }
  card.append(text);
  return el('article', `news-teaser-item${parts.image ? ' news-teaser-with-image' : ''}`, card);
}

export default function decorate(block) {
  const rows = [...block.children];
  const { groups, rest } = segment(rows.flatMap(collectNodes));
  if (!groups.length) return;
  const items = groups.map((g) => buildTeaser(g.nodes));
  block.replaceChildren(...items);
  // leftovers pass: anything no teaser claimed stays visible below the list
  if (rest.length) block.append(el('div', 'news-teaser-rest', ...rest));
}
