/* ===== Fiber Academy · curriculum =====
   Built from PWTIT_Blended_Learning_Course_Map.pdf (minutes = SW column; N/A for SW = hidden).
   Program → Week → Day → Module → Lessons                                              */
/* ---------- weeks: theme, description, focus (one line), takeaways ---------- */
const WEEK_INFO = {
  1: { theme: "Getting started", focus: "Settle in and learn to work safely at height.",
       desc: "Join AT&T, meet your cohort and instructor, and spend the week in the pole yard learning to work safely on ladders and poles.",
       take: ["Know how the 9-week program runs and who supports you", "Inspect, set up and climb a ladder safely", "Climb a pole with harness and gaffs and come down safely"] },
  2: { theme: "Safety first", focus: "Build the safety habits every technician relies on.",
       desc: "Learn the safety rules every technician follows — voltage testing, PPE, hazards, driving and first aid — then practise them with your instructor.",
       take: ["Test for voltage before touching any plant", "Spot environmental, asbestos and confined-space hazards", "Drive defensively and give first aid / CPR"] },
  3: { theme: "Out in the field", focus: "See real jobs with your mentor and pass your first checkpoint.",
       desc: "Ride along with your field mentor on real jobs and see how a technician's day runs. Your Safety Competency Check is on Day 4.",
       take: ["See how jobs are briefed, set up and closed", "Apply your safety steps on live work", "Pass the Safety Competency Check"] },
  4: { theme: "Building the connection", focus: "Learn how fiber reaches the home and install it hands-on.",
       desc: "Expert Path Install, part 1: how fiber reaches the home, working at the PFP and serving terminal, and installing at the premises.",
       take: ["Scope, clean and test fiber connections", "Work safely at the PFP and serving terminal", "Install and turn up service at the premises"] },
  5: { theme: "Lights on", focus: "Finish the install process end to end.",
       desc: "Expert Path Install, part 2: close out the job and run the full install process end to end in the lab.",
       take: ["Close out a fiber job correctly", "Follow the Expert Path install process", "Complete a full install in the lab"] },
  6: { theme: "Your own truck", focus: "Get your truck and start leading parts of real installs.",
       desc: "Pick up your vehicle, tools and supplies, then start leading parts of real installs with your mentor. Feedback and ride review on Day 4.",
       take: ["Run the daily truck and tool check", "Lead parts of real installs", "Get your first ride review"] },
  7: { theme: "Fix it right", focus: "Learn repairs, then show it all in the Capstone.",
       desc: "Refresh your ladder skills, learn the Expert Path repair process, then show what you know in the two-day Capstone.",
       take: ["Follow the Expert Path repair process", "Repair a fiber drop with the repair kit", "Pass the Capstone (written + practical)"] },
  8: { theme: "Leading the job", focus: "Lead installs while your mentor coaches.",
       desc: "You lead each install while your mentor watches and coaches. Feedback and ride review on Day 4.",
       take: ["Lead full installs", "Handle the customer conversation yourself", "Build speed and confidence"] },
  9: { theme: "Ready to go", focus: "Work on your own, then graduate.",
       desc: "Run jobs on your own with your mentor nearby. Final ride review on Day 4, then graduation.",
       take: ["Work jobs independently", "Pass your final ride review", "Graduate and certify"] }
};
/* ---------- days: [title, description, takeaways[]] ---------- */
const DAY_INFO = {
  1: [["Welcome & orientation", "Meet your cohort and instructor, set up your tools and start in the pole yard.", ["How the program and portal work", "Who to go to for help", "First look at ladders and poles"]],
      ["Ladders in the pole yard", "Hands-on ladder work with your instructor: choosing, inspecting and setting up.", ["Pick the right ladder for the job", "Set the 4-to-1 angle", "Keep three points of contact"]],
      ["Pole climbing", "Get fitted for harness and gaffs and make your first supervised climbs.", ["Inspect and sound a pole", "Check your gaffs and harness", "Climb and descend under supervision"]],
      ["Working at height", "Position yourself to work hands-free at height and practise pole-top rescue.", ["Work hands-free at height", "Use fall protection correctly", "Basics of pole-top rescue"]],
      ["Climb practical", "Show your instructor you can climb, work and descend safely.", ["Pass the pole-climb practical", "Know what to keep practising"]]],
  2: [["Safety self-study", "Online lessons on voltage detection, electrical safety, tools, health hazards and asbestos.", ["Test for voltage before you touch anything", "Use insulating gloves and blankets correctly", "Recognise and avoid asbestos exposure"]],
      ["Confined spaces + Safety Lab", "Finish your attic and confined-space lessons, then join your instructor for the Safety Fundamentals Lab.", ["Work safely in attics and crawlspaces", "Practise safety steps hands-on in the lab", "Protect your work area on the network"]],
      ["Field safety & emergencies", "Self-study on field expectations, emergencies, outdoor hazards and RF safety.", ["Know what's expected of a field tech", "Respond to emergencies, fire and severe weather", "Stay safe around RF and lead"]],
      ["Defensive driving + conduct", "A full classroom day on defensive driving, plus AT&T conduct, privacy and ethics courses.", ["Drive your company vehicle defensively", "Protect customer data (CPNI) and privacy", "Know the Code of Business Conduct"]],
      ["First aid & hazard communication", "First Aid / CPR / AED in the classroom, then chemical safety and yard safety.", ["Give first aid, CPR and use an AED", "Read chemical labels and safety data", "Work safely in warehouses and yards"]]],
  3: [["Ride with your mentor", "Watch how real jobs are briefed, set up and closed.", ["How a job day flows", "Where safety steps happen on site"]],
      ["Ride with your mentor", "Practise your safety steps on live jobs.", ["Do the voltage test on a real job", "Set up your work area"]],
      ["Ride with your mentor", "Take on small tasks on site with your mentor's guidance.", ["Ladder setup and PPE checks on site", "Talk briefly with a customer"]],
      ["Safety Competency Check", "A 25-question exam on Weeks 1–2, taken in the portal and marked by your instructor.", ["Prove your safety knowledge (80% to pass)"]],
      ["Ride with your mentor", "Back on the road to finish the week.", ["Know what to focus on next week"]]],
  4: [["Fiber fundamentals & the PFP", "Learn how fiber works, scope, clean and test connections, then work at the PFP in the lab.", ["Scope and clean a fiber connector", "Test for loss and read TRUE Fiber results", "Work safely at the PFP"]],
      ["Mechanical connections & serving terminal", "Make mechanical connections in the lab and learn aerial and buried serving terminals.", ["Make clean mechanical connections", "Work at aerial and buried terminals", "Record your time in Infor"]],
      ["Serving terminal lab + premises", "Hands-on at the serving terminal, then learn how to work at the customer's premises.", ["Complete work at the serving terminal", "Enter and work inside a customer's home"]],
      ["Premises lab + test & turn-up", "Install at the premises in the lab, then test, turn up and explain AT&T Internet.", ["Install at the premises", "Test and turn up service, read LSBBT results", "Have a confident customer conversation"]],
      ["Internet & Phone", "Support AT&T Internet and Phone, practise in the lab and handle service orders.", ["Set up and support AT&T Internet and Phone", "Work a service order"]]],
  5: [["Closeout & full install", "Close out a fiber job and run the Expert Path install process end to end in the lab.", ["Close out a fiber job", "Follow the Expert Path install process", "Complete a full install in the lab"]],
      ["Install practice", "Further install practice. Detailed content to be confirmed by the training team.", ["Build speed on full installs"]],
      ["Install practice", "Further install practice. Detailed content to be confirmed by the training team.", ["Build speed on full installs"]],
      ["Install practice", "Further install practice. Detailed content to be confirmed by the training team.", ["Build speed on full installs"]],
      ["Install review", "Week 4–5 review. Detailed content to be confirmed by the training team.", ["Close any gaps before the field"]]],
  6: [["Truck, tools & supplies", "Pick up your vehicle and kit and learn the daily truck check.", ["Run the daily truck check", "Know your tool and supply kit"]],
      ["Ride with your mentor", "Start leading parts of real installs.", ["Lead the job briefing", "Do parts of the install yourself"]],
      ["Ride with your mentor", "Lead more of each job while your mentor watches.", ["Lead more of the install", "Ask for feedback after every job"]],
      ["Feedback + ride review", "Give quick feedback on your training; your instructor scores your rides.", ["Share what's working and what isn't", "Get your first ride score"]],
      ["Ride with your mentor", "Back on the road to finish the week.", ["Restock and prepare for next week"]]],
  7: [["Ladders refresher lab", "A hands-on refresher on ladder work before repair training.", ["Refresh safe ladder setup and climbing"]],
      ["Repair process", "Technician resources, the Expert Path repair process and the fiber drop repair kit.", ["Use technician resources and programs", "Follow the Expert Path repair process", "Use the fiber drop repair kit"]],
      ["Repair lab", "Hands-on Expert Path repair in the lab.", ["Find and fix faults hands-on"]],
      ["Capstone · written", "A written exam in the portal covering install and repair, marked by your instructor.", ["Show what you know about install and repair"]],
      ["Capstone · practical", "Complete and test an install while your instructor scores you.", ["Show you can do the job end to end"]]],
  8: [["Lead installs", "You lead the job; your mentor watches and coaches.", ["Lead a full install"]],
      ["Lead installs", "Keep leading jobs and build speed.", ["Build speed and consistency"]],
      ["Lead installs", "Handle the customer conversation yourself.", ["Own the customer conversation"]],
      ["Feedback + ride review", "Quick feedback from you; your instructor scores your rides.", ["Get your second ride score"]],
      ["Lead installs", "Back on the road to finish the week.", ["Prepare to work on your own"]]],
  9: [["Work on your own", "Run jobs yourself with your mentor nearby.", ["Work independently"]],
      ["Work on your own", "Keep building confidence on real jobs.", ["Keep job notes complete"]],
      ["Work on your own", "Your last full day of solo jobs.", ["Handle the day without help"]],
      ["Final feedback + ride review", "Your last ride review before you certify.", ["Pass your final ride review"]],
      ["Graduation", "A final ride in the morning, then graduation with your cohort.", ["Certify as a fiber technician"]]]
};
/* ---------- lessons by day → module ----------
   [title, code, minutes (SW; null = N/A for SW), type]  type: el self-study · lab instructor-led · act activity  */
