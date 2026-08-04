import { getBMIInfo } from './BMICalculator';

describe('getBMIInfo', () => {
  it('should return Underweight info for BMI < 18.5', () => {
    const result = getBMIInfo(18.4);
    expect(result.category).toBe("Underweight");
    expect(result.color).toBe("#3b82f6");
    expect(result.position).toBe(8);
    expect(result.dosha).toBe("Vata imbalance likely");
    expect(result.advice).toBe("Focus on nourishing, warm foods. Take Ashwagandha and Shatavari.");
    expect(result.tips).toEqual(["Eat more warm, heavy foods", "Take Chyawanprash daily", "Practice gentle yoga", "Sleep 8+ hours"]);
  });

  it('should return Normal Weight info for 18.5 <= BMI < 25', () => {
    const result = getBMIInfo(24.9);
    expect(result.category).toBe("Normal Weight");
    expect(result.color).toBe("#22c55e");
    expect(result.position).toBe(35);
    expect(result.dosha).toBe("Doshas are balanced");
    expect(result.advice).toBe("Maintain your current lifestyle. Continue Ayurvedic practices.");
    expect(result.tips).toEqual(["Maintain current diet", "Stay active with yoga", "Seasonal Panchakarma", "Regular Prakriti checkup"]);

    const resultEdge = getBMIInfo(18.5);
    expect(resultEdge.category).toBe("Normal Weight");
  });

  it('should return Overweight info for 25 <= BMI < 30', () => {
    const result = getBMIInfo(29.9);
    expect(result.category).toBe("Overweight");
    expect(result.color).toBe("#f59e0b");
    expect(result.position).toBe(62);
    expect(result.dosha).toBe("Kapha imbalance likely");
    expect(result.advice).toBe("Reduce heavy foods. Take Triphala and Guggul. Increase activity.");
    expect(result.tips).toEqual(["Eat light, warm foods", "Take Triphala at night", "Daily brisk walking", "Avoid dairy and sweets"]);

    const resultEdge = getBMIInfo(25);
    expect(resultEdge.category).toBe("Overweight");
  });

  it('should return Obese info for BMI >= 30', () => {
    const result = getBMIInfo(30);
    expect(result.category).toBe("Obese");
    expect(result.color).toBe("#ef4444");
    expect(result.position).toBe(88);
    expect(result.dosha).toBe("Severe Kapha imbalance");
    expect(result.advice).toBe("Consult a Vaidya immediately. Follow strict Kapha-reducing diet.");
    expect(result.tips).toEqual(["Strict Kapha diet", "Take Guggul supplement", "Daily exercise mandatory", "Consult Vaidya now"]);

    const resultExtreme = getBMIInfo(40);
    expect(resultExtreme.category).toBe("Obese");
  });
});
