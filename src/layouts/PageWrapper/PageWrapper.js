import './PageWrapper.scss';

export const PageWrapper = ({ children }) => {
    return <div className='page-wrapper'>
        <img src="./assets/images/handshakes-light.png" alt="Hand shakes" className="page-wrapper__shakes" />
        <img src="./assets/images/bg-circle2.png" alt="Circle" className="page-wrapper__circle1" />
        <img src="./assets/images/bg-circle3.png" alt="Circle" className="page-wrapper__circle2" />


        {children}
    </div>
}