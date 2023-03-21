import { Modal } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateAgreementForm } from "../../../components/Form/CreateAgreement/CreateAgreement";
import "./MyAgreements.scss";

export const MyAgreements = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const myAgreements = [
    {
      label: "Угода про співпрацю",
      id: "some_id",
      status: "pending",
      timestamp: "16.03.2023",
      receiverId: "someUserId",
    },
    {
      label: "Угода про нерозголошення",
      id: "some_id",
      status: "concluded",
      timestamp: "18.03.2023",
      receiverId: "someUserId3",
    },
    {
      label: "Угода про звільнення",
      id: "some_id",
      status: "declined",
      timestamp: "21.03.2023",
      receiverId: "someUserId2",
    },
  ];

  return (
    <div className="account__panel my-agreements">
      {myAgreements.map(({ id, label, timestamp, status }) => (
        <div 
            className={`account__agreement agreement agreement_${status}`}
        >
            <div className="agreement__header">{label}</div>
            <div className="agreement__info">
                <div>
                    <div>Status: {status}</div>
                    <div>Created: {timestamp}</div>
                </div>
                <button onClick={() => console.log("open ", id)}>
                    -{'>'}
                </button>
            </div>
        </div>
      ))}

      <button className="account__plus" onClick={() => setOpenModal(true)}>
        <div>+</div>
      </button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateAgreementForm />
      </Modal>
    </div>
  );
};
