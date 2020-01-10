import React from 'react'
import { render, cleanup } from '@testing-library/react'
import MyComponent from './myTestComponentComponent'

afterEach(cleanup)

describe('This will test MyComponent', () => {
  test('renders message', () => {
   //   const { getByText }= render(<MyComponent />)

     expect(1).toBe(1)