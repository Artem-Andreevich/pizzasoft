import { Link } from "react-router-dom"
import { IEmployee } from "../../types/Employee/Employee";
import classNames from "classnames";

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
            className={classNames("employee-item", className, {"is-archive": employee.isArchive})}
            to={`/edit/${employee.id}`}
        >
            <span>{employee.name}</span>
            <span>{employee.role}</span>
            <span>{employee.phone}</span>
        </Link>
    )
}