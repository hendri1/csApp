export const ApiVariable = Object.freeze({
  apiDev: 'https://dev.creditspring.com.au',
  apiReal: 'https://creditspring.com.au'
});

export const menuHeader = Object.freeze({
  count: 3,
  menu: [
    {id: 1, title: 'Account Settings', icon: 'settings', link: 'account-settings' },
    {id: 2, title: 'How it works', icon: 'information-circle-outline', link: 'how-it-works' },
    {id: 3, title: 'Contact Us', icon: 'mail', link: 'contact-us' },
  ]
});

export const menuFooter = Object.freeze({
  count: 4,
  menu: [
    {id: 1, active_class: ['dashboard', 'dashboard-help'], icon: 'apps', link: 'dashboard' },
    {id: 2, active_class: ['reports'], icon: 'paper', link: 'reports' },
    {id: 3, active_class: ['offers'], icon: 'card', link: 'offers' },
    {id: 4, active_class: ['history'], icon: 'stats', link: 'history' },
  ]
});

export const introSlides = Object.freeze({
  count: 3,
  slides: [
    {id: 1, title: 'Know where you stand', message: 'Use our interactive Credit dashboard to understand what\'s driving your score & how to improve it.', image:'/assets/img/d_1.svg'},
    {id: 2, title: 'Get your FREE Credit Score', message: 'We believe access to your personal credit score is your right, and an important step on your way to financial health.', image:'/assets/img/d_2.svg'},
    {id: 3, title: 'Get a better deal', message: 'Depending on your score, you may be eligible for a better rate than what you currently have or have been quoted.', image:'/assets/img/d_3.svg'},
  ]
});

export const dashboardHelp = Object.freeze({
  count: 4,
  data: [
    {id: 1, title: 'Your Personal Dashboard', message: 'Here you can get a quick update on your <strong>CreditSpring</strong> credit score, whether your score has changed, your debt levels and the number of days until your next report is ready. To see your credit history in more detail, go to your <strong>report</strong>.'},
    {id: 2, title: 'Your CreditSpring Credit Score', message: 'This is calculated based on the information in your credit report and is out of 700.'},
    {id: 3, title: 'Your short term debt total', message: 'This is calculated by adding together all your credit cards, utility bills and short term borrowing as shown on your credit report.'},
    {id: 4, title: 'Your long term debt total', message: 'This is calculated by adding together all your mortgage'},
  ]
});

export const offersData = Object.freeze({
  count: 6,
  data: [
    {id: 1, title: 'Compare Health Insurance and Save!', message: 'Interested in saving hundreds on your health insurance policy? Speak to one of our health insurance advisors and you could save $320 in 15 minutes!', image:'/assets/img/offers_1.png'},
    {id: 2, title: 'Compare Energy Prices & Start Saving Today!', message: 'At Electricityandgas.com.au, we understand that life is busy. This is why we are here to help you handle the time consuming paperwork once you have made your decision on an energy plan.', image:'/assets/img/offers_2.png'},
    {id: 3, title: 'Looking for Life Insurance?', message: 'Most Australians are inadequately prepared for the financial devastation that follows when losing a loved one. When a family loses one income due to injury or death, the ripple effect can be huge.', image:'/assets/img/offers_3.png'},
    {id: 4, title: 'Looking to Buy or Refinance?', message: 'Whether it’s your first home or you’re refinancing an existing loan, let us help you with your home loan decision through a phone consultation with a licensed home loan professional.', image:'/assets/img/offers_4.png'},
    {id: 5, title: 'Compare Broadband Plans & Save!', message: 'Kids need the internet for homework? Can’t live without Netflix? Or maybe you just want to do some light browsing on Facebook? We’ll help you find a plan that matches your needs.', image:'/assets/img/offers_5.png'},
    {id: 6, title: 'We help you compare credit cards.', message: 'Finding a better credit card shouldn\'t be a daunting task. That\'s why we put ease of use, speed, fairness, and transparency at the very core of what we do.', image:'/assets/img/offers_6.png'},
  ]
});