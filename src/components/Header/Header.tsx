import { NavLink } from "react-router-dom"


export const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <ul className="header__nav nav">
                    <li>
                        <NavLink to="/" className="nav__link">Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create" className="nav__link">Добавить сотрудника</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}