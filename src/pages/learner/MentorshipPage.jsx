import React, { useState } from 'react';
import { Users, Star, Search, Filter, MessageCircle, Video, Award } from 'lucide-react';

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const mockMentors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      expertise: ['Career Guidance', 'Tech Industry', 'Software Development', 'Interview Prep'],
      bio: 'Experienced software engineer with 8 years at Google. Passionate about helping students break into tech and navigate their career growth.',
      rating: 4.9,
      reviews: 127,
      availability: 'available',
      imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '8+ years in Tech'
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Study Abroad Consultant',
      company: 'EduConsult International',
      expertise: ['Study Abroad', 'University Applications', 'Visa Guidance', 'Scholarships'],
      bio: 'Former international student advisor with expertise in helping students navigate study abroad applications and cultural transitions.',
      rating: 4.8,
      reviews: 89,
      availability: 'available',
      imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '6+ years in Education'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      title: 'Research Director',
      company: 'MIT Research Lab',
      expertise: ['Research Methods', 'PhD Applications', 'Academic Writing', 'Grant Applications'],
      bio: 'Research director with extensive experience in academic research and PhD admissions. Helps students excel in research and academia.',
      rating: 4.9,
      reviews: 156,
      availability: 'busy',
      imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '10+ years in Academia'
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'Startup Founder & CEO',
      company: 'TechStart Innovations',
      expertise: ['Entrepreneurship', 'Startup Strategy', 'Business Development', 'Fundraising'],
      bio: 'Serial entrepreneur who has founded 3 successful startups. Mentors aspiring entrepreneurs on business strategy and startup execution.',
      rating: 4.7,
      reviews: 203,
      availability: 'available',
      imageUrl: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '12+ years in Business'
    },
    {
      id: '5',
      name: 'Priya Patel',
      title: 'Investment Banking Analyst',
      company: 'Goldman Sachs',
      expertise: ['Finance Career', 'Banking Industry', 'Financial Analysis', 'CFA Prep'],
      bio: 'Investment banking professional with expertise in financial markets. Helps students understand finance careers and industry requirements.',
      rating: 4.8,
      reviews: 74,
      availability: 'available',
      imageUrl: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '5+ years in Finance'
    },
    {
      id: '6',
      name: 'James Wilson',
      title: 'Creative Director',
      company: 'Design Studio Pro',
      expertise: ['Creative Industries', 'Design Career', 'Portfolio Building', 'Freelancing'],
      bio: 'Award-winning creative director with experience in advertising and design. Mentors students pursuing creative careers.',
      rating: 4.6,
      reviews: 91,
      availability: 'unavailable',
      imageUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      experience: '9+ years in Design'
    }
  ];

  const expertiseAreas = [
    'all', 'Career Guidance', 'Study Abroad', 'Tech Industry', 'Entrepreneurship', 
    'Research Methods', 'Finance Career', 'Creative Industries'
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Mentors' },
    { value: 'available', label: 'Available Now' },
    { value: 'busy', label: 'Busy (Limited)' },
    { value: 'unavailable', label: 'Unavailable' }
  ];

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesExpertise = expertiseFilter === 'all' || mentor.expertise.includes(expertiseFilter);
    const matchesAvailability = availabilityFilter === 'all' || mentor.availability === availabilityFilter;
    
    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'unavailable': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'unavailable': return 'Unavailable';
      default: return 'Unknown';
    }
  };

  return (
  <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-gradient-to-br from-blue-910 to-blue-950">
      {/* Header section: Title and description */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-2">Find Your Mentor</h1>
        <p className="text-blue-300">Connect with experienced professionals who can guide your career and study abroad journey</p>
      </div>

      {/* Search and Filters section */}
      <div className="bg-blue-950 rounded-xl shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search input for mentor name, title, or expertise */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search mentors by name, title, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Expertise Filter dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <select
              value={expertiseFilter}
              onChange={(e) => setExpertiseFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {expertiseAreas.map(area => (
                <option key={area} value={area}>
                  {area === 'all' ? 'All Expertise Areas' : area}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter dropdown */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {availabilityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mentors Grid: Display filtered mentor cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="bg-blue-950 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2">
            {/* Mentor image and badges */}
            <div className="relative">
              <img 
                src={mentor.imageUrl} 
                alt={mentor.name}
                className="w-full h-40 sm:h-48 object-cover"
              />
              {/* Availability badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(mentor.availability)}`}>
                  {getAvailabilityText(mentor.availability)}
                </span>
              </div>
              {/* Rating badge */}
              <div className="absolute top-4 right-4 bg-blue-900 rounded-lg p-2 shadow-md">
                <div className="flex items-center text-sm text-yellow-300">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {mentor.rating}
                </div>
              </div>
            </div>

            {/* Mentor details and actions */}
            <div className="p-4 sm:p-6">
              {/* Mentor name, title, company, experience, reviews */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-blue-100 mb-1">{mentor.name}</h3>
                  <p className="text-blue-300 text-sm">{mentor.title}</p>
                  <p className="text-blue-200 text-sm">{mentor.company}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-blue-300 mb-1">
                    <Award className="w-4 h-4 mr-1" />
                    {mentor.experience}
                  </div>
                  <div className="text-xs text-blue-200">{mentor.reviews} reviews</div>
                </div>
              </div>

              {/* Mentor bio */}
              <p className="text-blue-300 text-sm mb-4 line-clamp-3">{mentor.bio}</p>

              {/* Expertise Tags: show first 3, then count of more */}
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-blue-900 text-blue-100 px-2 py-1 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 3 && (
                  <span className="bg-blue-800 text-blue-200 px-2 py-1 rounded-full text-xs">
                    +{mentor.expertise.length - 3} more
                  </span>
                )}
              </div>

              {/* Action buttons: Message and Video Call */}
              <div className="flex space-x-2">
                <button 
                  className={`flex-1 py-2 rounded-lg text-sm transition-colors flex items-center justify-center ${
                    mentor.availability === 'available' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={mentor.availability !== 'available'}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Contact
                </button>
                {/* <button 
                  className={`flex-1 py-2 rounded-lg text-sm transition-colors flex items-center justify-center ${
                    mentor.availability === 'available' 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={mentor.availability !== 'available'}
                >
                  <Video className="w-4 h-4 mr-1" />
                  Video Call
                </button> */}
              </div>
            </div>
          // </div>
        ))}
      </div>

      {/* No mentors found message */}
      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-blue-900 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-blue-100 mb-2">No mentors found</h3>
          <p className="text-blue-300">Try adjusting your search or filters to find more mentors.</p>
        </div>
      )}
    </div>
  );
};

export default Mentors;
