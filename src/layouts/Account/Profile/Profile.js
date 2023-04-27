import { useSelector } from "react-redux"

export const Profile = () => {
    const { profile } = useSelector((state) => state.auth);
    const { signAgreements, myAgreements } = useSelector((state) => state.user)

    console.log(profile);
    return <div className='account__panel'>
        <img src={profile.avatar_url} alt="user"/> {profile.given_name} {profile.family_name}
        <div>Угод до підписання: {signAgreements.length}</div>
        <div>Надісланих угод: {myAgreements.length}</div>
    </div>
}