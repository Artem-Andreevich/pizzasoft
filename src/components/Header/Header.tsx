import { NavLink } from "react-router-dom"


export const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <ul className="header__nav nav">
                    <NavLink to="/" className="nav__link">Главная</NavLink>
                    <NavLink to="/create" className="nav__link">Добавить сотрудника</NavLink>
                </ul>
            </div>
        </header>
    )
}