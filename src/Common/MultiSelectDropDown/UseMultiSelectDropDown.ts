import { useReducer } from "react";
import { useClickOutside } from "../../utility/UseClickOutside";
import { multiSelectReducer } from "./reducer";
import { IMultiSelectDataSource, IProps } from "./type";
type TUseMultiSelectDropDown = Required<IProps> & { ref: React.RefObject<HTMLElement | HTMLUListElement | null> }
export const UseMultiSelectDropDown = ({ values, dataSource, defaultValues, ref, onChange }: TUseMultiSelectDropDown) => {
    const InputStatus = values.length > 0 ? "Controled" : "UnControled";
    const [state, dispatch] = useReducer(multiSelectReducer, {
        showList: false,
        valuesState: InputStatus === "Controled" ? values : defaultValues,
        dSource: dataSource || [],
    });
    useClickOutside(ref, (e) => {
        if ((e.target as HTMLInputElement).ariaDescription !== "MultiSelectInput") {
            dispatch({ type: "TOGGLE_LIST", payload: false });
        }
    });
    const hanldeChange = (key: string) => {
        let copyValue = [...state.valuesState];
        const bookmark = copyValue.findIndex((i) => i === key);
        bookmark === -1 ? copyValue.push(key) : copyValue.splice(bookmark, 1);
        onChange(copyValue);
        if (InputStatus === "UnControled") {
            dispatch({ type: "SET_VALUES", payload: copyValue });
        }
    };
    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        const curentlabel = (e.target as HTMLInputElement)?.value?.trim();
        (e.target as HTMLInputElement).value = "";
        if (!curentlabel) return;
        const newDataSourceItem: IMultiSelectDataSource = { label: curentlabel, value: curentlabel };
        if (state.dSource.includes(newDataSourceItem)) return;
        dispatch({ type: "ADD_DATASOURCE_ITEM", payload: newDataSourceItem });
        if (InputStatus === "UnControled") {
            dispatch({ type: "ADD_VALUE", payload: curentlabel });
        }
    };
    const handleFocused = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.stopPropagation();
        dispatch({ type: "TOGGLE_LIST", payload: true });
    };
    return { handleFocused, onPressEnter, hanldeChange, state }
}