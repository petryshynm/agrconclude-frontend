import classNames from "classnames";
import { Formik } from "formik";
import './Form.scss'

export const Form = ({initialValues, validationSchema, children, onSubmit, isFormModal, submitValue, className }) => {
  return <Formik
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {({dirty, isValid, errors, handleSubmit}) => (
        <form 
            className={classNames(`form ${className}` , { 'form_modal': isFormModal})}
            onSubmit={handleSubmit}
        >
            {children}
            {console.log(errors)}
            <button
                className="form__submit"
                disabled={!dirty || !isValid}
                type="submit"
            >
                {submitValue}
            </button>
        </form>
    )}
  </Formik>
};
