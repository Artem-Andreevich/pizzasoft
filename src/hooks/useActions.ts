import { useMemo } from "react"
import { bindActionCreators } from "redux"
// import { addProduct, removeProduct } from "../store/cart/cart.slice"
import { useAppDispatch } from "./useAppDispatch"

const rootActions = {
    // addProduct,
    // removeProduct,
}

export const useActions = () => {
    const dispatch = useAppDispatch()
    return useMemo( () => 
        bindActionCreators(rootActions, dispatch), [dispatch])
}