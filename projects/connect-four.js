/* Embedded Connect Four — shown as the "Connect 4" tile. */

site.add({
  id:      "connect4",
  tile:    "Connect 4",
  initial: "C4",
  color:   "#4285F4",
  path:    "/connect-four",

  title:   "Embedded Connect Four",
  tagline: "Connect Four with sound and sprites, in C++ and assembly on an MSPM0.",
  meta:    ["Feb. 2025 — May 2025", "C++, Assembly, MSPM0"],

  body: [
    "The game runs on an MSPM0 microcontroller, written in C++ and assembly with an object-oriented design and sound effects. I built the game logic, graphics rendering, and finite state machines, along with the DAC, ADC, and I/O systems underneath them.",
    "The game and its sprites load onto a graphical LCD over UART. Getting that transport right meant time on a digital oscilloscope, verifying UART, DAC, and ADC output to find and correct the data problems."
  ],

  groups: [
    ["Built with", ["C++", "Assembly", "MSPM0", "UART", "DAC and ADC", "Graphical LCD", "Oscilloscope"]]
  ],

  links: []
});
