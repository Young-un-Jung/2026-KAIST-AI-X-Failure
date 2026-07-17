# -*- coding: utf-8 -*-
"""Build two elevated PDF variants (A = restrained, B = editorial) from the
same DOCX source, so the user can compare and pick. Both stay driven by the
docx text -- editing the docx and re-running this script keeps the PDF in
sync, per the "does styling lock the content?" question.

Pull-quote convention: a run that is BOTH bold and italic in the docx is
treated as the single pull-quote candidate. Inline it renders identically
to a plain bold run (no visual double-styling); in Level B it is also
pulled out into a magazine-style quote block.
"""
import re
import sys
from pathlib import Path

from docx import Document

ROOT = Path(r"C:\Users\mynam\Desktop\인하대학교\KAIST AT X 실패 공모전")
DOCX_PATH = ROOT / "제안서_수정본_사본_v2.docx"

HEADER_TTF = r"C:\Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunBg.TTF"
BODY_TTF = r"C:\Users\mynam\AppData\Local\Microsoft\Windows\Fonts\ChosunNm.ttf"
ACCENT = (0.894, 0.341, 0.239)  # E4573D red
AMBER = (0.961, 0.776, 0.235)  # F5C63C
GREEN = (0.247, 0.651, 0.361)  # 3FA65C
BADGE_COLORS = [ACCENT, AMBER, GREEN]
CASE_ID = "사건 #2036-0412"

# ---------------- Extract SECTIONS from the docx ----------------
doc = Document(str(DOCX_PATH))
paras = doc.paragraphs

title_text = paras[0].text
SECTIONS = []
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
        sup = bool(r.font.superscript)
        bold = bool(r.font.bold)
        italic = bool(r.font.italic)
        if bold and italic and pull_quote_text is None:
            pull_quote_text = r.text.strip()
            italic = False  # inline: render as plain bold, no double-styling
        runs.append((r.text, bold, italic, sup))
    if is_heading:
        SECTIONS.append(("h", text))
    elif is_note:
        SECTIONS.append(("note", runs))
    else:
        SECTIONS.append(("p", runs))
        if pull_quote_text and not any(s[0] == "pullquote" for s in SECTIONS):
            pass  # inserted below once, right after this paragraph

# Insert the pull-quote block right after the paragraph that contains it
# (Level B only -- built conditionally per level below).
pull_quote_inserted_after = None
if pull_quote_text:
    for i, (kind, content) in enumerate(SECTIONS):
        if kind == "p" and any(pull_quote_text in r[0] for r in content):
            pull_quote_inserted_after = i
            break

print("Extracted", len(SECTIONS), "blocks. Pull-quote:", pull_quote_text)

# ---------------- Shared PDF drawing machinery ----------------
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


