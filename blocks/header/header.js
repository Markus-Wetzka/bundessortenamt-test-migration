import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/*
 * Bundessortenamt chrome — template-slotted (prototype: stardust/prototypes/bsa-proposed.html).
 *
 * The /nav document is default content, one role per section (classified by content, not index):
 *   - a section with an image            → logo
 *   - a section whose list nests lists   → main navigation (top items + sub-lists)
 *   - a section with a link and no list  → search (href = form action, text = placeholder)
 *   - the remaining list sections, in order → meta navigation, then the extra links the
 *     mobile menu appends below the main items (English, Suchen, Presse, …)
 * `:hand:` / `:book:` icons inside a link switch that link to the sprite icon.
 *
 * @ew-exempt skip links, the search form (hidden inputs, placeholder attribute), the
 *   expand-button "open" labels and the "Hauptnavigation" heading are code, not authored text
 *   (prototype parity); the search link's href/text become form attributes.
 */

const DESKTOP = window.matchMedia('(width >= 768px)');

const SEARCH_FIELDS = [
  ['tx_indexedsearch_pi2[action]', 'search'],
  ['tx_indexedsearch_pi2[controller]', 'Search'],
  ['tx_indexedsearch_pi2[search][ext]', '1'],
  ['tx_indexedsearch_pi2[search][results]', '20'],
  ['tx_indexedsearch_pi2[search][_sections]', '0'],
  ['tx_indexedsearch_pi2[search][languageUid]', '-1'],
  ['tx_indexedsearch_pi2[search][defaultOperand]', '0'],
  ['tx_indexedsearch_pi2[search][sortOrder]', 'rank_flag'],
  ['tx_indexedsearch_pi2[search][searchType]', '2'],
];

// the source marks these abbreviations up in the navigation; the authored nav carries plain text
const ABBREVIATIONS = {
  EU: ['Europäische Union', 'de'],
  OECD: ['Organisation for Economic Co-operation and Development', 'en'],
  PIAF: ['Planungs-, Informations- und Auswertungssytem für Feldversuche', 'de'],
};
const ABBR_PATTERN = new RegExp(`\\b(${Object.keys(ABBREVIATIONS).join('|')})\\b`, 'g');

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else node.setAttribute(k, v);
  });
  node.append(...children);
  return node;
}

/** drop whitespace-only text nodes between inline-block list items */
function stripWhitespace(list) {
  [...list.childNodes].forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim()) n.remove();
  });
}

/** the pipeline wraps a list item's link in <p> on delivery (#98) — unwrap it */
function unwrapParagraphs(li) {
  li.querySelectorAll(':scope > p').forEach((p) => p.replaceWith(...p.childNodes));
}

/** wrap known abbreviations in the links of a list in <abbr title lang> (source parity) */
function decorateAbbreviations(list) {
  list.querySelectorAll('a').forEach((a) => {
    const walker = document.createTreeWalker(a, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);
    texts.filter((t) => !t.parentElement.closest('abbr')).forEach((t) => {
      const parts = t.textContent.split(ABBR_PATTERN);
      if (parts.length < 2) return;
      t.replaceWith(...parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const [title, lang] = ABBREVIATIONS[part];
        return el('abbr', { title, lang }, part);
      }));
    });
  });
}

/** `:hand:` / `:book:` authored icons → sprite icon classes on the link */
function decorateIconLink(a) {
  ['hand', 'book'].forEach((name) => {
    if (a.querySelector(`.icon-${name}`)) a.classList.add('bsa-icon', `bsa-icon-${name}`);
  });
}

function buildSkipLinks() {
  const main = document.querySelector('body > main');
  const footer = document.querySelector('body > footer');
  if (main && !main.id) main.id = 'bsa-content';
  if (footer && !footer.id) footer.id = 'bsa-footer';
  const links = [
    ['#bsa-content', 'Direkt zum Inhalt (Navigation überspringen)'],
    ['#bsa-main-navigation', 'Direkt zur Hauptnavigation'],
    ['#bsa-footer', 'Direkt zum Seitenfuß'],
  ];
  return el(
    'div',
    { class: 'bsa-skiplinks', id: 'bsa-skiplinks' },
    el('ul', {}, ...links.map(([href, text]) => el('li', {}, el('a', { class: 'visuallyhidden focusable', href }, text)))),
  );
}

function buildSearch(link) {
  const action = link?.href || 'https://www.bundessortenamt.de/bsa/suche';
  const placeholder = link?.textContent.trim() || 'Suchbegriff';
  const form = el('form', { action, method: 'post' });
  SEARCH_FIELDS.forEach(([name, value]) => form.append(el('input', { type: 'hidden', name, value })));
  const input = el('input', {
    type: 'text', class: 'bsa-searchbox-input', name: 'tx_indexedsearch_pi2[search][sword]', placeholder,
  });
  form.append(
    el('label', {}, el('span', { class: 'visuallyhidden' }, placeholder), ' ', input),
    ' ',
    el(
      'button',
      {
        type: 'submit', class: 'bsa-searchbox-button bsa-icon bsa-icon-search', name: 'tx_indexedsearch_pi2[search][submitButton]', value: 'Suchen',
      },
      el('span', { class: 'visuallyhidden' }, 'Suchen'),
    ),
  );
  return el('div', { class: 'bsa-banner-mr bsa-searchbox', id: 'bsa-searchbox', role: 'search' }, form);
}

