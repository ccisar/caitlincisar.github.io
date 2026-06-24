# Caitlin Cisar's Personal Website

The personal website and portfolio of Caitlin Cisar, a language data scientist
working at the intersection of NLP, ML, and LLMs.

## Pages

| Page             | What's there                                                        |
| ---------------- | ------------------------------------------------------------------- |
| `index.html`     | Bio, skillset, and career/education timeline                        |
| `research.html`  | Interactive terminal listing research & projects                    |
| `artwork.html`   | Film-photography gallery (contact sheet + single-frame viewer)      |

`shell.js` is the shared shell: it injects the nav, footer, Contact modal, and
the Purrsona name-generator into every page.

## Local Preview

Serve the folder over HTTP:

```bash
python3 -m http.server 8123
# then open http://localhost:8123
```

## Project Structure

```
.
├── index.html / research.html / artwork.html    # pages
├── shell.js                                     # shared nav, footer, modals
├── style.css                                    # all styles
├── images/                                      # photos, grouped by roll/set
└── tools/
    ├── rename-images.sh                         # normalize scan filenames
    └── optimize-images.sh                       # optimize images for the web
```

## License

Source code is available for reference. **Photographs are © Caitlin Cisar and
are not licensed for reuse.**
