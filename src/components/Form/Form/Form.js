import classNames from "classnames";
import { Formik } from "formik";
import './Form.scss'

export const Form = ({initialValues, validationSchema, children, onSubmit, isFormModal, submitValue }) => {
  return <Formik
    validationSchema={validationSchema}
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {({dirty, isValid, handleSubmit}) => (
        <form 
            className={classNames('form', { 'form_modal': isFormModal})}
            onSubmit={handleSubmit}
        >
            {console.log(dirty, 'dirty')}
            {console.log(isValid, 'isValid')}
            {children}
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
