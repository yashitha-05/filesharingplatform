import { Link } from 'react-router-dom'
import { Cloud } from 'lucide-react'

export default function Terms() {
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
              <Link to="/help" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Help</Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#45ADA8] transition-colors">Contact</Link>
              <Link to="/terms" className="text-[#45ADA8] font-semibold">Terms</Link>
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
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#594F4F' }}>Terms & Conditions</h1>
          <p className="text-xl text-gray-700">
            Last updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="space-y-8 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>1. Acceptance of Terms</h2>
              <p>
                By accessing and using ShareHub, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on ShareHub for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
              <p className="mt-4">Under this license you may not:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on ShareHub</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>3. User Account</h2>
              <p>
                To use certain features of ShareHub, you must register for an account. You agree to provide accurate, 
                current, and complete information during the registration process and to update such information to keep it accurate.
              </p>
              <p className="mt-4">
                You are responsible for safeguarding your password and for all activities that occur under your account. 
                You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>4. Content</h2>
              <p>
                You retain all rights to the content you upload to ShareHub. By uploading content, you grant ShareHub 
                a worldwide, non-exclusive, royalty-free license to store, backup, and display your content solely for 
                the purpose of providing the service.
              </p>
              <p className="mt-4">
                You are solely responsible for the content you upload and share. You agree not to upload content that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Violates any laws or regulations</li>
                <li>Infringes on intellectual property rights</li>
                <li>Contains malware or harmful code</li>
                <li>Is offensive, threatening, or harassing</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>5. Storage Limits</h2>
              <p>
                Each account is subject to storage limits based on the selected plan. We reserve the right to 
                modify storage limits with reasonable notice. If you exceed your storage limit, you may be required 
                to upgrade your plan or remove files.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>6. Privacy</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your 
                personal information. By using ShareHub, you agree to our Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>7. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the service immediately, without prior notice, 
                for any reason, including if you breach these Terms. Upon termination, your right to use the service 
                will immediately cease.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>8. Limitation of Liability</h2>
              <p>
                ShareHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use or inability to use the service. Our total liability shall not exceed the amount 
                you paid us in the past twelve months.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes 
                via email or through the service. Your continued use of ShareHub after such modifications constitutes 
                your acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>10. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-4">
                Email: legal@sharehub.com<br />
                Address: 123 Cloud Street, San Francisco, CA 94102
              </p>
            </div>
          </div>
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
