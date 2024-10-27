import { useMemo } from "react"
import { bindActionCreators } from "redux"
import { sortingByName, sortingByBirthday, filteredByRole } from "../store/emloyeeSlice/emloyee.slice"

import { useAppDispatch } from "./useAppDispatch"

const rootActions = {
    sortingByName,
    filteredByRole,
    sortingByBirthday,
}

export const useActions = () => {
    const dispatch = useAppDispatch()
    return useMemo( () => 
        bindActionCreators(rootActions, dispatch), [dispatch])
}