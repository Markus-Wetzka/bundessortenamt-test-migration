/**
 * stage — the home page's top-news stage (prototype: stardust/prototypes/bsa-proposed.html,
 * #bsa-stage). Desktop (>= 720px): the image panel left (66%), the tabs stacked right (34%);
 * below 720px every tab label becomes an <h3> and sits above its own panel (source behaviour).
 *
 * Authoring: one row per tab, classified by content (any cell order):
 *   - the paragraph(s) without image or link → tab label (`<em>Kicker</em> teaser text`)
 *   - a picture / img                          → the panel image
 *   - a paragraph holding one link             → the panel link (its text = the "Weiterlesen" box)
 * Rows without an image are left in place as plain content (leftovers pass).
 */

const DESKTOP = window.matchMedia('(width >= 720px)');

function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

const media = (node) => (node.matches('picture, img') ? node : node.querySelector('picture, img'));
const linkPara = (node) => {
  const a = node.matches('a') ? node : node.querySelector('a');
  if (!a || media(node)) return null;
  return a;
};

/** the elements of every cell of a row, in authored order */
function rowNodes(row) {
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

function buildTab(row, index) {
  const nodes = rowNodes(row);
  const imageNode = nodes.find((n) => media(n));
  if (!imageNode) return null;
  const linkNode = nodes.find((n) => n !== imageNode && linkPara(n));
  const labelNodes = nodes.filter((n) => n !== imageNode && n !== linkNode);

  const tab = el('li', 'stage-tab');
  tab.setAttribute('role', 'tab');
  const label = el('div', 'stage-label');
  label.id = `stage-label-${index + 1}`;
  label.append(...labelNodes);
  tab.append(label);

  const panel = el('div', 'stage-panel');
  panel.id = `stage-panel-${index + 1}`;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', label.id);
  tab.setAttribute('aria-controls', panel.id);

  const a = el('a');
  const picture = media(imageNode);
  a.append(picture);
  if (imageNode !== picture && !imageNode.textContent.trim()) imageNode.remove();
  if (linkNode) {
    const link = linkPara(linkNode);
    a.href = link.href;
    const box = el('span', 'stage-box');
    const cta = el('span', 'stage-link bsa-icon bsa-icon-arrow-right');
    // EW6: keep the authored paragraph, unwrap its anchor (the panel itself is the link)
    link.replaceWith(...link.childNodes);
    cta.append(linkNode);
    box.append(cta);
    a.append(box);
  }
  panel.append(a);
  return { tab, panel };
}

export default function decorate(block) {
  const rows = [...block.children];
  const items = [];
  const leftovers = [];
  rows.forEach((row) => {
    const item = buildTab(row, items.length);
    if (item) items.push(item);
    else leftovers.push(...rowNodes(row));
  });
  if (!items.length) return;

  const tabs = items.map((i) => i.tab);
  const panels = items.map((i) => i.panel);
  tabs[0].classList.add('stage-tab-first');
  const tabList = el('ul', 'stage-tabs');
  tabList.setAttribute('role', 'tablist');
  block.replaceChildren();
  if (leftovers.length) {
    const rest = el('div', 'stage-rest');
    rest.append(...leftovers);
    block.after(rest);
  }

  const select = (index) => {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.classList.toggle('stage-active', on);
      tab.setAttribute('tabindex', on ? '0' : '-1');
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
      panels[i].classList.toggle('stage-panel-inactive', !on);
      panels[i].style.zIndex = on ? '5' : '0';
      panels[i].querySelector('a').setAttribute('tabindex', on ? '0' : '-1');
    });
  };

  // swap the label wrapper's tag (div on desktop, h3 on mobile); the authored nodes move along
  const relabel = (tag) => {
    tabs.forEach((tab) => {
      const label = tab.querySelector('.stage-label');
      if (label.tagName.toLowerCase() === tag) return;
      const next = el(tag, label.className);
      next.id = label.id;
      next.append(...label.childNodes);
      label.replaceWith(next);
    });
  };

  const layout = () => {
    if (DESKTOP.matches) {
      relabel('div');
      block.classList.add('stage-big');
      tabList.append(...tabs);
      block.replaceChildren(tabList, ...panels);
    } else {
      relabel('h3');
      block.classList.remove('stage-big');
      block.replaceChildren(...tabs.flatMap((tab, i) => [tab, panels[i]]));
    }
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (e) => {
      const step = {
        ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1,
      }[e.key];
      if (!step) return;
      e.preventDefault();
      const n = (i + step + tabs.length) % tabs.length;
      select(n);
      tabs[n].focus();
    });
  });

  layout();
  select(0);
  DESKTOP.addEventListener('change', layout);
}
