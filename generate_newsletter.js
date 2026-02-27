// Nike Indoor Nationals 2026 Newsletter Generator — Premium Design
// Run: node generate_newsletter.js
const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, 'bears_tc_nike_indoor_newsletter.html');

// ─── Design Tokens ─────────────────────────────────────────────────
const F = "font-family:'Segoe UI',Arial,Helvetica,sans-serif;";
const CN = "#0d1b2a";   // navy
const CM = "#1b3a5c";   // mid-blue
const CA = "#e8792b";   // accent orange (Nike)
const CB = "#333";      // body text
const CMU = "#7a8a9a";  // muted
const CBR = "#dce3eb";  // border light
const CC = "#f5f7fa";   // card bg
const CW = "#ffffff";

// ─── Images ─────────────────────────────────────────────────────────
const IMG = {
  logo: "https://images.squarespace-cdn.com/content/v1/6757058059950841e0b84da8/31690ecd-1495-46ac-b0cf-fd559d5410ce/Transparent+BTC+Logo.png?format=500w",
  ninLogo: "https://alivestatic.athletic.net/meet-images/cbfa59c676b7cd56f099d4bd4a9b02d3.png",
  heroTrack: "https://images.squarespace-cdn.com/content/v1/596d6cf1b3db2b5b22143bdb/1681742940481-GSZRBDKFQBE2OP7H8BUL/Millrose_115th_Dettman_107.jpg?format=1500w",
  armoryWide: "https://images.squarespace-cdn.com/content/v1/596d6cf1b3db2b5b22143bdb/1743705998563-W07R8TZY4OXCY5C3H0S9/1.png?format=2500w",
  armoryFloor: "https://images.squarespace-cdn.com/content/v1/596d6cf1b3db2b5b22143bdb/1743705997202-NV0IDP7BHEW7AMIB864C/4.png?format=2500w",
  armoryExt: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Fort-washington-armory.jpg",
  trackClose: "https://images.squarespace-cdn.com/content/v1/596d6cf1b3db2b5b22143bdb/1556119709547-HYG7X3XNJX7Z2A9RE5KY/NA2FMillrose1777_origL.jpg?format=1500w",
  mileRace: "https://nikeindoornationals.runnerspace.com/members/photos/94310/SullivanQuinn1-NIN25-IQ2eWhnz_full.jpg",
  relay: "https://nikeindoornationals.runnerspace.com/members/photos/94310/JonesAlexia4x4m1-NIN25-kdqskw82_full.jpg",
  m800: "https://nikeindoornationals.runnerspace.com/members/photos/94310/Engels-Lutkenhaus-NIN25_full.jpg",
  finish: "https://nikeindoornationals.runnerspace.com/members/photos/94310/LutkenhausCooperFH1-NIN25_full.jpg",
  sprint: "https://nikeindoornationals.runnerspace.com/members/photos/94310/KitchingsAva1-NIN25_full.jpg",
  cheer1: "https://nikeindoornationals.runnerspace.com/members/photos/94310/GraceHannah1-NIN25-bv3ENQ43_full.jpg",
  cheer2: "https://nikeindoornationals.runnerspace.com/members/photos/94310/McElhinneyDylan-NIN25-uvvRkq4i_full.jpg",
};

// ─── Helper fragments ───────────────────────────────────────────────
const sectionHead = (num, t) => `
<tr><td style="padding:32px 40px 0 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding-bottom:10px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="background:${CA};width:36px;height:36px;border-radius:50%;text-align:center;vertical-align:middle;">
      <span style="color:#fff;font-size:16px;${F}font-weight:700;line-height:36px;">${num}</span>
    </td>
    <td style="padding-left:14px;">
      <p style="margin:0;font-size:11px;${F}color:${CA};letter-spacing:2px;text-transform:uppercase;font-weight:700;">${t}</p>
    </td>
  </tr></table>
</td></tr>
<tr><td style="border-bottom:2px solid ${CN};"></td></tr>
</table>
</td></tr>`;

const divider = `<tr><td style="padding:0 40px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="border-top:1px solid ${CBR};font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>`;

const pt = (t, s = '') => `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.8;color:${CB};${F}${s}">${t}</p>`;

const fullWidthImg = (src, alt, caption) => `
<tr><td style="padding:0;">
  <img src="${src}" alt="${alt}" width="600" style="display:block;width:100%;height:auto;border:0;">
</td></tr>
${caption ? `<tr><td style="padding:6px 40px 0 40px;"><p style="margin:0;font-size:11px;${F}color:${CMU};font-style:italic;text-align:center;letter-spacing:0.3px;">${caption}</p></td></tr>` : ''}`;

const card = (content, opts = {}) => {
  const accent = opts.accent || '';
  const bg = opts.bg || CC;
  const borderLeft = accent ? `border-left:4px solid ${accent};` : '';
  return `<tr><td style="padding:0 40px ${opts.noBottom ? '0' : '16'}px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${bg};border:1px solid ${CBR};border-radius:8px;${borderLeft}">
<tr><td style="padding:20px 24px;">${content}</td></tr>
</table></td></tr>`;
};

