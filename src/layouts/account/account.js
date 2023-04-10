import { Tab, Tabs} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MyAgreements } from "./MyAgreements";
import { SignAgreements } from "./SignAgreements";
import { Profile } from "./Profile";
import { Templates } from "./Templates";

import "./Account.scss";

const pages = [
  {
    component: <MyAgreements/>,
    label: "My agreements",
    id: 'my-agreements',
  },
  {
    component: <SignAgreements/>,
    label: "Sign agreements",
    id: 'sign-agreements',
  },
  {
    component: <Profile/>,
    label: "Profile",
    id: 'profile',
  },
  {
    component: <Templates/>,
    label: "Templates",
    id: 'templates',
  }
] 

const TabsPanel = ({ value }) => pages[value].component

export const Account = () => {
  const { tab } = useParams();
  const paramsTabIndex = pages.findIndex((t) => t.id === tab);
  const tabIndex = paramsTabIndex !== -1 ? paramsTabIndex : 0;
  const navigate = useNavigate();
  // const createFile = async (title) => {
  //   dispatch(createDocumentRequest());
  // };

  return (
    <div className="account">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={(e, newIndex) => navigate(`/account/${pages[newIndex].id}`)}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {pages.map(({label}) => <Tab key={label} label={label}/>)}
      </Tabs>
      <TabsPanel value={tabIndex}/>
    </div>
  );
};
