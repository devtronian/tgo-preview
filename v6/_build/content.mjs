/* Shared content and components for v6 (Clear Path). */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CO, SECTORS, COUNTRIES } from "./site.mjs";
import { icon } from "./layout.mjs";
import { photo } from "./img.mjs";
import { JOBS } from "./jobs.mjs";

export const SECTOR_INFO = {
  skilled: {
    img: "craft",
    alt: { th: "ช่างเชื่อมกำลังทำงาน ประกายไฟกระจาย", en: "A welder at work with sparks flying" },
    desc: { th: "ช่างที่มีประสบการณ์ ผ่านการทดสอบฝีมือตามมาตรฐานนายจ้างก่อนเดินทาง สำหรับงานก่อสร้าง โรงงาน และงานซ่อมบำรุง", en: "Experienced tradespeople, skill-tested to the employer's standard before departure, for construction, plant and maintenance work." },
    roles: { th: ["ช่างเชื่อม", "ช่างไฟฟ้า", "ช่างก่อสร้าง", "ช่างซ่อมบำรุง"], en: ["Welders", "Electricians", "Construction trades", "Maintenance technicians"] },
    dest: { th: "ออสเตรเลีย นิวซีแลนด์ ตะวันออกกลาง", en: "Australia, New Zealand, Middle East" }
  },
  manufacturing: {
    img: "factory",
    alt: { th: "พนักงานควบคุมเครื่องจักรในโรงงานอุตสาหกรรม", en: "An operator working with machinery in a factory" },
    desc: { th: "พนักงานสายการผลิตที่มีวินัย เข้าใจมาตรฐานความปลอดภัย พร้อมทำงานเป็นกะในอุตสาหกรรมอาหาร อิเล็กทรอนิกส์ และชิ้นส่วน", en: "Disciplined, safety-aware production staff ready for shift work in food, electronics and components." },
    roles: { th: ["พนักงานฝ่ายผลิต", "ผู้ควบคุมเครื่องจักร", "ตรวจสอบคุณภาพ (QC)", "แพ็กกิ้งและคลังสินค้า"], en: ["Production operators", "Machine operators", "Quality control", "Packing and warehouse"] },
    dest: { th: "เอเชีย ตะวันออกกลาง", en: "Asia, Middle East" }
  },
  agriculture: {
    img: "seedlings",
    alt: { th: "มือกำลังปลูกต้นกล้าลงในถาดเพาะ", en: "Hands planting seedlings in a tray" },
    desc: { th: "แรงงานภาคเกษตรสำหรับฟาร์มผัก ผลไม้ เรือนกระจก และปศุสัตว์ ทั้งงานตามฤดูกาลและงานต่อเนื่องทั้งปี", en: "Farm workers for fruit, vegetable, greenhouse and livestock operations, seasonal or year-round." },
    roles: { th: ["ฟาร์มผักและผลไม้", "งานเรือนกระจก", "ปศุสัตว์", "เก็บเกี่ยวตามฤดูกาล"], en: ["Fruit and vegetable farms", "Greenhouse work", "Livestock", "Seasonal harvest"] },
    dest: { th: "ออสเตรเลีย นิวซีแลนด์", en: "Australia, New Zealand" }
  },
  hospitality: {
    img: "massage",
    alt: { th: "นักบำบัดกำลังนวดน้ำมันให้ลูกค้าในสปา", en: "A therapist giving an oil massage in a spa" },
    desc: { th: "สายงานที่เรามีผลงานชัดเจนที่สุด นักนวดแผนไทยและผู้เชี่ยวชาญสปาในตะวันออกกลางและยุโรป รวมถึงเชฟอาหารไทยและพนักงานโรงแรม", en: "Our strongest track record: Thai massage and spa specialists in the Middle East and Europe, plus Thai chefs and hotel staff." },
    roles: { th: ["นักนวดแผนไทย", "ผู้เชี่ยวชาญสปา", "เชฟและผู้ช่วยครัว", "พนักงานโรงแรม"], en: ["Thai massage therapists", "Spa therapists", "Chefs and kitchen staff", "Hotel staff"] },
    dest: { th: "ซาอุดีอาระเบีย โอมาน คูเวต ยูเออี ยุโรป", en: "Saudi Arabia, Oman, Kuwait, UAE, Europe" }
  }
};

