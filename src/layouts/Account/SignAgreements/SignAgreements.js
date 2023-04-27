import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";
import { Agreement } from "../../../components/Agreement";
import { SignAgreementForm } from "../../../components/Form/SignAgreement";
import './SignAgreements.scss';

export const SignAgreements = () => {
    const [openModal, setOpenModal] = useState(false);
    const [agreementToSign, setAgreementToSign] = useState(null);
    const { signAgreements } = useSelector((state) => state.user)

    const openAgreement = (agr) => {
        setAgreementToSign(agr);
        setOpenModal(true);
    }

    const closeAgreement = () => {
        setAgreementToSign(null);
        setOpenModal(false);
    }

    return (
      <div className="account__panel sign-agreements">
        {/* add message when 0 items */}
        {signAgreements.map((agreement) => <Agreement key={agreement.id} {...agreement} onClick={() => openAgreement(agreement)}/>)}

        <Modal
          open={!!agreementToSign && openModal}
          onClose={closeAgreement}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <><SignAgreementForm agreement={agreementToSign}/></>
        </Modal>
      </div>
    );
}