/* Page definitions. Each page renders twice: Thai at /, English at /en/. */
import { CO, SITE_URL, SECTORS, COUNTRIES, EMIT_JOB_POSTING } from "./site.mjs";
import { JOBS } from "./jobs.mjs";
import { icon, crumbs, microline, absUrl } from "./layout.mjs";
import { sectorRows, stamps, certificate, scamChecks, countryOptions, sectorOptions } from "./content.mjs";

const pageHead = (c, page, h1, lead, extra = "") => `
<section class="phero">
  <div class="wrap">
    ${crumbs(c, page)}
    <h1 class="display display--md">${h1}</h1>
    <p class="lead">${lead}</p>
    ${extra}
  </div>
</section>
${microline(c)}`;

/* ------------------------------------------------------------------ HOME */
const home = {
  id: "home", file: "index.html",
  title: {
    th: "บริษัทจัดหางานไปทำงานต่างประเทศ ถูกกฎหมาย | TG Oversea Solutions",
    en: "Licensed Thai Overseas Recruitment Agency | TG Oversea Solutions"
  },
  desc: {
    th: "หางานต่างประเทศกับบริษัทจัดหางานที่ได้รับอนุญาต ต. 1307/2569 ส่งคนไทยไปทำงานซาอุฯ ดูไบ โอมาน คูเวต ออสเตรเลีย นิวซีแลนด์ งานนวดแผนไทย สปา ช่าง โรงงาน เกษตร ปรึกษาฟรี",
    en: "Licensed Thai recruitment agency (T. 1307/2569) placing massage and spa therapists, trades, factory and farm workers in the Middle East, Australia, NZ and Asia."
  },
  preload: "",
  body: (c) => `
<section class="hero" aria-labelledby="hero-t">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="badge">${icon("shield")}${c.L("ได้รับอนุญาตจากกรมการจัดหางาน กระทรวงแรงงาน", "Licensed by Thailand's Department of Employment")}</p>
      <h1 class="display" id="hero-t">${c.L("ไปทำงานต่างประเทศ<br>อย่างถูกกฎหมาย<br>กับบริษัทที่ตรวจสอบได้", "Work abroad legally,<br>with an agency<br>you can verify")}</h1>
      <p class="lead">${c.L(
        "บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น ส่งคนไทยไปทำงานในซาอุดีอาระเบีย ยูเออี โอมาน คูเวต ออสเตรเลีย นิวซีแลนด์ ยุโรป และเอเชีย ดูแลตั้งแต่เอกสาร อบรม วีซ่า จนถึงวันทำงานจริง",
        "TG Oversea Solutions recruits Thai workers for employers in Saudi Arabia, the UAE, Oman, Kuwait, Australia, New Zealand, Europe and Asia, handling documents, training and visas through to your first day at work.")}</p>
      <form class="finder" action="jobs.html" method="get" role="search" aria-label="${c.L("ค้นหาตำแหน่งงาน", "Find a job")}">
        <div class="finder-f">
          <label for="q-sector">${c.L("สายงาน", "Sector")}</label>
          <select id="q-sector" name="sector">${sectorOptions(c, c.L("ทุกสายงาน", "All sectors"))}</select>
        </div>
        <div class="finder-f">
          <label for="q-country">${c.L("ประเทศ", "Country")}</label>
          <select id="q-country" name="country">${countryOptions(c, c.L("ทุกประเทศ", "All countries"))}</select>
        </div>
        <button class="btn btn-ink" type="submit">${icon("search")}${c.L("ค้นหางาน", "Find jobs")}</button>
      </form>
      <p class="hero-alt">${c.L("เป็นนายจ้างต่างประเทศ?", "Hiring from overseas?")} <a href="contact.html?type=employer">${c.L("ขอรายชื่อผู้สมัคร", "Request candidates")}</a></p>
    </div>
    <aside class="hero-cert" aria-labelledby="cert-t">
      ${certificate(c)}
    </aside>
  </div>
</section>
${microline(c)}

<section class="promise" aria-labelledby="pr-t">
  <div class="wrap">
    <h2 id="pr-t" class="h3">${c.L("สิ่งที่คุณได้รับจากเราทุกครั้ง", "What you get from us, every time")}</h2>
    <ul class="promise-l" role="list">
      <li>${icon("check")}<p><b>${c.L("ค่าใช้จ่ายเป็นลายลักษณ์อักษร", "Costs in writing")}</b>${c.L("แจ้งทุกรายการก่อนเซ็นสัญญา ไม่เกินอัตราที่กฎหมายกำหนด", "Every item before you sign, within legal limits")}</p></li>
      <li>${icon("check")}<p><b>${c.L("ใบเสร็จในนามบริษัท", "Company receipts")}</b>${c.L("ทุกครั้งที่ชำระเงิน ไม่รับโอนเข้าบัญชีบุคคล", "For every payment, never to a personal account")}</p></li>
      <li>${icon("check")}<p><b>${c.L("อบรมก่อนเดินทาง", "Training before you fly")}</b>${c.L("ภาษา วัฒนธรรม และกฎหมายของประเทศปลายทาง", "Language, culture and local law")}</p></li>
      <li>${icon("check")}<p><b>${c.L("เจ้าหน้าที่ดูแลตลอดสัญญา", "A contact for the whole contract")}</b>${c.L("ติดต่อได้จริงตั้งแต่วันสมัครจนถึงวันกลับบ้าน", "From the day you apply to the day you come home")}</p></li>
    </ul>
  </div>
</section>

<section class="sec" aria-labelledby="paths-t">
  <div class="wrap">
    <div class="sh">
      <h2 id="paths-t" class="h2">${c.L("งานที่ใช่สำหรับคนไทย แรงงานที่ไว้ใจได้สำหรับนายจ้าง", "The right job for Thai workers. Reliable people for employers.")}</h2>
    </div>
    <div class="paths">
      <article class="path path--worker">
        <span class="path-ic">${icon("person")}</span>
        <h3>${c.L("สำหรับคนหางาน", "For job seekers")}</h3>
        <p>${c.L("อยากไปทำงานต่างประเทศแต่ไม่รู้จะเริ่มตรงไหน เราช่วยเลือกงานที่เหมาะกับฝีมือ เตรียมเอกสาร อบรม จนถึงวันเดินทาง และดูแลต่อตลอดสัญญา", "Want to work abroad but not sure where to start? We help you choose a role that fits your skills, prepare documents and training, and stay with you for the whole contract.")}</p>
        <ul role="list">
          <li>${icon("check")}${c.L("รับผู้ที่ยังไม่เคยไปทำงานต่างประเทศในหลายตำแหน่ง", "Many roles welcome first-time overseas workers")}</li>
          <li>${icon("check")}${c.L("อธิบายตำแหน่ง เงื่อนไข และสัญญาจ้างให้เข้าใจก่อนตัดสินใจ", "Role, terms and contract explained before you decide")}</li>
          <li>${icon("check")}${c.L("ช่วยแนะนำการทำหนังสือเดินทางและเอกสาร", "Help with your passport and paperwork")}</li>
        </ul>
        <a class="btn btn-gold" href="jobs.html">${c.L("ดูตำแหน่งงานทั้งหมด", "See all jobs")}${icon("arrow")}</a>
      </article>
      <article class="path path--employer" id="employers">
        <span class="path-ic">${icon("building")}</span>
        <h3>${c.L("สำหรับนายจ้างต่างประเทศ", "For overseas employers")}</h3>
        <p>${c.L("แรงงานไทยที่ผ่านการคัดกรองและทดสอบฝีมือ เอกสารครบตามขั้นตอนกรมการจัดหางาน และมีผู้ประสานงานคนเดียวตั้งแต่ต้นจนจบ", "Pre-screened, skill-tested Thai workers, paperwork completed under Department of Employment procedures, and one coordinator from brief to arrival.")}</p>
        <ul role="list">
          <li>${icon("check")}${c.L("คัดกรองประวัติ สัมภาษณ์ และทดสอบทักษะ", "Background checks, interviews and trade tests")}</li>
          <li>${icon("check")}${c.L("ดำเนินการสัญญา วีซ่า และตรวจสุขภาพ", "Contracts, visas and medicals handled")}</li>
          <li>${icon("check")}${c.L("ติดตามผลหลังแรงงานเริ่มงาน", "Follow-up after your workers start")}</li>
        </ul>
        <a class="btn btn-ink" href="contact.html?type=employer">${c.L("ขอรายชื่อผู้สมัคร", "Request candidates")}${icon("arrow")}</a>
      </article>
    </div>
  </div>
</section>

<section class="sec sec--tint" aria-labelledby="sectors-t">
  <div class="wrap">
    <div class="sh sh--row">
      <h2 id="sectors-t" class="h2">${c.L("สายงานที่เปิดรับสมัคร", "Sectors we recruit for")}</h2>
      <p class="lead">${c.L("ทุกตำแหน่งผ่านการตรวจสอบนายจ้างและเงื่อนไขการจ้างก่อนเปิดรับสมัคร", "Every role is checked for employer and contract terms before we recruit.")}</p>
    </div>
    ${sectorRows(c)}
  </div>
</section>

<section class="sec" aria-labelledby="dest-t">
  <div class="wrap">
    <div class="sh sh--row">
      <h2 id="dest-t" class="h2">${c.L("ประเทศปลายทาง", "Where we place people")}</h2>
      <p class="lead">${c.L("ประเทศที่เราส่งแรงงานไปทำงานแล้ว และเครือข่ายพันธมิตรที่พร้อมรับแรงงานไทย เลือกประเทศเพื่อดูตำแหน่งงาน", "Countries where we've already placed workers, and partner networks ready for Thai staff. Pick one to see jobs.")}</p>
    </div>
    ${stamps(c)}
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="steps-t">
  <div class="wrap">
    <div class="sh sh--row">
      <h2 id="steps-t" class="h2">${c.L("4 ขั้นตอน จากใบสมัครถึงวันเริ่มงาน", "Four steps from application to first shift")}</h2>
      <a class="btn btn-ghost" href="process.html">${c.L("ดูขั้นตอนและเอกสารที่ต้องใช้", "Steps and documents in full")}${icon("arrow")}</a>
    </div>
    <ol class="steps" role="list">
      <li class="step"><span class="step-n">1</span><h3>${c.L("ลงทะเบียนและคัดกรอง", "Register and screening")}</h3><p>${c.L("ส่งประวัติ สัมภาษณ์ และประเมินทักษะ เพื่อแนะนำตำแหน่งที่เหมาะกับคุณ", "Share your background, interview and get matched to suitable roles.")}</p></li>
      <li class="step"><span class="step-n">2</span><h3>${c.L("ทดสอบฝีมือและอบรม", "Skills test and training")}</h3><p>${c.L("ทดสอบตามมาตรฐานนายจ้าง อบรมภาษา วัฒนธรรม และกฎหมายปลายทาง", "Employer-standard trade tests plus language, culture and legal briefings.")}</p></li>
      <li class="step"><span class="step-n">3</span><h3>${c.L("เอกสาร วีซ่า และตรวจสุขภาพ", "Documents, visa and medical")}</h3><p>${c.L("สัญญาจ้าง ตรวจสุขภาพ วีซ่า และการอนุญาตเดินทางจากกรมการจัดหางาน", "Contract, medical, visa and departure approval from the Department of Employment.")}</p></li>
      <li class="step"><span class="step-n">4</span><h3>${c.L("เดินทางและดูแลต่อเนื่อง", "Departure and aftercare")}</h3><p>${c.L("ส่งถึงที่ทำงาน ติดตามความเป็นอยู่ และประสานกับนายจ้างตลอดสัญญา", "We see you to work, check on your welfare and liaise with the employer.")}</p></li>
    </ol>
  </div>
</section>

${scamChecks(c)}`
};

