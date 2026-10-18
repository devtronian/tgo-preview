/* v5 page definitions. Each renders twice: Thai at /, English at /en/. */
import { CO, SITE_URL, SECTORS, COUNTRIES, EMIT_JOB_POSTING } from "./site.mjs";
import { JOBS } from "./jobs.mjs";
import { icon, crumbs } from "./layout.mjs";
import { photo, photoUrl } from "./img.mjs";
import {
  SECTOR_INFO, DESTS, HERO_SLIDES, certCard, sectorAccordion, destCarousel, stepStack,
  FAQ, faqList, scamChecks, countryOptions, sectorOptions, worldMap
} from "./content.mjs";

const SLIDE_INFO = Object.fromEntries(DESTS.filter((d) => d.img).map((d) => [d.img, d]));

/* Inner-page hero: kinetic title, lead and a wide photo window with parallax. */
const pageHero = (c, page, h1, lead, img, alt, extra = "") => `
<section class="phero" aria-labelledby="ph-t">
  <div class="hero-bg" aria-hidden="true"><i></i><i></i></div>
  <div class="wrap">
    ${crumbs(c, page)}
    <h1 class="display display--md" id="ph-t" data-split>${h1}</h1>
    <p class="lead" data-reveal style="--d:3">${lead}</p>
    ${extra}
  </div>
  <div class="wrap">
    <div class="phero-win" data-scrub="view" data-reveal="clip">${photo(c, img, alt, { sizes: "(max-width: 1320px) 100vw, 1280px", eager: true, high: true })}</div>
  </div>
</section>`;

const preloadImg = (name) => (c) => `<link rel="preload" as="image" href="${photoUrl(c, name)}" imagesrcset="${photoUrl(c, name, 640)} 640w, ${photoUrl(c, name)} 1280w" imagesizes="(max-width: 1320px) 100vw, 1280px" fetchpriority="high">`;

