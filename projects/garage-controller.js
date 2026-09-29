/* Garage Controller — shown as the "Garage" tile. */

site.add({
  id:      "garage",
  tile:    "Garage",
  initial: "G",
  color:   "#FBBC05",
  path:    "/garage-controller",

  title:   "Garage Controller",
  tagline: "A wireless controller for the garage door, lights, and temperature, on a board I designed.",
  meta:    ["Summer 2025", "C++, Particle.io, PCB design"],

  body: [
    "I built a controller that opens the garage, switches the lights on and off, and reads temperature remotely, with C++ on the microcontroller talking to a mobile app through Particle functions.",
    "I scripted Particle.io functions to retrieve and process the analog temperature data, then soldered the diodes, resistors, microcontrollers, and two relays onto custom-designed PCBs."
  ],

  groups: [
    ["Built with", ["C++", "Particle.io", "Custom PCB", "Relays", "Analog sensors", "Soldering"]]
  ],

  links: []
});
