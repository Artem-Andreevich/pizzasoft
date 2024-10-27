import { useMemo } from "react"
import { bindActionCreators } from "redux"

import { useAppDispatch } from "./useAppDispatch"

const rootActions = {}

export const useActions = () => {
    const dispatch = useAppDispatch()
    return useMemo( () => 
        bindActionCreators(rootActions, dispatch), [dispatch])
}