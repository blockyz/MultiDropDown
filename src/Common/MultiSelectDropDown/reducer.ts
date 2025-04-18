import { IMultiSelectDataSource } from "./type";

type Action =
    | { type: "TOGGLE_LIST"; payload: boolean }
    | { type: "SET_VALUES"; payload: string[] }
    | { type: "ADD_VALUE"; payload: string }
    | { type: "REMOVE_VALUE"; payload: string }
    | { type: "ADD_DATASOURCE_ITEM"; payload: IMultiSelectDataSource }
    | { type: "SET_DATASOURCE"; payload: IMultiSelectDataSource[] };

interface State {
    showList: boolean;
    valuesState: string[];
    dSource: IMultiSelectDataSource[];
}

export const multiSelectReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TOGGLE_LIST":
            return { ...state, showList: action.payload };
        case "SET_VALUES":
            return { ...state, valuesState: action.payload };
        case "ADD_VALUE":
            if (state.valuesState.includes(action.payload)) {
                return state;
            }
            return { ...state, valuesState: [...state.valuesState, action.payload] };
        case "ADD_DATASOURCE_ITEM":
            if (state.dSource.some(item => item.value === action.payload.value)) {
                return state;
            }
            return { ...state, dSource: [action.payload, ...state.dSource] };

        default:
            return state;
    }
};