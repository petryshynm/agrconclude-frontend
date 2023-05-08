import { useSelector } from "react-redux";

import { AgreementCard } from "../../../components/AgreementCard";

import './SignAgreements.scss';
import { getAgreementStatus } from "../../../services/utils";

export const SignAgreements = () => {
    const { signAgreements } = useSelector((state) => state.user)

    return (
      <div className="account__panel sign-agreements">
        <div className="agr-title">Sign Agreements</div>
        <div className="sign-agreements__list">
        {signAgreements.length
          ? signAgreements.map((agreement, index) => (
            <AgreementCard 
              key={index} 
              {...agreement}
              status={getAgreementStatus(agreement.status) === 'concluded' ? 'signed' : 'unsigned'} 
            />
          ))
          : 'There`s any agreement.'
        }
        </div>
      </div>
    );
}