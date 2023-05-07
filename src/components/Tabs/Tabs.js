import { useState } from "react";
import classNames from "classnames";

import './Tabs.scss';

export const Tabs = ({ tabs, onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return <div className={classNames("tabs", {
        'tabs_open': isOpen
    })}>
        <img className="tabs__burger" src="/assets/icons/hamburger-white.svg" onClick={() => setIsOpen(!isOpen)} alt="toggle"/>
        {isOpen && (
            <>
                <img className="tabs__header" src="/assets/icons/logo-white.svg" alt="logo"/>
                {tabs.map(({icon, label, id}, index) => (
                    <div onClick={() => {
                        onChange(index);
                        setIsOpen(false);
                    }} key={id} className={classNames("tabs__item", {
                    'tabs__item_active': index === value
                    })} >
                    <img src={icon} alt={label} />
                    {label}
                    </div>
                ))}
            </>
        )}
    </div>
  }