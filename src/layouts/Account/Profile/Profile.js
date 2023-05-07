import { useDispatch, useSelector } from "react-redux"
import { profileSocials } from "../../../services/utils";

import { SignatureModal } from "../../../components/Signature";
import { Agreement } from "../../../components/Agreement";

import './Profile.scss';
import { logoutUserActions } from "../../../store/actions/auth/auth.actions";

const emailKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

export const Profile = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.auth);
    const { signAgreements, myAgreements } = useSelector((state) => state.user)
    const { signature } = useSelector((state) => state.docs)

    const onAgreementClick = (agreement) => console.log(agreement.id);

    return <div className='account__panel profile'>
        <div className="profile__info">
            <img
                src={profile?.avatar_url || '../assets/icons/user.png'} 
                alt="user"
            />
            <div className="profile__name">Some name{profile?.given_name} {profile?.family_name}</div>
            <div className="profile__email">Some email{profile?.[emailKey]}</div>
            <div className="profile__amounts">
                <div>
                    <div>{signAgreements?.filter((agr) => agr.status === 'concluded').length}</div>
                    <div>signed</div>
                </div>
                <div>
                    <div>{signAgreements?.filter((agr) => agr.status !== 'concluded').length}</div>
                    <div>non-signed</div>
                </div>
                <div>
                    <div>{myAgreements?.length}</div>
                    <div>to sign</div>
                </div>
            </div>
            <button className="profile__button profile__button_inverted profile__mb">Upload New Avatar</button>
            <button className="profile__button">Delete</button>
            <div className="profile__fields">
                <div className="field">
                    <div className="field__name">Birthday</div>
                    <div className="field__value">{profile?.birthday}</div>
                </div>
                <div className="field">
                    <div className="field__name">Phone</div>
                    <div className="field__value">{profile?.phone}</div>
                </div>
                <div className="field">
                    <div className="field__name">Gender</div>
                    <div className="field__value">{profile?.gender}</div>
                </div>
            </div>
            <div className="profile__socials">
                {profileSocials.map((media) => <img src={`/assets/icons/${media}.svg`} key={media} alt={media} />)}
            </div>
            <button className="profile__button profile__mb" onClick={() => dispatch(logoutUserActions.request()) }>Exit</button>
            <button className="profile__button">Edit Profile</button>
        </div>
        <div className="profile__content">
            <div className="profile__content-label">Last Sent Agreements</div>
            <div className="profile__content-block">
                {myAgreements.slice(0,3).map((agreement) => <Agreement {...agreement} key={agreement.id} onClick={onAgreementClick}/>)}
            </div>
            <div className="profile__content-label">Last Sign Agreements</div>
            <div className="profile__content-block"> 
                {signAgreements.slice(0,3).map((agreement) => <Agreement {...agreement} status="unsigned" key={agreement.id} onClick={onAgreementClick}/>)}
            </div>
            <div className="profile__content-label">Signature</div>
            <div className="profile__content-block"> 
                {signature && (
                    <div className="profile__signature">
                        <img src={signature} alt="my signature" />
                    </div>
                )}
                <SignatureModal />
            </div>
        </div>
    </div>
}