import { Link } from 'react-router-dom'
import { Cloud, Target, Heart, Globe } from 'lucide-react'

export default function About() {
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
              <Link to="/about" className="text-[#45ADA8] font-semibold">About</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Pricing</Link>
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
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#594F4F' }}>About ShareHub</h1>
          <p className="text-xl text-gray-700">
            We're on a mission to make cloud storage simple, secure, and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12" style={{ color: '#547980' }}>Developers of ShareHub</h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            {/* Yashitha */}
            <div className="text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXjH7VTveUu2mYOzPrmNId0NeWMQeQMLtadg&s-vector/software-developer-vector-illustration-communication-technology-cyber-security_1249867-5464.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Yashitha"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
              />
              <h4 className="text-xl font-semibold" style={{ color: '#594F4F' }}>Yashitha</h4>
            </div>

            {/* Sneha */}
            <div className="text-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/242/494/non_2x/vector-female-developer.jpg"
                alt="Sneha"
                className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md"
              />
              <h4 className="text-xl font-semibold" style={{ color: '#594F4F' }}>Sneha</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#9DE0AD' }}>
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>Our Mission</h3>
              <p className="text-gray-600">
                To provide secure, reliable, and affordable cloud storage solutions that empower individuals and businesses to work smarter.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#45ADA8' }}>
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>Our Values</h3>
              <p className="text-gray-600">
                Security, simplicity, and customer satisfaction are at the core of everything we do. Your trust is our priority.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#547980' }}>
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>Our Vision</h3>
              <p className="text-gray-600">
                To become the world's most trusted cloud storage platform, connecting people and their data seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: '#594F4F' }}>Our Story</h2>
          <div className="space-y-6 text-gray-700 text-lg">
            <p>
              ShareHub was founded in 2025 with a simple idea: cloud storage should be easy, secure, and accessible to everyone. 
              We noticed that existing solutions were either too complex, too expensive, or lacked the security features that users truly needed.
            </p>
            <p>
              Our team of passionate developers and security experts came together to build something different. 
              We created ShareHub with a focus on user experience, robust security, and fair pricing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#547980' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Us Today</h2>
          <p className="text-xl text-gray-200 mb-8">
            Experience the ShareHub difference. Start with 10GB free storage.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 rounded-lg text-lg font-semibold"
            style={{ backgroundColor: '#9DE0AD', color: '#547980' }}
          >
            Get Started Free
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
