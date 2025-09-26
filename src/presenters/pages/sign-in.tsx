import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 h-100 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Informe seu endereço de e-mail
            </label>
            <input
              type="email"
              id="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#D9D9D9] outline-none text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#D9D9D9] outline-none text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-black rounded-lg hover:bg-gray-500 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
