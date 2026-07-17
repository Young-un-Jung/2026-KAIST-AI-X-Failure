# -*- coding: utf-8 -*-
"""Rebuild the PDF copy so it matches the (possibly hand-edited) DOCX copy
exactly, instead of maintaining two separately-hand-maintained sources of
truth. Reads 제안서_수정본_사본.docx paragraph/run-by-run and re-draws it
with the same reportlab pipeline used in build_final_docs.py, including a
title accent rule and superscript footnote markers.
"""
import re
from pathlib import Path

from docx import Document

ROOT = Path(r"C:\Users\mynam\Desktop\인하대학교\KAIST AT X 실패 공모전")
DOCX_PATH = ROOT / "제안서_수정본_사본.docx"
PDF_OUT = ROOT / "제안서_수정본_사본.pdf"

HEADER_TTF = r"C:\Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunBg.TTF"
BODY_TTF = r"C:\Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunNm.ttf"
ACCENT = (0.894, 0.341, 0.239)  # E4573D

# ---------------- Extract SECTIONS from the docx ----------------
doc = Document(str(DOCX_PATH))
paras = doc.paragraphs

title_text = paras[0].text
SECTIONS = []
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
        sup = bool(r.font.superscript)
        runs.append((r.text, bool(r.font.bold), bool(r.font.italic), sup))
    if is_heading:
        SECTIONS.append(("h", text))
    elif is_note:
        SECTIONS.append(("note", runs))
    else:
        SECTIONS.append(("p", runs))

print("Extracted", len(SECTIONS), "blocks from docx")

# ---------------- PDF ----------------
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

pdfmetrics.registerFont(TTFont("Header", HEADER_TTF))
pdfmetrics.registerFont(TTFont("Body", BODY_TTF))

W, H = A4
margin = 2.2 * cm
usable_w = W - 2 * margin
c = canvas.Canvas(str(PDF_OUT), pagesize=A4)

y = H - margin
current_font = [None, None]
c.setLineWidth(0.45)


def ensure_space(needed):
    global y
    if y - needed < margin:
        c.showPage()
        y = H - margin
        if current_font[0]:
            c.setFont(*current_font)


def set_font(name, size):
    c.setFont(name, size)
    current_font[0], current_font[1] = name, size


def draw_run_line(segments, size):
    global y
    x = margin
    for text, bold, italic, sup in segments:
        draw_size = size * 0.62 if sup else size
        baseline_y = y + size * 0.32 if sup else y
        w = pdfmetrics.stringWidth(text, "Body", draw_size)
        if italic:
            c.saveState()
            c.translate(x, baseline_y)
            c.transform(1, 0, 0.25, 1, 0, 0)
            to = c.beginText(0, 0)
        else:
            to = c.beginText(x, baseline_y)
        to.setFont("Body", draw_size)
        if bold:
            to.setStrokeColorRGB(0, 0, 0)
            to.setTextRenderMode(2)
        else:
            to.setTextRenderMode(0)
        to.textOut(text)
        c.drawText(to)
        if italic:
            c.restoreState()
        x += w
    y -= size * 1.42


_TOKEN_RE = re.compile(r"[A-Za-z0-9]+|.", re.DOTALL)


def wrap_runs(runs, size, max_w):
    tokens = []
    for text, bold, italic, sup in runs:
        eff_size = size * 0.62 if sup else size
        for tok in _TOKEN_RE.findall(text):
            tokens.append((tok, bold, italic, sup, eff_size))
    lines = []
    line = []
    line_w = 0.0
    for tok, bold, italic, sup, eff_size in tokens:
        w = pdfmetrics.stringWidth(tok, "Body", eff_size)
        if line_w + w > max_w and line:
            lines.append(line)
            line = []
            line_w = 0.0
        line.append((tok, bold, italic, sup))
        line_w += w
    if line:
        lines.append(line)
    out_lines = []
    for line in lines:
        segs = []
        for ch, bold, italic, sup in line:
            if segs and segs[-1][1] == bold and segs[-1][2] == italic and segs[-1][3] == sup:
                segs[-1] = (segs[-1][0] + ch, bold, italic, sup)
            else:
                segs.append((ch, bold, italic, sup))
        out_lines.append(segs)
    return out_lines


def draw_paragraph(runs, size=10.5, gap_before=4):
    global y
    ensure_space(gap_before + size * 1.42)
    y -= gap_before
    for line_segs in wrap_runs(runs, size, usable_w):
        ensure_space(size * 1.42)
        draw_run_line(line_segs, size)


def draw_header(text, size=13, gap_before=10):
    global y
    ensure_space(gap_before + size * 1.42)
    y -= gap_before
    set_font("Header", size)
    c.drawString(margin, y, text)
    y -= size * 1.5


# Title + accent rule
set_font("Header", 18)
tw = c.stringWidth(title_text, "Header", 18)
ensure_space(30)
c.drawString((W - tw) / 2, y, title_text)
y -= 14
c.saveState()
c.setStrokeColorRGB(*ACCENT)
c.setLineWidth(1.6)
c.line((W - tw) / 2 - 4, y, (W + tw) / 2 + 4, y)
c.restoreState()
y -= 20

for kind, content in SECTIONS:
    if kind == "h":
        draw_header(content)
    elif kind == "note":
        draw_paragraph(content, size=8, gap_before=10)
    else:
        draw_paragraph(content)

c.showPage()
c.save()
print("Wrote", PDF_OUT)
