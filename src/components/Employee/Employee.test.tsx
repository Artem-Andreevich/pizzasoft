import '@testing-library/jest-dom'
import { render, fireEvent, screen } from "@testing-library/react"
import { BrowserRouter } from 'react-router-dom'
import { Employee } from "./Employee"

describe("Employee", () => {
    const mockEmployee = {
        id: "17", 
        name: "Евдокия Филиппова", 
        isArchive: false, 
        role: "waiter",
        phone: "+7 (877) 450-3253",
        birthday: "03.12.1994"
    }

    it("Присутвствет на странице при рендере", () => {
        const component = render(
            <BrowserRouter>
                <Employee employee={mockEmployee} />
            </BrowserRouter>
        )
        expect(component).toBeInTheDocument
        expect(component).toMatchSnapshot()
    })

    it("Передали внешний className", () => {
        render(
            <BrowserRouter>
                <Employee employee={mockEmployee} className="mockClassName"/>
            </BrowserRouter>
        )
        const employee = screen.getByRole("link")
        expect(employee).toHaveClass("mockClassName")

    })

    it("Employee в архиве (isArchive = true)", () => {
        mockEmployee.isArchive = true
        render(
            <BrowserRouter>
                <Employee employee={mockEmployee}/>
            </BrowserRouter>
        )
        const employee = screen.getByRole("link")
        expect(employee).toHaveClass("is-archive")
    })

    it("Click по Employee", () => {
        render(
            <BrowserRouter>
                <Employee employee={mockEmployee}/>
            </BrowserRouter>
        )
        const employee = screen.getByRole("link")
        fireEvent.click(employee)
        expect(window.location.pathname).toEqual(`/edit/${mockEmployee.id}`);
    })
})