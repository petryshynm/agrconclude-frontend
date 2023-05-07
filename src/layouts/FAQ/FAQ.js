import { useRef, useState } from 'react'
import classNames from 'classnames';

import { useOnClickOutside } from '../../services/hooks/useClickOutside';

import './FAQ.scss'

const FaqItem = ({title, description}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setIsOpen(false));

    return <div ref={ref} className={classNames('faq-item', { 'faq-item_open': isOpen })}>
        <div className='faq-item__header' onClick={() => setIsOpen(!isOpen)}>
            {title}
            <button className='faq-item__button'>+</button>
        </div>
        <p className='faq-item__content'>
            {description}
        </p>
    </div>
}

const faqs = [
    {
        title: 'How can I log in to the app?',
        description: 'To log in to the app, you need to click on the "Login" button and choose the option to sign in with your Google account.'
    },
    {
        title: 'What file formats can be used to create a contract template?',
        description: 'Our app supports creating contract templates in DOCX, PDF, and other popular document formats.'
    },
    {
        title: 'What methods are available for sending a contract for signing?',
        description: 'Our app allows you to send contracts for signing via email or directly to the user`s account.'
    },
    {
        title: 'How can I view the list of sent contracts?',
        description: 'The app has a "History" section where you can view a list of all sent and signed contracts.'
    },
    {
        title: 'Can I track the status of a contract?',
        description: 'Yes, the app has a feature for tracking the status of a sent contract, which shows whether it has been signed or not.'
    },
    {
        title: 'How can I recall a sent contract?',
        description: 'If you need to recall a sent contract, you should contact our support team, who will provide additional information and help resolve the situation.'
    },
]

export const Faq = () => {
    return <div className="faq">
        {faqs.map((question, index) => <FaqItem key={index} {...question}/>)}
    </div>
}