/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load the HTML file
const html = fs.readFileSync(path.resolve(__dirname, './Calculator Code'), 'utf8');

describe('Pace Calculator Logic', () => {
    let Calculator;

    beforeAll(() => {
        // Mock localStorage before executing script
        const localStorageMock = (function() {
            let store = {};
            return {
                getItem: function(key) {
                    return store[key] || null;
                },
                setItem: function(key, value) {
                    store[key] = value.toString();
                },
                clear: function() {
                    store = {};
                },
                removeItem: function(key) {
                    delete store[key];
                }
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        // Mock window.matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });

        // Mock Hammer.js
        window.Hammer = jest.fn().mockImplementation(() => ({
            on: jest.fn(),
        }));

        // Set up the DOM with the HTML content so that getElementById works
        document.documentElement.innerHTML = html;

        // Extract and execute the main script logic
        // We look for the script that contains the IIFE with 'const state ='
        const scripts = html.split('<script>');
        const mainScript = scripts.find(s => s.includes('const state ='));

        if (mainScript) {
            const jsCode = mainScript.split('</script>')[0];
            // We need to execute it in the global scope (window)
            eval(jsCode);
            Calculator = window.PaceCalculator;
        } else {
            throw new Error("Could not find the main script logic in 'Calculator Code'");
        }
    });

    test('Global PaceCalculator object should be exposed', () => {
        expect(Calculator).toBeDefined();
        expect(Calculator.Calculations).toBeDefined();
        expect(Calculator.CONFIG).toBeDefined();
    });

    describe('Calculations', () => {
        let Calculations;
        beforeAll(() => {
            Calculations = window.PaceCalculator.Calculations;
        });

        describe('timeToSec', () => {
            test('converts mm:ss correctly', () => {
                expect(Calculations.timeToSec('5:00')).toBe(300);
                expect(Calculations.timeToSec('10:30')).toBe(630);
                expect(Calculations.timeToSec('0:45')).toBe(45);
            });

            test('converts hh:mm:ss correctly', () => {
                expect(Calculations.timeToSec('1:00:00', 'hh:mm:ss')).toBe(3600);
                expect(Calculations.timeToSec('1:01:30', 'hh:mm:ss')).toBe(3690);
            });

            test('handles invalid inputs', () => {
                expect(Calculations.timeToSec('')).toBe(NaN);
                expect(Calculations.timeToSec(null)).toBe(NaN);
                expect(Calculations.timeToSec('abc')).toBe(NaN);
            });
        });

        describe('secToPace', () => {
            test('converts seconds to mm:ss string', () => {
                expect(Calculations.secToPace(300)).toBe('5:00');
                expect(Calculations.secToPace(630)).toBe('10:30');
                expect(Calculations.secToPace(45)).toBe('0:45');
            });

            test('handles seconds > 3600 (returns mm:ss format, potentially > 60 mins)', () => {
                // Logic check: The implementation uses Math.floor(sec / 60) for minutes.
                expect(Calculations.secToPace(3665)).toBe('61:05');
            });
        });

        describe('secToHMS', () => {
            test('formats seconds to H:MM:SS or MM:SS', () => {
                expect(Calculations.secToHMS(300)).toBe('5:00');
                expect(Calculations.secToHMS(3600)).toBe('1:00:00');
                expect(Calculations.secToHMS(3665)).toBe('1:01:05');
            });
        });

        describe('calculateVDOT', () => {
            const fiveK_Meters = 5000;

            test('calculates reasonable VDOT for 20:00 5K', () => {
                // 20 mins = 1200 seconds
                const vdot = Calculations.calculateVDOT(fiveK_Meters, 1200);
                expect(vdot).toBeCloseTo(49.8, 1);
            });

            test('calculates reasonable VDOT for 15:00 5K', () => {
                // 15 mins = 900 seconds
                const vdot = Calculations.calculateVDOT(fiveK_Meters, 900);
                expect(vdot).toBeCloseTo(69.6, 1);
            });
        });

        describe('calculateTimeFromVDOT', () => {
            const fiveK_Meters = 5000;

            test('calculates time close to original input', () => {
                const originalTime = 1200; // 20:00
                const vdot = Calculations.calculateVDOT(fiveK_Meters, originalTime);
                const calculatedTime = Calculations.calculateTimeFromVDOT(vdot, fiveK_Meters);
                expect(calculatedTime).toBeCloseTo(originalTime, 0);
            });
        });

        describe('adjustAltitude', () => {
            test('returns null for low altitude', () => {
                expect(Calculations.adjustAltitude(300, 1000, 5000)).toBeNull();
            });

            test('adjusts time for high altitude (5K at 6000ft)', () => {
                // 20:00 (1200s) at 6000ft
                const result = Calculations.adjustAltitude(1200, 6000, 5000);
                expect(result).not.toBeNull();
                expect(result.adjustment).toBeGreaterThan(0); // Should be faster at sea level
                expect(result.seaLevelTime).toBeLessThan(1200);
            });
        });

        describe('convertTrackType', () => {
            test('converts flat to banked correctly', () => {
                // 200m Flat -> Banked should be faster (less time)
                // Using 200 Meters event
                // time: 25.00s
                const result = Calculations.convertTrackType('200 Meters', 25.00, 'flat', 'banked', 'men');
                expect(result).not.toBeNull();
                expect(result.convertedTime).toBeLessThan(25.00);
            });
        });
    });
});
