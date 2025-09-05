import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Globe,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Star
} from 'lucide-react';

interface PortfolioContentProps {
  page: 'P1' | 'P2';
}

export const PortfolioContent: React.FC<PortfolioContentProps> = ({ page }) => {
  const portfolioData = {
    name: "John Doe",
    title: "Full Stack Developer & UI/UX Designer",
    location: "San Francisco, CA",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    website: "www.johndoe.dev",
    github: "github.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
    bio: "Passionate full-stack developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, Node.js, and modern web technologies.",
    skills: [
      "React", "TypeScript", "Node.js", "Python", "PostgreSQL", 
      "MongoDB", "AWS", "Docker", "Figma", "Adobe Creative Suite"
    ],
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Corp",
        period: "2022 - Present",
        description: "Led frontend development for multiple high-traffic applications serving 1M+ users."
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: "Built and maintained full-stack applications using React, Node.js, and PostgreSQL."
      },
      {
        title: "Junior Developer",
        company: "Web Solutions Inc",
        period: "2019 - 2020",
        description: "Developed responsive web applications and collaborated with design teams."
      }
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        school: "University of California, Berkeley",
        year: "2019"
      }
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
        tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
        status: "Live"
      },
      {
        name: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        tech: ["React", "Socket.io", "MongoDB", "Express"],
        status: "In Development"
      },
      {
        name: "Portfolio Website",
        description: "Personal portfolio website with custom animations and responsive design",
        tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        status: "Live"
      }
    ]
  };

  if (page === 'P1') {
    return (
      <div className="w-full h-full p-8 bg-white">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{portfolioData.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{portfolioData.title}</p>
          <div className="flex items-center justify-center gap-4 text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{portfolioData.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{portfolioData.email}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{portfolioData.bio}</p>
        </Card>

        {/* Skills */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get In Touch</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{portfolioData.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{portfolioData.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{portfolioData.website}</span>
            </div>
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{portfolioData.github}</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (page === 'P2') {
    return (
      <div className="w-full h-full p-8 bg-white">
        {/* Experience */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            Experience
          </h2>
          <div className="space-y-4">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-purple-600 font-medium">{exp.company}</p>
                <p className="text-gray-500 text-sm mb-2">{exp.period}</p>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Education */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Education
          </h2>
          <div className="space-y-3">
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-600 font-medium">{edu.school}</p>
                <p className="text-gray-500 text-sm">{edu.year}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Projects */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Featured Projects
          </h2>
          <div className="space-y-4">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <Badge variant={project.status === 'Live' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-gray-700 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return null;
};
