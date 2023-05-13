import { contactsSocials } from '../../services/utils'
import { PageWrapper } from '../PageWrapper'
import GoogleMapReact from 'google-map-react';

import './Contacts.scss'

export const Contacts = () => {
    const defaultMapProps = {
        center: {
          lat: 49.840472517590584,
          lng: 24.02231815530599
        },
        zoom: 17
    };

    return <PageWrapper>
        <section className="contacts">
            <div className='contacts__content'>
                <div className='contacts__title'>Get in touch with us</div>
                <div className='contacts__subtitle'>agrConclude will never ask for sensetive information including passwords, 12-word phrases or private keys</div>
                <div className='contacts__socials'>
                    {contactsSocials.map((path, index) => (
                        <img key={index} src={`./assets/icons/${path}.svg`} alt="Social Media Icon" className="contacts__icon"/>
                    ))}
                </div>
            </div>
            <div className='contacts__map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDNLrnjVDRDbFcskW3rNzXMD2hZYDwNZw0' }}
                    defaultCenter={defaultMapProps.center}
                    defaultZoom={defaultMapProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </section>
    </PageWrapper>
}