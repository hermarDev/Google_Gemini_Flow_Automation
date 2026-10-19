---
type: dashboard
created: 2026-10-19
---
# Sprint board

Use ticket `status` properties to move through `backlog → ready → in-progress → review → qa → done`. `blocked` and `cancelled` are explicit alternate states. Obsidian's Properties UI can edit statuses; no dragging or moving files required.

## In progress

```dataview
TABLE WITHOUT ID file.link AS Ticket, sprint, priority, assignee
FROM "Projects/AI-Media-Automator/04-Tickets"
WHERE status = "in-progress"
SORT sprint ASC, priority ASC
```

## Ready

```dataview
TABLE WITHOUT ID file.link AS Ticket, sprint, priority, depends_on
FROM "Projects/AI-Media-Automator/04-Tickets"
WHERE status = "ready"
SORT sprint ASC, priority ASC
```

## Needs review or QA

```dataview
TABLE WITHOUT ID file.link AS Ticket, sprint, status, assignee
FROM "Projects/AI-Media-Automator/04-Tickets"
WHERE contains(list("review", "qa"), status)
SORT sprint ASC, id ASC
```

## Blocked

```dataview
TABLE WITHOUT ID file.link AS Ticket, sprint, depends_on
FROM "Projects/AI-Media-Automator/04-Tickets"
WHERE status = "blocked"
SORT sprint ASC
```

## Recently done

```dataview
TABLE WITHOUT ID file.link AS Ticket, sprint, updated
FROM "Projects/AI-Media-Automator/04-Tickets"
WHERE status = "done"
SORT updated DESC
LIMIT 30
```

> [!note] Optional plugin
> These are **Dataview** blocks. Without Dataview, all ticket notes remain fully usable through [[Backlog-Index]] and the sprint plans. Queries depend on the project being located at the declared vault-relative path.
