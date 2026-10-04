import { DecisionAnalysis } from '../types/decision.types';

export const STARTUP_LEAP_MOCK: DecisionAnalysis = {
  summary: 'Resigning full-time employment to build an AI startup with 6 months cash savings.',
  clarityScore: 62,
  unstatedAssumptions: [
    {
      assumption: 'Technical ability to build an AI product is the bottleneck to early startup success.',
      vulnerability: 'HIGH',
      reasoning: 'AI tech barriers have collapsed; the real friction is distribution, buyer discovery, and sustained retention.'
    },
    {
      assumption: '6 months of personal runway is sufficient to find product-market fit and generate living revenue.',
      vulnerability: 'HIGH',
      reasoning: 'Average time to seed-stage revenue or funding in B2B/B2C AI is 11–14 months. Month 4 panic causes distressed decisions.'
    },
    {
      assumption: 'Full-time commitment will unlock exponential productivity compared to evenings and weekends.',
      vulnerability: 'MED',
      reasoning: 'Without structured accountability and customer feedback loops, unstructured full-time hours frequently lead to rabbit holes.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'Burnout and emotional stress spikes once personal savings cross the 50% drawdown threshold.',
      impactArea: 'Mental Resilience & Conviction'
    },
    {
      risk: 'Rapid commoditization by foundation model platform updates (e.g. OpenAI or Google shipping your core feature).',
      impactArea: 'Competitive Moat'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 5: Built an impressive multimodal agent, but zero paying customers. Savings down to 4 weeks; forced to take contract work.',
      catalyst: 'Spent 16 weeks polishing code before having 20 customer discovery interviews.'
    }
  ],
  socraticQuestions: [
    {
      question: 'What is the single riskiest assumption about customer willingness-to-pay that you could test this Saturday without quitting your job?',
      reasoningAngle: 'De-risking through lean pre-mortems'
    },
    {
      question: 'When your savings reach month 4 with zero revenue, what objective rule determines whether you pivot, fundraise, or pause?',
      reasoningAngle: 'Pre-committing to exit and pivot tripwires'
    },
    {
      question: 'Are you leaving your job because you are deeply pulled by this specific customer pain, or because you are pushed by burnout?',
      reasoningAngle: 'Internal motivation audit: Push vs Pull'
    }
  ],
  nonDecisionPledge: 'ReasonLens does not choose your path. High-stakes conviction belongs to human founders — our role is solely to illuminate the terrain.'
};

export const REWRITE_MOCK: DecisionAnalysis = {
  summary: 'Total architecture rewrite of web application from scratch in a modern stack.',
  clarityScore: 54,
  unstatedAssumptions: [
    {
      assumption: 'A greenfield rewrite will avoid the architectural bugs and technical debt of the legacy system.',
      vulnerability: 'HIGH',
      reasoning: 'The old codebase contains hundreds of unwritten edge-case fixes that will be inadvertently wiped out in a fresh rewrite.'
    },
    {
      assumption: 'Product velocity will instantly surge once the new stack is deployed.',
      vulnerability: 'MED',
      reasoning: 'Team familiarity with new abstractions takes 3–6 months to stabilize, offsetting initial theoretical velocity gains.'
    },
    {
      assumption: 'Competitors and users will wait patiently during the 6-month feature freeze.',
      vulnerability: 'HIGH',
      reasoning: 'A total rewrite pauses customer-facing feature delivery, causing user churn and lost market momentum.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'The "Second-System Effect": temptation to over-engineer and inflate scope into the new platform.',
      impactArea: 'Engineering Timelines & Delivery'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 7: Rewrite is only 70% complete, legacy system is breaking from neglect, and team is demoralized maintaining two branches.',
      catalyst: 'Underestimated the hidden business logic embedded in legacy edge-case handlers.'
    }
  ],
  socraticQuestions: [
    {
      question: 'Can you isolate the top 10% of legacy code causing 80% of bugs and strangle it incrementally rather than rewriting everything?',
      reasoningAngle: 'Strangler fig pattern vs Big Bang risk'
    },
    {
      question: 'What happens to customer churn if your competitor releases 3 major requested features while you are 4 months into the rewrite?',
      reasoningAngle: 'Opportunity cost and competitive exposure'
    },
    {
      question: 'What structural engineering discipline will prevent the new codebase from degrading into the exact same state in 18 months?',
      reasoningAngle: 'Root-cause process vs syntax delusion'
    }
  ],
  nonDecisionPledge: 'ReasonLens does not choose your path. High-stakes conviction belongs to human architects — our role is solely to illuminate the terrain.'
};

