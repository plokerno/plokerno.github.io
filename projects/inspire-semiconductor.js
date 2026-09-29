/* Inspire Semiconductor — shown as the "Inspire Semi" tile. */

site.add({
  id:      "inspire",
  tile:    "Inspire Semi",
  initial: "I",
  color:   "#4285F4",
  path:    "/inspire-semiconductor",

  title:   "Inspire Semiconductor",
  tagline: "Embedded software for a RISC-V SoC, written before the silicon existed.",
  meta:    ["Summer 2026", "Embedded Software Engineering Intern", "Austin, TX"],

  body: [
    "I programmed a Linux PCIe endpoint function driver for RISC-V, running it against both a QEMU model and hardware backends so the same driver could be exercised either way.",
    "I also wrote a U-Boot GPIO driver through the Driver Model, with devicetree binding and full Kconfig support, and created a new Yocto machine target for RTL simulation. That target is the piece I would point to first: it let SoC firmware be validated against the simulated design before tape-out, while the design could still change."
  ],

  groups: [
    ["Worked with", ["Linux kernel", "PCIe", "RISC-V", "QEMU", "U-Boot", "Yocto", "Devicetree", "Kconfig"]]
  ],

  links: []
});
