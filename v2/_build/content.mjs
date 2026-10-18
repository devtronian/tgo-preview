/* Shared content blocks used on more than one page. */
import { CO, SECTORS, COUNTRIES } from "./site.mjs";
import { icon } from "./layout.mjs";

export const SECTOR_INFO = {
  skilled: {
    head: { th: "ช่างที่ฝีมือพิสูจน์ได้", en: "Trades with proven skills" },
    desc: { th: "ช่างที่มีประสบการณ์และทักษะเฉพาะทาง ผ่านการทดสอบฝีมือตามมาตรฐานนายจ้างก่อนเดินทาง เหมาะกับงานก่อสร้าง โรงงาน และงานซ่อมบำรุง", en: "Experienced tradespeople, skill-tested to the employer's standard before departure, for construction, plant and maintenance work." },
    roles: { th: ["ช่างเชื่อม", "ช่างไฟฟ้า", "ช่างก่อสร้าง", "ช่างซ่อมบำรุง"], en: ["Welders", "Electricians", "Construction trades", "Maintenance technicians"] },
    dest: { th: "ออสเตรเลีย นิวซีแลนด์ ตะวันออกกลาง", en: "Australia, New Zealand, Middle East" }
  },
  manufacturing: {
    head: { th: "แรงงานโรงงานที่พร้อมทำงานเป็นกะ", en: "Shift-ready factory teams" },
    desc: { th: "พนักงานสายการผลิตที่มีวินัย เข้าใจมาตรฐานความปลอดภัย พร้อมทำงานเป็นกะในอุตสาหกรรมอาหาร อิเล็กทรอนิกส์ ชิ้นส่วน และอื่น ๆ", en: "Disciplined, safety-aware production staff ready for shift work in food, electronics, components and more." },
    roles: { th: ["พนักงานฝ่ายผลิต", "ผู้ควบคุมเครื่องจักร", "ตรวจสอบคุณภาพ (QC)", "แพ็กกิ้งและคลังสินค้า"], en: ["Production operators", "Machine operators", "Quality control", "Packing and warehouse"] },
    dest: { th: "เอเชีย ตะวันออกกลาง", en: "Asia, Middle East" }
  },
  agriculture: {
    head: { th: "คนเกษตรที่รู้จักงานจริง", en: "Farm hands who know the work" },
    desc: { th: "แรงงานภาคเกษตรสำหรับฟาร์มผัก ผลไม้ เรือนกระจก และปศุสัตว์ ทั้งงานตามฤดูกาลและงานต่อเนื่องทั้งปี", en: "Farm workers for fruit, vegetable, greenhouse and livestock operations, seasonal or year-round." },
    roles: { th: ["ฟาร์มผักและผลไม้", "งานเรือนกระจก", "ปศุสัตว์", "เก็บเกี่ยวตามฤดูกาล"], en: ["Fruit and vegetable farms", "Greenhouse work", "Livestock", "Seasonal harvest"] },
    dest: { th: "ออสเตรเลีย นิวซีแลนด์", en: "Australia, New Zealand" }
  },
  hospitality: {
    head: { th: "งานบริการแบบไทย ที่โลกต้องการ", en: "Thai hospitality the world asks for" },
    desc: { th: "สายงานที่เรามีผลงานชัดเจนที่สุด นักนวดแผนไทยและผู้เชี่ยวชาญสปาที่ส่งไปแล้วทั้งตะวันออกกลางและยุโรป รวมถึงเชฟอาหารไทยและพนักงานโรงแรม", en: "Our strongest track record: Thai massage therapists and spa specialists placed across the Middle East and Europe, plus Thai chefs and hotel staff." },
    roles: { th: ["นักนวดแผนไทย", "ผู้เชี่ยวชาญสปา", "เชฟและผู้ช่วยครัว", "พนักงานโรงแรม"], en: ["Thai massage therapists", "Spa therapists", "Chefs and kitchen staff", "Hotel staff"] },
    dest: { th: "ซาอุดีอาระเบีย โอมาน คูเวต ยูเออี ยุโรป", en: "Saudi Arabia, Oman, Kuwait, UAE, Europe" }
  }
};

