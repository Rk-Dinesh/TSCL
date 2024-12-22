import { useState } from "react";

const SearchableDropdown = ({ Ward, handleWard }) => {
  const [searchTerm, setSearchTerm] = useState("");
 
  const [dropdown, setDropdown] = useState(false);

  const handleChange = (event) =>{
    setSearchTerm(event.target.value)
    setDropdown(true)
  }

  const handleSelect = (wardName) => {
    
   handleWard(wardName);
   setSearchTerm(wardName);
   setDropdown(false)
  };

  const filteredWards = Ward?.data.filter((ward) =>
    ward.ward_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative  ">
      <input
        type="text"
        className="block  px-3 py-2 w-24 text-sm bg-primary text-white border border-none rounded-full outline-none shadow-lg"
        placeholder="Ward"
        value={searchTerm}
        onChange={handleChange}
      />
      {dropdown && (
        <div className="absolute top-full left-0 w-24 max-h-40 overflow-auto bg-white shadow-lg rounded-lg z-10">
          <ul>
            <li
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect("All")}
            >
              All
            </li>
            {filteredWards?.map((ward, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(ward.ward_name)}
              >
                {ward.ward_name}
              </li>
            ))}
            {filteredWards?.length === 0 && (
              <li className="px-3 py-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
