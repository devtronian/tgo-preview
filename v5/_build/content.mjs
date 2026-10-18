/* Shared content and components for v5. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CO, SECTORS, COUNTRIES } from "./site.mjs";
import { icon } from "./layout.mjs";
import { photo } from "./img.mjs";

export const SECTOR_INFO = {
  skilled: {
    img: "craft",
    alt: { th: "ช่างเชื่อมกำลังทำงาน ประกายไฟกระจาย", en: "A welder at work with sparks flying" },
    head: { th: "ช่างที่ฝีมือพิสูจน์ได้", en: "Trades with proven skills" },
    desc: { th: "ช่างที่มีประสบการณ์และทักษะเฉพาะทาง ผ่านการทดสอบฝีมือตามมาตรฐานนายจ้างก่อนเดินทาง เหมาะกับงานก่อสร้าง โรงงาน และงานซ่อมบำรุง", en: "Experienced tradespeople, skill-tested to the employer's standard before departure, for construction, plant and maintenance work." },
    roles: { th: ["ช่างเชื่อม", "ช่างไฟฟ้า", "ช่างก่อสร้าง", "ช่างซ่อมบำรุง"], en: ["Welders", "Electricians", "Construction trades", "Maintenance technicians"] },
    dest: { th: "ออสเตรเลีย นิวซีแลนด์ ตะวันออกกลาง", en: "Australia, New Zealand, Middle East" }
  },
  manufacturing: {
    img: "factory",
    alt: { th: "พนักงานควบคุมเครื่องจักรในโรงงานอุตสาหกรรม", en: "An operator working with machinery in a factory" },
    head: { th: "ทีมโรงงานที่พร้อมทำงานเป็นกะ", en: "Shift-ready factory teams" },
    desc: { th: "พนักงานสายการผลิตที่มีวินัย เข้าใจมาตรฐานความปลอดภัย พร้อมทำงานเป็นกะในอุตสาหกรรมอาหาร อิเล็กทรอนิกส์ ชิ้นส่วน และอื่น ๆ", en: "Disciplined, safety-aware production staff ready for shift work in food, electronics, components and more." },
    roles: { th: ["พนักงานฝ่ายผลิต", "ผู้ควบคุมเครื่องจักร", "ตรวจสอบคุณภาพ (QC)", "แพ็กกิ้งและคลังสินค้า"], en: ["Production operators", "Machine operators", "Quality control", "Packing and warehouse"] },
    dest: { th: "เอเชีย ตะวันออกกลาง", en: "Asia, Middle East" }
  },
  agriculture: {
    img: "field",
    alt: { th: "ทุ่งข้าวสาลีสีทองยามพระอาทิตย์ตก", en: "A golden wheat field at sunset" },
    head: { th: "คนเกษตรที่รู้จักงานจริง", en: "Farm hands who know the work" },
    desc: { th: "แรงงานภาคเกษตรสำหรับฟาร์มผัก ผลไม้ เรือนกระจก และปศุสัตว์ ทั้งงานตามฤดูกาลและงานต่อเนื่องทั้งปี", en: "Farm workers for fruit, vegetable, greenhouse and livestock operations, seasonal or year-round." },
    roles: { th: ["ฟาร์มผักและผลไม้", "งานเรือนกระจก", "ปศุสัตว์", "เก็บเกี่ยวตามฤดูกาล"], en: ["Fruit and vegetable farms", "Greenhouse work", "Livestock", "Seasonal harvest"] },
    dest: { th: "ออสเตรเลีย นิวซีแลนด์", en: "Australia, New Zealand" }
  },
  hospitality: {
    img: "massage",
    alt: { th: "นักบำบัดกำลังนวดน้ำมันให้ลูกค้าในสปา", en: "A therapist giving an oil massage in a spa" },
    head: { th: "งานบริการแบบไทย ที่โลกต้องการ", en: "Thai hospitality the world asks for" },
    desc: { th: "สายงานที่เรามีผลงานชัดเจนที่สุด นักนวดแผนไทยและผู้เชี่ยวชาญสปาที่ส่งไปแล้วทั้งตะวันออกกลางและยุโรป รวมถึงเชฟอาหารไทยและพนักงานโรงแรม", en: "Our strongest track record: Thai massage therapists and spa specialists placed across the Middle East and Europe, plus Thai chefs and hotel staff." },
    roles: { th: ["นักนวดแผนไทย", "ผู้เชี่ยวชาญสปา", "เชฟและผู้ช่วยครัว", "พนักงานโรงแรม"], en: ["Thai massage therapists", "Spa therapists", "Chefs and kitchen staff", "Hotel staff"] },
    dest: { th: "ซาอุดีอาระเบีย โอมาน คูเวต ยูเออี ยุโรป", en: "Saudi Arabia, Oman, Kuwait, UAE, Europe" }
  }
};

/* Destinations. `fly` is an approximate flight time from Bangkok. `kind`: placed | partner. */
export const DESTS = [
  { c: "ae", code: "DXB", img: "dubai", alt: { th: "เส้นขอบฟ้าดูไบยามเย็น", en: "Dubai skyline at dusk" }, city: { th: "ดูไบ", en: "Dubai" }, fly: { th: "≈ 6 ชม.", en: "≈ 6 h" }, kind: "placed", work: { th: "สปา โรงแรม ครัวไทย", en: "Spa, hotels, Thai kitchens" } },
  { c: "sa", code: "RUH", img: "riyadh", alt: { th: "ทิวทัศน์เมืองริยาดจากมุมสูง", en: "Riyadh city view from above" }, city: { th: "ริยาด", en: "Riyadh" }, fly: { th: "≈ 7 ชม.", en: "≈ 7 h" }, kind: "placed", work: { th: "นวดแผนไทย สปา", en: "Thai massage, spa" } },
  { c: "om", code: "MCT", img: "mosque", alt: { th: "มัสยิดสีขาวท่ามกลางต้นปาล์ม", en: "A white mosque among palm trees" }, city: { th: "มัสกัต", en: "Muscat" }, fly: { th: "≈ 5 ชม. 30 น.", en: "≈ 5 h 30 m" }, kind: "placed", work: { th: "นวดแผนไทยในรีสอร์ต", en: "Thai massage in resorts" } },
  { c: "kw", code: "KWI", img: null, city: { th: "คูเวตซิตี", en: "Kuwait City" }, fly: { th: "≈ 6 ชม. 30 น.", en: "≈ 6 h 30 m" }, kind: "placed", work: { th: "สปาและเวลเนส", en: "Spa and wellness" } },
  { c: "au", code: "SYD", img: "sydney", alt: { th: "ซิดนีย์โอเปร่าเฮาส์และอ่าวซิดนีย์", en: "Sydney Opera House and harbour" }, city: { th: "ซิดนีย์ และเมืองอื่น", en: "Sydney and beyond" }, fly: { th: "≈ 9 ชม.", en: "≈ 9 h" }, kind: "partner", work: { th: "ช่างฝีมือ เกษตร", en: "Skilled trades, agriculture" } },
  { c: "nz", code: "AKL", img: "new-zealand", alt: { th: "ภูเขาและทะเลสาบในนิวซีแลนด์", en: "Mountains and a lake in New Zealand" }, city: { th: "โอ๊คแลนด์ และเมืองอื่น", en: "Auckland and beyond" }, fly: { th: "≈ 11 ชม.", en: "≈ 11 h" }, kind: "partner", work: { th: "ฟาร์ม งานช่าง", en: "Farming, trades" } },
  { c: "eu", code: "EUR", img: "europe", alt: { th: "เมืองริมแม่น้ำในยุโรปยามเย็น", en: "A European riverside city at dusk" }, city: { th: "หลายประเทศ", en: "Several countries" }, fly: { th: "≈ 11–13 ชม.", en: "≈ 11–13 h" }, kind: "placed", work: { th: "นักบำบัดสปาไทย", en: "Thai spa therapists" } },
  { c: "asia", code: "ASIA", img: "singapore", alt: { th: "อ่าวมารีนาเบย์ สิงคโปร์", en: "Marina Bay, Singapore" }, city: { th: "หลายประเทศ", en: "Several countries" }, fly: { th: "≈ 2–6 ชม.", en: "≈ 2–6 h" }, kind: "partner", work: { th: "โรงงาน งานบริการ", en: "Manufacturing, services" } }
];

