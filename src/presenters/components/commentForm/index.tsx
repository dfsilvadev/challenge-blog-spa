import React from 'react';
import '../../../styles/global-styles.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { Comment } from '../commentCard';
import { useToast } from '../../../hooks/useToast';
import { create } from '../../../resources/commentResources';

//Atributos do Comment
interface CommentPostProps {
  id: string;
}

//Validation schema com Yup
const validationSchema = Yup.object({
  autor_nome: Yup.string().required('Por favor, informe seu nome'),
  conteudo: Yup.string()
    .max(500, 'Seu comentário deve ter no máximo 500 caracteres')
    .required('Por favor, informe seu comentário'),
});

const CommentForm: React.FC<CommentPostProps> = ({ id }) => {
  const { showToast } = useToast();

  const handleSubmit = async (
    values: Comment,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await create(values);
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
    <div className="">
      <div>
        <p className="mt-5 mb-2 text-5xl font-bold tracking-tight text-black">
          Comentários
        </p>
      </div>
      <div>
        <Formik
          initialValues={{ post_id: id, autor_nome: '', conteudo: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-5">
              <div className="mb-12">
                <label
                  htmlFor="autor_nome"
                  className="mb-3 font-normal text-2xl text-black"
                >
                  Informe seu nome
                </label>
                <Field
                  id="autor_nome"
                  name="autor_nome"
                  placeholder="Insira aqui seu nome..."
                  className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 text-2xl focus:ring-blue-500 focus:border-blue-500"
                ></Field>
                <ErrorMessage
                  name="autor_nome"
                  component="p"
                  className="mt-2 text-xl text-red-600"
                ></ErrorMessage>
              </div>
              <div>
                <label
                  htmlFor="conteudo"
                  className="mb-3 font-normal text-2xl text-black"
                >
                  Insira seu comentário
                </label>
                <Field
                  id="conteudo"
                  name="conteudo"
                  as="textarea"
                  placeholder="Insira aqui seu comentário..."
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-2xl focus:ring-blue-500 focus:border-blue-500"
                ></Field>
                <ErrorMessage
                  name="conteudo"
                  component="p"
                  className="mt-2 text-xl text-red-600"
                ></ErrorMessage>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="right-0 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 position-right"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar comentário'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CommentForm;
