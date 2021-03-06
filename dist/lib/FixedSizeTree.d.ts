import { ReactNode } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import Tree, { NodeData, NodePublicState, TreeProps, TreeState } from './Tree';
export declare type FixedSizeNodeData = NodeData;
export declare type FixedSizeNodePublicState<TData extends FixedSizeNodeData> = NodePublicState<TData>;
export declare type FixedSizeTreeProps<TData extends FixedSizeNodeData> = TreeProps<TData, FixedSizeNodePublicState<TData>, FixedSizeList> & Readonly<Pick<FixedSizeListProps, 'itemSize'>>;
export declare type FixedSizeTreeState<TData extends FixedSizeNodeData> = TreeState<TData, FixedSizeNodePublicState<TData>, FixedSizeList>;
export declare class FixedSizeTree<TData extends FixedSizeNodeData = FixedSizeNodeData> extends Tree<TData, FixedSizeNodePublicState<TData>, FixedSizeTreeProps<TData>, FixedSizeTreeState<TData>, FixedSizeList> {
    constructor(props: FixedSizeTreeProps<TData>, context: any);
    render(): ReactNode;
}
