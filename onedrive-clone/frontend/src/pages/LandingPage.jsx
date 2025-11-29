import { Link } from 'react-router-dom'
import { Cloud, Shield, Zap, Users, ArrowRight, Check } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8" style={{ color: '#45ADA8' }} />
              <span className="text-2xl font-bold" style={{ color: '#547980' }}>ShareHub</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-[#45ADA8] transition-colors">About</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Pricing</Link>
              <Link to="/help" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Help</Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Contact</Link>
              <Link to="/terms" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Terms</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-[#45ADA8] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-lg text-white transition-colors"
                style={{ backgroundColor: '#45ADA8' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#547980'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#45ADA8'}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#594F4F' }}>
              Your Files, Anywhere,
              <br />
              <span style={{ color: '#45ADA8' }}>Anytime</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Store, share, and collaborate on your files with ShareHub. 
              Secure cloud storage with powerful features for individuals and teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 rounded-lg text-white text-lg font-semibold transition-all transform hover:scale-105"
                style={{ backgroundColor: '#45ADA8' }}
              >
                Start Free Trial
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-lg text-lg font-semibold transition-all border-2"
                style={{ borderColor: '#9DE0AD', color: '#547980' }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#E5FCC2' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#594F4F' }}>
            Why Choose ShareHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#9DE0AD' }}>
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#547980' }}>Secure Storage</h3>
              <p className="text-gray-600">
                Enterprise-grade security with end-to-end encryption. Your files are protected with the highest security standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#45ADA8' }}>
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#547980' }}>Lightning Fast</h3>
              <p className="text-gray-600">
                Upload and download files at blazing speeds. Access your content instantly from anywhere in the world.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#547980' }}>
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#547980' }}>Easy Collaboration</h3>
              <p className="text-gray-600">
                Share files and folders with anyone. Collaborate in real-time with your team members effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#45ADA8' }}>10GB</div>
              <div className="text-gray-600">Free Storage</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#45ADA8' }}>100K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#45ADA8' }}>99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: '#45ADA8' }}>24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#547980' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of users who trust ShareHub for their cloud storage needs.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            style={{ backgroundColor: '#9DE0AD', color: '#547980' }}
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Cloud className="h-6 w-6" style={{ color: '#45ADA8' }} />
                <span className="text-xl font-bold" style={{ color: '#547980' }}>ShareHub</span>
              </div>
              <p className="text-gray-600 text-sm">
                Secure cloud storage for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#547980' }}>Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/pricing" className="text-gray-600 hover:text-[#45ADA8]">Pricing</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-[#45ADA8]">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#547980' }}>Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="text-gray-600 hover:text-[#45ADA8]">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-[#45ADA8]">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#547980' }}>Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-gray-600 hover:text-[#45ADA8]">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-[#45ADA8]">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2025 ShareHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