export const fmtDate = (iso, lang) => new Date(iso + "T00:00:00Z").toLocaleDateString(lang === "en" ? "en-GB" : "th-TH", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
export const jobPlace = (c, j) => {
  const n = COUNTRIES[j.country][c.lang];
  return j.city[c.lang] === n ? n : `${j.city[c.lang]}, ${n}`;
};

/* ---- Hero: example progress updates. Clearly labelled as an example on the page. ---- */
export const TRACK_STEPS = [
  { th: "สมัครและสัมภาษณ์", en: "Applied and interviewed" },
  { th: "ทดสอบฝีมือ", en: "Trade test" },
  { th: "สัญญาจ้างผ่านการอนุมัติ", en: "Contract approved" },
  { th: "ตรวจสุขภาพและวีซ่า", en: "Medical and visa" },
  { th: "อบรมก่อนเดินทาง", en: "Pre-departure training" },
  { th: "เริ่มงานที่ต่างประเทศ", en: "Started work abroad" }
];
export const TRACK = [
  { img: "craft", ini: { th: "ส", en: "S" }, role: { th: "ช่างเชื่อม", en: "Welder" }, where: { th: "ออสเตรเลีย", en: "Australia" }, at: 3 },
  { img: "massage", ini: { th: "น", en: "N" }, role: { th: "นักนวดแผนไทย", en: "Thai massage therapist" }, where: { th: "ซาอุดีอาระเบีย", en: "Saudi Arabia" }, at: 6 },
  { img: "seedlings", ini: { th: "ก", en: "K" }, role: { th: "พนักงานเรือนกระจก", en: "Greenhouse worker" }, where: { th: "นิวซีแลนด์", en: "New Zealand" }, at: 1 }
];

export function tracker(c) {
  const t = TRACK[0];
  const state = (i, at) => (i < at ? "done" : i === at ? "now" : "next");
  const label = (s) => s === "done" ? c.L("เสร็จแล้ว", "Done") : s === "now" ? c.L("กำลังดำเนินการ", "In progress") : "";
  return `<div class="trk" data-tracker data-labels='${JSON.stringify({ done: c.L("เสร็จแล้ว", "Done"), now: c.L("กำลังดำเนินการ", "In progress"), all: c.L("เริ่มงานแล้ว", "At work") })}'>
  <script type="application/json" data-track>${JSON.stringify(TRACK.map((p) => ({ ini: p.ini[c.lang], role: p.role[c.lang], where: p.where[c.lang], at: p.at, img: p.img })))}</script>
  <div class="trk-top">
    <span class="trk-av" data-t-ini aria-hidden="true">${t.ini[c.lang]}</span>
    <div class="trk-who"><b data-t-role>${t.role[c.lang]}</b><span>${icon("pin")}<span data-t-where>${t.where[c.lang]}</span></span></div>
    <span class="trk-tag">${c.L("ตัวอย่าง", "Example")}</span>
  </div>
  <ol class="trk-l" role="list">
    ${TRACK_STEPS.map((s, i) => { const st = state(i, t.at); return `<li class="is-${st}"><span class="trk-dot" aria-hidden="true">${icon("check")}</span><span class="trk-n">${s[c.lang]}</span><span class="trk-s">${label(st)}</span></li>`; }).join("\n    ")}
  </ol>
  <div class="trk-foot">
    <span class="trk-bar" aria-hidden="true"><i style="--v:${t.at / TRACK_STEPS.length}"></i></span>
    <span>${c.L("เจ้าหน้าที่แจ้งความคืบหน้าทุกขั้นตอน", "We update you at every step")}</span>
  </div>
</div>`;
}

/* ---- Licence card ---- */
export function licenceCard(c, id = "lic-card-t") {
  const num = CO.licenseTh.replace("ต. ", "");
  return `<div class="lcard">
  <div class="lcard-top">
    <span class="lcard-seal" aria-hidden="true">${icon("badge")}</span>
    <div><p class="lcard-k" id="${id}">${c.L("ใบอนุญาตจัดหางานให้คนหางานไปทำงานในต่างประเทศ", "Licence to recruit workers for overseas employment")}</p><p class="lcard-by">${c.L("กรมการจัดหางาน กระทรวงแรงงาน", "Department of Employment, Ministry of Labour")}</p></div>
  </div>
  <p class="lcard-no"><span>${c.L("เลขที่", "No.")}</span> <b data-decode="${c.L("ต. ", "T. ")}${num}">${c.L("ต. ", "T. ")}${num}</b></p>
  <dl class="lcard-dl">
    <div><dt>${c.L("ผู้รับอนุญาต", "Licensee")}</dt><dd>${c.L(CO.nameTh, CO.nameEn)}</dd></div>
    <div><dt>${c.L("ก่อตั้ง", "Founded")}</dt><dd><time datetime="${CO.founded}">${c.L("28 ตุลาคม 2568", "28 October 2025")}</time></dd></div>
    <div><dt>${c.L("สำนักงาน", "Office")}</dt><dd>${c.L("คลองหลวง ปทุมธานี", "Khlong Luang, Pathum Thani")}</dd></div>
  </dl>
  <div class="lcard-act">
    <button class="btn btn-line btn-sm" type="button" data-copy="${c.L(CO.licenseTh, CO.licenseEn)}" data-copied="${c.L("คัดลอกเลขแล้ว", "Number copied")}">${icon("doc")}<span>${c.L("คัดลอกเลขใบอนุญาต", "Copy licence number")}</span></button>
    <a class="btn btn-pr btn-sm" href="${CO.doe}" rel="noopener" target="_blank">${c.L("ตรวจสอบที่ doe.go.th", "Check at doe.go.th")}${icon("arrowUR")}</a>
  </div>
</div>`;
}

/* ---- Job row (home preview) and job card (jobs page) ---- */
export function jobRow(c, j) {
  const s = SECTORS[j.sector];
  return `<li class="jrow" data-sector="${j.sector}">
  <a href="jobs.html#job-${j.id}">
    <span class="jrow-ic">${icon(s.icon)}</span>
    <span class="jrow-t"><b>${j.title[c.lang]}</b><small>${c.L(s.th, s.en)}</small></span>
    <span class="jrow-p">${icon("pin")}${jobPlace(c, j)}</span>
    <span class="jrow-d">${c.L("ปิดรับ", "Closes")} <time datetime="${j.until}">${fmtDate(j.until, c.lang)}</time></span>
    <span class="jrow-go" aria-hidden="true">${icon("arrow")}</span>
  </a>
</li>`;
}

/* Photo per job (falls back to the sector photo). */
const JOB_IMG = { "spa-therapist-ae": "spa", "spa-kw": "spa", "spa-eu": "spa", "thai-chef-ae": "chef", "electrician-au": "construction", "farm-nz": "field", "qc-asia": "warehouse" };

export function jobCard(c, j) {
  const s = SECTORS[j.sector], place = jobPlace(c, j);
  const text = [j.title.th, j.title.en, j.city.th, j.city.en, COUNTRIES[j.country].th, COUNTRIES[j.country].en, s.th, s.en, ...j.req[c.lang]].join(" ").toLowerCase();
  return `<article class="job" id="job-${j.id}" data-sector="${j.sector}" data-country="${j.country}" data-text="${text.replace(/"/g, "")}">
  <div class="job-img">${photo(c, JOB_IMG[j.id] || SECTOR_INFO[j.sector].img, "", { sizes: "(max-width: 700px) 100vw, 260px" })}</div>
  <div class="job-b">
    <p class="job-sec">${icon(s.icon)}${c.L(s.th, s.en)}</p>
    <h3 class="job-t">${j.title[c.lang]}</h3>
    <p class="job-loc">${icon("pin")}${place}</p>
    <ul class="job-req" role="list">${j.req[c.lang].map((r) => `<li>${icon("check")}${r}</li>`).join("")}</ul>
  </div>
  <div class="job-side">
    <p class="job-close">${icon("calendar")}<span>${c.L("ปิดรับ", "Closes")} <time datetime="${j.until}">${fmtDate(j.until, c.lang)}</time></span></p>
    <a class="btn btn-ac btn-sm" href="contact.html?type=worker&amp;job=${j.id}">${c.L("สมัครตำแหน่งนี้", "Apply")}<span class="sr"> ${j.title[c.lang]}, ${place}</span>${icon("arrow")}</a>
  </div>
</article>`;
}

/* ---- Six steps from applying to starting work ---- */
export const STEPS = [
  { ic: "chat", t: { th: "ลงทะเบียนและพูดคุย", en: "Register and talk to us" },
    d: { th: "ฝากข้อมูลทางเว็บ โทร หรือมาที่สำนักงาน เจ้าหน้าที่ถามประสบการณ์ อธิบายตำแหน่งที่เหมาะ และแจ้งค่าใช้จ่ายทุกรายการเป็นลายลักษณ์อักษร", en: "Apply online, by phone or at our office. We ask about your experience, explain suitable roles and give you every cost in writing." },
    you: { th: "บัตรประชาชน และประวัติการทำงาน", en: "ID card and work history" } },
  { ic: "wrench", t: { th: "สัมภาษณ์และทดสอบฝีมือ", en: "Interview and trade test" },
    d: { th: "สัมภาษณ์กับนายจ้างหรือตัวแทน และทดสอบฝีมือตามมาตรฐานของตำแหน่ง ผลการคัดเลือกเป็นของนายจ้าง เราไม่สัญญาว่าได้ไปก่อนผ่านขั้นนี้", en: "Interview with the employer or their agent, plus a skills test to the role's standard. The employer makes the selection; we never promise a place before this step." },
    you: { th: "ใบรับรองหรือวุฒิที่เกี่ยวข้อง", en: "Relevant certificates" } },
  { ic: "sign", t: { th: "อ่านและเซ็นสัญญาจ้าง", en: "Read and sign your contract" },
    d: { th: "สัญญาจ้างระบุนายจ้าง ที่ทำงาน ค่าจ้าง ชั่วโมงงาน ที่พัก และวันหยุด ต้องผ่านการตรวจจากกรมการจัดหางาน และคุณอ่านฉบับภาษาไทยก่อนเซ็นได้เสมอ", en: "Your contract names the employer, workplace, pay, hours, housing and days off. It's checked by the Department of Employment, and you can read a Thai version before signing." },
    you: { th: "เวลาอ่านสัญญาให้ละเอียด", en: "Time to read it properly" } },
  { ic: "medical", t: { th: "ตรวจสุขภาพและยื่นวีซ่า", en: "Medical and visa" },
    d: { th: "ตรวจสุขภาพกับสถานพยาบาลที่ได้รับการรับรอง ยื่นวีซ่าทำงานและใบอนุญาตทำงาน เราเดินเรื่องและแจ้งสถานะให้ทราบตลอด", en: "A medical at an approved clinic, then the work visa and permit. We handle the filing and keep you updated." },
    you: { th: "หนังสือเดินทาง (เราช่วยแนะนำได้)", en: "Passport (we can help)" } },
  { ic: "cap", t: { th: "อบรมก่อนเดินทาง", en: "Pre-departure training" },
    d: { th: "ปฐมนิเทศตามข้อกำหนดของกรมการจัดหางาน ทั้งกฎหมาย วัฒนธรรม ภาษาเบื้องต้น สิทธิของคุณ และช่องทางขอความช่วยเหลือในประเทศปลายทาง", en: "The department's orientation: local law, culture, basic language, your rights and where to get help in the destination country." },
    you: { th: "เข้าอบรมให้ครบตามกำหนด", en: "Attend the full course" } },
  { ic: "headset", t: { th: "เริ่มงาน และดูแลตลอดสัญญา", en: "Start work, with support throughout" },
    d: { th: "ประสานการรับที่สนามบินและที่พัก ติดตามความเป็นอยู่ และเป็นตัวกลางกับนายจ้างจนจบสัญญา มีปัญหาโทรหาเจ้าหน้าที่ได้โดยตรง", en: "Airport pick-up and housing arranged, welfare check-ins, and a go-between with your employer until the contract ends. Call us directly any time." },
    you: { th: "เบอร์เจ้าหน้าที่ติดตัวไว้", en: "Keep our number with you" } }
];

export function stepsTrack(c, head = "") {
  return `<div class="hs" data-hs>
  <div class="hs-pin">
    ${head}
    <div class="hs-bar" aria-hidden="true">${STEPS.map((s, i) => `<span style="--i:${i}"><i></i></span>`).join("")}</div>
    <ol class="hs-track" role="list">
      ${STEPS.map((s, i) => `<li class="hs-card" style="--i:${i}">
        <div class="hs-top"><span class="hs-n">${i + 1}</span><span class="hs-ic">${icon(s.ic)}</span></div>
        <h3>${s.t[c.lang]}</h3>
        <p>${s.d[c.lang]}</p>
        <p class="hs-you"><b>${c.L("คุณเตรียม", "You bring")}</b>${s.you[c.lang]}</p>
      </li>`).join("\n      ")}
    </ol>
  </div>
</div>`;
}

/* ---- Promises: what we always do / never do (confirm wording with the company) ---- */
export const ALWAYS = [
  { th: "แจ้งค่าใช้จ่ายทุกรายการเป็นลายลักษณ์อักษร ก่อนคุณจ่ายเงินบาทแรก", en: "Every cost in writing before you pay anything" },
  { th: "ออกใบเสร็จในนามบริษัททุกครั้งที่รับเงิน", en: "A company receipt for every payment" },
  { th: "ให้คุณอ่านสัญญาจ้างฉบับภาษาไทยก่อนเซ็น", en: "A Thai version of your contract to read before signing" },
  { th: "บอกชื่อนายจ้างและสถานที่ทำงานจริงให้คุณตรวจสอบ", en: "The real employer and workplace, so you can check them" },
  { th: "มีเจ้าหน้าที่ติดต่อได้โดยตรงจนจบสัญญา", en: "A named contact you can reach until your contract ends" }
];
export const NEVER = [
  { th: "เก็บค่าบริการเกินอัตราที่กรมการจัดหางานกำหนด", en: "Charge more than the department's legal rates" },
  { th: "ให้โอนเงินเข้าบัญชีส่วนตัวของใคร", en: "Ask you to pay into anyone's personal account" },
  { th: "ยึดหนังสือเดินทางหรือบัตรประชาชนของคุณ", en: "Hold on to your passport or ID card" },
  { th: "ส่งไปทำงานด้วยวีซ่าท่องเที่ยว", en: "Send you to work on a tourist visa" },
  { th: "สัญญาว่าได้ไปแน่นอน ก่อนนายจ้างคัดเลือก", en: "Promise you a place before the employer selects you" }
];

export function promises(c) {
  return `<div class="pro">
  <div class="pro-col pro-col--yes" data-reveal>
    <h3>${icon("check")}${c.L("สิ่งที่เราทำทุกครั้ง", "What we always do")}</h3>
    <ul role="list">${ALWAYS.map((x, i) => `<li style="--i:${i}"><span class="pro-m" aria-hidden="true">${icon("check")}</span>${x[c.lang]}</li>`).join("")}</ul>
  </div>
  <div class="pro-col pro-col--no" data-reveal style="--d:1">
    <h3>${icon("ban")}${c.L("สิ่งที่เราไม่ทำ", "What we never do")}</h3>
    <ul role="list">${NEVER.map((x, i) => `<li style="--i:${i}"><span class="pro-m" aria-hidden="true">${icon("x")}</span>${x[c.lang]}</li>`).join("")}</ul>
  </div>
</div>`;
}

/* ---- Destinations: honest status per country ---- */
export const DESTS = [
  { c: "sa", kind: "placed", work: { th: "นวดแผนไทย สปา", en: "Thai massage, spa" } },
  { c: "om", kind: "placed", work: { th: "นวดแผนไทยในโรงแรมและรีสอร์ต", en: "Thai massage in hotels and resorts" } },
  { c: "kw", kind: "placed", work: { th: "สปาและเวลเนส", en: "Spa and wellness" } },
  { c: "ae", kind: "placed", work: { th: "สปา โรงแรม ครัวไทย", en: "Spa, hotels, Thai kitchens" } },
  { c: "eu", kind: "placed", work: { th: "นักบำบัดสปาไทย", en: "Thai spa therapists" } },
  { c: "au", kind: "partner", work: { th: "ช่างฝีมือ เกษตร", en: "Skilled trades, agriculture" } },
  { c: "nz", kind: "partner", work: { th: "ฟาร์ม งานช่าง", en: "Farming, trades" } },
  { c: "asia", kind: "partner", work: { th: "โรงงาน งานบริการ", en: "Manufacturing, services" } }
];

export function destList(c) {
  return `<ul class="dl" role="list">
  ${DESTS.map((d, i) => `<li data-reveal style="--d:${i % 4}"><a href="jobs.html?country=${d.c}">
    <span class="dl-n">${c.L(COUNTRIES[d.c].th, COUNTRIES[d.c].en)}</span>
    <span class="dl-w">${d.work[c.lang]}</span>
    <span class="dl-k dl-k--${d.kind}">${d.kind === "placed" ? c.L("ส่งแรงงานแล้ว", "Workers placed") : c.L("เครือข่ายพันธมิตร", "Partner network")}</span>
  </a></li>`).join("\n  ")}
</ul>`;
}

/* ---- Dotted world map with destination pins (dots from v1's Natural Earth data) ---- */
const LAND = (() => {
  const s = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "assets", "js", "land-dots.js"), "utf8");
  return JSON.parse(s.slice(s.indexOf("["), s.lastIndexOf("]") + 1));
})();
const MAP = { lon0: -15, lon1: 185, lat0: 66, lat1: -48, k: 4 };
const px = (lon, lat) => [Math.round((lon - MAP.lon0) * MAP.k * 10) / 10, Math.round((MAP.lat0 - lat) * MAP.k * 10) / 10];
const PINS = [
  { c: "sa", lon: 46.7, lat: 24.7, kind: "placed" }, { c: "ae", lon: 55.3, lat: 25.2, kind: "placed" }, { c: "om", lon: 58.4, lat: 23.6, kind: "placed" },
  { c: "kw", lon: 47.98, lat: 29.37, kind: "placed" }, { c: "eu", lon: 10.5, lat: 50, kind: "placed" },
  { c: "au", lon: 145, lat: -30, kind: "partner" }, { c: "nz", lon: 174.8, lat: -38.5, kind: "partner" }, { c: "asia", lon: 128, lat: 36, kind: "partner" }
];