/* Rotating views in the hero window. */
export const HERO_SLIDES = ["dubai", "sydney", "riyadh", "new-zealand", "europe"];

export function certCard(c, { id = "cert-t", tag = "p" } = {}) {
  return `<div class="cert" data-tilt>
    <div class="cert-top">
      <span class="cert-ic">${icon("shield")}</span>
      <${tag} class="cert-k" id="${id}">${c.L("ใบอนุญาตจัดหางานให้คนหางานไปทำงานต่างประเทศ", "Licence to recruit for overseas employment")}</${tag}>
    </div>
    <p class="cert-no">${c.L(CO.licenseTh, CO.licenseEn)}</p>
    <dl class="cert-dl">
      <div><dt>${c.L("ผู้รับอนุญาต", "Licensee")}</dt><dd>${c.L(CO.nameTh, CO.nameEn)}</dd></div>
      <div><dt>${c.L("ผู้ออก", "Issued by")}</dt><dd>${c.L("กรมการจัดหางาน กระทรวงแรงงาน", "Department of Employment, Ministry of Labour")}</dd></div>
    </dl>
    <div class="cert-act">
      <a href="${CO.doe}" rel="noopener" target="_blank">${c.L("ตรวจสอบกับกรมการจัดหางาน", "Verify with the department")}${icon("arrowUR")}</a>
      <a href="tel:1694">${icon("phone")}${c.L("สายด่วน 1694", "Hotline 1694")}</a>
    </div>
  </div>`;
}

