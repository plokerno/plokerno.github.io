/* FPGA Timer — shown as the "FPGA Timer" tile. */

site.add({
  id:      "fpga",
  tile:    "FPGA Timer",
  initial: "F",
  color:   "#EA4335",
  path:    "/fpga-timer",

  title:   "FPGA Timer",
  tagline: "A multi-mode timer on a Basys3 board, designed with RTL methodology.",
  meta:    ["Aug. 2025 — Dec. 2025", "RTL design, Verilog, Vivado"],

  body: [
    "I implemented a multi-mode timer on a Xilinx Basys3 FPGA using RTL design methodology, built from a high-level state machine, a custom datapath, and a controller FSM.",
    "The interface is a ten-switch array, button inputs, and four seven-segment displays at 10ms resolution. I took it through Vivado synthesis, implementation, and bitstream generation to verify it worked on the hardware itself rather than only in simulation."
  ],

  groups: [
    ["Built with", ["Verilog", "Xilinx Vivado", "Basys3", "RTL design", "Controller FSM", "Seven-segment displays"]]
  ],

  links: []
});