export function worldMap(c) {
  const pts = [];
  for (let i = 0; i < LAND.length; i += 2) {
    const lon = LAND[i], lat = LAND[i + 1];
    if (lon < MAP.lon0 || lon > MAP.lon1 || lat > MAP.lat0 || lat < MAP.lat1) continue;
    pts.push(px(lon, lat));
  }
  pts.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const r1 = (v) => Math.round(v * 10) / 10;
  let cx = 0, cy = 0;
  const dots = pts.map(([x, y], i) => { const s = i ? `m${r1(x - cx)} ${r1(y - cy)}h0` : `M${x} ${y}h0`; cx = x; cy = y; return s; });
  const [bx, by] = px(100.5, 13.75);
  const W = (MAP.lon1 - MAP.lon0) * MAP.k, H = (MAP.lat0 - MAP.lat1) * MAP.k;
  const pins = PINS.map((p, i) => {
    const [x, y] = px(p.lon, p.lat);
    return `<g class="pin pin--${p.kind}" style="--i:${i}"><line x1="${bx}" y1="${by}" x2="${x}" y2="${y}" pathLength="1"/><circle class="pin-r" cx="${x}" cy="${y}" r="9"/><circle cx="${x}" cy="${y}" r="5"/></g>`;
  }).join("");
  return `<svg class="wmap" viewBox="0 0 ${W} ${H}" role="img" aria-label="${c.L("แผนที่ประเทศที่เราส่งแรงงานไปทำงาน จากสำนักงานในประเทศไทย", "Map of the countries where we place workers, from our office in Thailand")}">
  <path class="land" d="${dots.join("")}"/>
  ${pins}
  <circle class="hub-r" cx="${bx}" cy="${by}" r="12"/><circle class="hub" cx="${bx}" cy="${by}" r="6"/>
</svg>`;
}

