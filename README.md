# Challenge Blog SPA

Um projeto React.js moderno com Vite, TypeScript, ESLint, Prettier, Husky, lint-staged e Tailwind CSS.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool rápida e moderna
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formatador de código
- **Husky** - Git hooks
- **lint-staged** - Executa linters em arquivos staged

## 🎨 Tema Personalizado

O projeto inclui um tema personalizado com as seguintes cores:

- **Background**: `#F7F7F7`
- **White**: `#FFF`
- **Black**: `#040404`
- **Heading**: `#464646`
- **Text**: `#9B9B9B`

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com a URL da sua API

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## ⚙️ Variáveis de Ambiente

O projeto requer as seguintes variáveis de ambiente configuradas no arquivo `.env`:

| Variável           | Descrição                    | Exemplo                 |
| ------------------ | ---------------------------- | ----------------------- |
| `VITE_API_URL`     | URL base da API backend      | `http://localhost:3000` |
| `VITE_API_TIMEOUT` | Timeout das requisições (ms) | `10000`                 |

**Importante:** Após criar ou modificar o arquivo `.env`, você **deve reiniciar o servidor de desenvolvimento** para que o Vite carregue as novas variáveis.

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite com suas configurações
nano .env

# Reinicie o servidor
# Pressione Ctrl+C e execute novamente:
npm run dev
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o ESLint
- `npm run lint:fix` - Executa o ESLint com correção automática
- `npm run format` - Formata o código com Prettier
- `npm run format:check` - Verifica se o código está formatado

## 🔧 Configurações

### ESLint

Configurado com regras para React, TypeScript e acessibilidade.

### Prettier

Configurado com regras de formatação consistentes.

### Husky + lint-staged

Executa automaticamente lint e formatação nos arquivos staged antes do commit.

### Tailwind CSS

Configurado com tema personalizado e cores customizadas.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── app.tsx          # Componente principal da aplicação
├── hooks/               # Custom hooks personalizados
├── main.tsx             # Ponto de entrada da aplicação
├── presenters/          # Camada de apresentação
│   ├── assets/          # Recursos estáticos (imagens, ícones, etc.)
│   ├── components/      # Componentes reutilizáveis
│   │   └── ui/          # Componentes de interface do usuário
│   ├── containers/      # Containers/componentes de página
│   ├── pages/           # Páginas da aplicação
│   └── router/          # Configuração de rotas
├── styles/
│   └── global-styles.css # Estilos globais com Tailwind CSS
├── utils/               # Funções utilitárias
└── vite-env.d.ts        # Tipos do Vite
```

## 🎯 Próximos Passos

1. Desenvolver componentes reutilizáveis
2. Implementar roteamento (React Router)
3. Adicionar gerenciamento de estado (Zustand/Redux)
4. Configurar testes (Vitest/Jest)
5. Implementar CI/CD
