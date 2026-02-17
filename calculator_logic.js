(function(global) {
            const METERS_PER_MILE = 1609.34;
            const METERS_PER_KM = 1000;
            const CONFIG = {
                distMap: {
                    fiveK: 5000, threeTwo: 3200, oneSix: 1600, bear: 1.17 * METERS_PER_MILE,
                    marathon: 42195, halfMarathon: 21097.5, tenK: 10000,
                    palmerLake: 4 * METERS_PER_MILE,
                    mvp: 5000, stateXC: 5000,
                    custom: 0 // Placeholder for custom distance
                },
                // Course standardizer factors (standard 5K = 1.0)
                // Factor < 1 means the course runs faster than a flat 5K
                courseFactors: {
                    mvp: 0.974,       // Monument Valley Park
                    stateXC: 0.9544   // Norris Penrose / State XC (slower course)
                },
                benchmarks: [
                    { bear: 420, fiveK: 930 },
                    { bear: 480, fiveK: 1020 },
                    { bear: 540, fiveK: 1110 },
                    { bear: 600, fiveK: 1200 }
                ].sort((a, b) => a.bear - b.bear),
                hrZones: {
                    mhr: [
                        { name: 'Recovery', low: 0.60, high: 0.75 }, { name: 'Foundation', low: 0.75, high: 0.85 },
                        { name: 'Tempo', low: 0.82, high: 0.89 }, { name: 'Lactate Threshold', low: 0.88, high: 0.92 },
                        { name: 'CV', low: 0.90, high: 0.95 }, { name: '5K', low: 0.95, high: 0.98 }
                    ],
                    lthr: [
                        { name: 'Recovery', low: 0.80, high: 0.90 }, { name: 'Foundation', low: 0.90, high: 0.95 },
                        { name: 'Tempo', low: 0.96, high: 1.00 }, { name: 'Lactate Threshold', low: 0.99, high: 1.02 },
                        { name: 'CV', low: 1.02, high: 1.06 }, { name: '5K', low: 1.05, high: 1.10 }
                    ]
                },
                allPaces: [
                    { name: "Recovery", slow: 0.63, fast: 0.69, color: "#c6efce", darkColor: "#166534", type: 'zone' },
                    { name: "Foundation", slow: 0.70, fast: 0.80, color: "#d9ead3", darkColor: "#22502A", type: 'zone' },
                    { name: "Steady", slow: 0.80, fast: 0.85, color: "#fff2cc", darkColor: "#713f12", type: 'zone' },
                    { name: "Tempo", slow: 0.86, fast: 0.90, color: "#fce5cd", darkColor: "#7c2d12", type: 'zone' },
                    { name: "Lactate Threshold", slow: 0.91, fast: 0.94, color: "#f4cccc", darkColor: "#881337", type: 'zone' },
                    { name: "CV", slow: 0.95, fast: 0.97, color: "#ead1dc", darkColor: "#831843", type: 'zone' },
                    { name: "Marathon", dist: 42195, color: "#fef3c7", darkColor: "#713f12", type: 'race' },
                    { name: "10K", dist: 10000, color: "#fca5a5", darkColor: "#991b1b", type: 'race' },
                    { name: "5K", dist: 5000, color: "#e6b8af", darkColor: "#8c2a27", type: 'race' },
                    { name: "3200m", dist: 3200, color: "#d99694", darkColor: "#803230", type: 'race' },
                    { name: "1600m", dist: 1600, color: "#c0504d", darkColor: "#932926", type: 'race' },
                    { name: "800m", dist: 800, color: "#e06666", darkColor: "#b91c1c", type: 'race' },
                    { name: "400m", dist: 400, color: "#a4c2f4", darkColor: "#1e3a8a", type: 'race' }
                ],
                defaultSplitDistances: [
                    { dist: 100, label: '100m' }, { dist: 200, label: '200m' }, { dist: 300, label: '300m' },
                    { dist: 400, label: '400m' }, { dist: 600, label: 'Limbach' }, { dist: 800, label: '800m' },
                    { dist: 1000, label: '1000m' }, { dist: 1200, label: '1200m' }, { dist: 1309, label: 'PL Loop' },
                    { dist: 1600, label: '1600m' }, { dist: 2000, label: '2000m' }
                ],
                inputPlaceholders: {
                    m: "MM", s: "SS"
                },
                inputLabels: {
                    bear: "Bear Time", fiveK: "5K Time",
                    threeTwo: "3200m Time", oneSix: "1600m Time",
                    pace: "Pace / mi", palmerLake: "Palmer Lake 4 Miler Time",
                    custom: "Custom Distance Time",
                    mvp: "MVP Time", stateXC: "State XC Time"
                },
                exampleTimes: {
                    bear: { m: '8', s: '30' }, fiveK: { m: '19', s: '45' },
                    threeTwo: { m: '12', s: '00' }, oneSix: { m: '5', s: '30' },
                    pace: { m: '7', s: '15' }, palmerLake: { m: '28', s: '00' },
                    custom: { m: '45', s: '00' },
                    mvp: { m: '19', s: '15' }, stateXC: { m: '18', s: '30' }
                },
                // USTFCCA Standardized Track Event Conversion Factors (Rev. 01/10/12)
                ustfccaConversions: [
                    // Left table
                    { from: "60 Yards", to: "60 Meters", factor: 1.07 },
                    { from: "55 Meters (men)", to: "60 Meters (men)", factor: 1.0749 },
                    { from: "55 Meters (women)", to: "60 Meters (women)", factor: 1.0771 },
                    { from: "55 Hurdles (men)", to: "60 Hurdles (men)", factor: 1.0766 },
                    { from: "55 Hurdles (women)", to: "60 Hurdles (women)", factor: 1.0755 },
                    { from: "120 Hurdles (Yards)", to: "110 Hurdles", factor: 1.0025 },
                    { from: "200 Meters", to: "300 Yards", factor: 1.44 },
                    { from: "200 Meters", to: "300 Meters", factor: 1.60 },
                    { from: "220 Yards", to: "200 Meters", factor: 0.9942 },
                    { from: "300 Yards", to: "300 Meters", factor: 1.11 },
                    { from: "300 Yards", to: "440 Yards", factor: 1.59 },
                    { from: "400 Meters", to: "440 Yards", factor: 1.0059 },
                    { from: "400 Meters", to: "500 Yards", factor: 1.19 },
                    { from: "400 Meters", to: "500 Meters", factor: 1.32 },
                    { from: "400 Meters", to: "600 Yards", factor: 1.49 },
                    { from: "400 Meters", to: "600 Meters", factor: 1.66 },
                    { from: "440 Yards", to: "400 Meters", factor: 0.9942 },
                    { from: "440 Yards", to: "500 Yards", factor: 1.17 },
                    { from: "440 Yards", to: "500 Meters", factor: 1.29 },
                    { from: "440 Yards", to: "600 Yards", factor: 1.48 },
                    { from: "440 Yards", to: "600 Meters", factor: 1.65 },
                    { from: "500 Yards", to: "500 Meters", factor: 1.11 },
                    { from: "500 Yards", to: "600 Yards", factor: 1.25 },
                    { from: "500 Yards", to: "600 Meters", factor: 1.40 },
                    { from: "500 Meters", to: "600 Yards", factor: 1.13 },
                    { from: "500 Meters", to: "600 Meters", factor: 1.26 },
                    { from: "500 Meters", to: "800 Yards", factor: 1.75 },
                    { from: "500 Meters", to: "880 Yards", factor: 1.79 },
                    { from: "600 Yards", to: "600 Meters", factor: 1.12 },
                    { from: "600 Yards", to: "800 Meters", factor: 1.55 },
                    { from: "600 Meters", to: "800 Meters", factor: 1.38 },
                    { from: "800 Meters", to: "880 Yards", factor: 1.0059 },
                    { from: "800 Meters", to: "1000 Yards", factor: 1.19 },
                    // Right table
                    { from: "800 Meters", to: "1000 Meters", factor: 1.32 },
                    { from: "880 Yards", to: "800 Meters", factor: 0.9942 },
                    { from: "1000 Yards", to: "1000 Meters", factor: 1.11 },
                    { from: "1000 Meters", to: "1500 Meters", factor: 1.56 },
                    { from: "1500 Meters", to: "1600 Meters", factor: 1.0737 },
                    { from: "1500 Meters", to: "Mile", factor: 1.08 },
                    { from: "1500 Meters", to: "2000 Meters", factor: 1.36 },
                    { from: "1500 Meters", to: "3000 Meters", factor: 2.13 },
                    { from: "1500 Meters", to: "Two Mile", factor: 2.29 },
                    { from: "1500 Meters", to: "Three Mile", factor: 3.59 },
                    { from: "1600 Meters", to: "Mile", factor: 1.0058 },
                    { from: "Mile", to: "1500 Meters", factor: 0.9259 },
                    { from: "Mile", to: "1600 Meters", factor: 0.9942 },
                    { from: "Mile", to: "2000 Meters", factor: 1.28 },
                    { from: "Mile", to: "3000 Meters", factor: 2.00 },
                    { from: "Mile", to: "Two Mile", factor: 2.15 },
                    { from: "Mile", to: "Three Mile", factor: 3.37 },
                    { from: "2000 Meters", to: "3000 Meters", factor: 1.56 },
                    { from: "2000 Meters", to: "Two Mile", factor: 1.68 },
                    { from: "2000 Meters", to: "Three Mile", factor: 2.63 },
                    { from: "3000 Meters", to: "3200 Meters", factor: 1.0737 },
                    { from: "3000 Meters", to: "Two Mile", factor: 1.08 },
                    { from: "3200 Meters", to: "Two Mile", factor: 1.0058 },
                    { from: "Two Mile", to: "3000 Meters", factor: 0.9259 },
                    { from: "Two Mile", to: "Three Mile", factor: 1.57 },
                    { from: "Three Mile", to: "5000 Meters", factor: 1.036 },
                    { from: "4x110 Relay (Yards)", to: "4x100 Relay", factor: 0.9942 },
                    { from: "4x220 Relay (Yards)", to: "4x200 Relay", factor: 0.9942 },
                    { from: "4x440 Relay (Yards)", to: "4x400 Relay", factor: 0.9942 },
                    { from: "4x880 Relay (Yards)", to: "4x800 Relay", factor: 0.9942 },
                    { from: "4xMile Relay", to: "4x1500 Relay", factor: 0.9259 },
                    { from: "4xMile Relay", to: "4x1600 Relay", factor: 0.9942 },
                    { from: "Sprint Medley Relay (Yards)", to: "Sprint Medley Relay", factor: 0.9942 },
                    { from: "Distance Medley Relay (Yards)", to: "Distance Medley Relay", factor: 0.9942 },
                    { from: "Shuttle Hurdle Relay (Yards)", to: "Shuttle Hurdle Relay", factor: 1.0025 },
                    // Additional useful reverse lookups from the table
                    { from: "300 Meters", to: "400 Meters", factor: 1.3964 },
                ],
                // All USTFCCA distance events that have "from" conversions, with their metric distances for VDOT prediction
                ustfccaDistanceEvents: [
                    { event: '800 Meters', meters: 800 },
                    { event: '1000 Meters', meters: 1000 },
                    { event: '1500 Meters', meters: 1500 },
                    { event: '1600 Meters', meters: 1600 },
                    { event: 'Mile', meters: 1609.34 },
                    { event: '2000 Meters', meters: 2000 },
                    { event: '3000 Meters', meters: 3000 },
                    { event: '3200 Meters', meters: 3200 },
                    { event: 'Two Mile', meters: 2 * 1609.34 },
                    { event: 'Three Mile', meters: 3 * 1609.34 },
                ],
                // NCAA Indoor Track Type Conversion Factors (Official Chart)
                // Each factor: multiply actual time (in seconds) by factor to get converted time
                ncaaTrackConversions: {
                    men: {
                        // Undersized → 200m Flat
                        undersizedToFlat: { '200 Meters': 0.9872, '400 Meters': 0.9901, '800 Meters': 0.9923, '1000 Meters': 0.9929, 'Mile': 0.9941, '3000 Meters': 0.9953, '5000 Meters': 0.9961 },
                        // Banked/Oversized → 200m Flat
                        bankedToFlat: { '200 Meters': 1.0179, '400 Meters': 1.0160, '800 Meters': 1.0143, '1000 Meters': 1.0138, 'Mile': 1.0128, '3000 Meters': 1.0116, '5000 Meters': 1.0107 },
                        // Undersized → Banked/Oversized
                        undersizedToBanked: { '200 Meters': 0.9698, '400 Meters': 0.9746, '800 Meters': 0.9783, '1000 Meters': 0.9794, 'Mile': 0.9816, '3000 Meters': 0.9839, '5000 Meters': 0.9855 },
                        // 200m Flat → Banked/Oversized
                        flatToBanked: { '200 Meters': 0.9824, '400 Meters': 0.9843, '800 Meters': 0.9859, '1000 Meters': 0.9864, 'Mile': 0.9874, '3000 Meters': 0.9885, '5000 Meters': 0.9894 },
                    },
                    women: {
                        undersizedToFlat: { '200 Meters': 0.9900, '400 Meters': 0.9929, '800 Meters': 0.9951, 'Mile': 0.9969, '3000 Meters': 0.9981, '5000 Meters': 0.9989 },
                        bankedToFlat: { '200 Meters': 1.0155, '400 Meters': 1.0133, '800 Meters': 1.0115, 'Mile': 1.0099, '3000 Meters': 1.0086, '5000 Meters': 1.0077 },
                        undersizedToBanked: { '200 Meters': 0.9749, '400 Meters': 0.9799, '800 Meters': 0.9838, 'Mile': 0.9871, '3000 Meters': 0.9896, '5000 Meters': 0.9913 },
                        flatToBanked: { '200 Meters': 0.9847, '400 Meters': 0.9869, '800 Meters': 0.9886, 'Mile': 0.9902, '3000 Meters': 0.9915, '5000 Meters': 0.9924 },
                    },
                    // Track type labels for UI
                    trackTypes: [
                        { value: 'flat', label: '200m Flat Track' },
                        { value: 'banked', label: 'Banked / Oversized' },
                        { value: 'undersized', label: 'Undersized (< 200m)' },
                    ],
                    // Map convert-distance labels to the factor-key used in the tables above
                    eventMapping: {
                        '200 Meters': '200 Meters', '300 Meters': '200 Meters',
                        '400 Meters': '400 Meters', '440 Yards': '400 Meters',
                        '500 Meters': '400 Meters', '600 Meters': '400 Meters',
                        '800 Meters': '800 Meters',
                        '1000 Meters': '1000 Meters', '1200 Meters': '1000 Meters',
                        '1500 Meters': 'Mile', '1600 Meters': 'Mile', 'Mile': 'Mile',
                        '2000 Meters': 'Mile',
                        '3000 Meters': '3000 Meters', '3200 Meters': '3000 Meters',
                        'Two Mile': '3000 Meters', 'Three Mile': '5000 Meters',
                        '5000 Meters': '5000 Meters',
                    },
                },
                // NCAA DI/III Altitude Adjustment Data (verified against TFRRS 2025-26)
                // Percentage-based model — gender-neutral by design (DI/III rules)
                // Per-event percentages at representative altitude data points
                // Source: NCAA facility altitude adjustments, cross-verified with TFRRS converter
                ncaaAltitudeData: [
                    // pct values = % of time to subtract for altitude (gender-independent for DI/III)
                    { altFt: 0, pct800: 0, pct1500: 0, pct5000: 0, pct10000: 0 },
                    { altFt: 2999, pct800: 0, pct1500: 0, pct5000: 0, pct10000: 0 },
                    { altFt: 3124, pct800: 0.281, pct1500: 1.128, pct5000: 1.270, pct10000: 1.473 },
                    { altFt: 3896, pct800: 0.371, pct1500: 1.545, pct5000: 1.830, pct10000: 2.146 },
                    { altFt: 4627, pct800: 0.489, pct1500: 2.002, pct5000: 2.425, pct10000: 2.851 },
                    { altFt: 5260, pct800: 0.634, pct1500: 2.441, pct5000: 2.994, pct10000: 3.516 },
                    { altFt: 6007, pct800: 0.833, pct1500: 3.021, pct5000: 3.728, pct10000: 4.365 },
                    { altFt: 6981, pct800: 1.150, pct1500: 3.864, pct5000: 4.787, pct10000: 5.576 },
                    { altFt: 7544, pct800: 1.368, pct1500: 4.403, pct5000: 5.452, pct10000: 6.332 },
                    { altFt: 7703, pct800: 1.431, pct1500: 4.557, pct5000: 5.645, pct10000: 6.553 },
                ],
                highAltitudeVenues: [
                    // ── Indoor Facilities ──────────────────────────────────────────
                    // trackType verified via TFRRS Mark Converter: flat = 200m flat, banked = banked/oversized ≥200m, undersized = <200m
                    // --- Colorado ---
                    { id: '725', type: 'indoor', trackType: 'banked', name: "Air Force – Cadet Field House (Indoor)", elevation: 7048, city: "Colorado Springs, CO" },
                    { id: '30781', type: 'indoor', trackType: 'flat', name: "Adams State – High Altitude Training Center (Indoor)", elevation: 7544, city: "Alamosa, CO" },
                    { id: '833', type: 'indoor', trackType: 'flat', name: "Adams State – Plachy Hall (Indoor)", elevation: 7544, city: "Alamosa, CO" },
                    { id: '1458', type: 'indoor', trackType: 'flat', name: "Western Colorado – Mountaineer Field House (Indoor)", elevation: 7717, city: "Gunnison, CO" },
                    { id: '731', type: 'indoor', trackType: 'undersized', name: "Wyoming – War Memorial Fieldhouse (Indoor)", elevation: 7220, city: "Laramie, WY" },
                    { id: '1460', type: 'indoor', trackType: 'flat', name: "UCCS – Mountain Lion Fieldhouse (Indoor)", elevation: 6291, city: "Colorado Springs, CO" },
                    { id: '1462', type: 'indoor', trackType: 'undersized', name: "Colorado Mines – Steinhauer Fieldhouse (Indoor)", elevation: 5675, city: "Golden, CO" },
                    { id: '861', type: 'indoor', trackType: 'flat', name: "Colorado – Balch Fieldhouse (Indoor)", elevation: 5328, city: "Boulder, CO" },
                    // --- New Mexico / Arizona ---
                    { id: '14280', type: 'indoor', trackType: 'banked', name: "Albuquerque Convention Center (Indoor)", elevation: 4958, city: "Albuquerque, NM" },
                    { id: '1129', type: 'indoor', trackType: 'banked', name: "Northern Arizona – Walkup Skydome (Indoor)", elevation: 6880, city: "Flagstaff, AZ" },
                    // --- Idaho / Montana ---
                    { id: '1097', type: 'indoor', trackType: 'banked', name: "Boise State – Jackson's Track (Indoor)", elevation: 2704, city: "Boise, ID" },
                    { id: '1125', type: 'indoor', trackType: 'banked', name: "Idaho State – Holt Arena (Indoor, Banked)", elevation: 4462, city: "Pocatello, ID" },
                    { id: '1117', type: 'indoor', trackType: 'flat', name: "Montana (Indoor)", elevation: 3209, city: "Missoula, MT" },
                    { id: '29001', type: 'indoor', trackType: 'flat', name: "Montana State – Breeden Fieldhouse (Indoor, Flat)", elevation: 4820, city: "Bozeman, MT" },
                    { id: '1119', type: 'indoor', trackType: 'banked', name: "Montana State – Breeden Fieldhouse (Indoor, Banked)", elevation: 4820, city: "Bozeman, MT" },
                    // --- Utah / Texas ---
                    { id: '727', type: 'indoor', trackType: 'banked', name: "BYU – Smith Field House (Indoor)", elevation: 4549, city: "Provo, UT" },
                    { id: '1099', type: 'indoor', trackType: 'flat', name: "Utah State – Nelson Field House (Indoor)", elevation: 4531, city: "Logan, UT" },
                    { id: '1127', type: 'indoor', trackType: 'flat', name: "Weber State – Swenson Gym (Indoor)", elevation: 4314, city: "Ogden, UT" },
                    { id: '31857', type: 'indoor', trackType: 'banked', name: "Texas Tech – Sports Performance Center (Indoor)", elevation: 3256, city: "Lubbock, TX" },

                    // ── XC Courses (Factors standardizing to Liberty Bell @ 5340ft) ──
                    { id: 'LB_XC', type: 'xc', name: "Liberty Bell (Heritage HS)", elevation: 5340, city: "Littleton, CO", xcFactor: 1.0 },
                    { id: 'STATE_XC', type: 'xc', name: "Pre-State / State XC (Norris Penrose)", elevation: 6000, city: "Colorado Springs, CO", xcFactor: 0.9544 },
                    { id: 'PA_XC', type: 'xc', name: "Pat Amato (Northwest Open Space)", elevation: 5340, city: "Northglenn, CO", xcFactor: 0.989 },
                    { id: 'RIM_XC', type: 'xc', name: "Rim Rock Farm (Kansas)", elevation: 1000, city: "Lawrence, KS", xcFactor: 0.9793 },
                    { id: 'COR_XC', type: 'xc', name: "Coronado '23 (Monument Valley Park)", elevation: 6000, city: "Colorado Springs, CO", xcFactor: 0.974 },

                    // ── Outdoor Facilities ─────────────────────────────────────────
                    // --- Colorado ---
                    { id: 'AF_OUT', type: 'outdoor', name: "Air Force – Outdoor Track / Cadet Area", elevation: 7258, city: "Colorado Springs, CO" },
                    { id: 'ASU_OUT', type: 'outdoor', name: "Adams State – Rex Stadium (Outdoor)", elevation: 7544, city: "Alamosa, CO" },
                    { id: 'WCU_OUT', type: 'outdoor', name: "Western Colorado – Mountaineer Bowl (Outdoor)", elevation: 7717, city: "Gunnison, CO" },
                    { id: 'WYO_OUT', type: 'outdoor', name: "Wyoming – Louis S. Madrid Sports Complex (Outdoor)", elevation: 7220, city: "Laramie, WY" },
                    { id: 'CC_OUT', type: 'outdoor', name: "Colorado College – Washburn Field (Outdoor)", elevation: 6035, city: "Colorado Springs, CO" },
                    { id: 'CSM_OUT', type: 'outdoor', name: "Colorado Mines – Stermole Track Complex (Outdoor)", elevation: 5675, city: "Golden, CO" },
                    { id: 'CU_OUT', type: 'outdoor', name: "Colorado – Potts Field (Outdoor)", elevation: 5328, city: "Boulder, CO" },
                    { id: 'CSU_OUT', type: 'outdoor', name: "Colorado State – Jack Christiansen Track (Outdoor)", elevation: 5003, city: "Fort Collins, CO" },
                    { id: 'UNC_OUT', type: 'outdoor', name: "Northern Colorado – Nottingham Field (Outdoor)", elevation: 4685, city: "Greeley, CO" },
                    { id: '3167', type: 'outdoor', name: "CSU Pueblo – ThunderBowl (Outdoor)", elevation: 4700, city: "Pueblo, CO" },
                    // --- New Mexico / Arizona ---
                    { id: 'UNM_OUT', type: 'outdoor', name: "New Mexico – UNM Track & Field Complex (Outdoor)", elevation: 5335, city: "Albuquerque, NM" },
                    { id: 'NAU_OUT', type: 'outdoor', name: "Northern Arizona – Outdoor Track", elevation: 6880, city: "Flagstaff, AZ" },
                    // --- Idaho / Montana ---
                    { id: 'BSU_OUT', type: 'outdoor', name: "Boise State – Bob Gibb Friendship Bridge Track (Outdoor)", elevation: 2704, city: "Boise, ID" },
                    { id: 'ISU_OUT', type: 'outdoor', name: "Idaho State – Davis Field (Outdoor)", elevation: 4462, city: "Pocatello, ID" },
                    { id: 'UM_OUT', type: 'outdoor', name: "Montana – Dornblaser Stadium (Outdoor)", elevation: 3209, city: "Missoula, MT" },
                    { id: 'MSU_OUT', type: 'outdoor', name: "Montana State – Bobcat Track Complex (Outdoor)", elevation: 4820, city: "Bozeman, MT" },
                    // --- Utah / Texas ---
                    { id: 'BYU_OUT', type: 'outdoor', name: "BYU – Clarence Robison Track (Outdoor)", elevation: 4549, city: "Provo, UT" },
                    { id: 'USU_OUT', type: 'outdoor', name: "Utah State – Ralph Maughan Track Stadium (Outdoor)", elevation: 4531, city: "Logan, UT" },
                    { id: 'WSU_OUT', type: 'outdoor', name: "Weber State – Stewart Stadium (Outdoor)", elevation: 4314, city: "Ogden, UT" },
                    { id: 'TTU_OUT', type: 'outdoor', name: "Texas Tech – Fuller Track & Field Complex (Outdoor)", elevation: 3256, city: "Lubbock, TX" },
                    { id: 'UTEP_OUT', type: 'outdoor', name: "UTEP – Kidd Field (Outdoor)", elevation: 3740, city: "El Paso, TX" },
                ],
            };
            const Calculations = {
                timeToSec(timeStr, format = 'mm:ss') {
                    if (!timeStr || typeof timeStr !== 'string') return NaN;
                    const parts = timeStr.trim().split(':').map(Number);
                    if (parts.some(isNaN)) return NaN;
                    if (format === 'hh:mm:ss' && parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
                    if (format === 'mm:ss' && parts.length === 2) return parts[0] * 60 + parts[1];
                    if (parts.length === 1) return parts[0];
                    return NaN;
                },
                secToPace(sec, unit = 'miles') {
                    if (isNaN(sec) || !isFinite(sec)) return "N/A";

                    // sec comes in as seconds-per-mile; to get seconds-per-km, multiply by km/mile ratio
                    if (unit === 'km') {
                        sec = sec * (METERS_PER_KM / METERS_PER_MILE);
                    }

                    sec = Math.round(sec);
                    const m = Math.floor(sec / 60);
                    const s = sec % 60;
                    return `${m}:${String(s).padStart(2, '0')}`;
                },
                secToHMS(sec) {
                    if (isNaN(sec) || !isFinite(sec)) return "N/A";
                    sec = Math.round(sec);
                    const h = Math.floor(sec / 3600);
                    const m = Math.floor((sec % 3600) / 60);
                    const s = sec % 60;
                    let timeString = `${String(m).padStart(h > 0 ? 2 : 1, '0')}:${String(s).padStart(2, '0')}`;
                    if (h > 0) timeString = `${h}:${timeString}`;
                    return timeString;
                },
                getInterpolated5kTime(bearTimeInSec, benchmarks) {
                    const first = benchmarks[0], last = benchmarks[benchmarks.length - 1];
                    if (bearTimeInSec <= first.bear) {
                        const p2 = benchmarks[1];
                        return first.fiveK + (bearTimeInSec - first.bear) * (p2.fiveK - first.fiveK) / (p2.bear - first.bear);
                    }
                    if (bearTimeInSec >= last.bear) {
                        const p1 = benchmarks[benchmarks.length - 2];
                        return p1.fiveK + (bearTimeInSec - p1.bear) * (last.fiveK - p1.fiveK) / (last.bear - p1.bear);
                    }
                    for (let i = 0; i < benchmarks.length - 1; i++) {
                        if (bearTimeInSec >= benchmarks[i].bear && bearTimeInSec <= benchmarks[i + 1].bear) {
                            const p1 = benchmarks[i], p2 = benchmarks[i + 1];
                            return p1.fiveK + (bearTimeInSec - p1.bear) * (p2.fiveK - p1.fiveK) / (p2.bear - p1.bear);
                        }
                    }
                    return NaN;
                },
                getInterpolatedBearTime(fiveKTimeInSec, benchmarks) {
                    const sortedBenchmarks = [...benchmarks].sort((a, b) => a.fiveK - b.fiveK);
                    const first = sortedBenchmarks[0], last = sortedBenchmarks[sortedBenchmarks.length - 1];

                    if (fiveKTimeInSec <= first.fiveK) {
                        const p1 = sortedBenchmarks[0], p2 = sortedBenchmarks[1];
                        return p1.bear + (fiveKTimeInSec - p1.fiveK) * (p2.bear - p1.bear) / (p2.fiveK - p1.fiveK);
                    }
                    if (fiveKTimeInSec >= last.fiveK) {
                        const p1 = sortedBenchmarks[sortedBenchmarks.length - 2], p2 = sortedBenchmarks[sortedBenchmarks.length - 1];
                        return p1.bear + (fiveKTimeInSec - p1.fiveK) * (p2.bear - p1.bear) / (p2.fiveK - p1.fiveK);
                    }
                    for (let i = 0; i < sortedBenchmarks.length - 1; i++) {
                        if (fiveKTimeInSec >= sortedBenchmarks[i].fiveK && fiveKTimeInSec <= sortedBenchmarks[i + 1].fiveK) {
                            const p1 = sortedBenchmarks[i], p2 = sortedBenchmarks[i + 1];
                            return p1.bear + (fiveKTimeInSec - p1.fiveK) * (p2.bear - p1.bear) / (p2.fiveK - p1.fiveK);
                        }
                    }
                    return NaN;
                },
                calculateVDOT(distanceMeters, timeSeconds) {
                    if (timeSeconds <= 0) return 0;
                    const timeMinutes = timeSeconds / 60;
                    const velocity = distanceMeters / timeMinutes;
                    const percentVO2Max = 0.8 + 0.189439 * Math.exp(-0.012778 * timeMinutes) + 0.2989558 * Math.exp(-0.1932605 * timeMinutes);
                    const vo2 = -4.60 + 0.182258 * velocity + 0.000104 * Math.pow(velocity, 2);
                    return vo2 / percentVO2Max;
                },
                calculateTimeFromVDOT(vdot, distanceMeters) {
                    let min_v = 100, max_v = 500, velocity;
                    for (let i = 0; i < 30; i++) {
                        velocity = (min_v + max_v) / 2;
                        const timeMinutes = distanceMeters / velocity;
                        const percentVO2Max = 0.8 + 0.189439 * Math.exp(-0.012778 * timeMinutes) + 0.2989558 * Math.exp(-0.1932605 * timeMinutes);
                        const vo2 = -4.60 + 0.182258 * velocity + 0.000104 * Math.pow(velocity, 2);
                        if (vo2 / percentVO2Max < vdot) min_v = velocity; else max_v = velocity;
                    }
                    velocity = (min_v + max_v) / 2;
                    return (distanceMeters / velocity) * 60;
                },
                /**
                 * USTFCCA Conversion: Given a "from" event name and time in seconds,
                 * returns an array of { event, equivalentTimeSec, factor } for all matching conversions.
                 * Per USTFCCA rules, always round UP the last digit of the final time.
                 */
                applyUSTFCCA(fromEvent, timeInSeconds) {
                    return CONFIG.ustfccaConversions
                        .filter(c => c.from === fromEvent)
                        .map(c => ({
                            event: c.to,
                            factor: c.factor,
                            equivalentTimeSec: Math.ceil(timeInSeconds * c.factor * 100) / 100
                        }));
                },
                /**
                 * Get all unique "from" events from the USTFCCA table.
                 */
                getUSTFCCAFromEvents() {
                    return [...new Set(CONFIG.ustfccaConversions.map(c => c.from))];
                },
                /**
                 * NCAA Track Type Conversion.
                 * @param {string} eventLabel — distance label (e.g. '1500 Meters')
                 * @param {number} timeSec — time in seconds
                 * @param {string} fromType — 'flat' | 'banked' | 'undersized'
                 * @param {string} toType — 'flat' | 'banked' | 'undersized'
                 * @param {string} gender — 'men' | 'women'
                 * @returns {{ convertedTime: number, factor: number } | null}
                 */
                convertTrackType(eventLabel, timeSec, fromType, toType, gender) {
                    if (fromType === toType) return null;
                    const mapping = CONFIG.ncaaTrackConversions.eventMapping;
                    const factorKey = mapping[eventLabel];
                    if (!factorKey) return null;

                    const genderData = CONFIG.ncaaTrackConversions[gender];
                    if (!genderData) return null;

                    // Determine which factor table to use based on from→to direction
                    let tableKey;
                    if (fromType === 'undersized' && toType === 'flat') tableKey = 'undersizedToFlat';
                    else if (fromType === 'banked' && toType === 'flat') tableKey = 'bankedToFlat';
                    else if (fromType === 'undersized' && toType === 'banked') tableKey = 'undersizedToBanked';
                    else if (fromType === 'flat' && toType === 'banked') tableKey = 'flatToBanked';
                    // Reverse directions (derive factor as reciprocal)
                    else if (fromType === 'flat' && toType === 'undersized') {
                        const fwd = genderData['undersizedToFlat']?.[factorKey];
                        if (!fwd) return null;
                        const factor = 1 / fwd;
                        return { convertedTime: Math.ceil(timeSec * factor * 100) / 100, factor: Math.round(factor * 10000) / 10000 };
                    }
                    else if (fromType === 'banked' && toType === 'undersized') {
                        const fwd = genderData['undersizedToBanked']?.[factorKey];
                        if (!fwd) return null;
                        const factor = 1 / fwd;
                        return { convertedTime: Math.ceil(timeSec * factor * 100) / 100, factor: Math.round(factor * 10000) / 10000 };
                    }
                    else return null;

                    const factor = genderData[tableKey]?.[factorKey];
                    if (!factor) return null;
                    return { convertedTime: Math.ceil(timeSec * factor * 100) / 100, factor };
                },
                /**
                 * NCAA Altitude Adjustment — Official 2009 NCAA Data.
                 * Uses per-event percentage adjustments derived from published qualifying
                 * time allowances. Interpolates altitude and event distance for precision.
                 * @param {number} timeSec — actual time in seconds
                 * @param {number} altitudeFt — altitude in feet
                 * @param {number} distanceMeters — race distance in meters
                 * @returns {{ seaLevelTime: number, adjustment: number, adjustmentPct: number } | null}
                 */
                adjustAltitude(timeSec, altitudeFt, distanceMeters, gender = 'men') {
                    // DI/III model: percentage-based, gender-neutral (gender param reserved for future DII support)
                    if (altitudeFt < 3000 || distanceMeters < 800) return null;
                    const data = CONFIG.ncaaAltitudeData;

                    // Step 1: Interpolate altitude to get per-event percentages
                    function interpAlt(pctKey) {
                        if (altitudeFt <= data[0].altFt) return 0;
                        if (altitudeFt >= data[data.length - 1].altFt) {
                            const d1 = data[data.length - 2], d2 = data[data.length - 1];
                            const slope = (d2[pctKey] - d1[pctKey]) / (d2.altFt - d1.altFt);
                            return d2[pctKey] + slope * (altitudeFt - d2.altFt);
                        }
                        for (let i = 0; i < data.length - 1; i++) {
                            if (altitudeFt >= data[i].altFt && altitudeFt <= data[i + 1].altFt) {
                                const t = (altitudeFt - data[i].altFt) / (data[i + 1].altFt - data[i].altFt);
                                return data[i][pctKey] + t * (data[i + 1][pctKey] - data[i][pctKey]);
                            }
                        }
                        return 0;
                    }

                    const p800 = interpAlt('pct800');
                    const p1500 = interpAlt('pct1500');
                    const p5000 = interpAlt('pct5000');
                    const p10K = interpAlt('pct10000');

                    // Step 2: Interpolate by event distance between breakpoints
                    const breaks = [
                        { dist: 800, pct: p800 },
                        { dist: 1500, pct: p1500 },
                        { dist: 5000, pct: p5000 },
                        { dist: 10000, pct: p10K },
                    ];

                    let adjustPct;
                    if (distanceMeters <= breaks[0].dist) {
                        adjustPct = breaks[0].pct;
                    } else if (distanceMeters >= breaks[breaks.length - 1].dist) {
                        // Extrapolate beyond 10K
                        const b1 = breaks[breaks.length - 2], b2 = breaks[breaks.length - 1];
                        const slope = (b2.pct - b1.pct) / (b2.dist - b1.dist);
                        adjustPct = b2.pct + slope * (distanceMeters - b2.dist);
                    } else {
                        for (let i = 0; i < breaks.length - 1; i++) {
                            if (distanceMeters >= breaks[i].dist && distanceMeters <= breaks[i + 1].dist) {
                                const t = (distanceMeters - breaks[i].dist) / (breaks[i + 1].dist - breaks[i].dist);
                                adjustPct = breaks[i].pct + t * (breaks[i + 1].pct - breaks[i].pct);
                                break;
                            }
                        }
                    }

                    // Convert percentage to seconds
                    const adjustFrac = adjustPct / 100;
                    const adjustment = Math.round(timeSec * adjustFrac * 100) / 100;
                    const seaLevelTime = Math.round((timeSec - adjustment) * 100) / 100;

                    return {
                        seaLevelTime,
                        adjustment,
                        adjustmentPct: Math.round(adjustPct * 100) / 100
                    };
                },

                adjustTrackSize(timeSec, distanceMeters, trackType, gender = 'men') {
                    // NCAA Rule: Convert Flat/Undersized times DOWN to Banked/Oversized standard
                    // If track is already 'banked' or 'oversized', no adjustment needed.
                    if (!trackType || trackType === 'banked' || trackType === 'oversized') return null;

                    const data = CONFIG.ncaaTrackConversions;
                    const distMap = data.eventMapping;

                    // Find closest standard event distance
                    // Simple check: match exact meters first
                    let eventKey = null;
                    if (distanceMeters === 200) eventKey = '200 Meters';
                    else if (distanceMeters === 400) eventKey = '400 Meters';
                    else if (distanceMeters === 800) eventKey = '800 Meters';
                    else if (distanceMeters === 1000) eventKey = '1000 Meters';
                    else if (Math.abs(distanceMeters - 1609.34) < 10) eventKey = 'Mile';
                    else if (distanceMeters === 3000) eventKey = '3000 Meters';
                    else if (distanceMeters === 5000) eventKey = '5000 Meters';
                    else {
                        // Interpolation isn't really standard for track size, usually it triggers at specific events.
                        // But for calculator utility, we can map to closest.
                        // For now, only support standard distances for correct NCAA factors.
                        return null;
                    }

                    if (!eventKey) return null;

                    const genderKey = (gender === 'women' || gender === 'f') ? 'women' : 'men';
                    const factors = data[genderKey];

                    let factor = 1.0;

                    // We want to convert TO Banked/Standard.
                    // The factors in CONFIG are set up as "To Flat".
                    // Let's verify CONFIG structure from lines 504-516:
                    // undersizedToFlat: { ... }  <-- multiplies by ~0.99 (makes time faster)
                    // bankedToFlat: { ... }      <-- multiplies by ~1.01 (makes time slower)
                    //
                    // Wait, if I have a Flat time and want a Banked time:
                    // Flat is SLOWER than Banked.
                    // So Flat Time * Factor < 1 should give Banked Time.
                    //
                    // In CONFIG (lines 510): flatToBanked: { ... } -> factors are ~0.98.
                    // This matches. Flat time (e.g. 100s) * 0.98 = 98s (Banked). Correct.

                    if (trackType === 'flat') {
                        if (factors.flatToBanked && factors.flatToBanked[eventKey]) {
                            factor = factors.flatToBanked[eventKey];
                        }
                    } else if (trackType === 'undersized') {
                        if (factors.undersizedToBanked && factors.undersizedToBanked[eventKey]) {
                            factor = factors.undersizedToBanked[eventKey];
                        }
                    }

                    if (factor === 1.0) return null;

                    const convertedTime = Math.round(timeSec * factor * 100) / 100;
                    const adjustment = Math.round((timeSec - convertedTime) * 100) / 100; // Positive value means time removed

                    return {
                        convertedTime,
                        adjustment,
                        factor
                    };
                },
            };


    const Logic = { METERS_PER_MILE, METERS_PER_KM, CONFIG, Calculations };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = Logic;
    } else {
        global.PaceCalculatorLogic = Logic;
    }
})(typeof window !== "undefined" ? window : this);
