/* ─────────────────────────────────────────────────────────────
   TEMPLATE — copy this file to make a new project or job.

   1. Copy it:        projects/_template.js → projects/my-thing.js
   2. Fill it in below.
   3. Add one line to index.html, next to the other project scripts:
         <script src="projects/my-thing.js"></script>
      The order of those lines is the order of the tiles.

   Files starting with _ are not loaded, so this one is ignored.
   ───────────────────────────────────────────────────────────── */

site.add({

  // ── The tile on the home page and the tab it opens ──
  id:      "my-thing",          // unique, lowercase, no spaces. Used internally.
  tile:    "My Thing",          // label under the circle. Keep it short or it gets cut off.
  initial: "M",                 // 1–2 characters inside the circle and on the tab.
  color:   "#4285F4",           // circle, tab icon, and the stripe on the page.
                                // Google palette: #4285F4 blue  #EA4335 red
                                //                 #FBBC05 yellow #34A853 green
  path:    "/my-thing",         // fake URL shown in the address bar.

  // ── The page itself ──
  title:   "My Thing",          // big heading.
  tagline: "One sentence on what it is. This is also the search-result snippet.",

  // Small grey line under the heading. Dates, role, place, tools — 2 or 3 items.
  meta: ["Summer 2027", "Some Role", "Austin, TX"],

  // The actual writing. One string per paragraph. Two or three is about right.
  body: [
    "What you built and why it needed building. Lead with the problem, not the tech.",
    "The part that was actually hard, and what you did about it. Specifics beat adjectives: a number, a constraint, a thing that broke."
  ],

  // Chip rows at the bottom. ["Heading", ["chip", "chip", ...]] — add as many rows as you want.
  groups: [
    ["Built with", ["C++", "Some Tool", "Another Tool"]]
  ],

  // Optional links at the very bottom. Delete the whole array if there are none.
  links: [
    // ["View on GitHub", "https://github.com/yourusername/my-thing"],
    // ["Read the writeup", "https://example.com/post"]
  ]

});