/* ------------------------------------------------------------------ JOBS */
const fmtDate = (iso, lang) => new Date(iso + "T00:00:00Z").toLocaleDateString(lang === "en" ? "en-GB" : "th-TH", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const jobs = {
  id: "jobs", file: "jobs.html", schemaType: "CollectionPage",
  crumb: { th: "ตำแหน่งงาน", en: "Jobs" },
  title: {
    th: "ตำแหน่งงานต่างประเทศ 2569 นวดไทย สปา ช่าง โรงงาน เกษตร | TG Oversea",
    en: "Overseas Jobs for Thai Workers | TG Oversea Solutions"
  },
  desc: {
    th: "รวมตำแหน่งงานต่างประเทศสำหรับคนไทย นักนวดแผนไทย สปา เชฟ ช่างเชื่อม ช่างไฟฟ้า โรงงาน ฟาร์ม ในซาอุฯ ดูไบ โอมาน คูเวต ออสเตรเลีย นิวซีแลนด์ สมัครกับบริษัทจัดหางานถูกกฎหมาย",
    en: "Overseas jobs for Thai workers: massage and spa therapists, chefs, welders, electricians, factory and farm roles in the Gulf, Australia and New Zealand."
  },
  schema: (c) => {
    const nodes = [{
      "@type": "ItemList", "@id": c.url() + "#joblist", name: c.L("ตำแหน่งงานต่างประเทศ", "Overseas jobs"),
      numberOfItems: JOBS.length,
      itemListElement: JOBS.map((j, i) => ({ "@type": "ListItem", position: i + 1, url: c.url() + "#job-" + j.id, name: j.title[c.lang] }))
    }];
    if (EMIT_JOB_POSTING) {
      JOBS.filter((j) => COUNTRIES[j.country].iso).forEach((j) => nodes.push({
        "@type": "JobPosting",
        "@id": c.url() + "#job-" + j.id,
        title: j.title[c.lang],
        description: `<p>${j.title[c.lang]} — ${j.city[c.lang]}, ${COUNTRIES[j.country][c.lang]}</p><ul>${j.req[c.lang].map((r) => `<li>${r}</li>`).join("")}</ul>`,
        datePosted: j.posted, validThrough: j.until + "T23:59:59+07:00",
        employmentType: "FULL_TIME",
        hiringOrganization: { "@id": SITE_URL + "/#org" },
        jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: j.city.en, addressCountry: COUNTRIES[j.country].iso } },
        applicantLocationRequirements: { "@type": "Country", name: "TH" },
        directApply: true,
        identifier: { "@type": "PropertyValue", name: CO.short, value: j.id },
        url: c.url() + "#job-" + j.id
      }));
    }
    return nodes;
  },
  body: (c) => pageHead(c, jobs,
    c.L("ตำแหน่งงานต่างประเทศ ที่เปิดรับสมัคร", "Overseas jobs open now"),
    c.L("ทุกตำแหน่งตรวจสอบนายจ้างและเงื่อนไขการจ้างแล้ว เลือกสายงานหรือประเทศเพื่อกรองรายการ แล้วกดสมัครเพื่อให้เจ้าหน้าที่ติดต่อกลับ", "Every listing is checked for employer and contract terms. Filter by sector or country, then apply and we'll call you back.")) + `
<section class="sec sec--jobs" aria-labelledby="list-t">
  <div class="wrap jobs-wrap">
    <h2 id="list-t" class="sr">${c.L("รายการตำแหน่งงาน", "Job listings")}</h2>
    <form class="jfilter" action="jobs.html" method="get" data-jobfilter>
      <div class="finder-f">
        <label for="j-sector">${c.L("สายงาน", "Sector")}</label>
        <select id="j-sector" name="sector">${sectorOptions(c, c.L("ทุกสายงาน", "All sectors"))}</select>
      </div>
      <div class="finder-f">
        <label for="j-country">${c.L("ประเทศ", "Country")}</label>
        <select id="j-country" name="country">${countryOptions(c, c.L("ทุกประเทศ", "All countries"))}</select>
      </div>
      <button class="btn btn-ink jfilter-go" type="submit">${icon("filter")}${c.L("กรองรายการ", "Filter")}</button>
      <p class="jcount" role="status" aria-live="polite" data-count data-tpl="${c.L("แสดง {n} จาก {t} ตำแหน่ง", "Showing {n} of {t} jobs")}">${c.L(`ทั้งหมด ${JOBS.length} ตำแหน่ง`, `${JOBS.length} jobs`)}</p>
    </form>

    <div class="jobs" data-jobs>
${JOBS.map((j) => {
  const s = SECTORS[j.sector], n = COUNTRIES[j.country];
  return `      <article class="job" id="job-${j.id}" data-sector="${j.sector}" data-country="${j.country}">
        <p class="job-sec">${icon(s.icon)}${c.L(s.th, s.en)}</p>
        <h3 class="job-t">${j.title[c.lang]}</h3>
        <p class="job-loc">${icon("pin")}${j.city[c.lang] === n[c.lang] ? n[c.lang] : `${j.city[c.lang]}, ${n[c.lang]}`}</p>
        <ul class="job-req" role="list">${j.req[c.lang].map((r) => `<li>${r}</li>`).join("")}</ul>
        <div class="job-foot">
          <p>${c.L("ปิดรับ", "Closes")} <time datetime="${j.until}">${fmtDate(j.until, c.lang)}</time></p>
          <a class="btn btn-sm btn-ink" href="contact.html?type=worker&amp;job=${j.id}">${c.L("สมัครตำแหน่งนี้", "Apply")}<span class="sr"> — ${j.title[c.lang]}, ${n[c.lang]}</span></a>
        </div>
      </article>`;
}).join("\n")}
    </div>
    <div class="jempty" data-empty hidden>
      <h3>${c.L("ยังไม่มีตำแหน่งที่ตรงกับตัวกรองนี้", "No jobs match this filter yet")}</h3>
      <p>${c.L("ลองเลือก “ทุกประเทศ” หรือ “ทุกสายงาน” หรือฝากข้อมูลไว้ เราจะแจ้งเมื่อมีตำแหน่งใหม่ที่ตรงกับคุณ", "Try “All countries” or “All sectors”, or leave your details and we'll tell you when a matching job opens.")}</p>
      <a class="btn btn-ink" href="contact.html?type=worker">${c.L("ฝากข้อมูลไว้", "Leave your details")}</a>
    </div>
    <p class="note">${icon("info")}${c.L("จำนวนที่เปิดรับ คุณสมบัติ และเงื่อนไขการจ้างอาจเปลี่ยนตามนายจ้าง เจ้าหน้าที่จะยืนยันรายละเอียดล่าสุดกับคุณก่อนสมัครทุกครั้ง", "Openings, requirements and terms change with each employer. We confirm the latest details with you before you apply.")}</p>
  </div>
</section>`
};

