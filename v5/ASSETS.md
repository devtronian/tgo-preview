# รูปภาพประกอบ (ภาพแนวคิด)

ภาพทั้งหมดมาจาก Unsplash (ใช้ได้ฟรีตาม Unsplash License) ใช้เพื่อแสดงดีไซน์เท่านั้น
**ไม่ใช่ภาพพนักงาน ลูกค้า หรือผลงานจริงของบริษัท** — ควรแทนด้วยภาพจริงของบริษัทก่อนเผยแพร่

ไฟล์ต้นฉบับอยู่ใน `_build/photos-src/` และถูกแปลงเป็น WebP ขนาด 640/1280 ใน `assets/img/`
แหล่งที่มา: `https://images.unsplash.com/<รหัสภาพ>`

| ไฟล์ | รหัสภาพ Unsplash |
|---|---|
| `wing` | photo-1436491865332-7a61a109cc05 |
| `plane-gate` | photo-1542296332-2e4473faf563 |
| `riyadh` | photo-1586724237569-f3d0c1dee8c6 |
| `europe` | photo-1541343672885-9be56236302a |
| `singapore` | photo-1525625293386-3f8f99389edd |
| `mosque` | photo-1578895101408-1a36b834405b |
| `abu-dhabi` | photo-1590075865003-e48277faa558 |
| `bangkok` | photo-1508009603885-50cf7c579365 |
| `thai-temple` | photo-1563492065599-3520f775eeed |
| `massage` | photo-1544161515-4ab6ce6db874 |
| `chef` | photo-1600565193348-f74bd3c7ccdf |
| `field` | photo-1500382017468-9049fed747ef |
| `seedlings` | photo-1530836369250-ef72a3f5cda8 |
| `factory` | photo-1581091226825-a6a2a5aee158 |
| `warehouse` | photo-1586528116311-ad8dd3c8310d |
| `interview` | photo-1551836022-d5d88e9218df |

ภาพที่นำมาจากแบบที่ 3/4 (ดูรหัสใน `../v3/ASSETS.md`): `dubai`, `sydney`, `new-zealand`, `spa`, `craft`, `construction`, `team`, `recruitment`

## เปลี่ยนรูป
1. วางไฟล์ JPG ใหม่ใน `_build/photos-src/` (ชื่อเดิม หรือชื่อใหม่)
2. รันสคริปต์แปลงรูปใน README (หัวข้อ "เปลี่ยนรูป")
3. ถ้าใช้ชื่อใหม่ แก้ชื่อรูปใน `_build/content.mjs` / `_build/pages.mjs` แล้ว `node _build/build.mjs`
