/* Bundessortenamt home — stage tabs and main navigation (observed source behaviour). */
(() => {
  const STAGE_BP = 720;
  const NAV_BP = 768;

  /* ---- stage: tabs right (desktop) / stacked label+panel (mobile) ---- */
  const stage = document.getElementById('bsa-stage');
  if (stage) {
    const tabList = stage.querySelector('.bsa-stage__tabs');
    const tabs = [...stage.querySelectorAll('.bsa-stage__tab')];
    const panels = [...stage.querySelectorAll('.bsa-stage__panel')];
    let mode = '';

    const select = (index) => {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.classList.toggle('bsa-stage--active', on);
        tab.setAttribute('tabindex', on ? '0' : '-1');
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        panels[i].classList.toggle('hidden', !on);
        panels[i].style.zIndex = on ? '5' : '0';
        panels[i].querySelector('a').setAttribute('tabindex', on ? '0' : '-1');
      });
    };

    const relabel = (tag) => {
      tabs.forEach((tab) => {
        const label = tab.querySelector('.bsa-stage__label');
        if (label.tagName.toLowerCase() === tag) return;
        const next = document.createElement(tag);
        next.className = label.className;
        next.id = label.id;
        next.innerHTML = label.innerHTML;
        label.replaceWith(next);
      });
    };

    const layout = () => {
      const next = window.innerWidth < STAGE_BP ? 'mobile' : 'desktop';
      if (next === mode) return;
      mode = next;
      if (mode === 'desktop') {
        relabel('span');
        stage.classList.add('bsa-stage--big');
        tabs.forEach((tab) => tabList.append(tab));
        panels.forEach((panel) => stage.append(panel));
      } else {
        relabel('h3');
        stage.classList.remove('bsa-stage--big');
        tabs.forEach((tab, i) => { stage.append(tab); stage.append(panels[i]); });
      }
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (e) => {
        const step = { 37: -1, 38: -1, 39: 1, 40: 1 }[e.keyCode];
        if (!step) return;
        e.preventDefault();
        const n = (i + step + tabs.length) % tabs.length;
        select(n);
        tabs[n].focus();
      });
    });

    layout();
    select(0);
    window.addEventListener('resize', layout);
  }

  /* ---- main navigation: expand buttons + mobile "Menü" toggle ---- */
  const nav = document.getElementById('bsa-main-navigation');
  if (nav) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'bsa-main-navigation__toggle-button';
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    let mode = '';

    const items = [...nav.querySelectorAll('.bsa-main-navigation__item--has-submenu')];
    const close = (item) => {
      item.classList.remove('bsa-main-navigation__item--open');
      item.querySelector('.bsa-main-navigation__expand-button').setAttribute('aria-expanded', 'false');
    };

    items.forEach((item) => {
      const button = item.querySelector('.bsa-main-navigation__expand-button');
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const open = item.classList.contains('bsa-main-navigation__item--open');
        if (mode === 'desktop') items.forEach(close);
        if (open) { close(item); return; }
        item.classList.add('bsa-main-navigation__item--open');
        button.setAttribute('aria-expanded', 'true');
      });
    });

    const defocus = (on) => {
      document.querySelectorAll('.bsa-page > .bsa-container, .bsa-page > .bsa-area')
        .forEach((el, i) => { if (i > 0) el.classList.toggle('bsa--defocused', on); });
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      nav.classList.toggle('hidden', open);
      defocus(!open);
    });

    const layout = () => {
      const next = window.innerWidth < NAV_BP ? 'mobile' : 'desktop';
      if (next === mode) return;
      mode = next;
      items.forEach(close);
      if (mode === 'mobile') {
        nav.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
        nav.before(toggle);
      } else {
        nav.classList.remove('hidden');
        defocus(false);
        toggle.remove();
      }
    };

    layout();
    window.addEventListener('resize', layout);
  }
})();
