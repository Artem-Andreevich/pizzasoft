import { useEffect, useRef, useState } from "react";
import cls from "./Dropdown.module.scss"
import { classNames } from "../../lib/helpers/classNames/classNames";

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
        <div className={classNames(cls.dropdown, {}, [className])} ref={scope}>
            <button
                className={classNames(cls.dropdownButton, {[cls.active] : open})}
                onClick={() => setOpen(!open)}
            >
                <span>{title}</span>
            </button>

            <ul className={classNames(cls.dropdownContent, {[cls.shown] : open})}>
                {children}
            </ul>
        </div>
    )
}