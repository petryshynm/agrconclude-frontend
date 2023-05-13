import { PageWrapper } from "../PageWrapper";
import "./AboutUs.scss";

export const AboutUs = () => {
  return (
    <PageWrapper>
      <section className="about-us">
        <div className="agr-title">About Us</div>
        <div className="about-us__content">
          <div className="about-us__info">
            <p>
              Our company has been searching for a solution that would help us
              conduct business even more effectively and conveniently for a long
              time. After studying various innovative technologies and
              practices, we realized that the future lies in online contract
              signing.
            </p>

            <p>
              We decided to develop our own project - an online contract signing
              system that would benefit not only our company, but also all of
              our clients. We worked hard to ensure the security, ease of use,
              and speed of our system.
            </p>

            <p>
              Now, thanks to our project, our clients can sign contracts anytime
              and anywhere, regardless of their location. There is no need to
              print and scan documents - everything happens online, saving time
              and resources. Additionally, our system provides high levels of
              data security and confidentiality, which is crucial for our
              clients.
            </p>

            <p>
              We are proud to have realized our project and to have helped our
              clients focus even more on their work and business development. We
              believe that the future belongs to technology, and we intend to
              continue developing our system to provide even more convenient and
              secure work for our clients.
            </p>
          </div>
          <div className="about-us__image" />
        </div>
      </section>
    </PageWrapper>
  );
};
