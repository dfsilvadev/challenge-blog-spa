import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loading from '../components/loading';
import { post } from '../../services/api';
import type { LoginRequest, LoginResponse } from '../../services/authServices';
import { useState } from 'react';

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required('O nome de usuário é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await post<LoginResponse, LoginRequest>(
        '/auth/login',
        values,
        false
      );
      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.details.token);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Informe seu nome de usuário
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  placeholder="seu nome de usuário"
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-200 outline-none text-black"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-200 outline-none text-black"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full py-2 mt-4 font-semibold text-white bg-black rounded-lg hover:bg-gray-500 transition disabled:opacity-50 flex justify-center items-center"
              >
                {loading ? (
                  <>
                    Entrando... <Loading />
                  </>
                ) : (
                  <span>Entrar</span>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
