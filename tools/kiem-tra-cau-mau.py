#!/usr/bin/env python3
"""Kiểm tra câu mẫu trong js/data-hsk1.js.

- Mỗi câu chỉ dùng từ của bài đó và các bài trước (không dùng từ của bài sau, không dùng từ ngoài danh sách).
- Từ nào cũng có ít nhất một câu ví dụ (chữ đơn như 们, 爸 được tính nếu nằm trong một từ ghép của câu).

Chạy: python3 tools/kiem-tra-cau-mau.py   (thoát với mã 1 nếu có lỗi)
"""
import re, sys, pathlib

src = (pathlib.Path(__file__).resolve().parent.parent / 'js' / 'data-hsk1.js').read_text(encoding='utf8')
units = re.findall(r'\["([^"]*)","[^"]*",`(.*?)`,`(.*?)`\]', src, re.S)
first, errors = {}, []
for i, (_, words, _) in enumerate(units, 1):
    for line in words.strip().splitlines():
        first.setdefault(line.split('|')[0].strip(), i)
tokens_all = []
for i, (title, _, sents) in enumerate(units, 1):
    for line in sents.strip().splitlines():
        s = line.split('|')[0]
        toks = re.sub(r'[，。？！、：]', ' ', s).split()
        tokens_all += toks
        for t in toks:
            if t not in first:
                errors.append(f'Bài {i}: "{t}" không có trong danh sách 506 từ — {s}')
            elif first[t] > i:
                errors.append(f'Bài {i}: "{t}" là từ của bài {first[t]} — {s}')
exact = set(tokens_all)
missing = [w for w in first if w not in exact and not (len(w) == 1 and any(w in t for t in exact))]
print(f'{len(units)} bài, {len(first)} từ, {sum(len(u[2].strip().splitlines()) for u in units)} câu mẫu')
for e in errors: print('LỖI', e)
if missing: print('Từ chưa có câu ví dụ:', ' '.join(missing))
if errors or missing: sys.exit(1)
print('OK: mọi câu chỉ dùng từ đã học, mọi từ đều có câu ví dụ.')
