# -*- coding: utf-8 -*-
"""Build the PDF via HTML + headless Chrome print-to-pdf instead of manual
reportlab pixel math -- CSS handles line-height/spacing/borders reliably,
which reportlab's hand-computed y-offsets kept getting subtly wrong.
Driven by the same docx source as before, same pull-quote convention
(bold+italic run == pull-quote candidate).
"""
import re
import subprocess
from pathlib import Path

from docx import Document

ROOT = Path(r"C:\Users\mynam\Desktop\인하대학교\KAIST AT X 실패 공모전")
DOCX_PATH = ROOT / "제안서_수정본_사본_v2.docx"
CHROME = ROOT / "video" / "node_modules" / ".remotion" / "chrome-headless-shell" / "win64" / "chrome-headless-shell-win64" / "chrome-headless-shell.exe"

HEADER_TTF = ROOT.anchor + r"Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunBg.TTF"
BODY_TTF = ROOT.anchor + r"Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunNm.ttf"
HEADER_TTF = r"C:\Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunBg.TTF"
BODY_TTF = r"C:\Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunNm.ttf"

BADGE_COLORS = ["#E4573D", "#F5C63C", "#3FA65C"]
CASE_ID = "사건 #2036-0412"

doc = Document(str(DOCX_PATH))
paras = doc.paragraphs
title_text = paras[0].text

blocks = []
pull_quote_text = None
for p in paras[1:]:
    text = p.text.strip()
    if not text:
        continue
    is_heading = bool(re.match(r"^\d+\.\s", text))
    is_note = text.startswith("¹") or text.startswith("²")
    runs = []
    for r in p.runs:
        if not r.text:
            continue
        bold = bool(r.font.bold)
        italic = bool(r.font.italic)
        sup = bool(r.font.superscript)
        is_pq = False
        if bold and italic:
            if pull_quote_text is None:
                pull_quote_text = r.text.strip()
            is_pq = True
            italic = False  # inline stays plain bold, no double styling
        runs.append((r.text, bold, italic, sup))
    if is_heading:
        blocks.append(("h", text))
    elif is_note:
        blocks.append(("note", runs))
    else:
        blocks.append(("p", runs, pull_quote_text is not None and any(
            pull_quote_text in r[0] for r in runs
        )))

print("Extracted", len(blocks), "blocks. Pull-quote:", pull_quote_text)


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def render_runs(runs):
    out = []
    for text, bold, italic, sup in runs:
        t = esc(text)
        if sup:
            t = "<sup>%s</sup>" % t
        if bold:
            t = "<b>%s</b>" % t
        if italic:
            t = "<i>%s</i>" % t
        out.append(t)
    return "".join(out)


def build_html(level):
    parts = []
    parts.append("""<!doctype html>
<html lang="ko"><head><meta charset="utf-8">
<style>
@font-face { font-family: 'Header'; src: url('file:///%s'); }
@font-face { font-family: 'Body'; src: url('file:///%s'); }
@page {
  size: A4;
  margin: 22mm;
  @bottom-left { content: "%s"; font-family: 'Body'; font-size: 8pt; color: #666672; }
  @bottom-right { content: counter(page) " / " counter(pages); font-family: 'Body'; font-size: 8pt; color: #666672; }
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Body', serif; font-size: 10.5pt; line-height: 1.44; color: #111; }
h1.title {
  font-family: 'Header', sans-serif;
  font-size: %s;
  text-align: center;
  %s
  border-bottom: %s solid #E4573D;
  padding-bottom: 8pt;
  margin-bottom: %s;
}
h2.section {
  font-family: 'Header', sans-serif;
  font-size: 12.5pt;
  margin: 11pt 0 5pt;
  display: flex;
  align-items: center;
  gap: 8pt;
  page-break-after: avoid;
}
h2.section .badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16pt; height: 16pt;
  border-radius: 50%%;
  color: #fff;
  font-family: 'Header', sans-serif;
  font-size: 8.5pt;
  flex-shrink: 0;
}
p.body { text-align: justify; margin: 0 0 7pt; orphans: 2; widows: 2; }
p.note { font-size: 8pt; color: #333; margin-top: 6pt; }
b { font-weight: 700; }
i { font-style: italic; }
sup { font-size: 0.65em; }
blockquote.pullquote {
  margin: 12pt 30pt;
  padding: 10pt 0;
  border-top: 1pt solid #E4573D;
  border-bottom: 1pt solid #E4573D;
  font-family: 'Body', serif;
  font-style: italic;
  font-size: 13.5pt;
  color: #E4573D;
  text-align: center;
  page-break-inside: avoid;
}
</style></head><body>
""" % (
        HEADER_TTF, BODY_TTF, esc(CASE_ID),
        "14pt" if level == "B" else "17pt",
        "font-style: italic; letter-spacing: 1.5pt; color: #26262b;" if level == "B" else "",
        "0.9pt" if level == "B" else "1.3pt",
        "16pt" if level == "B" else "10pt",
    ))
    parts.append('<h1 class="title">%s</h1>' % esc(title_text))
    for i, block in enumerate(blocks):
        if block[0] == "h":
            text = block[1]
            m = re.match(r"^(\d+)\.\s*(.*)", text)
            num, label = m.group(1), m.group(2)
            color = BADGE_COLORS[(int(num) - 1) % 3]
            parts.append(
                '<h2 class="section"><span class="badge" style="background:%s">%s</span>%s</h2>'
                % (color, num, esc(label))
            )
        elif block[0] == "note":
            parts.append('<p class="note">%s</p>' % render_runs(block[1]))
        else:
            _, runs, has_pq = block
            parts.append('<p class="body">%s</p>' % render_runs(runs))
            if level == "B" and has_pq:
                parts.append('<blockquote class="pullquote">%s</blockquote>' % esc(pull_quote_text))
    parts.append("</body></html>")
    return "".join(parts)


for level, suffix in [("A", "A절충형"), ("B", "B에디토리얼형")]:
    html = build_html(level)
    html_path = ROOT / "_workspace" / ("pdf_render_%s.html" % level)
    html_path.write_text(html, encoding="utf-8")
    pdf_path = ROOT / ("제안서_수정본_사본_%s.pdf" % suffix)
    result = subprocess.run(
        [
            str(CHROME),
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--print-to-pdf=%s" % str(pdf_path),
            "--no-pdf-header-footer",
            "file:///%s" % str(html_path).replace("\\", "/"),
        ],
        capture_output=True,
        text=True,
        timeout=60,
    )
    print(level, "exit code:", result.returncode)
    if result.returncode != 0:
        print(result.stdout[-2000:])
        print(result.stderr[-2000:])
    else:
        print("Wrote", pdf_path)
