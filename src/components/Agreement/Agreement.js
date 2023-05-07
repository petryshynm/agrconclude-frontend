import { Tooltip } from "@mui/material";

import "./Agreement.scss";

export const Agreement = ({ id, label, description, createdAt, status, onClick }) => (
  <div key={id} className={` agreement agreement_${status}`} onClick={onClick}>
    <div className="agreement__content">
        <Tooltip title={label} placement="bottom-start" arrow>
            <div className="agreement__header">{label}</div>
        </Tooltip>
        <div className="agreement__description">
            {description}
        </div>
        <div className="agreement__info">
            <div>Status: <span>{status}</span></div>
            <div>Created: <span>{createdAt}</span></div>
        </div>
    </div>
    <div className="agreement__status"></div>
  </div>
);
