import {
  CustomCodeEditor,
  CustomOpenInCSB,
  CustomRefreshButton,
  ListenerIframeMessage,
  ResetButtonComp,
  ResetCurrentFileButton,
} from './widgets/Common';
import { JustIframeStory } from './widgets/JustIframeStory';
import { MultiplePreviewsAndListenersStory } from './widgets/MultiplePreviewsAndListenersStory';
import { MultiplePreviewsStory } from './widgets/MultiplePreviewsStory';
import {
  OpenInCodeSandboxButton,
  RefreshButton,
  Sandpack,
  SandpackCodeEditor,
  SandpackCodeViewer,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  SandpackStack,
  SandpackThemeProvider,
  SandpackTranspiledCode,
  stackClassName,
} from 'codesandbox-sandpack-vue3';

export default {
  title: 'presets/Sandpack: custom',
};

/** UsingSandpackLayout */
export const UsingSandpackLayout = () => (
  <SandpackProvider>
    <SandpackLayout>
      <SandpackStack>
        <SandpackTranspiledCode />
      </SandpackStack>
      <SandpackCodeEditor />
      <SandpackCodeViewer />
    </SandpackLayout>
  </SandpackProvider>
);

/** UsingVisualElements */
export const UsingVisualElements = () => (
  <SandpackProvider options={{ activeFile: '/App.js' }} template="react">
    <SandpackThemeProvider>
      <SandpackCodeEditor
        style={{
          width: '500px',
          height: '300px',
        }}
      />

      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        style={{
          border: '1px solid red',
          marginBottom: '4px',
          marginTop: '4px',
          width: '500px',
          height: '300px',
        }}
      />

      <div
        style={{
          display: 'flex',
          width: '500px',
          justifyContent: 'space-between',
        }}
      >
        <OpenInCodeSandboxButton />
        <RefreshButton />
      </div>
    </SandpackThemeProvider>
  </SandpackProvider>
);

/** UsingHooks */
export const UsingHooks = () => (
  <SandpackProvider>
    <SandpackThemeProvider>
      <CustomCodeEditor />

      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        style={{ border: '1px solid red', width: '400px', height: '300px' }}
      />

      <div
        style={{
          display: 'flex',
          width: '400px',
          margin: '8px 0',
          justifyContent: 'space-between',
        }}
      >
        <CustomRefreshButton />
        <CustomOpenInCSB />
      </div>

      <div style={{ width: '400px' }}>
        <SandpackTranspiledCode />
      </div>
    </SandpackThemeProvider>
  </SandpackProvider>
);

/** JustIframe */
const JustIframeTemplate = () => ({
  components: { JustIframeStory },
  setup() {
    return {};
  },
  template: '<JustIframeStory />',
});
export const JustIframe = JustIframeTemplate.bind({});

/** MultiplePreviews */
const MultiplePreviewsTemplate = () => ({
  components: { MultiplePreviewsStory },
  setup() {
    return {};
  },
  template: '<MultiplePreviewsStory />',
});
export const MultiplePreviews = MultiplePreviewsTemplate.bind({});

/** MultiplePreviewsAndListeners */
const MultiplePreviewsAndListenersTemplate = () => ({
  components: { MultiplePreviewsAndListenersStory },
  setup() {
    return {};
  },
  template: '<MultiplePreviewsAndListenersStory />',
});
export const MultiplePreviewsAndListeners = MultiplePreviewsAndListenersTemplate.bind({});

/** ClosableTabs */
export const ClosableTabs = () => (
  <Sandpack
    options={{ closableTabs: true, visibleFiles: ['/App.js', '/index.js'] }}
    template="react"
  />
);

/** ResetButton */
export const ResetButton = () => (
  <>
    <SandpackProvider files={{ '/test.js': '// test' }} template="react">
      <SandpackLayout>
        <div
          class={stackClassName.toString()}
          style={{ position: 'relative', width: '100%' }}
        >
          <SandpackCodeEditor closableTabs />
          <ResetButtonComp />
        </div>
        <SandpackStack>
          <SandpackPreview />
        </SandpackStack>
      </SandpackLayout>
    </SandpackProvider>

    <SandpackProvider template="react">
      <SandpackLayout>
        <div
          class={stackClassName.toString()}
          style={{ position: 'relative', width: '100%' }}
        >
          <SandpackCodeEditor />
          <ResetCurrentFileButton />
        </div>
        <SandpackStack>
          <SandpackPreview />
        </SandpackStack>
      </SandpackLayout>
    </SandpackProvider>
  </>
);

/** IframeMessage */
export const IframeMessage = () => (
  <SandpackProvider
    files={{
      '/App.js': `import {useState, useEffect} from "react";

export default function App() {
const [message, setMessage] = useState("")

useEffect(() => {
  window.addEventListener("message", (event) => {
    setMessage(event.data);
  });
}, [])

return <h1>{message}</h1>
}
`,
    }}
    template="react"
  >
    <ListenerIframeMessage />
    <SandpackLayout>
      <SandpackCodeEditor />
      <SandpackPreview />
    </SandpackLayout>
  </SandpackProvider>
);

export const CustomNpmRegistries = () => (
  <Sandpack
    customSetup={{
      dependencies: { '@codesandbox/test-package': '1.0.5' },
      npmRegistries: [
        {
          enabledScopes: ['@codesandbox'],
          limitToScopes: true,
          registryUrl: 'https://xywctu-4000.preview.csb.app',
        },
      ],
    }}
    files={{
      '/App.js': `import { Button } from "@codesandbox/test-package"
export default function App() {
  return (
    <div>
      <Button>I'm a private Package</Button>
    </div>
  )
}
`,
    }}
    template="react"
  />
);
