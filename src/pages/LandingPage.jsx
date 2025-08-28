import {
  ArrowRight,
  Users,
  Calendar,
  Briefcase,
  Network,
  CheckCircle,
  Star,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const LandingPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50"></div>

        {/* Abstract Animated Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-200/40 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-sky-200/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-blue-300/50 rounded-full blur-md animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            <div className="text-left">
               <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Discover Events, Clubs &{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Opportunities
                </span>{' '}
                Near You
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with like-minded students, join amazing clubs, attend
                exciting events, and discover internship opportunities that
                shape your future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-blue-200 hover:border-blue-300 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-50">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Animated Illustration Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl rotate-12 animate-pulse"></div>
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl -rotate-12 animate-bounce"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-sky-400 rounded-xl rotate-45 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Four simple steps to unlock your potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Join Events
              </h3>
              <p className="text-gray-600">
                Discover and participate in exciting events happening around
                your campus and city.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Find Clubs
              </h3>
              <p className="text-gray-600">
                Connect with clubs that match your interests and build lasting
                friendships.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 hover:from-sky-100 hover:to-cyan-100 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Discover Internships
              </h3>
              <p className="text-gray-600">
                Find internship opportunities that align with your career goals
                and interests.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Build Connections
              </h3>
              <p className="text-gray-600">
                Network with peers, mentors, and industry professionals to
                accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events / Clubs Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Events & Clubs
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss out on these amazing opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                    Event
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />2 days
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tech Innovation Summit
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  Stanford University
                </div>
                <p className="text-gray-600 text-sm">
                  Join industry leaders discussing the future of technology and
                  innovation.
                </p>
              </div>
            </div>

            {/* Club Card 1 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-cyan-400 to-blue-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-cyan-100 text-cyan-800 rounded-full">
                    Club
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    2.5k
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Entrepreneurship Society
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  UC Berkeley
                </div>
                <p className="text-gray-600 text-sm">
                  Connect with aspiring entrepreneurs and build your startup
                  dreams together.
                </p>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-sky-400 to-indigo-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-sky-100 text-sky-800 rounded-full">
                    Workshop
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />1 week
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Design Thinking Workshop
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  MIT Campus
                </div>
                <p className="text-gray-600 text-sm">
                  Master the art of design thinking and human-centered problem
                  solving.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Events & Clubs
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose ConnectU?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Community-Driven Platform
                    </h3>
                    <p className="text-gray-600">
                      Built by students, for students. Our platform grows with
                      your community's needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Verified Opportunities
                    </h3>
                    <p className="text-gray-600">
                      All events, clubs, and internships are verified to ensure
                      quality and legitimacy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Seamless Experience
                    </h3>
                    <p className="text-gray-600">
                      Intuitive design and smart recommendations make finding
                      opportunities effortless.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Illustration Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-24 h-24 bg-blue-500 rounded-2xl animate-pulse"></div>
                  <div className="w-24 h-24 bg-cyan-500 rounded-2xl animate-bounce"></div>
                  <div className="w-24 h-24 bg-sky-500 rounded-2xl animate-pulse"></div>
                  <div className="w-24 h-24 bg-indigo-500 rounded-2xl animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our amazing community members
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "ConnectU helped me find my passion for robotics through the
                  Engineering Club. I've made lifelong friends and learned so
                  much!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"></div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-gray-600 text-sm">
                      Computer Science, Stanford
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "The internship opportunities I discovered through ConnectU
                  opened doors I never knew existed. Now I'm working at my dream
                  company!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">Michael Chen</p>
                    <p className="text-gray-600 text-sm">
                      Business, UC Berkeley
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "From attending hackathons to joining the debate society,
                  ConnectU has been my gateway to an amazing college
                  experience."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full"></div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">
                      Emily Rodriguez
                    </p>
                    <p className="text-gray-600 text-sm">Pre-Med, Harvard</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows for future slider functionality */}
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-ping"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Student Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students who are already discovering amazing
            opportunities, building connections, and shaping their futures.
          </p>
          <button className="group bg-white hover:bg-gray-50 text-blue-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
            <span className="relative z-10">Join Now - It's Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="absolute inset-0 rounded-xl ring-4 ring-white/30 group-hover:ring-white/60 transition-all"></div>
          </button>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
