import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeAgreementStatusActions, getAgreementActions } from '../../store/actions/user/user.actions';
import { SignAgreementForm } from '../../components/Form/SignAgreement';
import { AgreementStatus, formatDate, getAgreementStatus, openDocument } from '../../services/utils';

import './Agreement.scss';

export const Agreement = () => {
    const { agrId } = useParams();
    const dispatch = useDispatch();
    const { agreement } = useSelector(state => state.user);
    // const userId = useSelector(state => state.auth.profile.googleId); //TODO треба робити запит на бек, шоб отримувати userDetails
    const userId = agreement?.client?.id;
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
        dispatch(changeAgreementStatusActions.request({ contractId: agreement.id, status}))
    }

    const renderPermissionPannel = (agreement) => {
        const agreementStatus = getAgreementStatus(agreement.status)
        if (agreement.client.id !== userId && agreement.creator.id !== userId){
            return <div>
                <div className={`agreement__status agreement__status_${agreementStatus}`}>
                    Status: <span>{agreementStatus}</span>
                </div>
            </div>
        }
        if (agreement.client.id === userId) {
            const isStatusPending = agreementStatus === AgreementStatus.pending
            const isStatusUnsigned = agreementStatus !== AgreementStatus.concluded 
            const statusLabel = isStatusUnsigned 
                ? agreementStatus === AgreementStatus.declined ? agreementStatus : AgreementStatus.unsigned
                : AgreementStatus.signed;
            return <div>
                <div className={`agreement__status agreement__status_${statusLabel}`}>
                    Status: <span>{statusLabel}</span>
                </div>
                <div className='agreement__buttons'>
                    {isStatusPending && <button className="agr-button agr-button_inverted" onClick={() => openAgreement(agreement)}>Sign agreement</button>}
                    {isStatusPending && <button className="agr-button" onClick={() => changeStatus(2)}>Decline agreement</button>}
                    <button className="agr-button agr-button_inverted" onClick={() => openDocument(agreement.documentId)}>Open agreement</button>
                </div>
            </div>
        } else {
            const isStatusPending = agreementStatus === AgreementStatus.pending
            return <div>
                <div className={`agreement__status agreement__status_${agreementStatus}`}>
                    Status: <span>{agreementStatus}</span>
                </div>
                <div className='agreement__buttons'>
                    {/* TODO Додати модалку підтвердження. Чи я точно хочу відхилити */}
                    {isStatusPending && <button className="agr-button" onClick={() => changeStatus(2)}>Decline agreement</button>} 
                    <button className="agr-button agr-button_inverted" onClick={() => openDocument(agreement.documentId)}>Open agreement</button>
                </div>
            </div>
        }
    }
            
    if (!agreement) return <div className='agreement'>There`s no such agreement</div>    

    const { label, description, expireAt, client, createdAt, creator } = agreement;
    const isAgreementOpen = openSign && agreementToSign;

    if (isAgreementOpen) {
        return <div className='agreement'>
            <SignAgreementForm onClose={closeAgreement} agreement={agreementToSign}/>
        </div> 
    }

    return <div className='agreement'>
        <div className="agreement__title">{label}</div>
        <div className="agreement__info">
            <div className="agreement__info-item"><span>Created:</span> {formatDate(createdAt)}</div>
            <div className="agreement__info-item"><span>Expire:</span> {formatDate(expireAt)}</div>
            <div className="agreement__info-user">
                <span>Sender:</span>
                <div> 
                    <img src={creator.avatarUrl ? creator.avatarUrl : '/assets/icons/user.png'} alt="avatar"/>
                    {creator.email}
                </div>
            </div>
            <div className="agreement__info-user">
                <span>Receiver:</span>
                <div> 
                    <img src={client.avatarUrl ? client.avatarUrl : '/assets/icons/user.png'} alt="avatar"/>
                    {client.email}
                </div>
            </div>
        </div>
        <p className='agreement__description'>{description}</p>
        {renderPermissionPannel(agreement)}
    </div>
}