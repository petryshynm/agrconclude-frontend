import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocumentsRequest } from '../../../store/actions/docs/docs.actions';
import { getUsersRequest } from '../../../store/actions/user/user.actions';

import '../Form.scss';

export const CreateAgreementForm = () => {
    const { documents } = useSelector((state) => state.docs);
    const { users } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getDocumentsRequest());
      dispatch(getUsersRequest());
    }, [dispatch]);
  
    const onSubmit = (e) => {
      e.preventDefault();
      console.log(e.target);
      const documents = e.target.documents.value;
      const users = e.target.users.value;
      console.log(documents);
      console.log(users);
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
        <button className="form__submit" disabled={!documents.length || !users.length} type="submit">Create agreement</button>
    </form>
}