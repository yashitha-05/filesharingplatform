import { Link } from 'react-router-dom'
import { Cloud } from 'lucide-react'

export default function Privacy() {
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
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#594F4F' }}>Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>1. Introduction</h2>
              <p>
                At ShareHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our cloud storage service. Please read this 
                privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not 
                access the service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Create an account</li>
                <li>Upload, download, or share files</li>
                <li>Contact our support team</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="mt-4">
                The types of information we may collect include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Name and email address</li>
                <li>Password and security credentials</li>
                <li>Payment information (processed securely by third-party payment processors)</li>
                <li>Files and content you upload to our service</li>
                <li>Usage data and analytics</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices, updates, and security alerts</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>4. Data Storage and Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Encryption of data in transit and at rest using industry-standard protocols</li>
                <li>Regular security assessments and audits</li>
                <li>Restricted access to personal information on a need-to-know basis</li>
                <li>Secure data centers with physical security controls</li>
                <li>Regular backups to prevent data loss</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we 
                strive to use commercially acceptable means to protect your information, we cannot guarantee its 
                absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>5. Sharing Your Information</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>With your consent:</strong> When you explicitly authorize us to share your information</li>
                <li><strong>Service providers:</strong> With third-party vendors who perform services on our behalf</li>
                <li><strong>Legal requirements:</strong> When required by law or to respond to legal process</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Protection:</strong> To protect the rights, property, or safety of ShareHub, our users, or others</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>6. Your Rights and Choices</h2>
              <p>
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Data portability:</strong> Request a copy of your data in a structured format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@sharehub.com. We will respond to your 
                request within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and store certain 
                information. Cookies are files with a small amount of data that are sent to your browser from a 
                website and stored on your device.
              </p>
              <p className="mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                However, if you do not accept cookies, you may not be able to use some portions of our service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and fulfill 
                the purposes outlined in this privacy policy. When you delete your account, we will delete your 
                personal information within 30 days, except where we are required to retain it for legal or 
                regulatory purposes.
              </p>
              <p className="mt-4">
                Files you upload are retained until you delete them or close your account. Deleted files are 
                permanently removed from our systems within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>9. Children's Privacy</h2>
              <p>
                Our service is not intended for children under the age of 13. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe your child has 
                provided us with personal information, please contact us, and we will delete such information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and maintained on servers located outside of your state, 
                province, country, or other governmental jurisdiction where data protection laws may differ. By 
                using our service, you consent to the transfer of your information to our facilities and those 
                third parties with whom we share it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>11. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
                this Privacy Policy periodically for any changes.
              </p>
              <p className="mt-4">
                Changes to this Privacy Policy are effective when they are posted on this page. Your continued use 
                of the service after we post any modifications constitutes your acceptance of the new Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#547980' }}>12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p className="mt-4">
                Email: privacy@sharehub.com<br />
                Address: 123 Cloud Street, San Francisco, CA 94102<br />
                Phone: +1 (555) 123-4567
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
