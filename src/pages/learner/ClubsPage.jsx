import React, { useState } from 'react';
import { Building, Search, Filter, Users, MapPin, Calendar, Award } from 'lucide-react';

const Clubs = () => {
  // State for search input and category filter
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data for clubs (replace with API data in production)
  const mockClubs = [
    {
      id: '1',
      name: 'Computer Science Society',
      description: 'A community of students passionate about technology, programming, and innovation. We organize hackathons, tech talks, and coding competitions throughout the year.',
      category: 'Technology',
      members: 248,
      benefits: ['Networking opportunities', 'Industry connections', 'Skill development', 'Leadership roles'],
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '2',
      name: 'Debate and Public Speaking Club',
      description: 'Develop your communication and critical thinking skills through structured debates, public speaking workshops, and presentation training.',
      category: 'Academic',
      members: 89,
      requirements: ['Interest in public speaking', 'Commitment to improvement', 'Respectful communication'],
      benefits: ['Improved communication', 'Critical thinking', 'Confidence building', 'Competition opportunities'],
      imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '3',
      name: 'Environmental Action Group',
      description: 'Dedicated to promoting sustainability and environmental awareness on campus and in the community through various green initiatives.',
      category: 'Environment',
      members: 156,
      requirements: ['Passion for environment', 'Willingness to participate in activities', 'Collaborative mindset'],
      benefits: ['Environmental impact', 'Community service', 'Leadership opportunities', 'Networking'],
      imageUrl: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '4',
      name: 'International Students Association',
      description: 'Supporting international students with cultural events, academic assistance, and social activities to foster a sense of community.',
      category: 'Cultural',
      members: 201,
      requirements: ['Open to all students', 'Cultural appreciation', 'Inclusive mindset'],
      benefits: ['Cultural exchange', 'Social connections', 'Academic support', 'Event planning experience'],
      imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '5',
      name: 'Photography Club',
      description: 'Explore the art of photography through workshops, photo walks, exhibitions, and collaborative projects with fellow photography enthusiasts.',
      category: 'Arts',
      members: 67,
      requirements: ['Interest in photography', 'Camera (smartphone OK)', 'Creative enthusiasm'],
      benefits: ['Skill development', 'Portfolio building', 'Equipment access', 'Exhibition opportunities'],
      imageUrl: 'https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      id: '6',
      name: 'Entrepreneurship Society',
      description: 'For aspiring entrepreneurs and business-minded students. We host startup competitions, mentorship programs, and business plan workshops.',
      category: 'Business',
      members: 134,
      requirements: ['Business interest', 'Innovative thinking', 'Collaborative spirit'],
      benefits: ['Mentorship access', 'Funding opportunities', 'Network building', 'Business skills'],
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  // List of club categories for filtering
  const categories = ['all', 'Technology', 'Academic', 'Environment', 'Cultural', 'Arts', 'Business', 'Sports', 'Music'];

  // Filter clubs by search term and selected category
  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || club.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Returns Tailwind color classes for each category (not used in dark theme, but kept for reference)
  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-600',
      'Academic': 'bg-purple-100 text-purple-600',
      'Environment': 'bg-green-100 text-green-600',
      'Cultural': 'bg-yellow-100 text-yellow-600',
      'Arts': 'bg-pink-100 text-pink-600',
      'Business': 'bg-indigo-100 text-indigo-600',
      'Sports': 'bg-red-100 text-red-600',
      'Music': 'bg-orange-100 text-orange-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  // Returns emoji icon for each club category
  const getCategoryIcon = (category) => {
    const icons = {
      'Technology': '💻',
      'Academic': '📚',
      'Environment': '🌱',
      'Cultural': '🌍',
      'Arts': '🎨',
      'Business': '💼',
      'Sports': '⚽',
      'Music': '🎵'
    };
    return icons[category] || '📋';
  };

  return (
  <div className="min-h-[80vh] w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-8 bg-gradient-to-br from-blue-910 to-blue-950">
      {/* Header section: Title and description */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-100 mb-2">Discover Clubs</h1>
        <p className="text-blue-300">Find clubs and organizations that match your interests and connect with like-minded students</p>
      </div>

      {/* Search and Filters section */}
      <div className="bg-blue-950 rounded-xl shadow-lg p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search input for club name, description, or category */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clubs by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-800 bg-blue-900 text-blue-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : `${getCategoryIcon(category)} ${category}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clubs Grid: Display filtered club cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredClubs.map((club) => (
          <div key={club.id} className="bg-blue-950 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2">
            {/* Club image and category/members overlays */}
            <div className="relative h-40 sm:h-48">
              <img 
                src={club.imageUrl} 
                alt={club.name}
                className="w-full h-full object-cover"
              />
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-100 shadow-md`}>
                  {getCategoryIcon(club.category)} {club.category}
                </span>
              </div>
              {/* Members count badge */}
              <div className="absolute top-4 right-4 bg-blue-900 rounded-lg p-2 shadow-md">
                <div className="flex items-center text-sm text-blue-100">
                  <Users className="w-4 h-4 mr-1" />
                  {club.members}
                </div>
              </div>
            </div>

            {/* Club details and actions */}
            <div className="p-4 sm:p-6">
              {/* Club name and description */}
              <h3 className="text-xl font-bold text-blue-100 mb-2">{club.name}</h3>
              <p className="text-blue-300 text-sm mb-4 line-clamp-3">{club.description}</p>


              <div className="mb-4">
                <h4 className="text-sm font-semibold text-blue-100 mb-2">Key Benefits:</h4>
                <div className="flex flex-wrap gap-1">
                  {club.benefits.slice(0, 2).map((benefit, index) => (
                    <span key={index} className="bg-blue-900 text-blue-100 px-2 py-1 rounded-full text-xs">
                      {benefit}
                    </span>
                  ))}
                  {club.benefits.length > 2 && (
                    <span className="bg-blue-800 text-blue-200 px-2 py-1 rounded-full text-xs">
                      +{club.benefits.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons: Join and Learn More */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-400 transition-colors">
                  Join Club
                </button>
                <button className="flex-1 border border-cyan-600 text-cyan-600 py-2 rounded-lg hover:bg-cyan-500 hover:text-cyan-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No clubs found message */}
      {filteredClubs.length === 0 && (
        <div className="text-center py-12">
          <Building className="w-16 h-16 text-blue-900 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-blue-100 mb-2">No clubs found</h3>
          <p className="text-blue-300">Try adjusting your search or filters to discover more clubs.</p>
        </div>
      )}
    </div>
  );
};

export default Clubs;
