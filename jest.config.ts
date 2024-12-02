import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Configurações de cobertura
  collectCoverage: true,
  // collectCoverageFrom: [
  //   // Incluir apenas arquivos relevantes, como componentes e páginas
  //   "app/**/*.{js,jsx,ts,tsx}",

  //   // Excluir arquivos de definição de tipos e arquivos de configuração
  //   "!app/api/**/*.{js,jsx,ts,tsx}",
  //   "!components/**/*.{js,jsx,ts,tsx}",
  //   "!hooks/**/*.{js,jsx,ts,tsx}",
  //   "!lib/**/*.{js,jsx,ts,tsx}",
  //   "!services/**/*.{js,jsx,ts,tsx}",
  //   "!validations/**/*.{js,jsx,ts,tsx}",
  //   "!**/*.d.ts", // Excluir arquivos de tipo TypeScript
  //   "!**/node_modules/**", // Excluir o diretório node_modules
  //   "!**/.next/**", // Excluir o diretório .next gerado pelo Next.js
  //   "!**/jest.config.ts", // Excluir o arquivo de configuração do Jest
  //   "!**/next.config.js", // Excluir o arquivo de configuração do Next.js
  //   "!**/tailwind.config.js", // Excluir o arquivo de configuração do Tailwind
  //   "!**/postcss.config.js", // Excluir o arquivo de configuração do PostCSS
  //   "!**/pages/_app.tsx", // Excluir o arquivo de configuração do Next.js
  //   "!**/pages/_document.tsx", // Excluir o arquivo de configuração do Next.js
  // ],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}", // Ajuste para a pasta onde o código está
    "!app/**/*.d.ts", // Exclui arquivos de definição de tipos
    "!app/pages/_app.tsx", // Exclui arquivos específicos
    "!app/pages/_document.tsx",
    "!app/api/**/*.{js,jsx,ts,tsx}", // Exclui arquivos de API
  ],

  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // coveragePathIgnorePatterns: [
  //   "/node_modules/",
  //   "/\\.next/",
  //   "/jest.config.ts",
  //   "/next.config.js",
  //   "/tailwind.config.js",
  //   "/postcss.config.js",
  //   "/pages/_app.tsx",
  //   "/pages/_document.tsx",
  // ],
  coveragePathIgnorePatterns: [
    "/node_modules/", // Ignora arquivos dentro do diretório node_modules
    "/\\.next/", // Ignora arquivos da pasta .next (onde o Next.js gera arquivos compilados)
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