def build(level, out_path):
    y_box = [H - margin]
    current_font = [None, None]
    page_num = [1]
    c = canvas.Canvas(str(out_path), pagesize=A4)
    c.setLineWidth(0.45)

    def draw_footer():
        c.saveState()
        c.setFont("Body", 8)
        c.setFillColorRGB(0.4, 0.4, 0.45)
        c.drawString(margin, margin - 22, CASE_ID)
        pg = "%d / 2" % page_num[0]
        pw = pdfmetrics.stringWidth(pg, "Body", 8)
        c.drawString(W - margin - pw, margin - 22, pg)
        c.restoreState()

    def ensure_space(needed):
        if y_box[0] - needed < margin:
            draw_footer()
            c.showPage()
            page_num[0] += 1
            y_box[0] = H - margin
            if current_font[0]:
                c.setFont(*current_font)

    def set_font(name, size):
        c.setFont(name, size)
        current_font[0], current_font[1] = name, size

    def draw_run_line(segments, size):
        x = margin
        for text, bold, italic, sup in segments:
            draw_size = size * 0.62 if sup else size
            baseline_y = y_box[0] + size * 0.32 if sup else y_box[0]
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
        y_box[0] -= size * 1.42

    _TOKEN_RE = re.compile(r"[A-Za-z0-9]+|.", re.DOTALL)

    def wrap_runs(runs, size, max_w):
        tokens = []
        for text, bold, italic, sup in runs:
            eff_size = size * 0.62 if sup else size
            for tok in _TOKEN_RE.findall(text):
                tokens.append((tok, bold, italic, sup, eff_size))
        lines, line, line_w = [], [], 0.0
        for tok, bold, italic, sup, eff_size in tokens:
            w = pdfmetrics.stringWidth(tok, "Body", eff_size)
            if line_w + w > max_w and line:
                lines.append(line)
                line, line_w = [], 0.0
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
        ensure_space(gap_before + size * 1.42)
        y_box[0] -= gap_before
        for line_segs in wrap_runs(runs, size, usable_w):
            ensure_space(size * 1.42)
            draw_run_line(line_segs, size)

    def draw_header(text, size=13, gap_before=10):
        ensure_space(gap_before + size * 1.6 + 6)
        y_box[0] -= gap_before
        num_match = re.match(r"^(\d+)\.\s*(.*)", text)
        num, label = num_match.group(1), num_match.group(2)
        color = BADGE_COLORS[(int(num) - 1) % 3]
        r = 8
        cx = margin + r
        cy = y_box[0] - size * 0.36
        c.saveState()
        c.setFillColorRGB(*color)
        c.circle(cx, cy, r, stroke=0, fill=1)
        c.setFillColorRGB(1, 1, 1)
        c.setFont("Header", 9)
        nw = c.stringWidth(num, "Header", 9)
        c.drawString(cx - nw / 2, cy - 3, num)
        c.restoreState()
        set_font("Header", size)
        c.setFillColorRGB(0, 0, 0)
        c.drawString(margin + 2 * r + 8, y_box[0], label)
        y_box[0] -= size * 1.6

    def draw_pull_quote(text, size=15):
        ensure_space(size * 3.4)
        y_box[0] -= 10
        c.saveState()
        c.setStrokeColorRGB(*ACCENT)
        c.setLineWidth(1)
        c.line(margin + 40, y_box[0] + 6, W - margin - 40, y_box[0] + 6)
        c.restoreState()
        y_box[0] -= size * 0.9
        for line_segs in wrap_runs([(text, False, True, False)], size, usable_w - 80):
            ensure_space(size * 1.5)
            x = margin + 40
            c.saveState()
            c.setFillColorRGB(*ACCENT)
            for seg_text, bold, italic, sup in line_segs:
                w = pdfmetrics.stringWidth(seg_text, "Body", size)
                c.translate(x, y_box[0])
                c.transform(1, 0, 0.22, 1, 0, 0)
                to = c.beginText(0, 0)
                to.setFont("Body", size)
                to.setFillColorRGB(*ACCENT)
                to.textOut(seg_text)
                c.drawText(to)
                c.translate(-x, -y_box[0])
                x += w
            c.restoreState()
            y_box[0] -= size * 1.5
        y_box[0] -= size * 0.5
        c.saveState()
        c.setStrokeColorRGB(*ACCENT)
        c.setLineWidth(1)
        c.line(margin + 40, y_box[0] + 6, W - margin - 40, y_box[0] + 6)
        c.restoreState()
        y_box[0] -= 14

    # Title
    if level == "B":
        set_font("Header", 15)
        c.setFillColorRGB(0.15, 0.15, 0.18)
    else:
        set_font("Header", 18)
        c.setFillColorRGB(0, 0, 0)
    tw = c.stringWidth(title_text, "Header", 15 if level == "B" else 18)
    ensure_space(30)
    c.drawString((W - tw) / 2, y_box[0], title_text)
    y_box[0] -= 14
    c.saveState()
    c.setStrokeColorRGB(*ACCENT)
    c.setLineWidth(1.6 if level == "A" else 1)
    c.line((W - tw) / 2 - 4, y_box[0], (W + tw) / 2 + 4, y_box[0])
    c.restoreState()
    y_box[0] -= (20 if level == "A" else 30)

    for i, (kind, content) in enumerate(SECTIONS):
        if kind == "h":
            draw_header(content)
        elif kind == "note":
            draw_paragraph(content, size=8, gap_before=10)
        else:
            draw_paragraph(content)
            if level == "B" and i == pull_quote_inserted_after:
                draw_pull_quote(pull_quote_text)

    draw_footer()
    c.showPage()
    c.save()
    print("Wrote", out_path, "(%d pages)" % page_num[0])


build("A", ROOT / "제안서_수정본_사본_A절충형.pdf")
build("B", ROOT / "제안서_수정본_사본_B에디토리얼형.pdf")
