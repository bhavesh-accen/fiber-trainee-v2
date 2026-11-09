/* ===== Fiber Academy · Trainee prototype · app logic =====
   Every screen answers: where am I, what am I learning now, what do I do next.
   Hierarchy: Program → Week → Day → Module → Lessons
   Client feedback is stored in Postgres via /api/feedback (server.js · see README). */
(function () {
"use strict";
/* ---------------- icons ---------------- */
const I = {
  home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>', mtn:'<path d="M3 20l6-10 4 6 3-4 5 8z"/><path d="M14 6l1-3 1 3"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  plan:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16M3 14.5h18"/>',
  book:'<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.3.2 4 1.8 4.5 4.5"/>',
  folder:'<path d="M3 6h6l2 2h10v11H3z"/>', search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  moon:'<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z"/>', sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  play:'<path d="M8 5l11 7-11 7z"/>', check:'<path d="M5 12l5 5 9-11"/>', okc:'<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  warn:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.1"/>', lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  ride:'<path d="M2 7h12v9H2z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  shield:'<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>', file:'<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  msg:'<path d="M4 5h16v11H8l-4 4z"/>', clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 21h6"/>',
  chev:'<path d="M9 6l6 6-6 6"/>', chevl:'<path d="M15 6l-6 6 6 6"/>', chevd:'<path d="M6 9l6 6 6-6"/>', list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  link:'<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>', plus:'<path d="M12 5v14M5 12h14"/>',
  tool:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  ladder:'<path d="M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10"/>', user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>', flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>', ext:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v6H4V6h6"/>', dl:'<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  refresh:'<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8"/><path d="M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16"/><path d="M20 20v-4h-4"/>', map:'<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  lab:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>', comment:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8 11h8M8 14h5"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>', target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>', next:'<path d="M5 12h14M13 6l6 6-6 6"/>'
};
const ic = (n, s) => `<svg ${s ? `width="${s}" height="${s}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${I[n] || ""}</svg>`;
const GLOBE = '<svg viewBox="0 0 48 48" width="40" height="40"><circle cx="24" cy="24" r="21" fill="#00A8E0"/><path d="M6 17c8 3 28 3 36 0M4 25c10 3 30 3 40 0M7 33c8 3 26 3 34 0" stroke="#fff" stroke-width="3.2" fill="none"/></svg>';
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
/* ---------------- helpers ---------------- */
const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fd = d => `${DOW[d.getDay()]}, ${MON[d.getMonth()]} ${d.getDate()}`;
const fs = d => `${MON[d.getMonth()]} ${d.getDate()}`;
const hm = m => m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? " " + (m % 60) + "m" : ""}` : `${m} min`;
const same = (a, b) => iso(a) === iso(b);
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const WD = (w, d) => `Week ${w} · Day ${d}`;
const dayState = (w, d) => { const x = wday(w, d); return x < TODAY ? "past" : same(x, TODAY) ? "today" : "up"; };
/* ---------------- state ---------------- */
const KEY = "fa-trainee-v13";
function fresh() {
  const st = {}; LESSONS.forEach(l => st[l.id] = l.status);
  return {
    lessons: st, late: { "w2-04": true }, week: CUR_W, open: {}, showAll: {}, courseSeg: "all", cal: { y: 2026, m: 10 }, pplPage: 1, pplQ: "", resCat: "All", dark: false, step: 0,
    exam: { state: "idle", ans: {}, idx: 0, secs: 2700, attempt: 1 }, l1: { state: "idle", ans: {} },
    coach: { ack: {}, replies: {}, asks: [] }, rideReqs: [],
    notifs: [
      { t: "1 lesson is behind", s: "Asbestos: Preventing Exposure (Week 2 · Day 1)", unread: true, go: "#/day/2-1" },
      { t: "Note from Tomás Nguyen", s: "About catching up before your lab", unread: true, go: "#/coaching" },
      { t: "Week 1 complete", s: "Ladder and Pole Aptitude", unread: false, go: "#/progress" }
    ]
  };
}
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); if (!S || !S.lessons || !S.exam || !S.l1 || !S.coach || !S.cal) S = fresh(); } catch (e) { S = fresh(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
/* ---------------- derived data ---------------- */
const ALL = () => LESSONS.map(l => Object.assign({}, l, { status: S.lessons[l.id] || l.status }));
const lesson = id => ALL().find(l => l.id === id);
const req = l => l.status !== "na";
const stats = ls => ({ done: ls.filter(l => l.status === "d").length, total: ls.length, behind: ls.filter(l => l.status === "b").length, mins: ls.reduce((a, l) => a + l.min, 0) });
const dayLessons = (w, d) => ALL().filter(l => l.week === w && l.day === d && req(l));
const dStats = (w, d) => stats(dayLessons(w, d));
const modules = (w, d) => { const ls = dayLessons(w, d); return [...new Set(ls.map(l => l.block))].map(b => ({ b, name: MODULE_NAMES(w, d, b), ls: ls.filter(l => l.block === b) })); };
const weekLessons = w => ALL().filter(l => l.week === w && req(l));
const behind = () => ALL().filter(l => l.status === "b");
const doneCount = () => ALL().filter(l => l.status === "d" && req(l)).length;
const TOTAL = LESSONS.filter(l => l.status !== "na").length;
const overall = () => { const s = stats(weekLessons(CUR_W)); return Math.round(((CUR_W - 1) * 5 + (s.total ? s.done / s.total * 5 : 0)) / 45 * 100); };
const weekPct = w => w < CUR_W ? 100 : w > CUR_W ? 0 : pct(stats(weekLessons(w)).done, stats(weekLessons(w)).total);
const nextItem = ls => ls.find(l => l.status === "b") || ls.find(l => l.status === "p") || ls.find(l => l.status === "n");
function examScore() { let ok = 0; const missed = []; EXAM.forEach((q, i) => S.exam.ans[i] === q[3] ? ok++ : missed.push(i)); return { ok, pct: Math.round(ok / EXAM.length * 100), missed }; }
const sccPassed = () => S.exam.state === "evaluated" && examScore().pct >= 80;
const l1Passed = () => S.l1.state === "released";
const cpPassed = () => (sccPassed() ? 1 : 0) + (l1Passed() ? 1 : 0);
function cpStatus(id) {
  if (id === "scc") return { idle: ["x", "Not started"], progress: ["b", "In progress"], submitted: ["y", "With instructor"], evaluated: sccPassed() ? ["g", "Passed · " + examScore().pct + "%"] : ["r", "Not passed · " + examScore().pct + "%"] }[S.exam.state];
  if (id === "l1w6") return { idle: ["x", "Not started"], submitted: ["y", "With instructor"], released: ["g", "Passed · 4.1 / 5"] }[S.l1.state];
  return ["x", "Upcoming"];
}
const courseLessons = c => ALL().filter(l => l.week === c.week && c.days.includes(l.day) && req(l));
function cState(c) { if (c.week < CUR_W) return "done"; if (c.week === CUR_W) return "now"; return "up"; }
const CI = id => COURSE_INFO[id] || { desc: "", take: [], format: "" };
const curCourse = () => COURSES.find(c => c.week === CUR_W && c.days.includes(CUR_D)) || COURSES.find(c => c.week === CUR_W);
/* ---- ride-alongs ---- */
const RIDES = [[3, 1], [3, 2], [3, 3], [3, 5], [6, 2], [6, 3], [6, 5], [8, 1], [8, 2], [8, 3], [8, 5], [9, 1], [9, 2], [9, 3], [9, 5]].map(([w, d]) => ({ w, d, type: w === 3 ? "Field mentor dispatch" : "Dispatch & mentor ride", mentor: "Rob Castillo" }));
const DEMO_RIDE = { "6-2": 4.0, "6-3": 4.2, "6-5": 4.1 };
const rideScore = r => S.l1.state === "released" ? DEMO_RIDE[r.w + "-" + r.d] || null : null;
const ridesDone = () => RIDES.filter(rideScore).length;
const rideAvg = () => { const v = RIDES.map(rideScore).filter(Boolean); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length).toFixed(1) : ""; };
/* ---- coaching notes (newest first) ---- */
function COACH_NOTES() {
  const solved = lesson("w2-16").status === "d";
  const N = (id, k, title, date, text, extra) => Object.assign({ id, k, title, date, text, who: k === "alert" ? "Automatic alert · sent to Tomás Nguyen" : "Tomás Nguyen · Instructor" }, extra || {});
  return [
    ...S.coach.asks.map((a, i) => N("q" + i, "ask", "You asked for help", "Just now", a, { who: "You → Tomás Nguyen" })).reverse(),
    N("a1", "alert", solved ? "Caught up — thanks!" : "You're behind on 1 lesson", "Tue, Nov 10", "Your lesson “Asbestos: Preventing Exposure” wasn't finished on its day. Please complete it before your lab — we build on it in the safety brief.", { solved, cta: solved ? "" : btn("Open lesson", "launch", 'data-id="w2-16"', "xs"), tagline: WD(2, 1) }),
    N("n1", "note", "Before today's lab", "Tue, Nov 10", "Finish the asbestos lesson before your lab — we build on it. Bring your full PPE kit, including gloves for the air test."),
    N("n2", "note", "Great start on Day 1", "Mon, Nov 9", "You finished almost all of Day 1 with strong knowledge-check scores. Keep that pace going into the lab."),
    N("n3", "note", "Voltage detector tip", "Mon, Nov 9", "Remember to self-test the detector on a known source before every use — it's the step most people forget in the field."),
    N("n4", "note", "Week 1 wrap-up", "Fri, Nov 6", "Strong pole climbing all week. You passed the climb practical on your first attempt."),
    N("n5", "note", "Ladder tip", "Fri, Nov 6", "On the ladder, keep three points of contact while carrying tools — use a hand line for anything heavy."),
    N("n6", "note", "Gaff care", "Thu, Nov 5", "Your gaffs were getting dull by the afternoon. Check and sharpen them before every climb."),
    N("n7", "note", "Positioning at height", "Thu, Nov 5", "Good work getting hands-free. Next time, set your belt a little higher so you're not leaning back as far."),
    N("n8", "note", "Pole-top rescue", "Wed, Nov 4", "You stayed calm in the rescue drill. Practise the lowering knot once more before Friday."),
    N("n9", "note", "Ladder setup", "Tue, Nov 3", "Nice 4-to-1 setup on every attempt. Watch the base on soft ground — use the ladder levelers."),
    N("n10", "note", "Welcome to the program", "Mon, Nov 2", "Welcome, Dane! I'm your instructor for the next 9 weeks. Message me any time you're stuck — that's what I'm here for.")
  ];
}
/* ---------------- UI atoms ---------------- */
const pill = (c, t) => `<span class="pill ${c}">${t}</span>`;
const btn = (t, act, extra = "", cls = "") => `<span class="btn ${cls}" data-act="${act}" ${extra}>${t}</span>`;
const go = (hash, label, cls = "") => `<span class="btn ${cls}" data-act="go" data-to="${hash}">${label}</span>`;
const lnk = (hash, label) => `<span class="lnk" data-act="go" data-to="${hash}">${label}</span>`;
const bar = (p, c = "") => `<div class="bar ${c}"><i style="width:${p}%"></i></div>`;
const ct = (i, t, r = "") => `<div class="ct">${ic(i)}${t}<div class="r">${r}</div></div>`;
const row = (i, t, s, r = "", cls = "", attrs = "") => `<div class="row ${attrs ? "clk" : ""}" ${attrs}><div class="ico ${cls}">${ic(i)}</div><div class="rm"><b>${t}</b><span>${s}</span></div>${r}</div>`;
const stIcon = l => l.status === "d" ? `<span class="st ${S.late[l.id] ? "late" : "done"}" title="${S.late[l.id] ? "Done late" : "Done"}">${ic("check")}</span>` : `<span class="st ${{ b: "behind", p: "now", l: "lock" }[l.status] || ""}"></span>`;
const TY = { el: "Watch & read", act: "Practice", doc: "Document", quiz: "Quiz", lab: "Instructor-led", field: "Field day" };
const KEYLINE = `<div class="key"><span><span class="st done">${ic("check")}</span>Done</span><span><span class="st late">${ic("check")}</span>Done late — finished after its day</span><span><span class="st behind"></span>Behind — its day has passed</span><span><span class="st now"></span>In progress</span><span><span class="st"></span>To do</span><span><span class="st lock"></span>Opens later</span></div>`;
const takeList = (arr, sm) => `<ul class="take ${sm ? "sm" : ""}">${arr.map(t => `<li>${ic("check")}<span>${t}</span></li>`).join("")}</ul>`;
/* ---------------- routing ---------------- */
const FLOW = [
  ["#/dashboard", "Dashboard"], ["#/plan", "9-week program plan"], ["#/climb", "My Climb"], ["#/day/2-2", "Today's courses (day view)"], ["#/courses", "Courses"], ["#/course/c2", "A course (days inside)"],
  ["#/schedule", "Schedule"], ["#/progress", "Progress & Cert."], ["#/exam", "Checkpoint exam"], ["#/l1", "Feedback + ride review"],
  ["#/overview", "Learning Overview"], ["#/coaching", "Coaching & Feedback"], ["#/people", "People"], ["#/resources", "Resources"]
];
const NAV = [["home", "Dashboard", "#/dashboard"], ["plan", "Program Plan", "#/plan"], ["mtn", "My Climb", "#/climb"], ["grid", "Courses", "#/courses"], ["book", "Today's Training", "#/day/2-2"], ["cal", "Schedule", "#/schedule"], ["chart", "Progress & Cert.", "#/progress"], ["file", "Learning Overview", "#/overview"], ["msg", "Coaching & Feedback", "#/coaching"], ["users", "People", "#/people"], ["folder", "Resources", "#/resources"]];
function navOf(r, a) {
  if (r === "day") return a === `${CUR_W}-${CUR_D}` ? "Today's Training" : "Courses";
  return { dashboard: "Dashboard", plan: "Program Plan", climb: "My Climb", courses: "Courses", course: "Courses", schedule: "Schedule", progress: "Progress & Cert.", exam: "Progress & Cert.", l1: "Progress & Cert.", overview: "Learning Overview", coaching: "Coaching & Feedback", people: "People", resources: "Resources" }[r];
}
function parse() { const p = (location.hash || "#/flow").replace(/^#\//, "").split("/"); return { r: p[0] || "flow", a: p[1] }; }
function nav(hash) { if (location.hash === hash) render(); else location.hash = hash; }
function coachOpen() { return COACH_NOTES().filter(n => n.k !== "ask" && !S.coach.ack[n.id] && !n.solved).length; }
/* ---------------- shell ---------------- */
let openDD = null, q = "";
function shell(r, a, body) {
  const active = navOf(r, a), unread = S.notifs.filter(n => n.unread).length;
  const navh = NAV.map(([i, l, h]) => `<div class="nl ${l === active ? "on" : ""}" data-act="go" data-to="${h}">${ic(i)}<span>${l}</span>${l === "Coaching & Feedback" && coachOpen() ? `<span class="cnt">${coachOpen()}</span>` : ""}${l === "Program Plan" ? `<span class="new">9 WKS</span>` : ""}</div>`).join("");
  return `<div class="app"><aside class="sb"><div class="brand" data-act="go" data-to="#/flow">${GLOBE}<div><b>Fiber Academy</b><small>AT&amp;T FUTURE FIBER</small></div></div>
<div class="ml">MENU</div><div class="nav">${navh}</div>
<div class="me" data-act="go" data-to="#/people"><div class="a">DJ</div><div><b>Dane Johnson</b><small>Trainee · FF-DAL-2611</small></div></div></aside>
<div class="main"><div class="top"><div class="srch">${ic("search")}<input id="gq" placeholder="Search lessons, courses, people" autocomplete="off" value="${esc(q)}">${q ? searchResults() : ""}</div>
<div class="tr"><span class="topplan" data-act="go" data-to="#/plan" title="See the whole 9-week program">${ic("plan")}<span>9-week plan</span></span><span class="ib darkbtn" data-act="dark" title="Dark mode">${ic(S.dark ? "sun" : "moon")}</span><span class="ib" data-act="dd" data-v="notif" title="Notifications">${ic("bell")}${unread ? '<i class="dot"></i>' : ""}</span><span class="av0" data-act="dd" data-v="me" style="cursor:pointer">DJ</span>
${openDD === "notif" ? notifPanel() : ""}${openDD === "me" ? mePanel() : ""}</div></div>
<div class="sc" id="sc"><div class="wrap" id="wrap">${body}</div></div></div></div>`;
}
const notifPanel = () => `<div class="dd-panel"><div class="hdr">Notifications<span class="lnk" style="margin-left:auto" data-act="readall">Mark all read</span></div>${S.notifs.map((n, i) => `<div class="dd-item ${n.unread ? "unread" : ""}" data-act="notif" data-i="${i}"><div class="ico" style="width:32px;height:32px">${ic(n.unread ? "bell" : "check")}</div><div style="flex:1"><b>${esc(n.t)}</b><span>${esc(n.s)}</span></div></div>`).join("")}</div>`;
const mePanel = () => `<div class="dd-panel" style="width:260px"><div class="hdr">Dane Johnson<span class="m small" style="margin-left:auto">Trainee</span></div>${[["plan", "9-week program plan", "go", "#/plan"], ["user", "My support team", "go", "#/people"], ["file", "My learning report", "go", "#/overview"], ["map", "Prototype flow map", "go", "#/flow"], ["refresh", "Reset demo data", "reset", ""]].map(([i, t, a, h]) => `<div class="dd-item" data-act="${a}" data-to="${h}"><div class="ico" style="width:30px;height:30px">${ic(i)}</div><div style="flex:1;padding-top:6px"><b>${t}</b></div></div>`).join("")}</div>`;
function searchResults() {
  const k = q.toLowerCase().trim();
  const ls = ALL().filter(l => req(l) && isOpen(l.week, l.day) && (l.title + " " + l.code).toLowerCase().includes(k)).slice(0, 7);
  const cs = COURSES.filter(c => c.week <= CUR_W && (c.title + " " + CI(c.id).desc).toLowerCase().includes(k)).slice(0, 4);
  const ps = TEAM.filter(p => p.name.toLowerCase().includes(k));
  const it = (i, t, s, act, x) => `<div class="dd-item" data-act="${act}" ${x}><div class="ico" style="width:30px;height:30px">${ic(i)}</div><div style="flex:1"><b>${t}</b><span>${s}</span></div></div>`;
  const body = cs.map(c => it("grid", esc(c.title), `Course · Week ${c.week}`, "go", `data-to="#/course/${c.id}"`)).join("") + ls.map(l => it("book", esc(l.title), `${WD(l.week, l.day)} · ${MODULE_NAMES(l.week, l.day, l.block)}`, "golesson", `data-id="${l.id}"`)).join("") + ps.map(p => it("user", p.name, p.role, "go", 'data-to="#/people"')).join("");
  return `<div class="srch-res">${body || '<div class="empty">No matches</div>'}</div>`;
}
function crumbs(parts) { return `<div class="bc">${parts.map(([h, t], i) => (i ? '<span class="sep">›</span>' : "") + (h && i < parts.length - 1 ? lnk(h, t) : `<b>${t}</b>`)).join("")}</div>`; }
/* ================= SCREENS ================= */
/* ---- flow map ---- */
function vFlow() {
  const desc = ["KPIs, today's focus, this week, next week and the 9-week plan", "The whole program at a glance — the big picture", "Where you are in the 9 weeks", "Today's modules and lessons", "Every course with what you'll learn", "A course and its days", "Month calendar with labs, rides, checkpoints and holidays", "Where you stand and what you need to certify", "Take a checkpoint exam; your instructor marks it", "Quick feedback; your instructor scores your rides", "Full record incl. ride-alongs and scores, ready to export", "Inbox of notes, alerts and your help requests", "Your support team and cohort", "Guides, tools and links"];
  return `<div class="hd"><div><div class="h1">Fiber Academy · trainee prototype</div><div class="sub">Reimagined New Hire Training · Today is <b>Tue, Nov 10 2026</b> (${WD(CUR_W, CUR_D)}). Every button works — use the bar at the bottom to walk through.</div></div><div class="r">${go("#/dashboard", ic("play") + "Start walkthrough")}</div></div>
<div class="notice b">${ic("comment")}<span><b>Reviewing?</b> Turn on <b>Feedback mode</b> in the bottom bar, then click anything on a screen to leave a comment. Comments are shared with everyone who opens this link.</span></div>
<div class="flowgrid">${FLOW.map((f, i) => `<div class="fstep" data-act="go" data-to="${f[0]}"><div class="n">${i + 1}</div><b>${f[1]}</b><span>${desc[i]}</span></div>`).join("")}</div>`;
}
/* ---- shared bits ---- */
const isOpen = (w, d) => w < CUR_W || (w === CUR_W && (!d || dayState(w, d) !== "up"));
const opensOn = (w, d) => fd(wday(w, d || 1));
const dayKind = (w, d) => { const t = dayType(w, d).type, ls = dayLessons(w, d); if (t === "chk") return ["chk", "Checkpoint", "shield"]; if (t === "disp" || t === "ride") return ["ride", "Field day", "ride"]; if (ls.length && ls.every(l => l.type === "lab")) return ["lab", "Instructor-led", "lab"]; return ["learn", ls.some(l => l.type === "lab") ? "Self-study + lab" : "Self-study", "book"]; };
const dayMeta = (w, d) => { const s = dStats(w, d), m = modules(w, d).length; return s.total ? `${m} module${m > 1 ? "s" : ""} · ${s.total} item${s.total > 1 ? "s" : ""} · ≈ ${hm(s.mins)}` : dayType(w, d).type === "chk" ? "Checkpoint in the portal" : "With your field mentor"; };
function ring(p, size = 96, stroke = 10, col = "#0568ae") { const r = (size - stroke) / 2, C = 2 * Math.PI * r; return `<div class="ring" style="width:${size}px;height:${size}px"><svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#e8eef5" stroke-width="${stroke}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - p / 100)}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg><b>${p}%</b></div>`; }
/* week focus block — Dashboard, Day view, Course, Schedule */
const weekFocus = w => `<div class="wfocus"><div><div class="lbl">${ic("target")}Week ${w} focus · ${WEEK_INFO[w].theme}</div><p><b style="color:var(--navy)">${WEEK_INFO[w].focus}</b> ${WEEK_INFO[w].desc}</p></div><div><div class="lbl">By the end of the week</div>${takeList(WEEK_INFO[w].take)}</div></div>`;
/* ---- 9-week program plan grid (mirrors the client's plan) ---- */
const SHORT = { "Field Mentor Dispatch": "Mentor dispatch", "New Hire Dispatch & Field Mentor Ride": "Mentor ride", "L1 Feedback and RIDE Observation": "L1 + RIDE", "Safety Competency Check": "Safety check", "Onboarding Vehicle, Tools, & Supplies": "Vehicle & tools", "Expert Path Fiber Installation": "Expert Path Fiber Installation", "Expert Path Fiber Repair": "Fiber Repair", "Ladder and Pole Aptitude": "Ladder and Pole Aptitude", "Safety Fundamentals": "Safety Fundamentals", "Capstone": "Capstone" };
function planGrid(compact) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let h = `<div class="ph blank"></div>` + days.map(d => `<div class="ph">${compact ? d.slice(0, 3) : d}</div>`).join("");
  WEEKS.forEach(w => {
    const st = w.n < CUR_W ? "done" : w.n === CUR_W ? "cur" : "";
    h += `<div class="pw ${st}" data-act="planweek" data-w="${w.n}" title="Week ${w.n} · ${WEEK_INFO[w.n].theme}">Week ${w.n}${w.n === CUR_W ? "<em>NOW</em>" : ""}</div>`;
    let d = 1;
    w.segs.forEach(([t, label, n]) => {
      const merge = t === "train" || label === "Capstone";
      const kind = label === "Capstone" ? "train" : t;
      const parts = merge ? [[d, n]] : Array.from({ length: n }, (_, i) => [d + i, 1]);
      parts.forEach(([sd, span]) => {
        const ed = sd + span - 1;
        const now = w.n === CUR_W && CUR_D >= sd && CUR_D <= ed;
        const past = w.n < CUR_W || (w.n === CUR_W && ed < CUR_D);
        const fut = !past && !now;
        h += `<div class="pcell k-${kind} ${past ? "past" : ""} ${now ? "now" : ""} ${fut ? "fut" : ""}" style="grid-column:span ${span}" data-act="plancell" data-w="${w.n}" data-d="${now ? CUR_D : sd}" title="${esc(label)} · Week ${w.n}">${now ? '<span class="nowt">YOU ARE HERE</span>' : ""}${esc(compact ? SHORT[label] || label : label)}</div>`;
      });
      d += n;
    });
  });
  return `<div class="pgwrap"><div class="p9 ${compact ? "compact" : ""}">${h}</div></div>`;
}
const planLegend = `<div class="plg"><span><i style="background:var(--pt)"></i>Classroom & lab training</span><span><i style="background:var(--pd)"></i>Field mentor dispatch / onboarding</span><span><i style="background:var(--pr)"></i>Dispatch & mentor ride</span><span><i style="background:var(--pc)"></i>Checkpoint</span></div>`;
/* ---- dashboard ---- */
function vDashboard() {
  const [title, desc, take] = DAY_INFO[CUR_W][CUR_D - 1], st = dStats(CUR_W, CUR_D), b = behind(), mods = modules(CUR_W, CUR_D), cp = CHECKPOINTS[0], [cc, cl] = cpStatus("scc"), note = COACH_NOTES().find(n => n.k === "note"), cc0 = curCourse(), NW = CUR_W + 1;
  const kp = [["trophy", "Program progress", overall() + "%", `Week ${CUR_W} of 9 · graduation Jan 8`, overall(), "#/progress"],
    ["book", "Lessons completed", `${doneCount()}<small> / ${TOTAL}</small>`, b.length ? `<span class="neg">${b.length} behind</span>` : "None behind", pct(doneCount(), TOTAL), "#/overview"],
    ["shield", "Checkpoints passed", `${cpPassed()}<small> / 5</small>`, `Next: ${cp.title}`, cpPassed() * 20, "#/progress"],
    ["ride", "Ride-alongs", `${ridesDone()}<small> / ${RIDES.length}</small>`, `Start ${WD(3, 1)}`, pct(ridesDone(), RIDES.length), "#/overview"]]
    .map(([i, k, v, f, p, h]) => `<div class="kcard" data-act="go" data-to="${h}"><div class="kt"><span class="ki">${ic(i)}</span>${k}</div><div class="kv">${v}</div>${bar(p)}<div class="kf">${f}</div></div>`).join("");
  const modsHtml = mods.map(m => { const ms = stats(m.ls), done = ms.done === ms.total; return `<div class="tmod ${done ? "done" : ""}" data-act="openDay" data-w="${CUR_W}" data-d="${CUR_D}"><span class="tm-i">${done ? ic("check") : ic(m.ls.every(l => l.type === "lab") ? "lab" : "book")}</span><div><b>${m.name}</b><span>${ms.done}/${ms.total} done</span></div></div>`; }).join("");
  const today = `<div class="todaycard">
<div class="tt"><div class="tmeta"><span class="chipw">${ic("cal")}${WD(CUR_W, CUR_D)} · ${fd(TODAY)}</span><span class="chipw ghost">${cc0 ? cc0.title : WEEKS[CUR_W - 1].title}</span></div>
<h2><span>Today's focus</span>${title}</h2><p>${desc}</p>
<div class="tl2"><div class="lbl">By the end of today you'll be able to</div>${takeList(take)}</div>
<div class="tcta">${btn("View today's courses " + ic("chev"), "openDay", `data-w="${CUR_W}" data-d="${CUR_D}"`)}<span class="m small">${dayMeta(CUR_W, CUR_D)}</span></div></div>
<div class="tside">${ring(pct(st.done, st.total), 120, 12, "#fff")}<div class="tsl">${st.done} of ${st.total} done today</div><div class="tmods">${modsHtml}</div></div></div>`;
  const week = [1, 2, 3, 4, 5].map(d => { const ds = dayState(CUR_W, d), s = dStats(CUR_W, d), open = isOpen(CUR_W, d), [k, kl, ki] = dayKind(CUR_W, d), x = wday(CUR_W, d);
    if (!open) return `<div class="wday locked"><div class="wd-top"><span>${DOW[x.getDay()]} ${x.getDate()}</span><i class="lk">${ic("lock")}</i></div><b>Day ${d}</b><p>Opens ${fs(x)}</p></div>`;
    return `<div class="wday ${ds === "today" ? "istoday" : ds} ${s.behind ? "bh" : ""}" data-act="openDay" data-w="${CUR_W}" data-d="${d}"><div class="wd-top"><span>${DOW[x.getDay()]} ${x.getDate()}</span>${ds === "today" ? '<em>Today</em>' : s.behind ? `<em class="r">${s.behind} behind</em>` : `<i>${ic("check")}</i>`}</div><b>Day ${d} · ${DAY_INFO[CUR_W][d - 1][0]}</b><p class="wdd">${DAY_INFO[CUR_W][d - 1][1]}</p><div class="wd-k">${ic(ki)}${kl}</div>${s.total ? bar(pct(s.done, s.total), s.behind ? "r" : "") : ""}</div>`; }).join("");
  const alert = b.length ? `<div class="notice r">${ic("warn")}<span><b>${esc(b[0].title)}</b> from ${WD(b[0].week, b[0].day)} is still open. Your instructor has been told.</span><span class="lnk" data-act="golesson" data-id="${b[0].id}">Catch up ${ic("chev")}</span></div>` : "";
  const nwDays = [1, 2, 3, 4, 5].map(d => { const t = dayType(NW, d), k = t.label === "Capstone" ? "train" : t.type; return `<div class="nwd pcell k-${k}" style="cursor:default" title="${esc(t.label)}"><small>${DOW[wday(NW, d).getDay()].toUpperCase()} ${wday(NW, d).getDate()}</small>${esc(SHORT[t.label] || t.label)}</div>`; }).join("");
  const nextWeek = NW <= 9 ? `<div class="c nwk">${ct("next", "Coming up next", pill("x", `${ic("lock", 11)}Opens ${fs(wday(NW, 1))}`))}<div class="eyebrow">Week ${NW} · ${fs(wday(NW, 1))} – ${fs(wday(NW, 5))}</div><div class="nwt">${WEEKS[NW - 1].title} · ${WEEK_INFO[NW].theme}</div><p>${WEEK_INFO[NW].focus} ${WEEK_INFO[NW].desc}</p><div class="nwdays">${nwDays}</div><div style="margin-top:12px">${lnk("#/plan", "See the full 9-week plan " + ic("chev"))}</div></div>` : "";
  const planMini = `<div class="c">${ct("plan", "Your 9-week plan", lnk("#/plan", "Open full plan " + ic("chev")))}<p class="sub" style="margin:-4px 0 12px">The big picture: what each week and day is for. The highlighted cell is where you are now.</p>${planGrid(true)}${planLegend}</div>`;
  return `<div class="hd"><div><div class="h1">Good morning, <em>Dane</em></div><div class="sub">Tuesday, November 10 · Week ${CUR_W} of 9 · ${WEEK_INFO[CUR_W].theme} — ${WEEK_INFO[CUR_W].focus}</div></div></div>
<div class="kgrid">${kp}</div>${alert}${today}
<div class="c">${ct("cal", `This week · Week ${CUR_W} · ${WEEKS[CUR_W - 1].title}`, lnk("#/climb", "My Climb " + ic("chev")))}${weekFocus(CUR_W)}<div class="wstrip">${week}</div></div>
<div class="g nwplan">${nextWeek}${planMini}</div>
<div class="g g3">${cc0 ? `<div class="c ccard" data-act="go" data-to="#/course/${cc0.id}"><div class="lbl">${ic("grid")}Your current course</div><b>${cc0.title}</b><p>${CI(cc0.id).desc}</p><span class="m small">${CI(cc0.id).format}</span><span class="lnk">Open course ${ic("chev")}</span></div>` : ""}
<div class="c mini2" data-act="go" data-to="#/progress"><span class="ico">${ic("shield")}</span><div class="t"><div class="lbl">Next checkpoint · ${WD(cp.week, cp.day)}</div><b>${cp.title}</b><span>${fd(wday(cp.week, cp.day))} · 25 questions on Weeks 1–2 · 80% to pass</span><div style="margin-top:6px">${pill(cc, cl)}</div></div></div>
<div class="c mini2" data-act="coachopen" data-id="${note.id}"><span class="ico av" style="background:#0568ae">TN</span><div class="t"><div class="lbl">From your instructor ${S.coach.ack[note.id] ? "" : pill("b", "New")}</div><b>${note.title}</b><span>${esc(note.text.slice(0, 90))}…</span></div>${ic("chev", 16)}</div></div>`;
}
/* ---- Program plan: the big picture ---- */
function vPlan() {
  const weeks = WEEKS.map(w => {
    const i = WEEK_INFO[w.n], st = w.n < CUR_W ? "done" : w.n === CUR_W ? "cur" : w.n === CUR_W + 1 ? "next" : "lock";
    const tag = st === "done" ? pill("g", "Complete") : st === "cur" ? pill("b", "This week") : pill("x", `${ic("lock", 11)}Opens ${fs(wday(w.n, 1))}`);
    const courses = COURSES.filter(c => c.week === w.n).map(c => c.title).join(" · ");
    const body = st === "lock" ? `<p>${i.focus}</p>` : `<p><b style="color:var(--navy)">${i.focus}</b> ${i.desc}</p>${st !== "next" ? takeList(i.take, true) : ""}`;
    return `<div class="wkr ${st === "cur" ? "cur" : st === "lock" || st === "next" ? "lock" : ""}"><div class="wn"><small>WEEK</small><b>${w.n}</b></div><div class="t"><b>${w.title} <span class="pill p">${i.theme}</span></b><div class="m small">${fs(wday(w.n, 1))} – ${fs(wday(w.n, 5))}${courses ? " · " + courses : ""}${CKW[w.n] ? " · Checkpoint: " + CKW[w.n] : ""}</div>${body}</div><div class="side">${tag}${w.n <= CUR_W ? lnk("#/climb", "Open week " + ic("chev")).replace('data-act="go" data-to="#/climb"', `data-act="week" data-w="${w.n}"`) : ""}</div></div>`;
  }).join("");
  return `<div class="planhead"><div><div class="eyebrow">Your program at a glance · Nov 2, 2026 → Jan 8, 2027</div><div class="t">Reimagined New Hire Training</div></div><span class="p9badge">9 WEEKS</span></div>
<div class="c">${planGrid(false)}${planLegend}<div class="note" style="margin-top:12px"><b>How to read this:</b> each row is a week and each column a training day. Tap a cell to open that day — days and weeks ahead stay locked until you reach them. Weekends and holidays (Thanksgiving, Christmas, New Year's) are skipped, so later weeks shift by a few days.</div></div>
<div class="c">${ct("list", "What each week is about", `<span class="m small">Graduation · Fri, Jan 8</span>`)}<div class="wkl">${weeks}</div></div>`;
}
/* ---- My Climb: where am I in the program ---- */
function vClimb() {
  const W = Math.min(S.week, CUR_W), info = WEEK_INFO[W];
  const weeks = WEEKS.map(w => { const open = w.n <= CUR_W, s = w.n < CUR_W ? "done" : w.n === CUR_W ? "cur" : "lock";
    if (!open) return `<div class="wt lock"><div class="wt-h"><span class="wt-n">${w.n}</span><span class="lk">${ic("lock", 13)}</span></div><b>Week ${w.n}</b><small>Opens ${fs(wday(w.n, 1))}</small></div>`;
    return `<div class="wt ${s} ${w.n === W ? "sel" : ""}" data-act="week" data-w="${w.n}"><div class="wt-h"><span class="wt-n">${s === "done" ? ic("check", 13) : w.n}</span></div><b>${WEEKS[w.n - 1].short}</b><small>${WEEK_INFO[w.n].theme}</small>${bar(weekPct(w.n))}</div>`; }).join("") +
    `<div class="wt fin lock"><div class="wt-h"><span class="wt-n">${ic("trophy", 13)}</span></div><b>Certified</b><small>Fri, Jan 8</small></div>`;
  const ws = stats(weekLessons(W));
  const days = [1, 2, 3, 4, 5].map(d => { const open = isOpen(W, d), ds = dayState(W, d), s = dStats(W, d), x = wday(W, d);
    if (!open) return `<div class="cday locked"><small>Day ${d} · ${DOW[x.getDay()]}</small><b>${ic("lock", 13)} Locked</b><span>Opens ${fs(x)}</span></div>`;
    return `<div class="cday ${ds === "today" ? "istoday" : ""} ${s.behind ? "bh" : ""}" data-act="openDay" data-w="${W}" data-d="${d}"><small>Day ${d} · ${DOW[x.getDay()]} ${x.getDate()}</small><b>${DAY_INFO[W][d - 1][0]}</b><span class="cdd">${DAY_INFO[W][d - 1][1]}</span><span>${ds === "today" ? "Today" : s.behind ? `<em class="neg">${s.behind} behind</em>` : s.total ? "Done" : "Field day"}</span>${s.total ? bar(pct(s.done, s.total), s.behind ? "r" : "") : ""}</div>`; }).join("");
  const cs = COURSES.filter(c => c.week === W);
  return `<div class="hd"><div><div class="h1">My Climb</div><div class="sub">Where you are in the 9-week program. Weeks open as you reach them.</div></div><div class="r">${go("#/plan", ic("plan") + "9-week plan", "gh")}${pill("b", overall() + "% complete")}</div></div>
<div class="wtrack">${weeks}</div>
<div class="whero"><div class="wh-l"><div class="eyebrow">Week ${W} of 9 · ${fs(wday(W, 1))} – ${fs(wday(W, 5))}</div><div class="h1" style="margin-top:6px">Week ${W} · ${WEEKS[W - 1].title}</div><div class="wh-tags">${W < CUR_W ? pill("g", "Complete") : pill("b", "This week")}<span class="pill p">${info.theme}</span></div><p><b style="color:var(--navy)">${info.focus}</b> ${info.desc}</p>
${cs.length ? `<p class="small m" style="margin-top:8px">Course${cs.length > 1 ? "s" : ""}: ${cs.map(c => lnk("#/course/" + c.id, esc(c.title))).join(" · ")}</p>` : ""}
${ws.total ? `<div class="prog" style="margin-top:14px">${bar(pct(ws.done, ws.total))}<span>${ws.done} of ${ws.total} learning items done</span></div>` : ""}</div>
<div class="wh-r"><div class="lbl">What you'll take away</div>${takeList(info.take)}</div></div>
<div class="c">${ct("cal", `Days in Week ${W}`, `<span class="m small">Pick a day to see its modules and lessons</span>`)}<div class="cdays">${days}</div></div>`;
}
/* ---- Day view ---- */
function vDay(a) {
  const [W, D] = (a || `${CUR_W}-${CUR_D}`).split("-").map(Number);
  const nav5 = `<div class="daynav">${[1, 2, 3, 4, 5].map(d => isOpen(W, d) ? `<span class="${d === D ? "on" : ""} ${dStats(W, d).behind ? "bh" : ""}" data-act="openDay" data-w="${W}" data-d="${d}"><small>DAY ${d}</small>${DOW[wday(W, d).getDay()]}</span>` : `<span class="off" title="Opens ${fs(wday(W, d))}"><small>DAY ${d}</small>${ic("lock", 12)}</span>`).join("")}</div>`;
  if (!isOpen(W, D)) return `${crumbs([["#/climb", "My Climb"], [null, `Week ${W} · Day ${D}`]])}<div class="c lockcard"><span class="ico">${ic("lock", 22)}</span><div class="h2">This day is locked</div><p class="sub">It opens on ${opensOn(W, D)}. You'll see its modules and lessons then.</p><div style="margin-top:14px;display:flex;gap:8px;justify-content:center">${btn("Back to today " + ic("chev"), "openDay", `data-w="${CUR_W}" data-d="${CUR_D}"`)}${go("#/plan", ic("plan") + "9-week plan", "gh")}</div></div>`;
  const [t, desc, take] = DAY_INFO[W][D - 1], ls = dayLessons(W, D), s = stats(ls), mods = modules(W, D), nx = nextItem(ls.filter(l => l.type !== "lab")), ds = dayState(W, D);
  const course = COURSES.find(c => c.week === W && c.days.includes(D)) || COURSES.find(c => c.week === W);
  const cta = nx ? btn(ic("play") + (nx.status === "b" ? "Catch up: " : "Continue: ") + esc(nx.title), "launch", `data-id="${nx.id}"`) : s.total ? pill("g", "Self-study done for this day") : "";
  const head = `${crumbs([["#/climb", "My Climb"], ["#/climb", "Week " + W], [null, "Day " + D]])}
<div class="dhero"><div class="dh-l">${nav5}
<div class="eyebrow" style="margin-top:16px">${WD(W, D)} · ${fd(wday(W, D))} · ${WEEKS[W - 1].title}</div><div class="h1" style="margin-top:6px">Day ${D} · ${t}</div><p class="sub" style="font-size:14.5px;max-width:640px">${desc}</p>
${s.total ? `<div class="prog" style="margin-top:12px">${bar(pct(s.done, s.total))}<span>${s.done} of ${s.total} items · ${mods.length} module${mods.length > 1 ? "s" : ""} · ≈ ${hm(s.mins)}${s.behind ? ` · <b class="neg">${s.behind} behind</b>` : ""}</span></div>` : ""}
<div style="margin-top:16px">${cta}</div></div>
<div class="dh-r"><div class="lbl">By the end of this day</div>${takeList(take)}
<div class="wkctx"><div class="lbl">${ic("target")}Week ${W} focus · ${WEEK_INFO[W].theme}</div><p>${WEEK_INFO[W].focus} ${WEEK_INFO[W].desc}</p></div>
${course ? `<div class="wkctx"><div class="lbl">${ic("grid")}Course</div><p><b style="color:var(--navy)">${lnk("#/course/" + course.id, esc(course.title))}</b> — ${CI(course.id).desc}</p></div>` : ""}</div></div>`;
  if (!ls.length) { const ty = dayType(W, D).type; return head + `<div class="c"><div class="empty">${ty === "chk" ? `This is a checkpoint day. ${lnk("#/progress", "Go to your checkpoints " + ic("chev"))}` : `A field day with your mentor — your mentor logs the ride. ${lnk("#/schedule", "See schedule " + ic("chev"))}`}</div></div>`; }
  const curMod = nx ? nx.block : null;
  const cards = mods.map((m, i) => {
    const ms = stats(m.ls), key = `${W}-${D}-${m.b}`, done = ms.done === ms.total, allLab = m.ls.every(l => l.type === "lab");
    const open = S.open[key] !== undefined ? S.open[key] : (curMod ? m.b === curMod : i === 0);
    const LIMIT = 6, all = S.showAll[key], ordered = [...m.ls.filter(l => l.status !== "d"), ...m.ls.filter(l => l.status === "d")];
    const shown = all || ordered.length <= LIMIT ? m.ls : ordered.slice(0, LIMIT);
    const st = done ? pill("g", "Done") : ms.behind ? pill("r", ms.behind + " behind") : allLab ? pill("b", "With instructor") : m.ls.some(l => l.status === "p" || l.status === "d") ? pill("b", "In progress") : pill("x", "To do");
    return `<div class="mod ${open ? "open" : ""} ${done ? "done" : ""}"><div class="modh" data-act="tmod" data-k="${key}" data-v="${open ? 0 : 1}"><span class="mnum">${done ? ic("check", 14) : i + 1}</span><div class="mt"><b>${m.name}</b><span>${MODULE_DESC(W, D, m.b)} · ${ms.total} item${ms.total > 1 ? "s" : ""} · ≈ ${hm(ms.mins)}</span></div><div class="mr">${st}${bar(pct(ms.done, ms.total))}<span class="m small">${ms.done}/${ms.total}</span><span class="chev">${ic("chev", 16)}</span></div></div>
${open ? `<div class="modb">${shown.map(lrow).join("")}${m.ls.length > LIMIT ? `<div class="showall" data-act="showall" data-k="${key}">${all ? "Show less" : `Show all ${m.ls.length} items ${ic("chevd")}`}</div>` : ""}</div>` : ""}</div>`;
  }).join("");
  const ca = ALL().some(l => l.week === W && l.day === D && !req(l)), tbc = ls.some(l => l.tbc);
  return `${head}${tbc ? `<div class="notice b">${ic("warn")}<span>Detailed lessons for this day aren't in the course map yet — the training team will confirm them.</span></div>` : ""}<div class="hd"><div class="h2">Modules for this day</div><div class="r m small">Open a module to see its lessons</div></div><div class="mods">${cards}</div>${ca ? `<div class="m small">California-only lessons are hidden — not required in your region (${REGION}).</div>` : ""}${KEYLINE}`;
}
function lrow(l) {
  const isT = l.type === "lab" || l.type === "field";
  const sub = isT ? `${TY[l.type]} · ${hm(l.min)}${l.room ? " · " + l.room : ""}` : `${TY[l.type]} · ${hm(l.min)}${l.code ? " · #" + l.code : ""}${l.buffer ? " · can move to the next day" : ""}`;
  const act = isT ? btn("Details", "lab", `data-id="${l.id}"`, "xs gh") : l.status === "d" ? (S.late[l.id] ? pill("a", "Done late") : "") : l.status === "l" ? "" : btn(l.status === "b" ? "Catch up" : l.status === "p" ? "Continue" : "Start", "launch", `data-id="${l.id}"`, "xs " + (l.status === "n" ? "gh" : ""));
  return `<div class="lrow ${l.status === "b" ? "behind" : ""} ${l.status === "d" ? "isdone" : ""}" id="row-${l.id}">${isT ? `<span class="ico" style="width:22px;height:22px;border-radius:7px">${ic("lab", 12)}</span>` : stIcon(l)}<div class="t"><b>${esc(l.title)}</b><span>${sub}</span></div>${act}</div>`;
}
/* ---- courses: what's inside the program ---- */
function vCourses() {
  const seg = S.courseSeg, list = COURSES.filter(c => seg === "all" || (seg === "week" && c.week === CUR_W) || (seg === "done" && c.week < CUR_W));
  const rows = list.map(c => {
    if (c.week > CUR_W) return `<div class="crow lock"><div class="wn"><small>WEEK</small><b>${c.week}</b></div><div class="t"><b>${ic("lock", 13)} Locked</b><p>This course opens on ${opensOn(c.week, c.days[0])}.</p></div></div>`;
    const s = stats(courseLessons(c)), p = c.week < CUR_W ? 100 : pct(s.done, s.total), st = cState(c), info = CI(c.id);
    const tg = st === "done" ? pill("g", "Complete") : s.behind ? pill("r", s.behind + " behind") : pill("b", "In progress");
    return `<div class="crow ${st}" data-act="go" data-to="#/course/${c.id}"><div class="wn"><small>WEEK</small><b>${c.week}</b></div><div class="t"><b>${c.title}</b><p>${info.desc}</p><div class="lrn"><b>You'll learn</b> · ${info.take.join(" · ")}</div><p class="small m" style="margin-top:4px">${info.format} · ${c.days.length} day${c.days.length > 1 ? "s" : ""} · ${s.total ? s.total + " learning items" : "field days with your mentor"}</p></div><div class="side">${tg}${s.total ? `<div class="cbar">${bar(p)}</div>` : ""}${ic("chev", 16)}</div></div>`;
  }).join("");
  const segs = [["week", "This week"], ["done", "Completed"], ["all", "All courses"]].map(([k, t]) => `<span class="${seg === k ? "on" : ""}" data-act="cseg" data-v="${k}">${t}</span>`).join("");
  return `<div class="hd"><div><div class="h1">Courses</div><div class="sub">Every course in your program, what it covers and what you'll take away. Open one to see its days, modules and lessons. Future courses unlock as you reach them.</div></div><div class="r">${go("#/plan", ic("plan") + "9-week plan", "gh")}</div></div>
<div><div class="seg">${segs}</div></div><div class="c clist">${rows || '<div class="empty">No courses here.</div>'}</div>`;
}
function vCourse(id) {
  const c = COURSES.find(x => x.id === id) || COURSES[1];
  if (c.week > CUR_W) return `${crumbs([["#/courses", "Courses"], [null, "Locked course"]])}<div class="c lockcard"><span class="ico">${ic("lock", 22)}</span><div class="h2">This course is locked</div><p class="sub">It opens on ${opensOn(c.week, c.days[0])}.</p></div>`;
  const s = stats(courseLessons(c)), info = CI(c.id);
  const days = c.days.map(d => { const open = isOpen(c.week, d), ds = dStats(c.week, d), dsx = dayState(c.week, d), x = wday(c.week, d);
    if (!open) return `<div class="dayrow locked"><div class="dnum"><small>DAY</small><b>${d}</b></div><div class="t"><b>${ic("lock", 13)} Locked</b><p>Opens ${fd(x)}</p></div></div>`;
    return `<div class="dayrow ${dsx === "today" ? "istoday" : ds.behind ? "bh" : "done"}" data-act="openDay" data-w="${c.week}" data-d="${d}"><div class="dnum"><small>DAY</small><b>${d}</b></div><div class="t"><b>${DAY_INFO[c.week][d - 1][0]} ${dsx === "today" ? pill("b", "Today") : ds.behind ? pill("r", ds.behind + " behind") : pill("g", "Done")}</b><p>${DAY_INFO[c.week][d - 1][1]}</p><p class="small m">${fd(x)} · ${dayMeta(c.week, d)} · You'll take away: ${DAY_INFO[c.week][d - 1][2].join(" · ")}</p></div><div class="side">${ds.total ? `<div class="cbar">${bar(pct(ds.done, ds.total))}</div>` : ""}${ic("chev", 16)}</div></div>`; }).join("");
  return `${crumbs([["#/courses", "Courses"], [null, c.title]])}
<div class="chero"><div class="cl"><div class="eyebrow">Week ${c.week} · ${fs(wday(c.week, c.days[0]))} – ${fs(wday(c.week, c.days[c.days.length - 1]))} · ${info.format}</div><div class="h1" style="margin-top:6px">${c.title}</div><p>${info.desc}</p>
${s.total ? `<div class="prog" style="margin-top:14px">${bar(c.week < CUR_W ? 100 : pct(s.done, s.total))}<span>${s.done} of ${s.total} items done${s.behind ? ` · <b class="neg">${s.behind} behind</b>` : ""}</span></div>` : ""}
<div class="wkctx"><div class="lbl">${ic("target")}Week ${c.week} focus · ${WEEK_INFO[c.week].theme}</div><p>${WEEK_INFO[c.week].focus} ${WEEK_INFO[c.week].desc}</p></div></div>
<div class="cr"><div class="lbl">What you'll take away from this course</div>${takeList(info.take)}</div></div>
<div class="c">${ct("cal", "Days in this course")}<div class="drows">${days}</div></div>`;
}
/* ---- schedule: month calendar ---- */
function events(w, d) {
  const t = dayType(w, d), out = [], mods = modules(w, d);
  if (mods.some(m => m.ls.some(l => l.type !== "lab" && l.type !== "field"))) out.push(["les", "book", "Self-study"]);
  if (mods.some(m => m.ls.some(l => l.type === "lab"))) out.push(["lab", "lab", "Lab"]);
  if (t.type === "disp" || t.type === "ride") out.push(["ride", "ride", "Ride"]);
  if (t.type === "chk") out.push(["chk", "shield", "Checkpoint"]);
  return out;
}
const planIdx = d => PLAN.findIndex(p => same(p, d));
function vSchedule() {
  const { y, m } = S.cal, first = new Date(y, m, 1), start = new Date(y, m, 1 - ((first.getDay() + 6) % 7));
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let cells = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(x => `<div class="ch">${x}</div>`).join("");
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    if (i >= 35 && d.getMonth() !== m) break;
    const k = iso(d), hol = HOLIDAYS[k], pi = planIdx(d), we = d.getDay() === 0 || d.getDay() === 6, cls = ["cell"];
    if (d.getMonth() !== m) cls.push("out"); if (we) cls.push("we"); if (hol) cls.push("hol"); if (same(d, TODAY)) cls.push("istoday");
    let inner = `<div class="cn">${d.getDate()}${same(d, TODAY) ? '<em>Today</em>' : ""}</div>`;
    if (hol) inner += `<div class="hl">${ic("sun", 12)}${hol}</div>`;
    if (pi >= 0) { const w = Math.floor(pi / 5) + 1, dd = pi % 5 + 1, open = isOpen(w, dd), s = dStats(w, dd);
      cls.push(open ? "open" : "fut");
      inner += `<div class="wdl">W${w} · D${dd}${open ? "" : " " + ic("lock", 10)}</div><div class="evs">${(open ? events(w, dd) : events(w, dd).filter(e => e[0] === "chk")).map(([c, i2, t]) => `<span class="ev ${c}" title="${t}">${ic(i2)}<i>${t}</i></span>`).join("")}</div>${open && s.behind ? `<div class="bhm">${s.behind} behind</div>` : ""}`;
      cells += `<div class="${cls.join(" ")}" data-act="sday" data-w="${w}" data-d="${dd}">${inner}</div>`; }
    else cells += `<div class="${cls.join(" ")}">${inner}</div>`;
  }
  const up = [[3, 1, "ride", "Field Mentor Dispatch begins"], [3, 4, "shield", "Safety Competency Check"], [6, 1, "tool", "Vehicle, tools & supplies"], [7, 4, "trophy", "Capstone"]];
  const hols = Object.keys(HOLIDAYS).map(k => row("sun", HOLIDAYS[k], `${fd(new Date(k + "T00:00"))} · no training`, "", "red")).join("");
  return `<div class="hd"><div><div class="h1">Schedule</div><div class="sub">Your training days, labs, rides, checkpoints and holidays. Self-paced lessons are due by the end of their day.</div></div><div class="r">${go("#/plan", ic("plan") + "9-week plan", "gh")}${btn(ic("cal") + "Add to Outlook", "ics", "", "gh")}</div></div>
<div class="g schedg"><div class="c"><div class="calh"><span class="ib s" data-act="cm" data-v="-1">${ic("chevl")}</span><div class="h2">${MONTHS[m]} ${y}</div><span class="ib s" data-act="cm" data-v="1">${ic("chev")}</span>${y !== 2026 || m !== 10 ? btn("Today", "cmnow", "", "xs gh") : ""}
<div class="lg" style="margin-left:auto"><span><i class="lgb les"></i>Self-study</span><span><i class="lgb lab"></i>Lab</span><span><i class="lgb ride"></i>Ride</span><span><i class="lgb chk"></i>Checkpoint</span><span><i class="lgb hol"></i>Holiday</span></div></div>
<div class="cal">${cells}</div></div>
<div class="g" style="align-content:start"><div class="c">${ct("target", "This week's focus", `<span class="m small">Week ${CUR_W}</span>`)}<div class="h2" style="font-size:15px">${WEEKS[CUR_W - 1].title} · ${WEEK_INFO[CUR_W].theme}</div><p class="sub" style="margin-top:4px">${WEEK_INFO[CUR_W].focus} ${WEEK_INFO[CUR_W].desc}</p></div>
<div class="c">${ct("next", "Next week", `<span class="m small">Week ${CUR_W + 1}</span>`)}<div class="h2" style="font-size:15px">${WEEKS[CUR_W].title}</div><p class="sub" style="margin-top:4px">${WEEK_INFO[CUR_W + 1].focus}</p></div>
<div class="c">${ct("flag", "Key dates")}<div class="rows">${up.map(([w, d, i, t]) => row(i, t, `${WD(w, d)} · ${fd(wday(w, d))}`, "", "")).join("")}</div></div>
<div class="c">${ct("sun", "Holidays")}<div class="rows">${hols}</div></div>
<div class="c">${ct("ride", "Ride-alongs", btn(ic("plus") + "Request", "riderq", "", "xs gh"))}<p class="sub" style="margin-top:0">${RIDES.length} rides with your field mentor, starting ${fd(wday(3, 1))}.</p>${S.rideReqs.map(r => row("ride", "Ride-along request", r.label, pill("b", "Requested"))).join("")}</div></div></div>`;
}
/* ---- progress & cert ---- */
function nextCp() {
  if (S.exam.state !== "evaluated") return { id: "scc", t: "Safety Competency Check", when: `${WD(3, 4)} · ${fd(wday(3, 4))}`, s: "25 questions · pass mark 80% · your instructor marks it", to: S.exam.state === "submitted" ? ["View status", "#/exam"] : [S.exam.state === "progress" ? "Continue exam" : "Start exam (demo)", "#/exam"] };
  if (S.l1.state !== "released") return { id: "l1w6", t: "Feedback + ride review", when: `${WD(6, 4)} · ${fd(wday(6, 4))}`, s: "You give quick feedback · your instructor scores your rides", to: S.l1.state === "submitted" ? ["View status", "#/l1"] : ["Open (demo)", "#/l1"] };
  return { id: "cap", t: "Capstone", when: `${WD(7, 4)} · ${fd(wday(7, 4))}`, s: "Written exam + practical", to: null };
}
function vProgress() {
  const b = behind(), late = Object.keys(S.late).filter(k => S.lessons[k] === "d").length, C = 2 * Math.PI * 50, nc = nextCp();
  const top = `<div class="c"><div class="ringwrap"><div class="ring" style="width:120px;height:120px"><svg width="120" height="120"><circle cx="60" cy="60" r="50" fill="none" stroke="#edf1f5" stroke-width="12"/><circle cx="60" cy="60" r="50" fill="none" stroke="#0568ae" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - overall() / 100)}" transform="rotate(-90 60 60)"/></svg><b>${overall()}%</b></div>
<div style="flex:1"><div class="eyebrow">You're on ${WD(CUR_W, CUR_D)} of 9 weeks</div><div class="h2" style="font-size:21px;margin-top:4px">On track for graduation on Fri, Jan 8</div>
<div class="stats"><div><span>Learning items done</span><b>${doneCount()} of ${TOTAL}</b></div><div><span>Checkpoints passed</span><b>${cpPassed()} of 5</b></div><div><span>${b.length ? "Behind right now" : "Done late"}</span><b style="color:${b.length ? "#b53232" : "var(--navy)"}">${b.length ? b.length : late} item${(b.length || late) === 1 ? "" : "s"}</b></div></div></div></div></div>`;
  const next = `<div class="nextcp"><span class="ico">${ic("shield")}</span><div class="t"><div class="k">Next checkpoint · ${nc.when}</div><b>${nc.t}</b><span>${nc.s}</span></div>${nc.to ? go(nc.to[1], ic("play") + nc.to[0], "") : pill("x", "Opens " + fs(wday(7, 4)))}</div>`;
  const cps = CHECKPOINTS.map(c => { const [cc, cl] = cpStatus(c.id); const to = c.id === "scc" ? "#/exam" : c.id === "l1w6" ? "#/l1" : null;
    return row(c.kind === "exam" ? "shield" : "ride", c.title, `${WD(c.week, c.day)} · ${fd(wday(c.week, c.day))} · ${c.kind === "exam" ? "exam you take · instructor marks" : "your feedback · instructor scores your rides"}`, pill(cc, cl) + (to ? ` <span class="ib s">${ic("chev")}</span>` : ""), "", to ? `data-act="go" data-to="${to}"` : ""); }).join("");
  const cert = [["All lessons & labs", `${doneCount()} of ${TOTAL}`, "b", "In progress"], ["Safety Competency Check ≥ 80%", WD(3, 4), sccPassed() ? "g" : S.exam.state === "evaluated" ? "r" : "x", sccPassed() ? "Met" : S.exam.state === "evaluated" ? "Retake" : "Upcoming"], ["15 field mentor rides", "From Week 3", "x", "Upcoming"], ["3 ride reviews ≥ 3 / 5", "Weeks 6, 8, 9", l1Passed() ? "b" : "x", l1Passed() ? "1 of 3" : "Upcoming"], ["Capstone passed", WD(7, 4), "x", "Upcoming"], ["Mentor sign-off", "After Week 9", "x", "Upcoming"]];
  const weeks = WEEKS.map(w => { const p = weekPct(w.n), open = w.n <= CUR_W; return `<div class="row ${open ? "clk" : ""}" ${open ? `data-act="week" data-w="${w.n}"` : ""}><div class="ico" style="width:30px;height:30px;font-weight:900;font-size:12px">${w.n < CUR_W ? ic("check", 14) : open ? w.n : ic("lock", 13)}</div><div class="rm"><b>Week ${w.n} · ${open ? w.title : "Locked"}</b><span>${open ? WEEK_INFO[w.n].theme + " · " + WEEK_INFO[w.n].focus : "Opens " + fs(wday(w.n, 1))}</span></div><div style="width:120px">${bar(p)}</div><span class="m small" style="width:38px;text-align:right">${p}%</span></div>`; }).join("");
  return `<div class="hd"><div><div class="h1">Progress &amp; Certification</div><div class="sub">Where you stand, your checkpoints, and what you need to certify.</div></div><div class="r">${go("#/overview", ic("file") + "My learning report", "gh")}</div></div>${top}${next}
<div class="g g2"><div class="c">${ct("shield", "Checkpoints", `${cpPassed()} of 5 passed`)}<div class="rows">${cps}</div>
<details class="more"><summary>${ic("chevd", 13)} What you need to certify</summary><div class="rows" style="margin-top:6px">${cert.map(([t, s, c, l]) => row("check", t, s, pill(c, l), "")).join("")}</div></details></div>
<div class="c">${ct("cal", "By week", lnk("#/plan", "9-week plan " + ic("chev")))}<div class="rows">${weeks}</div></div></div>`;
}
/* ---- exam ---- */
function vExam() {
  const E = S.exam, top = crumbs([["#/progress", "Progress & Cert."], [null, "Safety Competency Check"]]);
  if (E.state === "idle") return `${top}<div class="c"><div class="eyebrow">${WD(3, 4)} checkpoint · unlocked for the demo</div><div class="h1" style="margin:6px 0 8px">Safety Competency Check</div><p class="sub" style="font-size:14.5px;max-width:640px">25 multiple-choice questions on what you learned in Weeks 1–2. You have 45 minutes and need 80% to pass. Tomás Nguyen marks it and releases your score.</p><div style="margin-top:18px">${btn(ic("play") + "Start exam", "estart")}</div></div>`;
  if (E.state === "progress") {
    const qq = EXAM[E.idx], n = Object.keys(E.ans).length;
    return `${top}<div class="hd"><div class="h2">Question ${E.idx + 1} of ${EXAM.length}</div><div class="r">${pill("b", `<span id="timer">${Math.floor(E.secs / 60)}:${String(E.secs % 60).padStart(2, "0")}</span>&nbsp;left`)}</div></div>${bar(pct(n, EXAM.length))}
<div class="q"><div class="qn">${EXAM_SECTIONS[qq[0]]}</div><b class="qt">${esc(qq[1])}</b>${qq[2].map((o, k) => `<div class="opt ${E.ans[E.idx] === k ? "sel" : ""}" data-act="ans" data-k="${k}"><span class="rd"></span>${esc(o)}</div>`).join("")}
<div style="display:flex;gap:10px;margin-top:18px">${btn(ic("chevl") + "Back", "qp", "", E.idx ? "gh" : "dis")}<span style="margin-left:auto"></span>${E.idx < EXAM.length - 1 ? btn("Next " + ic("chev"), "qn") : btn(ic("check") + "Submit", "esub")}</div></div>
<div class="c"><div class="m small" style="margin-bottom:10px">${n} of ${EXAM.length} answered · tap a number to jump</div><div class="qdots">${EXAM.map((_, i) => `<span class="${i === E.idx ? "cur" : E.ans[i] !== undefined ? "a" : ""}" data-act="qg" data-i="${i}">${i + 1}</span>`).join("")}</div></div>`;
  }
  if (E.state === "submitted") return `${top}<div class="c" style="text-align:center;padding:36px"><div class="h1">Submitted</div><p class="sub">Tomás Nguyen is marking your exam. You'll be notified when your score is ready.</p><div class="note" style="margin-top:18px;text-align:left"><b>Demo:</b> marking happens in the instructor's portal. ${btn("Simulate instructor marking", "eeval", "", "xs gh")}</div></div>`;
  const sc = examScore(), pass = sc.pct >= 80, C = 2 * Math.PI * 44;
  const miss = sc.missed.map(i => { const qq = EXAM[i], l = lesson(qq[4]); return row("warn", esc(qq[1]), `Correct answer: ${esc(qq[2][qq[3]])}`, l ? btn("Review lesson", "launch", `data-id="${l.id}"`, "xs gh") : "", "red"); }).join("");
  return `${top}<div class="c"><div class="ringwrap"><div class="ring" style="width:110px;height:110px"><svg width="110" height="110"><circle cx="55" cy="55" r="44" fill="none" stroke="#edf1f5" stroke-width="10"/><circle cx="55" cy="55" r="44" fill="none" stroke="${pass ? "#2ca01c" : "#d64545"}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - sc.pct / 100)}" transform="rotate(-90 55 55)"/></svg><b>${sc.pct}%</b></div>
<div>${pill(pass ? "g" : "r", pass ? "Passed" : "Not passed")}<div class="h1" style="margin-top:8px">Safety Competency Check</div><p class="sub">${sc.ok} of ${EXAM.length} correct · pass mark 80% · marked by Tomás Nguyen</p>${pass ? "" : `<p class="sub">Your instructor will go through it with you. A second attempt opens the next day.</p><div style="margin-top:10px">${btn("Try again (demo)", "eretry", "", "xs gh")}</div>`}</div></div></div>
${sc.missed.length ? `<div class="c">${ct("warn", "Questions to review", sc.missed.length + " missed")}<div class="rows">${miss}</div></div>` : ""}`;
}
/* ---- feedback + ride review ---- */
function vL1() {
  const L = S.l1.state, top = crumbs([["#/progress", "Progress & Cert."], [null, "Feedback + ride review · Week 6"]]);
  const s2 = L === "idle" ? "cur" : "d", s3 = L === "submitted" ? "cur" : L === "released" ? "d" : "", s4 = L === "released" ? "d" : "";
  const steps = `<div class="c"><div class="steps">${[["d", "Ride with your mentor", "Done", "g", "You + mentor"], [s2, "Your quick feedback", "4 questions · not graded", "b", "You"], [s3, "Ride score", "8 criteria", "y", "Instructor"], [s4, "Result", "Pass = 3 out of 5 or more", "y", "Instructor"]].map(([c, b, s, pc, who], i) => `<div class="stp ${c}"><span class="o">${c === "d" ? ic("check") : i + 1}</span><b>${b}</b><span>${s}</span>${pill(pc, who)}</div>`).join("")}</div></div>`;
  const head = `${top}<div><div class="h1">Feedback + ride review</div><p class="sub" style="font-size:14.5px;max-width:720px">You tell us how training is going. Tomás Nguyen scores the rides you did with your mentor. <b>There's no exam here</b> — your result comes from the ride score.</p></div>${steps}`;
  if (L === "idle") return `${head}<div class="c">${L1Q.map((x, i) => `<div style="margin-top:${i ? 22 : 0}px"><b style="color:var(--navy)">${i + 1}. ${x[1]}</b> <span class="m small">${x[2] ? "· required" : "· optional"}</span>${x[0] === "text" ? `<textarea class="ta" data-l1t="${i}" placeholder="Type here (optional)">${esc(S.l1.ans[i] || "")}</textarea>` : `<div class="scale">${[1, 2, 3, 4, 5].map(v => `<span class="${S.l1.ans[i] === v ? "sel" : ""}" data-act="l1a" data-i="${i}" data-v="${v}">${v}</span>`).join("")}</div><div class="m small" style="display:flex;justify-content:space-between;margin-top:4px"><span>Disagree</span><span>Agree</span></div>`}</div>`).join("")}<div style="margin-top:22px;text-align:right">${btn(ic("check") + "Send feedback", "l1send")}</div></div>`;
  if (L === "submitted") return `${head}<div class="c" style="text-align:center;padding:32px"><div class="h2">Thanks — your feedback is in.</div><p class="sub">Tomás Nguyen is now scoring your rides. You'll be notified when your result is ready.</p><div class="note" style="margin-top:16px;text-align:left"><b>Demo:</b> scoring happens in the instructor's portal. ${btn("Simulate instructor scoring", "l1rel", "", "xs gh")}</div></div>`;
  return `${head}<div class="c">${ct("ride", "Ride score: 4.1 out of 5", pill("g", "Passed"))}<div class="rows">${RIDE_CRITERIA.map(([c, v]) => `<div class="row"><div class="rm"><b style="font-weight:600">${c}</b></div><span>${[0, 1, 2, 3, 4].map(j => `<span class="crit ${j < v ? "on" : ""}"></span>`).join("")}</span><b style="width:36px;text-align:right;color:var(--navy)">${v}/5</b></div>`).join("")}</div>
<div class="bub"><b>Tomás Nguyen</b>Solid on safety and talking to the customer. Practise the ONT activation steps and keep a tighter pace on your second job.</div></div>`;
}
/* ---- learning overview (report) ---- */
function vOverview() {
  const b = behind(), late = Object.keys(S.late).filter(k => S.lessons[k] === "d").length;
  const weeks = WEEKS.map(w => { const p = weekPct(w.n); return row(w.n < CUR_W ? "check" : w.n === CUR_W ? "cal" : "lock", `Week ${w.n} · ${w.n <= CUR_W ? w.title : "Locked"}`, w.n <= CUR_W ? `${fs(wday(w.n, 1))} – ${fs(wday(w.n, 5))} · ${WEEK_INFO[w.n].theme}` : `${fs(wday(w.n, 1))} – ${fs(wday(w.n, 5))}`, `<div style="width:110px">${bar(p)}</div><span class="m small" style="width:38px;text-align:right">${p}%</span>`); }).join("");
  const cps = CHECKPOINTS.map(c => { const [cc, cl] = cpStatus(c.id); return row(c.kind === "exam" ? "shield" : "ride", c.title, `${WD(c.week, c.day)} · ${fd(wday(c.week, c.day))}`, pill(cc, cl)); }).join("");
  const hist = ALL().filter(l => l.status === "b" || (l.status === "d" && S.late[l.id])).map(l => row(l.status === "b" ? "warn" : "clock", esc(l.title), WD(l.week, l.day), pill(l.status === "b" ? "r" : "a", l.status === "b" ? "Behind" : "Done late"), l.status === "b" ? "red" : "")).join("") || row("check", "Nothing late or behind", "");
  const rideRows = RIDES.map((r, i) => { const sc = rideScore(r); return `<tr><td class="m">${i + 1}</td><td><b>${WD(r.w, r.d)}</b><div class="m small">${fd(wday(r.w, r.d))}</div></td><td>${r.type}</td><td>${r.mentor}</td><td>${sc ? `<b>${sc} / 5</b>` : '<span class="m">—</span>'}</td><td>${sc ? pill("g", "Scored") : pill("x", "Upcoming")}</td></tr>`; }).join("");
  const reviews = CHECKPOINTS.filter(c => c.kind === "ride").map(c => { const [cc, cl] = cpStatus(c.id); return row("ride", `Ride review · Week ${c.week}`, `${fd(wday(c.week, c.day))} · scored by Tomás Nguyen on 8 criteria`, pill(cc, cl)); }).join("");
  const avg = rideAvg();
  return `<div class="hd"><div><div class="h1">Learning Overview</div><div class="sub">Your complete record in one place — export it for your manager or HR.</div></div><div class="r no-print">${btn(ic("dl") + "Export CSV", "csv", "", "gh")}${btn(ic("file") + "Download PDF", "pdf")}</div></div>
<div class="c"><div class="ringwrap"><div class="ico av" style="background:#0568ae;width:56px;height:56px;font-size:17px">DJ</div><div style="flex:1"><div class="h2">Dane Johnson</div><p class="sub">Reimagined New Hire Training · FF-DAL-2611 · Dallas · instructor Tomás Nguyen · mentor Rob Castillo · manager Priya Rao</p>
<div class="stats four"><div><span>Overall</span><b>${overall()}%</b></div><div><span>Learning items</span><b>${doneCount()} of ${TOTAL}</b></div><div><span>Checkpoints</span><b>${cpPassed()} of 5</b></div><div><span>Ride-alongs</span><b>${ridesDone()} of ${RIDES.length}${avg ? ` · avg ${avg}` : ""}</b></div></div></div></div></div>
<div class="g g2"><div class="c">${ct("cal", "Week by week")}<div class="rows">${weeks}</div></div><div class="g" style="align-content:start"><div class="c">${ct("shield", "Checkpoints")}<div class="rows">${cps}</div></div><div class="c">${ct("warn", "Late & behind", `${b.length} behind · ${late} done late`)}<div class="rows">${hist}</div></div></div></div>
<div class="c">${ct("ride", "Ride-alongs & scores", `${ridesDone()} of ${RIDES.length} logged${avg ? " · average " + avg + " / 5" : ""}`)}<p class="sub" style="margin:-4px 0 12px">Your mentor logs each ride; your instructor scores the ride reviews in Weeks 6, 8 and 9.</p>
<div class="tw"><table><tr><th>#</th><th>Day</th><th>Type</th><th>Mentor</th><th>Score</th><th>Status</th></tr>${rideRows}</table></div>
<div class="lbl" style="margin-top:16px">Ride reviews</div><div class="rows">${reviews}</div></div>`;
}
/* ---- coaching & feedback: inbox ---- */
function vCoaching() {
  const all = COACH_NOTES(), f = S.coach.f || "all";
  const list = all.filter(n => f === "all" || (f === "action" && n.k === "alert" && !n.solved) || (f === "notes" && n.k === "note") || (f === "mine" && n.k === "ask"));
  const sel = all.find(n => n.id === S.coach.sel) || list[0];
  const tag = n => n.k === "alert" ? pill(n.solved ? "g" : "r", n.solved ? "Resolved" : "Action needed") : n.k === "ask" ? pill("b", "Sent") : S.coach.ack[n.id] ? "" : pill("b", "New");
  const segs = [["all", "All", all.length], ["action", "Needs action", all.filter(n => n.k === "alert" && !n.solved).length], ["notes", "Notes", all.filter(n => n.k === "note").length], ["mine", "My requests", all.filter(n => n.k === "ask").length]].map(([k, t, n]) => `<span class="${f === k ? "on" : ""}" data-act="cf" data-v="${k}">${t} · ${n}</span>`).join("");
  const items = list.map(n => `<div class="ci ${sel && sel.id === n.id ? "on" : ""} ${!S.coach.ack[n.id] && n.k !== "ask" ? "unread" : ""}" data-act="csel" data-id="${n.id}"><span class="ico ${n.k === "alert" ? "red" : ""}" style="width:32px;height:32px">${ic(n.k === "alert" ? "warn" : n.k === "ask" ? "user" : "msg", 15)}</span><div class="t"><div class="ci-h"><b>${n.title}</b><small>${n.date}</small></div><span>${esc(n.text)}</span>${n.k === "alert" || n.k === "ask" ? `<div style="margin-top:6px">${tag(n)}</div>` : ""}</div></div>`).join("") || '<div class="empty">Nothing here.</div>';
  const det = sel ? `<div class="cdet"><div class="cd-h"><div><div class="h2">${sel.title}</div><div class="m small">${sel.who} · ${sel.date}${sel.tagline ? " · " + sel.tagline : ""}</div></div>${tag(sel)}</div>
<div class="bub"><b>${sel.k === "ask" ? "You" : "Tomás Nguyen"}</b>${esc(sel.text)}</div>${(S.coach.replies[sel.id] || []).map(r => `<div class="bub me"><b>You</b>${esc(r)}</div>`).join("")}
${sel.k !== "ask" ? `<div class="cact">${sel.cta || ""}${!S.coach.ack[sel.id] && !(sel.k === "alert" && sel.solved) ? btn(ic("check") + "Got it", "ack", `data-id="${sel.id}"`, "xs gh") : ""}${btn(ic("msg") + "Reply", "reply", `data-id="${sel.id}"`, "xs gh")}</div>` : '<p class="m small" style="margin-top:10px">Tomás Nguyen will reply here.</p>'}</div>` : "";
  return `<div class="hd"><div><div class="h1">Coaching &amp; Feedback</div><div class="sub">Notes from your instructor, automatic alerts when a day closes with work unfinished, and your requests for help.</div></div><div class="r">${btn(ic("plus") + "Ask for help", "ask")}</div></div>
<div><div class="seg">${segs}</div></div><div class="inbox c"><div class="ilist">${items}</div>${det}</div>`;
}
/* ---- people ---- */
function vPeople() {
  const k = (S.pplQ || "").toLowerCase(), list = COHORT_ALL.filter(n => n.toLowerCase().includes(k)), per = 9, pages = Math.max(1, Math.ceil(list.length / per));
  if (S.pplPage > pages) S.pplPage = pages; const pg = S.pplPage;
  const names = list.slice((pg - 1) * per, pg * per).map(n => { const me = n.includes("(you)"); return `<div class="pp"><div class="ico av" style="background:${me ? "#0568ae" : "#8aa4bb"};width:32px;height:32px">${n.replace(" (you)", "").split(" ").map(x => x[0]).join("")}</div><b>${n}</b>${me ? pill("b", "You") : `<span class="ib s" data-act="peer" data-n="${n}" title="Message on Teams">${ic("msg")}</span>`}</div>`; }).join("") || '<div class="empty">No one matches.</div>';
  const pager = `<div class="pager"><span class="m">${list.length} people</span><span class="ib s ${pg === 1 ? "dis" : ""}" data-act="pp" data-v="-1">${ic("chevl")}</span>${Array.from({ length: pages }, (_, i) => `<span class="pgn ${i + 1 === pg ? "on" : ""}" data-act="pg" data-v="${i + 1}">${i + 1}</span>`).join("")}<span class="ib s ${pg === pages ? "dis" : ""}" data-act="pp" data-v="1">${ic("chev")}</span></div>`;
  return `<div class="hd"><div><div class="h1">People</div><div class="sub">The people helping you through the program, and your cohort.</div></div></div>
<div class="g g3">${TEAM.map(p => `<div class="c"><div style="display:flex;gap:12px;align-items:center"><div class="ico av" style="background:${p.color};width:46px;height:46px;font-size:14px">${p.ini}</div><div><b style="color:var(--navy);font-size:15px">${p.name}</b><div>${pill("x", p.role)}</div></div></div><p class="sub">${p.desc}</p><div style="margin-top:12px">${btn(ic("msg") + "Message", "message", `data-p="${p.id}"`, "xs gh")}</div></div>`).join("")}</div>
<div class="c">${ct("users", "Your cohort · FF-DAL-2611", `<div class="cinput">${ic("search")}<input id="psearch" placeholder="Find a name" value="${esc(S.pplQ)}"></div>`)}<div class="pgrid">${names}</div>${pager}<p class="m small" style="margin-top:8px">${ic("lock", 12)} Names only — other trainees' progress is private.</p></div>`;
}
function vResources() {
  const cats = ["All", ...new Set(RESOURCES.map(r => r.cat))], list = RESOURCES.filter(r => S.resCat === "All" || r.cat === S.resCat);
  return `<div class="hd"><div><div class="h1">Resources</div><div class="sub">Guides, tools and links for your training.</div></div></div><div><div class="seg">${cats.map(c => `<span class="${S.resCat === c ? "on" : ""}" data-act="rcat" data-v="${c}">${c}</span>`).join("")}</div></div>
<div class="c"><div class="rows">${list.map(r => `<a class="row clk" style="text-decoration:none" href="${GFG}?resource=${encodeURIComponent(r.title)}" target="_blank" rel="noopener"><div class="ico">${ic(I[r.icon] ? r.icon : "file")}</div><div class="rm"><b>${r.title}</b><span>${r.cat} · ${r.sub}</span></div><span class="ib s">${ic("ext")}</span></a>`).join("")}</div></div>`;
}
/* ================= render ================= */
const VIEWS = { flow: vFlow, dashboard: vDashboard, plan: vPlan, climb: vClimb, day: vDay, courses: vCourses, course: a => vCourse(a || "c2"), schedule: vSchedule, progress: vProgress, exam: vExam, l1: vL1, overview: vOverview, coaching: vCoaching, people: vPeople, resources: vResources };
let lastKey = "";
function render() {
  const { r, a } = parse(), v = VIEWS[r] || vFlow, key = r + "/" + (a || "");
  const old = document.getElementById("sc"), keep = key === lastKey && old ? old.scrollTop : 0;
  const idx = FLOW.findIndex(f => f[0] === "#/" + key.replace(/\/$/, "")); if (idx >= 0) S.step = idx;
  document.getElementById("root").innerHTML = shell(r, a, v(a)) + pbar(r, idx);
  document.body.classList.toggle("dark", !!S.dark);
  const sc = document.getElementById("sc"); if (sc) sc.scrollTop = keep;
  lastKey = key;
  if (S._scrollTo) { const el = document.getElementById(S._scrollTo); if (el) el.scrollIntoView({ block: "center" }); S._scrollTo = null; }
  if (q) { const i = document.getElementById("gq"); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
  save(); FB.pins();
}
function pbar(r, idx) {
  const nxt = r === "flow" ? FLOW[0] : idx >= 0 ? FLOW[idx + 1] : null, open = FB.list().filter(f => !f.resolved).length;
  return `<div class="pbar"><span class="tag">PROTOTYPE</span><span>Today: <b>Tue, Nov 10 2026</b> · ${WD(CUR_W, CUR_D)}</span>${idx >= 0 ? `<span>· Step <b>${idx + 1} of ${FLOW.length}</b></span>` : ""}
<span style="margin-left:auto"></span><span class="pb-btn fb ${FB.on ? "on" : ""}" data-act="fbmode">${ic("comment")}${FB.on ? "Feedback mode ON" : "Feedback mode"}</span><span class="pb-btn" data-act="fbpanel">${ic("list")}Comments${open ? " · " + open : ""}</span><span class="pb-btn" data-act="go" data-to="#/flow">${ic("map")}Flow map</span>${idx > 0 ? `<span class="pb-btn" data-act="go" data-to="${FLOW[idx - 1][0]}">${ic("chevl")}Back</span>` : ""}${nxt ? `<span class="pb-btn nx" data-act="go" data-to="${nxt[0]}">Next: ${nxt[1]}${ic("chev")}</span>` : ""}<span class="pb-btn" data-act="reset">${ic("refresh")}Reset</span></div>`;
}
/* ================= modals & toasts ================= */
function modal(html) { closeModal(); const d = document.createElement("div"); d.className = "ovl"; d.id = "ovl"; d.innerHTML = `<div class="modal">${html}</div>`; d.addEventListener("click", e => { if (e.target === d) closeModal(); }); document.body.appendChild(d); }
function closeModal() { const o = document.getElementById("ovl"); if (o) o.remove(); }
const mhead = (i, t, s, cls = "") => `<div class="mh"><div class="ico ${cls}" style="width:42px;height:42px;border-radius:12px">${ic(i, 20)}</div><div><h3>${t}</h3><p>${s}</p></div><span class="ib s x" data-act="close">${ic("x")}</span></div>`;
function toast(msg, icon = "check") { let t = document.getElementById("toasts"); if (!t) { t = document.createElement("div"); t.id = "toasts"; t.className = "toasts"; document.body.appendChild(t); } const e = document.createElement("div"); e.className = "toast"; e.innerHTML = ic(icon) + `<span>${msg}</span>`; t.appendChild(e); setTimeout(() => e.remove(), 3200); }
const notify = (t, s, g) => S.notifs.unshift({ t, s, unread: true, go: g });
const dl = (txt, name, type) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], { type })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
function launch(id) {
  const l = lesson(id); if (!l) return;
  if (l.type === "lab" || l.type === "field") return A.lab({ id });
  if (l.status === "l") return toast(`This lesson opens on ${fd(wday(l.week, l.day))}`, "lock");
  const url = `${GFG}?lesson=${encodeURIComponent(l.title)}&course=${l.code}`;
  modal(mhead("ext", "Open lesson", `${esc(l.title)} · ${TY[l.type]} · ${hm(l.min)}`) + `<div class="mb"><div class="redir"><div class="gfg">GfG</div><div style="flex:1"><b style="color:var(--navy)">geeksforgeeks.org</b><div class="m small">Stands in for the learning system · opens in a new tab</div></div></div><p>When you've finished the lesson and its short quiz, come back here and mark it done.</p></div><div class="mf"><span class="btn gh" data-act="close">Cancel</span><a class="btn" href="${url}" target="_blank" rel="noopener" data-act="opened" data-id="${id}">${ic("ext")}Open lesson</a></div>`);
}
let timer = null;
function startTimer() { clearInterval(timer); timer = setInterval(() => { if (S.exam.state !== "progress") return clearInterval(timer); S.exam.secs = Math.max(0, S.exam.secs - 1); const t = document.getElementById("timer"); if (t) t.textContent = `${Math.floor(S.exam.secs / 60)}:${String(S.exam.secs % 60).padStart(2, "0")}`; if (!S.exam.secs) A.econf(); }, 1000); }
/* ================= CLIENT FEEDBACK LAYER =================
   Feedback mode: click any element → leave a comment pinned to it.
   Stored in Postgres through /api/feedback; falls back to this browser if the API isn't reachable. */
