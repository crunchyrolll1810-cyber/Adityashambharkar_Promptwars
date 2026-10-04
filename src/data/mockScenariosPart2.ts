import { DecisionAnalysis } from '../types/decision.types'

export const PRICING_MOCK: DecisionAnalysis = {
  summary: 'Removing our free plan and making all new users pay upfront.',
  clarityScore: 71,
  unstatedAssumptions: [
    {
      assumption: 'Free users are useless freeloaders who cost money.',
      vulnerability: 'HIGH',
      reasoning: 'Free users are often your best marketers. They share your app with friends and bring in paying customers.'
    },
    {
      assumption: "People who won't pay today will happily pay if we put up a paywall.",
      vulnerability: 'MED',
      reasoning: 'If people are not already in love with your app, forcing them to pay upfront usually makes them leave.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'Angry social media posts from existing users who feel like a free tool was taken away.',
      impactArea: 'Reputation & Trust'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 4: Server costs went down by 50%, but new signups plummeted by 85% and overall revenue shrank.',
      catalyst: 'Word of mouth dried up because students and everyday users could no longer try the tool.'
    }
  ],
  socraticQuestions: [
    {
      question: 'How many of your current paying users originally started as free users?',
      reasoningAngle: 'Understanding where your paying customers come from'
    },
    {
      question: 'Could you add a simple usage limit (like 10 uses a month) instead of shutting out free users completely?',
      reasoningAngle: 'Soft limits vs hard paywalls'
    },
    {
      question: 'Where will new people hear about your app once free users stop recommending it to colleagues?',
      reasoningAngle: 'Keeping your word-of-mouth growth alive'
    }
  ],
  nonDecisionPledge: 'ReasonLens never decides for you. We stress-test your logic so you decide with conviction.'
}

export const CAREER_MOCK: DecisionAnalysis = {
  summary: 'Skipping college placement interviews to focus solely on open-source coding.',
  clarityScore: 59,
  unstatedAssumptions: [
    {
      assumption: 'Company recruiters regularly look through public GitHub pull requests to hire candidates.',
      vulnerability: 'HIGH',
      reasoning: 'Most corporate hiring relies on standard campus interviews, resume filters, and referrals, not inspecting personal code repositories.'
    },
    {
      assumption: 'Writing good code is the only thing needed to get a job offer.',
      vulnerability: 'MED',
      reasoning: 'Companies also test communication, problem solving on a whiteboard, and whether someone inside the company recommended you.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'Losing the safety net of campus hiring when all your batchmates secure jobs.',
      impactArea: 'Career Security'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 6: Your code got accepted into popular projects, but you have zero job offers and the campus hiring season is closed.',
      catalyst: 'Lacked direct connections with engineering managers who have the authority and budget to hire.'
    }
  ],
  socraticQuestions: [
    {
      question: 'Can you secure one safe campus job offer first, and then contribute to open-source without daily anxiety?',
      reasoningAngle: 'Keeping a safety net while pursuing your passion'
    },
    {
      question: 'Do you know a specific engineer at your target company who will vouch for your pull requests?',
      reasoningAngle: 'Having a real sponsor vs hoping to be discovered'
    },
    {
      question: 'If you do not get a job offer in 6 months, what is your step-by-step backup plan?',
      reasoningAngle: 'Planning for the worst-case scenario'
    }
  ],
  nonDecisionPledge: 'ReasonLens never decides for you. We stress-test your logic so you decide with conviction.'
}
