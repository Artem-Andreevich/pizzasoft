import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    title: string;
    className?: string;
    children: React.ReactNode
}

export const Dropdown: React.FC<DropdownProps> = (props) => {

    const {
        className = "",
        title,
        children
    } = props

    const scope = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false)

    useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (scope.current && !scope.current.contains(event.target as Node)) {
				setOpen(false)
			  }
		  }
		  document.body.addEventListener('click', handleClickOutside)
		  return () => document.body.removeEventListener('click', handleClickOutside)
	},[])

    return (
        <div 
            className={classNames("dropdown", className)} 
            ref={scope}
        >
            <button
                className={classNames("btn-cta btn-cta--main", "dropdown__toggle", {"open": open})}
                onClick={() => setOpen(!open)}
            >
                <span>{title}</span>
            </button>

            <div 
                className={classNames("dropdown__content", {"shown": open})}
                onClick={() => setOpen(false)}
            >
                {children}   
            </div>
        </div>
    )
}