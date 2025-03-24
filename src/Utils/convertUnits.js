export function convertUnits(values, unit) {
    if (unit === "imperial") {
      const cm = parseFloat(values.cm || 0);
      const kg = parseFloat(values.kg || 0);
  
      if (!cm || !kg) {
    
        return { ft: 0, inch: 0, stone: 0, lb: 0 };
      }
  
      const totalInches = cm / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      const totalLbs = kg * 2.20462;
      const stones = Math.floor(totalLbs / 14);
      const lbs = totalLbs % 14;
  
      return { ft: feet, inch: inches.toFixed(2), stone: stones, lb: lbs.toFixed(2) };
    } else if (unit === "metric") {
      const ft = parseFloat(values.ft || 0);
      const inch = parseFloat(values.inch || 0);
      const stones = parseFloat(values.stones || 0);
      const pound = parseFloat(values.pound || 0);
  
      if (!ft && !inch && !stones && !pound) {
        return { centimeters: 0, kg: 0 };
      }
  
      const centimeters = ft * 30.48 + inch * 2.54;
      const totalKg = stones * 6.35029 + pound * 0.453592;
  
      return { centimeters: centimeters.toFixed(2), kg: totalKg.toFixed(2) };
    } else {
      throw new Error("❌ Invalid unit type. Please use 'imperial' or 'metric'.");
    }
  }
//   