/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { Redirect } from 'react-router';
import LoginErrorMessage from './LoginErrorMessage';
import { login } from '../../redux/authReducer';

const initialValues = {
  login: '',
  password: '',
  rememberMe: false,
  isCaptcha: false,
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
    .when('isCaptcha', {
      is: true,
      then: Yup.string().required('Введите каптчу'),
    }),
});

function LoginForm(props) {
  const { onSubmit } = props;
  const captchaURL = useSelector((state) => state.auth.captchaURL);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, touched, errors, status }) => {
        values.isCaptcha = !!captchaURL;
        return (
          <div id="login">
            {status && (
              <div id="login__form_server-error" className="wrapper">
                {status.serverError}
              </div>
            )}
            <Form id="login__form" className="wrapper">
              <LoginErrorMessage error={touched.login && errors.login} />
              <Field
                name="login"
                type="text"
                placeholder="Почта"
                className={
                  touched.login && errors.login && 'error_input error_animation'
                }
              />

              <LoginErrorMessage error={touched.password && errors.password} />
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
                  <LoginErrorMessage
                    error={touched.captcha && errors.captcha}
                  />
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

function Login() {
  const dispatch = useDispatch();

  const onSubmit = (values, { setStatus, setFieldValue }) => {
    const { login: loginValue, password, rememberMe, captcha } = values;
    dispatch(login(loginValue, password, rememberMe, captcha, setStatus));
    setFieldValue('captcha', '');
  };

  const { isAuth, id } = useSelector((state) => state.auth);
  if (isAuth) {
    return <Redirect to={`/profile/${id}`} />;
  }

  document.title = 'Вход';
  return <LoginForm onSubmit={onSubmit} />;
}

export default Login;
