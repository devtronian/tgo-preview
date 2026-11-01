/* Company profile flip book. Page images come from _build/profile-pages.py (assets/profile/).
   Without JS the pages are a plain list of images; site.js turns them into a book. */
import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { icon } from "./layout.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const META = JSON.parse(readFileSync(join(HERE, "profile-meta.json"), "utf8"));
const PW = 2480, PH = 3508;   // page canvas (A4)

/* One entry per page, in book order. `t` is the short title used for thumbnails and the
   contents list; `alt` says what the page shows, for screen readers and search. */
export const PROFILE = [
  { id: "cover", t: { th: "ปก", en: "Cover" },
    alt: { th: "ปกโปรไฟล์บริษัท TG Overseas Solutions Recruitment Co., Ltd. บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด โทร 083-157-0465 อีเมล tg.oversea.solutions@gmail.com ที่อยู่ 91/144 หมู่ 9 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120",
      en: "Company profile cover: TG Overseas Solutions Recruitment Co., Ltd., phone 083-157-0465, email tg.oversea.solutions@gmail.com, 91/144 Moo 9, Khlong Nueng, Khlong Luang, Pathum Thani 12120" } },
  { id: "about", t: { th: "เกี่ยวกับเรา", en: "About us" },
    alt: { th: "บทที่ 1 เกี่ยวกับเรา: ป้ายบริษัทในสำนักงาน บริษัทก่อตั้งเมื่อวันที่ 28 ตุลาคม 2568 มุ่งสร้างโอกาสให้แรงงานไทยได้งานที่เหมาะสมในต่างประเทศ ด้วยความโปร่งใส ความปลอดภัย และการดูแลอย่างต่อเนื่อง ปรัชญาของเรา: การไปทำงานต่างประเทศควรเป็นการสร้างโอกาส รายได้ คุณภาพชีวิต และอนาคตที่ดีขึ้น",
      en: "Chapter 1, About us: the company sign in our office. Founded on 28 October 2025 to give Thai workers access to suitable jobs abroad, with transparency, safety and continuing care. Our philosophy: working abroad should bring opportunity, income, a better quality of life and a better future." } },
  { id: "vision", t: { th: "วิสัยทัศน์และพันธกิจ", en: "Vision and mission" },
    alt: { th: "บทที่ 2 วิสัยทัศน์และพันธกิจ: ดูแลแรงงานไทยตั้งแต่วันแรกจนถึงวันกลับบ้าน ด้วยความโปร่งใส ความปลอดภัย และความใส่ใจ พันธกิจ 5 ข้อ ได้แก่ สร้างโอกาสที่เหมาะสมกับทักษะ ดำเนินงานอย่างโปร่งใส ใส่ใจความปลอดภัยและคุณภาพชีวิต เชื่อมนายจ้างกับบุคลากรคุณภาพ และดูแลตั้งแต่ต้นจนกลับบ้าน พร้อมภาพช่าง CNC และช่างเชื่อม",
      en: "Chapter 2, Vision and mission: caring for Thai workers from the first day abroad to the day they return home, with transparency, safety and attention to detail. Five missions: opportunities that fit each person's skills, transparent operations, safety and quality of life, linking employers with quality people, and support from start to finish. Photos of a CNC operator and a welder." } },
  { id: "team", t: { th: "ทีมงาน", en: "Our team" },
    alt: { th: "บทที่ 3 ทีมผู้บริหาร: ผังทีมงานพร้อมรูปถ่าย ได้แก่ กรรมการ 2 ท่าน ที่ปรึกษางานต่างประเทศ ที่ปรึกษาด้านกฎหมาย ที่ปรึกษาบุคลากร ผู้จัดการและรองผู้จัดการฝ่ายสรรหา พนักงานฝ่ายบัญชี และพนักงานธุรการ",
      en: "Chapter 3, Our leadership: team chart with photos of the two directors, recruitment and legal consultants, the recruitment manager and deputy manager, and accounts and administration staff." } },
  { id: "leaders", t: { th: "ผู้บริหาร", en: "Leadership" },
    alt: { th: "บทที่ 3 ผู้บริหาร: นายทองหลาง แพงศรีละคร กรรมการและผู้บริหาร เชี่ยวชาญด้านกฎหมายและการบริหารองค์กร ให้คำปรึกษาด้านกฎหมายแรงงาน และนางสาวกฎอัญญา ลีลาศิริวงศ์ กรรมการและผู้จัดการ ผู้ถือใบอนุญาตส่งคนไปทำงานต่างประเทศ แพทย์ผู้เชี่ยวชาญด้านรังสีวิทยาทั่วไป",
      en: "Chapter 3, Leadership: Mr Thonglang Pangsrilakorn, Director and Executive, expert in law and organisational management who advises on labour law; and Ms Kodunya Leelasiriwong, Director and Manager, licensed overseas employment provider and medical specialist in general radiology." } },
  { id: "abroad1", t: { th: "ประสบการณ์ต่างประเทศ", en: "International experience" },
    alt: { th: "บทที่ 4 ประสบการณ์ต่างประเทศ: ในช่วง 2–3 ปีที่ผ่านมา ทีมงานสนับสนุนหมอนวดไทยและผู้เชี่ยวชาญสปาในซาอุดีอาระเบีย โอมาน คูเวต สหรัฐอาหรับเอมิเรตส์ และยุโรป ภาพงานแสดงสินค้าด้านสุขภาพระดับนานาชาติ การประเมินทักษะ และการประสานงานที่สนามบินก่อนเดินทาง",
      en: "Chapter 4, International experience: over the past two to three years our team has supported Thai massage and spa professionals in Saudi Arabia, Oman, Kuwait, the United Arab Emirates and Europe. Photos from an international wellness trade show, a skills assessment and airport coordination before departure." } },
  { id: "abroad2", t: { th: "ประสบการณ์ต่างประเทศ (ต่อ)", en: "International experience (cont.)" },
    alt: { th: "บทที่ 4 ประสบการณ์ต่างประเทศ (ต่อ): การต้อนรับและสนับสนุนโดยพันธมิตรในท้องถิ่น การเยี่ยมชมนายจ้างและสถานที่ทำงาน และการดูแลหมอนวดในสถานที่ทำงานอย่างต่อเนื่อง",
      en: "Chapter 4, International experience continued: welcome and support from local partners, visits to employers and workplaces, and continuing support for therapists at work." } },
  { id: "background", t: { th: "ความเป็นมา", en: "Our background" },
    alt: { th: "ความเป็นมา: ปี 2563 บริษัทนำคนต่างด้าวเข้ามาทำงานในประเทศ ที.จี. เลเบอร์ จำกัด เริ่มนำแรงงานจากลาว กัมพูชา เวียดนาม และเมียนมา เข้ามาทำงานในไทย ปี 2568–2569 ก่อตั้ง TG Overseas Solutions Recruitment เมื่อ 28 ตุลาคม 2568 จากการบริหารแรงงานในประเทศสู่การจัดหางานต่างประเทศ",
      en: "Our background: in 2020 T.G. Labor Co., Ltd. began bringing workers from Laos, Cambodia, Vietnam and Myanmar to work in Thailand. In 2025–2026 TG Overseas Solutions Recruitment was founded, on 28 October 2025. From local workforce management to international recruitment." } },
  { id: "services", t: { th: "บริการของเรา", en: "Our services" },
    alt: { th: "บทที่ 5 บริการของเรา: จัดหางานเพื่อส่งแรงงานไทยไปทำงานต่างประเทศ ปัจจุบันมีเครือข่ายพันธมิตรในออสเตรเลียและนิวซีแลนด์ ประเทศเป้าหมายในอนาคต ได้แก่ ไต้หวัน อิสราเอล เกาหลีใต้ สิงคโปร์ รัสเซีย สหรัฐอาหรับเอมิเรตส์ และญี่ปุ่น",
      en: "Chapter 5, Our services: international recruitment of Thai workers. Current partnership network in Australia and New Zealand. Planned destinations: Taiwan, Israel, South Korea, Singapore, Russia, the United Arab Emirates and Japan." } },
  { id: "sectors", t: { th: "สายงาน", en: "Job categories" },
    alt: { th: "บทที่ 6 สายงาน: ช่างฝีมือและช่างเทคนิค (ช่างเชื่อม ช่างไม้ ช่างก่อสร้าง ช่างเทคนิค) โรงงานและอุตสาหกรรม (พนักงานโรงงาน ฝ่ายผลิต) เกษตร (งานฟาร์ม เพาะปลูกและเก็บเกี่ยว) และงานบริการ (พนักงานบริการ ผู้ช่วยในครัว งานอาหาร)",
      en: "Chapter 6, Job categories: skilled and technical (welders, carpenters, construction workers, technicians), manufacturing (factory and production staff), agriculture (farm work, planting and harvesting), and hospitality and services (service staff, kitchen assistants, food service)." } },
  { id: "process", t: { th: "ขั้นตอนการสรรหา", en: "Recruitment process" },
    alt: { th: "บทที่ 7 ขั้นตอนการสรรหา 4 ขั้น: 1 นายจ้างและใบสั่งงาน (คัดเลือกนายจ้าง MOU สัญญาบริการ) 2 สรรหาและคัดเลือก (ประชาสัมพันธ์ รับสมัคร สัมภาษณ์ สรุปผล) 3 เตรียมก่อนเดินทาง (หนังสือเดินทาง ตรวจสุขภาพ ตรวจประวัติอาชญากรรม วีซ่า กรมการจัดหางาน สัญญาจ้าง ทดสอบฝีมือ) 4 เดินทางและติดตามผลหลังเริ่มงาน",
      en: "Chapter 7, Recruitment process in four stages: 1 employer and job order (employer selection, MOU, service agreement); 2 recruitment and selection (advertising, applications, interviews, results); 3 pre-departure (passport, medical check, police clearance, visa, Department of Employment, employment contract, skills test); 4 deployment and follow-up after starting work." } },
  { id: "strengths", t: { th: "จุดแข็งของเรา", en: "Our strengths" },
    alt: { th: "บทที่ 8 ทำไมต้องเลือกเรา: ยึดแรงงานเป็นศูนย์กลาง กระบวนการโปร่งใส เครือข่ายต่างประเทศรวมถึงออสเตรเลีย ผู้บริหารมืออาชีพ และดูแลครบวงจรตั้งแต่คัดเลือก เตรียมเอกสาร จนถึงติดตามหลังเริ่มงาน",
      en: "Chapter 8, Why TG Overseas: worker-centric, a transparent process, an international network including Australia, professional leadership, and end-to-end support from selection and documents to follow-up after starting work." } },
  { id: "tglabor", t: { th: "ประสบการณ์ T.G. Labor", en: "T.G. Labor experience" },
    alt: { th: "บทที่ 9 ประสบการณ์ตั้งแต่ปี 2563 ของ T.G. Labor: ประสบการณ์กว่า 5 ปีในการนำแรงงานจากลาว กัมพูชา เวียดนาม และเมียนมา เข้ามาทำงานในไทยอย่างถูกกฎหมาย มีพันธมิตรที่แข็งแกร่ง และปฏิบัติตามกฎหมาย 100%",
      en: "Chapter 9, experience since 2020 at T.G. Labor: more than five years bringing workers from Laos, Cambodia, Vietnam and Myanmar to work legally in Thailand, with strong partners and full legal compliance." } },
  { id: "commitment", t: { th: "ความมุ่งมั่นต่อแรงงาน", en: "Commitment to workers" },
    alt: { th: "บทที่ 10 ความมุ่งมั่นต่อแรงงาน: มากกว่างาน คืออนาคตที่ดีกว่า หลัก 4 ข้อ ได้แก่ ความโปร่งใส ความปลอดภัย ความเป็นธรรม และการดูแลตั้งแต่ก่อนเดินทาง ระหว่างทำงาน จนถึงวันที่กลับบ้าน",
      en: "Chapter 10, Commitment to workers: more than a job, a better future. Four principles: transparency, safety, fairness, and care before departure, during work and until the day workers come home." } },
  { id: "licence", t: { th: "ใบอนุญาต", en: "Licence" },
    alt: { th: "บทที่ 11 ใบอนุญาตจัดหางานให้คนหางานเพื่อไปทำงานในต่างประเทศ เลขที่ ต.1307/2569 ออกให้บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด โดยนางสาวกฎอัญญา ลีลาศิริวงศ์ จากกรมการจัดหางาน",
      en: "Chapter 11, Licence: licence to recruit job seekers for work abroad, no. T. 1307/2569, issued by the Department of Employment to TG Overseas Solutions Recruitment Co., Ltd., represented by Ms Kodunya Leelasiriwong." } }
];

