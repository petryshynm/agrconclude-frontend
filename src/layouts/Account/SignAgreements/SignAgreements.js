import { useSelector } from "react-redux";

import { AgreementCard } from "../../../components/AgreementCard";
import { getAgreementStatus } from "../../../services/utils";


import './SignAgreements.scss';
import { AgreementStatus } from "../../../services/constants";

export const SignAgreements = () => {
    const { signAgreements } = useSelector((state) => state.user)

    return (
      <div className="account__panel sign-agreements">
        <div className="agr-title">Sign Agreements</div>
        <div className="sign-agreements__list">
        {signAgreements.length
          ? signAgreements.map((agreement, index) => {
            const agreementStatus = getAgreementStatus(agreement.status)
            const isStatusUnsigned = agreementStatus !== AgreementStatus.concluded 
            const statusLabel = isStatusUnsigned 
                ? agreementStatus === AgreementStatus.declined ? agreementStatus : AgreementStatus.unsigned
                : AgreementStatus.signed;
            return <AgreementCard 
              key={index} 
              {...agreement}
              status={statusLabel} 
            />
          })
          : 'There`s any agreement.'
        }
        </div>
      </div>
    );
}