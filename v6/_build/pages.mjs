/* v6 page definitions. Each page is written once with c.L(thai, english). */
import { SITE_URL, CO, SECTORS, COUNTRIES, EMIT_JOB_POSTING } from "./site.mjs";
import { icon, crumbs } from "./layout.mjs";
import { photo, photoUrl } from "./img.mjs";
import {
  SECTOR_INFO, TRACK, tracker, licenceCard, jobRow, jobCard, STEPS, stepsTrack, promises, destList, worldMap,
  FAQ, faqList, scamChecks, countryOptions, sectorOptions, JOBS, jobPlace, heroBoard, heroDocs, heroSectors
} from "./content.mjs";

const preloadImg = (name) => (c) => `<link rel="preload" as="image" href="${photoUrl(c, name)}" imagesrcset="${photoUrl(c, name, 640)} 640w, ${photoUrl(c, name)} 1280w" imagesizes="(max-width: 900px) 100vw, 50vw" fetchpriority="high">`;

const sh = (c, { id, kick, ic, h, lead = "", cls = "" }) => `<div class="sh${cls ? " " + cls : ""}">
      ${kick ? `<p class="kick">${icon(ic)}${kick}</p>` : ""}
      <h2 id="${id}" class="h2" data-split>${h}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ""}
    </div>`;

const pageHero = (c, page, h1, lead, img, alt, extra = "") => `
<section class="phero" id="top" aria-labelledby="ph-t">
  <div class="wrap phero-in">
    <div class="phero-copy">
      ${crumbs(c, page)}
      <h1 id="ph-t" class="h1 h1--page" data-split>${h1}</h1>
      <p class="lead" data-reveal style="--d:2">${lead}</p>
      ${extra}
    </div>
    <div class="phero-img" data-reveal="img">${photo(c, img, alt, { sizes: "(max-width: 900px) 100vw, 46vw", eager: true, high: true })}</div>
  </div>
</section>`;