const meta = (c, i) => {
  const m = META[c.lang][i];
  if (!m || m.id !== PROFILE[i].id) throw new Error("profile-meta.json is out of date: run python _build/profile-pages.py");
  return m;
};
export const pageSrc = (c, i, w) => `${c.root}assets/profile/${c.lang}-${String(i + 1).padStart(2, "0")}-${w}.webp`;
export const profilePdf = (c) => `${c.root}assets/profile/tg-company-profile-${c.lang}.pdf`;
const pdfSize = (c) => (statSync(join(HERE, "..", "assets", "profile", `tg-company-profile-${c.lang}.pdf`)).size / 1048576).toFixed(1);

/* <img> for one page; pages from the low-resolution PNG export only have the 640 size */
function pageImg(c, i, { eager = false, sizes = "(max-width: 760px) 100vw, 560px" } = {}) {
  const m = meta(c, i), ws = [640, 1280].filter((w) => w <= m.w);
  return `<img src="${pageSrc(c, i, ws[ws.length - 1])}" srcset="${ws.map((w) => `${pageSrc(c, i, w)} ${w}w`).join(", ")}" sizes="${sizes}" width="${PW / 4}" height="${PH / 4}" alt="${PROFILE[i].alt[c.lang]}"${eager ? (i === 0 ? ' fetchpriority="high"' : "") : ' loading="lazy"'} decoding="async" style="background:${m.c}" data-zoom="${pageSrc(c, i, m.w)}">`;
}

