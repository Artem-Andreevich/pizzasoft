import classNames from "classnames";
import { useEffect } from "react";

interface TooltipProps {
    className?: string;
    timerId: NodeJS.Timeout | undefined,
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {

    const {
        className = "",
        children,
        timerId
    } = props

    useEffect(() => {
        return () => {
            clearTimeout(timerId)
        }
    },[])

    return (
        <div 
            className={classNames('tooltip', className)}
        >
            {children}
        </div>
    )
}