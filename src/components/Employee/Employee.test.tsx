import { render, fireEvent } from "@testing-library/react"
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
        expect(component).toMatchSnapshot()
    })

    it("Передали внешний className", () => {
        const component = render(
            <BrowserRouter>
                <Employee employee={mockEmployee} className="mockClassName"/>
            </BrowserRouter>
        )
        const employee = component.container.querySelector(".employee-item") as HTMLLinkElement
        expect(employee.classList.contains("mockClassName")).toBeTruthy()
    })

    it("Employee в архиве (isArchive = true)", () => {
        mockEmployee.isArchive = true
        const component = render(
            <BrowserRouter>
                <Employee employee={mockEmployee}/>
            </BrowserRouter>
        )
        const employee = component.container.querySelector(".employee-item") as HTMLLinkElement
        expect(employee.classList.contains("is-archive")).toBeTruthy()
    })

    it("Click по Employee", () => {
        const component = render(
            <BrowserRouter>
                <Employee employee={mockEmployee}/>
            </BrowserRouter>
        )
        const employee = component.container.querySelector(".employee-item") as HTMLLinkElement
        fireEvent.click(employee)
        expect(window.location.pathname).toEqual(`/edit/${mockEmployee.id}`);
    })
})