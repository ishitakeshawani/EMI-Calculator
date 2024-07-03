import "./App.css";
import React, { useState, useEffect } from "react";
import { tenureList } from "./utils";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEMI] = useState(0);

  let onChangeDownPayment = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    const emi = calculateEMI(dp);
    setEMI(emi);
  };

  let onChangeEMI = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEMI(emi.toFixed(0));

    const dp = calculateDownPayment(emi);
    setDownPayment(dp);
  };

  let calculateDownPayment = (emi) => {
    if (!cost) return;

    const dpPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((dpPercent / 100) * cost).toFixed(0);
  };

  let calculateEMI = (dp) => {
    if (!cost) return;
    const loanAmt = cost - dp;
    const rateOfInterest = interest / 100;
    const numberOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numberOfYears) /
      ((1 + rateOfInterest) ** numberOfYears - 1);
    return Number(EMI / 12).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEMI(0);
    }

    const emi = calculateEMI(downPayment);
    setEMI(emi);
  }, [tenure, cost, downPayment, interest]);

  return (
    <div className="App">
      <h2>EMI Calculator</h2>
      <TextInput title={"Total Cost"} state={cost} setState={setCost} />
      <TextInput
        title={"Interest Rate(in %)"}
        state={interest}
        setState={setInterest}
      />
      <TextInput title={"Processing Fee(in %)"} state={fee} setState={setFee} />
      <SliderInput
        title="Down Payment"
        state={downPayment}
        onChange={onChangeDownPayment}
        min={0}
        max={cost}
        minLabel={"0%"}
        maxLabel={"100%"}
      />
      <SliderInput
        title="Loan per month"
        onChange={onChangeEMI}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />
      <div className="section">
        <label htmlFor="tenure">Tenure</label>
        <div className="tenureContainer">
          {tenureList.map((item, index) => (
            <button
              className={`tenure ${tenure === item ? "active" : ""}`}
              key={index}
              onClick={() => setTenure(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
