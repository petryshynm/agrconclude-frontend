import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentsActions } from '../../../store/actions/docs/docs.actions';
import { getUsersActions } from '../../../store/actions/user/user.actions';

import '../Form.scss';

export const CreateAgreementForm = () => {
    const { documents } = useSelector((state) => state.docs);
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    console.log(documents);
    console.log(users);

    useEffect(() => {
      dispatch(getDocumentsActions.request());
      dispatch(getUsersActions.request());
    }, [dispatch]);
  
    const onSubmit = (e) => {
      e.preventDefault();
      console.log(e.target);
      const documentId = e.target.documents.value;
      const userId = e.target.users.value;
      const date = e.target.date.value;
      console.log({userId, documentId, date});
      // const receiver = e.target.input.value
    };

    return <form className="form" onSubmit={onSubmit}>
        <label htmlFor='documents'>
            <div>Agreement Template:</div>
            <select id="documents" className="form__input" name="documents">
                {documents.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
            </select>
        </label>
        <label htmlFor="users">
            <div>Receiver:</div>
            <select id="users" className="form__input" name="users">
                {users.map(({ email, id, avatarUrl }) => <option key={id} value={id}>{email}</option>)}
            </select>
        </label>
        <label htmlFor="date">
            <div>Date:</div>
            <input type="date" className="form__input" name="date" id="date"/>
        </label>
        <button className="form__submit" disabled={!documents.length || !users.length} type="submit">Create agreement</button>
    </form>
}