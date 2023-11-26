import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const validProperties = {
  "Назва об'єкта": "name",
  "Інвентарний номер": "inventoryNumber",
  "Одиниця виміру": "unit",
  "Кількість ": "quantity",
  "Первісна вартість": "initialValue",
  "Сума ": "sum",
  "Примітка ": "note",
};

export const ActSearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchProperty, setSearchProperty] = useState("name");

  const handleSearch = () => {
    // Call the onSearch callback with the search parameters
    onSearch(searchTerm, searchProperty);
  };

  return (
    <div>
      <TextField
        label="Search Term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Search Property</InputLabel>
        <Select
          label="Search Property"
          value={searchProperty}
          onChange={(e) => setSearchProperty(e.target.value)}
        >
          {Object.entries(validProperties).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};