/* placed = we have already placed workers there; partner = partner network */
export const DESTS = [
  { c: "sa", code: "RUH", city: { th: "ริยาด", en: "Riyadh" }, kind: "placed", work: { th: "นวดแผนไทย สปา", en: "Thai massage, spa" }, rot: -1.5 },
  { c: "ae", code: "DXB", city: { th: "ดูไบ", en: "Dubai" }, kind: "placed", work: { th: "สปา โรงแรม ครัวไทย", en: "Spa, hotels, Thai kitchens" }, rot: 1 },
  { c: "om", code: "MCT", city: { th: "มัสกัต", en: "Muscat" }, kind: "placed", work: { th: "นวดแผนไทยในรีสอร์ต", en: "Thai massage in resorts" }, rot: -1 },
  { c: "kw", code: "KWI", city: { th: "คูเวตซิตี", en: "Kuwait City" }, kind: "placed", work: { th: "สปาและเวลเนส", en: "Spa and wellness" }, rot: 1.5 },
  { c: "eu", code: "EUR", city: { th: "หลายประเทศ", en: "Several countries" }, kind: "placed", work: { th: "นักบำบัดสปาไทย", en: "Thai spa therapists" }, rot: -1 },
  { c: "au", code: "SYD", city: { th: "ซิดนีย์ และเมืองอื่น", en: "Sydney and beyond" }, kind: "partner", work: { th: "ช่างฝีมือ เกษตร", en: "Skilled trades, agriculture" }, rot: 1 },
  { c: "nz", code: "AKL", city: { th: "โอ๊คแลนด์ และเมืองอื่น", en: "Auckland and beyond" }, kind: "partner", work: { th: "ฟาร์ม งานช่าง", en: "Farming, trades" }, rot: -1.5 },
  { c: "asia", code: "ASIA", city: { th: "หลายประเทศ", en: "Several countries" }, kind: "partner", work: { th: "โรงงาน งานบริการ", en: "Manufacturing, services" }, rot: 1 }
];

export function sectorRows(c, detailed = false) {
  return `<ul class="sectors" role="list">` + Object.entries(SECTORS).map(([k, s]) => {
    const i = SECTOR_INFO[k];
    return `<li class="sector" id="sector-${k}">
      <span class="sector-ic">${icon(s.icon)}</span>
      <div class="sector-main">
        <h3>${c.L(s.th, s.en)}</h3>
        <p>${detailed ? i.desc[c.lang] : i.head[c.lang]}</p>
      </div>
      <dl class="sector-meta">
        <div><dt>${c.L("ตัวอย่างตำแหน่ง", "Typical roles")}</dt><dd>${i.roles[c.lang].join(c.en ? ", " : " ")}</dd></div>
        <div><dt>${c.L("ปลายทางหลัก", "Main destinations")}</dt><dd>${i.dest[c.lang]}</dd></div>
      </dl>
      <a class="sector-go" href="jobs.html?sector=${k}">${c.L("ดูตำแหน่ง", "See jobs")}<span class="sr"> ${c.L(s.th, s.en)}</span>${icon("arrow")}</a>
    </li>`;
  }).join("") + `</ul>`;
}

export function stamps(c) {
  return `<ul class="stamps" role="list">` + DESTS.map((d) => {
    const n = COUNTRIES[d.c];
    return `<li><a class="stamp-c stamp-c--${d.kind}" href="jobs.html?country=${d.c}" style="--rot:${d.rot}deg">
      <span class="st-code" aria-hidden="true">${d.code}</span>
      <span class="st-name">${c.L(n.th, n.en)}</span>
      <span class="st-city">${d.city[c.lang]}</span>
      <span class="st-work">${d.work[c.lang]}</span>
      <span class="st-kind">${d.kind === "placed" ? c.L("ส่งแรงงานแล้ว", "Workers placed") : c.L("เครือข่ายพันธมิตร", "Partner network")}</span>
    </a></li>`;
  }).join("") + `</ul>
  <p class="stamps-key"><span class="k-placed">${c.L("ส่งแรงงานไปทำงานแล้ว", "We have placed workers here")}</span><span class="k-partner">${c.L("เครือข่ายนายจ้างและเอเจนซีพันธมิตร", "Employer and partner-agency network")}</span></p>`;
}

