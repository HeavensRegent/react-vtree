import React, { Component, ComponentType, PropsWithChildren, PureComponent, ReactElement, ReactNode, Ref, RefCallback, RefObject } from 'react';
import { Align, FixedSizeList, ListChildComponentProps, ListProps, VariableSizeList } from 'react-window';
import { DefaultTreeProps, DefaultTreeState } from './utils';
export declare type NodeData = Readonly<{
    /**
     * Unique ID of the current node.
     */
    id: string;
    /**
     * Default node openness state. If the Tree component performs building a new
     * Tree and the preservePreviousState prop is not set, this value will be used
     * to set the openness state of the node.
     */
    isOpenByDefault: boolean;
}>;
export declare type TreeWalkerValue<TData extends NodeData, TMeta = {}> = Readonly<{
    data: TData;
} & TMeta>;
export declare type OpennessStateUpdateRules<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    open: boolean;
    subtreeCallback?: (node: TNodePublicState, ownerNode: TNodePublicState) => void;
}>;
export declare type NodePublicState<TData extends NodeData> = Readonly<{
    data: TData;
    setOpen: (state: boolean) => Promise<void>;
}> & {
    isOpen: boolean;
};
export declare type NodeRecord<TNodePublicState extends NodePublicState<any>> = Readonly<{
    public: TNodePublicState;
}> & {
    child: NodeRecord<TNodePublicState> | null;
    isShown: boolean;
    parent: NodeRecord<TNodePublicState> | null;
    sibling: NodeRecord<TNodePublicState> | null;
    visited: boolean;
};
export declare type NodeComponentProps<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<Omit<ListChildComponentProps, 'data' | 'index'> & TNodePublicState & {
    /**
     * The data provided by user via `itemData` Tree component property.
     */
    treeData?: any;
}>;
export declare type TreeWalker<TData extends NodeData, TMeta = {}> = () => Generator<TreeWalkerValue<TData, TMeta> | undefined, undefined, TreeWalkerValue<TData, TMeta>>;
export declare type OpennessState<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<Record<string, OpennessStateUpdateRules<TData, TNodePublicState> | boolean>>;
export declare type TreeComputerProps<TData extends NodeData> = Readonly<{
    async?: boolean;
    buildingTaskTimeout?: number;
    placeholder?: ReactNode;
    treeWalker: TreeWalker<TData>;
}>;
export declare type TreeComputerState<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    order?: string[];
    records: ReadonlyMap<string | symbol, NodeRecord<TNodePublicState>>;
    setState: Component<any, TreeComputerState<TData, TNodePublicState>>['setState'];
    updateRequest: object;
}>;
export declare type TreeProps<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TListComponent extends FixedSizeList | VariableSizeList> = Readonly<Omit<ListProps, 'children' | 'itemCount' | 'itemKey'>> & TreeComputerProps<TData> & Readonly<{
    children: ComponentType<NodeComponentProps<TData, TNodePublicState>>;
    listRef?: Ref<TListComponent>;
    rowComponent?: ComponentType<ListChildComponentProps>;
}>;
export declare type TreeState<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TListComponent extends FixedSizeList | VariableSizeList> = TreeComputerState<TData, TNodePublicState> & Readonly<{
    attachRefs: RefCallback<TListComponent>;
    computeTree: TreeComputer<any, any, any, any>;
    list: RefObject<TListComponent>;
    recomputeTree: (options: OpennessState<TData, TNodePublicState>) => Promise<void>;
    treeWalker: TreeWalker<TData>;
}>;
export declare type TypedListChildComponentData<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    /**
     * The Node component provided by the user.
     */
    component: ComponentType<NodeComponentProps<TData, TNodePublicState>>;
    /**
     * The function that returns public data from visible records by index.
     *
     * @param index
     */
    getRecordData: (index: number) => TNodePublicState;
    /**
     * @see NodeComponentProps#treeData
     */
    treeData: any;
}>;
export declare type TypedListChildComponentProps<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<Omit<ListChildComponentProps, 'data'> & {
    data: TypedListChildComponentData<TData, TNodePublicState>;
}>;
export declare const Row: <TData extends Readonly<{
    /**
     * Unique ID of the current node.
     */
    id: string;
    /**
     * Default node openness state. If the Tree component performs building a new
     * Tree and the preservePreviousState prop is not set, this value will be used
     * to set the openness state of the node.
     */
    isOpenByDefault: boolean;
}>, TNodePublicState extends NodePublicState<TData>>({ index, data: { component: Node, getRecordData, treeData }, style, isScrolling, }: React.PropsWithChildren<Readonly<Pick<ListChildComponentProps, "style" | "index" | "isScrolling"> & {
    data: Readonly<{
        /**
         * The Node component provided by the user.
         */
        component: React.ComponentType<Readonly<Pick<ListChildComponentProps, "style" | "isScrolling"> & TNodePublicState & {
            /**
             * The data provided by user via `itemData` Tree component property.
             */
            treeData?: any;
        }>>;
        /**
         * The function that returns public data from visible records by index.
         *
         * @param index
         */
        getRecordData: (index: number) => TNodePublicState;
        /**
         * @see NodeComponentProps#treeData
         */
        treeData: any;
    }>;
}>>) => ReactElement | null;
export declare type TreeCreatorOptions<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TState extends TreeComputerState<TData, TNodePublicState>> = Readonly<{
    createRecord: (data: TData, state: TState, parent?: NodeRecord<TNodePublicState> | null, previousRecord?: NodeRecord<TNodePublicState>) => NodeRecord<TNodePublicState>;
}>;
export declare type TreeComputerOptions<TData extends NodeData, TNodePublicState extends NodePublicState<TData>> = Readonly<{
    opennessState?: OpennessState<TData, TNodePublicState>;
    refresh?: boolean;
}>;
export declare type TreeComputer<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TProps extends TreeComputerProps<TData>, TState extends TreeComputerState<TData, TNodePublicState>> = (props: TProps, state: TState, options: TreeComputerOptions<TData, TNodePublicState>) => (Pick<TState, 'order' | 'records'> & Partial<Pick<TState, 'updateRequest'>>) | null;
export declare const createTreeComputer: <TData extends Readonly<{
    /**
     * Unique ID of the current node.
     */
    id: string;
    /**
     * Default node openness state. If the Tree component performs building a new
     * Tree and the preservePreviousState prop is not set, this value will be used
     * to set the openness state of the node.
     */
    isOpenByDefault: boolean;
}>, TNodePublicState extends NodePublicState<TData>, TProps extends Readonly<{
    async?: boolean | undefined;
    buildingTaskTimeout?: number | undefined;
    placeholder?: ReactNode;
    treeWalker: TreeWalker<TData, {}>;
}>, TState extends Readonly<{
    order?: string[] | undefined;
    records: ReadonlyMap<string | symbol, NodeRecord<TNodePublicState>>;
    setState: <K extends "order" | "records" | "setState" | "updateRequest">(state: Readonly<any> | ((prevState: Readonly<Readonly<any>>, props: Readonly<any>) => Readonly<any> | Pick<Readonly<any>, K> | null) | Pick<Readonly<any>, K> | null, callback?: (() => void) | undefined) => void;
    updateRequest: object;
}>>(creatorOptions: Readonly<{
    createRecord: (data: TData, state: TState, parent?: NodeRecord<TNodePublicState> | null | undefined, previousRecord?: NodeRecord<TNodePublicState> | undefined) => NodeRecord<TNodePublicState>;
}>) => TreeComputer<TData, TNodePublicState, TProps, TState>;
declare class Tree<TData extends NodeData, TNodePublicState extends NodePublicState<TData>, TProps extends TreeProps<TData, TNodePublicState, TListComponent>, TState extends TreeState<TData, TNodePublicState, TListComponent>, TListComponent extends FixedSizeList | VariableSizeList> extends PureComponent<TProps, TState> {
    static defaultProps: Partial<DefaultTreeProps>;
    static getDerivedStateFromProps(props: DefaultTreeProps, state: DefaultTreeState): Partial<DefaultTreeState> | null;
    constructor(props: TProps, context: any);
    protected getItemData(): TypedListChildComponentData<TData, TNodePublicState>;
    protected getRecordData(index: number): TNodePublicState;
    recomputeTree(state: OpennessState<TData, TNodePublicState>): Promise<void>;
    scrollTo(scrollOffset: number): void;
    scrollToItem(id: string, align?: Align): void;
}
export default Tree;
