import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MultimodalInput } from '../components/MultimodalInput'

describe('MultimodalInput Component', () => {
  it('renders decision context and rationale inputs', () => {
    const fn = vi.fn()
    render(
      <MultimodalInput
        context=""
        onChangeContext={fn}
        rationale=""
        onChangeRationale={fn}
        onSubmit={vi.fn()}
      />
    )
    expect(screen.getByPlaceholderText(/e\.g\., Thinking of quitting my job to build an AI startup/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/e\.g\., I have 6 months of runway/i)).toBeInTheDocument()
  })

  it('triggers change handlers when user types', () => {
    const onChangeContext = vi.fn()
    const onChangeRationale = vi.fn()
    render(
      <MultimodalInput
        context=""
        onChangeContext={onChangeContext}
        rationale=""
        onChangeRationale={onChangeRationale}
        onSubmit={vi.fn()}
      />
    )
    const ctxInput = screen.getByPlaceholderText(/e\.g\., Thinking of quitting my job to build an AI startup/i)
    fireEvent.change(ctxInput, { target: { value: 'New Decision' } })
    expect(onChangeContext).toHaveBeenCalledWith('New Decision')
  })

  it('calls onSubmit when submit button is clicked with active inputs', () => {
    const onSubmit = vi.fn()
    render(
      <MultimodalInput
        context="Should I pivot?"
        onChangeContext={vi.fn()}
        rationale="Market is slowing"
        onChangeRationale={vi.fn()}
        onSubmit={onSubmit}
      />
    )
    const submitBtn = screen.getByRole('button', { name: /Explore My Assumptions/i })
    fireEvent.click(submitBtn)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('disables submit button when inputs are completely empty', () => {
    render(
      <MultimodalInput
        context=""
        onChangeContext={vi.fn()}
        rationale=""
        onChangeRationale={vi.fn()}
        onSubmit={vi.fn()}
      />
    )
    const submitBtn = screen.getByRole('button', { name: /Explore My Assumptions/i })
    expect(submitBtn).toBeDisabled()
  })
})
