#!/usr/bin/env python3
"""Check ticket YAML cross-references, IDs, sprint memberships and Markdown links.
Only reads from this local planning workspace. Run: python tools/validate_backlog.py
"""
from pathlib import Path
import re,sys
ROOT=Path(__file__).resolve().parent.parent
files=list((ROOT/'04-Tickets').rglob('*.md'))
problems=[]; ids={}
for file in files:
    txt=file.read_text(encoding='utf-8')
    if not txt.startswith('---\n'): problems.append(f'{file}: missing YAML frontmatter'); continue
    fm=txt.split('---',2)[1]
    match=re.search(r'^id: (\S+)$',fm,re.M)
    if not match: problems.append(f'{file}: missing ID'); continue
    ident=match.group(1)
    if ident in ids: problems.append(f'duplicate ticket ID {ident}')
    ids[ident]=file
    for field in ('type','status','priority','sprint','epic','assignee','depends_on','created','updated'):
        if not re.search(r'^'+field+r':',fm,re.M): problems.append(f'{ident}: missing {field}')
    for phrase in ('## Acceptance criteria','## Work log','## Closure'):
        if phrase not in txt: problems.append(f'{ident}: missing {phrase}')
for ident,file in ids.items():
    fm=file.read_text(encoding='utf-8').split('---',2)[1]
    deps=re.search(r'^depends_on: \[(.*)\]$',fm,re.M)
    if not deps: problems.append(f'{ident}: malformed dependencies'); continue
    for dep in re.findall(r'"([A-Z]+-\d{3})"', deps.group(1)):
        if dep not in ids: problems.append(f'{ident}: missing dependency {dep}')
    sm=re.search(r'^sprint: "(Sprint-\d{2})"$',fm,re.M)
    if sm and not (ROOT/'03-Sprints'/sm.group(1)/f'{sm.group(1)}.md').exists():
        problems.append(f'{ident}: sprint note absent')
index=(ROOT/'00-Dashboard/Backlog-Index.md').read_text(encoding='utf-8')
for ident in ids:
    if not re.search(r'\b'+re.escape(ident)+r'\b',index): problems.append(f'{ident}: absent from index')
print(f'Files: {len(files)}; unique ticket IDs: {len(ids)}; problems: {len(problems)}')
for err in problems: print('ERROR',err)
sys.exit(1 if problems else 0)
