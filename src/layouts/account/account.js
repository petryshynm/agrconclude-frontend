import { useNavigate, useParams } from "react-router-dom";

import { MyAgreements } from "./MyAgreements";
import { SignAgreements } from "./SignAgreements";
import { Profile } from "./Profile";
import { Templates } from "./Templates";
import { Tabs } from "../../components/Tabs/Tabs";

import "./Account.scss";
import { getMyAgreementsActions, getSignAgreementsActions } from "../../store/actions/user/user.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSignatureActions } from "../../store/actions/docs/docs.actions";

const pages = [
  {
    component: <MyAgreements/>,
    label: "My agreements",
    id: 'my-agreements',
    icon: '../assets/icons/handshake.svg',
  },
  {
    component: <SignAgreements/>,
    label: "Sign agreements",
    id: 'sign-agreements',
    icon: '../assets/icons/sign.svg',
  },
  {
    component: <Profile/>,
    label: "Profile",
    id: 'profile',
    icon: '../assets/icons/profile.svg',
  },
  {
    component: <Templates/>,
    label: "Templates",
    id: 'templates',
    icon: '../assets/icons/templates.svg',
  }
] 

const TabsPanel = ({ value }) => pages[value].component

export const Account = () => {
  const { tab } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const paramsTabIndex = pages.findIndex((t) => t.id === tab);
  const tabIndex = paramsTabIndex !== -1 ? paramsTabIndex : 0;

  useEffect(() => {
    dispatch(getSignAgreementsActions.request());
    dispatch(getMyAgreementsActions.request());
    dispatch(getSignatureActions.request())
  }, [dispatch]);
  
  // const createFile = async (title) => {
  //   dispatch(createDocumentRequest());
  // };

  return (
    <div className="account">
      <Tabs
        value={tabIndex}
        onChange={(newIndex) => navigate(`/account/${pages[newIndex].id}`)}
        tabs={pages}
      />
      <TabsPanel value={tabIndex}/>
    </div>
  );
};