export function sectorAccordion(c) {
  const entries = Object.entries(SECTORS);
  return `<div class="acc" data-acc>` + entries.map(([k, s], i) => {
    const info = SECTOR_INFO[k];
    return `<article class="acc-p${i === 3 ? " is-on" : ""}" id="sector-${k}" tabindex="-1">
      ${photo(c, info.img, info.alt[c.lang], { sizes: "(max-width: 900px) 100vw, 60vw" })}
      <div class="acc-shade" aria-hidden="true"></div>
      <button class="acc-tab" type="button" aria-expanded="${i === 3}" aria-controls="acc-b-${k}">
        <span class="acc-ic">${icon(s.icon)}</span><span class="acc-name">${c.L(s.th, s.en)}</span>
      </button>
      <div class="acc-b" id="acc-b-${k}">
        <h3>${info.head[c.lang]}</h3>
        <p>${info.desc[c.lang]}</p>
        <ul class="chips" role="list">${info.roles[c.lang].map((r) => `<li>${r}</li>`).join("")}</ul>
        <p class="acc-dest">${icon("pin")}${info.dest[c.lang]}</p>
        <a class="btn btn-glass btn-sm" href="jobs.html?sector=${k}">${c.L("ดูตำแหน่งงาน", "See jobs")}<span class="sr"> ${c.L(s.th, s.en)}</span>${icon("arrow")}</a>
      </div>
    </article>`;
  }).join("") + `</div>`;
}

