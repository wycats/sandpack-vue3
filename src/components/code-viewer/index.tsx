import {
  CodeEditor,
  Decorators,
  FileTabs,
  SandpackInitMode,
  useSandpack,
} from '../..';
import {
  computed,
  DefineComponent,
  defineComponent,
  PropType,
  ref,
} from 'vue';
import { RunButton } from '../../common/RunButton';
import { SandpackStack } from '../../common/Stack';
import { THEME_PREFIX } from '../../styles';
import { useActiveCode } from '../../hooks/useActiveCode';
import { useClasser } from 'code-hike-classer-vue3';
import { classNames } from '../../utils/classNames';
import { editorClassName } from '../code-editor/styles';

export interface CodeViewerProps {
  showTabs?: boolean;
  showLineNumbers?: boolean;
  /**
   * Provides a way to draw or style a piece of the content.
   */
  decorators?: Decorators;
  code?: string;
  wrapContent?: boolean;
  /**
   * This provides a way to control how some components are going to
   * be initialized on the page. The CodeEditor and the Preview components
   * are quite expensive and might overload the memory usage, so this gives
   * a certain control of when to initialize them.
   */
  initMode?: SandpackInitMode;
}

export const SandpackCodeViewer = defineComponent({
  name: 'SandpackCodeViewer',
  props: {
    showTabs: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    showLineNumbers: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    decorators: {
      type: Object as PropType<Decorators>,
      required: false,
      default: undefined,
    },
    code: {
      type: String,
      required: false,
      default: undefined,
    },
    initMode: {
      type: String as PropType<SandpackInitMode>,
      required: false,
      default: undefined,
    },
    wrapContent: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  // @ts-ignore
  setup(props: CodeViewerProps) {
    const { sandpack } = useSandpack();
    const { code: activeCode } = useActiveCode();
    const c = useClasser(THEME_PREFIX);

    const sandpackCodeViewerRef = ref();
    const shouldShowTabs = computed(() => (props.showTabs ?? sandpack?.visibleFiles?.length > 1));

    return () => (
      <SandpackStack>
        {shouldShowTabs.value ? <FileTabs /> : null}

        <div class={classNames(c('code-editor'), editorClassName)}>
          <CodeEditor
            ref={sandpackCodeViewerRef}
            code={props.code ?? activeCode.value}
            decorators={props.decorators}
            filePath={sandpack.activeFile}
            initMode={props.initMode || sandpack.initMode}
            showLineNumbers={props.showLineNumbers}
            showReadOnly={false}
            wrapContent={props.wrapContent}
            readOnly
          />
        </div>

        {sandpack.status === 'idle' ? <RunButton /> : null}
      </SandpackStack>
    );
  },
}) as DefineComponent<CodeViewerProps>;
