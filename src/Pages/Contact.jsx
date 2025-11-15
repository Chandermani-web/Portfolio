import React, { useState, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 70%",
        end: "top 50%",
        scrub: true,
      }
    });

    tl.fromTo(".contact-section h2", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    tl.fromTo(".contact-intro",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    tl.fromTo(".info-item",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    tl.fromTo(".contact-form-container",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_m3i3i63';
    const templateId = 'template_2mk7cla';
    const publicKey = 'AwZIH91gOp5V9z-48';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormSubmitted(true);
      }, (err) => {
        console.log('FAILED...', err);
      });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="contact-section relative py-20 px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-16">
          <div className="section-header">
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold pb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              / Get In Touch /
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="contact-intro mt-8">
            <p className="text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              I'm interested in freelance opportunities and collaborations. If you have a project that needs coding or just want to connect, feel free to reach out!
            </p>
          </div>
        </div>
        
        <div className="contact-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div className="info-item group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="info-icon p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
                  <i className="ri-map-pin-line text-xl"></i>
                </div>
                <div className="info-details flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                  <p className="text-gray-300">Ward no.3, New Panjabi Colony, Sampla, Rohtak, Haryana-124501, India.</p>
                </div>
              </div>
            </div>
            
            <div className="info-item group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="info-icon p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
                  <i className="ri-mail-line text-xl"></i>
                </div>
                <div className="info-details flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-gray-300">chandermanimishra91@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="info-item group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="info-icon p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
                  <i className="ri-phone-line text-xl"></i>
                </div>
                <div className="info-details flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                  <p className="text-gray-300">+91 8607653657</p>
                </div>
              </div>
            </div>
            
            <div className="info-item group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="info-icon p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white">
                  <i className="ri-time-line text-xl"></i>
                </div>
                <div className="info-details flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Working Hours</h3>
                  <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="social-links-container group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-4">Connect With Me</h3>
              <div className="social-icons flex gap-4">
                <a href="#" className="social-icon p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1">
                  <i className="ri-github-fill text-xl"></i>
                </a>
                <a href="#" className="social-icon p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1">
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>
                <a href="#" className="social-icon p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1">
                  <i className="ri-twitter-fill text-xl"></i>
                </a>
                <a href="#" className="social-icon p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:transform hover:-translate-y-1">
                  <i className="ri-instagram-fill text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form-container">
            {formSubmitted && (
              <div className="form-success mb-6 bg-green-500/20 border border-green-500/50 rounded-2xl p-4 backdrop-blur-sm flex items-center gap-3 animate-pulse">
                <i className="ri-check-line text-green-400 text-xl"></i>
                <p className="text-green-400 font-medium">Your message has been sent successfully!</p>
              </div>
            )}
            <form className="contact-form bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8" onSubmit={handleSubmit}>
              <div className="form-group mb-6">
                <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Chandermani Mishra"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>
              
              <div className="form-group mb-6">
                <label htmlFor="email" className="block text-white font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="chandermanimishra91@example.com"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>
              
              <div className="form-group mb-6">
                <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>
              
              <div className="form-group mb-8">
                <label htmlFor="message" className="block text-white font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-vertical"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message 
                <i className="ri-send-plane-fill group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;