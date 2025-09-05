import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEditor } from "@/components/editor/EditorContext";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Globe, Send } from "lucide-react";

interface Contact {
  email: string;
  phone?: string;
  location?: string;
  social: Array<{
    platform: string;
    url: string;
  }>;
}

interface ContactSectionProps {
  data: Contact;
  isPreviewMode: boolean;
}

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Website: Globe,
  Email: Mail
};

const socialColors = {
  GitHub: "hover:bg-gray-900 hover:text-white",
  LinkedIn: "hover:bg-blue-600 hover:text-white",
  Twitter: "hover:bg-blue-400 hover:text-white",
  Website: "hover:bg-green-600 hover:text-white",
  Email: "hover:bg-red-500 hover:text-white"
};

export const ContactSection = ({ data, isPreviewMode }: ContactSectionProps) => {
  const { textStyle } = useEditor();

  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center p-16">
        <div className="w-full max-w-6xl h-full flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-16" style={{ fontFamily: textStyle.fontFamily }}>
            <h1 className="text-7xl font-bold text-gray-900 mb-6" style={{ 
              fontSize: textStyle.fontSizePx + 28, 
              color: textStyle.color, 
              textAlign: textStyle.align as any 
            }}>
              Get In Touch
            </h1>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto" style={{ 
              fontSize: textStyle.fontSizePx + 8, 
              textAlign: textStyle.align as any, 
              color: textStyle.color 
            }}>
              Let's work together and create something amazing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ 
                  fontSize: textStyle.fontSizePx + 12, 
                  color: textStyle.color 
                }}>
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="text-lg font-medium text-gray-900" style={{ 
                        fontSize: textStyle.fontSizePx + 2, 
                        color: textStyle.color 
                      }}>
                        {data.email}
                      </p>
                    </div>
                  </div>

                  {data.phone && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="text-lg font-medium text-gray-900" style={{ 
                          fontSize: textStyle.fontSizePx + 2, 
                          color: textStyle.color 
                        }}>
                          {data.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {data.location && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-lg font-medium text-gray-900" style={{ 
                          fontSize: textStyle.fontSizePx + 2, 
                          color: textStyle.color 
                        }}>
                          {data.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Social Links */}
              <Card className="p-8 bg-gradient-to-br from-gray-50 to-white border-0 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ 
                  fontSize: textStyle.fontSizePx + 12, 
                  color: textStyle.color 
                }}>
                  Connect With Me
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {data.social.map((social) => {
                    const IconComponent = socialIcons[social.platform as keyof typeof socialIcons] || Globe;
                    const colorClass = socialColors[social.platform as keyof typeof socialColors] || "hover:bg-gray-600 hover:text-white";
                    
                    return (
                      <Button
                        key={social.platform}
                        variant="outline"
                        className={`h-16 flex flex-col items-center gap-2 transition-all duration-300 ${colorClass}`}
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        <IconComponent className="w-6 h-6" />
                        <span className="text-sm font-medium">{social.platform}</span>
                      </Button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg h-full">
                <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ 
                  fontSize: textStyle.fontSizePx + 12, 
                  color: textStyle.color 
                }}>
                  Send a Message
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 text-lg">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
