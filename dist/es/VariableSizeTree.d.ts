import { ReactNode } from 'react';
import { VariableSizeList, VariableSizeListProps } from 'react-window';
import Tree, { NodeData, NodePublicState, OpennessState, TreeProps, TreeState } from './Tree';
export declare type VariableSizeNodeData = Readonly<{
    /** Default node height. Can be used only with VariableSizeTree */
    defaultHeight: number;
}> & NodeData;
export declare type VariableSizeNodePublicState<T extends VariableSizeNodeData> = NodePublicState<T> & {
    height: number;
    readonly resize: (height: number, shouldForceUpdate?: boolean) => void;
};
export declare type VariableSizeTreeProps<TData extends VariableSizeNodeData> = TreeProps<TData, VariableSizeNodePublicState<TData>, VariableSizeList> & Readonly<{
    itemSize?: VariableSizeListProps['itemSize'];
}>;
export declare type VariableSizeTreeState<T extends VariableSizeNodeData> = TreeState<T, VariableSizeNodePublicState<T>, VariableSizeList> & Readonly<{
    resetAfterId: (id: string, shouldForceUpdate?: boolean) => void;
}>;
export declare class VariableSizeTree<TData extends VariableSizeNodeData> extends Tree<TData, VariableSizeNodePublicState<TData>, VariableSizeTreeProps<TData>, VariableSizeTreeState<TData>, VariableSizeList> {
    constructor(props: VariableSizeTreeProps<TData>, context: any);
    resetAfterId(id: string, shouldForceUpdate?: boolean): void;
    recomputeTree(state: OpennessState<TData, VariableSizeNodePublicState<TData>>): Promise<void>;
    render(): ReactNode;
    private getItemSize;
}
