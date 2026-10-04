export interface QuestionDef {
  id: string
  title: string
  subtitle: string
  options: {
    id: string
    label: string
    hint: string
    icon: string
  }[]
}

export const CALIBRATION_QUESTIONS: QuestionDef[] = [
  {
    id: 'reversibility',
    title: '1. Reversibility (Stakes)',
    subtitle: 'If this doesn’t pan out, how hard is it to walk back?',
    options: [
      { id: 'irreversible', label: 'Burn the boats', hint: 'Very costly or impossible to undo', icon: '🔥' },
      { id: 'moderate', label: 'Takes 6–12 months', hint: 'Noticeable setback, manageable with planning', icon: '⏳' },
      { id: 'reversible', label: 'Easily reversible', hint: 'Can return within weeks with minimal loss', icon: '↩️' }
    ]
  },
  {
    id: 'evidence',
    title: '2. Real-World Proof',
    subtitle: 'What evidence do you have that this will actually work?',
    options: [
      { id: 'gut', label: 'Gut feeling & intuition', hint: 'No external validation yet, strong personal belief', icon: '💡' },
      { id: 'conversations', label: 'Friendly feedback', hint: 'Talked to peers or mentors who liked it', icon: '🗣️' },
      { id: 'hard_proof', label: 'Hard commitments & data', hint: 'Signed letters, paying pilots, or retention data', icon: '📊' }
    ]
  },
  {
    id: 'runway',
    title: '3. Safety Buffer',
    subtitle: 'What is your cushion if everything takes twice as long?',
    options: [
      { id: 'zero', label: 'Zero cushion', hint: 'Must work right away, zero margin for error', icon: '⚠️' },
      { id: 'moderate', label: '3 to 6 months buffer', hint: 'Modest savings or freelance backup', icon: '🛡️' },
      { id: 'large', label: '12+ months safety net', hint: 'Healthy runway or passive income support', icon: '🏰' }
    ]
  }
]
