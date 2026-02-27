"""
Generates the Nike Indoor Nationals 2026 newsletter HTML.
Run: python generate_newsletter.py
Output: bears_tc_nike_indoor_newsletter.html
"""
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "bears_tc_nike_indoor_newsletter.html")

# ─── Reusable style fragments ───
F = "font-family:Arial,Helvetica,sans-serif;"
C_NAVY = "#0d1b2a"
C_MID = "#1b3a5c"
C_BODY = "#333333"
C_MUTED = "#6b7c8d"
C_BORDER = "#e0e6ed"
C_CARD_BG = "#f7f9fb"

def section_header(title):
    return f"""<tr><td style="padding:28px 40px 0 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td style="border-bottom:2px solid {C_NAVY};padding-bottom:6px;">
<p style="margin:0;font-size:12px;{F}color:{C_MID};letter-spacing:1.5px;text-transform:uppercase;font-weight:700;">{title}</p>
</td></tr></table></td></tr>"""

def divider():
    return f"""<tr><td style="padding:0 40px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td style="border-top:1px solid {C_BORDER};font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>"""

def p_text(text, extra_style=""):
    return f'<p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:{C_BODY};{F}{extra_style}">{text}</p>'

# ─── Build HTML ───
html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bears Track Club &ndash; Nike Indoor Nationals 2026</title>
<style>
.bio-form {{ max-width:520px; margin:0 auto; }}
.bio-form label {{ display:block; font-size:13px; {F} color:{C_MID}; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; margin:14px 0 4px 0; }}
.bio-form input, .bio-form textarea, .bio-form select {{ width:100%; box-sizing:border-box; padding:10px 12px; font-size:14px; {F} color:{C_BODY}; border:1px solid {C_BORDER}; border-radius:4px; background:#fff; }}
.bio-form textarea {{ min-height:60px; resize:vertical; }}
.bio-form .required::after {{ content:" *"; color:#c0392b; }}
.bio-form button {{ display:block; width:100%; margin-top:20px; padding:14px; background:{C_MID}; color:#fff; border:none; border-radius:4px; font-size:15px; {F} font-weight:700; cursor:pointer; letter-spacing:0.5px; }}
.bio-form button:hover {{ background:{C_NAVY}; }}
.bio-form .success {{ background:#d4edda; color:#155724; padding:16px; border-radius:6px; text-align:center; font-size:15px; {F} font-weight:600; }}
.bio-form .error {{ background:#f8d7da; color:#721c24; padding:12px; border-radius:4px; text-align:center; font-size:13px; {F} margin-top:8px; }}
</style>
</head>
<body style="margin:0;padding:0;background-color:#f2f2f2;-webkit-font-smoothing:antialiased;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f2f2f2;">
<tr><td align="center" style="padding:20px 10px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;">

<!-- HEADER -->
<tr><td align="center" style="background-color:{C_NAVY};padding:32px 40px 28px 40px;">
<img src="https://images.squarespace-cdn.com/content/v1/6757058059950841e0b84da8/31690ecd-1495-46ac-b0cf-fd559d5410ce/Transparent+BTC+Logo.png?format=500w" alt="Bears Track Club" width="140" style="display:block;width:140px;height:auto;border:0;">
</td></tr>

<!-- HEADLINE -->
<tr><td style="background-color:{C_MID};padding:18px 40px;text-align:center;">
<p style="margin:0;font-size:13px;{F}color:#ffffff;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Nike Indoor Nationals 2026 &mdash; NYC</p>
</td></tr>

<!-- HERO IMAGE -->
<tr><td style="padding:0;">
<img src="https://images.squarespace-cdn.com/content/v1/596d6cf1b3db2b5b22143bdb/1681742940481-GSZRBDKFQBE2OP7H8BUL/Millrose_115th_Dettman_107.jpg?format=1500w" alt="The Armory" width="600" style="display:block;width:100%;height:auto;border:0;">
</td></tr>

<!-- NIN LOGO -->
<tr><td align="center" style="background-color:#111;padding:20px 40px;">
<img src="https://alivestatic.athletic.net/meet-images/cbfa59c676b7cd56f099d4bd4a9b02d3.png" alt="Nike Indoor Nationals 2026" width="280" style="display:block;width:280px;height:auto;border:0;">
</td></tr>

<!-- INTRO -->
<tr><td style="padding:32px 40px 24px 40px;">
{p_text("Hi everyone,")}
{p_text("Congratulations to our <strong>seven Bears athletes</strong> who have qualified for the <strong>Nike Indoor Nationals 2026</strong> at The Armory in New York City! This is the premier indoor track &amp; field championship for high school athletes in the nation, and we are incredibly proud of each of you.")}
{p_text("Below you&rsquo;ll find everything you need &mdash; payment information, travel logistics, the full race schedule, required action items, and your athlete bio form. Please read through carefully!", "margin-bottom:0;")}
</td></tr>

{divider()}

<!-- ═══════════ SECTION 1: PAYMENT ═══════════ -->
{section_header("1 &mdash; Entry Fees &amp; Payment")}

<tr><td style="padding:20px 40px 8px 40px;">
{p_text("The base cost is <strong>$60 per individual event</strong> and <strong>$60 per relay leg</strong>. The registration platform processing fee is split evenly among all 7 athletes (<strong>~$8.32 each</strong>).")}
</td></tr>

<!-- FEE TABLE -->
<tr><td style="padding:0 40px 20px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid {C_BORDER};border-radius:6px;overflow:hidden;">
<tr style="background-color:{C_NAVY};">
<td style="padding:10px 16px;font-size:12px;{F}color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Athlete</td>
<td style="padding:10px 16px;font-size:12px;{F}color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Events</td>
<td width="90" align="right" style="padding:10px 16px;font-size:12px;{F}color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Total</td>
</tr>"""

athletes = [
    ("Benjamin Olds", "800m (EE), 1 Mile (Champ), 4x800 (EE), DMR (Champ)", "$248.32", ""),
    ("Axel Mason", "800m (EE), 4x800 (EE), DMR (Champ)", "$188.32", "background-color:#fafbfc;"),
    ("Lukas Sturgeon", "4x800 (EE), DMR (Champ)", "$128.32", ""),
    ("Jake Bossinger", "4x800 (EE), DMR (Champ)", "$128.32", "background-color:#fafbfc;"),
    ("Jackson Marshall", "800m (EE)", "$68.32", ""),
    ("Preston Hall", "1 Mile (Middle School)", "$68.32", "background-color:#fafbfc;"),
    ("Esther Paulson", "5000m (EE)", "$68.32", ""),
]
for i, (name, events, cost, bg) in enumerate(athletes):
    border = f"border-bottom:1px solid #eef1f4;" if i < len(athletes)-1 else ""
    html += f"""<tr style="{bg}">
<td style="padding:10px 16px;font-size:14px;{F}color:{C_NAVY};font-weight:600;{border}vertical-align:top;">{name}</td>
<td style="padding:10px 16px;font-size:14px;{F}color:{C_BODY};{border}line-height:1.6;">{events}</td>
<td align="right" style="padding:10px 16px;font-size:14px;{F}color:{C_NAVY};font-weight:700;{border}">{cost}</td>
</tr>"""

html += f"""</table></td></tr>

<!-- VENMO CTA -->
<tr><td style="padding:0 40px 32px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:{C_NAVY};border-radius:6px;">
<tr><td align="center" style="padding:24px;">
<p style="margin:0 0 6px 0;font-size:12px;{F}color:#8ba8c4;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Send Payment Via Venmo</p>
<p style="margin:0 0 6px 0;font-size:22px;{F}color:#fff;font-weight:700;">@BearsTC</p>
<p style="margin:0 0 12px 0;font-size:13px;{F}color:#cbd5e0;">Or mail a check payable to &ldquo;Bears Track Club&rdquo;</p>
<p style="margin:0;font-size:14px;{F}color:#cbd5e0;"><strong style="color:#fff;">Please pay as soon as possible</strong> so we can finalize team registration.</p>
</td></tr></table></td></tr>

{divider()}

<!-- ═══════════ SECTION 2: TRAVEL & LOGISTICS ═══════════ -->
{section_header("2 &mdash; Travel &amp; Logistics")}

<tr><td style="padding:20px 40px 8px 40px;">
{p_text("There are <strong>no additional costs</strong> for athletes beyond the registration fees above. Parents and athletes are welcome to plan their own travel and accommodations &mdash; there is no obligation outside of the racing schedule. If you&rsquo;d like to get together while we&rsquo;re in NYC, we can absolutely plan something, but nothing is required!")}
</td></tr>

<!-- COACHES FLIGHT CARD -->
<tr><td style="padding:0 40px 16px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:{C_CARD_BG};border:1px solid {C_BORDER};border-radius:6px;">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 2px 0;font-size:16px;{F}color:{C_NAVY};font-weight:700;">Coaches&rsquo; Flight Info</p>
<p style="margin:0 0 14px 0;font-size:13px;{F}color:{C_MUTED};">Denver (DEN) &rarr; LaGuardia (LGA)</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;{F}color:{C_BODY};">
<tr><td style="padding:4px 0;"><strong>Depart:</strong>&nbsp; Tue, March 11 at 9:15 AM MT &rarr; Arrive LGA at 2:50 PM ET</td></tr>
<tr><td style="padding:4px 0;"><strong>Return:</strong>&nbsp; Sat, March 15 at 8:55 PM ET &rarr; Arrive DEN at 11:25 PM MT</td></tr>
</table>
<p style="margin:14px 0 0 0;font-size:14px;line-height:1.7;{F}color:{C_BODY};">We will be meeting athletes as they arrive. We&rsquo;ll coordinate meetup details closer to the date!</p>
</td></tr></table></td></tr>

<!-- VENUE CARD -->
<tr><td style="padding:0 40px 16px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:{C_CARD_BG};border:1px solid {C_BORDER};border-radius:6px;">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 2px 0;font-size:16px;{F}color:{C_NAVY};font-weight:700;">The Venue &mdash; The Armory</p>
<p style="margin:0 0 14px 0;font-size:13px;{F}color:{C_MUTED};">The Nike Track &amp; Field Center at The Armory</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;{F}color:{C_BODY};">
<tr><td style="padding:4px 0;"><strong>Address:</strong>&nbsp; 216 Fort Washington Ave, New York, NY 10032</td></tr>
<tr><td style="padding:4px 0;"><strong>Nearest Subway:</strong>&nbsp; 168th St station (A/C/1 trains)</td></tr>
<tr><td style="padding:4px 0;"><strong>From LaGuardia:</strong>&nbsp; ~45 min by taxi/Uber, or M60 bus &rarr; subway</td></tr>
<tr><td style="padding:4px 0;"><strong>Live Stream:</strong>&nbsp; <a href="https://www.nikeindoornationals.com" style="color:{C_MID};text-decoration:underline;font-weight:600;">NikeIndoorNationals.com</a> (free!)</td></tr>
</table>
</td></tr></table></td></tr>

<!-- VENUE IMAGE -->
<tr><td style="padding:0 40px 8px 40px;">
<img src="https://images.squarespace-cdn.com/content/v1/596d6cf1b3db2b5b22143bdb/1556119709547-HYG7X3XNJX7Z2A9RE5KY/NA2FMillrose1777_origL.jpg?format=1500w" alt="The Armory Track" width="520" style="display:block;width:100%;height:auto;border:0;border-radius:6px;">
</td></tr>
<tr><td style="padding:0 40px 24px 40px;">
<p style="margin:0;font-size:13px;{F}color:{C_MUTED};font-style:italic;text-align:center;">The Nike Track &amp; Field Center at The Armory &ndash; New York City</p>
</td></tr>

{divider()}

<!-- ═══════════ SECTION 3: BEARS RACE SCHEDULE ═══════════ -->
{section_header("3 &mdash; Bears Race Schedule")}

<tr><td style="padding:20px 40px 8px 40px;">
{p_text("Here is exactly when each Bears athlete competes. All times are <strong>Eastern Time (ET)</strong>. Be sure to adjust for Mountain Time (ET is 2 hours ahead).")}
</td></tr>

<!-- BEARS SCHEDULE TABLE -->
<tr><td style="padding:0 40px 20px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid {C_BORDER};border-radius:6px;overflow:hidden;">
<tr style="background-color:{C_NAVY};">
<td style="padding:10px 12px;font-size:11px;{F}color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Day</td>
<td style="padding:10px 12px;font-size:11px;{F}color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Time (ET)</td>
<td style="padding:10px 12px;font-size:11px;{F}color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Event</td>
<td style="padding:10px 12px;font-size:11px;{F}color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Bears Athletes</td>
</tr>"""

schedule = [
    ("Thu 3/12", "3:48 PM", "Boys MS 1 Mile", "Preston Hall", ""),
    ("Thu 3/12", "8:36 PM", "Girls EE 5000m", "Esther Paulson", "background-color:#fafbfc;"),
    ("Sat 3/14", "2:37 PM", "Boys EE 800m", "Benjamin Olds, Axel Mason, Jackson Marshall", ""),
    ("Sat 3/14", "6:45 PM", "Boys Champ DMR", "Axel Mason, Lukas Sturgeon, Jake Bossinger, Benjamin Olds", "background-color:#fafbfc;"),
    ("Sat 3/14", "9:11 PM", "Mixed Coaches Mile", "Coach Zev \u2B50", "background-color:#fef9f0;"),
    ("Sun 3/15", "9:36 AM", "Boys EE 4x800m", "Benjamin Olds, Lukas Sturgeon, Jake Bossinger, Axel Mason", ""),
    ("Sun 3/15", "11:48 AM", "Boys Champ 1 Mile", "Benjamin Olds", "background-color:#fafbfc;"),
]
for i, (day, time, event, athletes_str, bg) in enumerate(schedule):
    border = f"border-bottom:1px solid #eef1f4;" if i < len(schedule)-1 else ""
    html += f"""<tr style="{bg}">
<td style="padding:10px 12px;font-size:13px;{F}color:{C_NAVY};font-weight:600;{border}vertical-align:top;white-space:nowrap;">{day}</td>
<td style="padding:10px 12px;font-size:13px;{F}color:{C_BODY};{border}vertical-align:top;white-space:nowrap;">{time}</td>
<td style="padding:10px 12px;font-size:13px;{F}color:{C_BODY};{border}vertical-align:top;">{event}</td>
<td style="padding:10px 12px;font-size:13px;{F}color:{C_BODY};{border}line-height:1.5;">{athletes_str}</td>
</tr>"""

html += f"""</table></td></tr>

<!-- Coach Zev note -->
<tr><td style="padding:0 40px 20px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fef9f0;border:1px solid #f0dcc0;border-radius:6px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0;font-size:14px;line-height:1.7;{F}color:{C_BODY};"><strong style="color:#b8860b;">&star; Coach Zev</strong> will be running the <strong>Coaches&rsquo; Mile</strong> on Saturday evening at 9:11 PM ET &mdash; come watch and cheer him on!</p>
</td></tr></table></td></tr>

{divider()}

<!-- ═══════════ SECTION 4: FULL NIN SCHEDULE ═══════════ -->
{section_header("4 &mdash; Full Meet Schedule (All Events)")}

<tr><td style="padding:20px 40px 8px 40px;">
{p_text("For reference, here is the complete Nike Indoor Nationals schedule. <strong>Events highlighted in bold</strong> are the ones our Bears athletes are entered in.")}
</td></tr>"""

# Full schedule by day
full_schedule = {
    "Thursday, March 12": [
        ("3:20 PM", "Girls MS 1 Mile", False),
        ("3:48 PM", "Boys MS 1 Mile", True),
        ("4:16 PM", "Girls Freshman 1 Mile", False),
        ("4:44 PM", "Boys Freshman 1 Mile", False),
        ("5:32 PM", "Girls Champ 5000m", False),
        ("5:56 PM", "Boys Champ 5000m", False),
        ("8:36 PM", "Girls EE 5000m", True),
        ("8:56 PM", "Boys EE 5000m", False),
    ],
    "Friday, March 13": [
        ("5:18 PM", "Girls Champ 4xMile Relay", False),
        ("5:43 PM", "Boys Champ 4xMile Relay", False),
        ("6:05 PM", "Girls Champ SMR", False),
        ("6:51 PM", "Boys Champ SMR", False),
        ("7:35 PM", "Girls EE SMR", False),
        ("8:13 PM", "Boys EE SMR", False),
    ],
    "Saturday, March 14": [
        ("1:36 PM", "Girls Champ 800m", False),
        ("1:56 PM", "Boys Champ 800m", False),
        ("2:17 PM", "Girls EE 800m", False),
        ("2:37 PM", "Boys EE 800m", True),
        ("6:19 PM", "Girls Champ DMR", False),
        ("6:45 PM", "Boys Champ DMR", True),
        ("9:11 PM", "Mixed Coaches Mile", True),
    ],
    "Sunday, March 15": [
        ("9:00 AM", "Girls EE 4x800m Relay", False),
        ("9:36 AM", "Boys EE 4x800m Relay", True),
        ("11:20 AM", "Girls Champ 1 Mile", False),
        ("11:48 AM", "Boys Champ 1 Mile", True),
        ("12:50 PM", "Girls EE 1 Mile", False),
        ("1:18 PM", "Boys EE 1 Mile", False),
        ("1:46 PM", "Girls Champ 4x800m Relay", False),
        ("2:10 PM", "Boys Champ 4x800m Relay", False),
        ("2:49 PM", "Girls State Club DMR", False),
        ("3:01 PM", "Boys State Club DMR", False),
    ],
}

for day_name, events in full_schedule.items():
    html += f"""<tr><td style="padding:0 40px 4px 40px;">
<p style="margin:0;font-size:14px;{F}color:{C_NAVY};font-weight:700;padding-top:12px;">{day_name}</p>
</td></tr>
<tr><td style="padding:0 40px 12px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid {C_BORDER};border-radius:4px;overflow:hidden;">"""
    for j, (time, event_name, is_bears) in enumerate(events):
        bg = "background-color:#e8f4e8;" if is_bears else ("background-color:#fafbfc;" if j % 2 == 1 else "")
        weight = "font-weight:700;" if is_bears else ""
        border = f"border-bottom:1px solid #eef1f4;" if j < len(events)-1 else ""
        bears_tag = ' <span style="color:#2e7d32;">&#9679; BEARS</span>' if is_bears else ""
        html += f"""<tr style="{bg}">
<td width="80" style="padding:6px 12px;font-size:13px;{F}color:{C_BODY};{border}vertical-align:top;{weight}">{time}</td>
<td style="padding:6px 12px;font-size:13px;{F}color:{C_BODY};{border}{weight}">{event_name}{bears_tag}</td>
</tr>"""
    html += "</table></td></tr>"

html += f"""
{divider()}

<!-- ═══════════ SECTION 5: ACTION ITEMS ═══════════ -->
{section_header("5 &mdash; Required Action Items")}

<tr><td style="padding:20px 40px 8px 40px;">
{p_text("Every athlete <strong>must</strong> complete the following before the meet:")}
</td></tr>

<!-- Action items cards -->
<tr><td style="padding:0 40px 12px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:{C_CARD_BG};border:1px solid {C_BORDER};border-radius:6px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 4px 0;font-size:12px;{F}color:#c0392b;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Required</p>
<p style="margin:0 0 8px 0;font-size:15px;{F}color:{C_NAVY};font-weight:700;">1. Sign the Adobe E-Waiver</p>
<p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;{F}color:{C_BODY};">Each athlete (and parent/guardian if under 18) must sign the official NSAF waiver.</p>
<a href="https://na4.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhDpkVgANc154tbo-eoIfZmZIdo3wf3w1iMnGWrOPrAz34lvGi35_m9My-wA2-BsV6c*" style="display:inline-block;background-color:#c0392b;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-size:13px;{F}font-weight:600;">Sign Waiver &rarr;</a>
</td></tr></table></td></tr>

<tr><td style="padding:0 40px 12px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:{C_CARD_BG};border:1px solid {C_BORDER};border-radius:6px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 4px 0;font-size:12px;{F}color:#c0392b;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Required</p>
<p style="margin:0 0 8px 0;font-size:15px;{F}color:{C_NAVY};font-weight:700;">2. Add Photo to Athletic.net Profile</p>
<p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;{F}color:{C_BODY};">Nike requires a profile photo for each athlete. Log in to Athletic.net and add your headshot.</p>
<a href="https://support.athletic.net/article/q4o3qxsn0d-add-a-photo-to-your-profile" style="display:inline-block;background-color:{C_MID};color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-size:13px;{F}font-weight:600;">Photo Instructions &rarr;</a>
</td></tr></table></td></tr>

<tr><td style="padding:0 40px 12px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:{C_CARD_BG};border:1px solid {C_BORDER};border-radius:6px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 4px 0;font-size:12px;{F}color:{C_MID};text-transform:uppercase;letter-spacing:1px;font-weight:700;">Optional</p>
<p style="margin:0 0 8px 0;font-size:15px;{F}color:{C_NAVY};font-weight:700;">3. Pre-Competition Shop</p>
<p style="margin:0 0 12px 0;font-size:14px;line-height:1.7;{F}color:{C_BODY};">Customize your bag and gear from the official NSAF shop on Running Warehouse!</p>
<a href="https://www.runningwarehouse.com/catpage-NSAFPP.html?from=nsaf" style="display:inline-block;background-color:{C_MID};color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-size:13px;{F}font-weight:600;">Shop Now &rarr;</a>
</td></tr></table></td></tr>

{divider()}

<!-- ═══════════ SECTION 6: ATHLETE BIO FORM ═══════════ -->
{section_header("6 &mdash; Athlete Bio (Required by Nike)")}

<tr><td style="padding:20px 40px 8px 40px;">
{p_text("Nike needs a bio for each athlete. Please fill out the form below &mdash; it will submit directly to our team. <strong>All fields marked with * are required.</strong>")}
</td></tr>

<tr><td style="padding:0 40px 32px 40px;">
<div class="bio-form" id="bioForm">
<div id="formFields">

<label class="required">Athlete Name</label>
<select id="athleteName">
<option value="">Select your name&hellip;</option>
<option>Benjamin Olds</option>
<option>Axel Mason</option>
<option>Lukas Sturgeon</option>
<option>Jake Bossinger</option>
<option>Jackson Marshall</option>
<option>Preston Hall</option>
<option>Esther Paulson</option>
</select>

<label class="required">City</label>
<input type="text" id="city" placeholder="e.g. Monument">

<label class="required">State</label>
<input type="text" id="state" placeholder="e.g. Colorado">

<label class="required">Country</label>
<input type="text" id="country" value="United States">

<label class="required">Email</label>
<input type="email" id="email" placeholder="your@email.com">

<label class="required">Graduation Year</label>
<input type="text" id="graduationYear" placeholder="e.g. 2027">

<label class="required">Team Alias</label>
<input type="text" id="teamAlias" value="Bears Track Club">

<label class="required">Coach</label>
<input type="text" id="coach" value="Coach Luke Rodriguez">

<label class="required">School</label>
<input type="text" id="school" placeholder="e.g. Palmer Ridge High School">

<label class="required">Birthdate</label>
<input type="date" id="birthdate">

<label>Pronunciation of Your Name</label>
<input type="text" id="namePronunciation" placeholder="e.g. BEN-juh-min OHLDZ">

<label>College Choices</label>
<textarea id="collegeChoices" placeholder="List any colleges you are considering"></textarea>

<label>Track &amp; Field Honors</label>
<textarea id="tfHonors" placeholder="e.g. State Champion 800m, All-Conference"></textarea>

<label>Other Sports Honors</label>
<textarea id="otherSportsHonors" placeholder="Honors from other sports"></textarea>

<label>Academic &amp; Other Honors</label>
<textarea id="academicHonors" placeholder="e.g. Honor Roll, National Merit"></textarea>

<label>Noteworthy Relatives in Sports</label>
<textarea id="noteworthyRelatives" placeholder="Relatives and their accomplishments"></textarea>

<label>Anything Else We Should Know</label>
<textarea id="anythingElse" placeholder="Anything else you'd like to share"></textarea>

<button type="button" onclick="submitBio()">Submit Athlete Bio &rarr;</button>
<div id="formMessage"></div>
</div>
</div>
</td></tr>

{divider()}

<!-- ═══════════ ACTION SHOTS ═══════════ -->
<tr><td style="padding:20px 40px 28px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td width="49%" style="padding-right:4px;">
<img src="https://nikeindoornationals.runnerspace.com/members/photos/94310/Engels-Lutkenhaus-NIN25_full.jpg" alt="Nike Indoor Nationals Racing" width="252" style="display:block;width:100%;height:auto;border:0;border-radius:6px;">
</td>
<td width="2%"></td>
<td width="49%" style="padding-left:4px;">
<img src="https://nikeindoornationals.runnerspace.com/members/photos/94310/KitchingsAva1-NIN25_full.jpg" alt="Nike Indoor Nationals Sprint" width="252" style="display:block;width:100%;height:auto;border:0;border-radius:6px;">
</td>
</tr></table></td></tr>

<!-- ═══════════ QUESTIONS ═══════════ -->
<tr><td style="padding:0 40px 28px 40px;text-align:center;">
{p_text("Let us know if you have any questions! We are so excited for this trip.", "text-align:center;")}
</td></tr>

<!-- ═══════════ SIGN-OFF ═══════════ -->
<tr><td style="padding:0 40px 28px 40px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td style="border-top:1px solid {C_BORDER};padding-top:20px;">
<p style="margin:0 0 4px 0;font-size:15px;color:{C_BODY};{F}">Best,</p>
<p style="margin:0 0 12px 0;font-size:16px;color:{C_NAVY};{F}font-weight:700;">Coach Luke</p>
<p style="margin:0;font-size:13px;color:{C_MUTED};{F}">Instagram <a href="https://instagram.com/bears_tc" style="color:{C_MID};text-decoration:none;">@bears_tc</a> &nbsp;&middot;&nbsp; <a href="https://facebook.com" style="color:{C_MID};text-decoration:none;">Bears Track Club on Facebook</a></p>
</td></tr></table></td></tr>

<!-- FOOTER -->
<tr><td align="center" style="background-color:{C_NAVY};padding:16px 40px;">
<p style="margin:0;font-size:11px;{F}color:{C_MUTED};letter-spacing:1px;">BEARS TRACK CLUB &nbsp;&middot;&nbsp; MONUMENT, CO &nbsp;&middot;&nbsp; BEARSTC.ORG</p>
</td></tr>

</table></td></tr></table>

<script>
// ─── ATHLETE BIO FORM SUBMISSION ───
// Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

async function submitBio() {{
  const btn = document.querySelector('.bio-form button');
  const msg = document.getElementById('formMessage');
  
  // Gather required fields
  const required = {{
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
  }};

  // Validate required fields
  for (const [key, val] of Object.entries(required)) {{
    if (!val || val.trim() === '') {{
      msg.className = 'error';
      msg.textContent = 'Please fill in all required fields (marked with *).';
      return;
    }}
  }}

  // Gather optional fields
  const data = {{
    ...required,
    namePronunciation: document.getElementById('namePronunciation').value,
    collegeChoices: document.getElementById('collegeChoices').value,
    tfHonors: document.getElementById('tfHonors').value,
    otherSportsHonors: document.getElementById('otherSportsHonors').value,
    academicHonors: document.getElementById('academicHonors').value,
    noteworthyRelatives: document.getElementById('noteworthyRelatives').value,
    anythingElse: document.getElementById('anythingElse').value,
  }};

  btn.textContent = 'Submitting...';
  btn.disabled = true;
  msg.textContent = '';
  msg.className = '';

  try {{
    const resp = await fetch(GOOGLE_SCRIPT_URL, {{
      method: 'POST',
      body: JSON.stringify(data),
    }});
    const result = await resp.json();
    if (result.status === 'success') {{
      document.getElementById('formFields').innerHTML = '<div class="success">&check; Thank you! Your athlete bio has been submitted successfully.</div>';
    }} else {{
      throw new Error(result.message || 'Unknown error');
    }}
  }} catch (err) {{
    msg.className = 'error';
    msg.textContent = 'Submission failed: ' + err.message + '. Please try again or contact Coach Luke.';
    btn.textContent = 'Submit Athlete Bio &rarr;';
    btn.disabled = false;
  }}
}}
</script>

</body>
</html>"""

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Newsletter generated: {{OUTPUT}}")
print(f"File size: {{len(html):,}} bytes")
