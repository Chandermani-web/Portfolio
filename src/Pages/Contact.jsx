import React, { useState, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  User,
  Loader2,
  Calendar,
  Clock
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      // Replace these with your actual EmailJS credentials
      await emailjs.sendForm(
        'service_m3i3i63', // Get from EmailJS dashboard
        'template_2mk7cla', // Get from EmailJS dashboard
        formRef.current,
        'AwZIH91gOp5V9z-48' // Get from EmailJS dashboard
      );

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus({ submitting: false, submitted: false, error: null });
      }, 5000);
    } catch (error) {
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Failed to send message. Please try again or email directly.' 
      });
    }
  };

  const socialLinks = [
    {
      platform: 'GitHub',
      icon: Github,
      url: 'https://github.com/Chandermani-web',
      color: 'hover:text-gray-300',
      bg: 'hover:bg-gray-800'
    },
    {
      platform: 'LinkedIn',
      icon: Linkedin,
      url: 'http://www.linkedin.com/in/chandermani-mishra-a25473304',
      color: 'hover:text-blue-400',
      bg: 'hover:bg-blue-900/20'
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      url: 'https://x.com/Chanderman47595',
      color: 'hover:text-cyan-400',
      bg: 'hover:bg-cyan-900/20'
    },
    // {
    //   platform: 'Schedule',
    //   icon: Calendar,
    //   url: 'https://calendly.com/yourusername',
    //   color: 'hover:text-green-400',
    //   bg: 'hover:bg-green-900/20'
    // }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'chandermanimishra91@gmail.com',
      link: 'mailto:chandermanimishra91@gmail.com',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 8607653657',
      link: 'tel:+918607653657',
      color: 'text-green-400',
      bg: 'bg-green-500/10'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Rohtak, Haryana, India',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: 'Within 24 hours',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    }
  ];

  return (
    <section id="contact" className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </div>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss opportunities? I'm always open to interesting conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div 
                      key={index}
                      className="group flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className={`p-3 rounded-xl ${info.bg} ${info.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 font-medium">{info.title}</p>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-lg font-semibold text-white hover:text-cyan-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-white">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border border-gray-800 ${social.bg} ${social.color} transition-all duration-300 hover:scale-105`}
                      >
                        <Icon className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">{social.platform}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  Availability
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Freelance Projects</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium">Available</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Full-time Roles</span>
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium">Open</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Consulting</span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium">Limited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                  <Send className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                  <p className="text-gray-400">Fill out the form below and I'll get back to you ASAP</p>
                </div>
              </div>

              {/* Status Messages */}
              {status.submitted && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="font-medium text-green-400">Message sent successfully!</p>
                      <p className="text-sm text-green-300">I'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="font-medium text-red-400">{status.error}</p>
                      <p className="text-sm text-red-300">You can also email me directly at hello@yourdomain.com</p>
                    </div>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                      <User className="w-4 h-4" />
                      Your Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        placeholder="John Doe"
                      />
                      <div className="absolute inset-0 border border-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        placeholder="john@example.com"
                      />
                      <div className="absolute inset-0 border border-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Subject *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                      placeholder="Project Inquiry"
                    />
                    <div className="absolute inset-0 border border-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Your Message *
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                      placeholder="Tell me about your project, timeline, and budget..."
                    ></textarea>
                    <div className="absolute inset-0 border border-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {status.submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Privacy Note */}
                <p className="text-sm text-gray-500 text-center md:text-left">
                  Your information is secure and will only be used to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-gray-400">
                © {new Date().getFullYear()} Your Name. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Built with React, Tailwind CSS, and EmailJS
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;