/* -------------------------------------------------------------- SERVICES */
const SERVICES = [
  ["search", { th: "สรรหาและคัดเลือก", en: "Recruitment and selection" }, { th: "คัดกรองประวัติ สัมภาษณ์ และจับคู่ผู้สมัครกับตำแหน่งที่ตรงกับทักษะและความต้องการของนายจ้าง", en: "Screening, interviews and matching candidates to roles that fit their skills and the employer's brief." }],
  ["doc", { th: "เตรียมเอกสาร", en: "Document preparation" }, { th: "ช่วยจัดเตรียมหนังสือเดินทาง ใบรับรอง และเอกสารประกอบทั้งหมดให้ครบถ้วนถูกต้อง", en: "Help with passports, certificates and every supporting document, complete and correct." }],
  ["cap", { th: "ทดสอบฝีมือและอบรม", en: "Skills testing and training" }, { th: "ทดสอบฝีมือตามมาตรฐานนายจ้าง อบรมภาษา วัฒนธรรม และปฐมนิเทศก่อนเดินทาง", en: "Employer-standard trade tests plus language, culture and pre-departure orientation." }],
  ["medical", { th: "ตรวจสุขภาพ", en: "Medical checks" }, { th: "ประสานการตรวจสุขภาพกับสถานพยาบาลที่ได้รับการรับรองตามข้อกำหนดของแต่ละประเทศ", en: "Medical exams at approved clinics, to each destination country's requirements." }],
  ["passport", { th: "วีซ่าและใบอนุญาต", en: "Visas and permits" }, { th: "ยื่นวีซ่าทำงาน ใบอนุญาตทำงาน และขออนุญาตเดินทางจากกรมการจัดหางาน", en: "Work visas, work permits and departure approval from the Department of Employment." }],
  ["headset", { th: "ดูแลระหว่างทำงาน", en: "Care during the contract" }, { th: "ติดตามความเป็นอยู่ เป็นตัวกลางประสานกับนายจ้าง และช่วยเหลือเมื่อมีปัญหาตลอดสัญญา", en: "Welfare check-ins, employer liaison and help whenever issues come up." }]
];

const services = {
  id: "services", file: "services.html",
  crumb: { th: "บริการ", en: "Services" },
  title: {
    th: "บริการจัดหาแรงงานไทยไปต่างประเทศ ครบวงจร | TG Oversea Solutions",
    en: "Hire Thai Workers for Overseas Jobs | TG Oversea Solutions"
  },
  desc: {
    th: "บริการจัดหางานต่างประเทศครบวงจร สรรหา คัดเลือก ทดสอบฝีมือ อบรม ตรวจสุขภาพ วีซ่า และดูแลระหว่างทำงาน สำหรับคนหางานและนายจ้างต่างประเทศที่ต้องการแรงงานไทย",
    en: "End-to-end recruitment of Thai workers for overseas employers: sourcing, screening, trade tests, training, medicals, visas and on-contract care. Licence T. 1307/2569."
  },
  schema: (c) => ({
    "@type": "Service", "@id": c.url() + "#service",
    name: c.L("บริการจัดหางานไปทำงานต่างประเทศ", "Overseas recruitment of Thai workers"),
    serviceType: "Overseas recruitment", provider: { "@id": SITE_URL + "/#org" },
    areaServed: ["SA", "AE", "OM", "KW", "AU", "NZ", "Europe", "Asia"],
    hasOfferCatalog: {
      "@type": "OfferCatalog", name: c.L("สายงาน", "Sectors"),
      itemListElement: Object.values(SECTORS).map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.L(s.th, s.en) } }))
    }
  }),
  body: (c) => pageHead(c, services,
    c.L("บริการจัดหางานต่างประเทศ ครบทุกขั้นตอน", "Overseas recruitment, every step covered"),
    c.L("สรรหาและคัดเลือกคนไทยไปทำงานต่างประเทศ ทั้งสายช่างฝีมือ โรงงาน เกษตร และงานบริการ สปา คุณไม่ต้องติดต่อหลายที่ เราดูแลเองทุกขั้นและแจ้งความคืบหน้าตลอด", "We recruit Thai workers for skilled trades, manufacturing, agriculture and hospitality abroad. No juggling agencies: we handle every stage ourselves and keep you updated."),
    `<div class="btn-row"><a class="btn btn-ink" href="jobs.html">${c.L("ดูตำแหน่งงาน", "See jobs")}</a><a class="btn btn-line" href="#employers">${c.L("สำหรับนายจ้าง", "For employers")}</a></div>`) + `
<section class="sec" aria-labelledby="svc-t">
  <div class="wrap">
    <div class="sh"><h2 id="svc-t" class="h2">${c.L("หกบริการที่ต่อกันเป็นเส้นทางเดียว", "Six services, one connected journey")}</h2></div>
    <ul class="svc" role="list">
      ${SERVICES.map(([ic, t, d]) => `<li>${icon(ic)}<h3>${t[c.lang]}</h3><p>${d[c.lang]}</p></li>`).join("")}
    </ul>
  </div>
</section>

<section class="sec sec--tint" aria-labelledby="sectors-t">
  <div class="wrap">
    <div class="sh"><h2 id="sectors-t" class="h2">${c.L("สายงานของเรา", "Our sectors")}</h2></div>
    ${sectorRows(c, true)}
  </div>
</section>

<section class="sec" aria-labelledby="dest-t">
  <div class="wrap">
    <div class="sh sh--row">
      <h2 id="dest-t" class="h2">${c.L("ประเทศที่เราส่งแรงงานไปทำงาน", "Where our workers go")}</h2>
      <p class="lead">${c.L("ทั้งประเทศที่เรามีผลงานแล้ว และเครือข่ายพันธมิตรที่พร้อมเปิดรับแรงงานไทย", "Countries with a placement track record, and partner networks ready to welcome Thai workers.")}</p>
    </div>
    ${stamps(c)}
  </div>
</section>

<section class="sec sec--ink" id="employers" aria-labelledby="emp-t">
  <div class="wrap emp">
    <div>
      <h2 id="emp-t" class="h2">${c.L("ต้องการแรงงานไทยที่พร้อมทำงานตั้งแต่วันแรก?", "Need Thai workers who are ready on day one?")}</h2>
      <p class="lead">${c.L("แจ้งตำแหน่ง จำนวน และคุณสมบัติที่ต้องการ เราจะเสนอรายชื่อผู้สมัครที่ผ่านการคัดกรอง และดำเนินการเอกสารทั้งหมดตามขั้นตอนของกรมการจัดหางาน", "Tell us the roles, headcount and requirements. We'll shortlist screened candidates and handle all paperwork under Thailand's Department of Employment procedures.")}</p>
      <div class="btn-row">
        <a class="btn btn-gold" href="contact.html?type=employer">${c.L("ส่งความต้องการ", "Send your requirements")}${icon("arrow")}</a>
        <a class="btn btn-ghost" href="mailto:${CO.email}">${icon("mail")}${CO.email}</a>
      </div>
    </div>
    <ul class="emp-l" role="list">
      <li>${icon("users")}<div><h3>${c.L("คัดกรองหลายชั้น", "Multi-stage screening")}</h3><p>${c.L("ตรวจประวัติ สัมภาษณ์ และทดสอบทักษะก่อนเสนอชื่อ", "Background checks, interviews and trade tests before shortlisting.")}</p></div></li>
      <li>${icon("scale")}<div><h3>${c.L("ถูกต้องตามกฎหมาย", "Fully compliant")}</h3><p>${c.L(`ใบอนุญาต ${CO.licenseTh} และเอกสารครบตามข้อกำหนด`, `Licence ${CO.licenseEn} and complete statutory paperwork.`)}</p></div></li>
      <li>${icon("handshake")}<div><h3>${c.L("ผู้ประสานงานคนเดียว", "One coordinator")}</h3><p>${c.L("ติดต่อจุดเดียวตั้งแต่รับเรื่องจนแรงงานเริ่มงาน", "A single contact from brief to first shift.")}</p></div></li>
      <li>${icon("heart")}<div><h3>${c.L("ติดตามหลังเริ่มงาน", "After-placement care")}</h3><p>${c.L("ดูแลแรงงานและช่วยประสานเมื่อมีปัญหา ให้การจ้างงานราบรื่น", "Ongoing worker support that keeps placements running smoothly.")}</p></div></li>
    </ul>
  </div>
</section>`
};