const twoColImg = (src1, alt1, src2, alt2) => `
<tr><td style="padding:12px 40px 16px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td width="49%" style="padding-right:5px;"><img src="${src1}" alt="${alt1}" width="252" style="display:block;width:100%;height:auto;border:0;border-radius:6px;"></td>
<td width="2%"></td>
<td width="49%" style="padding-left:5px;"><img src="${src2}" alt="${alt2}" width="252" style="display:block;width:100%;height:auto;border:0;border-radius:6px;"></td>
</tr></table></td></tr>`;

// ─── Data ───────────────────────────────────────────────────────────
const athletes = [
  ["Benjamin Olds", "800m (EE), 1 Mile (Champ), 4x800 (EE), DMR (Champ)", "$249"],
  ["Axel Mason", "800m (EE), 4x800 (EE), DMR (Champ)", "$189"],
  ["Lukas Sturgeon", "4x800 (EE), DMR (Champ)", "$129"],
  ["Jake Bossinger", "4x800 (EE), DMR (Champ)", "$129"],
  ["Jackson Marshall", "800m (EE)", "$69"],
  ["Preston Hall", "1 Mile (Middle School)", "$69"],
  ["Esther Paulson", "5000m (EE)", "$69"],
];

const bearsSchedule = [
  ["Thu 3/12", "3:48 PM", "Boys MS 1 Mile", "Preston Hall"],
  ["Thu 3/12", "8:36 PM", "Girls EE 5000m", "Esther Paulson"],
  ["Sat 3/14", "2:37 PM", "Boys EE 800m", "Benjamin Olds, Axel Mason, Jackson Marshall"],
  ["Sat 3/14", "6:45 PM", "Boys Champ DMR", "Axel Mason, Lukas Sturgeon, Jake Bossinger, Benjamin Olds"],
  ["Sat 3/14", "9:11 PM", "Mixed Coaches Mile", "Coach Zev \u2B50"],
  ["Sun 3/15", "9:36 AM", "Boys EE 4x800m", "Benjamin Olds, Lukas Sturgeon, Jake Bossinger, Axel Mason"],
  ["Sun 3/15", "11:48 AM", "Boys Champ 1 Mile", "Benjamin Olds"],
];

const bearsEventAthletes = {
  "Boys MS 1 Mile": "Preston Hall",
  "Girls EE 5000m": "Esther Paulson",
  "Boys EE 800m": "Benjamin Olds, Axel Mason, Jackson Marshall",
  "Boys Champ DMR": "Axel Mason, Lukas Sturgeon, Jake Bossinger, Benjamin Olds",
  "Mixed Coaches Mile": "Coach Zev",
  "Boys EE 4x800m Relay": "Benjamin Olds, Lukas Sturgeon, Jake Bossinger, Axel Mason",
  "Boys Champ 1 Mile": "Benjamin Olds",
};

const fullSchedule = {
  "Thursday, March 12": [
    ["3:20 PM", "Girls MS 1 Mile", false], ["3:48 PM", "Boys MS 1 Mile", true],
    ["4:16 PM", "Girls Freshman 1 Mile", false], ["4:44 PM", "Boys Freshman 1 Mile", false],
    ["5:32 PM", "Girls Champ 5000m", false], ["5:56 PM", "Boys Champ 5000m", false],
    ["8:36 PM", "Girls EE 5000m", true], ["8:56 PM", "Boys EE 5000m", false],
  ],
  "Friday, March 13": [
    ["5:18 PM", "Girls Champ 4xMile Relay", false], ["5:43 PM", "Boys Champ 4xMile Relay", false],
    ["6:05 PM", "Girls Champ SMR", false], ["6:51 PM", "Boys Champ SMR", false],
    ["7:35 PM", "Girls EE SMR", false], ["8:13 PM", "Boys EE SMR", false],
  ],
  "Saturday, March 14": [
    ["1:36 PM", "Girls Champ 800m", false], ["1:56 PM", "Boys Champ 800m", false],
    ["2:17 PM", "Girls EE 800m", false], ["2:37 PM", "Boys EE 800m", true],
    ["6:19 PM", "Girls Champ DMR", false], ["6:45 PM", "Boys Champ DMR", true],
    ["9:11 PM", "Mixed Coaches Mile", true],
  ],
  "Sunday, March 15": [
    ["9:00 AM", "Girls EE 4x800m Relay", false], ["9:36 AM", "Boys EE 4x800m Relay", true],
    ["11:20 AM", "Girls Champ 1 Mile", false], ["11:48 AM", "Boys Champ 1 Mile", true],
    ["12:50 PM", "Girls EE 1 Mile", false], ["1:18 PM", "Boys EE 1 Mile", false],
    ["1:46 PM", "Girls Champ 4x800m Relay", false], ["2:10 PM", "Boys Champ 4x800m Relay", false],
    ["2:49 PM", "Girls State Club DMR", false], ["3:01 PM", "Boys State Club DMR", false],
  ],
};

