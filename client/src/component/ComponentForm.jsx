import React, { useState } from "react";

const ComponentForm = ({ onAddComponent }) => {
  const [type, setType] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddComponent(type, width, height);
    setType("");
    setWidth("");
    setHeight("");
  };

  const inp = {
    fontSize: "16px",
    borderRadius: "3px",
    padding: "5px",
    margin: "5px",
    border: "0.5px solid #99999",
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={type}
        onChange={(event) => setType(event.target.value)}
        placeholder="Type"
        style={inp}
      />
      <input
        type="number"
        value={width}
        onChange={(event) => setWidth(event.target.value)}
        placeholder="Width"
        style={inp}
      />
      <input
        type="number"
        value={height}
        onChange={(event) => setHeight(event.target.value)}
        placeholder="Height"
        style={inp}
      />
      <button style={inp} type="submit">
        Add Component
      </button>
    </form>
  );
};

export default ComponentForm;