/* --------------------------------------------------------------- PROCESS */
const FAQ = [
  [{ th: "ไปทำงานต่างประเทศ มีค่าใช้จ่ายเท่าไร?", en: "How much does it cost to work abroad?" },
   { th: "ค่าใช้จ่ายแตกต่างกันตามประเทศและตำแหน่งงาน และต้องไม่เกินอัตราที่กรมการจัดหางานกำหนด เราแจ้งทุกรายการเป็นลายลักษณ์อักษรก่อนที่คุณจะตัดสินใจ และออกใบเสร็จในนามบริษัททุกครั้ง", en: "Costs vary by country and role and must stay within the rates set by the Department of Employment. We give you every item in writing before you decide, and issue a company receipt for every payment." }],
  [{ th: "ใช้เวลานานแค่ไหนกว่าจะได้เดินทาง?", en: "How long until I can travel?" },
   { th: "ขึ้นอยู่กับประเทศปลายทาง ขั้นตอนวีซ่า และความพร้อมของเอกสาร โดยทั่วไปประมาณ 2–4 เดือน เจ้าหน้าที่จะแจ้งกรอบเวลาของตำแหน่งที่คุณสมัครให้ชัดเจน", en: "It depends on the destination, the visa process and how ready your documents are, typically around 2–4 months. We'll give you the timeline for your specific role." }],
  [{ th: "ไม่เคยไปทำงานต่างประเทศ สมัครได้ไหม?", en: "Can I apply if I've never worked abroad?" },
   { th: "ได้ หลายตำแหน่งเปิดรับผู้ที่มีทักษะแต่ยังไม่เคยไปต่างประเทศ เราอบรมและเตรียมความพร้อมทั้งภาษา วัฒนธรรม และกฎระเบียบก่อนเดินทาง", en: "Yes. Many roles welcome skilled people going abroad for the first time. We prepare you with language, culture and rules training before you leave." }],
  [{ th: "ต้องพูดภาษาอังกฤษได้หรือไม่?", en: "Do I need to speak English?" },
   { th: "ขึ้นอยู่กับตำแหน่งและนายจ้าง บางตำแหน่งต้องการภาษาอังกฤษเบื้องต้น บางตำแหน่งเน้นฝีมือเป็นหลัก เราจะแจ้งระดับที่ต้องการและมีอบรมภาษาก่อนเดินทาง", en: "It depends on the role and employer. Some need basic English, others focus on skills. We'll tell you the level needed and provide language training before departure." }],
  [{ th: "สมัครงานต่างประเทศ ต้องใช้เอกสารอะไรบ้าง?", en: "Which documents do I need to apply?" },
   { th: "บัตรประชาชน ทะเบียนบ้าน หนังสือเดินทาง รูปถ่ายหน้าตรง วุฒิการศึกษาหรือใบรับรองฝีมือ และหนังสือรับรองการทำงาน (ถ้ามี) ถ้ายังไม่มีหนังสือเดินทาง เราช่วยแนะนำวิธีทำได้", en: "Thai ID card, house registration, passport, passport photos, education or trade certificate, and an employment reference if you have one. No passport yet? We'll show you how to get one." }],
  [{ th: "จะรู้ได้อย่างไรว่าบริษัทถูกกฎหมาย?", en: "How can I check you're a legal agency?" },
   { th: `ตรวจสอบใบอนุญาตจัดหางานเลขที่ ${CO.licenseTh} ได้ที่เว็บไซต์กรมการจัดหางาน (doe.go.th) หรือโทรสายด่วน 1694`, en: `Check our licence no. ${CO.licenseEn} on the Department of Employment website (doe.go.th) or call the 1694 hotline.` }],
  [{ th: "ระหว่างทำงานมีปัญหา ติดต่อใครได้บ้าง?", en: "Who do I contact if there's a problem at work?" },
   { th: "ติดต่อเจ้าหน้าที่ของเราได้โดยตรงตลอดสัญญา ทางโทรศัพท์ อีเมล หรือ Facebook และยังติดต่อสำนักงานแรงงานไทยหรือสถานเอกอัครราชทูตไทยในประเทศนั้นได้อีกทาง", en: "Contact our team directly throughout your contract by phone, email or Facebook. You can also reach the Thai Labour Office or Royal Thai Embassy in that country." }]
];

const DOCS = [
  [{ th: "บัตรประชาชน", en: "Thai ID card" }, { th: "ฉบับจริงและสำเนา", en: "Original and copy" }],
  [{ th: "ทะเบียนบ้าน", en: "House registration" }, { th: "สำเนา", en: "Copy" }],
  [{ th: "หนังสือเดินทาง", en: "Passport" }, { th: "ถ้ายังไม่มี เราช่วยแนะนำได้", en: "No passport yet? We'll guide you" }],
  [{ th: "รูปถ่ายหน้าตรง", en: "Passport photos" }, { th: "พื้นหลังสีขาว", en: "White background" }],
  [{ th: "วุฒิการศึกษา", en: "Education certificate" }, { th: "หรือใบรับรองฝีมือ", en: "Or a trade certificate" }],
  [{ th: "หนังสือรับรองการทำงาน", en: "Employment reference" }, { th: "ถ้ามี", en: "If you have one" }]
];