export const preloadCover = (c) => `<link rel="preload" as="image" href="${pageSrc(c, 0, 640)}" fetchpriority="high">`;

export function flipbook(c) {
  const n = PROFILE.length;
  const L = c.L;
  return `<div class="fb" data-fb role="region" aria-roledescription="${L("หนังสือ", "book")}" aria-label="${L("โปรไฟล์บริษัท", "Company profile")}">
  <div class="fb-stage" data-fb-stage>
    <button class="fb-side fb-side--prev" type="button" data-fb-prev aria-label="${L("หน้าก่อนหน้า", "Previous page")}" hidden>${icon("chevL")}</button>
    <div class="fb-book" data-fb-book>
      ${PROFILE.map((p, i) => `<figure class="fb-pg" id="page-${i + 1}" data-title="${p.t[c.lang]}">${pageImg(c, i, { eager: i < 3 })}<figcaption class="sr">${L("หน้า", "Page")} ${i + 1}: ${p.t[c.lang]}</figcaption></figure>`).join("\n      ")}
    </div>
    <button class="fb-side fb-side--next" type="button" data-fb-next aria-label="${L("หน้าถัดไป", "Next page")}" hidden>${icon("chevR")}</button>
  </div>
  <div class="fb-bar" data-fb-bar hidden>
    <button class="fb-b" type="button" data-fb-grid aria-label="${L("ดูทุกหน้า", "All pages")}" title="${L("ดูทุกหน้า", "All pages")}">${icon("grid")}</button>
    <div class="fb-nav">
      <button class="fb-b" type="button" data-fb-prev aria-label="${L("หน้าก่อนหน้า", "Previous page")}">${icon("chevL")}</button>
      <label class="fb-scrub"><span class="sr">${L("เลือกหน้า", "Go to page")}</span><input type="range" min="0" max="${n - 1}" value="0" step="1" data-fb-range></label>
      <output class="fb-count" data-fb-count>1 / ${n}</output>
      <button class="fb-b" type="button" data-fb-next aria-label="${L("หน้าถัดไป", "Next page")}">${icon("chevR")}</button>
    </div>
    <button class="fb-b" type="button" data-fb-zoom aria-label="${L("ขยายอ่าน", "Zoom in to read")}" title="${L("ขยายอ่าน", "Zoom in to read")}">${icon("zoomIn")}</button>
    <button class="fb-b fb-b--snd" type="button" data-fb-sound aria-pressed="false" aria-label="${L("เสียงพลิกหน้า", "Page-turn sound")}" title="${L("เสียงพลิกหน้า", "Page-turn sound")}">${icon("mute", "fb-off")}${icon("sound", "fb-on")}</button>
    <button class="fb-b" type="button" data-fb-full aria-pressed="false" aria-label="${L("เต็มจอ", "Full screen")}" title="${L("เต็มจอ", "Full screen")}">${icon("expand", "fb-off")}${icon("shrink", "fb-on")}</button>
    <a class="fb-b fb-b--dl" href="${profilePdf(c)}" download aria-label="${L("ดาวน์โหลดโปรไฟล์บริษัท PDF", "Download company profile PDF")}" title="${L(`ดาวน์โหลด PDF (${pdfSize(c)} MB)`, `Download PDF (${pdfSize(c)} MB)`)}">${icon("download")}<span>PDF</span></a>
  </div>
  <p class="fb-hint" data-fb-hint hidden><span class="fb-hint--m">${L("คลิกที่หน้ากระดาษ ลากมุม หรือกดปุ่มลูกศรบนคีย์บอร์ดเพื่อพลิกหน้า", "Click a page, drag it, or use the arrow keys to turn pages")}</span><span class="fb-hint--t">${L("ปัดซ้าย-ขวาเพื่อพลิกหน้า แตะแว่นขยายเพื่ออ่านตัวอักษรเล็ก", "Swipe to turn pages. Tap the magnifier to read small text")}</span></p>
  <p class="sr" aria-live="polite" data-fb-live></p>
  <dialog class="fbd fbd--grid" data-fb-grid-dlg aria-labelledby="fbg-t">
    <div class="fbd-head"><p class="fbd-t" id="fbg-t">${L("ทุกหน้า", "All pages")}</p><button class="ibtn ibtn--s" type="button" data-fb-close aria-label="${L("ปิด", "Close")}">${icon("x")}</button></div>
    <ol class="fbg" role="list">
      ${PROFILE.map((p, i) => `<li><button type="button" data-fb-go="${i}"><img src="${pageSrc(c, i, 240)}" width="120" height="170" alt="" loading="lazy" decoding="async" style="background:${meta(c, i).c}"><span><b>${i + 1}</b> ${p.t[c.lang]}</span></button></li>`).join("\n      ")}
    </ol>
  </dialog>
  <dialog class="fbd fbd--zoom" data-fb-zoom-dlg aria-labelledby="fbz-t">
    <div class="fbd-head">
      <p class="fbd-t" id="fbz-t" data-fb-zoom-t></p>
      <div class="fbz-act">
        <button class="ibtn ibtn--s" type="button" data-fb-zout aria-label="${L("ย่อ", "Zoom out")}">${icon("zoomOut")}</button>
        <button class="ibtn ibtn--s" type="button" data-fb-zin aria-label="${L("ขยาย", "Zoom in")}">${icon("zoomIn")}</button>
        <button class="ibtn ibtn--s" type="button" data-fb-close aria-label="${L("ปิด", "Close")}">${icon("x")}</button>
      </div>
    </div>
    <div class="fbz-body" data-fb-zoom-body tabindex="0"></div>
  </dialog>
</div>`;
}

