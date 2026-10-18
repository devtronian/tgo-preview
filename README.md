# TG Oversea Solutions — website designs

โปรเจกต์เว็บไซต์บริษัทจัดหางาน 6 เวอร์ชัน แบบ static HTML/CSS/JavaScript พร้อมรองรับ GitHub Pages

เปิด `index.html` เพื่อเลือกแบบ หรือเปิดหน้าแต่ละเวอร์ชันโดยตรง:

| โฟลเดอร์ | แนวทาง | ภาษาอังกฤษ |
|---|---|---|
| [v1](v1/index.html) | Cinematic Globe | สลับภาษาในหน้าเดียว |
| [v2](v2/index.html) | Licensed Document | [English](v2/en/index.html) |
| [v3](v3/index.html) | Beyond Borders | [English](v3/en/index.html) |
| [v4](v4/index.html) | Recruitment Partners | [English](v4/en/index.html) |
| [v5](v5/index.html) | Window Seat | [English](v5/en/index.html) |
| [v6](v6/index.html) | Clear Path | [English](v6/en/index.html) |

## โครงสร้าง

```text
tgo/
├── index.html              # หน้าเลือกแบบ
├── versions.html           # หน้าเลือกแบบ URL เดิม
├── .nojekyll                # GitHub Pages ให้บริการไฟล์ static โดยตรง
├── .gitignore
├── robots.txt              # พรีวิว: ไม่ให้ crawler เก็บเนื้อหา
├── v1/                     # ย้ายเว็บแบบแรกจาก root มาไว้ที่นี่
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── process.html
│   ├── contact.html
│   └── assets/
├── v2/ … v6/               # แต่ละแบบมี HTML, en/, assets/ และต้นฉบับ _build/
├── scripts/
│   └── prepare-github-pages.mjs
└── output/                 # ผลทดสอบและชุด export ไม่เก็บใน Git
```

V1 ย้ายตำแหน่งอย่างเดียว ตรวจ SHA256 ว่าไฟล์ทั้ง 17 ไฟล์ตรงกับก่อนย้าย คู่มือเดิมอยู่ที่ `v1/README.md` โดยลิงก์ข้ามเวอร์ชันในคู่มือนั้นให้ใช้ตารางใน README นี้แทน

## เปิดในเครื่อง

จากโฟลเดอร์โปรเจกต์:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

เปิด http://127.0.0.1:4173/ เพื่อเลือกแบบ หรือ http://127.0.0.1:4173/v6/ เพื่อเปิดเวอร์ชัน 6

## GitHub Pages

ใช้ repository เดียวเก็บทุกแบบได้ โครงสร้างนี้อัปโหลดทั้งโปรเจกต์แล้วตั้ง Pages เป็น **Deploy from a branch → main → / (root)** ได้ทันที ไม่ต้องติดตั้ง dependency หรือ build บน GitHub

ตัวอย่าง repository ชื่อ `tgo-preview`:

```text
https://YOUR_USERNAME.github.io/tgo-preview/       หน้าเลือกแบบ
https://YOUR_USERNAME.github.io/tgo-preview/v1/   แบบที่ 1
https://YOUR_USERNAME.github.io/tgo-preview/v6/   แบบที่ 6
```

ตั้ง Git ในเครื่องเป็น branch `main` แล้ว เมื่อต้องการอัปโหลด ให้สร้าง repository บน GitHub ก่อน แล้วเชื่อม remote ของคุณ

```powershell
git add .
git commit -m "Organize website design versions"
git remote add origin https://github.com/YOUR_USERNAME/tgo-preview.git
git push -u origin main
```

ขั้นตอนข้างต้นเป็นคำแนะนำ ยังไม่ได้สร้าง remote repository, commit หรือ push อัตโนมัติ

หากต้องการอัปโหลดเฉพาะไฟล์เว็บที่ใช้แสดงผล ให้ใช้ชุด `output/github-pages/` หรือ `output/tgo-github-pages.zip` ที่จัดไว้แล้ว ชุด export ตั้งทุกหน้าเป็น noindex และตัด URL SEO สมมติออก ส่วนโปรเจกต์หลักเก็บต้นฉบับสำหรับแก้ไขต่อไว้ด้วย

## แก้ไขและสร้างไฟล์

- V1: แก้ HTML และ `v1/assets/` โดยตรง
- V2–V6: อ่าน `README.md` ภายในแต่ละแบบเพื่อดูคำสั่ง build และตำแหน่งข้อมูล
- หน้าเลือกแบบแก้ที่ `scripts/build-design-index.mjs` แล้วรัน `node scripts/build-design-index.mjs` เพื่อสร้าง `index.html` และ `versions.html` ให้ตรงกัน ภาพตัวอย่างจากหน้าจอจริงอยู่ที่ `assets/previews/`
- `node scripts/prepare-github-pages.mjs` ใช้สร้าง export ใหม่จากโครงสร้าง v1–v6 สคริปต์จะหยุดหาก output เดิมยังมีไฟล์ เพื่อไม่ทับงานที่อาจแก้ไขเอง

ข้อมูลตำแหน่งงาน รีวิว และรูปบางส่วนเป็นตัวอย่างตามคำอธิบายของแต่ละแบบ การพรีวิวนี้ยังไม่ใช่การยืนยันข้อมูลสำหรับเว็บบริษัทที่เผยแพร่จริง
