import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react'
import LandingComponent from './landing'

afterEach(cleanup)

describe('This will test MyComponent', () => {
  test('renders message', () => {
    const { h1 } = render(<LandingComponent />)

    console.log(h1)
    // as suggested by Giorgio Polvara a more idiomatic way:
    //  expect(getByText('Hi Alejandro Roman')).toBeInTheDocument()
  })
})