/* The licence, set like an official document. Used on home and about. */
export function certificate(c, { headingLevel = "p", id = "cert-t" } = {}) {
  const H = headingLevel;
  return `<div class="cert">
    <img class="cert-ros" src="${c.root}assets/img/guilloche.svg" alt="" width="640" height="640" decoding="async">
    <div class="cert-card">
      <${H} class="cert-k" id="${id}">${c.L("ใบอนุญาตจัดหางานให้คนหางานไปทำงานต่างประเทศ", "Licence to recruit for overseas employment")}</${H}>
      <p class="cert-no">${c.L(CO.licenseTh, CO.licenseEn)}</p>
      <dl class="cert-dl">
        <div><dt>${c.L("ผู้รับอนุญาต", "Licensee")}</dt><dd>${c.L(CO.nameTh, CO.nameEn)}</dd></div>
        <div><dt>${c.L("ผู้ออกใบอนุญาต", "Issued by")}</dt><dd>${c.L("กรมการจัดหางาน กระทรวงแรงงาน", "Department of Employment, Ministry of Labour")}</dd></div>
        <div><dt>${c.L("สำนักงาน", "Office")}</dt><dd>${c.L("อ.คลองหลวง จ.ปทุมธานี", "Khlong Luang, Pathum Thani")}</dd></div>
      </dl>
      <div class="cert-act">
        <a href="${CO.doe}" rel="noopener" target="_blank">${c.L("ตรวจสอบกับกรมการจัดหางาน", "Verify with the department")}${icon("arrowUR")}</a>
        <a href="tel:1694">${icon("phone")}${c.L("สายด่วน 1694", "Hotline 1694")}</a>
      </div>
      <span class="seal" aria-hidden="true"><b>${c.L("ถูกกฎหมาย", "Licensed")}</b><small>DOE ${CO.licenseEn.replace("T. ", "")}</small></span>
    </div>
  </div>`;
}

export function scamChecks(c, id = "safety") {
  return `<section class="sec safety" id="${id}" aria-labelledby="${id}-t">
  <div class="wrap safety-in">
    <div class="sh">
      <h2 id="${id}-t" class="h2">${c.L("ตรวจ 3 ข้อนี้ ก่อนสมัครงานกับบริษัทใดก็ตาม", "Before you apply anywhere, check these three things")}</h2>
      <p class="lead">${c.L("มิจฉาชีพมักอ้างว่าส่งไปทำงานต่างประเทศได้เร็วโดยไม่มีใบอนุญาต ข้อมูลนี้ใช้ได้กับทุกบริษัท รวมถึงเราด้วย", "Scammers promise fast jobs abroad without a licence. These checks work for any agency, including us.")}</p>
    </div>
    <ol class="checks">
      <li>${icon("shield")}<div><h3>${c.L("ขอดูเลขที่ใบอนุญาต", "Ask for the licence number")}</h3><p>${c.L("บริษัทจัดหางานไปต่างประเทศต้องมีใบอนุญาตจากกรมการจัดหางาน แล้วนำเลขไปตรวจที่ doe.go.th", "An overseas recruiter must hold a Department of Employment licence. Check the number at doe.go.th.")}</p></div></li>
      <li>${icon("phone")}<div><h3>${c.L("โทรถามสายด่วน 1694", "Call the 1694 hotline")}</h3><p>${c.L("สายด่วนกรมการจัดหางาน ถามได้ว่าบริษัทและตำแหน่งงานนั้นมีอยู่จริงหรือไม่", "The department's hotline can confirm whether an agency and its job orders are real.")}</p></div></li>
      <li>${icon("doc")}<div><h3>${c.L("จ่ายเงินแล้วต้องได้ใบเสร็จ", "Pay only against a receipt")}</h3><p>${c.L("อย่าโอนเงินเข้าบัญชีบุคคล และขอใบเสร็จในนามบริษัททุกครั้ง", "Never pay into a personal account, and get a company receipt for every payment.")}</p></div></li>
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
