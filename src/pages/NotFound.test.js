import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import NotFound from "./NotFound"

const MockNotFound = () => {
  return (
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  )
}

describe("not found", () => {
    it("not found div should be on screen", () => {
        render(<MockNotFound />)
        const notfound = screen.getByTestId("notFound")
        expect(notfound).toBeInTheDocument()
      })
})