export const FAQ = [
  [{ th: "ไปทำงานต่างประเทศ มีค่าใช้จ่ายเท่าไร?", en: "How much does it cost to work abroad?" },
   { th: "ค่าใช้จ่ายแตกต่างกันตามประเทศและตำแหน่งงาน และต้องไม่เกินอัตราที่กรมการจัดหางานกำหนด เราแจ้งทุกรายการเป็นลายลักษณ์อักษรก่อนที่คุณจะตัดสินใจ และออกใบเสร็จในนามบริษัททุกครั้ง", en: "Costs vary by country and role and must stay within the rates set by the Department of Employment. We give you every item in writing before you decide, and issue a company receipt for every payment." }],
  [{ th: "ใช้เวลานานแค่ไหนกว่าจะได้เดินทาง?", en: "How long until I can travel?" },
   { th: "ขึ้นอยู่กับประเทศปลายทาง ขั้นตอนวีซ่า และความพร้อมของเอกสาร โดยทั่วไปประมาณ 2–4 เดือน เจ้าหน้าที่จะแจ้งกรอบเวลาของตำแหน่งที่คุณสมัครให้ชัดเจน", en: "It depends on the destination, the visa process and how ready your documents are, typically around 2–4 months. We'll give you the timeline for your specific role." }],
  [{ th: "จะรู้ได้อย่างไรว่าบริษัทถูกกฎหมาย?", en: "How can I check you're a legal agency?" },
   { th: `ตรวจสอบใบอนุญาตจัดหางานเลขที่ ${CO.licenseTh} ได้ที่เว็บไซต์กรมการจัดหางาน (doe.go.th) หรือโทรสายด่วน 1694`, en: `Check our licence no. ${CO.licenseEn} on the Department of Employment website (doe.go.th) or call the 1694 hotline.` }],
  [{ th: "ไม่เคยไปทำงานต่างประเทศ สมัครได้ไหม?", en: "Can I apply if I've never worked abroad?" },
   { th: "ได้ หลายตำแหน่งเปิดรับผู้ที่มีทักษะแต่ยังไม่เคยไปต่างประเทศ เราอบรมและเตรียมความพร้อมทั้งภาษา วัฒนธรรม และกฎระเบียบก่อนเดินทาง", en: "Yes. Many roles welcome skilled people going abroad for the first time. We prepare you with language, culture and rules training before you leave." }],
  [{ th: "ต้องพูดภาษาอังกฤษได้หรือไม่?", en: "Do I need to speak English?" },
   { th: "ขึ้นอยู่กับตำแหน่งและนายจ้าง บางตำแหน่งต้องการภาษาอังกฤษเบื้องต้น บางตำแหน่งเน้นฝีมือเป็นหลัก เราจะแจ้งระดับที่ต้องการและมีอบรมภาษาก่อนเดินทาง", en: "It depends on the role and employer. Some need basic English, others focus on skills. We'll tell you the level needed and provide language training before departure." }],
  [{ th: "สมัครงานต่างประเทศ ต้องใช้เอกสารอะไรบ้าง?", en: "Which documents do I need to apply?" },
   { th: "บัตรประชาชน ทะเบียนบ้าน หนังสือเดินทาง รูปถ่ายหน้าตรง วุฒิการศึกษาหรือใบรับรองฝีมือ และหนังสือรับรองการทำงาน (ถ้ามี) ถ้ายังไม่มีหนังสือเดินทาง เราช่วยแนะนำวิธีทำได้", en: "Thai ID card, house registration, passport, passport photos, education or trade certificate, and an employment reference if you have one. No passport yet? We'll show you how to get one." }],
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
      <p class="kick kick--warn">${icon("alert")}${c.L("รู้ทันมิจฉาชีพ", "Avoid scams")}</p>
      <h2 id="${id}-t" class="h2">${c.L("ตรวจ 3 ข้อนี้ ก่อนสมัครงานกับบริษัทใดก็ตาม", "Check these three things before you apply anywhere")}</h2>
      <p class="lead">${c.L("มิจฉาชีพมักอ้างว่าส่งไปทำงานได้เร็วโดยไม่มีใบอนุญาต ข้อมูลนี้ใช้ได้กับทุกบริษัท รวมถึงเราด้วย", "Scammers promise fast jobs abroad without a licence. These checks work for any agency, including us.")}</p>
    </div>
    <ol class="checks" role="list">
      <li data-reveal>${icon("badge")}<div><h3>${c.L("ขอดูเลขที่ใบอนุญาต", "Ask for the licence number")}</h3><p>${c.L("บริษัทจัดหางานไปต่างประเทศต้องมีใบอนุญาตจากกรมการจัดหางาน แล้วนำเลขไปตรวจที่ doe.go.th", "An overseas recruiter must hold a Department of Employment licence. Check the number at doe.go.th.")}</p></div></li>
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

export { JOBS };

/* ==========================================================================
   Home hero: alternative animated visuals (picked in the display panel, see HEROES in site.mjs).
   All of them are in the page; CSS shows the chosen one, JS animates only the one in view.
   ========================================================================== */

/* Job board: two columns of open jobs drifting in opposite directions.
   BOARD_ORDER mixes sectors so neighbouring cards use different photos; jobs not listed go last. */
const BOARD_ORDER = ["thai-massage-sa", "welder-au", "thai-chef-ae", "spa-therapist-ae", "electrician-au", "farm-nz", "production-asia", "thai-massage-om", "greenhouse-au", "qc-asia", "spa-eu", "spa-kw"];
export function heroBoard(c) {
  const jobs = [...BOARD_ORDER.map((id) => JOBS.find((j) => j.id === id)).filter(Boolean), ...JOBS.filter((j) => !BOARD_ORDER.includes(j.id))];
  const card = (j) => {
    const s = SECTORS[j.sector];
    return `<li><a class="hb-c" href="jobs.html#job-${j.id}">
      <span class="hb-img">${photo(c, JOB_IMG[j.id] || SECTOR_INFO[j.sector].img, "", { sizes: "240px" })}</span>
      <span class="hb-s">${icon(s.icon)}${c.L(s.th, s.en)}</span>
      <b>${j.title[c.lang]}</b>
      <span class="hb-p">${icon("pin")}${jobPlace(c, j)}</span>
    </a></li>`;
  };
  const col = (list, cls) => {
    const l = list.map(card).join("");
    return `<div class="hb-col${cls}"><div class="hb-run"><ul class="hb-l" role="list">${l}</ul><ul class="hb-l" role="list" aria-hidden="true" inert>${l}</ul></div></div>`;
  };
  return `<div class="hb" data-reveal="pop">
    <div class="hb-top">
      <span class="hb-live"><i aria-hidden="true"></i>${c.L(`เปิดรับสมัคร ${JOBS.length} ตำแหน่ง`, `${JOBS.length} jobs open now`)}</span>
      <a href="jobs.html">${c.L("ดูทั้งหมด", "See all")}${icon("arrow")}</a>
    </div>
    <div class="hb-cols">${col(jobs.filter((_, i) => i % 2 === 0), "")}${col(jobs.filter((_, i) => i % 2 === 1), " hb-col--b")}</div>
  </div>
  <p class="hero-chip hb-chip" data-reveal="pop" style="--d:4">${icon("shield")}<span><b>${c.L("นายจ้างผ่านการตรวจสอบ", "Checked employers")}</b><small>${c.L("ก่อนประกาศรับสมัครทุกตำแหน่ง", "Before any job is listed")}</small></span></p>`;
}

/* Document check: a stack of papers, each stamped "checked" and then moved to the back */
const HERO_DOCS = [
  { ic: "sign", k: { th: "สัญญาจ้างงาน", en: "Employment contract" }, t: { th: "ฉบับภาษาไทย", en: "Thai-language copy" },
    f: [["นายจ้าง", "Employer", 78], ["ตำแหน่งงาน", "Position", 56], ["ค่าจ้างและสวัสดิการ", "Pay and benefits", 70], ["ระยะสัญญา", "Contract term", 40]],
    chk: { th: "สัญญาจ้างตรงกับที่ตกลงไว้", en: "Contract matches the offer" } },
  { ic: "medical", k: { th: "ใบรับรองแพทย์", en: "Medical certificate" }, t: { th: "สถานพยาบาลที่รับรอง", en: "Approved clinic" },
    f: [["ผลตรวจสุขภาพ", "Health check", 62], ["วันที่ตรวจ", "Date of exam", 44], ["แพทย์ผู้ตรวจ", "Examining doctor", 70]],
    chk: { th: "ผลตรวจสุขภาพผ่านเกณฑ์", en: "Medical cleared" } },
  { ic: "passport", k: { th: "วีซ่าทำงาน", en: "Work visa" }, t: { th: "ตรงตามประเภทงาน", en: "Right visa for the job" },
    f: [["ประเภทวีซ่า", "Visa type", 58], ["ประเทศปลายทาง", "Destination", 66], ["ใช้ได้ถึง", "Valid until", 42]],
    chk: { th: "วีซ่าทำงานถูกประเภท", en: "Correct work visa" } },
  { ic: "receipt", k: { th: "ใบเสร็จรับเงิน", en: "Official receipt" }, t: { th: "ในนามบริษัท", en: "Issued by the company" },
    f: [["รายการ", "Item", 72], ["จำนวนเงิน", "Amount", 38], ["ชำระเข้าบัญชีบริษัท", "Paid to company account", 60]],
    chk: { th: "ใบเสร็จในนามบริษัททุกยอด", en: "Company receipt for every payment" } }
];
export function heroDocs(c) {
  const doc = (d, i) => `<div class="hd-doc${i === 0 ? " is-ok" : ""}" style="--i:${i}">
      <div class="hd-dh"><span class="hd-ic">${icon(d.ic)}</span><span><b>${d.k[c.lang]}</b><small>${d.t[c.lang]}</small></span></div>
      <dl class="hd-f">${d.f.map(([th, en, w]) => `<div><dt>${c.L(th, en)}</dt><dd style="--w:${w}%"></dd></div>`).join("")}</dl>
      <span class="hd-tx"><i></i><i></i><i></i></span>
      <div class="hd-foot"><span>${c.L(`ใบอนุญาตจัดหางาน ${CO.licenseTh}`, `Recruitment licence ${CO.licenseEn}`)}</span><svg class="hd-sig" viewBox="0 0 74 26" aria-hidden="true"><path d="M3 19c6-12 10-15 11-9s-3 10 2 6 7-11 10-6-1 8 4 4 5-7 8-3 4 4 9 0 7-4 11-2 6 1 10-1"/></svg></div>
      <span class="hd-stamp">${icon("check")}<b>${c.L("ตรวจแล้ว", "Checked")}</b></span>
    </div>`;
  return `<div class="hd" data-docs-hero>
    <div class="hd-desk" data-reveal="pop" aria-hidden="true">${HERO_DOCS.map(doc).join("\n    ")}</div>
    <div class="hd-card" data-reveal="pop" style="--d:3">
      <div class="trk-top"><span class="hd-seal">${icon("badge")}</span><div class="trk-who"><b>${c.L("ก่อนคุณเซ็น เราตรวจให้", "Checked before you sign")}</b><span>${c.L("เอกสารสำคัญ 4 ฉบับ", "Four key documents")}</span></div><span class="trk-tag">${c.L("ตัวอย่าง", "Example")}</span></div>
      <ol class="hd-l" role="list">${HERO_DOCS.map((d) => `<li class="is-done"><span class="trk-dot" aria-hidden="true">${icon("check")}</span>${d.chk[c.lang]}</li>`).join("")}</ol>
    </div>
  </div>`;
}

/* Sector gallery: four photos; the featured one grows and shows its roles and open jobs */
export function heroSectors(c) {
  const order = ["skilled", "hospitality", "agriculture", "manufacturing"];
  return `<div class="hg" data-hg data-on="0" data-reveal="pop">
    ${order.map((id, i) => {
      const s = SECTORS[id], info = SECTOR_INFO[id], n = JOBS.filter((j) => j.sector === id).length;
      return `<a class="hg-t${i === 0 ? " is-on" : ""}" href="jobs.html?sector=${id}">
      ${photo(c, info.img, "", { sizes: "(max-width: 960px) 60vw, 30vw" })}
      <span class="hg-n">${c.L(`${n} ตำแหน่ง`, `${n} ${n === 1 ? "job" : "jobs"}`)}</span>
      <span class="hg-cap"><span class="hg-ic">${icon(s.icon)}</span><b>${c.L(s.th, s.en)}</b>
        <span class="hg-more"><span><small>${info.roles[c.lang].slice(0, 3).join(c.L(" ", ", "))}</small><small>${icon("pin")}${info.dest[c.lang]}</small></span></span></span>
      <i class="hg-bar" aria-hidden="true"></i>
    </a>`;
    }).join("\n    ")}
  </div>`;
}