export function destCarousel(c) {
  return `<div class="car" data-car>
  <div class="car-track" tabindex="0" role="region" aria-label="${c.L("ประเทศปลายทาง เลื่อนดูได้", "Destinations, scrollable")}">
    ${DESTS.map((d) => {
      const n = COUNTRIES[d.c];
      return `<a class="dcard${d.img ? "" : " dcard--type"}" href="jobs.html?country=${d.c}">
      ${d.img ? `<span class="dcard-img">${photo(c, d.img, d.alt[c.lang], { sizes: "(max-width: 640px) 78vw, 340px" })}</span>` : `<span class="dcard-img dcard-pat" aria-hidden="true"><b>${d.code}</b></span>`}
      <span class="dcard-top"><span class="dcard-code">BKK ${icon("plane")} ${d.code}</span><span class="dcard-fly">${icon("clock")}${d.fly[c.lang]}</span></span>
      <span class="dcard-b">
        <span class="dcard-kind dcard-kind--${d.kind}">${d.kind === "placed" ? c.L("ส่งแรงงานแล้ว", "Workers placed") : c.L("เครือข่ายพันธมิตร", "Partner network")}</span>
        <span class="dcard-n">${c.L(n.th, n.en)}</span>
        <span class="dcard-c">${d.city[c.lang]}</span>
        <span class="dcard-w">${d.work[c.lang]}</span>
      </span>
    </a>`;
    }).join("\n    ")}
  </div>
  <div class="car-ui">
    <div class="car-bar" aria-hidden="true"><span></span></div>
    <button class="ibtn" type="button" data-car-prev aria-label="${c.L("ก่อนหน้า", "Previous")}">${icon("chevL")}</button>
    <button class="ibtn" type="button" data-car-next aria-label="${c.L("ถัดไป", "Next")}">${icon("chevR")}</button>
  </div>
</div>`;
}

export const STEPS = [
  { img: "interview", alt: { th: "เจ้าหน้าที่สัมภาษณ์ผู้สมัครที่โต๊ะทำงาน", en: "A recruiter interviewing a candidate" },
    t: { th: "ลงทะเบียนและคัดกรอง", en: "Register and screening" },
    d: { th: "ส่งประวัติทางเว็บ โทรศัพท์ หรือมาที่สำนักงาน เจ้าหน้าที่สัมภาษณ์ ประเมินทักษะ และแนะนำตำแหน่งที่เหมาะกับคุณ พร้อมอธิบายค่าใช้จ่ายเป็นลายลักษณ์อักษร", en: "Apply online, by phone or at our office. We interview you, assess your skills, suggest suitable roles and give you the costs in writing." },
    you: { th: "คุณเตรียม: บัตรประชาชน และประวัติการทำงาน", en: "You bring: ID card and work history" } },
  { img: "craft", alt: { th: "ช่างกำลังทดสอบฝีมืองานเชื่อม", en: "A tradesperson taking a welding test" },
    t: { th: "ทดสอบฝีมือและอบรม", en: "Skills test and training" },
    d: { th: "ทดสอบฝีมือตามมาตรฐานนายจ้าง อบรมภาษา วัฒนธรรม และกฎหมายของประเทศปลายทาง ให้คุณพร้อมตั้งแต่วันแรกที่ไปถึง", en: "Trade tests to the employer's standard, plus language, culture and local-law training so you're ready on day one." },
    you: { th: "คุณเตรียม: ใบรับรองหรือวุฒิที่เกี่ยวข้อง", en: "You bring: relevant certificates" } },
  { img: "team", alt: { th: "ทีมงานกำลังเตรียมเอกสารบนโต๊ะ", en: "A team preparing documents" },
    t: { th: "เอกสาร วีซ่า และตรวจสุขภาพ", en: "Documents, visa and medical" },
    d: { th: "เราดำเนินการสัญญาจ้าง ตรวจสุขภาพกับสถานพยาบาลที่ได้รับการรับรอง ยื่นวีซ่า และขออนุญาตเดินทางจากกรมการจัดหางาน", en: "We handle your contract, medical at an approved clinic, visa and departure approval from the Department of Employment." },
    you: { th: "คุณเตรียม: หนังสือเดินทาง (เราช่วยแนะนำได้)", en: "You bring: passport (we can help)" } },
  { img: "plane-gate", alt: { th: "เครื่องบินจอดที่ประตูขึ้นเครื่องยามพระอาทิตย์ตก", en: "A plane at the gate at sunset" },
    t: { th: "เดินทางและดูแลต่อเนื่อง", en: "Departure and aftercare" },
    d: { th: "ประสานการรับที่สนามบินและที่พัก ติดตามความเป็นอยู่ และเป็นตัวกลางกับนายจ้างตลอดระยะสัญญา", en: "Airport pick-up and housing arranged, welfare check-ins, and a go-between with your employer for the whole contract." },
    you: { th: "เราดูแล: ตลอดระยะสัญญา", en: "We stay with you: the whole contract" } }
];

