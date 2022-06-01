import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
  SandpackStack,
  SandpackTranspiledCode,
} from 'codesandbox-sandpack-vue3';

export default {
  title: 'components/Transpiled Code View',
};

export const Component = () => (
  <SandpackProvider
    customSetup={{
      entry: '/index.js',
      dependencies: { '@babel/runtime': 'latest' },
    }}
    files={{
      '/index.js': {
        code: `const text = 'Hello World!'
const str = \`<div>\${text}</div>\`
`,
      },
    }}
  >
    <SandpackLayout>
      <SandpackCodeEditor />
      <SandpackStack>
        <SandpackTranspiledCode />
      </SandpackStack>
    </SandpackLayout>
  </SandpackProvider>
);
