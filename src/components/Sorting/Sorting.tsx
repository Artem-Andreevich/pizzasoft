import { useActions } from "../../hooks";
import { Dropdown } from "../../ui/Dropdown";

export const Sorting = () => {
    const { sortingByName, sortingByBirthday } = useActions()

    return (
        <Dropdown title="Сориторвка">
            <button onClick={() => {sortingByName('ASC')}}>По алфавиту от А-Я</button>
            <button onClick={() => {sortingByName('DESC')}}>По алфавиту от Я-А</button>
            <button onClick={() => {sortingByBirthday('ASC')}}>По дате от 1-9</button>
            <button onClick={() => {sortingByBirthday('DESC')}}>По дате от 9-1</button>
        </Dropdown>
    )
};