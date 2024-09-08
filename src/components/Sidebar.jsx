import React, { useState } from "react";
import Dot from "./Dot";
import { FaChevronLeft, FaPlus, FaMinus } from "react-icons/fa";

const initialSchemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
];

const green = "bg-green-500";
const pink = "bg-pink-500";
const gray = "bg-gray-300";

function Sidebar({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState(false);

  const schemaOptions = selectedSchemas.length
    ? initialSchemaOptions.filter(
        (option) =>
          !selectedSchemas.some((schema) => schema.value === option.value)
      )
    : initialSchemaOptions;

  const handleSchemaChange = (schemaValue, newValue) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [schemaValue]: newValue,
    }));
  };

  const handleRemoveSchema = (schemaToRemove) => {
    setSelectedSchemas((prevSchemas) =>
      prevSchemas.filter((schema) => schema.value !== schemaToRemove.value)
    );
    setSelectedValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[schemaToRemove.value];
      return updatedValues;
    });
  };

  const handleSelectSchema = (value) => {
    const selectedSchema = schemaOptions.find(
      (option) => option.value === value
    );
    if (selectedSchema && !selectedSchemas.includes(selectedSchema)) {
      setSelectedSchemas([...selectedSchemas, selectedSchema]);
      setSelectedValues((prevValues) => ({
        ...prevValues,
        [selectedSchema.value]: selectedSchema.value,
      }));
      setShowDropdown(false);
    }
  };

  const handleSaveSegment = (e) => {
    e.preventDefault();

    const segment = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    console.log("Segment:", segment);
    if (Object.keys(selectedValues).length > 0) {
      console.log("Selected Values:", selectedValues);
    }

    onClose();
    setSegmentName("");
    setSelectedSchemas([]);
    setSelectedValues({});
  };

  return (
    <div className="absolute z-10 overflow-auto right-0 top-0 w-[25rem] h-full bg-white shadow-lg">
      {/* Header */}
      <div className="flex gap-2 px-4 py-6 items-center text-white bg-[#38B4C2]">
        <FaChevronLeft
          className="text-lg font-bold mt-1 cursor-pointer"
          onClick={onClose}
          title="close"
        />
        <h2 className="text-lg font-semibold">Saving Segment</h2>
      </div>

      {/* Form */}
      <form className="h-[50%]" onSubmit={handleSaveSegment}>
        {/* Top Section */}
        <div className="flex-col flex gap-4 p-4">
          <label htmlFor="segmentName">Enter the name of the segment</label>
          <input
            required
            type="text"
            name="segmentName"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            className="w-full p-2 border outline-none border-gray-300 rounded"
          />
          <span>
            To save your segment, you need to add the schema to build the query.
          </span>
          <div className="flex text-sm items-center justify-end gap-4">
            <span className="flex gap-1 items-center">
              <Dot background={green} />- User
            </span>
            <span className="flex gap-1 items-center">
              <Dot background={pink} />- Group
            </span>
          </div>
        </div>

        {/* Mid Section */}
        <div className="h-[100%] overflow-auto">
          <div className="min-h-[100%] px-6 p-4">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="flex items-center gap-4 mb-3">
                <Dot background={index % 2 === 0 ? green : pink} />
                <select
                  value={selectedValues[schema.value] || schema.value}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    handleSchemaChange(schema.value, e.target.value)
                  }
                >
                  <option value={schema.value}>{schema.label}</option>
                  {schemaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveSchema(schema)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove Schema"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
            {schemaOptions.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-3">
                  {/* Static Dropdown */}
                  <Dot background={gray} />
                  <select
                    value=""
                    onChange={(e) => handleSelectSchema(e.target.value)}
                    className={`w-full p-2 outline-none border cursor-pointer border-gray-300 rounded ${
                      error ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Add schema to segment</option>
                    {schemaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>{" "}
                </div>
                <div className="flex text-sm gap-3 pl-6 items-center">
                  <a className="w-fit flex items-center gap-1 cursor-pointer border-b-2 border-[#2cd7af] text-[#2cd7af]">
                    <FaPlus /> Add new schema
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white w-full px-6 py-4 flex gap-4">
          <button
            type="submit"
            className="py-2 px-4 bg-[#42B998] text-white font-semibold rounded flex-shrink-0"
          >
            Save the Segment
          </button>
          <button onClick={onClose} className="text-pink-500 font-bold">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sidebar;
