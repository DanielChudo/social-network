/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { login } from '../../redux/authReducer';
import { ErrorMessage } from '../../components';
import './AuthPage.css';

const initialValues = {
  login: '',
  password: '',
  rememberMe: false,
  isCaptchaExist: false,
  captcha: '',
};

const validationSchema = Yup.object({
  login: Yup.string()
    .trim()
    .email('Не подходит под шаблон почты')
    .required('Введите почту'),
  password: Yup.string()
    .trim()
    .min(6, 'Слишком короткий пароль')
    .required('Введите пароль'),
  rememberMe: Yup.boolean(),
  captcha: Yup.string()
    .trim()
    .when('isCaptchaExist', {
      is: true,
      then: Yup.string().required('Введите каптчу'),
    }),
});

function AuthPage() {
  useEffect(() => {
    document.title = 'Авторизация';
  }, []);

  const dispatch = useDispatch();
  const handleSubmit = (values, { setStatus }) => {
    const { login: loginValue, password, rememberMe, captcha } = values;
    dispatch(login(loginValue, password, rememberMe, captcha, setStatus));
  };
  // const errorAnimation = useState(false);
  const captchaURL = useSelector((state) => state.auth.captchaURL);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, touched, errors, status }) => {
        values.isCaptchaExist = !!captchaURL;
        console.log('ff');
        return (
          <div id="login">
            {status && (
              <div id="login__form_server-error" className="wrapper">
                {status.serverError}
              </div>
            )}
            <Form id="login__form" className="wrapper">
              <ErrorMessage error={touched.login && errors.login} />
              <Field
                name="login"
                type="text"
                placeholder="Почта"
                className={
                  touched.login && errors.login && 'error_input error_animation'
                }
              />

              <ErrorMessage error={touched.password && errors.password} />
              <Field
                name="password"
                type="password"
                placeholder="Пароль"
                className={
                  touched.password &&
                  errors.password &&
                  'error_input error_animation'
                }
              />

              {captchaURL && (
                <>
                  <ErrorMessage error={touched.captcha && errors.captcha} />
                  <Field
                    name="captcha"
                    type="text"
                    placeholder="Каптча"
                    className={
                      touched.captcha &&
                      errors.captcha &&
                      'error_input error_animation'
                    }
                  />
                  <img src={captchaURL} alt="captcha" />
                </>
              )}

              <div>
                <button type="submit">Войти</button>
                <Field
                  id="login__form_rememberMe"
                  className="custom-checkbox"
                  name="rememberMe"
                  type="checkbox"
                />
                <label htmlFor="login__form_rememberMe">Запомнить меня</label>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default AuthPage;
