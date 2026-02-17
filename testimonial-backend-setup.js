// =============================================================
// BEARS TC TESTIMONIAL BACKEND — Google Apps Script
// =============================================================
// 
// SETUP INSTRUCTIONS (takes ~3 minutes):
//
// 1. Go to https://script.google.com
// 2. Click "+ New Project"
// 3. Delete the default code and paste this ENTIRE file
// 4. Click "Deploy" → "New Deployment"
// 5. Type = "Web app"
// 6. Execute as = "Me"
// 7. Who has access = "Anyone"
// 8. Click "Deploy" → Authorize → Allow
// 9. Copy the Web App URL
// 10. Paste it into config.js where it says PASTE_YOUR_APPS_SCRIPT_URL_HERE
//
// That's it! Testimonials will go to a Google Sheet automatically.
// =============================================================

function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);

        // Get or create the spreadsheet
        var ss = getOrCreateSheet();
        var sheet = ss.getSheetByName('Testimonials');

        // Add the testimonial row
        sheet.appendRow([
            new Date().toLocaleString('en-US', { timeZone: 'America/Denver' }),
            data.name || '',
            data.athlete || '',
            data.program || '',
            data.rating || '',
            data.testimonial || '',
            '⭐'.repeat(data.rating || 0)
        ]);

        // Send email notification to Coach Luke
        var subject = '⭐ New Bears TC Testimonial from ' + (data.name || 'Anonymous');
        var body = '🐻 NEW TESTIMONIAL\n\n' +
            'Name: ' + (data.name || 'N/A') + '\n' +
            'Athlete: ' + (data.athlete || 'N/A') + '\n' +
            'Program: ' + (data.program || 'N/A') + '\n' +
            'Rating: ' + '⭐'.repeat(data.rating || 0) + ' (' + data.rating + '/5)\n\n' +
            '📝 TESTIMONIAL:\n' +
            '"' + (data.testimonial || '') + '"\n\n' +
            '---\n' +
            'View all testimonials: ' + ss.getUrl();

        MailApp.sendEmail('info@bearstc.org', subject, body);

        return ContentService
            .createTextOutput(JSON.stringify({ status: 'success' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', message: 'Bears TC Testimonial API is running' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
    var files = DriveApp.getFilesByName('Bears TC Testimonials');

    if (files.hasNext()) {
        return SpreadsheetApp.open(files.next());
    }

    // Create new spreadsheet
    var ss = SpreadsheetApp.create('Bears TC Testimonials');
    var sheet = ss.getActiveSheet();
    sheet.setName('Testimonials');

    // Set up headers
    var headers = ['Timestamp', 'Parent Name', 'Athlete Name', 'Program', 'Rating', 'Testimonial', 'Stars'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1a2744');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');

    // Set column widths
    sheet.setColumnWidth(1, 160); // Timestamp
    sheet.setColumnWidth(2, 150); // Parent Name
    sheet.setColumnWidth(3, 150); // Athlete Name
    sheet.setColumnWidth(4, 180); // Program
    sheet.setColumnWidth(5, 60);  // Rating
    sheet.setColumnWidth(6, 400); // Testimonial
    sheet.setColumnWidth(7, 80);  // Stars

    // Freeze header row
    sheet.setFrozenRows(1);

    return ss;
}

// Run this once to test the setup
function testSetup() {
    var ss = getOrCreateSheet();
    Logger.log('Sheet URL: ' + ss.getUrl());
    Logger.log('Setup complete! Your testimonials will appear here.');
}
