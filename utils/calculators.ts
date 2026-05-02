/**
 * GST Calculation
 */
export const calculateGST = (amount: number, rate: number, type: "add" | "remove") => {
  if (type === "add") {
    const gstAmount = (amount * rate) / 100;
    const totalAmount = amount + gstAmount;
    return { gstAmount, totalAmount };
  } else {
    const originalAmount = amount / (1 + rate / 100);
    const gstAmount = amount - originalAmount;
    return { gstAmount, totalAmount: originalAmount };
  }
};

/**
 * EMI Calculation
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * r = monthly interest rate (annual / 12 / 100)
 */
export const calculateEMI = (principal: number, annualRate: number, years: number) => {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - principal;
  return { emi, totalPayable, totalInterest };
};

/**
 * SIP Calculation
 * Formula: FV = P * [((1 + i)^n - 1) / i] * (1 + i)
 * i = monthly rate (expected annual / 12 / 100)
 */
export const calculateSIP = (monthlyInvestment: number, annualRate: number, years: number) => {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  const totalInvestment = monthlyInvestment * n;
  const maturityValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const estimatedReturns = maturityValue - totalInvestment;
  return { maturityValue, totalInvestment, estimatedReturns };
};

/**
 * Age Calculation
 */
export const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
};

/**
 * BMI Calculation
 */
export const calculateBMI = (weight: number, heightCm: number) => {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";
  return { bmi, category };
};

/**
 * Gold Price Calculation
 */
export const calculateGold = (weight: number, rate: number, makingCharges: number, gstRate: number = 3) => {
  const basePrice = weight * rate;
  const withMaking = basePrice + makingCharges;
  const gstAmount = (withMaking * gstRate) / 100;
  const finalPrice = withMaking + gstAmount;
  return { basePrice, withMaking, gstAmount, finalPrice };
};