/* Contents list under the book: also how the pages are reached without JS */
export function profileToc(c) {
  return `<ol class="fbt" role="list">
      ${PROFILE.map((p, i) => i ? `<li><a href="#page-${i + 1}" data-fb-to="${i}"><span class="fbt-n">${String(i + 1).padStart(2, "0")}</span><span>${p.t[c.lang]}</span>${icon("arrow")}</a></li>` : "").join("\n      ")}
    </ol>`;
}

/* Small "read our profile" card for the About page */
export function profileTeaser(c) {
  return `<div class="fbx">
      <a class="fbx-cover" href="profile.html" tabindex="-1" aria-hidden="true"><img src="${pageSrc(c, 0, 640)}" width="320" height="453" alt="" loading="lazy" decoding="async" style="background:${meta(c, 0).c}"></a>
      <div>
        <p class="kick">${icon("book")}${c.L("โปรไฟล์บริษัท", "Company profile")}</p>
        <h2 id="profile-t" class="h2" data-split>${c.L("อ่านโปรไฟล์บริษัท แบบพลิกหน้า", "Read our company profile, page by page")}</h2>
        <p class="lead">${c.L(`${PROFILE.length} หน้า ตั้งแต่ประวัติ ทีมผู้บริหาร ประสบการณ์ต่างประเทศ ขั้นตอนการสรรหา จนถึงใบอนุญาต เปิดอ่านบนเว็บหรือดาวน์โหลดเป็น PDF ส่งต่อให้นายจ้างและครอบครัวได้`, `${PROFILE.length} pages covering our history, leadership, work abroad, recruitment process and licence. Read it here, or download the PDF to share with employers and family.`)}</p>
        <div class="btn-row">
          <a class="btn btn-pr" href="profile.html">${icon("book")}${c.L("เปิดอ่านโปรไฟล์", "Open the profile")}</a>
          <a class="btn btn-line" href="${profilePdf(c)}" download>${icon("download")}${c.L("ดาวน์โหลด PDF", "Download PDF")}</a>
        </div>
      </div>
    </div>`;
}
