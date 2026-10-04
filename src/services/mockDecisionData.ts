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

export const PRICING_MOCK: DecisionAnalysis = {
  summary: 'Removing our free plan and making all new users pay upfront.',
  clarityScore: 71,
  unstatedAssumptions: [
    {
      assumption: 'Free users are useless freeloaders who cost money.',
      vulnerability: 'HIGH',
      reasoning: 'Free users are often your best marketers. They share your app with friends, write reviews, and bring in the people who eventually pay.'
    },
    {
      assumption: 'People who won\'t pay today will happily pay if we put up a paywall.',
      vulnerability: 'MED',
      reasoning: 'If people are not already in love with your app, forcing them to pay upfront usually makes them leave immediately.'
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
      whatWentWrong: 'Month 4: Server costs went down by 50%, but new signups plummeted by 85% and overall revenue actually shrank.',
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
};

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
};

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
