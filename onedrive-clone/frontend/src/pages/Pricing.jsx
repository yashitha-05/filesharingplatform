import { Link } from 'react-router-dom'
import { Cloud, Check } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      storage: '10 GB',
      features: [
        '10 GB Storage',
        'Basic file sharing',
        'Mobile app access',
        'Email support',
      ],
      color: '#9DE0AD',
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      storage: '100 GB',
      features: [
        '100 GB Storage',
        'Advanced sharing options',
        'Priority support',
        'File versioning',
        'Collaboration tools',
        'Mobile & desktop apps',
      ],
      color: '#45ADA8',
      popular: true,
    },
    {
      name: 'Business',
      price: '$19.99',
      period: 'per month',
      storage: '1 TB',
      features: [
        '1 TB Storage',
        'Team collaboration',
        'Admin controls',
        'Advanced security',
        '24/7 Priority support',
        'Custom branding',
        'API access',
        'Unlimited file versioning',
      ],
      color: '#547980',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Cloud className="h-8 w-8" style={{ color: '#45ADA8' }} />
              <span className="text-2xl font-bold" style={{ color: '#547980' }}>ShareHub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#45ADA8] transition-colors">About</Link>
              <Link to="/pricing" className="text-[#45ADA8] font-semibold">Pricing</Link>
              <Link to="/help" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Help</Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Contact</Link>
              <Link to="/terms" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Terms</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-[#45ADA8]">Login</Link>
              <Link to="/register" className="px-6 py-2 rounded-lg text-white" style={{ backgroundColor: '#45ADA8' }}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#E5FCC2' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#594F4F' }}>Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-700">
            Choose the perfect plan for your needs. Upgrade or downgrade anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
                  plan.popular ? 'border-4' : 'border'
                }`}
                style={{ borderColor: plan.popular ? plan.color : '#E5E7EB' }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-semibold"
                    style={{ backgroundColor: plan.color }}
                  >
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#594F4F' }}>{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2" style={{ color: '#547980' }}>{plan.storage}</div>
                    <div className="text-gray-600">of storage</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-all ${
                      plan.popular ? 'text-white' : 'border-2'
                    }`}
                    style={{
                      backgroundColor: plan.popular ? plan.color : 'transparent',
                      borderColor: plan.color,
                      color: plan.popular ? 'white' : plan.color,
                    }}
                  >
                    {plan.name === 'Free' ? 'Start Free' : 'Get Started'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#594F4F' }}>Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">Yes, you can change your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>Is there a free trial?</h3>
              <p className="text-gray-600">Yes! Our Free plan is available forever with 10GB storage. No credit card required.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>What happens if I exceed my storage limit?</h3>
              <p className="text-gray-600">You'll be notified and can upgrade your plan or remove files to free up space.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#547980' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Start with our free plan today. No credit card required.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 rounded-lg text-lg font-semibold"
            style={{ backgroundColor: '#9DE0AD', color: '#547980' }}
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          © 2025 ShareHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
