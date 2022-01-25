import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import Form from "./Form"

const MockForm = () => {
  return (
    <BrowserRouter>
      <Form />
    </BrowserRouter>
  )
}

describe("application form", () => {

  it("application form should be in the document", () => {
    render(<MockForm />)
    const form = screen.getByTestId("application-form")
    expect(form).toBeInTheDocument()
  })

  it("we should be able to type on name input", async () => {
    render(<MockForm />)

    const nameInput = screen.getByTestId("application-name-input")
    fireEvent.change(nameInput, {
      target: { value: "Adımı kalbine yaz beni unutma" },
    })
    await waitFor(() => {
        expect(nameInput.value).toBe("Adımı kalbine yaz beni unutma")
    })
  })
  it("we should be able to type on surname input", async () => {
    render(<MockForm />)

    const surnameInput = screen.getByTestId("application-surname-input")
    fireEvent.change(surnameInput, {
      target: { value: "Adını yazsan yeter soyadına gerek yok" },
    })
    await waitFor(() => {
        expect(surnameInput.value).toBe("Adını yazsan yeter soyadına gerek yok")
    })
  })
  it("we should be able to type on age input and it should be number", async () => {
    render(<MockForm />)

    const ageInput = screen.getByTestId("application-age-input")
    fireEvent.change(ageInput, {
      target: { value: 11 },
    })
    await waitFor(() => {
        expect(+(ageInput.value)).toEqual(11)
    })
  })
  it("we should be able to type on person id input,it should be 11 character and number", async () => {
    render(<MockForm />)

    const personIdInput = screen.getByTestId("application-personId-input")
    fireEvent.change(personIdInput, {
      target: { value: 12345678912 },
    })
    await waitFor(() => {
        expect(+(personIdInput.value)).toEqual(12345678912)
    })
    await waitFor(() => {
        expect(personIdInput.value).toHaveLength(11)
    })
  })

  it("form inputs(in this case name input) should be empty when click", async () => {
    render(<MockForm />)
    const nameInput = screen.getByTestId("application-name-input")

    const button = screen.getByRole("button", {name: 'GÖNDER'})
    fireEvent.click(button)
    await waitFor(() => {
        expect(nameInput.value).toBe("")
    })
  })

  it("we should be able to type on description textarea", async () => {
    render(<MockForm />)
    const descriptionTextarea = screen.getByTestId("application-description-textarea")

    fireEvent.change(descriptionTextarea, {
        target: { value: 'description' },
      })
    await waitFor(() => {
        expect(descriptionTextarea.value).toBe("description")
    })
  })

  it("we should be able to type on address textarea", async () => {
    render(<MockForm />)
    const addressTextarea = screen.getByTestId("application-address-textarea")

    fireEvent.change(addressTextarea, {
        target: { value: 'address' },
      })
    await waitFor(() => {
        expect(addressTextarea.value).toBe("address")
    })
  })
})
