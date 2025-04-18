export interface IMultiSelectDataSource {
    label: string,
    value: string
}
export interface IProps {
    onChange?: (value: string[]) => void,
    values?: string[],
    defaultValues?: string[],
    dataSource: IMultiSelectDataSource[]
}
export type TReducerAction =
    | { type: "TOGGLE_LIST"; payload: boolean }
    | { type: "SET_VALUES"; payload: string[] }
    | { type: "ADD_VALUE"; payload: string }
    | { type: "ADD_DATASOURCE_ITEM"; payload: IMultiSelectDataSource }

export interface IReducerState {
    showList: boolean;
    valuesState: string[];
    dSource: IMultiSelectDataSource[];
}