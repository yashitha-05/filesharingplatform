import { Link } from 'react-router-dom'
import { Cloud, Search, Book, MessageCircle, FileText, Shield } from 'lucide-react'

export default function Help() {
  const topics = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of ShareHub and how to upload your first file',
      color: '#9DE0AD',
    },
    {
      icon: FileText,
      title: 'File Management',
      description: 'Organize, share, and manage your files effectively',
      color: '#45ADA8',
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Understanding how we protect your data',
      color: '#547980',
    },
    {
      icon: MessageCircle,
      title: 'Collaboration',
      description: 'Share and collaborate with your team',
      color: '#9DE0AD',
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
              <Link to="/pricing" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Pricing</Link>
              <Link to="/help" className="text-[#45ADA8] font-semibold">Help</Link>
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
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#594F4F' }}>How Can We Help?</h1>
          <p className="text-xl text-gray-700 mb-8">
            Find answers to common questions and learn how to make the most of ShareHub
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-300 focus:border-[#45ADA8] focus:outline-none text-lg"
            />
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#594F4F' }}>Browse Help Topics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {topics.map((topic, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#45ADA8]"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: topic.color }}>
                  <topic.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#547980' }}>{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: '#594F4F' }}>Common Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>How do I upload files?</h3>
              <p className="text-gray-600">Click the "Upload" button in your dashboard, select your files, and they'll be uploaded automatically.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>How do I share files with others?</h3>
              <p className="text-gray-600">Right-click on any file or folder, select "Share", and enter the email address of the person you want to share with.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>Can I access my files offline?</h3>
              <p className="text-gray-600">Yes, with our mobile and desktop apps, you can mark files for offline access.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#547980' }}>How secure is my data?</h3>
              <p className="text-gray-600">All files are encrypted in transit and at rest using industry-standard encryption protocols.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#547980' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Still Need Help?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Our support team is here to help you 24/7
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 rounded-lg text-lg font-semibold"
            style={{ backgroundColor: '#9DE0AD', color: '#547980' }}
          >
            Contact Support
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
