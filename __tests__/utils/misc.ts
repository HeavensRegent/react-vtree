import {ReactWrapper} from 'enzyme';
import {
  NodeData,
  NodePublicState,
  TypedListChildComponentData,
} from '../../src/Tree';
import {RequestIdleCallbackDeadline} from '../../src/utils';

export const extractReceivedRecords = <
  TListProps,
  TData extends NodeData,
  TNodePublicState extends NodePublicState<TData>
>(
  cmp: ReactWrapper<TListProps>,
): readonly TNodePublicState[] => {
  const itemData: TypedListChildComponentData<
    TData,
    TNodePublicState
  > = cmp.prop('itemData');

  const itemCount: number = cmp.prop('itemCount');

  const {getRecordData} = itemData;
  const records = new Array(itemCount);

  for (let i = 0; i < itemCount; i++) {
    records[i] = getRecordData(i);
  }

  return records;
};

export const mockRequestIdleCallback = (ms: number): (() => void) => {
  const originalRIC = window.requestIdleCallback;

  const deadline: RequestIdleCallbackDeadline = {
    didTimeout: false,
    timeRemaining: jest
      .fn()
      .mockReturnValue(1)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(0),
  };
  // eslint-disable-next-line @typescript-eslint/require-await
  window.requestIdleCallback = jest.fn((task) =>
    setTimeout(() => task(deadline), ms),
  );

  return () => {
    window.requestIdleCallback = originalRIC;
  };
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const defaultTree = {
  children: [
    {
      children: [
        {id: 'foo-3', name: 'Foo #3'},
        {id: 'foo-4', name: 'Foo #4'},
      ],
      id: 'foo-2',
      name: 'Foo #2',
    },
    {
      children: [
        {id: 'foo-6', name: 'Foo #6'},
        {
          children: [
            {id: 'foo-8', name: 'Foo #8'},
          ],
          id: 'foo-7', name: 'Foo #7',
        },
      ],
      id: 'foo-5',
      name: 'Foo #5',
    },
  ],
  id: 'foo-1',
  name: 'Foo #1',
};
