/* Your name, your domain, and the two links in the top-right corner.
   The name is drawn letter by letter in the Google colours, so keep it short. */

site.configure({
  name:   "Boping Li",
  domain: "bopingli.dev",          // ← shows in the address bar; change to your real domain

  // ["label", destination] — "#id" opens that project in a tab, anything else is a normal link.
  corner: [
    ["About", "#about"],
    ["Email", "mailto:Boping@utexas.edu"]
  ]
});
