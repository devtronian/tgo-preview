/* ==========================================================================
   Job board data — edit this file to update listings on services.html.
   NOTE: the entries below are SAMPLE roles that reflect the sectors and
   destinations the company serves. Replace them with real, current openings
   before the site goes live.

   sector:  skilled | manufacturing | agriculture | hospitality
   country: sa | ae | om | kw | au | nz | eu | asia
   ========================================================================== */
window.TG_COUNTRIES = {
  sa:   { th: "ซาอุดีอาระเบีย", en: "Saudi Arabia" },
  ae:   { th: "สหรัฐอาหรับเอมิเรตส์", en: "United Arab Emirates" },
  om:   { th: "โอมาน", en: "Oman" },
  kw:   { th: "คูเวต", en: "Kuwait" },
  au:   { th: "ออสเตรเลีย", en: "Australia" },
  nz:   { th: "นิวซีแลนด์", en: "New Zealand" },
  eu:   { th: "ยุโรป", en: "Europe" },
  asia: { th: "เอเชีย", en: "Asia" }
};

window.TG_SECTORS = {
  skilled:       { th: "ช่างฝีมือและช่างเทคนิค", en: "Skilled & Technical", icon: "wrench" },
  manufacturing: { th: "โรงงานและอุตสาหกรรม", en: "Manufacturing", icon: "factory" },
  agriculture:   { th: "เกษตรและฟาร์ม", en: "Agriculture", icon: "sprout" },
  hospitality:   { th: "งานบริการ สปา และครัว", en: "Hospitality & Services", icon: "lotus" }
};

