/// <reference types="react" />
import { FixedSizeList } from 'react-window';
import type { NodeData, NodePublicState, NodeRecord, TreeCreatorOptions, TreeProps, TreeState, TypedListChildComponentData } from './Tree';
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare type RequestIdleCallbackHandle = any;
export declare type RequestIdleCallbackOptions = Readonly<{
    timeout: number;
}>;
export declare type RequestIdleCallbackDeadline = Readonly<{
    didTimeout: boolean;
    timeRemaining: () => number;
}>;
declare global {
    const requestIdleCallback: (callback: (deadline: RequestIdleCallbackDeadline) => void, opts?: RequestIdleCallbackOptions) => RequestIdleCallbackHandle;
    const cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
    interface Window {
        requestIdleCallback: typeof requestIdleCallback;
        cancelIdleCallback: typeof cancelIdleCallback;
    }
}
export declare type DefaultTreeProps = TreeProps<NodeData, NodePublicState<NodeData>, FixedSizeList>;
export declare type DefaultTreeState = TreeState<NodeData, NodePublicState<NodeData>, FixedSizeList>;
export declare type DefaultTreeCreatorOptions = TreeCreatorOptions<NodeData, NodePublicState<NodeData>, DefaultTreeState>;
export declare const noop: () => void;
export declare const identity: <T>(value: T) => T;
export declare const createBasicRecord: <TData extends Readonly<{
    id: string;
    isOpenByDefault: boolean;
}>, TNodePublicState extends NodePublicState<TData>>(pub: TNodePublicState, parent?: NodeRecord<TNodePublicState> | null) => NodeRecord<TNodePublicState>;
export declare const getIdByIndex: <TData extends Readonly<{
    id: string;
    isOpenByDefault: boolean;
}>, TNodePublicState extends NodePublicState<TData>>(index: number, { getRecordData }: Readonly<{
    component: import("react").ComponentType<Readonly<Pick<import("react-window").ListChildComponentProps, "style" | "isScrolling"> & TNodePublicState & {
        treeData?: any;
    }>>;
    getRecordData: (index: number) => TNodePublicState;
    treeData: any;
}>) => string;
