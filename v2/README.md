# TG Oversea Solutions — เว็บไซต์แบบที่ 2 "Licensed Document"

แนวคิด: หน้าตาเหมือน "เอกสารทางการ" — กระดาษโทนฟ้าอ่อน หมึกสีน้ำเงินพาสปอร์ต ลายกิโยเช่ (ลายเส้นกันปลอมแบบธนบัตร/ใบอนุญาต) และตราประทับ
เพราะสิ่งที่คนหางานกังวลที่สุดคือ "บริษัทนี้ถูกกฎหมายไหม" ใบอนุญาต ต. 1307/2569 จึงเป็นพระเอกของหน้าแรก

## โครงสร้าง
```
v2/
├─ index.html, jobs.html, services.html, process.html, about.html, contact.html   ← ภาษาไทย (URL หลัก)
├─ en/…                         ← ภาษาอังกฤษ (URL แยก ตามหลัก SEO หลายภาษา)
├─ 404.html, sitemap.xml, robots.txt, llms.txt, site.webmanifest
├─ assets/css/site.css          ← ดีไซน์ทั้งหมด (สี/ฟอนต์อยู่ใน :root)
├─ assets/js/site.js            ← ตัวกรองงาน + ฟอร์มติดต่อ (เว็บใช้งานได้แม้ไม่มี JS)
└─ _build/                      ← ต้นฉบับเนื้อหา (ไม่ต้องอัปโหลดขึ้นโฮสต์)
```

## แก้เนื้อหา
แก้ไฟล์ใน `_build/` แล้วรัน (ต้องมี Node.js 18+):
```
cd v2
node _build/build.mjs
```
| ต้องการแก้ | ไฟล์ |
|---|---|
| โดเมน, เบอร์โทร, อีเมล, ที่อยู่, เมนู | `_build/site.mjs` |
| ตำแหน่งงาน | `_build/jobs.mjs` |
| ข้อความในแต่ละหน้า (ไทย/อังกฤษคู่กัน `c.L("ไทย", "English")`) | `_build/pages.mjs`, `_build/content.mjs` |
| header / footer / meta tag / Schema | `_build/layout.mjs` |

## SEO ที่ทำไว้
- **URL แยกภาษา** `/` (ไทย) และ `/en/` + `hreflang` + `x-default` — Google แสดงหน้าภาษาที่ตรงกับผู้ค้นหา (แบบที่ 1 สลับภาษาด้วย JS ในหน้าเดียว Google จะเห็นสองภาษาปนกัน)
- **Title / description เฉพาะทุกหน้า** ใส่คำค้นจริง เช่น "บริษัทจัดหางานไปทำงานต่างประเทศ ถูกกฎหมาย", "ตำแหน่งงานต่างประเทศ", "ขั้นตอนไปทำงานต่างประเทศ"
- **HTML พร้อมใช้ทันที** เมนู ลิงก์ ตำแหน่งงาน อยู่ใน HTML ตรง ๆ ไม่ต้องรอ JS (แบบที่ 1 สร้างเมนู/footer ด้วย JS)
- **Structured data (JSON-LD)**: EmploymentAgency พร้อมเลขใบอนุญาต ที่อยู่ เบอร์โทร, WebSite, BreadcrumbList, FAQPage (หน้า process), Service, ItemList ตำแหน่งงาน, รองรับ **JobPosting** สำหรับ Google for Jobs
- **canonical, Open Graph, Twitter card** พร้อมภาพแชร์ 1200×630 ทั้งสองภาษา (`assets/img/og-th.jpg`, `og-en.jpg`)
- **sitemap.xml** (มี hreflang), **robots.txt**, **llms.txt** (สรุปบริษัทให้ AI search อย่าง ChatGPT/Gemini/Perplexity อ่าน)
- **Core Web Vitals**: ไม่มี GSAP/Lenis/three, JS ไฟล์เดียว ~5 KB, รูปขนาดพอดี, กำหนด width/height ทุกรูป, prerender หน้าถัดไปด้วย Speculation Rules
- ฟีเจอร์ CSS ปี 2025–26: View Transitions ข้ามหน้า, scroll-driven animation, `:has()`, popover เมนูมือถือ, `details name=` FAQ, เช็กลิสต์เอกสารนับด้วย CSS ล้วน

## ⚠️ ต้องทำก่อนเปิดใช้จริง
1. **ใส่โดเมนจริง** ที่ `SITE_URL` ใน `_build/site.mjs` แล้ว build ใหม่ (ตอนนี้เป็นค่าสมมติ `https://www.tgoversea.com`)
2. **อัปโหลดเนื้อหาในโฟลเดอร์ `v2/` ไว้ที่ root ของโดเมน** (ไม่ใช่ใน /v2/) เพื่อให้ canonical, sitemap, 404 ถูกต้อง
3. **ตำแหน่งงานเป็นตัวอย่าง** — แทนด้วยงานจริงใน `_build/jobs.mjs` แล้วค่อยตั้ง `EMIT_JOB_POSTING = true` (Google ลงโทษประกาศงานที่ไม่มีจริง)
4. **ทีมผู้บริหาร** (about) — ใส่ชื่อจริงและรูป จะช่วยเรื่องความน่าเชื่อถือ (E-E-A-T)
5. **ยืนยันข้อมูล**: ระยะเวลา 2–4 เดือน, "ออกใบเสร็จในนามบริษัททุกครั้ง", วิสัยทัศน์/พันธกิจ, ชื่ออังกฤษ "Oversea" หรือ "Overseas"
6. หลังเปิดเว็บ: ยืนยันเว็บใน **Google Search Console** แล้วส่ง `sitemap.xml`, สร้าง/อัปเดต **Google Business Profile** ที่อยู่ปทุมธานีให้ตรงกับเว็บ (NAP เดียวกัน)
7. ถ้ามี LINE Official Account ให้เพิ่มใน `CO` และ `sameAs` (คนหางานไทยติดต่อผ่าน LINE มาก)

## ไม่ใส่ไว้โดยตั้งใจ
- **รีวิวลูกค้า**: แบบที่ 1 มีรีวิวตัวอย่าง (สมมติ) แบบที่ 2 ไม่ใส่ เพราะรีวิวปลอมเสี่ยงทั้งกฎหมายและ SEO — เพิ่มได้เมื่อมีรีวิวจริงที่ได้รับอนุญาต
