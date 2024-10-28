import '@testing-library/jest-dom'
import { render, fireEvent, screen } from "@testing-library/react"
import { Button } from "./Button"


describe("Button", () => {

    it("Присутвствет на странице при рендере", () => {
        const component = render(
            <Button>Кнопка</Button>
        )
        expect(component).toBeInTheDocument
        expect(component).toMatchSnapshot()
    })

    it("Передали <span> элемент в {children} ", () => {
        render(
            <Button><span>Кнопка</span></Button>
        )
        const button = screen.getByRole("button")
        expect(button).toContainHTML('<span>Кнопка</span>')
    })

    it("Передали внешний className", () => {
        render(
            <Button className={"mockClassName"}>Кнопка</Button>
        )
        const button = screen.getByRole("button")
        expect(button).toHaveClass("mockClassName")
    })

    it("Передали внешний onClick", () => {
        const mockHandler = jest.fn()
        render(
            <Button onClick={mockHandler}>Кнопка</Button>
        )
        const button = screen.getByRole("button")
        fireEvent.click(button)
        expect(mockHandler).toHaveBeenCalledTimes(1)
    })
})