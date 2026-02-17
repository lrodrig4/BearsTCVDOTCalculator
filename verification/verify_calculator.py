from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the file
        cwd = os.getcwd()
        file_path = f"file://{cwd}/test_calculator.html"
        print(f"Loading {file_path}")

        # We use domcontentloaded to avoid waiting for all CDNs if they are slow
        page.goto(file_path, wait_until="domcontentloaded")

        # Verify CSS is loaded by checking computed style
        wrapper = page.locator("#pc-calculator-wrapper")
        font_family = wrapper.evaluate("element => getComputedStyle(element).fontFamily")
        print(f"Computed font-family: {font_family}")

        # Check if calculator.css is loaded
        is_loaded = page.evaluate("""() => {
            for (let i = 0; i < document.styleSheets.length; i++) {
                const sheet = document.styleSheets[i];
                if (sheet.href && sheet.href.includes('calculator.css')) {
                    try {
                        // Try to access rules to confirm it's loaded (might be restricted by CORS for file:// but let's see)
                        // Actually, for link tags, existence in styleSheets with href is a good sign
                        return true;
                    } catch (e) {
                        return true;
                    }
                }
            }
            return false;
        }""")
        print(f"calculator.css loaded: {is_loaded}")

        # Take a screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/calculator_screenshot.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
