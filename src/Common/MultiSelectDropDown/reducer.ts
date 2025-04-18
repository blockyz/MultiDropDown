import { IReducerState, TReducerAction } from "./type";

export const multiSelectReducer = (state: IReducerState, action: TReducerAction): IReducerState => {
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