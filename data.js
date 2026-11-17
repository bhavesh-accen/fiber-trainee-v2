/* ===== Fiber Academy · prototype data =====
   Program: Reimagined New Hire Training (9 weeks · 45 training days)
   Cohort FF-DAL-2611 · Dallas · Region SW · start Mon, Nov 2 2026
   Hierarchy: Program → Week → Day → Module → Lessons                         */
const REGION = "SW";
const TODAY = new Date(2026, 10, 10); // Tue, Nov 10 2026 (Week 2 · Day 2)
const CUR_W = 2, CUR_D = 2;
const GFG = "https://www.geeksforgeeks.org/"; // simulated external learning system
const FEEDBACK_ENDPOINT = "/api/feedback"; // served by server.js, stored in Postgres (see README)
const HOLIDAYS = {
  "2026-11-26": "Thanksgiving", "2026-11-27": "Day after Thanksgiving",
  "2026-12-24": "Christmas Eve", "2026-12-25": "Christmas Day", "2027-01-01": "New Year's Day"
};
/* ---- 9-week template (Reimagined New Hire Training plan) ----
   segs: [type, label, days]  type: train (classroom/lab) · disp (dispatch) · ride (mentor ride) · chk (checkpoint) */
const WEEKS = [
  { n: 1, title: "Ladder and Pole Aptitude", short: "Ladder & Pole", segs: [["train", "Ladder and Pole Aptitude", 5]] },
  { n: 2, title: "Safety Fundamentals", short: "Safety", segs: [["train", "Safety Fundamentals", 5]] },
  { n: 3, title: "Field Mentor Dispatch", short: "Mentor rides", segs: [["disp", "Field Mentor Dispatch", 3], ["chk", "Safety Competency Check", 1], ["disp", "Field Mentor Dispatch", 1]] },
  { n: 4, title: "Expert Path Fiber Installation · Part 1", short: "Install I", segs: [["train", "Expert Path Fiber Installation", 5]] },
  { n: 5, title: "Expert Path Fiber Installation · Part 2", short: "Install II", segs: [["train", "Expert Path Fiber Installation", 5]] },
  { n: 6, title: "Onboarding · Dispatch & Ride", short: "Dispatch", segs: [["disp", "Onboarding Vehicle, Tools, & Supplies", 1], ["ride", "New Hire Dispatch & Field Mentor Ride", 2], ["chk", "L1 Feedback and RIDE Observation", 1], ["ride", "New Hire Dispatch & Field Mentor Ride", 1]] },
  { n: 7, title: "Expert Path Fiber Repair · Capstone", short: "Repair", segs: [["train", "Expert Path Fiber Repair", 3], ["chk", "Capstone", 2]] },
  { n: 8, title: "Leading Installs", short: "Lead", segs: [["ride", "New Hire Dispatch & Field Mentor Ride", 3], ["chk", "L1 Feedback and RIDE Observation", 1], ["ride", "New Hire Dispatch & Field Mentor Ride", 1]] },
  { n: 9, title: "Working Independently", short: "Solo", segs: [["ride", "New Hire Dispatch & Field Mentor Ride", 3], ["chk", "L1 Feedback and RIDE Observation", 1], ["ride", "New Hire Dispatch & Field Mentor Ride", 1]] }
];
const CKW = { 3: "Safety check", 6: "L1 + RIDE", 7: "Capstone", 8: "L1 + RIDE", 9: "L1 + RIDE" };
/* ---- dated plan: skip weekends + holidays ---- */
function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
const PLAN = (() => {
  const out = []; let c = new Date(2026, 10, 2);
  for (let i = 0; i < 45; i++) {
    while (c.getDay() === 0 || c.getDay() === 6 || HOLIDAYS[iso(c)]) c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1);
    out.push(new Date(c)); c = new Date(c.getFullYear(), c.getMonth(), c.getDate() + 1);
  }
  return out;
})();
function wday(w, d) { return PLAN[(w - 1) * 5 + d - 1]; }
function dayType(w, d) { let k = 1; for (const s of WEEKS[w - 1].segs) { if (d >= k && d < k + s[2]) return { type: s[0], label: s[1] }; k += s[2]; } }
/* LESSONS, WEEK_INFO, DAY_INFO, COURSE_INFO, MODULE_NAMES and COURSES come from curriculum.js */
/* ---- people ---- */
const TEAM = [
  { id: "tn", ini: "TN", color: "#0568ae", name: "Tomás Nguyen", role: "Instructor", desc: "Runs your labs, marks your checkpoint exams and scores your rides." },
  { id: "rc", ini: "RC", color: "#b07a00", name: "Rob Castillo", role: "Field mentor", desc: "Takes you on real jobs from Week 3." },
  { id: "pr", ini: "PR", color: "#6e4b9e", name: "Priya Rao", role: "Manager", desc: "Receives your progress summary." }
];
const COHORT_ALL = ["Dane Johnson (you)", "Tanya Brooks", "Marcus Lee", "Sofia Reyes", "Kevin Park", "Aisha Khan", "Luis Ortega", "Mei Chen", "Jordan Hayes", "Priscilla Gomez", "Andre Williams", "Hannah Patel", "Victor Nguyen", "Brianna Scott", "Omar Haddad", "Emily Carter", "Tyrell Jackson", "Grace Kim"];
/* ---- checkpoints ---- */
const CHECKPOINTS = [
  { id: "scc", week: 3, day: 4, title: "Safety Competency Check", kind: "exam" },
  { id: "l1w6", week: 6, day: 4, title: "Feedback + ride review", kind: "ride" },
  { id: "cap", week: 7, day: 4, title: "Capstone", kind: "exam" },
  { id: "l1w8", week: 8, day: 4, title: "Feedback + ride review", kind: "ride" },
  { id: "l1w9", week: 9, day: 4, title: "Feedback + ride review", kind: "ride" }
];
/* ---- Safety Competency Check · 25 questions ---- */
const EXAM_SECTIONS = ["Electrical safety", "Gloves, blankets & FVD", "PPE & respirators", "Ladders & poles", "Asbestos & environmental hazards"];
const EXAM = [
  [0, "What is the first step before touching an aerial strand or pedestal?", ["Test it with the AC Foreign Voltage Detector", "Put on rubber gloves only", "Call the dispatcher", "Check the weather"], 0, "w2-01"],
  [0, "A DC FVD is used to detect…", ["Fiber signal loss", "Hazardous DC voltage on plant", "Ground resistance", "Battery charge of the tester"], 1, "w2-02"],
  [0, "Minimum approach distance rules exist because…", ["They speed up the job", "Electricity can arc across air gaps", "They are required only at night", "Customers ask for them"], 1, "w2-04"],
  [0, "If the voltage detector alarms on a strand you should…", ["Continue carefully", "Stop, stay clear and notify your supervisor", "Ground it with your hand line", "Retest after 5 minutes and continue"], 1, "w2-01"],
  [0, "Before each use, the voltage detector should be…", ["Self-tested on a known source", "Shaken to reset it", "Calibrated by the customer", "Left switched on overnight"], 0, "w2-01"],
  [0, "Electrical Safety Awareness covers which hazard?", ["Crossing power lines and induced voltage", "Fiber bend radius", "Customer billing", "Truck fuel levels"], 0, "w2-04"],
  [1, "Rubber insulating gloves must be air-tested…", ["Once a week", "Before each use", "Once a year", "Only if visibly damaged"], 1, "w2-03"],
  [1, "Leather protectors are worn…", ["Under the rubber gloves", "Over the rubber gloves", "Instead of rubber gloves", "Only in rain"], 1, "w2-03"],
  [1, "Insulating blankets are used to…", ["Cover energized parts near the work area", "Keep fiber warm", "Store tools", "Mark the work zone"], 0, "w2-03"],
  [1, "A glove with a pinhole should be…", ["Taped and used", "Removed from service", "Used for low voltage only", "Turned inside out"], 1, "w2-03"],
  [1, "Who is responsible for checking your gloves before use?", ["The dispatcher", "You", "The customer", "The manufacturer"], 1, "w2-03"],
  [2, "When is a filtering facepiece respirator NOT adequate protection?", ["Nuisance dust while drilling", "Known asbestos-containing material being disturbed", "Fiberglass insulation in an attic", "Sawdust from cutting wood"], 1, "w2-09"],
  [2, "Before wearing a filtering facepiece you must complete…", ["A user seal check each time it is put on", "Nothing, it is single use", "A pulmonary test before each shift", "A supervisor sign-off each day"], 0, "w2-09"],
  [2, "Heat illness is best prevented by…", ["Water, rest and shade", "Working faster to finish early", "Energy drinks only", "Removing PPE"], 0, "w2-07"],
  [2, "Hearing protection is required when…", ["Noise is at or above the action level", "You are tired", "Working indoors only", "The customer is present"], 0, "w2-08"],
  [2, "The most common cause of field injuries is…", ["Slips, trips and falls", "Laser exposure", "Paper cuts", "Fiber splinters"], 0, "w2-11"],
  [3, "The correct ladder angle ratio is…", ["4 : 1", "3 : 1", "2 : 1", "1 : 1"], 0, "w1-2-1-0"],
  [3, "Before climbing a pole you must…", ["Inspect and sound the pole", "Remove your belt", "Ask the customer", "Wait for rain to stop"], 0, "w1-3-1-0"],
  [3, "Three points of contact means…", ["Two hands and one foot, or two feet and one hand", "Hands only", "One foot on each rung", "Using a rope and a ladder"], 0, "w1-2-1-0"],
  [3, "An extension ladder must extend above the landing by…", ["3 feet", "6 inches", "1 foot", "It doesn't need to"], 0, "w1-2-1-0"],
  [3, "Ladders near power lines should be…", ["Non-conductive (fiberglass)", "Aluminum", "Wooden with metal rungs", "Any type"], 0, "w1-2-1-0"],
  [4, "Asbestos in a vinyl floor tile should be…", ["Left undisturbed and reported", "Removed carefully", "Drilled through quickly", "Painted over"], 0, "w2-16"],
  [4, "How does asbestos mainly harm health?", ["Inhaled fibers damage the lungs", "Skin contact burns", "It is toxic to touch", "It causes hearing loss"], 0, "w2-14"],
  [4, "When you find a nest of stinging insects at a pedestal you should…", ["Stop, back away and follow the hazard procedure", "Spray it with water", "Work around it quickly", "Ignore it"], 0, "w2-12"],
  [4, "Outside plant asbestos work requires…", ["Following the approved work procedure", "No special steps", "Only gloves", "A second technician watching"], 0, "w2-15"]
];
/* ---- short L1 Feedback survey (trainee) ---- */
const L1Q = [
  ["scale", "Overall, this week's training prepared me for live work.", true],
  ["scale", "My field mentor explained each step before I did it."],
  ["scale", "I feel ready to complete a standard install on my own."],
  ["text", "What would have helped you most this week?"]
];
const RIDE_CRITERIA = [["Safety & PPE on site", 4], ["Customer greeting & professionalism", 5], ["Drop placement", 4], ["ONT install & activation", 3], ["Testing & documentation", 4], ["Clean-up & site exit", 5], ["Asks for help appropriately", 5], ["Time management", 3]];
const RESOURCES = [
  { cat: "Learning", icon: "book", title: "Award Learning System portal", sub: "Open your self-paced lessons" },
  { cat: "This week", icon: "link", title: "Student resources · Week 2", sub: "Links from the Safety Fundamentals workbook" },
  { cat: "This week", icon: "file", title: "Operating Practice No 78 PSAC", sub: "Practice document" },
  { cat: "Safety", icon: "shield", title: "Fiber safety handbook", sub: "PDF" },
  { cat: "Safety", icon: "warn", title: "Asbestos work procedures card", sub: "Outside plant · PDF" },
  { cat: "Field guides", icon: "ladder", title: "Ladder and pole quick guide", sub: "Week 1 · PDF" },
  { cat: "Field guides", icon: "tool", title: "Vehicle, tools & supplies checklist", sub: "Week 6 · PDF" },
  { cat: "Tools", icon: "users", title: "Teams · cohort FF-DAL-2611 channel", sub: "Chat with your cohort" }
];
