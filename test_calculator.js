const assert = require('assert');
const { Calculations } = require('./calculator_logic.js');

console.log('Running Calculator Tests...');

// --- calculateVDOT Tests ---

// 1. Happy Path: 5K in 20:00 (1200 seconds)
// Expected VDOT is roughly 49.8 (VDOT 50 is ~19:57)
const vdot20 = Calculations.calculateVDOT(5000, 1200);
console.log(`5000m in 1200s (20:00) -> VDOT: ${vdot20.toFixed(4)}`);
assert.ok(vdot20 > 49.0 && vdot20 < 50.0, 'VDOT for 20:00 5K should be approx 49.8');

// 2. Happy Path: 5K in 30:00 (1800 seconds)
// VDOT 30 is 30:40. VDOT 31 is 29:51. So 30:00 should be ~30.8.
const vdot30 = Calculations.calculateVDOT(5000, 1800);
console.log(`5000m in 1800s (30:00) -> VDOT: ${vdot30.toFixed(4)}`);
assert.ok(vdot30 > 30.0 && vdot30 < 31.0, 'VDOT for 30:00 5K should be between 30 and 31');

// 3. Edge Case: Time <= 0
const vdotZero = Calculations.calculateVDOT(5000, 0);
assert.strictEqual(vdotZero, 0, 'VDOT should be 0 for 0 time');

const vdotNeg = Calculations.calculateVDOT(5000, -1);
assert.strictEqual(vdotNeg, 0, 'VDOT should be 0 for negative time');

// --- calculateTimeFromVDOT Tests ---

// 4. Round Trip: 5K, 20:00
const dist = 5000;
const time = 1200;
const vdot = Calculations.calculateVDOT(dist, time);
const timeRecalc = Calculations.calculateTimeFromVDOT(vdot, dist);
console.log(`Round Trip: ${time}s -> VDOT ${vdot.toFixed(4)} -> ${timeRecalc.toFixed(4)}s`);
assert.ok(Math.abs(time - timeRecalc) < 1.0, 'Round trip time should be within 1 second');

// 5. Different Distance: 10K (10000m) in 40:00 (2400s)
const vdot10k = Calculations.calculateVDOT(10000, 2400);
console.log(`10000m in 2400s (40:00) -> VDOT: ${vdot10k.toFixed(4)}`);
const timeRecalc10k = Calculations.calculateTimeFromVDOT(vdot10k, 10000);
assert.ok(Math.abs(2400 - timeRecalc10k) < 1.0, 'Round trip 10K time should be within 1 second');

console.log('✅ All tests passed successfully!');
