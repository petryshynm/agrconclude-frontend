import { Modal } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CreateAgreementForm } from "../../../components/Form/CreateAgreement/CreateAgreement";
import { Agreement } from "../../../components/Agreement";
import "./MyAgreements.scss";

export const MyAgreements = () => {
  const [openModal, setOpenModal] = useState(false);
  const { myAgreements } = useSelector((state) => state.user)

  return (
    <div className="my-agreements account__panel"> 
      {/* add message when 0 items*/}
      {myAgreements.map((agreement) => <Agreement{...agreement} key={agreement.id} onClick={() => console.log(agreement.id)}/>)}

      <button className="account__plus" onClick={() => setOpenModal(true)}>
        <div>+</div>
      </button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <><CreateAgreementForm /></>
      </Modal>
    </div>
  );
};
