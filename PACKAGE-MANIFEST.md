# Package manifest / extraction

This ZIP contains one project folder, under `Projects/AI-Media-Automator/` (relative to the **Big Brain** Obsidian vault). It intentionally does **not** include any code copied from third-party GitHub projects, Chrome extensions, credentials, media, `node_modules`, executable install scripts or live account automations.

Extraction on Fedora **after backing up any existing same-named folder**:

```bash
unzip -l AI-Media-Automator-Obsidian-Agile-Plan.zip
unzip AI-Media-Automator-Obsidian-Agile-Plan.zip -d /home/hrmr/Big-Brain-Obsidian/Big-Brain/
```

Use the downloaded ZIP's actual path in the command (e.g., your Downloads directory). If the target project folder already exists, choose a separate staging folder and merge deliberately; the command must not blindly overwrite existing user notes.

Validation after extraction:

```bash
python /home/hrmr/Big-Brain-Obsidian/Big-Brain/Projects/AI-Media-Automator/tools/validate_backlog.py
```

Then open [[Project-Home]] and [[Sprint-00]]. Implementation source code belongs in a separate repository to be created by a future development ticket.
