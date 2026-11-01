"""Company profile flipbook: page images and PDFs.

Run inside /v6 (needs Python + Pillow):  python _build/profile-pages.py
Then rebuild the HTML:                    node _build/build.mjs

Source: the company's own files in ../docs/รูปภาพบริษัท (not in Git; PSDs are ~900 MB).
- The book's pages and order are the exported PNGs in "โปรไฟล์รูปภาพ TG(TH)" / "(ENG)".
- Where the matching PSD's composite has the same content (checked block by block),
  the page is rendered from the PSD (2480 x 3508) so text stays sharp when zoomed.
- The cover and the English "T.G. Labor experience" page have no matching PSD
  (the PSD holds an older design / older logo), so they come from the 595 px PNG.

Output in assets/profile/:  {lang}-{nn}-{240|640|1280|2000}.webp  and  tg-company-profile-{lang}.pdf
plus _build/profile-meta.json (largest width and average colour per page).
"""
import json
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
V6 = os.path.dirname(HERE)
SRC = os.path.join(V6, "..", "docs", "รูปภาพบริษัท")
OUT = os.path.join(V6, "assets", "profile")
PNG_DIR = {"th": "โปรไฟล์รูปภาพ TG(TH)", "en": "โปรไฟล์รูปภาพ TG(ENG)"}
PSD_DIR = {"th": "PS TH", "en": "PS ENG"}

# (id, Thai PNG, Thai PSD, English PNG, English PSD) — None means "use the PNG"
PAGES = [
    ("cover", None, None, "TG_Company_Profile_Cover", None),
    ("about", "1-about us", "1-about us", "1-about us(ENG)", "1-about us(ENG)"),
    ("vision", "2-vision and mission", "2-vision and mission", "2-vision and mission(ENG)", "2-vision and mission(ENG)"),
    ("team", "2.9-Our Leadership", "2.9-Our Leadership", "2.9-Our Leadership(ENG)", "2.9-Our Leadership(ENG)"),
    ("leaders", "3-Our Leadership", "3-Our Leadership", "3-Our Leadership(ENG)", "3-Our Leadership(ENG)"),
    ("abroad1", "3.1-expertiseandworks", "3.1-expertiseandworks", "3.1-expertiseandworks(ENG)", "3.1-expertiseandworks(ENG)"),
    ("abroad2", "3.2-expertiseandworks", "3.2-expertiseandworks", "3.2-expertiseandworks(ENG)", "3.2-expertiseandworks(ENG)"),
    ("background", "4-Ourbackground", "4-Ourbackground", "4-Ourbackground(ENG)", "4-Ourbackground(ENG)"),
    ("services", "5-OurServices", "5-OurServices", "5-OurServices(ENG)", "5-OurServices(ENG)"),
    ("sectors", "6-JOB CATEGORIES", "6-JOB CATEGORIES", "6-JOB CATEGORIES(ENG)", "6-JOB CATEGORIES(ENG)"),
    ("process", "7 RecruitmentProcess", "7 RecruitmentProcess", "7-RecruitmentProcess(ENG)", "7 RecruitmentProcess(ENG)"),
    ("strengths", "8-OurStrengths", "8-OurStrengths", "8-OurStrengths(ENG)", "8-OurStrengths(ENG)"),
    ("tglabor", "9-TGLaborEXP", "9-TGLaborEXP", "9-TGLaborEXP(ENG)", None),
    ("commitment", "10-COMMITMENT TO WORKER", "11-COMMITMENT TO WORKER", "10-COMMITMENT TO WORKER(ENG)", "11-COMMITMENT TO WORKER(ENG)"),
    ("licence", "11-license", "license", "11-licenseENG", "license(ENG)"),
]
W, H = 2480, 3508                  # A4 at 300 dpi, the PSD canvas
SIZES = (2000, 1280, 640)          # zoom view, book on retina, book on 1x / phones
THUMB = 240
QUALITY = 84                       # pages are mostly small text: higher than the photos' 72


def flat(im):
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


def load(lang, png, psd):
    if psd:
        return flat(Image.open(os.path.join(SRC, PSD_DIR[lang], psd + ".psd"))), True
    im = flat(Image.open(os.path.join(SRC, PNG_DIR[lang], png + " conv 0.png")))
    if lang == "th":  # Thai PNG exports carry a 1 px frame
        im = im.crop((1, 1, im.width - 1, im.height - 1))
    return im, False


def fit(im, w):
    return im.resize((w, round(w * H / W)), Image.LANCZOS)


def main():
    os.makedirs(OUT, exist_ok=True)
    meta = {}
    for lang in ("th", "en"):
        pdf_pages = []
        meta[lang] = []
        for n, (pid, th_png, th_psd, en_png, en_psd) in enumerate(PAGES, 1):
            png, psd = (th_png, th_psd) if lang == "th" else (en_png, en_psd)
            if pid == "cover":  # one cover design for both languages
                im, sharp = load("en", en_png, None)
            else:
                im, sharp = load(lang, png, psd)
            widths = SIZES if sharp else (640,)
            for w in widths:
                fit(im, w).save(os.path.join(OUT, f"{lang}-{n:02d}-{w}.webp"), quality=QUALITY, method=6)
            fit(im, THUMB).save(os.path.join(OUT, f"{lang}-{n:02d}-{THUMB}.webp"), quality=78, method=6)
            avg = im.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
            meta[lang].append({"id": pid, "w": max(widths), "c": "#%02x%02x%02x" % avg[:3]})
            pdf_pages.append(fit(im, 1280))
            print(lang, f"{n:02d}", pid, "PSD" if sharp else "PNG", max(widths))
        pdf = os.path.join(OUT, f"tg-company-profile-{lang}.pdf")
        pdf_pages[0].save(pdf, save_all=True, append_images=pdf_pages[1:], resolution=1280 / 8.2677,
                          quality=80, title="TG Overseas Solutions Recruitment - Company Profile",
                          author="TG Oversea Solutions Recruitment Co., Ltd.")
        print("  wrote", os.path.relpath(pdf, V6), f"({os.path.getsize(pdf) / 1048576:.1f} MB)")
    with open(os.path.join(HERE, "profile-meta.json"), "w") as f:
        json.dump(meta, f)


if __name__ == "__main__":
    main()
