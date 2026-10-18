/* Progressive enhancement: translated, crawlable HTML is the source of truth. */
(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const en = root.lang === 'en';
  const t = (th, english) => en ? english : th;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let userPaused = false;
  try { userPaused = sessionStorage.getItem('tg-v4-motion') === 'paused'; } catch {}
  let motionOff = reduced.matches || userPaused;
  const motionButton = document.querySelector('[data-motion]');
  function updateMotion() {
    motionOff = reduced.matches || userPaused;
    root.classList.toggle('motion-paused', motionOff);
    motionButton.hidden = false;
    motionButton.setAttribute('aria-pressed', String(motionOff));
    motionButton.textContent = reduced.matches ? t('ลดการเคลื่อนไหวตามระบบ', 'System reduced motion') : motionOff ? t('เปิดการเคลื่อนไหว', 'Enable motion') : t('หยุดการเคลื่อนไหว', 'Pause motion');
    motionButton.disabled = reduced.matches;
    if (motionOff) document.querySelectorAll('.reveal-ready').forEach(el => el.classList.add('in-view'));
  }
  updateMotion();
  reduced.addEventListener('change', updateMotion);
  motionButton.addEventListener('click', () => { userPaused = !userPaused; try { sessionStorage.setItem('tg-v4-motion', userPaused ? 'paused' : 'on'); } catch {} updateMotion(); });

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-nav');
  menuButton.hidden = false;
  function toggleMenu(open, focus = false) {
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? menuButton.dataset.close : menuButton.dataset.open);
    menuButton.querySelector('span').textContent = open ? '×' : '☰';
    if (focus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => toggleMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) toggleMenu(false, true); });
  document.addEventListener('click', e => { if (!e.target.closest('.header')) toggleMenu(false); });
  matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) toggleMenu(false); });

  if ('IntersectionObserver' in window && !motionOff) {
    const observer = new IntersectionObserver(entries => entries.forEach(({isIntersecting, target}) => { if (isIntersecting) { target.classList.add('in-view'); observer.unobserve(target); } }), {threshold: .08});
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('reveal-ready'); observer.observe(el); });
  }
  const bar = document.querySelector('.reading-progress');
  let scrollQueued = false;
  function drawScroll() { const range = root.scrollHeight - innerHeight; bar.style.transform = `scaleX(${range > 0 ? Math.min(1,Math.max(0,scrollY / range)) : 0})`; scrollQueued = false; }
  addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(drawScroll); } }, {passive:true});
  addEventListener('resize', drawScroll); drawScroll();
  const art = document.querySelector('.hero-art');
  if (art) {
    let queued = false, dx = 0, dy = 0;
    const ticket = art.querySelector('.boarding-card');
    art.addEventListener('pointermove', e => {
      if (motionOff || !finePointer.matches) return;
      const bounds = art.getBoundingClientRect();
      dx = (e.clientX - bounds.left - bounds.width / 2) * .025;
      dy = (e.clientY - bounds.top - bounds.height / 2) * .02;
      if (!queued) { queued = true; requestAnimationFrame(() => { ticket.style.translate = `${dx}px ${dy}px`; queued = false; }); }
    });
    art.addEventListener('pointerleave', () => { ticket.style.translate = ''; });
  }
  // Preserve filters and enquiry context when moving between language URLs.
  document.querySelectorAll('[data-language]').forEach(a => { const url = new URL(a.href); url.search = location.search; url.hash = location.hash; a.href = url.href; });
  const filter = document.querySelector('[data-filter]');
  if (filter) {
    const fields = ['q','sector','country'];
    const initial = new URLSearchParams(location.search);
    fields.forEach(name => { if (initial.has(name)) filter.elements[name].value = initial.get(name); });
    const cards = [...document.querySelectorAll('[data-job]')];
    function applyFilter(updateUrl = true) {
      const q = filter.elements.q.value.trim().toLocaleLowerCase();
      const sector = filter.elements.sector.value, country = filter.elements.country.value;
      let count = 0;
      cards.forEach(card => { const visible = (!sector || card.dataset.sector === sector) && (!country || card.dataset.country === country) && (!q || card.dataset.search.toLocaleLowerCase().includes(q)); card.hidden = !visible; if (visible) count++; });
      document.querySelector('[data-result]').textContent = t(`พบ ${count} จาก ${cards.length} ตัวอย่างสายงาน`, `${count} of ${cards.length} sample opportunities`);
      document.querySelector('[data-empty]').hidden = count > 0;
      if (updateUrl) {
        const url = new URL(location.href); url.search = '';
        fields.forEach(name => { const value = filter.elements[name].value.trim(); if (value) url.searchParams.set(name, value); });
        history.replaceState(null, '', url);
        const langLink = document.querySelector('[data-language]'); const langUrl = new URL(langLink.href); langUrl.search = url.search; langLink.href = langUrl.href;
      }
    }
    filter.addEventListener('input', () => applyFilter());
    filter.addEventListener('change', () => applyFilter());
    filter.addEventListener('submit', e => { e.preventDefault(); applyFilter(); });
    filter.addEventListener('reset', () => setTimeout(() => applyFilter(), 0));
    applyFilter(false);
  }
  const checks = [...document.querySelectorAll('[data-check]')];
  if (checks.length) {
    const updateChecks = () => { const count = checks.filter(c => c.checked).length; document.querySelector('[data-check-count]').textContent = t(`เตรียมแล้ว ${count} จาก ${checks.length} รายการ`, `${count} of ${checks.length} items prepared`); };
    checks.forEach(c => c.addEventListener('change', updateChecks)); updateChecks();
  }
  const form = document.querySelector('[data-contact]');
  if (form) {
    form.querySelector('button[type=submit]').disabled = false;
    const params = new URLSearchParams(location.search);
    const type = params.get('type') === 'employer' ? 'employer' : 'worker';
    form.querySelector(`input[name=type][value=${type}]`).checked = true;
    const company = form.querySelector('.company-field');
    const updateType = () => { const employer = form.elements.type.value === 'employer'; company.hidden = !employer; form.elements.company.disabled = !employer; form.elements.company.required = employer; };
    form.querySelectorAll('[name=type]').forEach(r => r.addEventListener('change', updateType)); updateType();
    if (params.get('job')) form.elements.message.value = t('สนใจสอบถามสายงานตัวอย่าง: ', 'I would like to enquire about the sample field: ') + params.get('job').slice(0,150);
    form.addEventListener('input', () => {
      const draft = form.querySelector('.email-fallback');
      if (!draft.hidden) {
        draft.hidden = true;
        form.querySelector('[data-form-status]').textContent = t('ข้อมูลเปลี่ยนแล้ว กรุณาสร้างข้อความอีเมลใหม่ก่อนส่ง', 'Your details changed. Create a new draft before sending.');
        form.querySelector('[data-copy]').textContent = t('คัดลอกข้อความ', 'Copy draft');
      }
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const employer = form.elements.type.value === 'employer';
      const subject = t(employer ? 'สอบถามสรรหาแรงงานไทย' : 'ปรึกษาทำงานต่างประเทศ', employer ? 'Thai workforce enquiry' : 'Overseas career enquiry') + ' — ' + form.elements.name.value.trim();
      const body = [[t('ชื่อ','Name'),form.elements.name.value],[t('โทรศัพท์','Phone'),form.elements.phone.value],[t('อีเมล','Email'),form.elements.email.value],...(employer?[[t('บริษัท','Company'),form.elements.company.value]]:[]),[t('ข้อความ','Message'),form.elements.message.value]].map(([name,value])=>`${name}: ${value.trim()}`).join('\n');
      const fallback = form.querySelector('.email-fallback');
      fallback.hidden = false; fallback.querySelector('[data-draft]').value = subject + '\n\n' + body;
      form.querySelector('[data-form-status]').textContent = t('สร้างข้อความแล้ว กรุณาตรวจทานและกดส่งในแอปอีเมลของคุณ ข้อมูลยังไม่ถูกส่งจากหน้านี้', 'Draft created. Review and send it in your email app. This page has not sent your information.');
      let openEmail = fallback.querySelector('[data-open-email]');
      if (!openEmail) { openEmail = document.createElement('a'); openEmail.className = 'button'; openEmail.dataset.openEmail = ''; openEmail.textContent = t('เปิดแอปอีเมลเพื่อตรวจทานและส่ง', 'Open email app to review and send'); fallback.prepend(openEmail); }
      openEmail.href = `mailto:tg.oversea.solutions@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    form.querySelector('[data-copy]').addEventListener('click', async e => {
      const draft = form.querySelector('[data-draft]');
      try { await navigator.clipboard.writeText(draft.value); e.target.textContent = t('คัดลอกแล้ว','Copied'); }
      catch { draft.focus(); draft.select(); e.target.textContent = t('เลือกข้อความแล้ว กดคัดลอกได้เลย','Text selected — copy it now'); }
    });
  }
})();
