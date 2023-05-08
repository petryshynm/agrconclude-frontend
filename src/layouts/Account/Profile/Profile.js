import { useDispatch, useSelector } from "react-redux";
import { AgreementStatus, getAgreementStatus, profileSocials } from "../../../services/utils";

import { SignatureModal } from "../../../components/Signature";
import { AgreementCard } from "../../../components/AgreementCard";

import "./Profile.scss";
import { logoutUserActions } from "../../../store/actions/auth/auth.actions";
import { useMediaQuery } from "@mui/material";

export const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { signAgreements, myAgreements } = useSelector((state) => state.user);
  const { signature } = useSelector((state) => state.docs);
  const agreementsVisible = useMediaQuery("(min-width: 821px)");

  console.log(profile);
  return (
    <div className="account__panel profile">
      <div className="profile__info">
        <img src={profile?.avatar_url || "/assets/icons/user.png"} alt="user" />
        <div className="profile__name">
          {profile?.given_name} {profile?.family_name}
        </div>
        <div className="profile__email">{profile?.email}</div>
        <div className="profile__amounts">
          <div>
            <div>
              {signAgreements?.filter((agr) => getAgreementStatus(agr.status) === AgreementStatus.concluded).length}
            </div>
            <div>signed</div>
          </div>
          <div>
            <div>
              {signAgreements?.filter((agr) => getAgreementStatus(agr.status) !== AgreementStatus.concluded).length}
            </div>
            <div>non-signed</div>
          </div>
          <div>
            <div>{myAgreements?.length}</div>
            <div>to sign</div>
          </div>
        </div>
        <button className="agr-button agr-button_inverted profile__mb">
          Upload New Avatar
        </button>
        <button className="agr-button">Delete</button>
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
          {profileSocials.map((media) => (
            <img src={`/assets/icons/${media}.svg`} key={media} alt={media} />
          ))}
        </div>
        <button
          className="agr-button profile__mb"
          onClick={() => dispatch(logoutUserActions.request())}
        >
          Exit
        </button>
        <button className="agr-button agr-button_inverted">Edit Profile</button>
      </div>
      <div className="profile__content">
        {agreementsVisible && (
          <>
            <div className="profile__content-label">Last Sent Agreements</div>
            <div className="profile__content-block">
              {myAgreements.slice(0, 3).map((agreement) => (
                <AgreementCard
                  {...agreement}
                  status={getAgreementStatus(agreement.status)}
                  key={agreement.id}
                />
              ))}
            </div>
            <div className="profile__content-label">Last Sign Agreements</div>
            <div className="profile__content-block">
              {signAgreements.slice(0, 3).map((agreement) => (
                <AgreementCard
                  {...agreement}
                  status="unsigned"
                  key={agreement.id}
                />
              ))}
            </div>
          </>
        )}
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
  );
};
