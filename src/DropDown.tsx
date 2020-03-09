import React, { useState, FunctionComponent, Dispatch } from "react";

const DropDown = (label: string, defaultState: string, options: string[]) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace("", "").toLowerCase()}`;
  const Drop: FunctionComponent = () => (
    <label htmlFor={id}>
      {label}
      <select
        name={id}
        id={id}
        value={state}
        onBlur={({ target: { value } }) => setState(value)}
        onChange={({ target: { value } }) => setState(value)}
        disabled={!options.length}
      >
        <option value="all">All</option>
        {options.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  return [Drop, state, setState] as [
    FunctionComponent,
    string,
    Dispatch<string>
  ];
};

export default DropDown;
