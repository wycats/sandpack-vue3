import { DefineComponent, defineComponent, PropType } from 'vue';

import { css } from '../../styles';
import { classNames } from '../../utils/classNames';

import type { Test } from './Tests';
import { Tests } from './Tests';
import { isEmpty } from './utils';

export interface Describe {
  name: string;
  tests: Record<string, Test>;
  describes: Record<string, Describe>;
}

const nameClassName = css({
  color: '$colors$hover',
  marginBottom: '$space$2',
});

const containerClassName = css({
  marginLeft: '$space$4',
});

export const Describes = defineComponent({
  name: 'Describes',
  props: {
    describes: {
      type: Array as PropType<Describe[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <>
        {props.describes.map((describe) => {
          if (isEmpty(describe)) {
            return null;
          }

          const tests = Object.values(describe.tests);
          const describes = Object.values(describe.describes);

          return (
            <div key={describe.name} class={classNames(containerClassName)}>
              <div class={classNames(nameClassName)}>{describe.name}</div>

              <Tests tests={tests} />

              <Describes describes={describes} />
            </div>
          );
        })}
      </>
    );
  },
}) as DefineComponent<{ describes: Describe[] }>;
