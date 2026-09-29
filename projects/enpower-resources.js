/* EnPower Resources — shown as the "EnPower" tile. */

site.add({
  id:      "enpower",
  tile:    "EnPower",
  initial: "E",
  color:   "#FBBC05",
  path:    "/enpower-resources",

  title:   "EnPower Resources",
  tagline: "Cellular pressure monitors for remote oil wells, built from the microcontroller up.",
  meta:    ["Summer 2021 — 2023", "Student Intern and Researcher", "Sugar Land, TX"],

  body: [
    "Across three summers I fabricated remote Oil-well Pressure Monitors, designing custom PCBs around a microcontroller to sit at the wellhead and report back.",
    "The monitors use the Particle Argon's built-in cellular system to reach the IoT network with no local infrastructure at all. We installed them onto existing MCUs at oil sites, so wells that had to be checked in person could instead be watched remotely for gas leaks."
  ],

  groups: [
    ["Worked with", ["Particle Argon", "Custom PCB design", "Cellular IoT", "Microcontrollers", "Sensor fabrication"]]
  ],

  links: []
});
