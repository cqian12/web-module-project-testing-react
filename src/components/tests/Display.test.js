import React from 'react';
import { render, screen, fireEvent, waitFor, findByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from '../Display';
import fetchShow from '../../api/fetchShow'

jest.mock('../../api/fetchShow')

const testShow = {
    name: 'Nathan For You',
    image: null,
    summary: 'GOAT',
    seasons:[{id:1, name: 'Season 1',episodes:[]},
    {id:2,name:'Season 2', episodes:[]}]
}

test("renders without error", () => {
    render (<Display />)
});

test("when the fetch button is pressed, the show component displays", async () => {
    render (<Display />)
    
    fetchShow.mockResolvedValueOnce(testShow)
    
    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        const show = screen.getByTestId('show-container')
        expect(show).toBeInTheDocument()
    }) 
})

test("when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons", async () => {
    render (<Display />)

    fetchShow.mockResolvedValueOnce(testShow)
    
    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        const seasons = screen.getAllByTestId('season-option')
        expect(seasons).toHaveLength(2)
    })
})

test("when the fetch button is pressed, displayFunc is called", async () => {
    const fakeDisplay = jest.fn()

    render (<Display displayFunc={fakeDisplay} />)

    fetchShow.mockResolvedValueOnce(testShow)
    
    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        expect(fakeDisplay).toHaveBeenCalledTimes(1)
    })
})

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.