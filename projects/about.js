/* About — shown as the "About" tile. */

site.add({
  id:      "about",
  tile:    "About",
  initial: "B",
  color:   "#34A853",
  path:    "/about",

  title:   "About",
  tagline: "Electrical and computer engineering student at UT Austin, working close to the hardware.",
  meta:    ["Austin, TX", "B.S. Electrical and Computer Engineering", "GPA 3.8/4"],

  body: [
    "I started at The University of Texas at Austin in August 2024. My coursework so far covers computer architecture, algorithms, embedded systems, circuit theory, linear systems and signals, software design I and II, random processes, discrete math, and digital logic design.",
    "Most of what I work on sits close to the hardware, whether that's a Linux driver, firmware on a battery site, or a board I designed and soldered myself. Away from that I qualified for the AIME in 2022 and 2023, ran the Houston Half Marathon in 2026, and placed 4,640th of 9,598 in the 2025 GMTK Game Jam."
  ],

  groups: [
    ["Languages", ["Java", "Python", "C++", "C", "JavaScript", "HTML5", "CSS", "Verilog", "Matlab"]],
    ["Tools and platforms", ["Git", "GitHub", "Linux", "Yocto", "Linux drivers", "Vivado", "KiCad", "CAD", "3D printing", "Soldering"]],
    ["Also", ["English", "Chinese (Mandarin)", "CPR certified"]]
  ],

  links: [
    ["Boping@utexas.edu", "mailto:Boping@utexas.edu"],
    ["(346) 219-8849", "tel:+13462198849"]
    // ["GitHub", "https://github.com/yourusername"],
  ]
});
