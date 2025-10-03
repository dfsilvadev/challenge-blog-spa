import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loading from '../components/loading';

const SignIn = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log('Email:', values.email);
            console.log('Senha:', values.password);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Informe seu endereço de e-mail
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-200 outline-none text-black"
                />
                <ErrorMessage
                  name="email"
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
                disabled={isSubmitting}
                className="w-full py-2 mt-4 font-semibold text-white bg-black rounded-lg hover:bg-gray-500 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>
                    Entrando... <Loading />
                  </span>
                ) : (
                  <p>Entrar</p>
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