const stepList = (c, steps) => `<ol class="tl" role="list">` + steps.map(([t, d, items, you], i) => `
  <li class="tl-i">
    <span class="tl-n">${i + 1}</span>
    <div>
      <h3>${t[c.lang]}</h3>
      <p>${d[c.lang]}</p>
      ${items.length ? `<ul role="list">${items.map((x) => `<li>${icon("check")}${x[c.lang]}</li>`).join("")}</ul>` : ""}
      <p class="tl-you">${you[c.lang]}</p>
    </div>
  </li>`).join("") + `</ol>`;

const process = {
  id: "process", file: "process.html",
  crumb: { th: "ขั้นตอนการสมัคร", en: "How it works" },
  title: {
    th: "ขั้นตอนไปทำงานต่างประเทศ เอกสาร ค่าใช้จ่าย คำถามที่พบบ่อย",
    en: "How to Work Abroad from Thailand: Steps, Documents, FAQ | TG Oversea"
  },
  desc: {
    th: "ไปทำงานต่างประเทศต้องทำอย่างไร 4 ขั้นตอนตั้งแต่สมัครถึงเดินทาง เอกสารที่ต้องเตรียม ค่าใช้จ่าย ระยะเวลา และวิธีตรวจสอบบริษัทจัดหางานถูกกฎหมาย",
    en: "How working abroad from Thailand works: four steps from application to departure, the documents you need, costs, timelines, and how to check an agency is licensed."
  },
  schema: (c) => ({
    "@type": "FAQPage", "@id": c.url() + "#faq",
    mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q[c.lang], acceptedAnswer: { "@type": "Answer", text: a[c.lang] } }))
  }),
  body: (c) => pageHead(c, process,
    c.L("ขั้นตอนไปทำงานต่างประเทศ ชัดเจนตั้งแต่วันแรก", "How working abroad works, clear from day one"),
    c.L("รู้ล่วงหน้าว่าต้องทำอะไร เตรียมอะไร และเราดูแลส่วนไหนให้ ไม่มีขั้นตอนที่ซ่อนอยู่", "Know in advance what happens, what to prepare and what we take care of. No hidden steps."),
    `<nav class="toc" aria-label="${c.L("ในหน้านี้", "On this page")}"><a href="#worker">${c.L("สำหรับคนหางาน", "For job seekers")}</a><a href="#employer">${c.L("สำหรับนายจ้าง", "For employers")}</a><a href="#documents">${c.L("เอกสารที่ต้องใช้", "Documents")}</a><a href="#faq">${c.L("คำถามที่พบบ่อย", "FAQ")}</a></nav>`) + `
<section class="sec" id="worker" aria-labelledby="worker-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <h2 id="worker-t" class="h2">${c.L("สำหรับคนหางาน", "For job seekers")}</h2>
      <p class="lead">${c.L("4 ขั้นตอนจากวันสมัครจนถึงวันทำงานจริง พร้อมสิ่งที่คุณต้องเตรียมในแต่ละขั้น", "Four steps from applying to your first day at work, with what you need at each one.")}</p>
    </div>
    ${stepList(c, [
      [{ th: "ลงทะเบียนและคัดกรอง", en: "Register and screening" }, { th: "ส่งข้อมูลผ่านเว็บไซต์ โทรศัพท์ หรือมาที่สำนักงาน เจ้าหน้าที่จะสัมภาษณ์ ประเมินทักษะ และแนะนำตำแหน่งที่เหมาะกับคุณ", en: "Apply online, by phone or at our office. We interview you, assess your skills and suggest roles that suit you." },
        [{ th: "สัมภาษณ์และประเมินทักษะเบื้องต้น", en: "Interview and initial skills assessment" }, { th: "อธิบายตำแหน่ง ค่าใช้จ่าย และเงื่อนไขเป็นลายลักษณ์อักษร", en: "Role, costs and terms explained in writing" }],
        { th: "คุณเตรียม: บัตรประชาชน และประวัติการทำงาน", en: "You bring: ID card and work history" }],
      [{ th: "ทดสอบฝีมือและอบรม", en: "Skills test and training" }, { th: "ทดสอบฝีมือตามมาตรฐานของนายจ้าง และอบรมความรู้ที่จำเป็นก่อนไปทำงานจริง", en: "Trade-test to the employer's standard, then training for what you'll need on the job." },
        [{ th: "ทดสอบฝีมือหรือสัมภาษณ์กับนายจ้าง", en: "Skills test or employer interview" }, { th: "อบรมภาษา วัฒนธรรม และกฎหมายประเทศปลายทาง", en: "Language, culture and local-law training" }],
        { th: "คุณเตรียม: ใบรับรองหรือวุฒิที่เกี่ยวข้อง", en: "You bring: relevant certificates" }],
      [{ th: "เอกสาร วีซ่า และตรวจสุขภาพ", en: "Documents, visa and medical" }, { th: "เราดำเนินการเอกสารทั้งหมด ตั้งแต่สัญญาจ้างจนถึงการขออนุญาตเดินทางจากกรมการจัดหางาน", en: "We handle the paperwork, from your employment contract to departure approval from the Department of Employment." },
        [{ th: "ตรวจสุขภาพกับสถานพยาบาลที่ได้รับการรับรอง", en: "Medical at an approved clinic" }, { th: "ยื่นวีซ่าทำงานและใบอนุญาตทำงาน", en: "Work visa and permit applications" }, { th: "ปฐมนิเทศก่อนเดินทางตามข้อกำหนด", en: "Mandatory pre-departure orientation" }],
        { th: "คุณเตรียม: หนังสือเดินทาง (เราช่วยแนะนำได้)", en: "You bring: passport (we can help)" }],
      [{ th: "เดินทางและดูแลต่อเนื่อง", en: "Departure and aftercare" }, { th: "เดินทางถึงที่ทำงานอย่างปลอดภัย และมีเจ้าหน้าที่ดูแลคุณตลอดระยะเวลาสัญญา", en: "Arrive safely at your workplace, with our team looking out for you for your whole contract." },
        [{ th: "ประสานการรับที่สนามบินและที่พัก", en: "Airport pick-up and housing coordinated" }, { th: "ติดตามความเป็นอยู่และเป็นตัวกลางกับนายจ้าง", en: "Welfare check-ins and employer liaison" }],
        { th: "เราดูแล: ตลอดระยะสัญญา", en: "We stay with you: the whole contract" }]
    ])}
  </div>
</section>

<section class="sec sec--tint" id="employer" aria-labelledby="employer-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <h2 id="employer-t" class="h2">${c.L("สำหรับนายจ้าง", "For employers")}</h2>
      <p class="lead">${c.L("จากใบแจ้งความต้องการ ถึงแรงงานที่เริ่มงานที่ไซต์ของคุณ", "From your job order to workers starting on your site.")}</p>
      <a class="btn btn-ink" href="contact.html?type=employer">${c.L("ส่งความต้องการ", "Send your requirements")}</a>
    </div>
    ${stepList(c, [
      [{ th: "แจ้งความต้องการ", en: "Share your requirements" }, { th: "ระบุตำแหน่ง จำนวน คุณสมบัติ เงื่อนไขการจ้าง ที่พัก และสวัสดิการ เพื่อให้เราวางแผนการสรรหาได้ตรงจุด", en: "Positions, headcount, qualifications, terms, housing and benefits, so we can plan sourcing precisely." }, [], { th: "คุณส่ง: Job order และเงื่อนไขการจ้าง", en: "You send: job order and terms" }],
      [{ th: "สรรหาและคัดเลือก", en: "Sourcing and shortlisting" }, { th: "คัดกรองประวัติ ทดสอบฝีมือ และจัดสัมภาษณ์ทางวิดีโอหรือที่ประเทศไทย ให้คุณเลือกผู้สมัครที่ใช่", en: "Screening, trade tests and interviews by video or in Thailand, so you choose the right people." }, [], { th: "คุณเลือก: ผู้สมัครจาก shortlist", en: "You choose: from the shortlist" }],
      [{ th: "เอกสารและการอนุญาต", en: "Compliance and processing" }, { th: "จัดทำสัญญาจ้าง ขออนุมัติจากกรมการจัดหางาน ตรวจสุขภาพ และยื่นวีซ่า ครบถ้วนถูกต้องตามกฎหมาย", en: "Contracts, Department of Employment approval, medicals and visas, complete and compliant." }, [], { th: "คุณลงนาม: สัญญาจ้างและเอกสารนายจ้าง", en: "You sign: contracts and employer documents" }],
      [{ th: "ส่งตัวและติดตามผล", en: "Deployment and follow-up" }, { th: "ส่งแรงงานถึงสถานที่ทำงาน ช่วยปรับตัวช่วงแรก และติดตามผลต่อเนื่องตลอดสัญญา", en: "Workers delivered to site, supported through onboarding and followed up throughout the contract." }, [], { th: "เราดูแล: ตลอดระยะสัญญา", en: "We stay involved: the whole contract" }]
    ])}
  </div>
</section>

<section class="sec" id="documents" aria-labelledby="docs-t">
  <div class="wrap split">
    <div class="sh">
      <h2 id="docs-t" class="h2">${c.L("เอกสารที่ต้องใช้ในการสมัคร", "Documents you'll need")}</h2>
      <p class="lead">${c.L("ติ๊กรายการที่คุณมีแล้วเพื่อดูว่าพร้อมแค่ไหน ขาดอะไรไป เจ้าหน้าที่ช่วยแนะนำวิธีเตรียมได้", "Tick what you already have to see how ready you are. Missing something? We'll show you how to get it.")}</p>
    </div>
    <fieldset class="docs">
      <legend class="sr">${c.L("รายการเอกสาร", "Document checklist")}</legend>
      ${DOCS.map(([t, d], i) => `<label class="doc"><input type="checkbox" name="doc${i}"><span class="doc-box">${icon("check")}</span><span><b>${t[c.lang]}</b><small>${d[c.lang]}</small></span></label>`).join("")}
      <p class="docs-sum" aria-hidden="true"><span class="docs-n"></span>${c.L(" จาก 6 รายการ", " of 6 ready")}</p>
    </fieldset>
  </div>
</section>

<section class="sec sec--tint" id="faq" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <h2 id="faq-t" class="h2">${c.L("คำถามที่พบบ่อย", "Frequently asked questions")}</h2>
      <p class="lead">${c.L("ไม่เจอคำตอบที่ต้องการ? โทร ", "Can't find your answer? Call ")}<a href="tel:${CO.tel}">${CO.phone}</a></p>
    </div>
    <div class="faq">
      ${FAQ.map(([q, a], i) => `<details name="faq"${i === 0 ? " open" : ""}><summary><h3>${q[c.lang]}</h3><span class="faq-pm" aria-hidden="true"></span></summary><p>${a[c.lang]}</p></details>`).join("")}
    </div>
  </div>
</section>

${scamChecks(c)}`
};