const FB = {
  on: false, KEY: "fa-feedback-v1", remote: null, status: "local", // local | ok | err
  list() { return this.remote || this.local(); },
  local() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
  storeLocal(arr) { try { localStorage.setItem(this.KEY, JSON.stringify(arr)); } catch (e) {} },
  async api(method, body, id) {
    const url = FEEDBACK_ENDPOINT + (id ? `?id=${encodeURIComponent(id)}` : "");
    const r = await fetch(url, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
    if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || r.statusText);
    return r.json();
  },
  async load(silent) {
    if (!FEEDBACK_ENDPOINT || location.protocol === "file:") { this.status = "local"; return; }
    try { const a = await this.api("GET"); if (Array.isArray(a)) { this.remote = a; this.status = "ok"; render(); if (document.getElementById("fbpanel")) this.panel(true); } }
    catch (e) { this.status = "err"; if (!silent) toast("Couldn't reach the feedback database — comments are saved in this browser for now.", "warn"); }
  },
  async create(item) {
    if (this.status === "ok") { try { await this.api("POST", item); await this.load(true); return true; } catch (e) { toast("Couldn't save to the database: " + e.message, "warn"); return false; } }
    const arr = this.local(); arr.push(item); this.storeLocal(arr); render(); return true;
  },
  async update(item) {
    if (this.status === "ok") { try { await this.api("PUT", item, item.id); await this.load(true); return; } catch (e) { return toast("Couldn't update: " + e.message, "warn"); } }
    const arr = this.local(), i = arr.findIndex(f => f.id === item.id); if (i >= 0) arr[i] = item; this.storeLocal(arr); render(); if (document.getElementById("fbpanel")) this.panel(true);
  },
  async remove(id) {
    if (this.status === "ok") { try { await this.api("DELETE", null, id); await this.load(true); toast("Comment deleted.", "trash"); return; } catch (e) { return toast("Couldn't delete: " + e.message, "warn"); } }
    this.storeLocal(this.local().filter(f => f.id !== id)); render(); if (document.getElementById("fbpanel")) this.panel(true); toast("Comment deleted.", "trash");
  },
  path(el) { const wrap = document.getElementById("wrap"), p = []; while (el && el !== wrap) { const par = el.parentElement; if (!par) return null; p.unshift([...par.children].indexOf(el)); el = par; } return el === wrap ? p.join(".") : null; },
  find(path) { let el = document.getElementById("wrap"); if (!el) return null; if (path === "") return el; for (const i of path.split(".")) el = el && el.children[+i]; return el || null; },
  label(el) { const t = (el.innerText || el.tagName).trim().replace(/\s+/g, " "); return t.slice(0, 70) + (t.length > 70 ? "…" : ""); },
  screen() { const h = location.hash, f = FLOW.find(x => x[0] === h); return f ? f[1] : h.replace("#/", ""); },
  pins() {
    document.querySelectorAll(".fbpin").forEach(p => p.remove());
    const sc = document.getElementById("sc"); if (!sc) return; const sr = sc.getBoundingClientRect();
    this.list().forEach((f, i) => { if (f.route !== location.hash) return; const el = this.find(f.path); if (!el) return; const r = el.getBoundingClientRect();
      const pin = document.createElement("div"); pin.className = "fbpin" + (f.resolved ? " res" : ""); pin.textContent = i + 1; pin.title = f.text;
      pin.style.left = (r.left - sr.left + Math.min(r.width - 14, Math.max(0, f.rx * r.width)) - 6) + "px"; pin.style.top = (r.top - sr.top + sc.scrollTop + Math.min(r.height - 14, Math.max(0, f.ry * r.height)) - 20) + "px";
      pin.onclick = e => { e.stopPropagation(); FB.view(f.id, e.clientX, e.clientY); }; sc.appendChild(pin); });
  },
  pop(html, x, y) { this.closePop(); const d = document.createElement("div"); d.className = "fbpop"; d.id = "fbpop"; d.innerHTML = html; d.style.left = Math.max(10, Math.min(window.innerWidth - 340, x + 10)) + "px"; d.style.top = Math.max(10, Math.min(window.innerHeight - 300, y + 10)) + "px"; document.body.appendChild(d); const t = d.querySelector("textarea"); if (t) t.focus(); },
  closePop() { const p = document.getElementById("fbpop"); if (p) p.remove(); },
  add(el, e) {
    const path = this.path(el); if (path === null) return toast("Click inside the page content to comment.", "comment");
    const r = el.getBoundingClientRect(); this._p = { path, rx: (e.clientX - r.left) / r.width, ry: (e.clientY - r.top) / r.height, label: this.label(el) };
    this.pop(`<b>Add feedback</b><div class="m">On: “${esc(this._p.label)}”</div><textarea id="fbtxt" placeholder="What should change here?"></textarea><input id="fbname" placeholder="Your name" value="${esc(localStorage.getItem("fa-fb-name") || "")}"><div style="display:flex;gap:8px;margin-top:10px;justify-content:flex-end"><span class="btn xs gh" data-fb="cancel">Cancel</span><span class="btn xs" data-fb="save">Save comment</span></div>`, e.clientX, e.clientY);
  },
  async save() {
    const t = document.getElementById("fbtxt").value.trim(), n = document.getElementById("fbname").value.trim() || "Reviewer"; if (!t) return toast("Write a comment first.", "warn");
    localStorage.setItem("fa-fb-name", n);
    const item = Object.assign({ id: "fb" + Date.now() + Math.random().toString(36).slice(2, 6), route: location.hash, screen: this.screen(), text: t, name: n, ts: new Date().toISOString(), resolved: false }, this._p);
    this.closePop(); if (await this.create(item)) toast("Comment saved.", "comment");
  },
  view(id, x, y) { const arr = this.list(), f = arr.find(z => z.id === id), n = arr.indexOf(f) + 1;
    this.pop(`<b>#${n} · ${esc(f.name)}</b><div class="m">${new Date(f.ts).toLocaleString()} · on “${esc(f.label)}”</div><p style="margin:8px 0;font-size:13.5px">${esc(f.text)}</p><div style="display:flex;gap:8px;justify-content:flex-end"><span class="btn xs gh" data-fb="del" data-id="${id}">${ic("trash")}Delete</span><span class="btn xs gh" data-fb="res" data-id="${id}">${f.resolved ? "Reopen" : "Resolve"}</span><span class="btn xs" data-fb="cancel">Close</span></div>`, x, y); },
  confirmDelete(id) {
    const f = this.list().find(z => z.id === id); if (!f) return; this.closePop();
    modal(mhead("trash", "Delete this comment?", "This can't be undone", "red") + `<div class="mb"><div class="bub" style="margin-top:0"><b>${esc(f.name)} · ${esc(f.screen)}</b>${esc(f.text)}</div><p class="m small">${this.status === "ok" ? "It will be removed from the shared database for everyone who reviews this prototype." : "It will be removed from this browser."}</p></div><div class="mf"><span class="btn gh" data-fb="nodel">Cancel</span><span class="btn danger" data-fb="yesdel" data-id="${id}">${ic("trash")}Delete comment</span></div>`);
  },
  panel(refresh) {
    const ex = document.getElementById("fbpanel"); if (ex) { ex.remove(); if (!refresh) return; } else if (refresh) return;
    const arr = this.list(), d = document.createElement("div"); d.className = "fbpanel"; d.id = "fbpanel";
    const sync = this.status === "ok" ? `<span class="fbsync ok"><i></i>Shared online</span>` : this.status === "err" ? `<span class="fbsync err"><i></i>Offline · saved in this browser</span>` : `<span class="fbsync"><i></i>Saved in this browser</span>`;
    d.innerHTML = `<div class="h">${ic("comment")}<b>Comments</b><span class="m small">${arr.filter(f => !f.resolved).length} open · ${arr.length} total</span><span class="ib s" style="margin-left:auto" data-fb="refresh" title="Refresh">${ic("refresh")}</span><span class="ib s" data-fb="close">${ic("x")}</span></div>
<div class="bd">${arr.length ? arr.map((f, i) => `<div class="fbi ${f.resolved ? "res" : ""}"><div class="top3"><span class="n">${i + 1}</span><b style="color:var(--navy)">${esc(f.name)}</b><span>· ${esc(f.screen)}</span><span style="margin-left:auto">${new Date(f.ts).toLocaleDateString()}</span></div><p>${esc(f.text)}</p><div class="m small">On “${esc(f.label)}”</div><div style="display:flex;gap:6px;margin-top:8px"><span class="btn xs gh" data-fb="goto" data-id="${f.id}">Show</span><span class="btn xs gh" data-fb="res" data-id="${f.id}">${f.resolved ? "Reopen" : "Resolve"}</span><span class="btn xs gh" data-fb="del" data-id="${f.id}">${ic("trash")}Delete</span></div></div>`).join("") : `<div class="empty">No comments yet. Turn on <b>Feedback mode</b> and click anything on a screen.</div>`}</div>
<div class="ft"><span class="btn xs gh" data-fb="csv">${ic("dl")}CSV</span><span class="btn xs gh" data-fb="json">${ic("dl")}JSON</span><span style="margin-left:auto">${sync}</span></div>`;
    document.body.appendChild(d);
  },
  handle(t) {
    const k = t.dataset.fb, id = t.dataset.id;
    if (k === "cancel") return this.closePop();
    if (k === "save") return this.save();
    if (k === "close") return this.panel();
    if (k === "refresh") return this.load();
    if (k === "res") { const f = this.list().find(z => z.id === id); if (f) { this.closePop(); this.update(Object.assign({}, f, { resolved: !f.resolved })); } return; }
    if (k === "del") return this.confirmDelete(id);
    if (k === "nodel") return closeModal();
    if (k === "yesdel") { closeModal(); return this.remove(id); }
    if (k === "goto") { const f = this.list().find(z => z.id === id); location.hash = f.route; setTimeout(() => { const el = this.find(f.path); if (el) { el.scrollIntoView({ block: "center" }); el.animate([{ outline: "3px solid #f5b301" }, { outline: "3px solid transparent" }], { duration: 1600 }); } }, 150); return; }
    if (k === "csv") { const arr = this.list(); dl([["#", "Screen", "Element", "Comment", "Name", "Date", "Status", "Link"], ...arr.map((f, i) => [i + 1, f.screen, f.label, f.text, f.name, f.ts, f.resolved ? "Resolved" : "Open", location.origin + location.pathname + f.route])].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n"), "fiber-academy-feedback.csv", "text/csv"); return; }
    if (k === "json") return dl(JSON.stringify(this.list(), null, 2), "fiber-academy-feedback.json", "application/json");
  }
};
/* ================= actions ================= */
const A = {
  go: d => { closeModal(); openDD = null; q = ""; nav(d.to); },
  close: () => closeModal(),
  reset: () => { if (confirm("Reset demo progress? (Client comments are kept.)")) { clearInterval(timer); S = fresh(); openDD = null; save(); nav("#/flow"); render(); toast("Demo data reset"); } },
  dark: () => { S.dark = !S.dark; render(); },
  dd: d => { openDD = openDD === d.v ? null : d.v; render(); },
  readall: () => { S.notifs.forEach(n => n.unread = false); render(); },
  notif: d => { const n = S.notifs[d.i]; n.unread = false; openDD = null; nav(n.go); },
  cm: d => { let m = S.cal.m + +d.v, y = S.cal.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } if (y * 12 + m < 2026 * 12 + 10 || y * 12 + m > 2027 * 12) return toast("Your program runs Nov 2026 – Jan 2027", "cal"); S.cal = { y, m }; render(); },
  cmnow: () => { S.cal = { y: 2026, m: 10 }; render(); },
  cf: d => { S.coach.f = d.v; S.coach.sel = null; render(); },
  csel: d => { S.coach.sel = d.id; if (!d.id.startsWith("a") && !d.id.startsWith("q")) S.coach.ack[d.id] = true; render(); },
  coachopen: d => { S.coach.sel = d.id; S.coach.ack[d.id] = true; nav("#/coaching"); },
  week: d => { S.week = +d.w; if (parse().r !== "climb") nav("#/climb"); else render(); },
  planweek: d => { const w = +d.w; if (w <= CUR_W) return A.week(d); modal(mhead("lock", `Week ${w} · ${WEEKS[w - 1].title}`, `Opens ${opensOn(w, 1)}`) + `<div class="mb"><p><b style="color:var(--navy)">${WEEK_INFO[w].theme}.</b> ${WEEK_INFO[w].focus}</p><div class="note">This week's days and lessons unlock when you reach it.</div></div><div class="mf"><span class="btn" data-act="close">OK</span></div>`); },
  plancell: d => { const w = +d.w, dd = +d.d; if (isOpen(w, dd)) return nav(`#/day/${w}-${dd}`); const t = dayType(w, dd); modal(mhead("lock", `${t.label}`, `${WD(w, dd)} · opens ${opensOn(w, dd)}`) + `<div class="mb"><p>Part of <b style="color:var(--navy)">Week ${w} · ${WEEKS[w - 1].title}</b> — ${WEEK_INFO[w].focus}</p><div class="note">Details unlock when you reach this day.</div></div><div class="mf"><span class="btn" data-act="close">OK</span></div>`); },
  openDay: d => { closeModal(); nav(`#/day/${d.w}-${d.d}`); },
  tmod: d => { S.open[d.k] = d.v === "1"; render(); },
  showall: d => { S.showAll[d.k] = !S.showAll[d.k]; render(); },
  golesson: d => { const l = lesson(d.id); q = ""; const k = `${l.week}-${l.day}-${l.block}`; S.open[k] = true; S.showAll[k] = true; S._scrollTo = "row-" + l.id; nav(`#/day/${l.week}-${l.day}`); },
  cseg: d => { S.courseSeg = d.v; render(); },
  launch: d => launch(d.id),
  opened: d => { if (S.lessons[d.id] === "n") S.lessons[d.id] = "p"; setTimeout(() => { render(); const l = lesson(d.id); modal(mhead("okc", "Did you finish this lesson?", esc(l.title)) + `<div class="mb"><p>Mark it done once you've completed the lesson and its short quiz.</p></div><div class="mf"><span class="btn gh" data-act="close">Not yet</span><span class="btn" data-act="done" data-id="${d.id}">${ic("check")}Yes, I finished</span></div>`); }, 250); },
  done: d => { const was = S.lessons[d.id]; S.lessons[d.id] = "d"; if (was === "b") S.late[d.id] = true; closeModal(); render(); toast(was === "b" ? "Done — recorded as done late. You're caught up." : "Nice work — lesson done."); },
  lab: d => { const l = lesson(d.id); modal(mhead(l.type === "field" ? "ride" : "lab", l.title, `${WD(l.week, l.day)} · ${fd(wday(l.week, l.day))}`) + `<div class="mb"><div class="rows">${row("users", l.type === "field" ? "With your field mentor" : "With your instructor, Tomás Nguyen", l.type === "field" ? "Your mentor logs the ride" : "Your instructor marks attendance")}${l.room ? row("tool", "Dallas Training Center · " + l.room, "Bring your PPE") : ""}</div><div class="note">Labs and field days aren't completed in the portal — your instructor or mentor records them.</div></div><div class="mf"><span class="btn" data-act="close">Got it</span></div>`); },
  sday: d => { const w = +d.w, dd = +d.d;
    if (!isOpen(w, dd)) return modal(mhead("lock", `${WD(w, dd)} · ${fd(wday(w, dd))}`, "Locked") + `<div class="mb"><p>This day opens on ${opensOn(w, dd)}. You'll see what it covers then.</p></div><div class="mf"><span class="btn" data-act="close">OK</span></div>`);
    const [t, desc, take] = DAY_INFO[w][dd - 1], n = dStats(w, dd).total;
    modal(mhead("cal", `Day ${dd} · ${t}`, `${WD(w, dd)} · ${fd(wday(w, dd))}`) + `<div class="mb"><p>${desc}</p><div class="m small">${dayMeta(w, dd)}</div><div class="lbl" style="margin:4px 0 0">You'll take away</div>${takeList(take, true)}<div class="note"><b>Week ${w} focus:</b> ${WEEK_INFO[w].focus} ${WEEK_INFO[w].desc}</div></div><div class="mf"><span class="btn gh" data-act="close">Close</span>${n ? `<span class="btn" data-act="openDay" data-w="${w}" data-d="${dd}">Open this day ${ic("chev")}</span>` : ""}</div>`); },
  ics: () => { const W = CUR_W, p = n => String(n).padStart(2, "0"), dt = x => `${x.getFullYear()}${p(x.getMonth() + 1)}${p(x.getDate())}`;
    const body = [1, 2, 3, 4, 5].map(d => `BEGIN:VEVENT\r\nUID:fa-${W}-${d}-${Date.now()}\r\nDTSTAMP:${dt(new Date())}T000000\r\nDTSTART;VALUE=DATE:${dt(wday(W, d))}\r\nSUMMARY:Fiber Academy · ${WD(W, d)} · ${DAY_INFO[W][d - 1][0]}\r\nEND:VEVENT`).join("\r\n");
    dl(`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Fiber Academy//Trainee//EN\r\n${body}\r\nEND:VCALENDAR`, `fiber-academy-week-${W}.ics`, "text/calendar"); toast(`Week ${W} saved — open the file to add it to Outlook.`, "cal"); },
  riderq: () => modal(mhead("ride", "Request a ride-along", "Operations assigns a field mentor") + `<div class="mb"><div class="fld"><label>Day</label><select id="rqdate">${[3, 6, 8, 9].flatMap(w => [1, 2, 3, 5].map(d => `<option>${WD(w, d)} · ${fd(wday(w, d))}</option>`)).join("")}</select></div><div class="fld"><label>Note</label><textarea id="rqnote" rows="3" placeholder="e.g. extra practice on ONT activation"></textarea></div></div><div class="mf"><span class="btn gh" data-act="close">Cancel</span><span class="btn" data-act="riderqsend">Send request</span></div>`),
  riderqsend: () => { S.rideReqs.push({ label: document.getElementById("rqdate").value }); closeModal(); render(); toast("Ride-along request sent to Operations", "ride"); },
  csv: () => { const rows = [["Fiber Academy · learning report"], ["Trainee", "Dane Johnson"], ["Cohort", "FF-DAL-2611 · Dallas"], ["As of", "Tue, Nov 10 2026"], ["Overall %", overall()], ["Learning items done", doneCount() + " of " + TOTAL], ["Checkpoints passed", cpPassed() + " of 5"], [], ["Week", "Focus", "Progress %"], ...WEEKS.map(w => [w.n, w.n <= CUR_W ? w.title : "Locked", weekPct(w.n)]), [], ["Ride-along", "Date", "Type", "Mentor", "Score"], ...RIDES.map(r => [WD(r.w, r.d), fd(wday(r.w, r.d)), r.type, r.mentor, rideScore(r) || "Upcoming"]), [], ["Checkpoint", "When", "Status"], ...CHECKPOINTS.map(c => [c.title, WD(c.week, c.day), cpStatus(c.id)[1]]), [], ["Lesson", "Week", "Day", "Module", "Status"], ...ALL().filter(l => req(l) && l.week <= CUR_W).map(l => [l.title, l.week, l.day, MODULE_NAMES(l.week, l.day, l.block), { d: S.late[l.id] ? "Done late" : "Done", b: "Behind", p: "In progress", n: "To do", l: "Opens later" }[l.status]])];
    dl(rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n"), "fiber-academy-report.csv", "text/csv"); toast("Report downloaded.", "dl"); },
  pdf: () => { toast("Choose “Save as PDF” in the print window.", "dl"); setTimeout(() => window.print(), 300); },
  estart: () => { S.exam = { state: "progress", ans: {}, idx: 0, secs: 2700, attempt: S.exam.attempt || 1 }; startTimer(); render(); },
  ans: d => { S.exam.ans[S.exam.idx] = +d.k; render(); },
  qn: () => { S.exam.idx = Math.min(EXAM.length - 1, S.exam.idx + 1); render(); },
  qp: () => { S.exam.idx = Math.max(0, S.exam.idx - 1); render(); },
  qg: d => { S.exam.idx = +d.i; render(); },
  esub: () => { const n = Object.keys(S.exam.ans).length; modal(mhead("check", "Submit your exam?", "Safety Competency Check") + `<div class="mb"><p>You answered <b>${n} of ${EXAM.length}</b> questions.${n < EXAM.length ? " Unanswered questions count as wrong." : ""} You can't change answers after you submit.</p></div><div class="mf"><span class="btn gh" data-act="close">Keep going</span><span class="btn" data-act="econf">Submit</span></div>`); },
  econf: () => { clearInterval(timer); S.exam.state = "submitted"; closeModal(); notify("Exam submitted", "Tomás Nguyen is marking it", "#/exam"); render(); },
  eeval: () => { S.exam.state = "evaluated"; notify("Your exam score is ready", examScore().pct + "%", "#/exam"); render(); },
  eretry: () => { S.exam = { state: "idle", ans: {}, idx: 0, secs: 2700, attempt: 2 }; render(); },
  l1a: d => { S.l1.ans[d.i] = +d.v; render(); },
  l1send: () => { if (!S.l1.ans[0]) return toast("Please answer question 1 — it's the only required one.", "warn"); S.l1.state = "submitted"; notify("Feedback sent", "Tomás Nguyen will score your rides", "#/l1"); render(); },
  l1rel: () => { S.l1.state = "released"; notify("Your ride review is ready", "4.1 out of 5 · passed", "#/l1"); render(); },
  ack: d => { S.coach.ack[d.id] = true; render(); },
  reply: d => modal(mhead("msg", "Reply to Tomás Nguyen", "Added to this conversation") + `<div class="mb"><div class="fld"><textarea id="rtxt" rows="4" placeholder="Write your reply"></textarea></div></div><div class="mf"><span class="btn gh" data-act="close">Cancel</span><span class="btn" data-act="rsend" data-id="${d.id}">Send</span></div>`),
  rsend: d => { const t = document.getElementById("rtxt").value.trim(); if (!t) return toast("Write something first.", "warn"); (S.coach.replies[d.id] = S.coach.replies[d.id] || []).push(t); S.coach.ack[d.id] = true; closeModal(); render(); toast("Reply sent.", "msg"); },
  ask: () => modal(mhead("user", "Ask your instructor for help", "Tomás Nguyen gets this as a coaching request") + `<div class="mb"><div class="fld"><label>Topic</label><select id="atp"><option>A lesson I'm stuck on</option><option>Catching up</option><option>Labs or rides</option><option>Something else</option></select></div><div class="fld"><label>Details</label><textarea id="atxt" rows="4"></textarea></div></div><div class="mf"><span class="btn gh" data-act="close">Cancel</span><span class="btn" data-act="asend">Send</span></div>`),
  asend: () => { const t = document.getElementById("atxt").value.trim(); if (!t) return toast("Write something first.", "warn"); S.coach.asks.push(document.getElementById("atp").value + " — " + t); closeModal(); render(); toast("Sent to Tomás Nguyen.", "msg"); },
  message: d => { const p = TEAM.find(x => x.id === d.p); modal(mhead("msg", "Message " + p.name, p.role) + `<div class="mb"><div class="fld"><textarea id="mtxt" rows="4" placeholder="Write a message"></textarea></div></div><div class="mf"><span class="btn gh" data-act="close">Cancel</span><span class="btn" data-act="msend" data-n="${p.name}">Send</span></div>`); },
  msend: d => { if (!document.getElementById("mtxt").value.trim()) return toast("Write something first.", "warn"); closeModal(); toast("Message sent to " + d.n + ".", "msg"); },
  peer: d => toast("Opening a Teams chat with " + d.n + " (demo).", "msg"),
  pp: d => { S.pplPage += +d.v; render(); },
  pg: d => { S.pplPage = +d.v; render(); },
  rcat: d => { S.resCat = d.v; render(); },
  fbmode: () => { FB.on = !FB.on; document.body.classList.toggle("fbmode", FB.on); FB.closePop(); render(); const b = document.getElementById("fbbanner"); if (b) b.remove(); if (FB.on) { const x = document.createElement("div"); x.className = "fbbanner"; x.id = "fbbanner"; x.textContent = "Feedback mode — click anything on the page to comment. Press Esc to stop."; document.body.appendChild(x); } },
  fbpanel: () => { FB.panel(); if (document.getElementById("fbpanel")) FB.load(true); }
};
/* ================= events ================= */
document.addEventListener("click", e => {
  const f = e.target.closest("[data-fb]"); if (f) { e.preventDefault(); return FB.handle(f); }
  if (e.target.closest("#fbpop") || e.target.closest("#fbpanel") || e.target.closest("#ovl .modal")) { if (!e.target.closest("[data-act]")) return; }
  if (FB.on && e.target.closest("#wrap") && !e.target.closest(".fbpin")) { e.preventDefault(); e.stopPropagation(); return FB.add(e.target, e); }
  const t = e.target.closest("[data-act]");
  if (!t) { if (openDD && !e.target.closest(".dd-panel")) { openDD = null; render(); } if (q && !e.target.closest(".srch")) { q = ""; render(); } return; }
  if (t.classList.contains("dis")) return;
  const href = t.tagName === "A" ? t.getAttribute("href") : null;
  if (!href) e.preventDefault();
  if (A[t.dataset.act]) A[t.dataset.act](t.dataset);
}, true);
const keepFocus = (id, fn) => e => { if (e.target.id !== id) return; fn(e.target.value); const p = e.target.selectionStart; render(); const i = document.getElementById(id); if (i) { i.focus(); i.setSelectionRange(p, p); } };
document.addEventListener("input", e => {
  keepFocus("gq", v => q = v)(e); keepFocus("psearch", v => { S.pplQ = v; S.pplPage = 1; })(e);
  if (e.target.dataset && e.target.dataset.l1t !== undefined) { S.l1.ans[e.target.dataset.l1t] = e.target.value; save(); }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(); FB.closePop(); if (FB.on) A.fbmode(); openDD = null; q = ""; render(); }
  if (e.target.id === "fbtxt" && e.key === "Enter" && (e.ctrlKey || e.metaKey)) FB.save();
  if (e.target.id === "gq" && e.key === "Enter") { const first = document.querySelector(".srch-res [data-act]"); if (first) first.click(); }
});
window.addEventListener("hashchange", () => { openDD = null; q = ""; FB.closePop(); render(); });
window.addEventListener("resize", () => FB.pins());
window.addEventListener("focus", () => FB.load(true));
if (S.exam.state === "progress") startTimer();
if (!location.hash) location.hash = "#/flow";
render(); FB.load(true);
})();
