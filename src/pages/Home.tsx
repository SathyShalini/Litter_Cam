import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Zap, Users, BarChart3, Lock } from 'lucide-react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Combat Littering with AI Technology</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              LitterCam uses advanced AI to detect and document littering incidents in real-time,
              helping create cleaner and safer communities.
            </p>
            <Link
              to="/demo"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try Demo Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Features</h2>
            <p className="text-xl text-gray-600">Cutting-edge technology for environmental protection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-500" />}
              title="AI-Powered Detection"
              description="Advanced computer vision algorithms detect littering incidents with high accuracy"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-blue-500" />}
              title="Real-time Processing"
              description="Process video footage in real-time for immediate violation detection"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-500" />}
              title="Facial Recognition"
              description="Identify individuals involved in littering incidents"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
              title="Analytics Dashboard"
              description="Comprehensive reporting and analytics for tracking incidents"
            />
            <FeatureCard
              icon={<Lock className="w-8 h-8 text-blue-500" />}
              title="Secure Storage"
              description="Encrypted storage of all captured data and evidence"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8 text-blue-500" />}
              title="High Accuracy"
              description="Over 99% accuracy in detecting and documenting violations"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">
            Join the fight against littering with our cutting-edge AI technology.
          </p>
          <Link
            to="/demo"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;