/* ------------------------------------------------------------------ HOME */
const home = {
  id: "home", file: "index.html", ogImage: "craft",
  title: {
    th: "บริษัทจัดหางานต่างประเทศ ถูกกฎหมาย ใบอนุญาต ต. 1307/2569 | TG Oversea Solutions",
    en: "Licensed Overseas Recruitment Agency in Thailand | TG Oversea Solutions"
  },
  desc: {
    th: "หางานต่างประเทศกับบริษัทจัดหางานที่ได้รับอนุญาตจากกรมการจัดหางาน ใบอนุญาต ต. 1307/2569 งานนวดแผนไทย สปา ช่าง โรงงาน เกษตร ในซาอุฯ ยูเออี โอมาน คูเวต ออสเตรเลีย นิวซีแลนด์ ยุโรป แจ้งค่าใช้จ่ายชัดเจน ดูแลตลอดสัญญา",
    en: "Licensed Thai recruitment agency (T. 1307/2569) placing Thai workers in spa, trades, manufacturing and farm jobs in the Gulf, Australia, New Zealand, Europe and Asia. Clear costs, written contracts, support throughout."
  },
  preload: preloadImg("craft"),
  schema: (c) => ({ "@type": "FAQPage", "@id": c.url() + "#faq", mainEntity: FAQ.slice(0, 4).map(([q, a]) => ({ "@type": "Question", name: q[c.lang], acceptedAnswer: { "@type": "Answer", text: a[c.lang] } })) }),
  body: (c) => `
<section class="hero" id="top" aria-labelledby="hero-t">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="hero-k" data-reveal>${icon("badge")}${c.L("บริษัทจัดหางานไปต่างประเทศ ที่ได้รับอนุญาต", "A licensed overseas recruitment agency")}</p>
      <h1 id="hero-t" class="h1" data-split>${c.L("ไปทำงานต่างประเทศ อย่างถูกกฎหมาย และรู้ทุกขั้นตอน ก่อนออกเดินทาง", "Work abroad legally, knowing every step before you go")}</h1>
      <p class="lead" data-reveal style="--d:3">${c.L("เราคัดงานจากนายจ้างที่ตรวจสอบแล้ว แจ้งค่าใช้จ่ายทุกรายการเป็นลายลักษณ์อักษร และมีเจ้าหน้าที่ดูแลคุณจนจบสัญญา", "We work with checked employers, put every cost in writing, and stay with you until your contract ends.")}</p>
      <form class="hsearch" action="jobs.html" method="get" role="search" aria-label="${c.L("ค้นหางาน", "Find a job")}" data-reveal style="--d:4">
        <div class="hsearch-f"><label for="h-sector">${c.L("สายงาน", "Sector")}</label><select id="h-sector" name="sector">${sectorOptions(c, c.L("ทุกสายงาน", "All sectors"))}</select></div>
        <div class="hsearch-f"><label for="h-country">${c.L("ประเทศ", "Country")}</label><select id="h-country" name="country">${countryOptions(c, c.L("ทุกประเทศ", "All countries"))}</select></div>
        <button class="btn btn-ac" type="submit">${icon("search")}${c.L("ค้นหางาน", "Find jobs")}</button>
      </form>
      <ul class="hero-trust" role="list" data-reveal style="--d:5">
        <li>${icon("check")}${c.L("ค่าใช้จ่ายเป็นลายลักษณ์อักษร", "Costs in writing")}</li>
        <li>${icon("check")}${c.L("ใบเสร็จในนามบริษัท", "Company receipts")}</li>
        <li>${icon("check")}${c.L("สัญญาจ้างภาษาไทย", "Thai-language contract")}</li>
      </ul>
    </div>
    <div class="hero-vis">
      <div class="hv hv--track">
        <div class="hero-ph" data-reveal="img">
          ${TRACK.map((t, i) => photo(c, t.img, i === 0 ? SECTOR_INFO.skilled.alt[c.lang] : "", { sizes: "(max-width: 900px) 92vw, 44vw", eager: i === 0, high: i === 0, cls: i === 0 ? "is-on" : "" })).join("\n          ")}
        </div>
        <div class="hero-trk" data-reveal="pop" style="--d:3">${tracker(c)}</div>
        <p class="hero-chip" data-reveal="pop" style="--d:5">${icon("receipt")}<span><b>${c.L("ใบเสร็จทุกครั้ง", "Receipt every time")}</b><small>${c.L("ในนามบริษัท ไม่โอนบัญชีส่วนตัว", "Company account only")}</small></span></p>
      </div>
      <div class="hv hv--board">${heroBoard(c)}</div>
      <div class="hv hv--docs">${heroDocs(c)}</div>
      <div class="hv hv--sectors">${heroSectors(c)}</div>
    </div>
  </div>
  <div class="wrap">
    <dl class="facts" data-reveal style="--d:6">
      <div><dt>${c.L("ใบอนุญาตกรมการจัดหางาน", "Department of Employment licence")}</dt><dd>${c.L(CO.licenseTh, CO.licenseEn)}</dd></div>
      <div><dt>${c.L("ประเทศและภูมิภาคปลายทาง", "Destination countries and regions")}</dt><dd><span data-count="8">8</span></dd></div>
      <div><dt>${c.L("สายงานที่จัดหา", "Sectors we recruit for")}</dt><dd><span data-count="4">4</span></dd></div>
      <div><dt>${c.L("ประสบการณ์บริหารแรงงานของทีม", "Team experience in workforce management")}</dt><dd><span data-count="5">5</span>+ <small>${c.L("ปี", "yrs")}</small></dd></div>
    </dl>
  </div>
</section>

<section class="sec verify" id="verify" aria-labelledby="verify-t">
  <div class="wrap verify-in">
    <div>
      ${sh(c, { id: "verify-t", kick: c.L("ความน่าเชื่อถือ", "Trust"), ic: "shield", h: c.L("อย่าเพิ่งเชื่อเรา ตรวจสอบเราก่อน", "Don't take our word for it. Check us."), lead: c.L("บริษัทจัดหางานไปต่างประเทศทุกแห่งต้องมีใบอนุญาตจากกรมการจัดหางาน ตรวจสอบได้ฟรี ใช้เวลาไม่กี่นาที", "Every overseas recruiter in Thailand must be licensed by the Department of Employment. Checking is free and takes a few minutes.") })}
      <ol class="vsteps" role="list">
        <li data-reveal><span class="vsteps-n">1</span><div><h3>${c.L("จดเลขใบอนุญาตของเรา", "Note our licence number")}</h3><p>${c.L(`เลขที่ ${CO.licenseTh} อยู่บนสัญญาและใบเสร็จทุกฉบับ`, `No. ${CO.licenseEn} is printed on every contract and receipt`)}</p></div></li>
        <li data-reveal style="--d:1"><span class="vsteps-n">2</span><div><h3>${c.L("ตรวจที่ doe.go.th หรือโทร 1694", "Check at doe.go.th or call 1694")}</h3><p>${c.L("ค้นหารายชื่อบริษัทจัดหางานที่ได้รับอนุญาต หรือถามสายด่วนกรมการจัดหางาน", "Search the list of licensed agencies, or ask the department's hotline")}</p></div></li>
        <li data-reveal style="--d:2"><span class="vsteps-n">3</span><div><h3>${c.L("เทียบชื่อบริษัทกับใบเสร็จ", "Match the name on your receipt")}</h3><p>${c.L("ชื่อบนใบเสร็จและสัญญาต้องตรงกับชื่อบริษัทที่ได้รับอนุญาต", "The company on your receipt and contract must match the licensed name")}</p></div></li>
      </ol>
    </div>
    <div class="verify-card" data-reveal="pop">${licenceCard(c)}</div>
  </div>
</section>

<section class="sec sec--alt" id="jobs-now" aria-labelledby="jobs-t">
  <div class="wrap">
    <div class="sh sh--row">
      ${sh(c, { id: "jobs-t", kick: c.L("ตำแหน่งงาน", "Jobs"), ic: "briefcase", h: c.L("ตำแหน่งที่เปิดรับ ตอนนี้", "Open right now") })}
      <a class="btn btn-line" href="jobs.html">${c.L(`ดูทั้งหมด ${JOBS.length} ตำแหน่ง`, `See all ${JOBS.length} jobs`)}${icon("arrow")}</a>
    </div>
    <div class="jtabs" role="radiogroup" aria-label="${c.L("กรองตามสายงาน", "Filter by sector")}" data-jtabs>
      <button type="button" role="radio" aria-checked="true" data-v="">${c.L("ทั้งหมด", "All")}</button>
      ${Object.entries(SECTORS).map(([k, s]) => `<button type="button" role="radio" aria-checked="false" data-v="${k}">${icon(s.icon)}${c.L(s.th, s.en)}</button>`).join("")}
    </div>
    <div class="jl-wrap" data-jl>
      <ul class="jl" role="list">
        ${JOBS.map((j) => jobRow(c, j)).join("\n        ")}
      </ul>
      <div class="jprev" aria-hidden="true">${Object.entries(SECTOR_INFO).map(([k, s]) => `<img src="${photoUrl(c, s.img, 640)}" alt="" width="640" height="427" loading="lazy" decoding="async" data-s="${k}">`).join("")}</div>
    </div>
  </div>
</section>

<section class="sec" id="sectors" aria-labelledby="sectors-t">
  <div class="wrap">
    ${sh(c, { id: "sectors-t", kick: c.L("สายงาน", "Sectors"), ic: "users", h: c.L("สี่สายงาน ที่เราจัดหาคนให้", "Four sectors we recruit for"), lead: c.L("เราคัดคนตามทักษะจริง ทดสอบฝีมือก่อนเดินทาง และส่งงานที่ตรงกับประสบการณ์ ไม่ใช่งานไหนก็ได้", "We select on real skills, test before departure and match people to work they know, not just any job.") })}
    <ul class="sec4" role="list">
      ${Object.entries(SECTORS).map(([k, s], i) => {
        const info = SECTOR_INFO[k];
        return `<li class="sc" data-reveal style="--d:${i}">
        <a href="jobs.html?sector=${k}">
          <span class="sc-img">${photo(c, info.img, info.alt[c.lang], { sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" })}</span>
          <span class="sc-b">
            <span class="sc-ic">${icon(s.icon)}</span>
            <span class="sc-n">${c.L(s.th, s.en)}</span>
            <span class="sc-r">${info.roles[c.lang].join(c.L(" / ", " / "))}</span>
            <span class="sc-go">${c.L("ดูตำแหน่งงาน", "See jobs")}${icon("arrow")}</span>
          </span>
        </a>
      </li>`;
      }).join("\n      ")}
    </ul>
  </div>
</section>

<section class="sec sec--ink steps" id="steps" aria-labelledby="steps-t">
  ${stepsTrack(c, `<div class="wrap"><div class="sh sh--row">
      ${sh(c, { id: "steps-t", kick: c.L("ขั้นตอน", "How it works"), ic: "route", h: c.L("หกขั้นตอน จากวันสมัคร ถึงวันเริ่มงาน", "Six steps from applying to your first day") })}
      <a class="btn btn-line" href="process.html">${c.L("ขั้นตอนแบบละเอียด", "Full process")}${icon("arrow")}</a>
    </div></div>`)}
</section>

<section class="sec" id="promise" aria-labelledby="promise-t">
  <div class="wrap">
    ${sh(c, { id: "promise-t", kick: c.L("ความโปร่งใส", "Transparency"), ic: "eye", h: c.L("ข้อตกลงของเรา เขียนไว้ให้เห็นชัด", "Our commitments, written down"), lead: c.L("ถ้าบริษัทไหนทำสิ่งในช่องขวา ไม่ว่าจะเป็นใคร หยุดก่อนและโทรถามสายด่วน 1694", "If any agency does what's on the right, whoever they are, stop and call the 1694 hotline.") })}
    ${promises(c)}
  </div>
</section>

<section class="sec sec--alt" id="where" aria-labelledby="where-t">
  <div class="wrap where">
    <div>
      ${sh(c, { id: "where-t", kick: c.L("ประเทศปลายทาง", "Destinations"), ic: "globe", h: c.L("ประเทศที่เรา ส่งคนไปทำงาน", "Where our workers go"), lead: c.L("เราบอกตรง ๆ ว่าประเทศไหนเราส่งแรงงานไปแล้ว และประเทศไหนทำงานผ่านเครือข่ายพันธมิตร", "We tell you plainly where we've already placed workers and where we work through partners.") })}
      ${destList(c)}
    </div>
    <div class="where-map" data-reveal>${worldMap(c)}</div>
  </div>
</section>

<section class="sec emp" id="employers" aria-labelledby="emp-t">
  <div class="wrap emp-in">
    <div class="emp-img" data-reveal="img">${photo(c, "interview", c.L("เจ้าหน้าที่สัมภาษณ์ผู้สมัครงาน", "A recruiter interviewing a candidate"), { sizes: "(max-width: 900px) 100vw, 45vw" })}</div>
    <div class="emp-b">
      ${sh(c, { id: "emp-t", kick: c.L("สำหรับนายจ้าง", "For employers"), ic: "building", h: c.L("ต้องการแรงงานไทย ที่พร้อมทำงานตั้งแต่วันแรก", "Thai workers, ready on day one"), lead: c.L("แจ้งตำแหน่ง จำนวน และคุณสมบัติ เราคัดกรอง ทดสอบฝีมือ และดำเนินเอกสารทั้งหมดตามขั้นตอนของกรมการจัดหางาน", "Tell us the roles, headcount and requirements. We screen, skill-test and handle the paperwork under Department of Employment procedures.") })}
      <ul class="emp-l" role="list">
        <li>${icon("search")}${c.L("คัดกรองและสัมภาษณ์ ทางวิดีโอหรือที่ประเทศไทย", "Screening and interviews by video or in Thailand")}</li>
        <li>${icon("wrench")}${c.L("ทดสอบฝีมือตามมาตรฐานที่คุณกำหนด", "Trade tests to your standard")}</li>
        <li>${icon("doc")}${c.L("สัญญา วีซ่า และการอนุญาตครบถ้วน", "Contracts, visas and approvals handled")}</li>
        <li>${icon("headset")}${c.L("ติดตามผลหลังเริ่มงานตลอดสัญญา", "Follow-up for the whole contract")}</li>
      </ul>
      <div class="btn-row">
        <a class="btn btn-ac" href="contact.html?type=employer">${c.L("ส่งความต้องการ", "Send your requirements")}${icon("arrow")}</a>
        <a class="btn btn-line" href="services.html#employers">${c.L("บริการสำหรับนายจ้าง", "Employer services")}</a>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--alt" id="faq" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("info")}${c.L("คำถามที่พบบ่อย", "FAQ")}</p>
      <h2 id="faq-t" class="h2" data-split>${c.L("สิ่งที่คนส่วนใหญ่ ถามก่อนสมัคร", "What most people ask before applying")}</h2>
      <a class="btn btn-line" href="process.html#faq">${c.L("ดูคำถามทั้งหมด", "All questions")}${icon("arrow")}</a>
    </div>
    ${faqList(c, FAQ.slice(0, 4))}
  </div>
</section>`
};

/* ------------------------------------------------------------------ JOBS */
const jobs = {
  id: "jobs", file: "jobs.html", schemaType: "CollectionPage", ogImage: "construction",
  crumb: { th: "ตำแหน่งงาน", en: "Jobs" },
  title: {
    th: "ตำแหน่งงานต่างประเทศ 2569 นวดไทย สปา ช่าง โรงงาน เกษตร | TG Oversea",
    en: "Overseas Jobs for Thai Workers | TG Oversea Solutions"
  },
  desc: {
    th: "รวมตำแหน่งงานต่างประเทศสำหรับคนไทย นักนวดแผนไทย สปา เชฟ ช่างเชื่อม ช่างไฟฟ้า โรงงาน ฟาร์ม ในซาอุฯ ดูไบ โอมาน คูเวต ออสเตรเลีย นิวซีแลนด์ สมัครกับบริษัทจัดหางานถูกกฎหมาย",
    en: "Overseas jobs for Thai workers: massage and spa therapists, chefs, welders, electricians, factory and farm roles in the Gulf, Australia and New Zealand."
  },
  preload: preloadImg("construction"),
  schema: (c) => {
    const nodes = [{
      "@type": "ItemList", "@id": c.url() + "#joblist", name: c.L("ตำแหน่งงานต่างประเทศ", "Overseas jobs"), numberOfItems: JOBS.length,
      itemListElement: JOBS.map((j, i) => ({ "@type": "ListItem", position: i + 1, url: c.url() + "#job-" + j.id, name: j.title[c.lang] }))
    }];
    if (EMIT_JOB_POSTING) {
      JOBS.filter((j) => COUNTRIES[j.country].iso).forEach((j) => nodes.push({
        "@type": "JobPosting", "@id": c.url() + "#job-" + j.id, title: j.title[c.lang],
        description: `<p>${j.title[c.lang]} — ${j.city[c.lang]}, ${COUNTRIES[j.country][c.lang]}</p><ul>${j.req[c.lang].map((r) => `<li>${r}</li>`).join("")}</ul>`,
        datePosted: j.posted, validThrough: j.until + "T23:59:59+07:00", employmentType: "FULL_TIME",
        hiringOrganization: { "@id": SITE_URL + "/#org" },
        jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: j.city.en, addressCountry: COUNTRIES[j.country].iso } },
        applicantLocationRequirements: { "@type": "Country", name: "TH" }, directApply: true,
        identifier: { "@type": "PropertyValue", name: CO.short, value: j.id }, url: c.url() + "#job-" + j.id
      }));
    }
    return nodes;
  },
  body: (c) => pageHero(c, jobs,
    c.L("ตำแหน่งงานต่างประเทศ ที่เปิดรับสมัคร", "Overseas jobs open now"),
    c.L("ทุกตำแหน่งตรวจสอบนายจ้างและเงื่อนไขการจ้างแล้ว ค้นหาหรือกรองตามสายงานและประเทศ แล้วกดสมัครเพื่อให้เจ้าหน้าที่ติดต่อกลับ", "Every listing is checked for employer and contract terms. Search or filter by sector and country, then apply and we'll call you back."),
    "construction", c.L("คนงานก่อสร้างกำลังทำงานบนไซต์งาน", "Construction workers on site")) + `
<section class="sec sec--jobs" id="list" aria-labelledby="list-t">
  <div class="wrap">
    <h2 id="list-t" class="sr">${c.L("รายการตำแหน่งงาน", "Job listings")}</h2>
    <form class="jf" action="jobs.html" method="get" role="search" data-jobfilter>
      <div class="jf-q">${icon("search")}<label class="sr" for="j-q">${c.L("ค้นหาตำแหน่ง", "Search jobs")}</label><input id="j-q" name="q" type="search" placeholder="${c.L("ค้นหา เช่น นวด ช่างเชื่อม ดูไบ", "Search, e.g. massage, welder, Dubai")}" autocomplete="off"></div>
      <div class="jf-sel"><label class="sr" for="j-country">${c.L("ประเทศ", "Country")}</label><select id="j-country" name="country">${countryOptions(c, c.L("ทุกประเทศ", "All countries"))}</select></div>
      <fieldset class="jf-chips">
        <legend class="sr">${c.L("สายงาน", "Sector")}</legend>
        <label class="chip"><input type="radio" name="sector" value="" checked><span>${c.L("ทุกสายงาน", "All sectors")}</span></label>
        ${Object.entries(SECTORS).map(([k, s]) => `<label class="chip"><input type="radio" name="sector" value="${k}"><span>${icon(s.icon)}${c.L(s.th, s.en)}</span></label>`).join("\n        ")}
      </fieldset>
      <div class="jf-foot">
        <p class="jcount" role="status" aria-live="polite" data-count-out data-tpl="${c.L("แสดง {n} จาก {t} ตำแหน่ง", "Showing {n} of {t} jobs")}">${c.L(`ทั้งหมด ${JOBS.length} ตำแหน่ง`, `${JOBS.length} jobs`)}</p>
        <button class="btn btn-line btn-sm" type="reset" data-reset>${icon("x")}${c.L("ล้างตัวกรอง", "Clear filters")}</button>
        <button class="btn btn-pr btn-sm jf-go" type="submit">${icon("filter")}${c.L("กรองรายการ", "Filter")}</button>
      </div>
    </form>

    <div class="jobs" data-jobs>
${JOBS.map((j) => jobCard(c, j)).join("\n")}
    </div>
    <div class="jempty" data-empty hidden>
      ${icon("search")}
      <h3>${c.L("ยังไม่มีตำแหน่งที่ตรงกับการค้นหานี้", "No jobs match this search yet")}</h3>
      <p>${c.L("ลองล้างตัวกรอง หรือฝากข้อมูลไว้ เราจะแจ้งเมื่อมีตำแหน่งใหม่ที่ตรงกับคุณ", "Try clearing the filters, or leave your details and we'll tell you when a matching job opens.")}</p>
      <a class="btn btn-ac" href="contact.html?type=worker">${c.L("ฝากข้อมูลไว้", "Leave your details")}</a>
    </div>
    <p class="note">${icon("info")}${c.L("จำนวนที่เปิดรับ คุณสมบัติ และเงื่อนไขการจ้างอาจเปลี่ยนตามนายจ้าง เจ้าหน้าที่จะยืนยันรายละเอียดล่าสุดกับคุณก่อนสมัครทุกครั้ง", "Openings, requirements and terms change with each employer. We confirm the latest details with you before you apply.")}</p>
  </div>
</section>`
};

/* -------------------------------------------------------------- SERVICES */
const SERVICES = [
  ["search", { th: "สรรหาและจับคู่งาน", en: "Matching you to a job" }, { th: "สัมภาษณ์ ประเมินทักษะ และแนะนำตำแหน่งที่ตรงกับประสบการณ์ของคุณ", en: "Interviews, skills assessment and roles that fit your experience." }],
  ["doc", { th: "เตรียมเอกสาร", en: "Document preparation" }, { th: "ช่วยจัดเตรียมหนังสือเดินทาง ใบรับรอง และเอกสารประกอบให้ครบถ้วนถูกต้อง", en: "Help with passports, certificates and every supporting document." }],
  ["cap", { th: "ทดสอบฝีมือและอบรม", en: "Skills testing and training" }, { th: "ทดสอบตามมาตรฐานนายจ้าง อบรมภาษา วัฒนธรรม และปฐมนิเทศก่อนเดินทาง", en: "Employer-standard trade tests, language, culture and orientation." }],
  ["medical", { th: "ตรวจสุขภาพ", en: "Medical checks" }, { th: "ประสานการตรวจกับสถานพยาบาลที่ได้รับการรับรองตามข้อกำหนดของแต่ละประเทศ", en: "Medicals at approved clinics, to each country's requirements." }],
  ["passport", { th: "วีซ่าและใบอนุญาต", en: "Visas and permits" }, { th: "ยื่นวีซ่าทำงาน ใบอนุญาตทำงาน และขออนุญาตเดินทางจากกรมการจัดหางาน", en: "Work visas, permits and departure approval from the department." }],
  ["headset", { th: "ดูแลระหว่างทำงาน", en: "Support during your contract" }, { th: "ติดตามความเป็นอยู่ ประสานกับนายจ้าง และช่วยเหลือเมื่อมีปัญหาจนจบสัญญา", en: "Welfare check-ins, employer liaison and help when issues come up." }]
];

const services = {
  id: "services", file: "services.html", ogImage: "recruitment",
  crumb: { th: "บริการ", en: "Services" },
  title: {
    th: "บริการจัดหาแรงงานไทยไปต่างประเทศ ครบวงจร | TG Oversea Solutions",
    en: "Hire Thai Workers for Overseas Jobs | TG Oversea Solutions"
  },
  desc: {
    th: "บริการจัดหางานต่างประเทศครบวงจร สรรหา คัดเลือก ทดสอบฝีมือ อบรม ตรวจสุขภาพ วีซ่า และดูแลระหว่างทำงาน สำหรับคนหางานและนายจ้างต่างประเทศที่ต้องการแรงงานไทย",
    en: "End-to-end recruitment of Thai workers for overseas employers: sourcing, screening, trade tests, training, medicals, visas and on-contract care. Licence T. 1307/2569."
  },
  preload: preloadImg("recruitment"),
  schema: (c) => ({
    "@type": "Service", "@id": c.url() + "#service", name: c.L("บริการจัดหางานไปทำงานต่างประเทศ", "Overseas recruitment of Thai workers"),
    serviceType: "Overseas recruitment", provider: { "@id": SITE_URL + "/#org" }, areaServed: ["SA", "AE", "OM", "KW", "AU", "NZ", "Europe", "Asia"],
    hasOfferCatalog: { "@type": "OfferCatalog", name: c.L("สายงาน", "Sectors"), itemListElement: Object.values(SECTORS).map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.L(s.th, s.en) } })) }
  }),
  body: (c) => pageHero(c, services,
    c.L("บริการจัดหางานต่างประเทศ ครบทุกขั้นตอน", "Overseas recruitment, every step covered"),
    c.L("ทั้งคนหางานและนายจ้าง ติดต่อเราที่เดียว เราดูแลเองทุกขั้นตอน และแจ้งความคืบหน้าให้รู้ตลอด", "One contact for job seekers and employers. We handle every stage ourselves and keep you updated."),
    "recruitment", c.L("เจ้าหน้าที่สรรหาแสดงความยินดีกับผู้สมัคร", "Recruiters celebrating with a candidate"),
    `<div class="btn-row" data-reveal style="--d:3"><a class="btn btn-ac" href="#workers">${c.L("สำหรับคนหางาน", "For job seekers")}</a><a class="btn btn-line" href="#employers">${c.L("สำหรับนายจ้าง", "For employers")}</a></div>`) + `
<section class="sec" id="workers" aria-labelledby="svc-t">
  <div class="wrap">
    ${sh(c, { id: "svc-t", kick: c.L("สำหรับคนหางาน", "For job seekers"), ic: "person", h: c.L("สิ่งที่เราดูแลให้ ตั้งแต่สมัครจนจบสัญญา", "What we handle, from applying to the end of your contract") })}
    <ul class="svc" role="list">
      ${SERVICES.map(([ic, t, d], i) => `<li data-reveal style="--d:${i % 3}"><span class="svc-ic">${icon(ic)}</span><h3>${t[c.lang]}</h3><p>${d[c.lang]}</p></li>`).join("")}
    </ul>
  </div>
</section>

<section class="sec sec--alt" id="sectors" aria-labelledby="sectors-t">
  <div class="wrap">
    ${sh(c, { id: "sectors-t", kick: c.L("สายงาน", "Sectors"), ic: "briefcase", h: c.L("สายงานของเรา", "Our sectors") })}
    <div class="rows">
      ${Object.entries(SECTORS).map(([k, s], i) => {
        const info = SECTOR_INFO[k];
        return `<article class="row${i % 2 ? " row--r" : ""}" id="sector-${k}">
        <div class="row-img" data-reveal="img">${photo(c, info.img, info.alt[c.lang], { sizes: "(max-width: 900px) 100vw, 50vw" })}</div>
        <div class="row-b" data-reveal>
          <span class="row-ic">${icon(s.icon)}</span>
          <h3 class="h3">${c.L(s.th, s.en)}</h3>
          <p>${info.desc[c.lang]}</p>
          <ul class="chips" role="list">${info.roles[c.lang].map((r) => `<li>${r}</li>`).join("")}</ul>
          <p class="row-dest">${icon("pin")}${info.dest[c.lang]}</p>
          <a class="btn btn-line btn-sm" href="jobs.html?sector=${k}">${c.L("ดูตำแหน่งงาน", "See jobs")}<span class="sr"> ${c.L(s.th, s.en)}</span>${icon("arrow")}</a>
        </div>
      </article>`;
      }).join("\n      ")}
    </div>
  </div>
</section>

<section class="sec" id="where" aria-labelledby="where-t">
  <div class="wrap where">
    <div>
      ${sh(c, { id: "where-t", kick: c.L("ประเทศปลายทาง", "Destinations"), ic: "globe", h: c.L("ประเทศที่เรา ส่งคนไปทำงาน", "Where our workers go") })}
      ${destList(c)}
    </div>
    <div class="where-map" data-reveal>${worldMap(c)}</div>
  </div>
</section>

<section class="sec sec--ink" id="employers" aria-labelledby="emp-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("building")}${c.L("สำหรับนายจ้างและพันธมิตร", "For employers and partners")}</p>
      <h2 id="emp-t" class="h2" data-split>${c.L("จากคำขอของคุณ ถึงแรงงาน ที่เริ่มงานที่ไซต์ของคุณ", "From your job order to workers starting on site")}</h2>
      <p class="lead">${c.L("แจ้งตำแหน่ง จำนวน และคุณสมบัติที่ต้องการ เราเสนอผู้สมัครที่ผ่านการคัดกรอง และดำเนินเอกสารทั้งหมดตามขั้นตอนของกรมการจัดหางาน", "Tell us the roles, headcount and requirements. We shortlist screened candidates and handle all paperwork under Department of Employment procedures.")}</p>
      <div class="btn-row">
        <a class="btn btn-ac" href="contact.html?type=employer">${c.L("ส่งความต้องการ", "Send your requirements")}${icon("arrow")}</a>
        <a class="btn btn-line" href="mailto:${CO.email}">${icon("mail")}${c.L("ส่งอีเมล", "Email us")}</a>
      </div>
    </div>
    <ol class="tl" role="list" data-tl>
      ${[
        [c.L("แจ้งความต้องการ", "Share your requirements"), c.L("ตำแหน่ง จำนวน คุณสมบัติ เงื่อนไขการจ้าง ที่พัก และสวัสดิการ", "Positions, headcount, qualifications, terms, housing and benefits"), c.L("คุณส่ง: Job order และเงื่อนไขการจ้าง", "You send: job order and terms")],
        [c.L("สรรหาและคัดเลือก", "Sourcing and shortlisting"), c.L("คัดกรองประวัติ ทดสอบฝีมือ และสัมภาษณ์ทางวิดีโอหรือที่ประเทศไทย", "Screening, trade tests and interviews by video or in Thailand"), c.L("คุณเลือก: ผู้สมัครจาก shortlist", "You choose: from the shortlist")],
        [c.L("เอกสารและการอนุญาต", "Compliance and processing"), c.L("สัญญาจ้าง อนุมัติจากกรมการจัดหางาน ตรวจสุขภาพ และวีซ่า", "Contracts, department approval, medicals and visas"), c.L("คุณลงนาม: สัญญาจ้างและเอกสารนายจ้าง", "You sign: contracts and employer documents")],
        [c.L("ส่งตัวและติดตามผล", "Deployment and follow-up"), c.L("ส่งแรงงานถึงที่ทำงาน ช่วยปรับตัวช่วงแรก และติดตามผลตลอดสัญญา", "Workers delivered to site, supported through onboarding and followed up"), c.L("เราดูแล: ตลอดระยะสัญญา", "We stay involved: the whole contract")]
      ].map(([t, d, y], i) => `<li class="tl-i" data-reveal><span class="tl-n">${i + 1}</span><div><h3>${t}</h3><p>${d}</p><p class="tl-you">${y}</p></div></li>`).join("")}
    </ol>
  </div>
</section>`
};

