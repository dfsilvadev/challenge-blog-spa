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
        <Form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-base">
              Título
            </label>
            <Field
              id="title"
              name="title"
              placeholder="Seu título aqui..."
              className="w-full h-[44px] rounded-lg bg-gray-200 border border-gray-300 px-4 text-black"
            />
            <ErrorMessage
              name="title"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-base">
              Categoria
            </label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={e => setFieldValue('category', e.target.value)}
              className="w-full h-[44px] rounded-lg bg-white border border-gray-300 px-4 text-black"
            >
              <option value="" disabled>
                {loadingCategories
                  ? 'Carregando categorias...'
                  : 'Selecione uma categoria'}
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
              className="text-red-600 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block text-base">
              Conteúdo
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="Seu conteúdo aqui..."
              className="w-full h-[260px] rounded-lg bg-gray-200 border border-gray-300 p-4 text-black"
            />
            <ErrorMessage
              name="content"
              component="p"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="flex justify-center md:justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-black text-white rounded-full px-8 py-2 hover:bg-gray-700 disabled:opacity-50"
            >
              {submitLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
