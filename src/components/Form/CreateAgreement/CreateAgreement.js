import { useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Select } from "../../Select";
import { Form } from "../Form";

import { getDocumentsActions } from "../../../store/actions/docs/docs.actions";
import { getUsersActions } from "../../../store/actions/user/user.actions";

import "../Form/Form.scss";

export const CreateAgreementForm = () => {
  const { documents } = useSelector((state) => state.docs);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocumentsActions.request());
    dispatch(getUsersActions.request());
  }, [dispatch]);

  const onSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    console.log(values);
  };

  const initialValues = {
    documentId: "",
    userId: "",
    date: "",
  };

  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const tomorrowString = tomorrowDate.toISOString().split('T')[0];

  const validationSchema = Yup.object({
    documentId: Yup.string().required("Required."),
    userId: Yup.string().required("Required."),
    date: Yup.date()
    .min(
      tomorrowDate,
      'The date cannot be earlier than tomorrow.'
    ).required("Required."),
  });

  return (
    <Form
      isFormModal
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      submitValue="Create"
    >
      <label htmlFor="documents" className="form__label">
        <div>Agreement Template:</div>
        <Field className="form__input" id="documents" name="documentId">
          {({ field, meta }) => (
            <>
              <Select {...field} options={documents} />
              {meta.touched && meta.error && (
                <div className="form__error">{meta.error}</div>
              )}
            </>
          )}
        </Field>
      </label>
      <label htmlFor="users" className="form__label">
        <div>Receiver:</div>
        <Field id="users" className="form__input" name="userId">
          {({ field, meta }) => (
            <>
              <Select {...field} options={users} />
              {meta.touched && meta.error && (
                <div className="form__error">{meta.error}</div>
              )}
            </>
          )}
        </Field>
      </label>
      <label htmlFor="date" className="form__label">
        <div>Date:</div>
        <Field
          type="date"
          className="form__input"
          id="date"
          name="date"
          placeholder="Date"
          min={tomorrowString}
        />
        <ErrorMessage className="form__error" name="date" />
      </label>
    </Form>
  );
};
