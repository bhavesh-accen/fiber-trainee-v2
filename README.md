# Fiber Academy · Trainee prototype (v11)

Open `index.html` in Chrome or Edge. The bottom bar walks through every screen; **Reset** clears demo progress (client comments are kept).

## Client feedback
1. Click **Feedback mode** in the bottom bar.
2. Click any element on a screen, type a comment and your name, then **Save comment**. A numbered pin stays on that element.
3. **Comments** lists every comment: *Show* jumps to it, *Resolve*, *Delete*, export **CSV/JSON**, or **Import** a JSON file from another reviewer.

Comments are saved in each reviewer's browser unless you connect a shared store (below).

## Free hosting
- **Netlify Drop** – https://app.netlify.com/drop → drag this folder in → public link.
- **GitHub Pages** – public repo → upload files → Settings → Pages → branch `main` / root.
Check with your account/security team before putting client material on a public URL. All names and data are samples.

## Optional: shared comments via a free Google Sheet
1. New Google Sheet → **Extensions → Apps Script**, paste:
```js
function doGet() {
  const rows = SpreadsheetApp.getActiveSheet().getDataRange().getValues().slice(1);
  const out = rows.map(r => JSON.parse(r[1])).filter(x => !x.deleted);
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  const item = JSON.parse(e.postData.contents), sh = SpreadsheetApp.getActiveSheet();
  if (sh.getLastRow() === 0) sh.appendRow(["id", "json", "screen", "comment", "name", "date"]);
  const ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => r[0]);
  const row = [item.id, JSON.stringify(item), item.screen || "", item.text || "", item.name || "", item.ts || ""];
  const i = ids.indexOf(item.id);
  if (i > 0) sh.getRange(i + 1, 1, 1, row.length).setValues([row]); else sh.appendRow(row);
  return ContentService.createTextOutput("ok");
}
```
2. **Deploy → New deployment → Web app** · Execute as *Me* · Access *Anyone* → copy the URL.
3. Paste it into `data.js`: `const FEEDBACK_ENDPOINT = "https://script.google.com/macros/s/…/exec";` and re-upload.

## Files
`index.html` · `styles.css` · `data.js` (dates, exam, people) · `curriculum.js` (weeks, days, modules and lessons from the PWTIT course map) · `app.js` (screens, navigation, feedback layer)
