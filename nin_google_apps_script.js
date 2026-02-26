/**
 * NIN 2026 Athlete Bio Form — Google Apps Script Backend
 * 
 * This web app receives form submissions from the Bears TC newsletter
 * and stores them in the active Google Sheet.
 * 
 * SETUP:
 * 1. Open your "NIN 2026 Athlete Bios" Google Sheet
 * 2. Extensions > Apps Script
 * 3. Paste this code
 * 4. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into the newsletter HTML
 */

function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: "ok", message: "NIN 2026 Bio Form Backend is running" }))
        .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    try {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = JSON.parse(e.postData.contents);

        var headers = [
            "Timestamp", "Athlete Name", "City", "State", "Country", "Email",
            "Graduation Year", "Team Alias", "Coach", "School", "Birthdate",
            "Emergency Contact Name", "Emergency Contact Phone",
            "Name Pronunciation", "College Choices", "TF Honors",
            "Other Sports Honors", "Academic Honors", "Noteworthy Relatives", "Anything Else"
        ];

        // Auto-create headers on first submission
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(headers);
            sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
            sheet.setFrozenRows(1);
        }

        var row = [
            new Date().toLocaleString("en-US", { timeZone: "America/Denver" }),
            data.athleteName || "",
            data.city || "",
            data.state || "",
            data.country || "United States",
            data.email || "",
            data.graduationYear || "",
            data.teamAlias || "",
            data.coach || "",
            data.school || "",
            data.birthdate || "",
            data.emergencyContactName || "",
            data.emergencyContactPhone || "",
            data.namePronunciation || "",
            data.collegeChoices || "",
            data.tfHonors || "",
            data.otherSportsHonors || "",
            data.academicHonors || "",
            data.noteworthyRelatives || "",
            data.anythingElse || ""
        ];

        sheet.appendRow(row);

        // Send email notification to coach
        try {
            var subject = "NIN 2026 Bio Submitted: " + (data.athleteName || "Unknown");
            var body = "Athlete bio submitted!\n\n" +
                "Name: " + (data.athleteName || "") + "\n" +
                "City: " + (data.city || "") + ", " + (data.state || "") + "\n" +
                "Email: " + (data.email || "") + "\n" +
                "School: " + (data.school || "") + "\n" +
                "Graduation Year: " + (data.graduationYear || "") + "\n" +
                "Emergency Contact: " + (data.emergencyContactName || "") + " — " + (data.emergencyContactPhone || "") + "\n\n" +
                "View all submissions in your Google Sheet.";
            MailApp.sendEmail("luketrodriguez1@gmail.com", subject, body);
        } catch (emailError) {
            // Email notification is best-effort, don't fail the submission
            Logger.log("Email notification failed: " + emailError.toString());
        }

        return ContentService
            .createTextOutput(JSON.stringify({ status: "success", message: "Bio submitted successfully!" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
