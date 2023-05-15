import { useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Select } from "../../Select";
import { Form } from "../Form";

import { getDocumentsActions } from "../../../store/actions/docs/docs.actions";
import { createAgreementActions, getUsersActions } from "../../../store/actions/user/user.actions";

import "../Form/Form.scss";

export const CreateAgreementForm = () => {
  const { documents } = useSelector((state) => state.docs);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocumentsActions.request());
    dispatch(getUsersActions.request());
  }, [dispatch]);

  const onSubmit = (agreementInfo) => {
    dispatch(createAgreementActions.request(agreementInfo))
  };

  const initialValues = {
    documentId: "",
    client: {},
    label: "",
    expireAt: "",
    description: "",
  };

  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const tomorrowString = tomorrowDate.toISOString().split('T')[0];

  const validationSchema = Yup.object({
    documentId: Yup.string().required("Required."),
    client: Yup.object().required("Required."),
    description: Yup.string().required("Required"),
    label: Yup.string().required("Required"),
    expireAt: Yup.date()
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
        <Field id="users" className="form__input" name="client">
          {({ field, meta }) => (
            <>
              <Select {...field} shouldSendObject options={users} />
              {meta.touched && meta.error && (
                <div className="form__error">{meta.error}</div>
              )}
            </>
          )}
        </Field>
      </label>
      <label htmlFor="label" className="form__label">
        <div>Title:</div>
        <Field
          type="text"
          className="form__input"
          id="label"
          name="label"
          placeholder="Title"
        />
        <ErrorMessage className="form__error" name="expireAt" />
      </label>
      <label htmlFor="description" className="form__label">
        <div>Description:</div>
        <Field
          type="text"
          className="form__input"
          id="description"
          name="description"
          placeholder="Description"
        />
        <ErrorMessage className="form__error" name="expireAt" />
      </label>
      <label htmlFor="expireAt" className="form__label">
        <div>Expire Date:</div>
        <Field
          type="date"
          className="form__input"
          id="expireAt"
          name="expireAt"
          placeholder="Date"
          min={tomorrowString}
        />
        <ErrorMessage className="form__error" name="expireAt" />
      </label>
    </Form>
  );
};
