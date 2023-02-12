import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/loader'
import WebViewer from '@pdftron/webviewer';
import './profile.scss'

export const Profile = ({}) => {
    const dispatch = useDispatch()
    // const { loading } = useSelector(state => state.products)

    const viewer = useRef(null);

    useEffect(() => {
        WebViewer(
            {
                path: '/webviewer/lib',
                initialDoc: '/files/quote.docx',
            },
            viewer.current,
        )
        .then(async (instance) => {
            const { documentViewer } = instance.Core;
            documentViewer.addEventListener('documentLoaded', async () => {
                await documentViewer.getDocument().documentCompletePromise();
                documentViewer.updateView();

                await documentViewer.getDocument().applyTemplateValues({})
            });
        });
    }, []);

    return <>
        {/* {loading ? <Loader/> : null} */}
        <div className="profile">
            <div className="webviewer" ref={viewer} style={{height: "80vh", width: "100%"}}></div>
        </div>
    </>
}