/* --------------------------------------------------------------- PROCESS */
const DOCS = [
  [{ th: "บัตรประชาชน", en: "Thai ID card" }, { th: "ฉบับจริงและสำเนา", en: "Original and copy" }],
  [{ th: "ทะเบียนบ้าน", en: "House registration" }, { th: "สำเนา", en: "Copy" }],
  [{ th: "หนังสือเดินทาง", en: "Passport" }, { th: "ถ้ายังไม่มี เราช่วยแนะนำได้", en: "No passport yet? We'll guide you" }],
  [{ th: "รูปถ่ายหน้าตรง", en: "Passport photos" }, { th: "พื้นหลังสีขาว", en: "White background" }],
  [{ th: "วุฒิการศึกษา", en: "Education certificate" }, { th: "หรือใบรับรองฝีมือ", en: "Or a trade certificate" }],
  [{ th: "หนังสือรับรองการทำงาน", en: "Employment reference" }, { th: "ถ้ามี", en: "If you have one" }]
];
const COSTS = [
  ["wallet", { th: "ค่าบริการจัดหางาน", en: "Recruitment service fee" }, { th: "ไม่เกินอัตราที่กรมการจัดหางานกำหนด", en: "Within the department's legal rate" }],
  ["medical", { th: "ค่าตรวจสุขภาพ", en: "Medical exam" }, { th: "จ่ายตามจริงที่สถานพยาบาล", en: "Paid at cost to the clinic" }],
  ["passport", { th: "ค่าหนังสือเดินทางและวีซ่า", en: "Passport and visa" }, { th: "ตามอัตราของหน่วยงานรัฐ", en: "At official government rates" }],
  ["shield", { th: "เงินสมทบกองทุนช่วยเหลือคนหางาน", en: "Overseas workers' welfare fund" }, { th: "ตามที่กฎหมายกำหนด", en: "As required by law" }],
  ["plane", { th: "ค่าเดินทาง", en: "Travel" }, { th: "บางนายจ้างออกให้ เราแจ้งก่อนสมัคร", en: "Some employers pay; we tell you upfront" }]
];

