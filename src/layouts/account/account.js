import { Tab, Tabs} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { MyAgreements } from "./MyAgreements";
import { SignAgreements } from "./SignAgreements";
import { Profile } from "./Profile";
import { Templates } from "./Templates";

import "./Account.scss";

const pages = [
  {
    component: <MyAgreements/>,
    label: "My agreements",
  },
  {
    component: <SignAgreements/>,
    label: "Sign agreements",
  },
  {
    component: <Profile/>,
    label: "Profile",
  },
  {
    component: <Templates/>,
    label: "Templates",
  }
] 

const TabsPanel = ({ value }) => pages[value].component

export const Account = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { tab } = useParams();
  // const createFile = async (title) => {
  //   dispatch(createDocumentRequest());
  // };
  console.log(tab);
  return (
    <div className="account">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {pages.map(({label}) => <Tab key={label} label={label}/>)}
      </Tabs>
      <TabsPanel value={tabIndex}/>
    </div>
  );
};
