# TG Oversea Solutions · V4 · Recruitment Partners

เว็บไซต์บริษัทจัดหางาน โทนน้ำเงิน–ขาว ภาพคนทำงานและการคัดเลือกบุคลากร ครบ 6 หน้า ภาษาไทยและอังกฤษแยก URL

เปิด [ภาษาไทย](index.html) · [English](en/index.html) · [เลือกทั้ง 4 เวอร์ชัน](../versions.html)

## แนวทางเวอร์ชันนี้

- ระบุประเภทธุรกิจ ใบอนุญาต และเบอร์ติดต่อไว้ตั้งแต่ส่วนบน
- ช่องค้นหาสายงาน/ประเทศ พร้อมตัวอย่างสายงานสามกลุ่มบนหน้าแรก
- ทางเข้าสำหรับคนหางานและนายจ้างแยกชัดเจน
- อธิบายบริการสรรหา คัดเลือก สัมภาษณ์ เตรียมเอกสาร และประสานการเดินทาง
- ภาพทีมงานและสถานที่ทำงานเป็นภาพประกอบแนวคิด ไม่ใช่บุคลากรหรือผลงานจริงของบริษัท
- แอนิเมชันเปิดภาพ ส่วนเนื้อหาเมื่อเลื่อนหน้า hover และ View Transitions ในเบราว์เซอร์ที่รองรับ พร้อมปุ่มหยุด motion และการรองรับ reduced motion
- ตัวกรองงาน FAQ เช็กลิสต์เอกสาร เมนูมือถือ และฟอร์มสร้างข้อความอีเมลยังใช้งานได้

## เปิดผ่าน local server

รันจาก `C:\Dev\tgo`:

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

เปิด http://127.0.0.1:4174/v4/ (เซิร์ฟเวอร์ที่ใช้ตรวจงานถูกปิดหลังทดสอบแล้ว)

## แก้ไขข้อมูล

| ส่วน | ไฟล์ต้นฉบับ |
|---|---|
| หน้าแรกใหม่ | `_build/pages.mjs` |
| หน้า jobs / services / process / about / contact | `_build/content.mjs` |
| Header / Footer / metadata / HTML generator | `_build/build.mjs` |
| ข้อมูลบริษัทและช่องทางติดต่อ | `_build/site.mjs` |
| ตัวอย่างตำแหน่งงาน | `_build/jobs.mjs` |
| Corporate design และ responsive | `assets/css/site.css` |
| รูปแบบส่วนประกอบพื้นฐานที่สืบทอดจาก V3 | `assets/css/base.css` |
| พฤติกรรมตัวกรอง ฟอร์ม และเมนู | `assets/js/site.js` |
| รูปภาพ | `assets/img/` |
| ต้นฉบับภาพแชร์ 1200×630 สองภาษา | `_build/social.html` |

หลังแก้ต้นฉบับ:

```powershell
node v4/_build/build.mjs
node v4/_build/validate.mjs
node v4/_build/validate-seo.mjs
```

ไฟล์ HTML สร้างไว้พร้อมเปิดใช้งานแล้ว ไม่ต้องติดตั้งแพ็กเกจ หน้าเว็บทั้งหมดอ้างอิง assets ภายใน V4 และไม่พึ่งไฟล์ V3

## SEO และการเผยแพร่

สถานะปัจจุบันเป็น **preview / noindex** ตั้ง `SITE_URL` เป็น URL จริงก่อน build เพื่อสร้าง canonical, reciprocal hreflang th/en/x-default, sitemap, absolute Open Graph URLs และ robots สำหรับ production:

```powershell
$env:SITE_URL = 'https://your-actual-domain.com'
node v4/_build/build.mjs
Remove-Item Env:SITE_URL
```

หากเผยแพร่ใน subdirectory ให้ใส่ path จริง เช่น `https://your-actual-domain.com/v4` และรวม sitemap directive ลง robots.txt ที่ root ของโดเมน อัปโหลดเนื้อหาใน `v4/` ยกเว้น `_build/` ไปยัง URL ที่ตั้งค่าไว้

ข้อมูลบริษัทและใบอนุญาตสืบทอดจากเนื้อหาเดิม ควรยืนยันข้อมูลปัจจุบันก่อนเผยแพร่ ตำแหน่งงานยังเป็นตัวอย่างและไม่สร้าง JobPosting schema ไม่มีเงินเดือน สถิติ หรือรีวิวที่แต่งขึ้น

ฟอร์มสร้างข้อความให้ตรวจทาน จากนั้นผู้ใช้ต้องเลือกเปิดแอปอีเมลและกดส่งเอง ไม่มี backend รับใบสมัครและไม่อัปโหลดข้อมูลแบบฟอร์มเข้าเซิร์ฟเวอร์

## การตรวจสอบ 2026-10-18

- 564 static checks ผ่าน: local links, anchors, HTML lang, h1, description, JSON-LD, image attributes, duplicate IDs
- 87 production SEO checks ผ่านใน `output/seo-v4-preview` โดยใช้ example.com/v4 เพื่อทดสอบเท่านั้น ไม่เปลี่ยนโหมดพรีวิวของเว็บไซต์
- 108 browser checks ผ่านบน Chromium: ครบ 12 หน้า ที่ 320 / 390 / 1440 px รวมตัวกรองงาน การสลับภาษา FAQ เช็กลิสต์ ฟอร์ม เมนู reduced motion และ no-JavaScript
- ตรวจเพิ่ม: หน้าแรกสองภาษาที่ 768 / 1024 px, ค้นหาจากหน้าแรกทั้งสองภาษา, ปุ่มหยุด/เปิด motion
- หลักฐานภาพและสคริปต์อยู่ใน `../output/playwright/v4-*`

ยังไม่ได้เผยแพร่สาธารณะ วัด Lighthouse ทดสอบ Safari/Firefox หรือส่งอีเมลจริง

## ภาพประกอบ

ภาพจาก Unsplash image CDN ดาวน์โหลด 2026-10-18:

- `recruitment.jpg`: `photo-1600880292203-757bb62b4baf` — office collaboration
- `team.jpg`: `photo-1521737711867-e3b97375f902` — teamwork
- `construction.jpg`: `photo-1504307651254-35680f356dfd` — construction work
- `craft.jpg`, `spa.jpg`: คัดลอกภาพประกอบจาก V3 (ดู `../v3/ASSETS.md`)

รูปแบบ URL ต้นทาง: `https://images.unsplash.com/{image-id}?auto=format&fit=crop&w=1500&q=85`

โลโก้และ favicon ใช้ไฟล์บริษัทจากแบบเดิม ภาพแชร์ OG สองภาษาออกแบบและ render ใหม่สำหรับ V4
