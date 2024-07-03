import React from 'react'

const SliderInput = ({title,state,onChange,min,max,minLabel,maxLabel}) => {
  return (
    <>
      <div className="section">
        <label>{title}</label>
        {/* <span style={{textDecoration:"underline"}}>Total {title} - { (Number(downPayment)+(cost-downPayment)*(fee/100)).toFixed(0) }</span> */}
        <input
          className="slider"
          type="range"
          value={state}
          max={max}
          min={min}
          onChange={onChange}
        />
        <div className="sliderText">
          <span>{minLabel ?? min}</span>
          <span>{state}</span>
          <span>{maxLabel ?? max}</span>
        </div>
      </div>
    </>
  )
}

export default SliderInput