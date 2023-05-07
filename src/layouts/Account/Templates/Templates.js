import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";

import { getDocumentsActions } from "../../../store/actions/docs/docs.actions";
import { openDocument } from "../../../services/utils";

import "./Templates.scss";

export const Templates = () => {
  const { documents } = useSelector((state) => state.docs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocumentsActions.request());
  }, [dispatch]);

  return (
    <div className="account__panel templates">
      <div className="agr-title">My templates:</div>
      {documents.length ? (
        <div className="templates__list">
          {documents.map(({ label, value }) => (
            <div
              className="template"
              key={value}
              onClick={() => openDocument(value)}
            >
              <Tooltip title={label} placement="bottom-start" arrow>
                <div className="template__header">
                  <img src="/assets/icons/pdf-icon.svg" alt="pdf icon" />
                  {label}
                </div>
              </Tooltip>
              <div className="template__content">
                <img
                  src="/assets/images/pdf-template.jpg"
                  alt="pdf template"
                />
              </div>
            </div>
          ))}
        </div>
      ) : 'There`s any template'
    }
    </div>
  );
};
