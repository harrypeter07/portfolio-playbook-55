import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  Download,
  Heart,
  Star,
  Code,
  Palette,
  Camera,
  Music,
  Gamepad2,
  Coffee,
  Rocket
} from 'lucide-react';

// Real portfolio data - protected from editing
const portfolioData = {
  personal: {
    name: "Alex Johnson",
    title: "Creative Developer & UI/UX Designer",
    location: "San Francisco, CA",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate about creating beautiful, interactive experiences that bridge the gap between design and technology. I specialize in modern web development, user interface design, and creating engaging digital experiences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  skills: [
    { name: "React", level: 95, color: "bg-blue-500" },
    { name: "TypeScript", level: 90, color: "bg-blue-600" },
    { name: "UI/UX Design", level: 88, color: "bg-purple-500" },
    { name: "Figma", level: 92, color: "bg-pink-500" },
    { name: "Node.js", level: 85, color: "bg-green-500" },
    { name: "Python", level: 80, color: "bg-yellow-500" }
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern, responsive e-commerce platform built with React and Node.js. Features include real-time inventory, secure payments, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A beautiful, interactive portfolio website with smooth animations and responsive design. Built with modern web technologies.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "Firebase", "Socket.io", "Material-UI"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false
    }
  ],
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      duration: "2022 - Present",
      description: "Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern web technologies."
    },
    {
      company: "DesignStudio",
      position: "UI/UX Designer & Developer",
      duration: "2020 - 2022",
      description: "Designed and developed user interfaces for web and mobile applications, working closely with product teams and stakeholders."
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      duration: "2018 - 2020",
      description: "Built end-to-end web applications from scratch, handling both frontend and backend development responsibilities."
    }
  ]
};

const Portfolio = () => {
  const [selectedColor, setSelectedColor] = useState('text-blue-600');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const colorOptions = [
    { name: 'Blue', class: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Purple', class: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Green', class: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Pink', class: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'Orange', class: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Teal', class: 'text-teal-600', bg: 'bg-teal-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Alex Johnson</h1>
            </div>
            
            {/* Interactive Color Picker */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Theme:</span>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.class)}
                    className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                      selectedColor === color.class ? 'border-gray-400' : 'border-transparent'
                    } transition-all duration-200 hover:scale-110`}
                    style={{ backgroundColor: color.class.replace('text-', '#').replace('-600', '') }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-2xl">
              <AvatarImage src={portfolioData.personal.image} alt={portfolioData.personal.name} />
              <AvatarFallback className="text-4xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                AJ
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          <h1 className={`text-5xl font-bold mb-4 ${selectedColor} transition-colors duration-300`}>
            {portfolioData.personal.name}
          </h1>
          <h2 className="text-2xl text-gray-600 mb-6">{portfolioData.personal.title}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            {portfolioData.personal.bio}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{portfolioData.personal.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>{portfolioData.personal.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>{portfolioData.personal.phone}</span>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${selectedColor} transition-colors duration-300`}>
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.skills.map((skill, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <span className="text-sm text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${selectedColor} transition-colors duration-300`}>
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioData.projects.filter(project => project.featured).map((project) => (
              <Card 
                key={project.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  {project.featured && (
                    <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex items-center justify-center h-full space-x-4">
                      <Button variant="secondary" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${selectedColor} transition-colors duration-300`}>
            Experience
          </h2>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                    <p className="text-lg text-gray-600 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-3">{exp.duration}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className={`text-3xl font-bold mb-8 ${selectedColor} transition-colors duration-300`}>
            Let's Work Together
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can create something amazing together!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Built with ❤️ using React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
