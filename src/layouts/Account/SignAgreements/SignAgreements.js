import { useState } from "react";
import { useSelector } from "react-redux";

import { Agreement } from "../../../components/Agreement";
import { SignAgreementForm } from "../../../components/Form/SignAgreement";

import './SignAgreements.scss';
import { getDocumentFields } from "../../../services/utils";

export const SignAgreements = () => {
    const [openSign, setOpenSign] = useState(false);
    const [agreementToSign, setAgreementToSign] = useState(null);
    const { signAgreements } = useSelector((state) => state.user)

    const openAgreement = (agr) => {
        setAgreementToSign(agr);
        setOpenSign(true);
    }

    const closeAgreement = () => {
        setAgreementToSign(null);
        setOpenSign(false);
    }

    const onSubmit = () => {
    }
    return (
      <div className="account__panel sign-agreements">
        {openSign && agreementToSign ? (
            <div>
              <button onClick={closeAgreement}>go back</button>
              <SignAgreementForm agreement={agreementToSign}/>
            </div>
          ) : <>
            {signAgreements.map((agreement, index) => (
              <Agreement 
                key={index} 
                {...agreement}
                status="unsigned" 
                onClick={() => openAgreement(agreement)}
              />
            ))}
          </>
        }
      </div>
    );
}