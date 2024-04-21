import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function ArtworkDropdown({ id, title, options, onSelect, getMediumOptions }) {
  const handleItemClick = (item) => {
    onSelect(item);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id={id}>
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {getMediumOptions // Check for getMediumOptions prop
          ? getMediumOptions().map(
              (
                item,
                index // Use getMediumOptions to generate options
              ) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </Dropdown.Item>
              )
            )
          : options.map(
              (
                item,
                index // Fallback to static options
              ) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </Dropdown.Item>
              )
            )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ArtworkDropdown;