/* ----------------------------------------------------------------- ABOUT */
const about = {
  id: "about", file: "about.html", schemaType: "AboutPage",
  crumb: { th: "เกี่ยวกับเรา", en: "About" },
  title: {
    th: "เกี่ยวกับเรา | บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด",
    en: "About Us | TG Oversea Solutions, Licence T. 1307/2569"
  },
  desc: {
    th: "บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น ก่อตั้งปี 2568 ต่อยอดประสบการณ์บริหารแรงงานกว่า 5 ปีจาก T.G. Labor ได้รับใบอนุญาตจัดหางานไปต่างประเทศ ต. 1307/2569",
    en: "Founded in 2025 on five-plus years of workforce management at T.G. Labor, TG Oversea Solutions holds overseas recruitment licence T. 1307/2569."
  },
  body: (c) => pageHead(c, about,
    c.L("มาตรฐานใหม่ของการไปทำงานต่างประเทศ", "A new standard for working abroad"),
    c.L("เราเชื่อว่าการไปทำงานต่างประเทศควรเป็นก้าวที่ปลอดภัย ชัดเจน และเปลี่ยนชีวิตให้ดีขึ้นจริง ไม่ใช่ความเสี่ยงที่ต้องลุ้น", "We believe going abroad for work should be a safe, clear step that genuinely improves lives, not a gamble.")) + `
<section class="sec" aria-labelledby="story-t">
  <div class="wrap split">
    <div class="sh">
      <h2 id="story-t" class="h2">${c.L("ต่อยอดประสบการณ์ สู่ระดับสากล", "Proven experience, taken global")}</h2>
      <p class="lead">${c.L("บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด ก่อตั้งเมื่อวันที่ 28 ตุลาคม 2568 เพื่อเปิดทางให้แรงงานไทยเข้าถึงงานที่เหมาะสมในต่างประเทศ อย่างปลอดภัย โปร่งใส และถูกต้องตามกฎหมาย โดยมีพื้นฐานจากบริษัทในเครือ T.G. Labor Co., Ltd.", "TG Oversea Solutions Recruitment Co., Ltd. was founded on 28 October 2025 to open safe, transparent and legal pathways for Thai workers to suitable jobs abroad, building on our sister company T.G. Labor Co., Ltd.")}</p>
    </div>
    <ol class="tl tl--time" role="list">
      <li class="tl-i"><span class="tl-n"><time>${c.L("ก่อน 2568", "Pre-2025")}</time></span><div><h3>${c.L("รากฐานจาก T.G. Labor", "Roots in T.G. Labor")}</h3><p>${c.L("ทีมงานสั่งสมประสบการณ์บริหารจัดการแรงงานมากกว่า 5 ปี ทั้งด้านกฎหมายแรงงาน การดูแลสุขภาพ และการประสานงานกับนายจ้าง", "More than five years managing workforces, covering labour law, health and employer coordination.")}</p></div></li>
      <li class="tl-i"><span class="tl-n"><time datetime="2025-10-28">${c.L("28 ต.ค. 2568", "28 Oct 2025")}</time></span><div><h3>${c.L("ก่อตั้ง TG Oversea Solutions", "TG Oversea Solutions founded")}</h3><p>${c.L("ตั้งบริษัทเพื่อทำงานด้านการจัดหางานต่างประเทศโดยเฉพาะ ด้วยหลักการยึดแรงงานเป็นศูนย์กลางและความโปร่งใส", "A company dedicated to international recruitment, built on worker-centred and transparent principles.")}</p></div></li>
      <li class="tl-i"><span class="tl-n"><time datetime="2026">${c.L("2569", "2026")}</time></span><div><h3>${c.L(`ได้รับใบอนุญาต ${CO.licenseTh}`, `Licence ${CO.licenseEn} granted`)}</h3><p>${c.L("ได้รับอนุญาตให้จัดหางานเพื่อไปทำงานต่างประเทศจากกรมการจัดหางาน กระทรวงแรงงาน", "Licensed by the Department of Employment, Ministry of Labour, to recruit for overseas work.")}</p></div></li>
      <li class="tl-i"><span class="tl-n">${c.L("วันนี้", "Today")}</span><div><h3>${c.L("เครือข่ายใน 4 ภูมิภาค", "A network across four regions")}</h3><p>${c.L("ส่งนักนวดไทยและผู้เชี่ยวชาญสปาไปซาอุดีอาระเบีย โอมาน คูเวต ยูเออี และยุโรป พร้อมเครือข่ายพันธมิตรในออสเตรเลียและนิวซีแลนด์", "Thai massage and spa specialists placed in Saudi Arabia, Oman, Kuwait, the UAE and Europe, with partner networks in Australia and New Zealand.")}</p></div></li>
    </ol>
  </div>
</section>

<section class="sec sec--ink" aria-labelledby="vision-t">
  <div class="wrap vm">
    <div>
      <h2 id="vision-t" class="h3 vm-k">${c.L("วิสัยทัศน์", "Vision")}</h2>
      <p class="vm-v">${c.L("เป็นบริษัทจัดหางานต่างประเทศที่แรงงานไทยและนายจ้างทั่วโลกไว้วางใจมากที่สุด ด้วยความโปร่งใสและการดูแลที่ใส่ใจทุกคน", "To be the overseas recruitment agency Thai workers and employers worldwide trust most, for its transparency and the care it gives every person.")}</p>
    </div>
    <div>
      <h2 class="h3 vm-k">${c.L("พันธกิจ", "Mission")}</h2>
      <ol class="vm-l" role="list">
        <li>${c.L("สรรหาและคัดเลือกแรงงานไทยที่มีคุณภาพ ตรงกับความต้องการของนายจ้าง", "Recruit and select quality Thai workers matched to each employer's needs.")}</li>
        <li>${c.L("ดำเนินงานถูกต้องตามกฎหมาย โปร่งใส และตรวจสอบได้ทุกขั้นตอน", "Operate legally and transparently, with every step open to verification.")}</li>
        <li>${c.L("เตรียมความพร้อมแรงงานด้วยการอบรมทักษะ ภาษา และวัฒนธรรมก่อนเดินทาง", "Prepare workers with skills, language and cultural training before departure.")}</li>
        <li>${c.L("ดูแลความปลอดภัยและคุณภาพชีวิตของแรงงานตลอดระยะสัญญา", "Protect workers' safety and quality of life for the full contract.")}</li>
      </ol>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="pr-t">
  <div class="wrap">
    <div class="sh"><h2 id="pr-t" class="h2">${c.L("ความไว้วางใจ สร้างจากวิธีทำงาน", "Trust is built in how we work")}</h2></div>
    <ul class="principles" role="list">
      <li>${icon("heart")}<h3>${c.L("ยึดแรงงานเป็นศูนย์กลาง", "People first")}</h3><p>${c.L("ให้ความสำคัญกับความปลอดภัย ที่พัก และสวัสดิการของแรงงานตลอดระยะสัญญา", "Workers' safety, housing and benefits come first for the whole contract.")}</p></li>
      <li>${icon("eye")}<h3>${c.L("โปร่งใส ตรวจสอบได้", "Nothing hidden")}</h3><p>${c.L("ค่าใช้จ่าย เงื่อนไข และสัญญาจ้าง แจ้งเป็นลายลักษณ์อักษร ตรวจสอบได้ทุกขั้นตอน", "Costs, conditions and contracts in writing, checkable at every step.")}</p></li>
      <li>${icon("globe")}<h3>${c.L("เครือข่ายระหว่างประเทศ", "International network")}</h3><p>${c.L("นายจ้างและเอเจนซีพันธมิตรในตะวันออกกลาง ออสเตรเลีย นิวซีแลนด์ ยุโรป และเอเชีย", "Employers and partner agencies across the Middle East, Australia, New Zealand, Europe and Asia.")}</p></li>
      <li>${icon("scale")}<h3>${c.L("ผู้บริหารมืออาชีพ", "Experienced leadership")}</h3><p>${c.L("ประสบการณ์ด้านกฎหมายแรงงาน การแพทย์ และการบริหารจัดการแรงงาน", "Backgrounds in labour law, medicine and workforce management.")}</p></li>
    </ul>
  </div>
</section>

<!-- ทีมผู้บริหาร: ใส่ชื่อ-นามสกุลจริงและรูปถ่ายในแต่ละ <li> เพื่อเพิ่มความน่าเชื่อถือ (E-E-A-T) -->
<section class="sec sec--tint" aria-labelledby="team-t">
  <div class="wrap split">
    <div class="sh">
      <h2 id="team-t" class="h2">${c.L("ทีมผู้บริหาร", "Leadership")}</h2>
      <p class="lead">${c.L("ประสบการณ์ทั้งด้านกฎหมายแรงงาน การแพทย์ และการบริหารแรงงาน ทำให้เรามองเห็นทุกมิติของการไปทำงานต่างประเทศ", "Backgrounds in labour law, medicine and workforce management let us see every side of working abroad.")}</p>
    </div>
    <ul class="team" role="list">
      <li><h3>${c.L("กรรมการผู้จัดการ", "Managing Director")}</h3><p>${c.L("กำหนดทิศทางองค์กร ดูแลมาตรฐานการทำงาน และความสัมพันธ์กับพันธมิตรต่างประเทศ", "Sets company direction, owns our standards and leads overseas partnerships.")}</p></li>
      <li><h3>${c.L("ที่ปรึกษาด้านกฎหมายแรงงาน", "Labour law advisor")}</h3><p>${c.L("ตรวจสอบสัญญาจ้างและขั้นตอนให้ถูกต้องตามกฎหมายไทยและประเทศปลายทาง", "Reviews contracts and procedures against Thai and destination-country law.")}</p></li>
      <li><h3>${c.L("ที่ปรึกษาด้านการแพทย์", "Medical advisor")}</h3><p>${c.L("ดูแลมาตรฐานการตรวจสุขภาพและความพร้อมด้านร่างกายก่อนเดินทาง", "Oversees medical screening and fitness-to-travel standards.")}</p></li>
      <li><h3>${c.L("ผู้จัดการฝ่ายสรรหาและต่างประเทศ", "Recruitment and overseas manager")}</h3><p>${c.L("คัดเลือกผู้สมัคร ประสานงานกับนายจ้าง และดูแลแรงงานระหว่างสัญญา", "Selects candidates, coordinates with employers and supports workers on contract.")}</p></li>
    </ul>
  </div>
</section>

<section class="sec" id="licence" aria-labelledby="lic-t">
  <div class="wrap lic">
    <div>
      <h2 id="lic-t" class="h2">${c.L("ถูกกฎหมาย ตรวจสอบได้ทุกเมื่อ", "Fully licensed. Check us any time.")}</h2>
      <ul class="lic-l" role="list">
        <li>${icon("check")}${c.L(`ได้รับใบอนุญาตจัดหางานไปทำงานต่างประเทศ เลขที่ ${CO.licenseTh} จากกรมการจัดหางาน`, `Overseas recruitment licence no. ${CO.licenseEn} from the Department of Employment`)}</li>
        <li>${icon("check")}${c.L("ตรวจสอบรายชื่อบริษัทได้ที่เว็บไซต์กรมการจัดหางาน หรือโทรสายด่วน 1694", "Verify us on the department's website or via its 1694 hotline")}</li>
        <li>${icon("check")}${c.L("สัญญาจ้างและค่าใช้จ่ายทุกรายการเป็นลายลักษณ์อักษร ตามอัตราที่กฎหมายกำหนด", "Written contracts and itemised fees within legally permitted rates")}</li>
        <li>${icon("check")}${c.L("แรงงานทุกคนผ่านการปฐมนิเทศก่อนเดินทางตามข้อกำหนดของกรมการจัดหางาน", "Every worker completes the department's pre-departure orientation")}</li>
      </ul>
    </div>
    ${certificate(c, { id: "cert-about" })}
  </div>
</section>`
};

