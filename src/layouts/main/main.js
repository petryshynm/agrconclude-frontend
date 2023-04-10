import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../../components/AuthButton";
import { socials } from "../../services/utils";

import "./Main.scss";

export const Main = () => {
  const navigate = useNavigate();
  const { profile, authentificated } = useSelector(state => state.auth);

  useEffect(() => {
  }, [profile, authentificated, navigate]);

  return  <div className="main">
    <section className="main-info">
      <div className="container">
        <div className="main-info__logo">
          <img src="./assets/icons/logo-full.svg" alt="logo"/>
        </div>
        <div className="main-info__title">
          Take the hassle out of contract agreements with <span>agrConclude</span>
        </div>
        <div className="main__paragraph">
        Introducing agrConclude – the revolutionary new contract agreement product that streamlines the process of creating, negotiating, and executing contracts.
        </div>
        <AuthButton />
      </div>
      <img src="./assets/images/bg-circle1.png" alt="Circle" className="main__circle1" />
      <img src="./assets/images/handshakes-light.png" alt="Hand shakes" className="main__shakes1" />
      <img src="./assets/images/bg-circle2.png" alt="Circle" className="main__circle2" />
      <img src="./assets/images/wish-list.png" alt="Wish list" className="main__list" />
    </section>
    <section className="main-about-us">
      <img src="./assets/images/handshakes-light.png" alt="Hand shakes" className="main__shakes2" />
      <img src="./assets/images/deal.png" alt="Deal" className="main__deal" />
      <div className="container">
        <div className="main__title">
          About us
        </div>
        <div className="main__paragraph">
          With intuitive features such as automated generation of contracts and built-in templates, you can quickly create contracts that are tailored to fit your needs.
          <br/>
          <br/>
          Additionally, you can easily negotiate and amend contracts with other parties, as well as securely store and manage them from one central location. With agrConclide, you can rest assured knowing that your contracts are legally sound and compliant.
        </div>
        <Link to="/about-us" className="main__more">Get more info</Link>
      </div>
    </section>
    <section className="main-contact-us">
      <img src="./assets/images/handshakes-dark.png" alt="Hand shakes" className="main__shakes3" />
      <div className="main__title main__title_light">
        Contact Us
      </div>
      <div className="container">
        <div>
          <div className="main-contact-us__title">
            Get in touch with us
          </div>
          <div className="main__paragraph main__paragraph_light">
            agrConclude will never ask for sensetive information including passwords, 12-word phrases or private keys
          </div>
          <Link to="/contacts" className="main__more main__more_light">Get more info</Link>
        </div>
        <div className="socials">
          {socials.map((media, index) => (
            media.icon
              ? <div key={media.icon} className={`socials__block socials__block_${media.color}`}>
                <img src={`./assets/icons/${media.icon}.svg`} alt="Social Media Icon" className="socials__icon"/>
              </div>
              : <div key={index} className="socials__block socials__block_transparent" />
          ))}
        </div>
      </div>
    </section>
  </div>
}
