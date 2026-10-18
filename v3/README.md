# TG Oversea Solutions · Version 3 · Beyond Borders

เว็บไซต์ static 6 หน้า × ไทย/อังกฤษ ออกแบบใหม่ด้วย HTML, CSS และ JavaScript แบบไม่มี runtime dependency

## เปิดดู

เปิด `index.html` หรือจากโฟลเดอร์โปรเจกต์หลัก:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

แล้วเปิด http://127.0.0.1:4173/v3/ หรือ `../versions.html` เพื่อเลือกทั้งสามแบบ

## ทิศทางงานออกแบบ

Beyond Borders: ภาพ editorial ขนาดใหญ่ โทนกระดาษอุ่น กรมท่า และส้ม อักษร Anuphan / Manrope / DM Sans พร้อมภาพปลายทาง บัตรเดินทาง และองค์ประกอบเส้นทางบิน

- หน้าแรก: cinematic image reveal, rotating travel stamp, animated flight path, pointer-responsive boarding pass, section reveals, image zoom, reading progress
- Native cross-document View Transitions ในเบราว์เซอร์ที่รองรับ (เบราว์เซอร์อื่นเปลี่ยนหน้าตามปกติ)
- ปุ่มหยุดแอนิเมชันท้ายหน้า + เคารพ `prefers-reduced-motion`
- รองรับมือถือ เมนูคีย์บอร์ด skip link, focus ring, native form validation และเนื้อหาที่อ่านได้แม้ไม่มี JavaScript
- ค้นหางานด้วยข้อความ / สายงาน / ประเทศ, URL filters, empty state และสลับภาษาพร้อมคงตัวกรอง
- เช็กลิสต์เอกสาร, FAQ accordion, ช่องทางคนหางานและนายจ้าง
- ฟอร์มสร้างอีเมลพร้อมข้อความสำรองให้คัดลอก **ไม่ได้ส่งข้อมูลเข้าเซิร์ฟเวอร์** ผู้ใช้ต้องตรวจทานและกดส่งในแอปอีเมลเอง

## แก้ไข

| รายการ | ต้นฉบับ |
|---|---|
| เนื้อหาและส่วนประกอบ 6 หน้า | `_build/pages.mjs` |
| Header / Footer / SEO / การสร้างไฟล์ | `_build/build.mjs` |
| บริษัท โทร อีเมล ประเทศ สายงาน | `_build/site.mjs` |
| ตัวอย่างตำแหน่งงาน | `_build/jobs.mjs` |
| ดีไซน์ / responsive / motion | `assets/css/site.css` |
| ตัวกรอง / ฟอร์ม / เมนู / motion controls | `assets/js/site.js` |
| ภาพ | `assets/img/` และรายการที่ `ASSETS.md` |

เมื่อแก้เนื้อหาให้รันจากโปรเจกต์หลัก:

```powershell
node v3/_build/build.mjs
node v3/_build/validate.mjs
node v3/_build/validate-seo.mjs
```

HTML ที่สร้างแล้วใช้งานได้ทันที ไม่ต้องติดตั้ง npm packages หรือ build บนโฮสติ้ง

## SEO และการเผยแพร่

ไฟล์ปัจจุบันเป็น **พรีวิว `noindex, nofollow`** เพื่อไม่ให้แบบเสนอและงานตัวอย่างเข้าดัชนีก่อนยืนยันโดเมน ไม่มี canonical ชี้ไปโดเมนสมมติ และ sitemap ยังว่าง

ตั้ง `SITE_URL` เป็น URL จริงที่จะอัปโหลดเวอร์ชันนี้ แล้ว build ใหม่ ตัวอย่าง:

```powershell
$env:SITE_URL = 'https://your-actual-domain.com'
node v3/_build/build.mjs
Remove-Item Env:SITE_URL
```

หากใช้งานใต้ subdirectory ให้ใส่ path จริงด้วย เช่น `https://your-actual-domain.com/v3` จากนั้นอัปโหลดเนื้อหาใน `v3/` ไปที่ path นั้น โดยไม่ต้องอัปโหลด `_build/` หากอยู่ใน subdirectory ให้รวมคำสั่ง sitemap/robots ที่สร้างไปใน **robots.txt ที่ root ของโดเมน** ด้วย เพราะ crawler อ่าน robots ที่ root เท่านั้น

เมื่อมีโดเมนจริง builder จะสร้าง: canonical, reciprocal hreflang th/en/x-default, sitemap 12 URLs, absolute OG image URLs, index/follow, EmploymentAgency / WebPage / BreadcrumbList structured data ภาษาไทยและอังกฤษมี HTML และ URL ของตัวเอง ไม่ต้องรัน JavaScript เพื่ออ่านเนื้อหา

ตำแหน่งทั้งหมดเป็น **ตัวอย่าง** จึงไม่สร้าง JobPosting schema, ไม่แต่งเงินเดือน ผลงาน สถิติ หรือรีวิว ยืนยันข้อมูลใบอนุญาตและรายละเอียดบริษัทก่อนเผยแพร่จริง โหมด production ไม่ได้ยืนยันความถูกต้องของข้อมูลแทนผู้ดูแล

ตั้งโฮสต์ให้ใช้ `404.html` และทดสอบสถานะ HTTP 404 จริง โฮสต์ต้องรองรับ `index.html` เป็น directory index เปิด Gzip/Brotli และ asset caching ตามผู้ให้บริการ

## รูปภาพและข้อมูลที่เติมภายหลัง

แทนภาพ concept ด้วยรูปบริษัท ทีมงาน อบรม และแรงงานจริงที่ได้รับอนุญาตให้ใช้ ภาพแชร์ OG สองภาษาทำใหม่ตามดีไซน์ V3 แล้วที่ `assets/img/og-th.jpg` และ `og-en.jpg` ขนาด 1200×630 ต้นฉบับจัดวางอยู่ที่ `_build/social.html` รายชื่อผู้บริหาร รีวิว ผลงาน และข้อมูลตำแหน่งจริงยังไม่ถูกแต่งขึ้น

## แหล่งอ้างอิง

- เนื้อหาบริษัท/สายงาน: V1 และ V2 ใน workspace นี้; V3 มีสำเนา data ของตัวเอง จึงไม่แก้หรือพึ่ง build ของ V2
- [แนวโน้มการออกแบบ 2026 — Webflow](https://webflow.com/blog/web-design-trends-2026)
- [Google: localized pages and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [MDN: View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

ผลตรวจ 2026-10-18: ผ่าน 548 static checks, 87 production SEO checks (ใช้ example.com/v3 เฉพาะโฟลเดอร์ output ไม่แก้สถานะพรีวิว) และ 108 browser checks บน Chromium ครบ 12 หน้า ความกว้าง 320/390/1440 พิกเซล พร้อมตรวจตัวกรอง สลับภาษา FAQ เช็กลิสต์ ฟอร์ม เมนู reduced motion และ JavaScript-disabled mode

หลักฐานเบราว์เซอร์ดู `../output/playwright/` ยังไม่ได้วัด Lighthouse, ทดสอบ Safari/Firefox, ส่งอีเมลจริง หรือเผยแพร่โฮสต์สาธารณะ