// ─── Build dynamic rows ────────────────────────────────────────────
let feeRows = athletes.map((a, i) => {
  const bg = i % 2 === 1 ? `background-color:${CC};` : '';
  const bd = i < athletes.length - 1 ? 'border-bottom:1px solid #eaeff4;' : '';
  return `<tr style="${bg}"><td style="padding:12px 16px;font-size:14px;${F}color:${CN};font-weight:600;${bd}vertical-align:top;">${a[0]}</td><td style="padding:12px 16px;font-size:13px;${F}color:${CB};${bd}line-height:1.6;">${a[1]}</td><td align="right" style="padding:12px 16px;font-size:15px;${F}color:${CN};font-weight:800;${bd}">${a[2]}</td></tr>`;
}).join('\n');

let bsRows = bearsSchedule.map((r, i) => {
  const isCoach = r[2].includes('Coaches');
  const bg = isCoach ? 'background-color:#fef9f0;' : (i % 2 === 1 ? `background-color:${CC};` : '');
  const bd = i < bearsSchedule.length - 1 ? 'border-bottom:1px solid #eaeff4;' : '';
  return `<tr style="${bg}"><td style="padding:10px 12px;font-size:13px;${F}color:${CN};font-weight:700;${bd}vertical-align:top;white-space:nowrap;">${r[0]}</td><td style="padding:10px 12px;font-size:13px;${F}color:${CB};${bd}vertical-align:top;white-space:nowrap;">${r[1]}</td><td style="padding:10px 12px;font-size:13px;${F}color:${CB};${bd}vertical-align:top;">${r[2]}</td><td style="padding:10px 12px;font-size:13px;${F}color:${CM};${bd}line-height:1.5;font-weight:600;">${r[3]}</td></tr>`;
}).join('\n');

let fullRows = '';
for (const [day, events] of Object.entries(fullSchedule)) {
  fullRows += `<tr><td style="padding:0 40px 4px 40px;"><p style="margin:0;font-size:14px;${F}color:${CN};font-weight:700;padding-top:14px;">${day}</p></td></tr><tr><td style="padding:0 40px 12px 40px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${CBR};border-radius:6px;overflow:hidden;">`;
  events.forEach((e, j) => {
    const bg = e[2] ? 'background-color:#e6f3e6;' : (j % 2 === 1 ? `background-color:${CC};` : '');
    const w = e[2] ? 'font-weight:700;' : '';
    const bd = j < events.length - 1 ? 'border-bottom:1px solid #eaeff4;' : '';
    const bearNames = e[2] && bearsEventAthletes[e[1]] ? ` <span style="color:#2e7d32;">&#9679; BEARS</span> <span style="font-size:11px;color:#2e7d32;font-weight:400;">(${bearsEventAthletes[e[1]]})</span>` : '';
    fullRows += `<tr style="${bg}"><td width="80" style="padding:7px 12px;font-size:13px;${F}color:${CB};${bd}vertical-align:top;${w}">${e[0]}</td><td style="padding:7px 12px;font-size:13px;${F}color:${CB};${bd}${w}">${e[1]}${bearNames}</td></tr>`;
  });
  fullRows += '</table></td></tr>';
}

