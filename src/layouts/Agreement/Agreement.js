import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeAgreementStatusActions, getAgreementActions } from '../../store/actions/user/user.actions';
import { SignAgreementForm } from '../../components/Form/SignAgreement';

import './Agreement.scss';
import { AgreementStatus, openDocument } from '../../services/utils';

export const Agreement = () => {
    const { agrId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.profile.googleId);
    const { agreement } = useSelector(state => state.user);
    const [openSign, setOpenSign] = useState(false);
    const [agreementToSign, setAgreementToSign] = useState(null);
    
    useEffect(() => {
        dispatch(getAgreementActions.request(agrId));
    }, [agrId, dispatch])

    const openAgreement = (agr) => {
        setAgreementToSign(agr);
        setOpenSign(true);
    }
    
    const closeAgreement = () => {
        setAgreementToSign(null);
        setOpenSign(false);
    }

    const changeStatus = (status) => {
        dispatch(changeAgreementStatusActions.request({ agreementId: agreement.id, status }))
    }

    const renderPermissionPannel = (agreement) => {
        if (agreement.receiver.id !== userId && agreement.sender.id !== userId){
            return <div>
                <div className={`agreement__status agreement__status_${agreement.status}`}>
                    Status: <span>{agreement.status}</span>
                </div>
            </div>
        }
        if (agreement.receiver.id === userId) {
            const isStatusPending = agreement.status === AgreementStatus.pending
            const isStatusUnsigned = agreement.status !== AgreementStatus.concluded 
            const statusLabel = isStatusUnsigned 
                ? agreement.status === AgreementStatus.declined ? agreement.status : AgreementStatus.unsigned
                : AgreementStatus.signed;
            return <div>
                <div className={`agreement__status agreement__status_${statusLabel}`}>
                    Status: <span>{statusLabel}</span>
                </div>
                <div className='agreement__buttons'>
                    {isStatusPending && <button className="agr-button agr-button_inverted" onClick={() => openAgreement(agreement)}>Sign agreement</button>}
                    {isStatusPending && <button className="agr-button" onClick={() => changeStatus(AgreementStatus.declined)}>Decline agreement</button>}
                    <button className="agr-button agr-button_inverted" onClick={() => openDocument(agreement.documentId)}>Open agreement</button>
                </div>
            </div>
        } else {
            const isStatusPending = agreement.status === AgreementStatus.pending
            return <div>
                <div className={`agreement__status agreement__status_${agreement.status}`}>
                    Status: <span>{agreement.status}</span>
                </div>
                <div className='agreement__buttons'>
                    {isStatusPending && <button className="agr-button" onClick={() => changeStatus(AgreementStatus.declined)}>Decline agreement</button>}
                    <button className="agr-button agr-button_inverted" onClick={() => openDocument(agreement.documentId)}>Open agreement</button>
                </div>
            </div>
        }
    }
            
    if (!agreement) return <div className='agreement'>There`s no such agreement</div>    

    const { label, description, expireAt, receiver, createdAt, sender } = agreement;
    const isAgreementOpen = openSign && agreementToSign;

    if (isAgreementOpen) {
        return <div className='agreement'>
            <SignAgreementForm onClose={closeAgreement} agreement={agreementToSign}/>
        </div> 
    }

    return <div className='agreement'>
        <div className="agreement__title">{label}</div>
        <div className="agreement__info">
            <div className="agreement__info-item"><span>Created:</span> {createdAt}</div>
            <div className="agreement__info-item"><span>Expire:</span> {expireAt}</div>
            <div className="agreement__info-user">
                <span>Sender:</span>
                <div> 
                    <img src={sender.avatar_url ? sender.avatar_url : '/assets/icons/user.png'} alt="avatar"/>
                    {sender.email}
                </div>
            </div>
            <div className="agreement__info-user">
                <span>Receiver:</span>
                <div> 
                    <img src={receiver.avatar_url ? receiver.avatar_url : '/assets/icons/user.png'} alt="avatar"/>
                    {receiver.email}
                </div>
            </div>
        </div>
        <p className='agreement__description'>{description}</p>
        {renderPermissionPannel(agreement)}
    </div>
}