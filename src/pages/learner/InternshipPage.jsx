import React, { useState } from 'react';
import { Briefcase, Search, MapPin, Clock, DollarSign, Calendar, Building, Users } from 'lucide-react';

// InternshipPage.jsx - Learner view for discovering internships
// Uses a dark blue theme and modern card layout
const Internships = () => {
  // State for search input and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Mock data for internships (replace with API data in production)
  const mockInternships = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechStart Inc.',
      location: 'New York, NY',
      type: 'remote',
      duration: '3 months',
      stipend: '$1,200/month',
      description: 'Join our dynamic team to work on cutting-edge web applications using React, TypeScript, and modern frontend technologies. You\'ll collaborate with senior developers and gain hands-on experience in agile development.',
      requirements: ['React', 'JavaScript', 'HTML/CSS', 'Git', 'Problem-solving skills'],
      postedDate: '2024-01-10',
      deadline: '2024-02-15',
      applicants: 45
    },
    {
      id: '2',
      title: 'Marketing Assistant Intern',
      company: 'Creative Agency Pro',
      location: 'San Francisco, CA',
      type: 'hybrid',
      duration: '4 months',
      stipend: '$800/month',
      description: 'Support our marketing team in developing and executing digital marketing campaigns. Learn about social media strategy, content creation, and market research while working on real client projects.',
      requirements: ['Communication skills', 'Social media knowledge', 'Creative thinking', 'Adobe Creative Suite', 'Basic analytics'],
      postedDate: '2024-01-08',
      deadline: '2024-02-20',
      applicants: 67
    },
    {
      id: '3',
      title: 'Data Science Intern',
      company: 'Analytics Solutions',
      location: 'Seattle, WA',
      type: 'onsite',
      duration: '6 months',
      stipend: '$1,800/month',
      description: 'Work with our data science team to analyze large datasets, build predictive models, and create data visualizations. Perfect opportunity to apply machine learning concepts in a business environment.',
      requirements: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Pandas/NumPy'],
      postedDate: '2024-01-05',
      deadline: '2024-02-10',
      applicants: 89
    },
    {
      id: '4',
      title: 'UX/UI Design Intern',
      company: 'Design Studio Co.',
      location: 'Los Angeles, CA',
      type: 'hybrid',
      duration: '3 months',
      stipend: '$1,000/month',
      description: 'Assist in designing user interfaces and experiences for mobile and web applications. Learn design thinking methodologies, create wireframes, and participate in user research activities.',
      requirements: ['Figma', 'Design principles', 'User research', 'Prototyping', 'Creative portfolio'],
      postedDate: '2024-01-12',
      deadline: '2024-02-25',
      applicants: 34
    },
    {
      id: '5',
      title: 'Business Development Intern',
      company: 'Growth Ventures',
      location: 'Chicago, IL',
      type: 'onsite',
      duration: '4 months',
      stipend: '$1,100/month',
      description: 'Support business development activities including market research, lead generation, and partnership development. Gain exposure to startup ecosystem and learn about scaling business operations.',
      requirements: ['Business acumen', 'Research skills', 'Excel proficiency', 'Communication', 'Analytical thinking'],
      postedDate: '2024-01-07',
      deadline: '2024-02-18',
      applicants: 52
    },
    {
      id: '6',
      title: 'Content Writing Intern',
      company: 'Media Hub',
      location: 'Austin, TX',
      type: 'remote',
      duration: '3 months',
      stipend: '$600/month',
      description: 'Create engaging content for various digital platforms including blogs, social media, and newsletters. Learn about SEO, content strategy, and brand voice while building a diverse writing portfolio.',
      requirements: ['Excellent writing', 'SEO knowledge', 'Content strategy', 'Social media', 'Creativity'],
      postedDate: '2024-01-09',
      deadline: '2024-02-22',
      applicants: 78
    }
  ];

  // Type filter options for dropdown
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  // Location filter options for dropdown
  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'New York, NY', label: 'New York, NY' },
    { value: 'San Francisco, CA', label: 'San Francisco, CA' },
    { value: 'Seattle, WA', label: 'Seattle, WA' },
    { value: 'Los Angeles, CA', label: 'Los Angeles, CA' },
    { value: 'Chicago, IL', label: 'Chicago, IL' },
    { value: 'Austin, TX', label: 'Austin, TX' }
  ];

  // Filter internships by search term, type, and location
  const filteredInternships = mockInternships.filter(internship => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || internship.type === typeFilter;
    const matchesLocation = locationFilter === 'all' || internship.location === locationFilter;

    return matchesSearch && matchesType && matchesLocation;
  });

  // Returns Tailwind color classes for each internship type
  const getTypeColor = (type) => {
    switch (type) {
      case 'remote': return 'bg-green-100 text-green-600';
      case 'onsite': return 'bg-blue-100 text-blue-600';
      case 'hybrid': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Returns emoji icon for each internship type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'remote': return '🏠';
      case 'onsite': return '🏢';
      case 'hybrid': return '🔄';
      default: return '📍';
    }
  };

  // Formats a date string to a readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculates days remaining until internship application deadline
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-[80vh] w-full px-45 py-8 bg-gradient-to-br from-blue-900 to-blue-950">
      {/* Header section: Title and description */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-2">Find Internships</h1>
        <p className="text-blue-300">Discover internship opportunities that match your skills and career goals</p>
      </div>

      {/* Search and Filters section */}
      <div className="bg-blue-950 rounded-xl shadow-lg p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search input for internship title, company, or description */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter dropdown */}
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter dropdown */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {locationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Internships List: Display filtered internship cards */}
      <div className="space-y-6">
        {/* Render each internship card */}
        {filteredInternships.map((internship) => {
          const daysRemaining = getDaysRemaining(internship.deadline);
          return (
            <div key={internship.id} className="bg-blue-950 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  {/* Internship card header: title, company, location, type, deadline */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-blue-100 mb-2">{internship.title}</h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center text-blue-300">
                          <Building className="w-4 h-4 mr-1" />
                          {internship.company}
                        </div>
                        <div className="flex items-center text-blue-300">
                          <MapPin className="w-4 h-4 mr-1" />
                          {internship.location}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(internship.type)}`}>
                          {getTypeIcon(internship.type)} {internship.type}
                        </span>
                      </div>
                    </div>
                    {daysRemaining > 0 ? (
                      <div className="text-right">
                        <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                          {daysRemaining} days left
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        Expired
                      </div>
                    )}
                  </div>

                  {/* Internship description */}
                  <p className="text-blue-300 mb-4">{internship.description}</p>

                  {/* Requirements list */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-100 mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.requirements.map((req, index) => (
                        <span key={index} className="bg-blue-900 text-blue-100 px-2 py-1 rounded-full text-sm">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Details Grid: duration, posted date, applicants */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-blue-300">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center text-blue-300">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Posted {formatDate(internship.postedDate)}</span>
                    </div>
                    <div className="flex items-center text-blue-300">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{internship.applicants} applicants</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons: Apply Now or Application Closed */}
                <div className="lg:ml-6 lg:w-48">
                  <div className="space-y-2">
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                        daysRemaining > 0
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={daysRemaining <= 0}
                    >
                      {daysRemaining > 0 ? 'Apply Now' : 'Application Closed'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No internships found message */}
      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-blue-900 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-blue-100 mb-2">No internships found</h3>
          <p className="text-blue-300">Try adjusting your search or filters to find more opportunities.</p>
        </div>
      )}
    </div>
  );
};

export default Internships;
