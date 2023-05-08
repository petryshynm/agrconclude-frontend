import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./AgreementCard.scss";
import { formatDate } from "../../services/utils";

export const AgreementCard = ({ id, label, description, createdAt, status }) => {
  const navigate = useNavigate();

  const onAgreementClick = () => {
    navigate(`/account/agreement/${id}`)
  }

  return (
    <div key={id} className={` agreement-card agreement-card_${status}`} onClick={onAgreementClick}>
      <div className="agreement-card__content">
          <Tooltip title={label} placement="bottom-start" arrow>
              <div className="agreement-card__header">{label}</div>
          </Tooltip>
          <div className="agreement-card__description">
              {description}
          </div>
          <div className="agreement-card__info">
              <div>Status: <span>{status}</span></div>
              <div>Created: <span>{formatDate(createdAt)}</span></div>
          </div>
      </div>
      <div className="agreement-card__status"></div>
    </div>
  );
}