export function stepStack(c) {
  return `<ol class="stack" role="list" data-stack>` + STEPS.map((s, i) => `
  <li class="stack-i" style="--i:${i}">
    <article class="stack-card">
      <div class="stack-copy">
        <span class="stack-n">${String(i + 1).padStart(2, "0")}</span>
        <h3>${s.t[c.lang]}</h3>
        <p>${s.d[c.lang]}</p>
        <p class="stack-you">${s.you[c.lang]}</p>
      </div>
      <div class="stack-img">${photo(c, s.img, s.alt[c.lang], { sizes: "(max-width: 900px) 100vw, 50vw" })}</div>
    </article>
  </li>`).join("") + `</ol>`;
}

export const FAQ = [
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

export function faqList(c, items = FAQ) {
  return `<div class="faq">` + items.map(([q, a], i) => `<details name="faq"${i === 0 ? " open" : ""}><summary><h3>${q[c.lang]}</h3><span class="faq-pm" aria-hidden="true"></span></summary><div class="faq-a"><p>${a[c.lang]}</p></div></details>`).join("") + `</div>`;
}

export function scamChecks(c, id = "safety") {
  return `<section class="sec safety" id="${id}" aria-labelledby="${id}-t">
  <div class="wrap safety-in">
    <div class="sh">
      <p class="kick">${icon("alert")}${c.L("รู้ทันมิจฉาชีพ", "Avoid scams")}</p>
      <h2 id="${id}-t" class="h2" data-split>${c.L("ตรวจ 3 ข้อนี้ ก่อนสมัครงาน กับบริษัทใดก็ตาม", "Check these three things before you apply anywhere")}</h2>
      <p class="lead">${c.L("มิจฉาชีพมักอ้างว่าส่งไปทำงานต่างประเทศได้เร็วโดยไม่มีใบอนุญาต ข้อมูลนี้ใช้ได้กับทุกบริษัท รวมถึงเราด้วย", "Scammers promise fast jobs abroad without a licence. These checks work for any agency, including us.")}</p>
    </div>
    <ol class="checks" role="list">
      <li data-reveal style="--d:0">${icon("shield")}<div><h3>${c.L("ขอดูเลขที่ใบอนุญาต", "Ask for the licence number")}</h3><p>${c.L("บริษัทจัดหางานไปต่างประเทศต้องมีใบอนุญาตจากกรมการจัดหางาน แล้วนำเลขไปตรวจที่ doe.go.th", "An overseas recruiter must hold a Department of Employment licence. Check the number at doe.go.th.")}</p></div></li>
      <li data-reveal style="--d:1">${icon("phone")}<div><h3>${c.L("โทรถามสายด่วน 1694", "Call the 1694 hotline")}</h3><p>${c.L("สายด่วนกรมการจัดหางาน ถามได้ว่าบริษัทและตำแหน่งงานนั้นมีอยู่จริงหรือไม่", "The department's hotline can confirm whether an agency and its job orders are real.")}</p></div></li>
      <li data-reveal style="--d:2">${icon("receipt")}<div><h3>${c.L("จ่ายเงินแล้วต้องได้ใบเสร็จ", "Pay only against a receipt")}</h3><p>${c.L("อย่าโอนเงินเข้าบัญชีบุคคล และขอใบเสร็จในนามบริษัททุกครั้ง", "Never pay into a personal account, and get a company receipt for every payment.")}</p></div></li>
    </ol>
  </div>
</section>`;
}

export function countryOptions(c, allLabel) {
  return `<option value="">${allLabel}</option>` + Object.entries(COUNTRIES).map(([k, v]) => `<option value="${k}">${c.L(v.th, v.en)}</option>`).join("");
}
export function sectorOptions(c, allLabel) {
  return `<option value="">${allLabel}</option>` + Object.entries(SECTORS).map(([k, v]) => `<option value="${k}">${c.L(v.th, v.en)}</option>`).join("");
}

/* ---- Dotted world map with flight arcs from Bangkok (built once from v1's Natural Earth dots) ---- */
const LAND = (() => {
  const s = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "js", "land-dots.js"), "utf8");
  return JSON.parse(s.slice(s.indexOf("["), s.lastIndexOf("]") + 1));
})();
const MAP = { lon0: -15, lon1: 185, lat0: 66, lat1: -48, k: 4 };
const px = (lon, lat) => [Math.round((lon - MAP.lon0) * MAP.k * 10) / 10, Math.round((MAP.lat0 - lat) * MAP.k * 10) / 10];
const CITIES = [
  { code: "RUH", lon: 46.7, lat: 24.7 }, { code: "DXB", lon: 55.3, lat: 25.2 }, { code: "MCT", lon: 58.4, lat: 23.6 },
  { code: "KWI", lon: 47.98, lat: 29.37 }, { code: "SYD", lon: 151.2, lat: -33.9 }, { code: "AKL", lon: 174.8, lat: -36.8 },
  { code: "EUR", lon: 16.4, lat: 48.2 }, { code: "ASIA", lon: 139.7, lat: 35.7 }
];

