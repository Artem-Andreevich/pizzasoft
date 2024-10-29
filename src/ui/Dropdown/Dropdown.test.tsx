import '@testing-library/jest-dom'
import { render, fireEvent, screen } from "@testing-library/react"
import { Dropdown } from "./Dropdown"


describe("Dropdown", () => {

    it("Присутвствет на странице при рендере", () => {
        const mockName = 'Название кнопки'
        const component = render(
            <Dropdown title={mockName}>Кнопка</Dropdown>
        )
        expect(component).toBeInTheDocument
        expect(component).toMatchSnapshot()
        screen.debug()
    })

    it("Dropdown содержит button с переданным title", () => {
        const mockName = 'Название кнопки'
        const component = render(
            <Dropdown title={mockName}>Кнопка</Dropdown>
        )
        const dropdown = component.container.querySelector(".dropdown")
        expect(dropdown).toContainHTML(`<button class="btn-cta btn-cta--main dropdown__toggle"><span>${mockName}</span></button>`)
    })

})