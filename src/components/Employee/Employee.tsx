import { Link } from "react-router-dom"
import { IEmployee } from "../../types/Employee/Employee";
import { classNames} from "../../helpers/classNames/classNames"
import cls from "./Employee.module.scss"

interface EmployeeProps {
    className?: string;
    employee: IEmployee
}

export const Employee = (props: EmployeeProps) => {

    const {
        className = "",
        employee
    } = props


    return (
        <Link 
            className={classNames(cls.Employee, {[cls.archive]: employee.isArchive}, [className])}
            to={`/edit/${employee.id}`}
        >
            <span>{employee.name}</span>
            <span>{employee.role}</span>
            <span>{employee.phone}</span>
        </Link>
    )
}