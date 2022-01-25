import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

const MockNavbar = () => {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
}

describe('check if navbar exist',() => {
    it('create application should be in the document' , () => {
        render(<MockNavbar/>)
        const navbar =  screen.getByTestId("create-application")
        expect(navbar).toBeInTheDocument()
    })
    it('application progress should be in the document' , () => {
        render(<MockNavbar/>)
        const navbar =  screen.getByTestId("application-progress")
        expect(navbar).toBeInTheDocument()
    })
})


