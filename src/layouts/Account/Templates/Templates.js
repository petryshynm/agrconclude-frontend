import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentsActions } from '../../../store/actions/docs/docs.actions';


export const Templates = () => {
    const { documents } = useSelector((state) => state.docs);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getDocumentsActions.request());
    }, [dispatch]);

    const openDocument = (documentId) => {
        window.open(
          `https://docs.google.com/document/d/${documentId}/edit`,
          "_blank"
        );
      };


    return <div className='account__panel'>
        {documents.length 
            ? <>
                <div>My templates:</div>
                <ul>
                    {documents.map(({ name, id }) => (
                        <li key={id} onClick={() => openDocument(id)}>
                            {name}
                        </li>
                    ))}
                </ul>
            </>
            : <div>NOT FOUND</div>
        }
    </div>
}