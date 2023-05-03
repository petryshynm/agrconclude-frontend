import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentsActions } from '../../../store/actions/docs/docs.actions';

import './Templates.scss';
import { Tooltip } from '@mui/material';

export const Templates = () => {
    const { documents } = useSelector((state) => state.docs);
    const dispatch = useDispatch();
  
    const arr = [...documents, ...documents, ...documents, ...documents, ...documents, ...documents, ...documents]

    useEffect(() => {
      dispatch(getDocumentsActions.request());
    }, [dispatch]);

    const openDocument = (documentId) => {
        window.open(
          `https://docs.google.com/document/d/${documentId}/edit`,
          "_blank"
        );
      };


      return <div className='account__panel templates'>
        <div className='templates__title'>My templates:</div>
        {documents.length 
            ? (
                <div className='templates__list'>
                    {arr.map(({ label, value }) => (
                        <div className="template" key={value} onClick={() => openDocument(value)}>
                            <Tooltip title={label} placement="bottom-start" arrow>
                                <div className='template__header'>
                                    <img src="../assets/icons/pdf-icon.svg" alt='pdf icon'/>
                                    {label}
                                </div>
                            </Tooltip>
                            <div className='template__content'>
                                <img src="../assets/images/pdf-template.jpg" alt='pdf template'/>
                            </div>
                        </div>
                    ))}
                </div>
            )
            : <div>There`s any template</div>
        }
    </div>
}