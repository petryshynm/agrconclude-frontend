import { Modal } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import { CreateAgreementForm } from "../../../components/Form/CreateAgreement/CreateAgreement";
import { AgreementCard } from "../../../components/AgreementCard";
import { getAgreementStatus } from "../../../services/utils";

import "./MyAgreements.scss";

export const MyAgreements = () => {
  const [openModal, setOpenModal] = useState(false);
  const { myAgreements } = useSelector((state) => state.user)

  return (
    <div className="account__panel my-agreements"> 
      <div className="agr-title">My Agreements</div>
      <div className="my-agreements__list">
        {myAgreements.length
          ? myAgreements.map((agreement) => <AgreementCard {...agreement} status={getAgreementStatus(agreement.status)} key={agreement.id}/>)
          : 'There`s any agreement.'
        }
      </div>

      <button className="account__plus" onClick={() => setOpenModal(true)}>
        <div>+</div>
      </button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <><CreateAgreementForm classNames="form_modal"/></>
      </Modal>
    </div>
  );
};
