import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Spinner from './Spinner'


describe('check if spinner exist',() => {
    it('spinner should be in the document' , () => {
        render(<Spinner/>)
        const spinner =  screen.getByTestId("loader")
        expect(spinner).toBeInTheDocument()
    })
    
})


