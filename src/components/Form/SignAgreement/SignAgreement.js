import { useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Form } from "../Form";
import { Select } from "../../Select";

import { getDocumentFieldsActions, getSignatureActions, signDocumentFieldsActions } from "../../../store/actions/docs/docs.actions";
import { formatString } from "../../../services/utils";

import './SignAgreement.scss';

export const SignAgreementForm = ({ agreement, onClose }) => {
  const dispatch = useDispatch();
  const { signFields, signature, signatureURL } = useSelector((state) => state.docs);
  const { documentId, creator, id: contractId, label } = agreement

  useEffect(() => {
    dispatch(getDocumentFieldsActions.request(documentId));
    (!signature || !signatureURL) && dispatch(getSignatureActions.request())
  }, [dispatch, agreement, documentId, signature, signatureURL]);

  const onSubmit = (fields) => {
    const signInfo = { 
      senderEmail: creator.email, 
      documentId, 
      signatureURL, 
      fields,
      contractId,
      label
    }
    dispatch(signDocumentFieldsActions.request(signInfo));
  }

  const initialValues = signFields.reduce((prev, field) => ({ ...prev, [field]: "" }), {});

  const validationSchema = Yup.object(
    signFields.reduce(
      (prev, field) => ({
        ...prev,
        [field]: Yup.string().required("Required."),
      }),
      {}
    )
  );

  const generateSignField = (field) => {
    if (field.includes("date")) {
      return (
        <Field
          type="date"
          className="form__input"
          id={field}
          name={field}
          placeholder={formatString(field)}
        />
      );
    } else if (field.includes("sign")) {
      return <Field id={field} className="form__input" name={field}>
        {({ field, meta }) => (
          <>
            <Select {...field} options={[{ label: 'Your sign', image: signature, value: signature}]} />
            {meta.touched && meta.error && (
              <div className="form__error">{meta.error}</div>
            )}
          </>
        )}
      </Field>
    } else {
      return (
        <Field
          className="form__input"
          id={field}
          name={field}
          placeholder={formatString(field)}
        />
      );
    }
  };
  return (
    <>
      <button className="sign-agreement-btn" onClick={onClose}>{'←'}</button>
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        submitValue="Sign"
        className="sign-agreement-form"
      >
        {signFields.map((field) => (
          <label key={field} htmlFor={field} className="form__label">
            <div>{formatString(field)}:</div>
            {generateSignField(field)}
            <ErrorMessage className="form__error" name={field} />
          </label>
        ))}
      </Form>
    </>
  );
};