function decorateMainItem(li) {
  unwrapParagraphs(li);
  li.classList.add('bsa-main-navigation-item');
  const sub = li.querySelector(':scope > ul');
  const a = li.querySelector(':scope > a');
  if (a) decorateIconLink(a);
  if (!sub || !a) return null;

  li.classList.add('bsa-main-navigation-item-has-submenu');
  const label = el('span');
  label.append(...a.childNodes, ' ');
  // the pipeline trims the space before an authored line break; the mobile menu hides the <br>
  label.querySelectorAll('br').forEach((br) => {
    if (!/\s$/.test(br.previousSibling?.textContent || '')) br.before(' ');
  });
  const button = el(
    'button',
    { type: 'button', class: 'bsa-main-navigation-expand-button', 'aria-expanded': 'false' },
    el('span', { class: 'visuallyhidden' }, 'open'),
  );
  a.append(label, button);

  stripWhitespace(sub);
  sub.querySelectorAll(':scope > li').forEach((subLi) => {
    unwrapParagraphs(subLi);
    subLi.classList.add('bsa-main-navigation-sub-item');
  });
  const panel = el('div', { class: 'bsa-main-navigation-sub' });
  li.append(panel);
  panel.append(sub);
  return { li, button };
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  const sections = [...fragment.querySelectorAll(':scope > .section')];
  const logoImage = (s) => [...s.querySelectorAll('picture, img')].find((i) => !i.closest('.icon'));
  const logoSection = sections.find(logoImage);
  const mainSection = sections.find((s) => s !== logoSection && s.querySelector('li > ul, li > p + ul'));
  const searchSection = sections.find((s) => ![logoSection, mainSection].includes(s)
    && !s.querySelector('ul') && s.querySelector('a'));
  const listSections = sections.filter((s) => ![logoSection, mainSection, searchSection].includes(s)
    && s.querySelector('ul'));
  const [metaSection, extraSection] = listSections;

  const banner = el('div', { class: 'bsa-banner' });
  banner.append(buildSkipLinks());

  // meta navigation (top right, ≥768px)
  const metaList = metaSection?.querySelector('ul');
  if (metaList) {
    stripWhitespace(metaList);
    metaList.querySelectorAll(':scope > li').forEach((li) => {
      unwrapParagraphs(li);
      li.classList.add('bsa-meta-navigation-item');
      li.querySelectorAll(':scope > a').forEach(decorateIconLink);
    });
    banner.append(el('nav', { class: 'bsa-banner-tr bsa-meta-navigation', 'aria-label': 'Meta Navigation' }, metaList));
  }

  // logo
  const logo = el('div', { class: 'bsa-logo' });
  const picture = logoSection && logoImage(logoSection);
  if (picture) {
    logoSection.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
    const host = picture.closest('a') || picture;
    logo.append(host);
  }
  // source parity: the page's visually hidden h1 sits in the logo (it stays authored in the page)
  const pageH1 = document.querySelector('main h1');
  if (pageH1 && getComputedStyle(pageH1).clipPath === 'inset(50%)') logo.prepend(pageH1);
  banner.append(logo);

  // search box
  banner.append(buildSearch(searchSection?.querySelector('a')));

  // main navigation
  const nav = el('nav', {
    class: 'bsa-banner-br bsa-main-navigation', role: 'navigation', 'aria-label': 'Hauptnavigation', id: 'bsa-main-navigation',
  });
  nav.append(el('h3', { class: 'visuallyhidden' }, 'Hauptnavigation'));
  const mainList = mainSection?.querySelector('ul') || el('ul');
  stripWhitespace(mainList);
  decorateAbbreviations(mainList);
  const menus = [...mainList.querySelectorAll(':scope > li')].map(decorateMainItem).filter(Boolean);
  const extraList = extraSection?.querySelector('ul');
  if (extraList) {
    extraList.querySelectorAll(':scope > li').forEach((li) => {
      unwrapParagraphs(li);
      li.classList.add('bsa-main-navigation-item', 'bsa-main-navigation-item-meta');
      li.querySelectorAll(':scope > a').forEach(decorateIconLink);
      mainList.append(li);
    });
  }
  nav.append(mainList);
  banner.append(nav);

  // behaviour: expand buttons + mobile "Menü" toggle (prototype bsa.js)
  const close = ({ li, button }) => {
    li.classList.remove('bsa-main-navigation-item-open');
    button.setAttribute('aria-expanded', 'false');
  };
  menus.forEach((menu) => {
    menu.button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = menu.li.classList.contains('bsa-main-navigation-item-open');
      if (DESKTOP.matches) menus.forEach(close);
      if (open) {
        close(menu);
        return;
      }
      menu.li.classList.add('bsa-main-navigation-item-open');
      menu.button.setAttribute('aria-expanded', 'true');
    });
  });

  const toggle = el('button', {
    type: 'button', class: 'bsa-main-navigation-toggle-button', 'aria-haspopup': 'true', 'aria-controls': nav.id, 'aria-expanded': 'false',
  });
  const defocus = (on) => {
    document.querySelectorAll('body > main, body > footer').forEach((node) => {
      node.classList.toggle('bsa-defocused', on);
    });
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    nav.classList.toggle('hidden', open);
    defocus(!open);
  });

  const layout = () => {
    menus.forEach(close);
    if (DESKTOP.matches) {
      nav.classList.remove('hidden');
      defocus(false);
      toggle.remove();
    } else {
      nav.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      defocus(false);
      nav.before(toggle);
    }
  };
  layout();
  DESKTOP.addEventListener('change', layout);

  block.textContent = '';
  block.append(el('div', { class: 'bsa-container' }, banner));
}