const process = {
  id: "process", file: "process.html", ogImage: "interview",
  crumb: { th: "ขั้นตอนการสมัคร", en: "How it works" },
  title: {
    th: "ขั้นตอนไปทำงานต่างประเทศ เอกสาร ค่าใช้จ่าย คำถามที่พบบ่อย | TG Oversea",
    en: "How to Work Abroad from Thailand: Steps, Documents, Costs, FAQ | TG Oversea"
  },
  desc: {
    th: "ไปทำงานต่างประเทศต้องทำอย่างไร 6 ขั้นตอนตั้งแต่สมัครถึงเริ่มงาน เอกสารที่ต้องเตรียม ค่าใช้จ่ายที่ต้องรู้ ระยะเวลา และวิธีตรวจสอบบริษัทจัดหางานถูกกฎหมาย",
    en: "How working abroad from Thailand works: six steps from applying to starting work, the documents you need, the costs to expect, timelines, and how to check an agency is licensed."
  },
  preload: preloadImg("interview"),
  schema: (c) => ({ "@type": "FAQPage", "@id": c.url() + "#faq", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q[c.lang], acceptedAnswer: { "@type": "Answer", text: a[c.lang] } })) }),
  body: (c) => pageHero(c, process,
    c.L("ขั้นตอนไปทำงานต่างประเทศ ชัดเจนตั้งแต่วันแรก", "How working abroad works, clear from day one"),
    c.L("รู้ล่วงหน้าว่าต้องทำอะไร เตรียมอะไร จ่ายอะไร และเราดูแลส่วนไหนให้ ไม่มีขั้นตอนที่ซ่อนอยู่", "Know in advance what happens, what to prepare, what you pay and what we take care of. No hidden steps."),
    "interview", c.L("เจ้าหน้าที่สัมภาษณ์ผู้สมัครที่โต๊ะทำงาน", "A recruiter interviewing a candidate"),
    `<nav class="toc" aria-label="${c.L("ในหน้านี้", "On this page")}" data-reveal style="--d:3"><a href="#steps">${c.L("6 ขั้นตอน", "Six steps")}</a><a href="#documents">${c.L("เอกสาร", "Documents")}</a><a href="#costs">${c.L("ค่าใช้จ่าย", "Costs")}</a><a href="#faq">${c.L("คำถามที่พบบ่อย", "FAQ")}</a></nav>`) + `
<section class="sec" id="steps" aria-labelledby="steps-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("route")}${c.L("สำหรับคนหางาน", "For job seekers")}</p>
      <h2 id="steps-t" class="h2" data-split>${c.L("หกขั้นตอน จากวันสมัคร ถึงวันเริ่มงาน", "Six steps from applying to your first day")}</h2>
      <p class="lead">${c.L("โดยทั่วไปใช้เวลาประมาณ 2–4 เดือน ขึ้นกับประเทศและความพร้อมของเอกสาร", "Usually around 2–4 months, depending on the country and your documents.")}</p>
    </div>
    <ol class="tl tl--steps" role="list" data-tl>
      ${STEPS.map((s, i) => `<li class="tl-i" data-reveal><span class="tl-n">${i + 1}</span><div><h3>${s.t[c.lang]}</h3><p>${s.d[c.lang]}</p><p class="tl-you"><b>${c.L("คุณเตรียม", "You bring")}</b> ${s.you[c.lang]}</p></div></li>`).join("")}
    </ol>
  </div>
</section>

<section class="sec sec--alt" id="documents" aria-labelledby="docs-t">
  <div class="wrap split">
    <div class="sh">
      <p class="kick">${icon("doc")}${c.L("เตรียมเอกสาร", "Get your documents ready")}</p>
      <h2 id="docs-t" class="h2" data-split>${c.L("เอกสารที่ต้องใช้ ในการสมัคร", "Documents you'll need")}</h2>
      <p class="lead">${c.L("ติ๊กรายการที่คุณมีแล้ว เพื่อดูว่าพร้อมแค่ไหน ขาดอะไรไป เจ้าหน้าที่ช่วยแนะนำวิธีเตรียมได้", "Tick what you already have to see how ready you are. Missing something? We'll show you how to get it.")}</p>
      <div class="dmeter" data-dmeter aria-hidden="true"><span class="dmeter-n"><b data-docs-n>0</b>/${DOCS.length}</span><span class="dmeter-bar"><i></i></span></div>
    </div>
    <fieldset class="docs" data-docs>
      <legend class="sr">${c.L("รายการเอกสาร", "Document checklist")}</legend>
      ${DOCS.map(([t, d], i) => `<label class="doc"><input type="checkbox" name="doc${i}"><span class="doc-box">${icon("check")}</span><span><b>${t[c.lang]}</b><small>${d[c.lang]}</small></span></label>`).join("")}
      <p class="docs-msg" aria-live="polite" data-docs-msg data-done="${c.L("เอกสารครบแล้ว พร้อมสมัครได้เลย", "All set, you're ready to apply")}"></p>
    </fieldset>
  </div>
</section>

<section class="sec" id="costs" aria-labelledby="costs-t">
  <div class="wrap">
    ${sh(c, { id: "costs-t", kick: c.L("ค่าใช้จ่าย", "Costs"), ic: "wallet", h: c.L("ค่าใช้จ่ายที่ควรรู้ ก่อนตัดสินใจ", "Costs to know before you decide"), lead: c.L("จำนวนเงินจริงขึ้นกับประเทศ ตำแหน่ง และนายจ้าง เราแจ้งเป็นลายลักษณ์อักษรรายตำแหน่งก่อนรับเงินทุกครั้ง", "Exact amounts depend on the country, role and employer. We give them to you in writing, per role, before taking any payment.") })}
    <ul class="costs" role="list">
      ${COSTS.map(([ic, t, d], i) => `<li data-reveal style="--d:${i}">${icon(ic)}<div><h3>${t[c.lang]}</h3><p>${d[c.lang]}</p></div></li>`).join("")}
    </ul>
    ${promises(c)}
  </div>
</section>

<section class="sec sec--alt" id="faq" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("info")}${c.L("คำถามที่พบบ่อย", "FAQ")}</p>
      <h2 id="faq-t" class="h2" data-split>${c.L("สิ่งที่หลายคน อยากรู้ก่อนสมัคร", "What people ask before applying")}</h2>
      <p class="lead">${c.L("ไม่เจอคำตอบที่ต้องการ? โทร ", "Can't find your answer? Call ")}<a href="tel:${CO.tel}">${CO.phone}</a></p>
    </div>
    ${faqList(c)}
  </div>
</section>

${scamChecks(c)}`
};

