import { useState } from "react";
import { useSelector } from "react-redux";

import { Agreement } from "../../../components/Agreement";
import { SignAgreementForm } from "../../../components/Form/SignAgreement";

import './SignAgreements.scss';
import { getDocumentFields } from "../../../services/utils";
import classNames from "classnames";

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

    const isAgreementOpen = openSign && agreementToSign;
    return (
      <div className={classNames("account__panel sign-agreements", {'sign-agreements_opened': isAgreementOpen})}>
        {isAgreementOpen 
          ? (
            <SignAgreementForm onClose={closeAgreement} agreement={agreementToSign}/>
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