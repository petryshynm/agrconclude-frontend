import { useDispatch, useSelector } from "react-redux"
import { Signature } from "../../../components/Signature/Signature";
import { useEffect } from "react";
import { getSignatureActions } from "../../../store/actions/docs/docs.actions";

export const Profile = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.auth);
    const { signAgreements, myAgreements } = useSelector((state) => state.user)
    const { signature } = useSelector((state) => state.docs)

    useEffect(() => {
        dispatch(getSignatureActions.request())
    }, [dispatch]);

    return <div className='account__panel'>
        <img src={profile?.avatar_url} alt="user"/> {profile?.given_name} {profile?.family_name}
        <div>Угод до підписання: {signAgreements?.length}</div>
        <div>Надісланих угод: {myAgreements?.length}</div>
        <Signature />
        {signature ? (
            <img
            src={signature}
            alt="my signature"
            // onBeforeSend={`function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ${localStorage.getItem('accessToken')}');}`}
            style={{
                display: "block",
                margin: "0 auto",
                border: "1px solid black",
                width: "150px"
            }}
            />
        ) : null}
    </div>
}