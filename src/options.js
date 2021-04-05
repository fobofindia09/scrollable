/* global chrome */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  InputLabel,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./options.css";
import { DEFAULT_POSITION_VALUE, POSITION_VALUES } from "./constants";

const OptionsForm = () => {
  const [position, setPosition] = useState();

  chrome.storage.sync.get(
    { position: DEFAULT_POSITION_VALUE },
    ({ position }) => {
      setPosition(position);
    }
  );

  const handlePositionChange = (e) => {
    const position = e.target.value;

    setPosition(position);

    chrome.storage.sync.set({ position });
  };

  if (!position) return <div />;

  return (
    <FormControl disabled={!position}>
      <InputLabel id="position-select-label">Position</InputLabel>
      <Select
        labelId="position-select-label"
        id="position-select"
        value={position}
        onChange={handlePositionChange}
      >
        {Object.keys(POSITION_VALUES).map((positionKey) => (
          <MenuItem value={POSITION_VALUES[positionKey]}>
            {positionKey}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        Where do you want the Scrollable buttons to appear?
      </FormHelperText>
    </FormControl>
  );
};

ReactDOM.render(<OptionsForm />, document.getElementById("root"));