/* --------------------------------------------------------------- CONTACT */
const contact = {
  id: "contact", file: "contact.html", schemaType: "ContactPage",
  crumb: { th: "ติดต่อเรา", en: "Contact" },
  title: {
    th: "ติดต่อบริษัทจัดหางานต่างประเทศ ปทุมธานี โทร 083-157-0465 | TG Oversea",
    en: "Contact TG Oversea Solutions, Pathum Thani | +66 83 157 0465"
  },
  desc: {
    th: "ปรึกษาเรื่องไปทำงานต่างประเทศฟรี โทร 083-157-0465 อีเมล tg.oversea.solutions@gmail.com สำนักงาน 91/144 หมู่ 9 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี",
    en: "Talk to a licensed Thai recruitment agency. Call +66 83 157 0465, email tg.oversea.solutions@gmail.com, or visit us in Khlong Luang, Pathum Thani."
  },
  body: (c) => pageHead(c, contact,
    c.L("คุยกับเรา ก่อนตัดสินใจ", "Talk to us before you decide"),
    c.L("ปรึกษาฟรี ไม่มีข้อผูกมัด ทั้งคนหางานและนายจ้าง ฝากข้อมูลไว้แล้วเจ้าหน้าที่จะติดต่อกลับ หรือโทรหาเราได้เลย", "Free, no-obligation advice for job seekers and employers. Leave your details and we'll call you back, or ring us now.")) + `
<section class="sec" aria-label="${c.L("ช่องทางติดต่อและแบบฟอร์ม", "Contact details and form")}">
  <div class="wrap contact">
    <div class="ch">
      <h2 class="h3">${c.L("ช่องทางติดต่อ", "Reach us directly")}</h2>
      <ul class="ch-l" role="list">
        <li>${icon("phone")}<div><span>${c.L("โทรศัพท์", "Phone")}</span><a href="tel:${CO.tel}">${CO.phone}</a></div></li>
        <li>${icon("mail")}<div><span>${c.L("อีเมล", "Email")}</span><a href="mailto:${CO.email}">${CO.email}</a></div></li>
        <li>${icon("facebook")}<div><span>Facebook</span><a href="${CO.facebook}" rel="noopener" target="_blank">TG Oversea Solutions</a></div></li>
        <li>${icon("pin")}<div><span>${c.L("สำนักงาน", "Office")}</span><address>${c.L(CO.addrTh, CO.addrEn)}</address><a href="${CO.mapsUrl}" rel="noopener" target="_blank">${c.L("นำทางด้วย Google Maps", "Get directions")}${icon("arrowUR")}</a></div></li>
        <li>${icon("shield")}<div><span>${c.L("ใบอนุญาตจัดหางานไปต่างประเทศ", "Overseas recruitment licence")}</span><b>${c.L(CO.licenseTh, CO.licenseEn)}</b></div></li>
      </ul>
    </div>

    <form class="form" action="mailto:${CO.email}" method="post" enctype="text/plain" data-contact novalidate>
      <h2 class="h3">${c.L("ฝากข้อมูลให้เราติดต่อกลับ", "Leave your details")}</h2>
      <p class="form-hint">${c.L("ช่องที่มีเครื่องหมาย * ต้องกรอก", "Fields marked * are required")}</p>
      <fieldset class="seg">
        <legend class="sr">${c.L("คุณคือ", "I am")}</legend>
        <label><input type="radio" name="type" value="worker" checked>${icon("person")}${c.L("ฉันกำลังหางาน", "I'm looking for work")}</label>
        <label><input type="radio" name="type" value="employer">${icon("building")}${c.L("ฉันเป็นนายจ้าง", "I'm an employer")}</label>
      </fieldset>
      <p class="form-job" data-jobnote hidden>${c.L("สมัครตำแหน่ง:", "Applying for:")} <b></b></p>
      <input type="hidden" name="job">
      <script type="application/json" data-jobnames>${JSON.stringify(Object.fromEntries(JOBS.map((j) => [j.id, `${j.title[c.lang]} — ${j.city[c.lang] === COUNTRIES[j.country][c.lang] ? COUNTRIES[j.country][c.lang] : j.city[c.lang] + ", " + COUNTRIES[j.country][c.lang]}`]))).replace(/</g, "\u003c")}</script>

      <fieldset class="grp grp--worker" data-grp="worker">
        <legend class="sr">${c.L("ข้อมูลผู้สมัคร", "Your details")}</legend>
        <div class="fld"><label for="w-name">${c.L("ชื่อ–นามสกุล", "Full name")} *</label><input id="w-name" name="name" required autocomplete="name"><small class="err">${c.L("กรอกชื่อ–นามสกุล", "Enter your name")}</small></div>
        <div class="fld"><label for="w-phone">${c.L("เบอร์โทรศัพท์", "Phone number")} *</label><input id="w-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel"><small class="err">${c.L("กรอกเบอร์โทรที่ติดต่อได้", "Enter a phone number we can reach")}</small></div>
        <div class="fld"><label for="w-sector">${c.L("สายงานที่สนใจ", "Sector of interest")}</label><select id="w-sector" name="sector">${sectorOptions(c, c.L("ยังไม่แน่ใจ", "Not sure yet"))}</select></div>
        <div class="fld"><label for="w-country">${c.L("ประเทศที่สนใจ", "Preferred country")}</label><select id="w-country" name="country">${countryOptions(c, c.L("ยังไม่แน่ใจ", "Not sure yet"))}</select></div>
        <div class="fld fld--full"><label for="w-email">${c.L("อีเมล (ถ้ามี)", "Email (optional)")}</label><input id="w-email" name="email" type="email" autocomplete="email"><small class="err">${c.L("รูปแบบอีเมลไม่ถูกต้อง", "This email address isn't valid")}</small></div>
      </fieldset>

      <fieldset class="grp grp--employer" data-grp="employer" disabled>
        <legend class="sr">${c.L("ข้อมูลนายจ้าง", "Company details")}</legend>
        <div class="fld"><label for="e-company">${c.L("ชื่อบริษัท", "Company")} *</label><input id="e-company" name="company" required autocomplete="organization"><small class="err">${c.L("กรอกชื่อบริษัท", "Enter your company name")}</small></div>
        <div class="fld"><label for="e-name">${c.L("ชื่อผู้ติดต่อ", "Contact person")} *</label><input id="e-name" name="name" required autocomplete="name"><small class="err">${c.L("กรอกชื่อผู้ติดต่อ", "Enter a contact name")}</small></div>
        <div class="fld"><label for="e-email">${c.L("อีเมล", "Email")} *</label><input id="e-email" name="email" type="email" required autocomplete="email"><small class="err">${c.L("กรอกอีเมลให้ถูกต้อง", "Enter a valid email")}</small></div>
        <div class="fld"><label for="e-phone">${c.L("โทรศัพท์ / WhatsApp", "Phone / WhatsApp")}</label><input id="e-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="fld"><label for="e-country">${c.L("ประเทศของนายจ้าง", "Employer's country")}</label><input id="e-country" name="employer_country" autocomplete="country-name"></div>
        <div class="fld"><label for="e-roles">${c.L("ตำแหน่งและจำนวนที่ต้องการ", "Roles and headcount")}</label><input id="e-roles" name="positions"></div>
      </fieldset>

      <div class="fld fld--full"><label for="f-msg">${c.L("รายละเอียดเพิ่มเติม เช่น ประสบการณ์ หรือคำถาม", "Anything else, such as experience or questions")}</label><textarea id="f-msg" name="message" rows="4"></textarea></div>
      <label class="consent"><input type="checkbox" name="consent" required><span>${c.L("ยินยอมให้บริษัทใช้ข้อมูลนี้เพื่อติดต่อกลับเรื่องการจัดหางานเท่านั้น", "I agree TG may use these details only to contact me about recruitment.")}</span></label>
      <small class="err err--consent">${c.L("กรุณาติ๊กยินยอมก่อนส่ง", "Tick the box to agree before sending")}</small>
      <button class="btn btn-ink btn-block" type="submit">${c.L("ส่งข้อมูล", "Send details")}${icon("arrow")}</button>
      <p class="form-hint">${c.L("เมื่อกดส่ง ระบบจะเปิดแอปอีเมลของคุณพร้อมข้อความที่กรอกไว้", "Sending opens your email app with your message ready.")}</p>
      <div class="form-done" data-done hidden tabindex="-1">
        ${icon("check")}
        <div><h3>${c.L("เตรียมข้อความเรียบร้อย", "Your message is ready")}</h3><p>${c.L(`กดส่งในแอปอีเมลที่เปิดขึ้นมา หากแอปไม่เปิด โทรหาเราได้ที่ ${CO.phone}`, `Press send in the email app that opened. If nothing opened, call us on ${CO.phone}.`)}</p></div>
      </div>
    </form>
  </div>
</section>

<section class="map" aria-label="${c.L("แผนที่สำนักงาน", "Office map")}">
  <iframe title="${c.L("แผนที่สำนักงาน TG Oversea Solutions", "Map of the TG Oversea Solutions office")}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    src="https://maps.google.com/maps?q=91%2F144%20Moo%209%20Khlong%20Nueng%2C%20Khlong%20Luang%2C%20Pathum%20Thani%2012120&amp;z=15&amp;output=embed"></iframe>
</section>`
};

export const PAGES = [home, jobs, services, process, about, contact];
