import { useRef, useState } from "react"

export function useToolptipTimer() {
    const refTimeout = useRef<NodeJS.Timeout>()
    const [ isShowTooltip, setIsShowTooltip ] = useState(false)
    
    const toggleShowTooltip = () => {
        setIsShowTooltip(true)

        refTimeout.current = setTimeout(() => {
            setIsShowTooltip(false)
        }, 2000)
    }
    
    return [isShowTooltip, toggleShowTooltip, refTimeout.current] as const
}