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

    // it("Передали <span> элемент в {children} ", () => {
    //     render(
    //         <Button><span>Кнопка</span></Button>
    //     )
    //     const button = screen.getByRole("button")
    //     expect(button).toContainHTML('<span>Кнопка</span>')
    // })

    // it("Передали внешний className", () => {
    //     render(
    //         <Button className={"mockClassName"}>Кнопка</Button>
    //     )
    //     const button = screen.getByRole("button")
    //     expect(button).toHaveClass("mockClassName")
    // })

    // it("Передали внешний onClick", () => {
    //     const mockHandler = jest.fn()
    //     render(
    //         <Button onClick={mockHandler}>Кнопка</Button>
    //     )
    //     const button = screen.getByRole("button")
    //     fireEvent.click(button)
    //     expect(mockHandler).toHaveBeenCalledTimes(1)
    // })
})