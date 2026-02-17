const { Calculations, CONFIG } = require('../js/calculator_logic.js');

describe('Calculator Logic', () => {
    describe('timeToSec', () => {
        test('converts mm:ss string to seconds', () => {
            expect(Calculations.timeToSec('5:30', 'mm:ss')).toBe(330);
            expect(Calculations.timeToSec('0:30', 'mm:ss')).toBe(30);
            expect(Calculations.timeToSec('10:00', 'mm:ss')).toBe(600);
        });

        test('converts hh:mm:ss string to seconds', () => {
            expect(Calculations.timeToSec('1:00:00', 'hh:mm:ss')).toBe(3600);
            expect(Calculations.timeToSec('1:30:30', 'hh:mm:ss')).toBe(5430);
        });

        test('handles invalid inputs gracefully', () => {
            expect(Calculations.timeToSec(null)).toBeNaN();
            expect(Calculations.timeToSec('invalid')).toBeNaN();
        });
    });

    describe('secToPace', () => {
        test('converts seconds to mm:ss format', () => {
            expect(Calculations.secToPace(330)).toBe('5:30');
            expect(Calculations.secToPace(60)).toBe('1:00');
        });

        test('handles km unit', () => {
            // 330 sec/mile -> ~205 sec/km -> 3:25/km
            // 330 * (1000/1609.34) = 205.05
            expect(Calculations.secToPace(330, 'km')).toBe('3:25');
        });
    });

    describe('calculateVDOT', () => {
        test('calculates VDOT correctly for 5K', () => {
            // 20:00 5K (1200s) -> VDOT ~49.8
            const vdot = Calculations.calculateVDOT(5000, 1200);
            expect(vdot).toBeCloseTo(49.8, 1);
        });

        test('calculates VDOT correctly for Marathon', () => {
            // 3:00:00 Marathon (10800s) -> VDOT ~53.5
            const vdot = Calculations.calculateVDOT(42195, 10800);
            expect(vdot).toBeCloseTo(53.5, 1);
        });
    });

    describe('calculateTimeFromVDOT', () => {
        test('calculates time correctly from VDOT', () => {
            const vdot = 50;
            const timeSec = Calculations.calculateTimeFromVDOT(vdot, 5000);
            // VDOT 50 -> 5K ~19:57 (1197s)
            expect(timeSec).toBeCloseTo(1197, -1); // approximate check
        });
    });

    describe('applyUSTFCCA', () => {
        test('converts 1500m to Mile', () => {
            // 1500m time -> Mile time
            // Factor 1.08
            // 4:00 (240s) * 1.08 = 259.2s -> 4:19.2 (approx due to float math and ceil)
            const result = Calculations.applyUSTFCCA('1500 Meters', 240);
            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    event: 'Mile',
                    equivalentTimeSec: 259.21
                })
            ]));
        });
    });

    describe('adjustAltitude', () => {
        test('adjusts for altitude correctly', () => {
            // 5K at 6000ft
            // Altitude data for 6007ft: pct5000 = 3.728%
            // If raw time is 1200s (20:00)
            // Adjustment = 1200 * 0.03728 = 44.736s
            // Sea level time = 1200 - 44.736 = 1155.264s

            const result = Calculations.adjustAltitude(1200, 6007, 5000);
            expect(result.adjustmentPct).toBeCloseTo(3.73, 2);
            expect(result.seaLevelTime).toBeLessThan(1200);
        });

        test('returns null for low altitude', () => {
            const result = Calculations.adjustAltitude(1200, 1000, 5000);
            expect(result).toBeNull();
        });
    });
});
