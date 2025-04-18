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