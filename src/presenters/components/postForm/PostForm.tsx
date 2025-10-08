import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import type { Category } from '../ui/subjects';

export type PostFormValues = {
  title: string;
  category: string;
  content: string;
};

const validationSchema = Yup.object({
  title: Yup.string().required('Título é obrigatório'),
  category: Yup.string().required('Categoria é obrigatória'),
  content: Yup.string()
    .min(10, 'O conteúdo deve ter ao menos 10 caracteres')
    .required('Conteúdo é obrigatório'),
});

type PostFormProps = {
  initialValues: PostFormValues;
  categories: Category[];
  loadingCategories?: boolean;
  submitLabel?: string;
  onSubmit: (values: PostFormValues) => Promise<void> | void;
};

export function PostForm({
  initialValues,
  categories,
  loadingCategories = false,
  submitLabel = 'Salvar',
  onSubmit,
}: PostFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (v, { setSubmitting }) => {
        await onSubmit(v);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className="space-y-8">
          {/* Título */}
          <div className="space-y-3">
            <label
              htmlFor="title"
              className="block text-base font-semibold text-gray-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,96a8,8,0,0,1,8-8H176a8,8,0,0,1,0,16H80A8,8,0,0,1,72,96Zm112,64H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Zm0-32H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z"></path>
              </svg>
              Título do Post
            </label>
            <Field
              id="title"
              name="title"
              placeholder="Digite um título chamativo para seu post..."
              className="w-full px-4 py-3 text-gray-900 text-base border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
            <ErrorMessage
              name="title"
              component="p"
              className="text-red-600 text-sm flex items-center gap-1 mt-1"
            />
          </div>

          {/* Categoria */}
          <div className="space-y-3">
            <label
              htmlFor="category"
              className="block text-base font-semibold text-gray-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128ZM184,208a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,184,208Zm32-32a12,12,0,0,0-12,12v48a12,12,0,0,0,24,0V188A12,12,0,0,0,216,176ZM152,176a12,12,0,0,0-12,12v48a12,12,0,0,0,24,0V188A12,12,0,0,0,152,176Z"></path>
              </svg>
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={e => setFieldValue('category', e.target.value)}
              className="w-full px-4 py-3 text-gray-900 text-base border-2 border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="" disabled>
                {loadingCategories
                  ? '⏳ Carregando categorias...'
                  : '📁 Selecione uma categoria'}
              </option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ErrorMessage
              name="category"
              component="p"
              className="text-red-600 text-sm flex items-center gap-1 mt-1"
            />
          </div>

          {/* Conteúdo */}
          <div className="space-y-3">
            <label
              htmlFor="content"
              className="block text-base font-semibold text-gray-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,48H32a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H224a8,8,0,0,0,8-8V56A8,8,0,0,0,224,48ZM40,88H216v80H40Z"></path>
              </svg>
              Conteúdo
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="Escreva o conteúdo do seu post aqui... Mínimo 10 caracteres."
              rows="12"
              className="w-full px-4 py-3 text-gray-900 text-base border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none placeholder:text-gray-400 leading-relaxed"
            />
            <div className="flex items-center justify-between">
              <ErrorMessage
                name="content"
                component="p"
                className="text-red-600 text-sm flex items-center gap-1"
              />
              <p className="text-gray-500 text-sm">
                {values.content.length} caracteres
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-end pt-2">
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
                  Salvando...
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
                    <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H48V120l80-80,80,80Z"></path>
                  </svg>
                  {submitLabel}
                </>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