/* ----------------------------------------------------------------- ABOUT */
const about = {
  id: "about", file: "about.html", schemaType: "AboutPage", ogImage: "team",
  crumb: { th: "เกี่ยวกับเรา", en: "About" },
  title: {
    th: "เกี่ยวกับเรา | บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด ใบอนุญาต ต. 1307/2569",
    en: "About Us | TG Oversea Solutions, Licence T. 1307/2569"
  },
  desc: {
    th: "บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น ก่อตั้งปี 2568 ต่อยอดประสบการณ์บริหารแรงงานกว่า 5 ปีจาก T.G. Labor ได้รับใบอนุญาตจัดหางานไปต่างประเทศ ต. 1307/2569 จากกรมการจัดหางาน",
    en: "Founded in 2025 on five-plus years of workforce management at T.G. Labor, TG Oversea Solutions holds overseas recruitment licence T. 1307/2569 from the Department of Employment."
  },
  preload: preloadImg("team"),
  body: (c) => pageHero(c, about,
    c.L("การไปทำงานต่างประเทศ ควรเป็นก้าวที่ปลอดภัย", "Going abroad for work should be a safe step"),
    c.L("เราตั้งบริษัทนี้ขึ้นเพื่อให้คนไทยที่ไปทำงานต่างประเทศ รู้ว่ากำลังจะไปทำอะไร กับใคร และได้รับอะไร ตั้งแต่ก่อนจ่ายเงินบาทแรก", "We set up this company so Thai workers going abroad know what they'll do, for whom and on what terms, before paying anything."),
    "team", c.L("ทีมงานประชุมร่วมกันในสำนักงาน", "A team meeting in an office")) + `
<section class="sec" id="story" aria-labelledby="story-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("compass")}${c.L("เรื่องราวของเรา", "Our story")}</p>
      <h2 id="story-t" class="h2" data-split>${c.L("ต่อยอดประสบการณ์ สู่งานต่างประเทศ", "Proven experience, taken overseas")}</h2>
      <p class="lead">${c.L("บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด ก่อตั้งเมื่อวันที่ 28 ตุลาคม 2568 โดยมีพื้นฐานจากบริษัทในเครือ T.G. Labor Co., Ltd.", "TG Oversea Solutions Recruitment Co., Ltd. was founded on 28 October 2025, building on our sister company T.G. Labor Co., Ltd.")}</p>
    </div>
    <ol class="tl tl--time" role="list" data-tl>
      <li class="tl-i" data-reveal><span class="tl-n">${c.L("ก่อน 2568", "Pre-2025")}</span><div><h3>${c.L("รากฐานจาก T.G. Labor", "Roots in T.G. Labor")}</h3><p>${c.L("ทีมงานสั่งสมประสบการณ์บริหารจัดการแรงงานมากกว่า 5 ปี ทั้งกฎหมายแรงงาน การดูแลสุขภาพ และการประสานงานกับนายจ้าง", "More than five years managing workforces, covering labour law, health and employer coordination.")}</p></div></li>
      <li class="tl-i" data-reveal><span class="tl-n"><time datetime="2025-10-28">${c.L("ต.ค. 2568", "Oct 2025")}</time></span><div><h3>${c.L("ก่อตั้ง TG Oversea Solutions", "TG Oversea Solutions founded")}</h3><p>${c.L("ตั้งบริษัทเพื่อทำงานจัดหางานต่างประเทศโดยเฉพาะ ด้วยหลักการยึดแรงงานเป็นศูนย์กลางและความโปร่งใส", "A company dedicated to international recruitment, built on worker-centred and transparent principles.")}</p></div></li>
      <li class="tl-i" data-reveal><span class="tl-n"><time datetime="2026">${c.L("2569", "2026")}</time></span><div><h3>${c.L(`ได้รับใบอนุญาต ${CO.licenseTh}`, `Licence ${CO.licenseEn} granted`)}</h3><p>${c.L("ได้รับอนุญาตให้จัดหางานเพื่อไปทำงานต่างประเทศจากกรมการจัดหางาน กระทรวงแรงงาน", "Licensed by the Department of Employment, Ministry of Labour, to recruit for overseas work.")}</p></div></li>
      <li class="tl-i" data-reveal><span class="tl-n">${c.L("วันนี้", "Today")}</span><div><h3>${c.L("เครือข่ายใน 4 ภูมิภาค", "A network across four regions")}</h3><p>${c.L("ส่งนักนวดไทยและผู้เชี่ยวชาญสปาไปซาอุดีอาระเบีย โอมาน คูเวต ยูเออี และยุโรป พร้อมเครือข่ายพันธมิตรในออสเตรเลียและนิวซีแลนด์", "Thai massage and spa specialists placed in Saudi Arabia, Oman, Kuwait, the UAE and Europe, with partner networks in Australia and New Zealand.")}</p></div></li>
    </ol>
  </div>
</section>

<section class="sec sec--alt" id="licence" aria-labelledby="lic-t">
  <div class="wrap verify-in">
    <div>
      ${sh(c, { id: "lic-t", kick: c.L("ใบอนุญาตและกฎหมาย", "Licence and legal"), ic: "shield", h: c.L("ถูกกฎหมาย ตรวจสอบได้ทุกเมื่อ", "Fully licensed. Check us any time.") })}
      <ul class="ticks" role="list">
        <li>${icon("check")}${c.L(`ได้รับใบอนุญาตจัดหางานไปทำงานต่างประเทศ เลขที่ ${CO.licenseTh} จากกรมการจัดหางาน`, `Overseas recruitment licence no. ${CO.licenseEn} from the Department of Employment`)}</li>
        <li>${icon("check")}${c.L("ตรวจสอบรายชื่อบริษัทได้ที่เว็บไซต์กรมการจัดหางาน หรือโทรสายด่วน 1694", "Verify us on the department's website or via its 1694 hotline")}</li>
        <li>${icon("check")}${c.L("สัญญาจ้างและค่าใช้จ่ายทุกรายการเป็นลายลักษณ์อักษร ตามอัตราที่กฎหมายกำหนด", "Written contracts and itemised fees within legally permitted rates")}</li>
        <li>${icon("check")}${c.L("แรงงานทุกคนผ่านการปฐมนิเทศก่อนเดินทางตามข้อกำหนดของกรมการจัดหางาน", "Every worker completes the department's pre-departure orientation")}</li>
      </ul>
    </div>
    <div class="verify-card" data-reveal="pop">${licenceCard(c, "lic-card-about")}</div>
  </div>
</section>

<section class="sec" id="principles" aria-labelledby="mission-t">
  <div class="wrap">
    ${sh(c, { id: "mission-t", kick: c.L("หลักการทำงาน", "How we work"), ic: "star", h: c.L("ความไว้วางใจ สร้างจากวิธีทำงาน", "Trust is built in how we work") })}
    <ul class="principles" role="list">
      ${[
        ["heart", c.L("ยึดแรงงานเป็นศูนย์กลาง", "People first"), c.L("ความปลอดภัย ที่พัก และสวัสดิการของแรงงานมาก่อน ตลอดระยะสัญญา", "Workers' safety, housing and benefits come first for the whole contract.")],
        ["eye", c.L("โปร่งใส ตรวจสอบได้", "Nothing hidden"), c.L("ค่าใช้จ่าย เงื่อนไข และสัญญาจ้าง แจ้งเป็นลายลักษณ์อักษร ตรวจสอบได้ทุกขั้นตอน", "Costs, conditions and contracts in writing, checkable at every step.")],
        ["cap", c.L("เตรียมพร้อมก่อนเดินทาง", "Prepared before departure"), c.L("อบรมทักษะ ภาษา และวัฒนธรรมก่อนเดินทาง ให้พร้อมตั้งแต่วันแรก", "Skills, language and culture training so workers are ready on day one.")],
        ["scale", c.L("ผู้บริหารมืออาชีพ", "Experienced leadership"), c.L("ประสบการณ์ด้านกฎหมายแรงงาน การแพทย์ และการบริหารจัดการแรงงาน", "Backgrounds in labour law, medicine and workforce management.")]
      ].map(([ic, t, d], i) => `<li data-reveal style="--d:${i}"><span class="pr-ic">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}
    </ul>
  </div>