window.TG_JOBS = [
  {
    id: "thai-massage-sa", sector: "hospitality", country: "sa",
    title: { th: "นักนวดแผนไทย", en: "Thai Massage Therapist" },
    city: { th: "ริยาด", en: "Riyadh" },
    req: {
      th: ["มีประกาศนียบัตรนวดแผนไทยที่รับรองได้", "ประสบการณ์ทำงานในสปาหรือร้านนวด", "สุขภาพแข็งแรง พร้อมเดินทาง"],
      en: ["Recognised Thai massage certificate", "Experience in a spa or massage clinic", "Good health, ready to travel"]
    }
  },
  {
    id: "spa-therapist-ae", sector: "hospitality", country: "ae",
    title: { th: "ผู้เชี่ยวชาญสปา", en: "Spa Therapist" },
    city: { th: "ดูไบ", en: "Dubai" },
    req: {
      th: ["ทักษะนวดอโรมา นวดหน้า และทรีตเมนต์ร่างกาย", "สื่อสารภาษาอังกฤษเบื้องต้นได้", "บุคลิกดี ใจรักงานบริการ"],
      en: ["Aromatherapy, facial and body treatments", "Basic spoken English", "Warm, service-minded personality"]
    }
  },
  {
    id: "thai-massage-om", sector: "hospitality", country: "om",
    title: { th: "นักนวดแผนไทย", en: "Thai Massage Therapist" },
    city: { th: "มัสกัต", en: "Muscat" },
    req: {
      th: ["มีประกาศนียบัตรนวดแผนไทย", "ยินดีทำงานในโรงแรมหรือรีสอร์ต", "มีอบรมก่อนเดินทาง"],
      en: ["Thai massage certificate", "Comfortable working in hotels or resorts", "Pre-departure training provided"]
    }
  },
  {
    id: "spa-kw", sector: "hospitality", country: "kw",
    title: { th: "พนักงานสปาและเวลเนส", en: "Spa & Wellness Staff" },
    city: { th: "คูเวตซิตี", en: "Kuwait City" },
    req: {
      th: ["ประสบการณ์ด้านสปาหรือนวดเพื่อสุขภาพ", "ทำงานเป็นทีมได้ดี", "รับผู้ที่ยังไม่เคยไปต่างประเทศ"],
      en: ["Spa or wellness massage experience", "Strong team player", "First-time overseas workers welcome"]
    }
  },
  {
    id: "thai-chef-ae", sector: "hospitality", country: "ae",
    title: { th: "เชฟอาหารไทย / ผู้ช่วยครัว", en: "Thai Chef / Kitchen Assistant" },
    city: { th: "อาบูดาบี", en: "Abu Dhabi" },
    req: {
      th: ["ประสบการณ์ครัวไทยในร้านอาหารหรือโรงแรม", "เข้าใจมาตรฐานความสะอาดในครัว", "ทดสอบฝีมือการทำอาหารก่อนคัดเลือก"],
      en: ["Thai kitchen experience in restaurants or hotels", "Understands food hygiene standards", "Cooking trade test before selection"]
    }
  },
  {
    id: "welder-au", sector: "skilled", country: "au",
    title: { th: "ช่างเชื่อม", en: "Welder" },
    city: { th: "ออสเตรเลีย", en: "Australia" },
    req: {
      th: ["ประสบการณ์งานเชื่อมในงานโครงสร้างหรือโรงงาน", "ผ่านการทดสอบฝีมือตามมาตรฐานนายจ้าง", "มีพื้นฐานภาษาอังกฤษ"],
      en: ["Structural or fabrication welding experience", "Pass the employer's skills test", "Basic English"]
    }
  },
  {
    id: "electrician-au", sector: "skilled", country: "au",
    title: { th: "ช่างไฟฟ้า / ช่างซ่อมบำรุง", en: "Electrician / Maintenance Technician" },
    city: { th: "ออสเตรเลีย", en: "Australia" },
    req: {
      th: ["วุฒิ ปวช./ปวส. สายช่าง หรือประสบการณ์เทียบเท่า", "อ่านแบบและใช้เครื่องมือวัดได้", "เคร่งครัดเรื่องความปลอดภัย"],
      en: ["Trade certificate or equivalent experience", "Reads drawings and uses test equipment", "Strong safety discipline"]
    }
  },
  {
    id: "farm-nz", sector: "agriculture", country: "nz",
    title: { th: "แรงงานฟาร์มผักและผลไม้", en: "Fruit & Vegetable Farm Worker" },
    city: { th: "นิวซีแลนด์", en: "New Zealand" },
    req: {
      th: ["แข็งแรง ทำงานกลางแจ้งได้", "มีประสบการณ์งานเกษตรจะพิจารณาเป็นพิเศษ", "งานตามฤดูกาลและงานต่อเนื่อง"],
      en: ["Fit for outdoor work", "Farming experience is an advantage", "Seasonal and ongoing roles"]
    }
  },
  {
    id: "greenhouse-au", sector: "agriculture", country: "au",
    title: { th: "พนักงานเรือนกระจก", en: "Greenhouse Worker" },
    city: { th: "ออสเตรเลีย", en: "Australia" },
    req: {
      th: ["ปลูก ดูแล และเก็บเกี่ยวพืชในโรงเรือน", "ละเอียดรอบคอบ ทำงานตามขั้นตอน", "มีอบรมการใช้อุปกรณ์"],
      en: ["Planting, tending and harvesting indoors", "Careful and process-driven", "Equipment training provided"]
    }
  },
  {
    id: "production-asia", sector: "manufacturing", country: "asia",
    title: { th: "พนักงานฝ่ายผลิต", en: "Production Operator" },
    city: { th: "เอเชีย", en: "Asia" },
    req: {
      th: ["ทำงานในสายการผลิตได้ตามกะ", "สายตาดี ไม่ตาบอดสี", "ผ่านการตรวจสุขภาพตามข้อกำหนด"],
      en: ["Comfortable on shift-based production lines", "Good eyesight, no colour blindness", "Pass the required medical check"]
    }
  },
  {
    id: "qc-asia", sector: "manufacturing", country: "asia",
    title: { th: "พนักงานตรวจสอบคุณภาพ (QC)", en: "Quality Control Inspector" },
    city: { th: "เอเชีย", en: "Asia" },
    req: {
      th: ["ประสบการณ์ QC ในโรงงานอุตสาหกรรม", "ใช้เครื่องมือวัดพื้นฐานได้", "จดบันทึกและรายงานผลได้"],
      en: ["QC experience in a factory", "Uses basic measuring tools", "Records and reports findings"]
    }
  },
  {
    id: "spa-eu", sector: "hospitality", country: "eu",
    title: { th: "นักบำบัดสปาไทย", en: "Thai Spa Therapist" },
    city: { th: "ยุโรป", en: "Europe" },
    req: {
      th: ["ประสบการณ์นวดแผนไทยและสปา 2 ปีขึ้นไป", "สื่อสารภาษาอังกฤษได้", "พร้อมทำงานในเดย์สปาหรือโรงแรม"],
      en: ["2+ years of Thai massage and spa work", "Conversational English", "Day spa or hotel settings"]
    }
  }
];
