# Personal site

below is a bunch of ai crap, i think the current form is crap, the browser thing isnt as cool as i thought


A personal website shaped like a browser. The home page is a Google-style search
page; the shortcuts open project pages as tabs, and closing a tab closes the page.

No build step, no dependencies, no framework. Open `index.html` in a browser and
it works.

## Files

```
index.html                  the shell, and the list of which projects to load
settings.js                 your name, domain, and corner links
style.css                   all styling
app.js                      the tab engine — you shouldn't need to touch this
projects/
  _template.js              copy this to add something new
  inspire-semiconductor.js
  skystar-energy.js
  enpower-resources.js
  komoricon.js
  connect-four.js
  fpga-timer.js
  garage-controller.js
  about.js
```

## Adding a project

1. Copy `projects/_template.js` to `projects/your-thing.js`.
2. Fill in the fields. The comments explain each one.
3. Add one line to `index.html`, alongside the other project scripts:

   ```html
   <script src="projects/your-thing.js"></script>
   ```

The order of those lines is the order the tiles appear in. To reorder the home
page, move the lines. To hide something without deleting it, comment its line out.

If a project doesn't show up, open the browser console (F12). A missing or
duplicated field is reported there by name.

## Deploying to GitHub Pages

**Name the repository `yourusername.github.io`.** A repo with that exact name is
published at `https://yourusername.github.io/` — the root, with no subfolder in
the path. Any other repo name works too, but it serves from
`https://yourusername.github.io/repo-name/`.

```bash
cd path/to/this/folder
git init
git add .
git commit -m "Personal site"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

Then on GitHub: **Settings → Pages**, set Source to *Deploy from a branch*, pick
branch `main` and folder `/ (root)`, and save. The first build takes a minute or
two. After that, every `git push` republishes.

To update later:

```bash
git add .
git commit -m "Add new project"
git push
```

### Two things that catch people out

**Filenames are case-sensitive on GitHub Pages**, even though macOS and Windows
don't care locally. `Projects/FPGA-Timer.js` and `projects/fpga-timer.js` are
different files there. If a project works locally and 404s once deployed, this is
almost always why.

**Hard-refresh after pushing.** GitHub caches aggressively and your browser caches
on top of that, so an old version can stick around. Ctrl+Shift+R, or Cmd+Shift+R
on a Mac.

### Custom domain

Buy the domain, then point it at GitHub by adding these DNS records at your
registrar:

- Four `A` records for `@` → `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`
- Optionally four `AAAA` records for `@` → `2606:50c0:8000::153`,
  `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` for IPv6
- One `CNAME` record for `www` → `yourusername.github.io`

Then enter the domain under **Settings → Pages → Custom domain** and tick
*Enforce HTTPS* once the certificate is issued. Update `domain` in `settings.js`
to match, since that's what the fake address bar displays.

## Local preview

Double-click `index.html`. That's it — everything loads over `file://` without a
server, which is exactly why the projects are `.js` files rather than `.json`
(browsers block `fetch()` on local files).

### What `.nojekyll` is for

GitHub Pages runs a Jekyll build over your files by default. This site is plain
HTML and doesn't need it, and Jekyll skips files and folders whose names begin
with an underscore — which would quietly drop `projects/_template.js` from the
deployed site. The empty `.nojekyll` file in the root turns the build off and
publishes the files exactly as they are. Don't delete it.