export function worldMap(c) {
  const pts = [];
  for (let i = 0; i < LAND.length; i += 2) {
    const lon = LAND[i], lat = LAND[i + 1];
    if (lon < MAP.lon0 || lon > MAP.lon1 || lat > MAP.lat0 || lat < MAP.lat1) continue;
    pts.push(px(lon, lat));
  }
  pts.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  // relative moves keep the path short: one "dot" = a zero-length segment with a round cap
  const r1 = (v) => Math.round(v * 10) / 10;
  let cx = 0, cy = 0;
  const dots = pts.map(([x, y], i) => { const s = i ? `m${r1(x - cx)} ${r1(y - cy)}h0` : `M${x} ${y}h0`; cx = x; cy = y; return s; });
  const [bx, by] = px(100.5, 13.75);
  const W = (MAP.lon1 - MAP.lon0) * MAP.k, H = (MAP.lat0 - MAP.lat1) * MAP.k;
  const arcs = CITIES.map((d, i) => {
    const [x, y] = px(d.lon, d.lat);
    const mx = (bx + x) / 2, my = Math.min(by, y) - Math.abs(x - bx) * 0.28 - 20;
    return `<path class="arc" style="--i:${i}" d="M${bx} ${by}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x} ${y}" pathLength="1"/><circle class="city" style="--i:${i}" cx="${x}" cy="${y}" r="4"/><text x="${x}" y="${y - 10}" style="--i:${i}">${d.code}</text>`;
  }).join("");
  return `<svg class="wmap" viewBox="0 0 ${W} ${H}" role="img" aria-label="${c.L("แผนที่เส้นทางบินจากกรุงเทพฯ ไปยังประเทศปลายทาง", "Map of routes from Bangkok to our destinations")}">
  <path class="land" d="${dots.join("")}"/>
  ${arcs}
  <circle class="hub-pulse" cx="${bx}" cy="${by}" r="7"/><circle class="hub" cx="${bx}" cy="${by}" r="6"/><text class="hub-t" x="${bx + 10}" y="${by + 18}">BKK</text>
</svg>`;
}