/* ------------------------------------------------------------------ HOME */
const home = {
  id: "home", file: "index.html", ogImage: "wing",
  title: {
    th: "บริษัทจัดหางานไปทำงานต่างประเทศ ถูกกฎหมาย | TG Oversea Solutions",
    en: "Licensed Thai Overseas Recruitment Agency | TG Oversea Solutions"
  },
  desc: {
    th: "หางานต่างประเทศกับบริษัทจัดหางานที่ได้รับอนุญาต ต. 1307/2569 ส่งคนไทยไปทำงานซาอุฯ ดูไบ โอมาน คูเวต ออสเตรเลีย นิวซีแลนด์ งานนวดแผนไทย สปา ช่าง โรงงาน เกษตร ปรึกษาฟรี",
    en: "Licensed Thai recruitment agency (T. 1307/2569) placing massage and spa therapists, trades, factory and farm workers in the Middle East, Australia, NZ and Asia."
  },
  preload: (c) => `<link rel="preload" as="image" href="${photoUrl(c, HERO_SLIDES[0], 640)}" fetchpriority="high">`,
  body: (c) => `
<section class="hero" aria-labelledby="hero-t">
  <div class="hero-bg" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <a class="pill" href="about.html#licence" data-reveal style="--d:0">
        <span class="pill-ic">${icon("shield")}</span>${c.L(`ใบอนุญาตจัดหางาน ${CO.licenseTh}`, `Licence ${CO.licenseEn}`)}<span class="pill-x"><span class="pill-xt">${c.L("ตรวจสอบได้", "Verifiable")}</span>${icon("arrow")}</span>
      </a>
      <h1 class="display" id="hero-t" data-split>
        <span class="ln">${c.L("หางานต่างประเทศ", "Work abroad,")}</span>
        <span class="ln">${c.L("อย่างมั่นใจ", "confidently")} <span class="hpill" aria-hidden="true">${HERO_SLIDES.slice(0, 3).map((s, i) => `<img src="${photoUrl(c, s, 640)}" alt="" width="128" height="64" class="${i === 0 ? "is-on" : ""}" decoding="async">`).join("")}</span></span>
        <span class="ln">${c.L("และถูกกฎหมาย", "and legally.")}</span>
      </h1>
      <p class="lead" data-reveal style="--d:4">${c.L(
        "บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น ส่งคนไทยไปทำงานในตะวันออกกลาง ออสเตรเลีย นิวซีแลนด์ ยุโรป และเอเชีย ดูแลครบตั้งแต่เอกสาร อบรม วีซ่า จนถึงวันทำงานจริง",
        "TG Oversea Solutions places Thai workers with employers in the Middle East, Australia, New Zealand, Europe and Asia, handling documents, training and visas through to your first day at work.")}</p>
      <form class="search" action="jobs.html" method="get" role="search" aria-label="${c.L("ค้นหาตำแหน่งงาน", "Find a job")}" data-reveal style="--d:5">
        <div class="search-f">
          <label for="q-sector">${c.L("สายงาน", "Sector")}</label>
          <select id="q-sector" name="sector">${sectorOptions(c, c.L("ทุกสายงาน", "All sectors"))}</select>
        </div>
        <div class="search-f">
          <label for="q-country">${c.L("ประเทศ", "Country")}</label>
          <select id="q-country" name="country">${countryOptions(c, c.L("ทุกประเทศ", "All countries"))}</select>
        </div>
        <button class="btn btn-acc" type="submit" data-magnet>${icon("search")}<span>${c.L("ค้นหางาน", "Find jobs")}</span></button>
      </form>
      <ul class="hero-trust" role="list" data-reveal style="--d:6">
        <li>${icon("check")}${c.L("ปรึกษาฟรี", "Free advice")}</li>
        <li>${icon("check")}${c.L("ค่าใช้จ่ายแจ้งเป็นลายลักษณ์อักษร", "Costs in writing")}</li>
        <li>${icon("check")}${c.L("ดูแลตลอดสัญญา", "Care for the whole contract")}</li>
      </ul>
    </div>

    <div class="hero-vis" data-reveal="pop" style="--d:2">
      <div class="porthole" data-tilt data-rotator>
        <div class="ph-glass">
          ${HERO_SLIDES.map((s, i) => {
            const d = SLIDE_INFO[s];
            return `<figure class="ph-slide${i === 0 ? " is-on" : ""}" data-code="${d.code}" data-city="${d.city[c.lang]}, ${c.L(COUNTRIES[d.c].th, COUNTRIES[d.c].en)}" data-fly="${d.fly[c.lang]}">
            <img src="${photoUrl(c, s, 640)}" srcset="${photoUrl(c, s, 640)} 640w, ${photoUrl(c, s)} 1280w" sizes="(max-width: 900px) 80vw, 480px" alt="${d.alt[c.lang]}" width="640" height="${s === "europe" ? 960 : 427}"${i ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">
          </figure>`;
          }).join("\n          ")}
          <span class="ph-shade" aria-hidden="true"></span>
          <span class="ph-shine" aria-hidden="true"></span>
        </div>
      </div>
      <div class="fcard fcard--route" aria-hidden="true">
        <span class="rt-a">BKK</span><span class="rt-line"><i></i>${icon("plane")}</span><span class="rt-b" data-ph-code>DXB</span>
        <span class="rt-meta"><b data-ph-city>${c.L("ดูไบ, สหรัฐอาหรับเอมิเรตส์", "Dubai, United Arab Emirates")}</b><span data-ph-fly>${c.L("≈ 6 ชม.", "≈ 6 h")}</span></span>
      </div>
      <div class="fcard fcard--clock">${icon("clock")}<span>${c.L("เวลากรุงเทพฯ", "Bangkok time")}<b data-clock>--:--</b></span></div>
      <a class="fcard fcard--jobs" href="jobs.html"><b data-count="${JOBS.length}">${JOBS.length}</b><span>${c.L("ตำแหน่งเปิดรับ", "open jobs")}</span>${icon("arrowUR")}</a>
    </div>
  </div>
  <a class="hero-down" href="#opens-t" aria-label="${c.L("เลื่อนลงไปดูต่อ", "Scroll down")}"><span></span></a>
</section>

<div class="mq" aria-hidden="true">
  ${[0, 1].map((r) => `<div class="mq-row${r ? " mq-row--r" : ""}"><div class="mq-t">${[0, 1].map(() => (r
    ? c.L(["ช่างเชื่อม", "ช่างไฟฟ้า", "พนักงานฝ่ายผลิต", "แรงงานฟาร์ม", "งานเรือนกระจก", "ตรวจสอบคุณภาพ"], ["Welders", "Electricians", "Production operators", "Farm workers", "Greenhouse staff", "QC inspectors"])
    : c.L(["นักนวดแผนไทย", "ผู้เชี่ยวชาญสปา", "เชฟอาหารไทย", "พนักงานโรงแรม", "ผู้ช่วยครัว", "เวลเนส"], ["Thai massage", "Spa therapists", "Thai chefs", "Hotel staff", "Kitchen crew", "Wellness"])
  ).map((t) => `<span>${t}</span>${icon("sparkle")}`).join("")).join("")}</div></div>`).join("\n  ")}
</div>

<section class="opens" aria-labelledby="opens-t" data-scrub="sticky">
  <div class="opens-stage">
    <div class="opens-win">${photo(c, "wing", c.L("ปีกเครื่องบินเหนือก้อนเมฆยามพระอาทิตย์ขึ้น", "An aircraft wing above the clouds at sunrise"), { sizes: "100vw" })}</div>
    <div class="opens-copy">
      <h2 id="opens-t" class="display display--lg">${c.L("หน้าต่างบานเดียว<br>ที่เปิดสู่โลกกว้าง", "One window,<br>a whole world of work")}</h2>
      <ul class="stats" role="list">
        <li><b><span data-count="8">8</span></b><span>${c.L("ประเทศและภูมิภาคปลายทาง", "destination countries and regions")}</span></li>
        <li><b><span data-count="4">4</span></b><span>${c.L("สายงานที่เชี่ยวชาญ", "specialist sectors")}</span></li>
        <li><b><span data-count="5">5</span>+</b><span>${c.L("ปีประสบการณ์บริหารแรงงาน", "years managing workforces")}</span></li>
        <li><b><span data-count="100">100</span>%</b><span>${c.L("ดำเนินการถูกต้องตามกฎหมาย", "licensed and legal")}</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="why-t">
  <div class="wrap">
    <div class="sh">
      <p class="kick">${icon("sparkle")}${c.L("ทำไมต้อง TG Oversea", "Why TG Oversea")}</p>
      <h2 id="why-t" class="h2" data-split>${c.L("ไว้ใจได้ ตั้งแต่วันสมัคร จนถึงวันกลับบ้าน", "Trusted from the day you apply to the day you come home")}</h2>
    </div>
    <div class="bento">
      <article class="bx bx--map" data-reveal data-spot>
        <div class="bx-h"><h3>${c.L("เครือข่ายใน 4 ภูมิภาค", "A network across four regions")}</h3><p>${c.L("ตะวันออกกลาง โอเชียเนีย ยุโรป และเอเชีย ทุกเส้นทางเริ่มจากกรุงเทพฯ", "Middle East, Oceania, Europe and Asia. Every route starts in Bangkok.")}</p></div>
        ${worldMap(c)}
      </article>
      <article class="bx bx--lic" data-reveal style="--d:1" data-spot>
        <div class="bx-h"><h3>${c.L("ถูกกฎหมาย ตรวจสอบได้", "Licensed and verifiable")}</h3></div>
        ${certCard(c)}
      </article>
      <article class="bx bx--cost" data-reveal style="--d:2" data-spot>
        <div class="bx-h"><h3>${c.L("ค่าใช้จ่ายโปร่งใส", "Costs you can see")}</h3><p>${c.L("แจ้งทุกรายการก่อนเซ็นสัญญา และออกใบเสร็จในนามบริษัท", "Every item before you sign, with a company receipt.")}</p></div>
        <div class="rcpt" aria-hidden="true">
          <p class="rcpt-h">${icon("receipt")}TG OVERSEA</p>
          ${[c.L("ตรวจสุขภาพ", "Medical"), c.L("วีซ่าทำงาน", "Work visa"), c.L("อบรมก่อนเดินทาง", "Pre-departure training"), c.L("ค่าบริการตามอัตรากฎหมาย", "Service fee, legal rate")].map((t, i) => `<p class="rcpt-l" style="--i:${i}"><span>${t}</span><i></i>${icon("check")}</p>`).join("")}
          <p class="rcpt-f">${c.L("ใบเสร็จในนามบริษัท", "Company receipt")}</p>
        </div>
      </article>
      <article class="bx bx--train" data-reveal style="--d:3" data-spot>
        <div class="bx-h"><h3>${c.L("อบรมก่อนบิน", "Trained before take-off")}</h3><p>${c.L("ภาษา วัฒนธรรม และกฎหมายของประเทศปลายทาง", "Language, culture and local law for your destination.")}</p></div>
        <p class="hello" aria-hidden="true">${["สวัสดี", "Hello", "مرحبا", "Kia ora", "Guten Tag", "你好"].map((w, i) => `<span style="--i:${i}">${w}</span>`).join("")}</p>
      </article>
      <article class="bx bx--care" data-reveal style="--d:4" data-spot>
        <div class="bx-h"><h3>${c.L("ดูแลตลอดสัญญา", "Care for the whole contract")}</h3><p>${c.L("มีเจ้าหน้าที่ที่ติดต่อได้จริง ตั้งแต่วันแรกถึงวันกลับบ้าน", "A real contact person from day one to the day you return.")}</p></div>
        <div class="chat" aria-hidden="true">
          <p class="msg msg--in" style="--i:0">${c.L("ถึงที่พักแล้วนะคะ ห้องเรียบร้อยดี 🙏", "Arrived at the dorm, room looks great 🙏")}</p>
          <p class="msg msg--out" style="--i:1">${c.L("ดีใจด้วยครับ พรุ่งนี้ 9 โมงมีรถรับไปปฐมนิเทศนะครับ", "Great! A car picks you up at 9 tomorrow for induction.")}</p>
          <p class="msg msg--in" style="--i:2">${c.L("ขอบคุณค่ะ 😊", "Thank you 😊")}</p>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="sec sec--alt" aria-labelledby="sectors-t">
  <div class="wrap">
    <div class="sh sh--row">
      <div>
        <p class="kick">${icon("briefcase")}${c.L("สายงานที่เปิดรับ", "What we recruit for")}</p>
        <h2 id="sectors-t" class="h2" data-split>${c.L("สี่สายงาน ที่เราเชี่ยวชาญ", "Four sectors, one careful process")}</h2>
      </div>
      <p class="lead" data-reveal>${c.L("ทุกตำแหน่งผ่านการตรวจสอบนายจ้างและเงื่อนไขการจ้างก่อนเปิดรับสมัคร เลือกสายงานเพื่อดูรายละเอียด", "Every role is checked for employer and contract terms before we recruit. Pick a sector to see more.")}</p>
    </div>
    ${sectorAccordion(c)}
  </div>
</section>

<section class="sec" aria-labelledby="dest-t">
  <div class="wrap">
    <div class="sh sh--row">
      <div>
        <p class="kick">${icon("globe")}${c.L("ประเทศปลายทาง", "Destinations")}</p>
        <h2 id="dest-t" class="h2" data-split>${c.L("ออกเดินทางจากกรุงเทพฯ ไปทำงานทั่วโลก", "From Bangkok to workplaces worldwide")}</h2>
      </div>
      <p class="lead" data-reveal>${c.L("ประเทศที่เราส่งแรงงานไปแล้ว และเครือข่ายพันธมิตรที่พร้อมรับแรงงานไทย ลากหรือเลื่อนเพื่อดูทั้งหมด", "Countries where we've placed workers, and partner networks ready for Thai staff. Drag or scroll to see them all.")}</p>
    </div>
  </div>
  ${destCarousel(c)}
</section>

<section class="sec sec--alt" aria-labelledby="journey-t">
  <div class="wrap">
    <div class="sh sh--row">
      <div>
        <p class="kick">${icon("takeoff")}${c.L("เส้นทางของคุณ", "Your journey")}</p>
        <h2 id="journey-t" class="h2" data-split>${c.L("4 ขั้นตอน จากใบสมัคร ถึงวันเริ่มงาน", "Four steps from application to first shift")}</h2>
      </div>
      <a class="btn btn-line" href="process.html" data-reveal>${c.L("ดูขั้นตอนและเอกสารทั้งหมด", "Full steps and documents")}${icon("arrow")}</a>
    </div>
    ${stepStack(c)}
  </div>
</section>

<section class="sec" aria-labelledby="emp-t">
  <div class="wrap">
    <div class="emp-band" data-reveal="clip">
      ${photo(c, "construction", c.L("คนงานก่อสร้างกำลังทำงานบนไซต์", "Construction workers on site"), { sizes: "(max-width: 1320px) 100vw, 1280px" })}
      <div class="emp-card">
        <p class="kick">${icon("building")}${c.L("สำหรับนายจ้างต่างประเทศ", "For overseas employers")}</p>
        <h2 id="emp-t" class="h2" data-split>${c.L("แรงงานไทย ที่พร้อมทำงานตั้งแต่วันแรก", "Thai workers ready from day one")}</h2>
        <ul role="list">
          <li>${icon("check")}${c.L("คัดกรองประวัติ สัมภาษณ์ และทดสอบทักษะก่อนเสนอชื่อ", "Background checks, interviews and trade tests before shortlisting")}</li>
          <li>${icon("check")}${c.L("ดำเนินการสัญญา วีซ่า และตรวจสุขภาพครบตามกฎหมาย", "Contracts, visas and medicals handled to the letter")}</li>
          <li>${icon("check")}${c.L("ผู้ประสานงานคนเดียว และติดตามผลหลังเริ่มงาน", "One coordinator, and follow-up after workers start")}</li>
        </ul>
        <a class="btn btn-acc" href="contact.html?type=employer" data-magnet>${c.L("ขอรายชื่อผู้สมัคร", "Request candidates")}${icon("arrow")}</a>
      </div>
    </div>
  </div>
</section>

<!-- รีวิวด้านล่างเป็น "ตัวอย่างเพื่อแสดงดีไซน์" ต้องแทนด้วยรีวิวจริงที่ได้รับอนุญาตก่อนเผยแพร่ (ห้ามใส่ใน Schema) -->
<section class="sec sec--alt voices" aria-labelledby="voices-t">
  <div class="wrap">
    <div class="sh">
      <p class="kick">${icon("quote")}${c.L("เสียงจากคนทำงาน", "In their words")}</p>
      <h2 id="voices-t" class="h2" data-split>${c.L("ความสำเร็จของแรงงาน คือผลงานของเรา", "Their success is the work we're proud of")}</h2>
    </div>
    <div class="vgrid">
      ${[
        [c.L("ตอนแรกกังวลเรื่องเอกสารมาก แต่เจ้าหน้าที่อธิบายทุกขั้นตอน แจ้งค่าใช้จ่ายชัดเจนตั้งแต่แรก ตอนนี้ทำงานมาเกือบปี ที่พักดี นายจ้างดูแลดีค่ะ", "I was worried about the paperwork, but the team explained every step and the costs up front. Almost a year in now, with good housing and a caring employer."), c.L("นิภา", "Nipa"), c.L("นักนวดแผนไทย ตะวันออกกลาง", "Thai massage therapist, Middle East"), "massage"],
        [c.L("อบรมก่อนเดินทางช่วยได้เยอะ ทั้งภาษาและกฎของที่ทำงาน มีปัญหาอะไรทักไปหาเจ้าหน้าที่ก็มีคนตอบตลอด รู้สึกไม่ได้อยู่ตัวคนเดียว", "The pre-departure training helped a lot. Whenever I had a question someone always answered. I never felt on my own."), c.L("อรุณี", "Arunee"), c.L("ผู้เชี่ยวชาญสปา ดูไบ", "Spa therapist, Dubai"), "spa"],
        [c.L("ทีมที่ TG ส่งมาพร้อมทำงานตั้งแต่วันแรก เอกสารเรียบร้อย การสื่อสารชัดเจนตลอด เป็นพันธมิตรที่เราไว้ใจได้", "The team TG placed with us was ready from day one. Clean paperwork and clear communication throughout."), c.L("ผู้จัดการสปา", "Spa manager"), c.L("นายจ้าง ริยาด", "Employer, Riyadh"), "riyadh"]
      ].map(([q, n, r, img], i) => `<figure class="voice" data-reveal style="--d:${i}">
        <span class="voice-q" aria-hidden="true">${icon("quote")}</span>
        <blockquote><p>${q}</p></blockquote>
        <figcaption><span class="voice-av">${photo(c, img, "", { sizes: "56px" })}</span><span><b>${n}</b><small>${r}</small></span></figcaption>
      </figure>`).join("")}
    </div>
  </div>
</section>

${scamChecks(c)}

<section class="sec" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("info")}${c.L("คำถามที่พบบ่อย", "FAQ")}</p>
      <h2 id="faq-t" class="h2" data-split>${c.L("สิ่งที่หลายคน อยากรู้ก่อนสมัคร", "What people ask before applying")}</h2>
      <a class="btn btn-line" href="process.html#faq">${c.L("ดูคำถามทั้งหมด", "See all questions")}${icon("arrow")}</a>
    </div>
    ${faqList(c, FAQ.slice(0, 4))}
  </div>
</section>`
};

/* ------------------------------------------------------------------ JOBS */
const fmtDate = (iso, lang) => new Date(iso + "T00:00:00Z").toLocaleDateString(lang === "en" ? "en-GB" : "th-TH", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

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
    c.L("ทุกตำแหน่งตรวจสอบนายจ้างและเงื่อนไขการจ้างแล้ว เลือกสายงานหรือประเทศเพื่อกรอง แล้วกดสมัครเพื่อให้เจ้าหน้าที่ติดต่อกลับ", "Every listing is checked for employer and contract terms. Filter by sector or country, then apply and we'll call you back."),
    "construction", c.L("คนงานก่อสร้างกำลังทำงานบนไซต์งาน", "Construction workers on site")) + `
<section class="sec sec--jobs" aria-labelledby="list-t">
  <div class="wrap">
    <h2 id="list-t" class="sr">${c.L("รายการตำแหน่งงาน", "Job listings")}</h2>
    <form class="jf" action="jobs.html" method="get" data-jobfilter>
      <fieldset class="jf-chips">
        <legend class="sr">${c.L("สายงาน", "Sector")}</legend>
        <label class="chip"><input type="radio" name="sector" value="" checked><span>${c.L("ทุกสายงาน", "All")}</span></label>
        ${Object.entries(SECTORS).map(([k, s]) => `<label class="chip"><input type="radio" name="sector" value="${k}"><span>${icon(s.icon)}${c.L(s.th, s.en)}</span></label>`).join("\n        ")}
      </fieldset>
      <div class="jf-row">
        <div class="search-f">
          <label for="j-country">${c.L("ประเทศ", "Country")}</label>
          <select id="j-country" name="country">${countryOptions(c, c.L("ทุกประเทศ", "All countries"))}</select>
        </div>
        <p class="jcount" role="status" aria-live="polite" data-count-out data-tpl="${c.L("แสดง {n} จาก {t} ตำแหน่ง", "Showing {n} of {t} jobs")}">${c.L(`ทั้งหมด ${JOBS.length} ตำแหน่ง`, `${JOBS.length} jobs`)}</p>
        <button class="btn btn-acc jf-go" type="submit">${icon("filter")}${c.L("กรองรายการ", "Filter")}</button>
      </div>
    </form>

    <div class="jobs" data-jobs>
${JOBS.map((j) => {
  const s = SECTORS[j.sector], n = COUNTRIES[j.country];
  const loc = j.city[c.lang] === n[c.lang] ? n[c.lang] : `${j.city[c.lang]}, ${n[c.lang]}`;
  return `      <article class="job" id="job-${j.id}" data-sector="${j.sector}" data-country="${j.country}" data-spot>
        <div class="job-img">${photo(c, SECTOR_INFO[j.sector].img, "", { sizes: "(max-width: 640px) 100vw, 400px" })}<span class="job-sec">${icon(s.icon)}${c.L(s.th, s.en)}</span></div>
        <div class="job-b">
          <h3 class="job-t">${j.title[c.lang]}</h3>
          <p class="job-loc">${icon("pin")}${loc}</p>
          <ul class="job-req" role="list">${j.req[c.lang].map((r) => `<li>${icon("check")}${r}</li>`).join("")}</ul>
          <div class="job-foot">
            <p>${c.L("ปิดรับ", "Closes")} <time datetime="${j.until}">${fmtDate(j.until, c.lang)}</time></p>
            <a class="btn btn-sm btn-acc" href="contact.html?type=worker&amp;job=${j.id}">${c.L("สมัคร", "Apply")}<span class="sr"> — ${j.title[c.lang]}, ${n[c.lang]}</span>${icon("arrow")}</a>
          </div>
        </div>
      </article>`;
}).join("\n")}
    </div>
    <div class="jempty" data-empty hidden>
      ${icon("search")}
      <h3>${c.L("ยังไม่มีตำแหน่งที่ตรงกับตัวกรองนี้", "No jobs match this filter yet")}</h3>
      <p>${c.L("ลองเลือก “ทุกประเทศ” หรือ “ทุกสายงาน” หรือฝากข้อมูลไว้ เราจะแจ้งเมื่อมีตำแหน่งใหม่ที่ตรงกับคุณ", "Try “All countries” or “All sectors”, or leave your details and we'll tell you when a matching job opens.")}</p>
      <a class="btn btn-acc" href="contact.html?type=worker">${c.L("ฝากข้อมูลไว้", "Leave your details")}</a>
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
    c.L("สรรหาและคัดเลือกคนไทยไปทำงานต่างประเทศ ทั้งสายช่าง โรงงาน เกษตร และงานบริการ สปา คุณไม่ต้องติดต่อหลายที่ เราดูแลเองทุกขั้นและแจ้งความคืบหน้าตลอด", "We recruit Thai workers for skilled trades, manufacturing, agriculture and hospitality abroad, handling every stage ourselves and keeping you updated."),
    "recruitment", c.L("เจ้าหน้าที่สรรหาแสดงความยินดีกับผู้สมัคร", "Recruiters celebrating with a candidate"),
    `<div class="btn-row" data-reveal style="--d:4"><a class="btn btn-acc" href="jobs.html" data-magnet>${c.L("ดูตำแหน่งงาน", "See jobs")}${icon("arrow")}</a><a class="btn btn-line" href="#employers">${c.L("สำหรับนายจ้าง", "For employers")}</a></div>`) + `
<section class="sec" aria-labelledby="svc-t">
  <div class="wrap">
    <div class="sh">
      <p class="kick">${icon("sparkle")}${c.L("บริการแบบครบวงจร", "End-to-end support")}</p>
      <h2 id="svc-t" class="h2" data-split>${c.L("หกบริการ ที่ต่อกันเป็นเส้นทางเดียว", "Six services, one connected journey")}</h2>
    </div>
    <ol class="svc" role="list">
      ${SERVICES.map(([ic, t, d], i) => `<li data-reveal style="--d:${i % 3}" data-spot><span class="svc-ic">${icon(ic)}</span><span class="svc-n">${String(i + 1).padStart(2, "0")}</span><h3>${t[c.lang]}</h3><p>${d[c.lang]}</p></li>`).join("")}
    </ol>
  </div>
</section>

<section class="sec sec--alt" aria-labelledby="sectors-t">
  <div class="wrap">
    <div class="sh"><p class="kick">${icon("briefcase")}${c.L("สายงาน", "Sectors")}</p><h2 id="sectors-t" class="h2" data-split>${c.L("สายงานของเรา", "Our sectors")}</h2></div>
    <div class="rows">
      ${Object.entries(SECTORS).map(([k, s], i) => {
        const info = SECTOR_INFO[k];
        return `<article class="row${i % 2 ? " row--r" : ""}" id="sector-${k}">
        <div class="row-img" data-scrub="view" data-reveal="clip">${photo(c, info.img, info.alt[c.lang], { sizes: "(max-width: 900px) 100vw, 50vw" })}</div>
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

<section class="sec" aria-labelledby="dest-t">
  <div class="wrap">
    <div class="sh sh--row">
      <div><p class="kick">${icon("globe")}${c.L("ประเทศปลายทาง", "Destinations")}</p><h2 id="dest-t" class="h2" data-split>${c.L("ประเทศที่เรา ส่งแรงงานไปทำงาน", "Where our workers go")}</h2></div>
      <p class="lead" data-reveal>${c.L("ทั้งประเทศที่เรามีผลงานแล้ว และเครือข่ายพันธมิตรที่พร้อมเปิดรับแรงงานไทย", "Countries with a placement track record, and partner networks ready to welcome Thai workers.")}</p>
    </div>
  </div>
  ${destCarousel(c)}
</section>

<section class="sec sec--ink" id="employers" aria-labelledby="emp-t">
  <div class="wrap emp">
    <div>
      <p class="kick">${icon("building")}${c.L("สำหรับนายจ้างและพันธมิตร", "For employers and partners")}</p>
      <h2 id="emp-t" class="h2" data-split>${c.L("ต้องการแรงงานไทย ที่พร้อมทำงานตั้งแต่วันแรก?", "Need Thai workers who are ready on day one?")}</h2>
      <p class="lead">${c.L("แจ้งตำแหน่ง จำนวน และคุณสมบัติที่ต้องการ เราจะเสนอรายชื่อผู้สมัครที่ผ่านการคัดกรอง และดำเนินการเอกสารทั้งหมดตามขั้นตอนของกรมการจัดหางาน", "Tell us the roles, headcount and requirements. We'll shortlist screened candidates and handle all paperwork under Thailand's Department of Employment procedures.")}</p>
      <div class="btn-row">
        <a class="btn btn-acc" href="contact.html?type=employer" data-magnet>${c.L("ส่งความต้องการ", "Send your requirements")}${icon("arrow")}</a>
        <a class="btn btn-line" href="mailto:${CO.email}">${icon("mail")}${c.L("ส่งอีเมล", "Email us")}</a>
      </div>
    </div>
    <ol class="emp-steps" role="list">
      ${[
        [c.L("แจ้งความต้องการ", "Share your requirements"), c.L("ตำแหน่ง จำนวน คุณสมบัติ เงื่อนไขการจ้าง ที่พัก และสวัสดิการ", "Positions, headcount, qualifications, terms, housing and benefits")],
        [c.L("สรรหาและคัดเลือก", "Sourcing and shortlisting"), c.L("คัดกรอง ทดสอบฝีมือ และสัมภาษณ์ทางวิดีโอหรือที่ประเทศไทย", "Screening, trade tests and interviews by video or in Thailand")],
        [c.L("เอกสารและการอนุญาต", "Compliance and processing"), c.L("สัญญาจ้าง อนุมัติจากกรมการจัดหางาน ตรวจสุขภาพ และวีซ่า", "Contracts, department approval, medicals and visas")],
        [c.L("ส่งตัวและติดตามผล", "Deployment and follow-up"), c.L("ส่งแรงงานถึงไซต์ ช่วยปรับตัว และติดตามผลตลอดสัญญา", "Workers delivered to site, supported and followed up")]
      ].map(([t, d], i) => `<li data-reveal style="--d:${i}"><span>${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join("")}
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

const process = {
  id: "process", file: "process.html", ogImage: "seedlings",
  crumb: { th: "ขั้นตอนการสมัคร", en: "How it works" },
  title: {
    th: "ขั้นตอนไปทำงานต่างประเทศ เอกสาร ค่าใช้จ่าย คำถามที่พบบ่อย",
    en: "How to Work Abroad from Thailand: Steps, Documents, FAQ | TG Oversea"
  },
  desc: {
    th: "ไปทำงานต่างประเทศต้องทำอย่างไร 4 ขั้นตอนตั้งแต่สมัครถึงเดินทาง เอกสารที่ต้องเตรียม ค่าใช้จ่าย ระยะเวลา และวิธีตรวจสอบบริษัทจัดหางานถูกกฎหมาย",
    en: "How working abroad from Thailand works: four steps from application to departure, the documents you need, costs, timelines, and how to check an agency is licensed."
  },
  preload: preloadImg("seedlings"),
  schema: (c) => ({ "@type": "FAQPage", "@id": c.url() + "#faq", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q[c.lang], acceptedAnswer: { "@type": "Answer", text: a[c.lang] } })) }),
  body: (c) => pageHero(c, process,
    c.L("ขั้นตอนไปทำงานต่างประเทศ ชัดเจน ตั้งแต่วันแรก", "How working abroad works, clear from day one"),
    c.L("รู้ล่วงหน้าว่าต้องทำอะไร เตรียมอะไร และเราดูแลส่วนไหนให้ ไม่มีขั้นตอนที่ซ่อนอยู่", "Know in advance what happens, what to prepare and what we take care of. No hidden steps."),
    "seedlings", c.L("มือกำลังปลูกต้นกล้าลงในถาดเพาะ", "A hand planting seedlings in a tray"),
    `<nav class="toc" aria-label="${c.L("ในหน้านี้", "On this page")}" data-reveal style="--d:4"><a href="#worker">${c.L("สำหรับคนหางาน", "For job seekers")}</a><a href="#employer">${c.L("สำหรับนายจ้าง", "For employers")}</a><a href="#documents">${c.L("เอกสารที่ต้องใช้", "Documents")}</a><a href="#faq">${c.L("คำถามที่พบบ่อย", "FAQ")}</a></nav>`) + `
<section class="sec" id="worker" aria-labelledby="worker-t">
  <div class="wrap">
    <div class="sh"><p class="kick">${icon("person")}${c.L("สำหรับคนหางาน", "For job seekers")}</p><h2 id="worker-t" class="h2" data-split>${c.L("4 ขั้นตอน จากวันสมัคร ถึงวันทำงานจริง", "Four steps from applying to your first day at work")}</h2></div>
    ${stepStack(c)}
  </div>
</section>

<section class="sec sec--alt" id="employer" aria-labelledby="employer-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("building")}${c.L("สำหรับนายจ้าง", "For employers")}</p>
      <h2 id="employer-t" class="h2" data-split>${c.L("จากคำขอของคุณ ถึงแรงงาน ที่เริ่มงานที่ไซต์ของคุณ", "From your job order to workers starting on your site")}</h2>
      <a class="btn btn-acc" href="contact.html?type=employer" data-magnet>${c.L("ส่งความต้องการ", "Send your requirements")}${icon("arrow")}</a>
    </div>
    <ol class="tl" role="list" data-scrub="view">
      ${[
        [c.L("แจ้งความต้องการ", "Share your requirements"), c.L("ระบุตำแหน่ง จำนวน คุณสมบัติ เงื่อนไขการจ้าง ที่พัก และสวัสดิการ เพื่อให้เราวางแผนการสรรหาได้ตรงจุด", "Positions, headcount, qualifications, terms, housing and benefits, so we can plan sourcing precisely."), c.L("คุณส่ง: Job order และเงื่อนไขการจ้าง", "You send: job order and terms")],
        [c.L("สรรหาและคัดเลือก", "Sourcing and shortlisting"), c.L("คัดกรองประวัติ ทดสอบฝีมือ และจัดสัมภาษณ์ทางวิดีโอหรือที่ประเทศไทย ให้คุณเลือกผู้สมัครที่ใช่", "Screening, trade tests and interviews by video or in Thailand, so you choose the right people."), c.L("คุณเลือก: ผู้สมัครจาก shortlist", "You choose: from the shortlist")],
        [c.L("เอกสารและการอนุญาต", "Compliance and processing"), c.L("จัดทำสัญญาจ้าง ขออนุมัติจากกรมการจัดหางาน ตรวจสุขภาพ และยื่นวีซ่า ครบถ้วนถูกต้องตามกฎหมาย", "Contracts, Department of Employment approval, medicals and visas, complete and compliant."), c.L("คุณลงนาม: สัญญาจ้างและเอกสารนายจ้าง", "You sign: contracts and employer documents")],
        [c.L("ส่งตัวและติดตามผล", "Deployment and follow-up"), c.L("ส่งแรงงานถึงสถานที่ทำงาน ช่วยปรับตัวช่วงแรก และติดตามผลต่อเนื่องตลอดสัญญา", "Workers delivered to site, supported through onboarding and followed up throughout the contract."), c.L("เราดูแล: ตลอดระยะสัญญา", "We stay involved: the whole contract")]
      ].map(([t, d, y], i) => `<li class="tl-i" data-reveal><span class="tl-n">${i + 1}</span><div><h3>${t}</h3><p>${d}</p><p class="tl-you">${y}</p></div></li>`).join("")}
    </ol>
  </div>
</section>

<section class="sec" id="documents" aria-labelledby="docs-t">
  <div class="wrap split">
    <div class="sh">
      <p class="kick">${icon("doc")}${c.L("เตรียมเอกสาร", "Get your documents ready")}</p>
      <h2 id="docs-t" class="h2" data-split>${c.L("เอกสารที่ต้องใช้ ในการสมัคร", "Documents you'll need")}</h2>
      <p class="lead">${c.L("ติ๊กรายการที่คุณมีแล้วเพื่อดูว่าพร้อมแค่ไหน ขาดอะไรไป เจ้าหน้าที่ช่วยแนะนำวิธีเตรียมได้", "Tick what you already have to see how ready you are. Missing something? We'll show you how to get it.")}</p>
      <div class="ring" data-ring aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52"/><circle class="ring-v" cx="60" cy="60" r="52" pathLength="100"/></svg><span><b class="docs-n"></b>/6</span></div>
    </div>
    <fieldset class="docs" data-docs>
      <legend class="sr">${c.L("รายการเอกสาร", "Document checklist")}</legend>
      ${DOCS.map(([t, d], i) => `<label class="doc" data-reveal style="--d:${i % 2}"><input type="checkbox" name="doc${i}"><span class="doc-box">${icon("check")}</span><span><b>${t[c.lang]}</b><small>${d[c.lang]}</small></span></label>`).join("")}
      <p class="docs-msg" aria-live="polite" data-docs-msg data-done="${c.L("เอกสารครบแล้ว พร้อมสมัครได้เลย", "All set, you're ready to apply")}"></p>
    </fieldset>
  </div>
</section>

<section class="sec sec--alt" id="faq" aria-labelledby="faq-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("info")}${c.L("คำถามที่พบบ่อย", "FAQ")}</p>
      <h2 id="faq-t" class="h2" data-split>${c.L("สิ่งที่หลายคนอยากรู้ก่อนสมัคร", "What people ask before applying")}</h2>
      <p class="lead">${c.L("ไม่เจอคำตอบที่ต้องการ? โทร ", "Can't find your answer? Call ")}<a href="tel:${CO.tel}">${CO.phone}</a></p>
    </div>
    ${faqList(c)}
  </div>
</section>

${scamChecks(c)}`
};

/* ----------------------------------------------------------------- ABOUT */
const about = {
  id: "about", file: "about.html", schemaType: "AboutPage", ogImage: "thai-temple",
  crumb: { th: "เกี่ยวกับเรา", en: "About" },
  title: {
    th: "เกี่ยวกับเรา | บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด",
    en: "About Us | TG Oversea Solutions, Licence T. 1307/2569"
  },
  desc: {
    th: "บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น ก่อตั้งปี 2568 ต่อยอดประสบการณ์บริหารแรงงานกว่า 5 ปีจาก T.G. Labor ได้รับใบอนุญาตจัดหางานไปต่างประเทศ ต. 1307/2569",
    en: "Founded in 2025 on five-plus years of workforce management at T.G. Labor, TG Oversea Solutions holds overseas recruitment licence T. 1307/2569."
  },
  preload: preloadImg("thai-temple"),
  body: (c) => pageHero(c, about,
    c.L("มาตรฐานใหม่ ของการไปทำงานต่างประเทศ", "A new standard for working abroad"),
    c.L("เราเชื่อว่าการไปทำงานต่างประเทศควรเป็นก้าวที่ปลอดภัย ชัดเจน และเปลี่ยนชีวิตให้ดีขึ้นจริง ไม่ใช่ความเสี่ยงที่ต้องลุ้น", "We believe going abroad for work should be a safe, clear step that genuinely improves lives, not a gamble."),
    "thai-temple", c.L("วัดไทยท่ามกลางท้องฟ้าสดใส", "A Thai temple under a clear sky")) + `
<section class="sec" aria-labelledby="story-t">
  <div class="wrap split">
    <div class="sh sh--sticky">
      <p class="kick">${icon("compass")}${c.L("เรื่องราวของเรา", "Our story")}</p>
      <h2 id="story-t" class="h2" data-split>${c.L("ต่อยอดประสบการณ์ สู่ระดับสากล", "Proven experience, taken global")}</h2>
      <p class="lead">${c.L("บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด ก่อตั้งเมื่อวันที่ 28 ตุลาคม 2568 เพื่อเปิดทางให้แรงงานไทยเข้าถึงงานที่เหมาะสมในต่างประเทศ อย่างปลอดภัย โปร่งใส และถูกต้องตามกฎหมาย โดยมีพื้นฐานจากบริษัทในเครือ T.G. Labor Co., Ltd.", "TG Oversea Solutions Recruitment Co., Ltd. was founded on 28 October 2025 to open safe, transparent and legal pathways for Thai workers to suitable jobs abroad, building on our sister company T.G. Labor Co., Ltd.")}</p>
    </div>
    <ol class="tl tl--time" role="list" data-scrub="view">
      <li class="tl-i" data-reveal><span class="tl-n">${c.L("ก่อน 2568", "Pre-2025")}</span><div><h3>${c.L("รากฐานจาก T.G. Labor", "Roots in T.G. Labor")}</h3><p>${c.L("ทีมงานสั่งสมประสบการณ์บริหารจัดการแรงงานมากกว่า 5 ปี ทั้งด้านกฎหมายแรงงาน การดูแลสุขภาพ และการประสานงานกับนายจ้าง", "More than five years managing workforces, covering labour law, health and employer coordination.")}</p></div></li>
      <li class="tl-i" data-reveal><span class="tl-n"><time datetime="2025-10-28">${c.L("ต.ค. 2568", "Oct 2025")}</time></span><div><h3>${c.L("ก่อตั้ง TG Oversea Solutions", "TG Oversea Solutions founded")}</h3><p>${c.L("ตั้งบริษัทเพื่อทำงานด้านการจัดหางานต่างประเทศโดยเฉพาะ ด้วยหลักการยึดแรงงานเป็นศูนย์กลางและความโปร่งใส", "A company dedicated to international recruitment, built on worker-centred and transparent principles.")}</p></div></li>
      <li class="tl-i" data-reveal><span class="tl-n"><time datetime="2026">${c.L("2569", "2026")}</time></span><div><h3>${c.L(`ได้รับใบอนุญาต ${CO.licenseTh}`, `Licence ${CO.licenseEn} granted`)}</h3><p>${c.L("ได้รับอนุญาตให้จัดหางานเพื่อไปทำงานต่างประเทศจากกรมการจัดหางาน กระทรวงแรงงาน", "Licensed by the Department of Employment, Ministry of Labour, to recruit for overseas work.")}</p></div></li>
      <li class="tl-i" data-reveal><span class="tl-n">${c.L("วันนี้", "Today")}</span><div><h3>${c.L("เครือข่ายใน 4 ภูมิภาค", "A network across four regions")}</h3><p>${c.L("ส่งนักนวดไทยและผู้เชี่ยวชาญสปาไปซาอุดีอาระเบีย โอมาน คูเวต ยูเออี และยุโรป พร้อมเครือข่ายพันธมิตรในออสเตรเลียและนิวซีแลนด์", "Thai massage and spa specialists placed in Saudi Arabia, Oman, Kuwait, the UAE and Europe, with partner networks in Australia and New Zealand.")}</p></div></li>
    </ol>
  </div>
</section>

<section class="band" aria-labelledby="vision-t">
  <div class="band-img" data-scrub="view">${photo(c, "bangkok", c.L("ถนนเยาวราชยามค่ำคืน กรุงเทพฯ", "Yaowarat Road at night, Bangkok"), { sizes: "100vw" })}</div>
  <div class="wrap band-in">
    <p class="kick">${icon("target")}${c.L("วิสัยทัศน์", "Vision")}</p>
    <h2 id="vision-t" class="display display--lg" data-split>${c.L("บริษัทจัดหางานต่างประเทศ ที่แรงงานไทย และนายจ้างทั่วโลก ไว้วางใจมากที่สุด", "The overseas recruiter Thai workers and employers worldwide trust most")}</h2>
  </div>
</section>

<section class="sec" aria-labelledby="mission-t">
  <div class="wrap">
    <div class="sh"><p class="kick">${icon("star")}${c.L("พันธกิจและหลักการ", "Mission and principles")}</p><h2 id="mission-t" class="h2" data-split>${c.L("ความไว้วางใจ สร้างจากวิธีทำงาน", "Trust is built in how we work")}</h2></div>
    <ul class="principles" role="list">
      ${[
        ["heart", c.L("ยึดแรงงานเป็นศูนย์กลาง", "People first"), c.L("ให้ความสำคัญกับความปลอดภัย ที่พัก และสวัสดิการของแรงงานตลอดระยะสัญญา", "Workers' safety, housing and benefits come first for the whole contract.")],
        ["eye", c.L("โปร่งใส ตรวจสอบได้", "Nothing hidden"), c.L("ค่าใช้จ่าย เงื่อนไข และสัญญาจ้าง แจ้งเป็นลายลักษณ์อักษร ตรวจสอบได้ทุกขั้นตอน", "Costs, conditions and contracts in writing, checkable at every step.")],
        ["cap", c.L("เตรียมพร้อมก่อนบิน", "Prepared before take-off"), c.L("อบรมทักษะ ภาษา และวัฒนธรรมก่อนเดินทาง ให้พร้อมตั้งแต่วันแรก", "Skills, language and culture training so workers are ready on day one.")],
        ["scale", c.L("ผู้บริหารมืออาชีพ", "Experienced leadership"), c.L("ประสบการณ์ด้านกฎหมายแรงงาน การแพทย์ และการบริหารจัดการแรงงาน", "Backgrounds in labour law, medicine and workforce management.")]
      ].map(([ic, t, d], i) => `<li data-reveal style="--d:${i}" data-spot><span class="pr-ic">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}
    </ul>
  </div>
</section>

<!-- ทีมผู้บริหาร: ใส่ชื่อ-นามสกุลจริงและรูปถ่ายในแต่ละ <li> เพื่อเพิ่มความน่าเชื่อถือ (E-E-A-T) -->
<section class="sec sec--alt" aria-labelledby="team-t">
  <div class="wrap team-wrap">
    <div class="team-img" data-reveal="clip">${photo(c, "team", c.L("ทีมงานประชุมร่วมกันในสำนักงาน", "A team meeting in an office"), { sizes: "(max-width: 900px) 100vw, 40vw" })}</div>
    <div>
      <div class="sh"><p class="kick">${icon("users")}${c.L("ทีมผู้บริหาร", "Leadership")}</p><h2 id="team-t" class="h2" data-split>${c.L("ผู้เชี่ยวชาญ ที่อยู่เบื้องหลัง ทุกการเดินทาง", "The specialists behind every journey")}</h2></div>
      <ul class="team" role="list">
        ${[
          [c.L("กรรมการผู้จัดการ", "Managing Director"), c.L("กำหนดทิศทางองค์กร ดูแลมาตรฐาน และความสัมพันธ์กับพันธมิตรต่างประเทศ", "Sets direction, owns our standards and leads overseas partnerships.")],
          [c.L("ที่ปรึกษาด้านกฎหมายแรงงาน", "Labour law advisor"), c.L("ตรวจสอบสัญญาจ้างและขั้นตอนให้ถูกต้องตามกฎหมายไทยและประเทศปลายทาง", "Reviews contracts against Thai and destination-country law.")],
          [c.L("ที่ปรึกษาด้านการแพทย์", "Medical advisor"), c.L("ดูแลมาตรฐานการตรวจสุขภาพและความพร้อมก่อนเดินทาง", "Oversees medical screening and fitness to travel.")],
          [c.L("ผู้จัดการฝ่ายสรรหาและต่างประเทศ", "Recruitment and overseas manager"), c.L("คัดเลือกผู้สมัคร ประสานงานนายจ้าง และดูแลแรงงานระหว่างสัญญา", "Selects candidates, coordinates employers and supports workers.")]
        ].map(([t, d], i) => `<li data-reveal style="--d:${i}"><span class="team-av" aria-hidden="true">${icon("person")}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join("")}
      </ul>
    </div>
  </div>
</section>

<section class="sec" id="licence" aria-labelledby="lic-t">
  <div class="wrap lic">
    <div>
      <p class="kick">${icon("shield")}${c.L("ใบอนุญาตและกฎหมาย", "Licence and legal")}</p>
      <h2 id="lic-t" class="h2" data-split>${c.L("ถูกกฎหมาย ตรวจสอบได้ทุกเมื่อ", "Fully licensed. Check us any time.")}</h2>
      <ul class="lic-l" role="list">
        <li>${icon("check")}${c.L(`ได้รับใบอนุญาตจัดหางานไปทำงานต่างประเทศ เลขที่ ${CO.licenseTh} จากกรมการจัดหางาน`, `Overseas recruitment licence no. ${CO.licenseEn} from the Department of Employment`)}</li>
        <li>${icon("check")}${c.L("ตรวจสอบรายชื่อบริษัทได้ที่เว็บไซต์กรมการจัดหางาน หรือโทรสายด่วน 1694", "Verify us on the department's website or via its 1694 hotline")}</li>
        <li>${icon("check")}${c.L("สัญญาจ้างและค่าใช้จ่ายทุกรายการเป็นลายลักษณ์อักษร ตามอัตราที่กฎหมายกำหนด", "Written contracts and itemised fees within legally permitted rates")}</li>
        <li>${icon("check")}${c.L("แรงงานทุกคนผ่านการปฐมนิเทศก่อนเดินทางตามข้อกำหนดของกรมการจัดหางาน", "Every worker completes the department's pre-departure orientation")}</li>
      </ul>
    </div>
    <div data-reveal="pop">${certCard(c, { id: "cert-about" })}</div>
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
<section class="phero phero--slim" aria-labelledby="ph-t">
  <div class="hero-bg" aria-hidden="true"><i></i><i></i></div>
  <div class="wrap">
    ${crumbs(c, contact)}
    <h1 class="display display--md" id="ph-t" data-split>${c.L("คุยกับเรา ก่อนตัดสินใจ", "Talk to us before you decide")}</h1>
    <p class="lead" data-reveal style="--d:3">${c.L("ปรึกษาฟรี ไม่มีข้อผูกมัด ทั้งคนหางานและนายจ้าง ฝากข้อมูลไว้แล้วเจ้าหน้าที่จะติดต่อกลับ หรือโทรหาเราได้เลย", "Free, no-obligation advice for job seekers and employers. Leave your details and we'll call you back, or ring us now.")}</p>
  </div>
</section>
<section class="sec sec--contact" aria-label="${c.L("ช่องทางติดต่อและแบบฟอร์ม", "Contact details and form")}">
  <div class="wrap contact">
    <div class="ch">
      <a class="chc chc--big" href="tel:${CO.tel}" data-reveal data-spot>${icon("phone")}<span><small>${c.L("โทรหาเรา", "Call us")}</small><b>${CO.phone}</b></span>${icon("arrowUR")}</a>
      <a class="chc" href="mailto:${CO.email}" data-reveal style="--d:1" data-spot>${icon("mail")}<span><small>${c.L("อีเมล", "Email")}</small><b>${CO.email}</b></span>${icon("arrowUR")}</a>
      <a class="chc" href="${CO.facebook}" rel="noopener" target="_blank" data-reveal style="--d:2" data-spot>${icon("facebook")}<span><small>Facebook</small><b>TG Oversea Solutions</b></span>${icon("arrowUR")}</a>
      <div class="chc chc--addr" data-reveal style="--d:3">${icon("pin")}<span><small>${c.L("สำนักงาน", "Office")}</small><address>${c.L(CO.addrTh, CO.addrEn)}</address><a href="${CO.mapsUrl}" rel="noopener" target="_blank">${c.L("นำทางด้วย Google Maps", "Get directions")}${icon("arrowUR")}</a></span></div>
      <div class="chc chc--lic" data-reveal style="--d:4">${icon("shield")}<span><small>${c.L("ใบอนุญาตจัดหางานไปต่างประเทศ", "Overseas recruitment licence")}</small><b>${c.L(CO.licenseTh, CO.licenseEn)}</b></span></div>
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
      <script type="application/json" data-jobnames>${JSON.stringify(Object.fromEntries(JOBS.map((j) => [j.id, `${j.title[c.lang]} — ${j.city[c.lang] === COUNTRIES[j.country][c.lang] ? COUNTRIES[j.country][c.lang] : j.city[c.lang] + ", " + COUNTRIES[j.country][c.lang]}`]))).replace(/</g, "\\u003c")}</script>

      <fieldset class="grp grp--worker" data-grp="worker">
        <legend class="sr">${c.L("ข้อมูลผู้สมัคร", "Your details")}</legend>
        <div class="fld"><input id="w-name" name="name" required autocomplete="name" placeholder=" "><label for="w-name">${c.L("ชื่อ–นามสกุล", "Full name")} *</label><small class="err">${c.L("กรอกชื่อ–นามสกุล", "Enter your name")}</small></div>
        <div class="fld"><input id="w-phone" name="phone" type="tel" required autocomplete="tel" inputmode="tel" placeholder=" "><label for="w-phone">${c.L("เบอร์โทรศัพท์", "Phone number")} *</label><small class="err">${c.L("กรอกเบอร์โทรที่ติดต่อได้", "Enter a phone number we can reach")}</small></div>
        <div class="fld fld--sel"><select id="w-sector" name="sector">${sectorOptions(c, c.L("ยังไม่แน่ใจ", "Not sure yet"))}</select><label for="w-sector">${c.L("สายงานที่สนใจ", "Sector of interest")}</label></div>
        <div class="fld fld--sel"><select id="w-country" name="country">${countryOptions(c, c.L("ยังไม่แน่ใจ", "Not sure yet"))}</select><label for="w-country">${c.L("ประเทศที่สนใจ", "Preferred country")}</label></div>
        <div class="fld fld--full"><input id="w-email" name="email" type="email" autocomplete="email" placeholder=" "><label for="w-email">${c.L("อีเมล (ถ้ามี)", "Email (optional)")}</label><small class="err">${c.L("รูปแบบอีเมลไม่ถูกต้อง", "This email address isn't valid")}</small></div>
      </fieldset>

      <fieldset class="grp grp--employer" data-grp="employer" disabled>
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
      <button class="btn btn-acc btn-block btn-lg" type="submit">${c.L("ส่งข้อมูล", "Send details")}${icon("arrow")}</button>
      <p class="form-hint">${c.L("เมื่อกดส่ง ระบบจะเปิดแอปอีเมลของคุณพร้อมข้อความที่กรอกไว้", "Sending opens your email app with your message ready.")}</p>
      <div class="form-done" data-done hidden tabindex="-1">
        ${icon("check")}
        <div><h3>${c.L("เตรียมข้อความเรียบร้อย", "Your message is ready")}</h3><p>${c.L(`กดส่งในแอปอีเมลที่เปิดขึ้นมา หากแอปไม่เปิด โทรหาเราได้ที่ ${CO.phone}`, `Press send in the email app that opened. If nothing opened, call us on ${CO.phone}.`)}</p></div>
      </div>
    </form>
  </div>
</section>

<section class="map wrap" aria-label="${c.L("แผนที่สำนักงาน", "Office map")}" data-reveal="clip">
  <iframe title="${c.L("แผนที่สำนักงาน TG Oversea Solutions", "Map of the TG Oversea Solutions office")}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
    src="https://maps.google.com/maps?q=91%2F144%20Moo%209%20Khlong%20Nueng%2C%20Khlong%20Luang%2C%20Pathum%20Thani%2012120&amp;z=15&amp;output=embed"></iframe>
</section>`
};

export const PAGES = [home, jobs, services, process, about, contact];
