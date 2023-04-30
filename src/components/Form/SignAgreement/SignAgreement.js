import { useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { Form } from "../Form";

import { getDocumentFieldsActions } from "../../../store/actions/docs/docs.actions";
import { formatString } from "../../../services/utils";

import "../Form/Form.scss";

export const SignAgreementForm = ({ agreement }) => {
  const dispatch = useDispatch();
  const { signFields } = useSelector((state) => state.docs);

  console.log(signFields);

  useEffect(() => {
    dispatch(getDocumentFieldsActions.request(agreement.documentId));
  }, [dispatch, agreement]);

  const onSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    console.log(values);
  };

  const initialValues = signFields.reduce(
    (prev, field) => ({ ...prev, [field]: "" }),
    {}
  );

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
    // } else if (field.includes("sign")) {
    //   return <div>sign. field name: {field}</div>;
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
  console.log(initialValues)
  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      submitValue="Sign"
    >
      {signFields.map((field) => (
        <label key={field} htmlFor={field} className="form__label">
          {generateSignField(field)}
          <ErrorMessage className="form__error" name={field} />
        </label>
      ))}
    </Form>
  );
};