// ─── Build the HTML ─────────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bears Track Club &ndash; Nike Indoor Nationals 2026</title>
<style>
.bio-form{max-width:520px;margin:0 auto;}
.bio-form label{display:block;font-size:12px;${F}color:${CM};font-weight:700;text-transform:uppercase;letter-spacing:0.8px;margin:16px 0 5px 0;}
.bio-form input,.bio-form textarea,.bio-form select{width:100%;box-sizing:border-box;padding:11px 14px;font-size:14px;${F}color:${CB};border:1px solid ${CBR};border-radius:6px;background:#fff;transition:border-color .2s;}
.bio-form input:focus,.bio-form textarea:focus,.bio-form select:focus{outline:none;border-color:${CA};}
.bio-form textarea{min-height:60px;resize:vertical;}
.bio-form .required::after{content:" *";color:#c0392b;}
.bio-form button{display:block;width:100%;margin-top:24px;padding:15px;background:linear-gradient(135deg,${CA},#d4621f);color:#fff;border:none;border-radius:6px;font-size:15px;${F}font-weight:700;cursor:pointer;letter-spacing:0.5px;text-transform:uppercase;transition:opacity .2s;}
.bio-form button:hover{opacity:.9;}
.bio-form .success{background:#d4edda;color:#155724;padding:20px;border-radius:8px;text-align:center;font-size:16px;${F}font-weight:600;}
.bio-form .error{background:#f8d7da;color:#721c24;padding:12px;border-radius:6px;text-align:center;font-size:13px;${F}margin-top:10px;}
</style>
</head>
<body style="margin:0;padding:0;background-color:#eef1f5;-webkit-font-smoothing:antialiased;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#eef1f5;">
<tr><td align="center" style="padding:20px 10px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background-color:${CW};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

<!-- GRADIENT ACCENT BAR -->
<tr><td style="height:5px;background:linear-gradient(90deg,${CA},#e04e2e,${CA});font-size:0;line-height:0;">&nbsp;</td></tr>

<!-- HEADER -->
<tr><td align="center" style="background:linear-gradient(180deg,${CN} 0%,#162d46 100%);padding:36px 40px 30px 40px;">
<img src="${IMG.logo}" alt="Bears Track Club" width="130" style="display:block;width:130px;height:auto;border:0;">
</td></tr>
<tr><td style="background:linear-gradient(135deg,${CM},#234b6e);padding:14px 40px;text-align:center;">
<p style="margin:0;font-size:12px;${F}color:rgba(255,255,255,.85);letter-spacing:2.5px;text-transform:uppercase;font-weight:600;">Nike Indoor Nationals 2026 &mdash; New York City</p>
</td></tr>

<!-- HERO IMAGE -->
${fullWidthImg(IMG.heroTrack, "Nike Indoor Nationals at The Armory")}

<!-- NIN LOGO BAR -->
<tr><td align="center" style="background:#0a0a0a;padding:22px 40px;">
<img src="${IMG.ninLogo}" alt="Nike Indoor Nationals 2026" width="260" style="display:block;width:260px;height:auto;border:0;">
</td></tr>

<!-- INTRO -->
<tr><td style="padding:36px 40px 12px 40px;">
${pt("Hi everyone,")}
${pt("Congratulations to our <strong>seven Bears athletes</strong> who have qualified for <strong>Nike Indoor Nationals 2026</strong> at The Armory in New York City! This is the premier indoor track &amp; field championship for high school athletes in the nation, and we are incredibly proud of each of you.")}
${pt("Below you&rsquo;ll find everything you need &mdash; payment information, travel logistics, what to pack, the full race schedule, required action items, and your athlete bio form. Please read through carefully!", "margin-bottom:0;")}
</td></tr>

<!-- PHOTO STRIP -->
${twoColImg(IMG.mileRace, "Mile Championship", IMG.finish, "800m Finish")}

${divider}

<!-- ═══════════════ SECTION 1: FEES ═══════════════ -->
${sectionHead("1", "Entry Fees &amp; Payment")}
<tr><td style="padding:20px 40px 8px 40px;">
${pt("The base cost is <strong>$60 per individual event</strong> and <strong>$60 per relay leg</strong>. There is a flat <strong>$9 processing fee</strong> per athlete for the registration platform.")}
</td></tr>
<tr><td style="padding:0 40px 20px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${CBR};border-radius:8px;overflow:hidden;">
<tr style="background:linear-gradient(135deg,${CN},${CM});"><td style="padding:11px 16px;font-size:11px;${F}color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Athlete</td><td style="padding:11px 16px;font-size:11px;${F}color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Events (Division)</td><td width="80" align="right" style="padding:11px 16px;font-size:11px;${F}color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Total</td></tr>
${feeRows}
</table></td></tr>
<tr><td style="padding:0 40px 32px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg,${CN},#162d46);border-radius:8px;">
<tr><td align="center" style="padding:28px;">
<p style="margin:0 0 4px 0;font-size:11px;${F}color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Send Payment Via Venmo</p>
<p style="margin:0 0 8px 0;font-size:26px;${F}color:#fff;font-weight:800;">@BearsTC</p>
<p style="margin:0 0 14px 0;font-size:13px;${F}color:rgba(255,255,255,.65);">Or mail a check payable to &ldquo;Bears Track Club&rdquo;</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${CA};border-radius:4px;padding:8px 20px;">
<p style="margin:0;font-size:12px;${F}color:#fff;font-weight:700;letter-spacing:0.5px;">PLEASE PAY ASAP TO FINALIZE REGISTRATION</p>
</td></tr></table>
</td></tr></table></td></tr>

${divider}

<!-- ═══════════════ SECTION 2: TRAVEL & LOGISTICS ═══════════════ -->
${sectionHead("2", "Travel &amp; Logistics")}
<tr><td style="padding:20px 40px 12px 40px;">
${pt("There are <strong>no additional costs</strong> for athletes beyond the registration fees above. Parents and athletes are welcome to plan their own travel and accommodations &mdash; there is no obligation outside of the racing schedule.")}
</td></tr>

${card(`
<p style="margin:0 0 2px 0;font-size:17px;${F}color:${CN};font-weight:700;">&#9992;&nbsp; Coaches&rsquo; Flight Info</p>
<p style="margin:0 0 14px 0;font-size:12px;${F}color:${CMU};letter-spacing:0.5px;">Denver (DEN) &rarr; LaGuardia (LGA)</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;${F}color:${CB};">
<tr><td style="padding:5px 0;"><strong>Depart:</strong>&nbsp; Tue, March 11 &mdash; 9:15 AM MT &rarr; 2:50 PM ET</td></tr>
<tr><td style="padding:5px 0;"><strong>Return:</strong>&nbsp; Sat, March 15 &mdash; 8:55 PM ET &rarr; 11:25 PM MT</td></tr>
</table>
<p style="margin:14px 0 0 0;font-size:14px;line-height:1.7;${F}color:${CB};">We&rsquo;ll send a team meeting point and coordination details closer to the date!</p>
`, { accent: CA })}

<!-- ARMORY EXTERIOR -->
<tr><td style="padding:4px 40px 4px 40px;">
<img src="${IMG.armoryExt}" alt="The Armory - Exterior" width="520" style="display:block;width:100%;height:auto;border:0;border-radius:8px;">
</td></tr>
<tr><td style="padding:2px 40px 16px 40px;">
<p style="margin:0;font-size:11px;${F}color:${CMU};font-style:italic;text-align:center;">The historic Fort Washington Avenue Armory — home of Nike Indoor Nationals</p>
</td></tr>

${card(`
<p style="margin:0 0 2px 0;font-size:17px;${F}color:${CN};font-weight:700;">&#127963;&nbsp; The Venue &mdash; The Armory</p>
<p style="margin:0 0 14px 0;font-size:12px;${F}color:${CMU};letter-spacing:0.5px;">The Nike Track &amp; Field Center at The Armory</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;${F}color:${CB};">
<tr><td style="padding:4px 0;"><strong>Address:</strong>&nbsp; 216 Fort Washington Ave, New York, NY 10032</td></tr>
<tr><td style="padding:4px 0;"><strong>Nearest Subway:</strong>&nbsp; 168th St station (A/C/1 trains)</td></tr>
<tr><td style="padding:4px 0;"><strong>From LaGuardia:</strong>&nbsp; ~45 min taxi/Uber, or M60 bus &rarr; subway</td></tr>
<tr><td style="padding:4px 0;"><strong>Live Stream:</strong>&nbsp; <a href="https://www.nikeindoornationals.com" style="color:${CA};text-decoration:underline;font-weight:600;">NikeIndoorNationals.com</a> (free!)</td></tr>
</table>
`, { accent: CM })}

${card(`
<p style="margin:0 0 2px 0;font-size:17px;${F}color:${CN};font-weight:700;">&#127915;&nbsp; Spectator Information</p>
<p style="margin:0 0 14px 0;font-size:12px;${F}color:${CMU};letter-spacing:0.5px;">Tickets for family &amp; friends</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;${F}color:${CB};">
<tr><td style="padding:4px 0;"><strong>General Admission:</strong>&nbsp; $25 at the door (first-come, first-served)</td></tr>
<tr><td style="padding:4px 0;"><strong>Reserved Seating:</strong>&nbsp; $35&ndash;$80 per day (pre-purchase recommended)</td></tr>
<tr><td style="padding:4px 0;"><strong>Kids 3&rsquo;6&rdquo; &amp; under:</strong>&nbsp; Free (GA only)</td></tr>
</table>
<p style="margin:14px 0 0 0;font-size:14px;line-height:1.7;${F}color:${CB};">The venue often fills to capacity! Finish Line sections offer the best views. <a href="https://nikeindoornationals.runnerspace.com/eprofile.php?event_id=14189&title_id=tickets" style="color:${CA};text-decoration:underline;font-weight:600;">Purchase tickets here &rarr;</a></p>
`)}

${card(`
<p style="margin:0 0 2px 0;font-size:17px;${F}color:${CN};font-weight:700;">&#127939;&nbsp; Warm-Up &amp; Race Day Info</p>
<p style="margin:0 0 14px 0;font-size:12px;${F}color:${CMU};letter-spacing:0.5px;">What athletes need to know at The Armory</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;${F}color:${CB};">
<tr><td style="padding:5px 0;"><strong>Warm-Up:</strong>&nbsp; Jogging area adjacent to the main track; 2nd floor track for strides. Athletes may also warm up outside.</td></tr>
<tr><td style="padding:5px 0;"><strong>Competition Track:</strong>&nbsp; 200m banked Mondo surface. No warm-ups on the competition track.</td></tr>
<tr><td style="padding:5px 0;"><strong style="color:#c0392b;">Spikes:</strong>&nbsp; <strong>Only &frac14;-inch pyramid spikes allowed.</strong> No 3-spike plate shoes. All spikes inspected before competition.</td></tr>
<tr><td style="padding:5px 0;"><strong>Bibs:</strong>&nbsp; Coaches will pick up and distribute all bibs at the venue.</td></tr>
<tr><td style="padding:5px 0;"><strong>Relay Batons:</strong>&nbsp; Coaches will have batons ready &mdash; athletes don&rsquo;t need to bring their own.</td></tr>
<tr><td style="padding:5px 0;"><strong>Food:</strong>&nbsp; Concession stands inside. Outside food/drinks are <strong>not permitted</strong>.</td></tr>
</table>
`)}

<!-- ARMORY WIDE PANORAMA -->
<tr><td style="padding:4px 40px 4px 40px;">
<img src="${IMG.armoryWide}" alt="The Armory Wide Angle" width="520" style="display:block;width:100%;height:auto;border:0;border-radius:8px;">
</td></tr>
<tr><td style="padding:2px 40px 20px 40px;">
<p style="margin:0;font-size:11px;${F}color:${CMU};font-style:italic;text-align:center;">Inside The Armory &mdash; the 200m banked Mondo track where you&rsquo;ll be racing</p>
</td></tr>

${divider}

<!-- ═══════════════ SECTION 3: WHAT TO PACK ═══════════════ -->
${sectionHead("3", "What to Pack")}
<tr><td style="padding:20px 40px 8px 40px;">
${pt("NYC in mid-March is typically <strong>35&ndash;50&deg;F</strong> with a damp cold that feels very different from Colorado&rsquo;s dry cold. Here&rsquo;s what we recommend:")}
</td></tr>

${card(`
<p style="margin:0 0 14px 0;font-size:16px;${F}color:${CN};font-weight:700;">&#129525; Race Gear <span style="font-size:12px;color:${CA};font-weight:600;">(REQUIRED)</span></p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;${F}color:${CB};">
<tr><td style="padding:4px 0;">&#10004;&nbsp; <strong>Bears TC singlet</strong> &mdash; this is your race uniform</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; <strong>Racing spikes</strong> with &frac14;-inch pyramid spikes only</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; <strong>Multiple bottoms</strong> &mdash; 2&ndash;3 pairs of shorts/tights if racing multiple days</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; Warm-up layers (sweats, jacket)</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; Extra socks &amp; compression gear</td></tr>
</table>
`, { accent: CA, bg: '#fdf6f0' })}

${card(`
<p style="margin:0 0 14px 0;font-size:16px;${F}color:${CN};font-weight:700;">&#128166; Recovery &amp; Nutrition</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;${F}color:${CB};">
<tr><td style="padding:4px 0;">&#10004;&nbsp; Foam roller, massage stick, or lacrosse ball</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; Snacks for between races (eat before entering the venue)</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; Water bottle</td></tr>
</table>
`)}

${card(`
<p style="margin:0 0 14px 0;font-size:16px;${F}color:${CN};font-weight:700;">&#127783;&#65039; NYC Weather Gear</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;${F}color:${CB};">
<tr><td style="padding:4px 0;">&#10004;&nbsp; Warm winter jacket &mdash; NYC damp cold cuts through layers</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; Waterproof shoes or boots for the city</td></tr>
<tr><td style="padding:4px 0;">&#10004;&nbsp; Hat, gloves, and an umbrella</td></tr>
</table>
`)}

${divider}

<!-- ═══════════════ SECTION 4: BEARS SCHEDULE ═══════════════ -->
${sectionHead("4", "Bears Race Schedule")}
<tr><td style="padding:20px 40px 8px 40px;">
${pt("Here is exactly when each Bears athlete competes. All times are <strong>Eastern Time (ET)</strong> &mdash; that&rsquo;s 2 hours ahead of Mountain Time.")}
</td></tr>
<tr><td style="padding:0 40px 20px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${CBR};border-radius:8px;overflow:hidden;">
<tr style="background:linear-gradient(135deg,${CN},${CM});"><td style="padding:10px 12px;font-size:10px;${F}color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Day</td><td style="padding:10px 12px;font-size:10px;${F}color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Time (ET)</td><td style="padding:10px 12px;font-size:10px;${F}color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Event</td><td style="padding:10px 12px;font-size:10px;${F}color:#fff;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Bears Athletes</td></tr>
${bsRows}
</table></td></tr>

${card(`
<p style="margin:0;font-size:14px;line-height:1.7;${F}color:${CB};"><strong style="color:#b8860b;">&#9733; Coach Zev</strong> will be running the <strong>Coaches&rsquo; Mile</strong> on Saturday evening at 9:11 PM ET &mdash; come watch and cheer him on!</p>
`, { accent: '#b8860b', bg: '#fef9f0' })}

<!-- RACE ACTION PHOTOS -->
${twoColImg(IMG.relay, "Relay Handoff", IMG.sprint, "Sprint Race")}

${divider}

<!-- ═══════════════ SECTION 5: FULL SCHEDULE ═══════════════ -->
${sectionHead("5", "Full Meet Schedule (All Events)")}
<tr><td style="padding:20px 40px 8px 40px;">
${pt("The complete Nike Indoor Nationals schedule. Events highlighted in <strong style='color:#2e7d32;'>green with &#9679; BEARS</strong> are ours, with athlete names listed.")}
</td></tr>
${fullRows}

${divider}

<!-- ═══════════════ SECTION 6: ACTION ITEMS ═══════════════ -->
${sectionHead("6", "Required Action Items")}
<tr><td style="padding:20px 40px 10px 40px;">
${pt("Every athlete <strong>must</strong> complete the following before the meet:")}
</td></tr>

${card(`
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;padding-right:14px;"><span style="display:inline-block;background:#c0392b;color:#fff;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-size:13px;${F}font-weight:700;">1</span></td>
<td>
<p style="margin:0 0 4px 0;font-size:11px;${F}color:#c0392b;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Required</p>
<p style="margin:0 0 8px 0;font-size:16px;${F}color:${CN};font-weight:700;">Sign the Adobe E-Waiver</p>
<p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;${F}color:${CB};">Each athlete (and parent/guardian if under 18) must sign the official NSAF waiver.</p>
<a href="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhDpkVgANc154tbo-eoIfZmZIdo3wf3w1iMnGWrOPrAz34lvGi35_m9My-wA2-BsV6c*" style="display:inline-block;background:#c0392b;color:#fff;padding:10px 22px;border-radius:5px;text-decoration:none;font-size:13px;${F}font-weight:600;">Sign Waiver &rarr;</a>
</td></tr></table>
`, { accent: '#c0392b' })}

${card(`
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;padding-right:14px;"><span style="display:inline-block;background:${CM};color:#fff;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-size:13px;${F}font-weight:700;">2</span></td>
<td>
<p style="margin:0 0 4px 0;font-size:11px;${F}color:#c0392b;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Required</p>
<p style="margin:0 0 8px 0;font-size:16px;${F}color:${CN};font-weight:700;">Add Photo to Athletic.net Profile</p>
<p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;${F}color:${CB};">Nike requires a profile photo for each athlete. Log in to Athletic.net and add your headshot.</p>
<a href="https://support.athletic.net/article/q4o3qxsn0d-add-a-photo-to-your-profile" style="display:inline-block;background:${CM};color:#fff;padding:10px 22px;border-radius:5px;text-decoration:none;font-size:13px;${F}font-weight:600;">Photo Instructions &rarr;</a>
</td></tr></table>
`, { accent: CM })}

${card(`
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:top;padding-right:14px;"><span style="display:inline-block;background:${CMU};color:#fff;width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-size:13px;${F}font-weight:700;">3</span></td>
<td>
<p style="margin:0 0 4px 0;font-size:11px;${F}color:${CMU};text-transform:uppercase;letter-spacing:1px;font-weight:700;">Optional</p>
<p style="margin:0 0 8px 0;font-size:16px;${F}color:${CN};font-weight:700;">Pre-Competition Shop</p>
<p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;${F}color:${CB};">Customize your bag and gear from the official NSAF shop on Running Warehouse!</p>
<a href="https://www.runningwarehouse.com/catpage-NSAFPP.html?from=nsaf" style="display:inline-block;background:${CA};color:#fff;padding:10px 22px;border-radius:5px;text-decoration:none;font-size:13px;${F}font-weight:600;">Shop Now &rarr;</a>
</td></tr></table>
`)}

<!-- CELEBRATION PHOTOS -->
${twoColImg(IMG.cheer1, "Celebration", IMG.cheer2, "Post-Race")}

${divider}

<!-- ═══════════════ SECTION 7: BIO FORM ═══════════════ -->
${sectionHead("7", "Athlete Bio (Required by Nike)")}
<tr><td style="padding:20px 40px 8px 40px;">
${pt("Nike needs a bio for each athlete competing. Please fill out the form below &mdash; it will submit directly to our team. <strong>All fields marked with * are required.</strong>")}
</td></tr>
<tr><td style="padding:0 40px 36px 40px;">
<div class="bio-form" id="bioForm">
<div id="formFields">
<label class="required">Athlete Name</label>
<select id="athleteName"><option value="">Select your name&hellip;</option><option>Benjamin Olds</option><option>Axel Mason</option><option>Lukas Sturgeon</option><option>Jake Bossinger</option><option>Jackson Marshall</option><option>Preston Hall</option><option>Esther Paulson</option></select>
<label class="required">City</label><input type="text" id="city" placeholder="e.g. Monument">
<label class="required">State</label><input type="text" id="state" placeholder="e.g. Colorado">
<label class="required">Country</label><input type="text" id="country" value="United States">
<label class="required">Email</label><input type="email" id="email" placeholder="your@email.com">
<label class="required">Graduation Year</label><input type="text" id="graduationYear" placeholder="e.g. 2027">
<label class="required">Team Alias</label><input type="text" id="teamAlias" value="Bears Track Club">
<label class="required">Coach</label><input type="text" id="coach" value="Coach Luke Rodriguez">
<label class="required">School</label><input type="text" id="school" placeholder="e.g. Palmer Ridge High School">
<label class="required">Birthdate</label><input type="date" id="birthdate">
<label class="required">Emergency Contact Name</label><input type="text" id="emergencyContactName" placeholder="e.g. Parent/Guardian name">
<label class="required">Emergency Contact Phone</label><input type="tel" id="emergencyContactPhone" placeholder="e.g. (719) 555-1234">
<label>Pronunciation of Your Name</label><input type="text" id="namePronunciation" placeholder="e.g. BEN-juh-min OHLDZ">
<label>College Choices</label><textarea id="collegeChoices" placeholder="List any colleges you are considering"></textarea>
<label>Track &amp; Field Honors</label><textarea id="tfHonors" placeholder="e.g. State Champion 800m, All-Conference"></textarea>
<label>Other Sports Honors</label><textarea id="otherSportsHonors" placeholder="Honors from other sports"></textarea>
<label>Academic &amp; Other Honors</label><textarea id="academicHonors" placeholder="e.g. Honor Roll, National Merit"></textarea>
<label>Noteworthy Relatives in Sports</label><textarea id="noteworthyRelatives" placeholder="Relatives and their accomplishments"></textarea>
<label>Anything Else We Should Know</label><textarea id="anythingElse" placeholder="Anything else you'd like to share"></textarea>
<button type="button" onclick="submitBio()">Submit Athlete Bio &rarr;</button>
<div id="formMessage"></div>
</div></div></td></tr>

${divider}

<!-- CLOSING -->
<tr><td style="padding:24px 40px 20px 40px;text-align:center;">
${pt("Let us know if you have any questions! We are so excited for this trip. &#128170;", "text-align:center;font-size:16px;font-weight:600;")}
</td></tr>

<!-- SIGN-OFF -->
<tr><td style="padding:0 40px 28px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td style="border-top:1px solid ${CBR};padding-top:20px;">
<p style="margin:0 0 4px 0;font-size:15px;color:${CB};${F}">Best,</p>
<p style="margin:0 0 12px 0;font-size:17px;color:${CN};${F}font-weight:700;">Coach Luke</p>
<p style="margin:0;font-size:13px;color:${CMU};${F}">Instagram <a href="https://instagram.com/bears_tc" style="color:${CA};text-decoration:none;font-weight:600;">@bears_tc</a> &nbsp;&middot;&nbsp; <a href="https://facebook.com" style="color:${CA};text-decoration:none;font-weight:600;">Bears Track Club on Facebook</a></p>
</td></tr></table></td></tr>

<!-- FOOTER -->
<tr><td style="background:linear-gradient(135deg,${CN},#0a1520);padding:20px 40px;text-align:center;border-radius:0 0 12px 12px;">
<p style="margin:0;font-size:10px;${F}color:rgba(255,255,255,.45);letter-spacing:1.5px;text-transform:uppercase;">Bears Track Club &nbsp;&bull;&nbsp; Monument, CO &nbsp;&bull;&nbsp; bearstc.org</p>
</td></tr>

</table></td></tr></table>

<script>
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3qSjFUlITFmxan9NclBkpEO5ojgGEm8lnA6PQSmMBP5OzP2gMfsW_wKqkH2OIvykG/exec";
async function submitBio() {
  const btn = document.querySelector('.bio-form button');
  const msg = document.getElementById('formMessage');
  const required = {
    athleteName: document.getElementById('athleteName').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    country: document.getElementById('country').value,
    email: document.getElementById('email').value,
    graduationYear: document.getElementById('graduationYear').value,
    teamAlias: document.getElementById('teamAlias').value,
    coach: document.getElementById('coach').value,
    school: document.getElementById('school').value,
    birthdate: document.getElementById('birthdate').value,
    emergencyContactName: document.getElementById('emergencyContactName').value,
    emergencyContactPhone: document.getElementById('emergencyContactPhone').value,
  };
  for (const [k, v] of Object.entries(required)) {
    if (!v || v.trim() === '') {
      msg.className = 'error';
      msg.textContent = 'Please fill in all required fields (marked with *).';
      return;
    }
  }
  const data = {
    ...required,
    namePronunciation: document.getElementById('namePronunciation').value,
    collegeChoices: document.getElementById('collegeChoices').value,
    tfHonors: document.getElementById('tfHonors').value,
    otherSportsHonors: document.getElementById('otherSportsHonors').value,
    academicHonors: document.getElementById('academicHonors').value,
    noteworthyRelatives: document.getElementById('noteworthyRelatives').value,
    anythingElse: document.getElementById('anythingElse').value,
  };
  btn.textContent = 'Submitting...';
  btn.disabled = true;
  msg.textContent = '';
  msg.className = '';
  try {
    const resp = await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify(data) });
    const result = await resp.json();
    if (result.status === 'success') {
      document.getElementById('formFields').innerHTML = '<div class="success">&check; Thank you! Your athlete bio has been submitted successfully.</div>';
    } else { throw new Error(result.message || 'Unknown error'); }
  } catch (err) {
    msg.className = 'error';
    msg.textContent = 'Submission failed: ' + err.message + '. Please try again or contact Coach Luke.';
    btn.textContent = 'Submit Athlete Bio \\u2192';
    btn.disabled = false;
  }
}
<\/script>
</body></html>`;

fs.writeFileSync(OUTPUT, html, 'utf8');
console.log('Newsletter generated:', OUTPUT);
console.log('File size:', html.length.toLocaleString(), 'bytes');
