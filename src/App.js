import "./App.css";
import React, { useState,useEffect } from "react";
import { tenureList } from "./utils";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEMI] = useState(0);

  let onChangeDownPayment = (e) => {
    if(!cost)return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0))

    const emi = calculateEMI(dp)
    setEMI(emi)
  }

  let onChangeEMI = (e) => {
    if(!cost)return;
    const emi = Number(e.target.value)
    setEMI(emi.toFixed(0))

    const dp = calculateDownPayment(emi)
    setDownPayment(dp)
  }

  let calculateDownPayment = (emi) => {
    if(!cost)return;

    const dpPercent = 100 - (emi/calculateEMI(0))*100;
    return Number((dpPercent/100)*cost).toFixed(0)
  }

  let calculateEMI = (dp) => {
    if(!cost)return;
    const loanAmt = cost - dp;
    const rateOfInterest = interest/100;
    const numberOfYears = tenure/12;

    const EMI = (loanAmt * rateOfInterest * (1+rateOfInterest)**numberOfYears) / ((1+rateOfInterest)**numberOfYears-1)
    return Number(EMI/12).toFixed(0);
  }

  useEffect(() => {
    if(!(cost > 0)){
      setDownPayment(0)
      setEMI(0)
    }

    const emi = calculateEMI(downPayment)
    setEMI(emi)
   
  }, [tenure,calculateEMI,cost,downPayment])
  


  return (
    <div className="App">
      <h2>EMI Calculator</h2>
      <label className="label" htmlFor="cost">
        Total Cost
      </label>
      <input
        type="number"
        name="cost"
        id="cost"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
      />
      <label className="label" htmlFor="interestRate">
        Interest Rate(in %)
      </label>
      <input
        type="number"
        name="interestRate"
        id="interestRatest"
        value={interest}
        onChange={(e) => setInterest(Number(e.target.value))}
      />
      <label className="label" htmlFor="fee">
        Processing Fee(in %)
      </label>
      <input
        type="number"
        name="fee"
        id="fee"
        value={fee}
        onChange={(e) => setFee(Number(e.target.value))}
      />
      <div className="section">
        <label htmlFor="downPayment">Down Payment</label>
        <span style={{textDecoration:"underline"}}>Total Down Payment - { (Number(downPayment)+(cost-downPayment)*(fee/100)).toFixed(0) }</span>
        <input
          className="slider"
          type="range"
          name="downPayment"
          id="downPayment"
          value={downPayment}
          max={cost}
          min={0}
          onChange={(e) => onChangeDownPayment(e)}
        />
        <div className="sliderText">
          <span>0%</span>
          <span>{downPayment}</span>
          <span>100%</span>
        </div>
      </div>
      <div className="section">
        <label htmlFor="emi">Loan per month</label>
        <span style={{textDecoration:"underline"}}>Total loan amount - { Number(emi*tenure).toFixed(0) }</span>
        <input
          className="slider"
          type="range"
          name="emi"
          id="emi"
          value={emi}
          max={calculateEMI(0)}
          min={calculateEMI(cost)}
          onChange={(e) => onChangeEMI(e)}
        />
        <div className="sliderText">
          <span>{calculateEMI(cost)}</span>
          <span>{emi}</span>
          <span>{calculateEMI(0)}</span>
        </div>
      </div>
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
