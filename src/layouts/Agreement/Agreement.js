import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeAgreementStatusActions, getAgreementActions } from '../../store/actions/user/user.actions';
import { getProfileActions } from '../../store/actions/auth/auth.actions';
import { SignAgreementForm } from '../../components/Form/SignAgreement';
import { formatDate, getAgreementStatus, getAgreementStatusLabel, openDocument } from '../../services/utils';
import { AgreementStatus } from '../../services/constants';

import './Agreement.scss';
import { PageWrapper } from '../PageWrapper';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export const Agreement = () => {
    const { agrId } = useParams();
    const dispatch = useDispatch();
    const { agreement } = useSelector(state => state.user);
    const userId = useSelector(state => state.auth.profile.id);
    const [openSign, setOpenSign] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [agreementToSign, setAgreementToSign] = useState(null);
    
    useEffect(() => {
        dispatch(getAgreementActions.request(agrId));
        dispatch(getProfileActions.request());
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
            return <></>
        }
        if (agreement.client.id === userId) {
            const isStatusPending = agreementStatus === AgreementStatus.pending
            return <div className='agreement__buttons'>
                {isStatusPending && <button className="agr-button agr-button_inverted" onClick={() => openAgreement(agreement)}>Sign agreement</button>}
                {isStatusPending && <button className="agr-button" onClick={() => setOpenDialog(true)}>Decline agreement</button>}
                <button className="agr-button agr-button_inverted" onClick={() => openDocument(agreement.documentId)}>Open agreement</button>
            </div>
        } else {
            const isStatusPending = agreementStatus === AgreementStatus.pending
            return <div className='agreement__buttons'>
                {/* TODO Додати модалку підтвердження. Чи я точно хочу відхилити */}
                {isStatusPending && <button className="agr-button" onClick={() => setOpenDialog(true)}>Decline agreement</button>} 
                <button className="agr-button agr-button_inverted" onClick={() => openDocument(agreement.documentId)}>Open agreement</button>
            </div>
        }
    }
            
    if (!agreement) return <div className='agreement'>There`s no such agreement</div>    

    const { label, description, expireAt, client, createdAt, creator } = agreement;
    const isAgreementOpen = openSign && agreementToSign;

    if (isAgreementOpen) {
        return <div className='agreement agreement__sign-form'>
            <SignAgreementForm onClose={closeAgreement} agreement={agreementToSign}/>
        </div> 
    }

    const statusLabel = getAgreementStatusLabel(agreement.status, agreement.client.id === userId)

    return <PageWrapper>
        <div className={`agreement agreement_${statusLabel}`}>
            <div className='agreement__content'>
                <div className="agreement__title">{label}</div>
                <p className='agreement__description'>{description}</p>
                <div className={`agreement__status agreement__status_${statusLabel}`}>
                    Status: <span>{statusLabel}</span>
                </div>
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
                {renderPermissionPannel(agreement)}
            </div>
        <div className="agreement__status-bar"></div>
        <ConfirmDialog
            title="Decline agreement?"
            open={openDialog}
            setOpen={setOpenDialog}
            onConfirm={() => changeStatus(2)}
        >
            Are you sure you want to delete this post?
        </ConfirmDialog>
        </div>
    </PageWrapper>
}