</section>

<!-- ทีมผู้บริหาร: ใส่ชื่อ-นามสกุลจริงและรูปถ่ายในแต่ละ <li> เพื่อเพิ่มความน่าเชื่อถือ (E-E-A-T) -->
<section class="sec sec--alt" id="team" aria-labelledby="team-t">
  <div class="wrap">
    ${sh(c, { id: "team-t", kick: c.L("ทีมผู้บริหาร", "Leadership"), ic: "users", h: c.L("คนที่รับผิดชอบ ทุกการจัดหางาน", "The people accountable for every placement") })}
    <ul class="team" role="list">
      ${[
        [c.L("กรรมการผู้จัดการ", "Managing Director"), c.L("กำหนดทิศทางองค์กร ดูแลมาตรฐาน และความสัมพันธ์กับพันธมิตรต่างประเทศ", "Sets direction, owns our standards and leads overseas partnerships.")],
        [c.L("ที่ปรึกษาด้านกฎหมายแรงงาน", "Labour law advisor"), c.L("ตรวจสอบสัญญาจ้างและขั้นตอนให้ถูกต้องตามกฎหมายไทยและประเทศปลายทาง", "Reviews contracts against Thai and destination-country law.")],
        [c.L("ที่ปรึกษาด้านการแพทย์", "Medical advisor"), c.L("ดูแลมาตรฐานการตรวจสุขภาพและความพร้อมก่อนเดินทาง", "Oversees medical screening and fitness to travel.")],
        [c.L("ผู้จัดการฝ่ายสรรหาและต่างประเทศ", "Recruitment and overseas manager"), c.L("คัดเลือกผู้สมัคร ประสานงานนายจ้าง และดูแลแรงงานระหว่างสัญญา", "Selects candidates, coordinates employers and supports workers.")]
      ].map(([t, d], i) => `<li data-reveal style="--d:${i}"><span class="team-av" aria-hidden="true">${icon("person")}</span><h3>${t}</h3><p class="team-name">${c.L("ชื่อ–นามสกุล", "Full name")}</p><p>${d}</p></li>`).join("")}
    </ul>
  </div>