export const PRICING_MOCK: DecisionAnalysis = {
  summary: 'Deprecating free tier and converting product to upfront paid subscription model.',
  clarityScore: 71,
  unstatedAssumptions: [
    {
      assumption: 'Free users are non-essential dead weight whose churn will not impact growth.',
      vulnerability: 'HIGH',
      reasoning: 'Free users frequently drive top-of-funnel virality, organic SEO backlinks, and peer-to-peer word-of-mouth recommendations.'
    },
    {
      assumption: 'Eliminating the free tier will automatically increase paid conversion rates.',
      vulnerability: 'MED',
      reasoning: 'Without a risk-free playground to experience value, top-of-funnel visitor signups may drop by 80%+.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'Backlash on social platforms (Hacker News, Reddit, Twitter) from sudden rug-pull of free features.',
      impactArea: 'Brand Equity & Community Trust'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 4: Server costs dropped 50%, but new customer acquisition cratered 85%; net revenue shrank below previous baseline.',
      catalyst: 'Failed to recognize that word-of-mouth advocacy was almost entirely powered by free power users.'
    }
  ],
  socraticQuestions: [
    {
      question: 'What percentage of your current paying customers initially signed up as free users and upgraded months later?',
      reasoningAngle: 'Lagged conversion attribution'
    },
    {
      question: 'Have you considered usage-based friction limits (e.g. 5 actions/month) instead of a binary paywall?',
      reasoningAngle: 'Granular gatekeeper monetization'
    },
    {
      question: 'How will you maintain organic discovery when your free community stops recommending your tool to colleagues?',
      reasoningAngle: 'Organic distribution decay'
    }
  ],
  nonDecisionPledge: 'ReasonLens does not choose your path. High-stakes conviction belongs to human founders — our role is solely to illuminate the terrain.'
};

export const CAREER_MOCK: DecisionAnalysis = {
  summary: 'Opting out of campus placements to pursue open-source contributions full-time.',
  clarityScore: 59,
  unstatedAssumptions: [
    {
      assumption: 'Hiring managers at top engineering companies actively scout public GitHub PRs.',
      vulnerability: 'HIGH',
      reasoning: 'Most corporate recruiting funnels rely on ATS keyword filters, campus pipelines, and automated screening algorithms.'
    },
    {
      assumption: 'High-quality open-source code will speak louder than formal credential gates and HR screens.',
      vulnerability: 'MED',
      reasoning: 'While senior engineers appreciate code, you still must navigate HR coordinators who prioritize formal degree verification.'
    }
  ],
  blindSpotRisks: [
    {
      risk: 'Loss of peer support network and structured interview fallback during the prime college recruitment cycle.',
      impactArea: 'Career Security & Momentum'
    }
  ],
  preMortemScenarios: [
    {
      whatWentWrong: 'Month 6: Outstanding contributions merged into 3 OSS repos, but 0 interview invites received; peer group already placed.',
      catalyst: 'Lacked direct personal relationships with maintainers and hiring directors who have outbound hiring authority.'
    }
  ],
  socraticQuestions: [
    {
      question: 'Can you secure 1 baseline campus offer first, and use the security of that offer to negotiate remote OSS roles without existential anxiety?',
      reasoningAngle: 'Asymmetric downside capping'
    },
    {
      question: 'Who is the specific individual at your target company who will sponsor your hiring loop based on your GitHub profile?',
      reasoningAngle: 'Named champion vs hopeful meritocracy'
    },
    {
      question: 'If you fail to get hired via GitHub in 9 months, what is your systematic fallback plan?',
      reasoningAngle: 'Worst-case survival contingency'
    }
  ],
  nonDecisionPledge: 'ReasonLens does not choose your path. High-stakes conviction belongs to human decision-makers — our role is solely to illuminate the terrain.'
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
