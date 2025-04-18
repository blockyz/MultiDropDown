import { FC, useRef } from "react";
import Check from "../../assets/CheckIcon";
import styles from "../../styles/multi-select-dropdown.module.scss";
import { IMultiSelectDataSource, IProps } from "./type";
import { UseMultiSelectDropDown } from "./UseMultiSelectDropDown";

const MultiSelectDropDown: FC<IProps> = ({ values = [], onChange = () => {}, dataSource, defaultValues = [] }) => {
  const ref = useRef<HTMLUListElement>(null);
  const { handleFocused, hanldeChange, onPressEnter, state } = UseMultiSelectDropDown({ dataSource, defaultValues, onChange, ref, values });
  const _renderItems = (i: IMultiSelectDataSource, x: number) => {
    const checked = !!state.valuesState.find((x) => x === i.value);
    return (
      <li key={x + i.label} onClick={() => hanldeChange(i.value)}>
        {i.label}
        {checked && <Check />}
      </li>
    );
  };

  return (
    <div className={styles.inputWrapper + " " + (!state.showList || styles.inputWrapperActive)}>
      <input
        type="text"
        placeholder="Search or add new..."
        onClick={handleFocused}
        aria-label="Search or add options"
        aria-description="MultiSelectInput"
        onKeyDown={onPressEnter}
      />
      {state.showList && (
        <ul ref={ref} className={styles.listContainer}>
          {state.dSource.map(_renderItems)}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropDown;
