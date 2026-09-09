# Installed Claude Code Subagents (Agency Agents)

This folder is a saved copy of the 90 free, MIT-licensed subagent persona
files currently installed at `~/.claude/agents/` on this machine (Claude
Code's **user-level** agent directory — available in every project/session,
not just this one). They're kept here too so this specific set travels with
the project and can be restored or reused in any future chat/machine.

Source: [Rexxu Labs Agency Agents](https://github.com/msitarzewski/agency-agents)
(260 agents total across 18 divisions — we installed the 90 most relevant to
building this site).

## What's here (by division)

| Division | Count | Examples |
|---|---|---|
| Engineering | 64 | Frontend Developer, Backend Architect, DevOps Automator, Code Reviewer, Senior Developer |
| Design | 10 | UI Designer, UX Architect, Brand Guardian, Whimsy Injector, Visual Storyteller |
| Testing | 9 | Accessibility Auditor, API Tester, Test Automation Engineer, Performance Benchmarker |
| Project Management | 7 | Senior Project Manager, Project Shepherd, Studio Producer |

Full list: run `ls agents/*.md` or open any file — each has a `name:` field
in its frontmatter, which is the exact string to use when activating it.

## How to use these in a fresh Claude Code session

Activation is plain language, not a slash command — in any **new** Claude
Code session (agents are only discovered at session startup, so installing
mid-session won't make them appear until you start a new one):

```
Activate UI Designer and review this component's spacing.
```

or be explicit if it doesn't pick it up automatically:

```
Use the Backend Architect subagent to design this API.
```

## How to reinstall from scratch (e.g. on a new machine)

```bash
git clone --depth 1 https://github.com/msitarzewski/agency-agents.git
cd agency-agents
./scripts/install.sh --tool claude-code --division engineering,design,testing,project-management
```

Or to restore this exact set without re-cloning anything, just copy this
folder's `.md` files into `~/.claude/agents/` on the target machine.

## Note on this session

These 90 agents were **not** directly invoked to build this website — Claude
Code only loads custom agents at session start, and they were installed
mid-session. The actual build used Claude's built-in `Explore`/`Plan`/
`general-purpose` subagent types instead. These files are saved here so
*future* sessions (which will have them available from the start) can
activate them by name for ongoing work on this project.