</section>`
};

/* --------------------------------------------------------------- CONTACT */
const contact = {
  id: "contact", file: "contact.html", schemaType: "ContactPage", ogImage: "bangkok",
  crumb: { th: "ติดต่อเรา", en: "Contact" },
  title: {
    th: "ติดต่อบริษัทจัดหางานต่างประเทศ ปทุมธานี โทร 083-157-0465 | TG Oversea",
    en: "Contact TG Oversea Solutions, Pathum Thani | +66 83 157 0465"
  },
  desc: {
    th: "ปรึกษาเรื่องไปทำงานต่างประเทศฟรี โทร 083-157-0465 อีเมล tg.oversea.solutions@gmail.com สำนักงาน 91/144 หมู่ 9 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี",
    en: "Talk to a licensed Thai recruitment agency. Call +66 83 157 0465, email tg.oversea.solutions@gmail.com, or visit us in Khlong Luang, Pathum Thani."
  },
  body: (c) => `
<section class="phero phero--slim" id="top" aria-labelledby="ph-t">
  <div class="wrap">
    ${crumbs(c, contact)}
    <h1 class="h1 h1--page" id="ph-t" data-split>${c.L("คุยกับเรา ก่อนตัดสินใจ", "Talk to us before you decide")}</h1>
    <p class="lead" data-reveal style="--d:2">${c.L("ปรึกษาฟรี ไม่มีข้อผูกมัด ทั้งคนหางานและนายจ้าง ฝากข้อมูลไว้แล้วเจ้าหน้าที่จะติดต่อกลับ หรือโทรหาเราได้เลย", "Free, no-obligation advice for job seekers and employers. Leave your details and we'll call you back, or ring us now.")}</p>
  </div>
