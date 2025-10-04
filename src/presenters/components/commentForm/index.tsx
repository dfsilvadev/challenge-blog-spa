import React from 'react';
import '../../../styles/global-styles.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import type { Comment } from '../commentCard';

//Atributos do Comment
interface CommentPostProps {
  id: string;
}

//Validation schema com Yup
const validationSchema = Yup.object({
  studentName: Yup.string().required('Por favor, informe seu nome'),
  content: Yup.string()
    .max(50, 'Seu comentário deve ter no máximo 50 caracteres')
    .required('Por favor, informe seu comentário'),
});

const CommentForm: React.FC<CommentPostProps> = ({ id }) => {
  const handleSubmit = async (
    values: Comment,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      console.log(values);
      const response = await axios.post(
        `localhost:3000/post/${id}/comentarios`,
        values
      );
      alert(response.data);
      resetForm();
    } catch (e) {
      console.error('Erro ao enviar comentário: ', e);
      alert('Erro ao enviar o comentário. Por favor, revise os dados');
    }
  };

  return (
    <div className="ml-2 mr-2 sm:ml-10 sm:mr-10 md:ml-10 md:mr-10 lg:ml-10 lg:mr-10 xl:ml-10 xl:mr-10">
      <div>
        <p className="mt-5 mb-2 text-5xl font-bold tracking-tight text-black">
          Comentários
        </p>
      </div>
      <div>
        <Formik
          initialValues={{ postId: id, studentName: '', content: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-5">
              <div className="mb-12">
                <label
                  htmlFor="studentName"
                  className="mb-3 font-normal text-2xl text-black"
                >
                  Informe seu nome
                </label>
                <Field
                  id="studentName"
                  name="studentName"
                  placeholder="Insira aqui seu nome..."
                  className="block w-full p-2 text-black border border-gray-300 rounded-lg bg-gray-50 text-2xl focus:ring-blue-500 focus:border-blue-500"
                ></Field>
                <ErrorMessage
                  name="studentName"
                  component="p"
                  className="mt-2 text-xl text-red-600"
                ></ErrorMessage>
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="mb-3 font-normal text-2xl text-black"
                >
                  Insira seu comentário
                </label>
                <Field
                  id="content"
                  name="content"
                  as="textarea"
                  placeholder="Insira aqui seu comentário..."
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-2xl focus:ring-blue-500 focus:border-blue-500"
                ></Field>
                <ErrorMessage
                  name="content"
                  component="p"
                  className="mt-2 text-xl text-red-600"
                ></ErrorMessage>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-10 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 position-right"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar comentário'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CommentForm;