const MAP = {
  1: {
    1: [["Orientation", "Your first day at AT&T Fiber.", [["AT&T Orientation", "", 225, "lab"]]],
        ["Ladders and poles", "Pole-yard work with your instructor.", [["Working with Ladders and Poles · Day 1", "", 180, "lab"]]]],
    2: [["Ladders and poles", "Pole-yard work with your instructor.", [["Working with Ladders and Poles · Day 2", "", 405, "lab"]]]],
    3: [["Ladders and poles", "Pole-yard work with your instructor.", [["Working with Ladders and Poles · Day 3", "", 405, "lab"]]]],
    4: [["Ladders and poles", "Pole-yard work with your instructor.", [["Working with Ladders and Poles · Day 4", "", 405, "lab"]]]],
    5: [["Ladders and poles", "Pole-yard work with your instructor.", [["Working with Ladders and Poles · Day 5", "", 405, "lab"]]]]
  },
  2: {
    1: [["Voltage detection", "Test before you touch — AC and DC detectors.", [["AC Foreign Voltage Detector", "70015672", 60, "el"], ["DC FVD Safety and Use", "70018567", 30, "el"]]],
        ["Electrical safety", "Insulating gloves, blankets and electrical hazards.", [["Elec Safety Insulating Glvs and Blnkt", "70015724", 20, "el"], ["Electrical Safety Awareness", "70021691", 30, "el"]]],
        ["Tools & ergonomics", "Use hand and power tools without hurting yourself.", [["Working with Hand and Power Tools", "70035746", 30, "el"], ["Drilling Operations and Ergonomics", "62385714", 15, "el"]]],
        ["Health & environmental hazards", "Heat, noise, respirators, slips and wildlife.", [["Heat Illness Prevention", "70016056", 20, "el"], ["Noise Safety Awareness", "62439481", 15, "el"], ["Respirators: Filtering Facepiece", "62384659", 30, "el"], ["Respirators: Filtering Facepiece CA", "62384660", null, "el"], ["Slips, Trips, and Falls Awareness", "70033942", 30, "el"], ["Plants, Animals and Insect Hazards", "62438003", 30, "el"]]],
        ["Asbestos & EH&S", "Recognise asbestos and follow outside-plant procedures.", [["What Is Asbestos & Why Is It Dangerous?", "70015990", 40, "el"], ["How Asbestos Affects Health", "70015989", 30, "el"], ["Asbestos Work Procedures - Outside Plant", "70017670", 30, "el"], ["Asbestos: Preventing Exposure", "70015988", 30, "el"], ["EH&S Orientation for New Employees-US", "61289390", 15, "el"]]]],
    2: [["Confined spaces & attics", "Work safely in attics, crawlspaces and confined spaces.", [["CA Asbestos Notification", "70013032", null, "el"], ["Confined Space Awareness", "62435189", 20, "el"], ["Attics and Crawlspaces Safety", "70000224", 60, "el"], ["Attic and Crawlspace Safety Activity", "70038069", 25, "act", "buffer"]]],
        ["Safety Fundamentals Lab", "Practise the week's safety steps with your instructor.", [["Safety Fundamentals - Lab", "", 307, "lab"]]],
        ["Workplace practices", "Operating practice, work-area protection and security.", [["Operating Practice No 78 PSAC", "70035962", 45, "el"], ["Work Area Protection - Ntwk Exposures", "70017131", 20, "el"], ["Security Awareness at AT&T", "70038162", 15, "el"]]]],
    3: [["Field tech expectations", "What AT&T expects of a premises technician.", [["FieldTechExpPremWire-MW,SE,SW", "70037000", 60, "el"], ["Field Tech Expectations Prem Wire - West", "70037001", null, "el"]]],
        ["Emergencies & personal safety", "Be ready for emergencies, buildings and street hazards.", [["ATT Emergency Preparedness Training 2026", "70034268", 30, "el"], ["Building Safety", "70015783", 15, "el"], ["Hostile Intruder Training", "61589095", 30, "el"], ["Street Smart Training", "70017065", 60, "el"]]],
        ["Outdoor hazards", "Fire, trees, weather and wildfire.", [["Portable Fire Extinguisher Awareness", "70011173", 30, "el"], ["Tree Trimming Safety", "70015725", 30, "el"], ["Inclement Weather & Natural Disasters", "62437508", 30, "el"], ["Wildfire Awareness", "70008218", 30, "el"]]],
        ["Materials, RF & lead", "Transporting materials and working near RF and lead.", [["Materials of Trade & Other Exceptions", "61272745", 30, "el"], ["RF Safety Awareness", "70009188", 60, "el"], ["AT&T Lead Safety Training", "70022710", 15, "el"]]]],
    4: [["Defensive Driving", "Full classroom day with your instructor.", [["Defensive Driving - Classroom", "", 450, "lab"]]],
        ["Conduct, privacy & ethics", "The rules that protect customers and AT&T.", [["2026 AT&T Code of Business Conduct - NH", "70035223", 18, "el"], ["Protecting CPNI & Sensitive Information", "70036196", 30, "el"], ["Fraud Basics", "70035744", 30, "el"], ["Records & Information Management", "70035805", 20, "el"], ["Privacy@AT&T", "70032488", 30, "el"], ["Ethics in Every Choice for New Hires", "70035808", 30, "el"], ["2026 AT&T's Device Handling Ack", "70035774", 5, "el"], ["EEO and Anti-Harassment Policy", "70038068", 15, "el"], ["Small Spill Cleanup – CA", "70021134", null, "el"], ["Small Spill Cleanup Non-CA", "70021133", 30, "el"]]]],
    5: [["First Aid / CPR / AED", "Classroom certification with your instructor.", [["First Aid/CPR Training CA - Classroom", "61539056", null, "lab"], ["First Aid/CPR/AED Training - Classroom", "61540701", 360, "lab"]]],
        ["Hazard communication & yards", "Chemical safety and working in storerooms and yards.", [["Hazard Communication for Chemical Users", "62428880", 60, "el"], ["Warehouse, Storerooms, Docks, and Yards", "70011176", 30, "el"]]]]
  },
  4: {
    1: [["Fiber fundamentals", "How fiber works and how to keep it clean and tested.", [["Introduction to Fiber", "", 55, "el"], ["Scoping and Cleaning", "", 60, "el"], ["Testing and Loss", "", 60, "el"], ["Interpreting and Uploading TRUE Fiber Results", "", 45, "el"]]],
        ["Customer & the PFP", "First customer contact and working at the PFP.", [["Customer Contact", "", 50, "el"], ["Working at the PFP", "", 45, "el", "PFP assignments"]]],
        ["PFP lab", "Hands-on at the PFP with your instructor.", [["Working at the PFP – Lab", "", 132, "lab"]]]],
    2: [["Mechanical connections lab", "Make mechanical connections hands-on.", [["Mechanical Connections – Lab", "", 203, "lab"]]],
        ["Serving terminal", "Aerial and buried serving terminals.", [["Working at the Serving Terminal: Aerial", "", 40, "el"], ["Working at the Serving Terminal: Buried", "", 60, "el"], ["Atlas Facility Change - APN Strand Change", "", 12, "el"]]],
        ["Field safety", "Optical fiber, battery and waste safety.", [["Optical Fiber Safety Training", "70035722", 15, "el"], ["Battery Safety Awareness", "62426508", 45, "el"], ["Hazardous Waste Disposal Non CA", "70021105", 40, "el"], ["CA Haz Waste Disposal Non-Retail 2026", "70033946", null, "el"], ["Wire, Fiber, and Samson Rope", "70012019", 30, "el"]]],
        ["Timekeeping in Infor", "Record your time and absences.", [["Intro to Infor- Non-Exempt Mgrs/Bargain", "70019610", 10, "el"], ["Infor Pos. Time- Non-Exempt Mgrs/Bargain", "70019611", 15, "el"], ["Infor Timesheet- Non-Exempt Mgrs/Bargain", "70019612", 15, "el"], ["Infor Absences- Non-Exempt Mgrs/Bargain", "70019613", 10, "el"], ["Accessing INFOR via Atlas", "70020386", 1, "el"]]]],
    3: [["Serving terminal lab", "Hands-on at the serving terminal.", [["Working at the Serving Terminal – Lab", "", 397, "lab"]]],
        ["Working at the premises", "Entering and working inside the customer's home.", [["Working at the Premises", "", 45, "el"], ["Working at the Premises: Inside", "", 60, "el"], ["COVID-19 Info for CA Employees", "70007901", null, "el"], ["Valley Fever - California", "62401447", null, "el"]]]],
    4: [["Premises lab", "Hands-on install at the premises.", [["Working at the Premises – Lab", "", 207, "lab"]]],
        ["Test & turn-up", "Test the line and turn up service.", [["Working at the Premises: Test and Turnup", "", 60, "el"], ["Interpreting LSBBT Results", "", 45, "el"]]],
        ["AT&T Internet & the customer", "Explain the service and talk to customers.", [["AT&T Internet", "", 90, "el"], ["SHM: Customer Conversations", "70022675", 30, "el"]]]],
    5: [["Internet & Phone support", "Support AT&T Internet and AT&T Phone.", [["AT&T Internet: Support", "", 60, "el"], ["AT&T Phone", "", 45, "el"]]],
        ["Internet & Phone lab", "Hands-on with your instructor.", [["AT&T Internet and AT&T Phone – Lab", "", 295, "lab"]]],
        ["Service orders", "Work a service order.", [["Service Orders", "", 30, "el"]]]]
  },
  5: {
    1: [["Closeout & install process", "Finish the job properly.", [["Fiber Closeout", "", 45, "el"], ["Expert Path Install Process", "", 60, "el"]]],
        ["Expert Path Install lab", "A full install end to end.", [["Expert Path Install – Lab", "", 345, "lab"]]]],
    2: [["Install practice", "Content to be confirmed by the training team.", [["Install practice (to be confirmed)", "", 450, "lab", "tbc"]]]],
    3: [["Install practice", "Content to be confirmed by the training team.", [["Install practice (to be confirmed)", "", 450, "lab", "tbc"]]]],
    4: [["Install practice", "Content to be confirmed by the training team.", [["Install practice (to be confirmed)", "", 450, "lab", "tbc"]]]],
    5: [["Install review", "Content to be confirmed by the training team.", [["Week 4–5 review (to be confirmed)", "", 450, "lab", "tbc"]]]]
  },
  7: {
    1: [["Ladders refresher lab", "Hands-on refresher.", [["Working with Ladders Refresher – Lab", "", 432, "lab"]]]],
    2: [["Repair process", "Resources, process and the repair kit.", [["Technician Resources and Programs", "", 60, "el"], ["Expert Path Repair Process", "", 90, "el"], ["Fiber Drop Repair Kit", "70022838", 30, "el"]]]],
    3: [["Expert Path Repair lab", "Hands-on repair with your instructor.", [["Expert Path Repair – Lab", "", 545, "lab"]]]]
  }
};
/* ---------- build lessons ---------- */
const MODULE_INFO = {}; // "w-d-b" → {name, desc}
const LESSONS = (() => {
  const out = []; let w2n = 0;
  Object.keys(MAP).forEach(wk => { const w = +wk;
    Object.keys(MAP[w]).forEach(dk => { const d = +dk;
      MAP[w][d].forEach(([name, desc, items], bi) => { const b = bi + 1; MODULE_INFO[`${w}-${d}-${b}`] = { name, desc };
        items.forEach(([title, code, min, type, flag], i) => {
          const id = w === 2 ? "w2-" + String(++w2n).padStart(2, "0") : `w${w}-${d}-${b}-${i}`;
          let status = w < CUR_W ? "d" : w > CUR_W ? "l" : d < CUR_D ? "d" : d === CUR_D ? (type === "lab" ? "l" : "n") : "l";
          if (min === null) status = "na";
          out.push({ id, week: w, day: d, block: b, title, code, min: min || 0, type, status, buffer: flag === "buffer", tbc: flag === "tbc", kc: flag && flag !== "buffer" && flag !== "tbc" ? flag : "", room: type === "lab" ? (w === 1 ? "Pole yard" : w === 2 ? "Lab B" : "Install lab") : "" });
        });
      });
    });
  });
  // demo progress on today (Week 2 · Day 2) and one behind lesson from Day 1
  const set = (id, st) => { const l = out.find(x => x.id === id); if (l && l.status !== "na") l.status = st; };
  set("w2-16", "b"); set("w2-19", "d"); set("w2-20", "p");
  return out;
})();
const MODULE_NAMES = (w, d, b) => (MODULE_INFO[`${w}-${d}-${b}`] || {}).name || "Module " + b;
const MODULE_DESC = (w, d, b) => (MODULE_INFO[`${w}-${d}-${b}`] || {}).desc || "";
/* ---------- courses (one per program block) ---------- */
const COURSES = [
  { id: "c1", week: 1, title: "Orientation & Ladders and Poles", kind: "train", days: [1, 2, 3, 4, 5] },
  { id: "c2", week: 2, title: "Safety Fundamentals", kind: "train", days: [1, 2, 3, 4, 5] },
  { id: "c3", week: 3, title: "Field Mentor Dispatch", kind: "field", days: [1, 2, 3, 5] },
  { id: "c4", week: 4, title: "Expert Path Fiber Installation · Part 1", kind: "train", days: [1, 2, 3, 4, 5] },
  { id: "c5", week: 5, title: "Expert Path Fiber Installation · Part 2", kind: "train", days: [1, 2, 3, 4, 5] },
  { id: "c6", week: 6, title: "Onboarding: Vehicle, Tools & Supplies", kind: "field", days: [1] },
  { id: "c7", week: 6, title: "New Hire Dispatch & Field Mentor Ride", kind: "field", days: [2, 3, 5] },
  { id: "c8", week: 7, title: "Expert Path Fiber Repair", kind: "train", days: [1, 2, 3] },
  { id: "c9", week: 8, title: "New Hire Dispatch & Field Mentor Ride", kind: "field", days: [1, 2, 3, 5] },
  { id: "c10", week: 9, title: "New Hire Dispatch & Field Mentor Ride", kind: "field", days: [1, 2, 3, 5] }
];
/* ---------- course descriptions + takeaways ---------- */
const COURSE_INFO = {
  c1: { desc: "Your first course: AT&T orientation on Day 1, then four days in the pole yard learning to inspect, set up and climb ladders and poles safely.",
        format: "Instructor-led · pole yard", take: ["Understand the program, your team and the portal", "Set up and climb a ladder using the 4-to-1 rule", "Climb a pole with harness and gaffs and pass the climb practical"] },
  c2: { desc: "Online safety courses combined with instructor-led labs: voltage detection, PPE, workplace and environmental hazards, conduct, defensive driving and first aid.",
        format: "Self-study + labs + classroom", take: ["Test for voltage and use insulating gloves and blankets", "Recognise asbestos, confined-space and outdoor hazards", "Drive defensively and give First Aid / CPR / AED"] },
  c3: { desc: "Four days on real jobs with your field mentor, seeing how a technician's day runs from briefing to close-out and applying your safety steps on site.",
        format: "Field · with your mentor", take: ["Follow a real job from briefing to close-out", "Apply safety steps on live work", "Know what to practise before install training"] },
  c4: { desc: "Part 1 of the Expert Path: fiber fundamentals, working at the PFP and serving terminal, installing at the premises, and turning up AT&T Internet and Phone.",
        format: "Self-study + install lab", take: ["Scope, clean and test fiber connections", "Work at the PFP, serving terminal and premises", "Test, turn up and explain the service to the customer"] },
  c5: { desc: "Part 2 of the Expert Path: close out a fiber job and run a complete install end to end in the lab, building speed and confidence.",
        format: "Self-study + install lab", take: ["Close out a fiber job correctly", "Follow the Expert Path install process", "Complete a full install in the lab"] },
  c6: { desc: "Collect your company vehicle, tools and supplies and learn how to keep them road- and job-ready every day.",
        format: "Onboarding · fleet office", take: ["Run the daily truck check", "Know your tool and supply kit", "Order and restock supplies"] },
  c7: { desc: "Back on the road with your mentor — this time you start leading parts of each install while your mentor supports you.",
        format: "Field · with your mentor", take: ["Lead the job briefing", "Do parts of each install yourself", "Ask for and use feedback after every job"] },
  c8: { desc: "A ladder refresher, then the Expert Path repair process and hands-on repair practice in the lab ahead of the Capstone.",
        format: "Self-study + repair lab", take: ["Use technician resources and programs", "Follow the Expert Path repair process", "Repair a fiber drop with the repair kit"] },
  c9: { desc: "You lead full installs while your mentor watches and coaches, including the customer conversation from arrival to handover.",
        format: "Field · with your mentor", take: ["Lead a full install", "Own the customer conversation", "Build speed and consistency"] },
  c10: { desc: "Work jobs on your own with your mentor nearby, keep complete job notes and get ready to certify and graduate.",
        format: "Field · independent", take: ["Work jobs independently", "Keep job notes complete", "Be ready to certify"] }
};