</section>
<section class="sec sec--contact" id="form" aria-label="${c.L("ช่องทางติดต่อและแบบฟอร์ม", "Contact details and form")}">
  <div class="wrap contact">
    <div class="ch">
      <a class="chc chc--big" href="tel:${CO.tel}" data-reveal>${icon("phone")}<span><small>${c.L("โทรหาเรา", "Call us")}</small><b>${CO.phone}</b></span>${icon("arrowUR")}</a>
      <a class="chc" href="mailto:${CO.email}" data-reveal style="--d:1">${icon("mail")}<span><small>${c.L("อีเมล", "Email")}</small><b>${CO.email}</b></span>${icon("arrowUR")}</a>
      <a class="chc" href="${CO.facebook}" rel="noopener" target="_blank" data-reveal style="--d:2">${icon("facebook")}<span><small>Facebook</small><b>TG Oversea Solutions</b></span>${icon("arrowUR")}</a>
      <div class="chc chc--addr" data-reveal style="--d:3">${icon("pin")}<span><small>${c.L("สำนักงาน", "Office")}</small><address>${c.L(CO.addrTh, CO.addrEn)}</address><a href="${CO.mapsUrl}" rel="noopener" target="_blank">${c.L("นำทางด้วย Google Maps", "Get directions")}${icon("arrowUR")}</a></span></div>
      <div class="chc chc--lic" data-reveal style="--d:4">${icon("badge")}<span><small>${c.L("ใบอนุญาตจัดหางานไปต่างประเทศ", "Overseas recruitment licence")}</small><b>${c.L(CO.licenseTh, CO.licenseEn)}</b></span></div>
    </div>

    <form class="form" action="mailto:${CO.email}" method="post" enctype="text/plain" data-contact novalidate data-reveal>
      <h2 class="h3">${c.L("ฝากข้อมูลให้เราติดต่อกลับ", "Leave your details")}</h2>
      <p class="form-hint">${c.L("ช่องที่มีเครื่องหมาย * ต้องกรอก", "Fields marked * are required")}</p>
      <fieldset class="seg">
        <legend class="sr">${c.L("คุณคือ", "I am")}</legend>
        <label><input type="radio" name="type" value="worker" checked>${icon("person")}${c.L("ฉันกำลังหางาน", "I'm looking for work")}</label>
        <label><input type="radio" name="type" value="employer">${icon("building")}${c.L("ฉันเป็นนายจ้าง", "I'm an employer")}</label>
      </fieldset>
      <p class="form-job" data-jobnote hidden>${icon("briefcase")}${c.L("สมัครตำแหน่ง:", "Applying for:")} <b></b></p>
      <input type="hidden" name="job">
      <script type="application/json" data-jobnames>${JSON.stringify(Object.fromEntries(JOBS.map((j) => [j.id, `${j.title[c.lang]} — ${jobPlace(c, j)}`]))).replace(/</g, "\\u003c")}</script>

      <fieldset class="grp" data-grp="worker">
        <legend class="sr">${c.L("ข้อมูลผู้สมัคร", "Your details")}</legend>
        <div class="fld"><input id="w-name" name="name" required autocomplete="name" placeholder=" "><label for="w-name">${c.L("ชื่อ–นามสกุล", "Full name")} *</label><small class="err">${c.L("กรอกชื่อ–นามสกุล", "Enter your name")}</small></div>
        <div class="fld"><input id="w-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder=" "><label for="w-phone">${c.L("เบอร์โทรศัพท์", "Phone number")} *</label><small class="err">${c.L("กรอกเบอร์โทรที่ติดต่อได้", "Enter a phone number we can reach")}</small></div>
        <div class="fld fld--sel"><select id="w-sector" name="sector">${sectorOptions(c, c.L("ยังไม่แน่ใจ", "Not sure yet"))}</select><label for="w-sector">${c.L("สายงานที่สนใจ", "Sector of interest")}</label></div>
        <div class="fld fld--sel"><select id="w-country" name="country">${countryOptions(c, c.L("ยังไม่แน่ใจ", "Not sure yet"))}</select><label for="w-country">${c.L("ประเทศที่สนใจ", "Preferred country")}</label></div>
        <div class="fld fld--full"><input id="w-email" name="email" type="email" autocomplete="email" placeholder=" "><label for="w-email">${c.L("อีเมล (ถ้ามี)", "Email (optional)")}</label><small class="err">${c.L("รูปแบบอีเมลไม่ถูกต้อง", "This email address isn't valid")}</small></div>
      </fieldset>

      <fieldset class="grp" data-grp="employer" disabled>
        <legend class="sr">${c.L("ข้อมูลนายจ้าง", "Company details")}</legend>
        <div class="fld"><input id="e-company" name="company" required autocomplete="organization" placeholder=" "><label for="e-company">${c.L("ชื่อบริษัท", "Company")} *</label><small class="err">${c.L("กรอกชื่อบริษัท", "Enter your company name")}</small></div>
        <div class="fld"><input id="e-name" name="name" required autocomplete="name" placeholder=" "><label for="e-name">${c.L("ชื่อผู้ติดต่อ", "Contact person")} *</label><small class="err">${c.L("กรอกชื่อผู้ติดต่อ", "Enter a contact name")}</small></div>
        <div class="fld"><input id="e-email" name="email" type="email" required autocomplete="email" placeholder=" "><label for="e-email">${c.L("อีเมล", "Email")} *</label><small class="err">${c.L("กรอกอีเมลให้ถูกต้อง", "Enter a valid email")}</small></div>
        <div class="fld"><input id="e-phone" name="phone" type="tel" autocomplete="tel" placeholder=" "><label for="e-phone">${c.L("โทรศัพท์ / WhatsApp", "Phone / WhatsApp")}</label></div>
        <div class="fld"><input id="e-country" name="employer_country" autocomplete="country-name" placeholder=" "><label for="e-country">${c.L("ประเทศของนายจ้าง", "Employer's country")}</label></div>
        <div class="fld"><input id="e-roles" name="positions" placeholder=" "><label for="e-roles">${c.L("ตำแหน่งและจำนวนที่ต้องการ", "Roles and headcount")}</label></div>
      </fieldset>

      <div class="fld fld--full fld--msg"><textarea id="f-msg" name="message" rows="4" placeholder=" "></textarea><label for="f-msg">${c.L("รายละเอียดเพิ่มเติม เช่น ประสบการณ์ หรือคำถาม", "Anything else, such as experience or questions")}</label></div>
      <label class="consent"><input type="checkbox" name="consent" required><span>${c.L("ยินยอมให้บริษัทใช้ข้อมูลนี้เพื่อติดต่อกลับเรื่องการจัดหางานเท่านั้น", "I agree TG may use these details only to contact me about recruitment.")}</span></label>
      <small class="err err--consent">${c.L("กรุณาติ๊กยินยอมก่อนส่ง", "Tick the box to agree before sending")}</small>
      <button class="btn btn-ac btn-block btn-lg" type="submit">${c.L("ส่งข้อมูล", "Send details")}${icon("arrow")}</button>
      <p class="form-hint">${c.L("เมื่อกดส่ง ระบบจะเปิดแอปอีเมลของคุณพร้อมข้อความที่กรอกไว้", "Sending opens your email app with your message ready.")}</p>
      <div class="form-done" data-done hidden tabindex="-1">
        ${icon("check")}
        <div><h3>${c.L("เตรียมข้อความเรียบร้อย", "Your message is ready")}</h3><p>${c.L(`กดส่งในแอปอีเมลที่เปิดขึ้นมา หากแอปไม่เปิด โทรหาเราได้ที่ ${CO.phone}`, `Press send in the email app that opened. If nothing opened, call us on ${CO.phone}.`)}</p></div>
      </div>
    </form>
  </div>
</section>

<section class="map wrap" id="map" aria-label="${c.L("แผนที่สำนักงาน", "Office map")}" data-reveal>
  <iframe title="${c.L("แผนที่สำนักงาน TG Oversea Solutions", "Map of the TG Oversea Solutions office")}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    src="https://maps.google.com/maps?q=91%2F144%20Moo%209%20Khlong%20Nueng%2C%20Khlong%20Luang%2C%20Pathum%20Thani%2012120&amp;z=15&amp;output=embed"></iframe>
</section>`
};

export const PAGES = [home, jobs, services, process, about, contact];
