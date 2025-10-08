import React from 'react';
import '../../../styles/global-styles.css';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { create } from '../../../resources/commentResources';
import type { CreateComment } from '../ui/comments';

interface CommentPostProps {
  id: string;
}

const validationSchema = Yup.object({
  author: Yup.string().required('Por favor, informe seu nome'),
  content: Yup.string()
    .max(500, 'Seu comentário deve ter no máximo 500 caracteres')
    .required('Por favor, informe seu comentário'),
});

const CommentForm: React.FC<CommentPostProps> = ({ id }) => {
  const { isLoggedIn, user } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (
    values: CreateComment,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await create(id, values);
      showToast({ type: 'success', message: 'Comentário criado com sucesso!' });
      resetForm();
      window.location.reload();
    } catch {
      showToast({
        type: 'error',
        message: 'Erro ao enviar o comentário. Por favor, revise os dados.',
      });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="text-white"
              viewBox="0 0 256 256"
            >
              <path d="M224,48H32a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H224a8,8,0,0,0,8-8V56A8,8,0,0,0,224,48ZM40,88.81l88,58.66,88-58.66V64H40ZM216,184H40V115.33l83.72,55.81a8,8,0,0,0,8.56,0L216,115.33V184Z"></path>
            </svg>
          </span>
          Deixe seu comentário
        </h2>
        <p className="text-gray-600 text-base ml-13">
          Compartilhe suas opiniões e contribua com a discussão
        </p>
      </div>

      <Formik
        initialValues={{ author: user?.name || '', content: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="author"
                className="block text-base font-semibold text-gray-700 mb-2"
              >
                Seu nome{' '}
                {isLoggedIn && (
                  <span className="text-gray-400 text-sm font-normal">
                    (usuário logado)
                  </span>
                )}
              </label>
              <Field
                id="author"
                name="author"
                placeholder="Digite seu nome..."
                className="block w-full px-4 py-3 text-gray-900 text-base border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                readOnly={isLoggedIn}
                disabled={isLoggedIn}
              />
              <ErrorMessage
                name="author"
                component="p"
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-base font-semibold text-gray-700 mb-2"
              >
                Seu comentário
              </label>
              <Field
                id="content"
                name="content"
                as="textarea"
                rows="4"
                placeholder="Escreva seu comentário aqui... (máximo 500 caracteres)"
                className="block w-full px-4 py-3 text-gray-900 text-base border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
              <ErrorMessage
                name="content"
                component="p"
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M223.87,114l-168-95.89A16,16,0,0,0,32.93,37.32l31,90.47a.42.42,0,0,0,0,.1l-31,90.53A16,16,0,0,0,48,240a16.14,16.14,0,0,0,7.92-2.1l167.91-96.05a16,16,0,0,0,.05-27.89ZM48,224h0l0-.09L79,133.44l48.54,26.43a8,8,0,0,0,7.92-13.78L79,119.58,48.06,32.12,48,32h0L216,128Z"></path>
                    </svg>
                    Enviar comentário
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CommentForm;
