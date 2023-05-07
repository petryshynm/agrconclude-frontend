import { useRef, useState } from "react";
import classNames from "classnames";

import './Select.scss';
import { useOnClickOutside } from "../../services/hooks/useClickOutside";
import { useField } from "formik";

export const Select = ({ options, ...rest }) => {
  const [,, { setValue }] = useField(rest)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);
  useOnClickOutside(selectRef, () => setIsOpen(false));


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setValue(option.value)
  };

  const Option = ({label, image}) => {
    if (!label) return "Select an option"
    if (!image) return label

    return <div className="option">
        <img src={image} alt="option"/>
        {label}
    </div>
  }

  return (
    <div className="select__container" ref={selectRef}>
      <div
        className="form__input select__header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Option {...selectedOption} />
        <i className={`arrow ${isOpen ? "arrow_up" : "arrow_down"}`} />
      </div>
      {isOpen && (
        <div className="select__options">
          {options.map((option) => (
            <div
              key={option.value}
              className={classNames("option__container", {
                "option_selected": selectedOption?.value === option.value
              })}
              onClick={() => handleOptionClick(option)}
            >
                <Option {...option} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
