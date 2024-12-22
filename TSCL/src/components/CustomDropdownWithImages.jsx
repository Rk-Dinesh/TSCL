import { useState } from "react";

const CustomDropdownWithImages = ({ options, register, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    register.onChange({ target: { name: register.name, value: option.res_name } });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="block w-full px-4 py-3 text-left text-sm text-black bg-gray-50 border border-gray-200 rounded-lg outline-none"
      >
        {selected ? (
          <div className="flex items-center gap-2">
            <img src={selected.image} alt="icon" className="w-6 h-6" />
            {selected.res_name}
          </div>
        ) : (
          "Select an Origin"
        )}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {options && options?.map((option, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              <img src={option.image} alt="icon" className="w-6 h-6" />
              {option.res_name}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-red-500 text-xs text-start px-2 pt-2">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default CustomDropdownWithImages;
