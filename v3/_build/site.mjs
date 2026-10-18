/* ==========================================================================
   Site-wide settings for v3. Change these, then run: node v3/_build/build.mjs
   ========================================================================== */

// ⚠️ ใส่โดเมนจริงก่อนเปิดใช้ (ไม่มี / ท้าย) — ใช้ทำ canonical, hreflang, sitemap, OG
export const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "");

// V3 lists illustrative career fields only; it does not emit JobPosting schema.

export const CO = {
  nameEn: "TG Oversea Solutions Recruitment Co., Ltd.",
  nameTh: "บริษัทจัดหางาน ทีจี โอเวอร์ซี โซลูชั่น จำกัด",
  short: "TG Oversea Solutions",
  phone: "083-157-0465",
  tel: "+66831570465",
  email: "tg.oversea.solutions@gmail.com",
  facebook: "https://www.facebook.com/share/1FQKF1hHze/",
  licenseTh: "ต. 1307/2569",
  licenseEn: "T. 1307/2569",
  founded: "2025-10-28",
  addrTh: "91/144 หมู่ 9 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี 12120",
  addrEn: "91/144 Moo 9, Khlong Nueng, Khlong Luang, Pathum Thani 12120, Thailand",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=91%2F144%20Moo%209%20Khlong%20Nueng%20Khlong%20Luang%20Pathum%20Thani%2012120",
  doe: "https://www.doe.go.th/"
};

/* Navigation order. `file` is the output filename in both languages. */
export const NAV = [
  { id: "jobs", file: "jobs.html", th: "ตำแหน่งงาน", en: "Jobs" },
  { id: "services", file: "services.html", th: "บริการ", en: "Services" },
  { id: "process", file: "process.html", th: "ขั้นตอนการสมัคร", en: "How it works" },
  { id: "about", file: "about.html", th: "เกี่ยวกับเรา", en: "About" },
  { id: "contact", file: "contact.html", th: "ติดต่อเรา", en: "Contact" }
];

export const COUNTRIES = {
  sa: { th: "ซาอุดีอาระเบีย", en: "Saudi Arabia", iso: "SA", region: "me" },
  ae: { th: "สหรัฐอาหรับเอมิเรตส์", en: "United Arab Emirates", iso: "AE", region: "me" },
  om: { th: "โอมาน", en: "Oman", iso: "OM", region: "me" },
  kw: { th: "คูเวต", en: "Kuwait", iso: "KW", region: "me" },
  au: { th: "ออสเตรเลีย", en: "Australia", iso: "AU", region: "oc" },
  nz: { th: "นิวซีแลนด์", en: "New Zealand", iso: "NZ", region: "oc" },
  eu: { th: "ยุโรป", en: "Europe", iso: "", region: "eu" },
  asia: { th: "เอเชีย", en: "Asia", iso: "", region: "as" }
};

export const SECTORS = {
  skilled: { th: "ช่างฝีมือและช่างเทคนิค", en: "Skilled & technical", icon: "wrench" },
  manufacturing: { th: "โรงงานและอุตสาหกรรม", en: "Manufacturing", icon: "factory" },
  agriculture: { th: "เกษตรและฟาร์ม", en: "Agriculture", icon: "sprout" },
  hospitality: { th: "งานบริการ สปา และครัว", en: "Hospitality & spa", icon: "lotus" }
};
