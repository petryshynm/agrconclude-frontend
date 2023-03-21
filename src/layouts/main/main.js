import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthButton } from "../../components/AuthButton";
import { Paths } from "../../services/routes/paths";

import "./Main.scss";

export const Main = () => {
  const navigate = useNavigate();
  const { profile, authentificated } = useSelector(state => state.auth);

  useEffect(() => {
    // if (profile && authentificated) {
    //   navigate(Paths.ACCOUNT)
    // }
  }, [profile, authentificated, navigate]);

  return <div className="main">
    <div className="main__title">
      <div className="main__logo"></div>
      agrConclude
    </div>
    <div className="main__subtitle">
      agrConclude <span>- this is lorem ipsum dolor</span>
    </div>
    <div className="main__paragraph">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
    <AuthButton />
    <img src="./assets/note.png" alt="Note" className="main__note" />
  </div>
}
