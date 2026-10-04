import { DecisionAnalysis } from '../types/decision.types';

export const STARTUP_LEAP_MOCK: DecisionAnalysis = {
  summary: 'Quitting my full-time job to build an AI startup with 6 months of savings.',
  clarityScore: 62,
  unstatedAssumptions: [
    {
      assumption: 'Being good at coding is enough to build a successful startup.',
      vulnerability: 'HIGH',
      reasoning: 'Building the product is only 20% of the battle. Finding real people who will pay, marketing, and talking to customers is what decides if you survive.'
    },
    {
      assumption: '6 months of savings gives me plenty of time to become profitable.',
      vulnerability: 'HIGH',
      reasoning: 'Most new businesses take at least a year to make dependable income. By month 4 or 5, money anxiety often leads to rushed, desperate choices.'
    },
    {
      assumption: 'Having full days free will make me work twice as fast.',
      vulnerability: 'MED',
      reasoning: 'Without a boss or routine, it is very easy to spend weeks polishing tiny features instead of selling to real customers.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'Stress and panic spike once your personal savings drop below half.',
      impactArea: 'Mental Health & Energy'
    },
    {
      risk: 'A bigger company or free tool launches the exact same feature you spent months building.',
      impactArea: 'Competition'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 5: You built a working prototype, but have zero paying customers. Savings are almost gone and you have to take random freelance gigs.',
      catalyst: 'Spent 4 months coding in private instead of talking to 20 potential buyers first.'
    }
  ],
  socraticQuestions: [
    {
      question: 'Can you pre-sell this to 3 paying customers this weekend before submitting your resignation letter?',
      reasoningAngle: 'Testing customer demand before taking big risks'
    },
    {
      question: 'If you have zero income by month 4, what is your exact rule for whether you keep going or pause?',
      reasoningAngle: 'Setting a clear safety net in advance'
    },
    {
      question: 'Are you quitting because you love this startup idea, or because you are simply exhausted from your current job?',
      reasoningAngle: 'Honest motivation check: passion vs burnout'
    }
  ],
  nonDecisionPledge: 'ReasonLens never decides for you. We stress-test your logic so you decide with conviction.'
};

export const REWRITE_MOCK: DecisionAnalysis = {
  summary: 'Scrapping our web app and rebuilding it from scratch with a new tech stack.',
  clarityScore: 54,
  unstatedAssumptions: [
    {
      assumption: 'Starting fresh will permanently get rid of bugs and messy code.',
      vulnerability: 'HIGH',
      reasoning: 'The old code has years of hidden bug fixes and edge cases that will be accidentally forgotten and broken in a fresh rewrite.'
    },
    {
      assumption: 'Customers will wait patiently while we spend months rebuilding.',
      vulnerability: 'HIGH',
      reasoning: 'While you spend 6 months rebuilding what already exists, competitors will keep shipping new features and stealing your users.'
    },
    {
      assumption: 'Our team will build features twice as fast once the new stack is ready.',
      vulnerability: 'MED',
      reasoning: 'Learning new tools always takes time, and new codebases develop their own messy parts very quickly.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'Scope creep: adding new bells and whistles to the rewrite until it takes a year instead of 3 months.',
      impactArea: 'Product Deadlines'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 7: The rewrite is taking twice as long as expected, users are frustrated by a lack of updates, and the team is burned out.',
      catalyst: 'Underestimated all the hidden business rules that were buried in the old code.'
    }
  ],
  socraticQuestions: [
    {
      question: 'Can you fix the slowest 10% of the old code instead of tearing down the whole house?',
      reasoningAngle: 'Fixing the worst parts first vs starting over'
    },
    {
      question: 'What will you do if users start switching to a competitor while you are mid-rewrite?',
      reasoningAngle: 'Counting the cost of paused feature growth'
    },
    {
      question: 'What team habits will stop the new codebase from becoming just as messy in 18 months?',
      reasoningAngle: 'Fixing team habits, not just programming tools'
    }
  ],
  nonDecisionPledge: 'ReasonLens never decides for you. We stress-test your logic so you decide with conviction.'
};

import { PRICING_MOCK, CAREER_MOCK } from '../data/mockScenariosPart2';

export { PRICING_MOCK, CAREER_MOCK };

export function getMockAnalysis(context?: string): DecisionAnalysis {
  const query = (context || '').toLowerCase();
  if (query.includes('startup') || query.includes('job') || query.includes('savings')) {
    return STARTUP_LEAP_MOCK;
  }
  if (query.includes('rewrite') || query.includes('codebase') || query.includes('stack')) {
    return REWRITE_MOCK;
  }
  if (query.includes('pricing') || query.includes('free tier') || query.includes('paid')) {
    return PRICING_MOCK;
  }
  if (query.includes('placement') || query.includes('open-source') || query.includes('campus')) {
    return CAREER_MOCK;
  }
  return STARTUP_LEAP_MOCK;
}

export const MOCK_REASONLENS_ANALYSIS = STARTUP_LEAP_MOCK;
