import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Loading from '../components/loading';
import { useToast } from '../../hooks/useToast';

import { sendLogin } from '../../resources/authResources';
import type { LoginRequest } from '../components/ui/auth';
import { useAuth } from '../../hooks/useAuth';

import { useNavigate } from 'react-router';
import { Routes } from '../router/constants/routesMap';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('O email de usuário é obrigatório')
      .email('Digite um email válido'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const response = await sendLogin(values);
      login(response.data);
      showToast({ type: 'success', message: 'Login realizado com sucesso!' });
      return navigate(Routes.POSTS);
    } catch {
      showToast({ type: 'error', message: 'Acesso negado!' });
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
                  Informe seu email de usuário
                </label>
                <Field
                  type="email"
                  name="username"
                  placeholder="seu email de usuário"
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
