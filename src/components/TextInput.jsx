import React from 'react'

const TextInput = ({title,state,setState}) => {
  return (
    <>
    <label className="label" htmlFor="cost">
        {title}
      </label>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </>
  )
}

export default TextInput