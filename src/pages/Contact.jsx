import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server
    console.log(formData);
    // Show success message
    setFormSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className=''>
          <div className="section-header">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold pb-2 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Get In Touch</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="contact-intro">
          <p>I'm interested in freelance opportunities and collaborations. If you have a project that needs coding or just want to connect, feel free to reach out!</p>
        </div>
        </div>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
                <i className="ri-map-pin-line"></i>
              </div>
              <div className="info-details">
                <h3>Location</h3>
                <p>Ward no.3 , New Panjabi Colony, Sampla, Rohtak, Haryana-124501, India.</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <i className="ri-mail-line"></i>
              </div>
              <div className="info-details">
                <h3>Email</h3>
                <p>chandermanimishra91@gmail.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <i className="ri-phone-line"></i>
              </div>
              <div className="info-details">
                <h3>Phone</h3>
                <p>+91 8607653657</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">
                <i className="ri-time-line"></i>
              </div>
              <div className="info-details">
                <h3>Working Hours</h3>
                <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
            
            <div className="social-links-container">
              <h3>Connect With Me</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <i className="ri-github-fill"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="ri-linkedin-fill"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="ri-twitter-fill"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="ri-instagram-fill"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            {formSubmitted && (
              <div className="form-success">
                <i className="ri-check-line"></i>
                <p>Your message has been sent successfully!</p>
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Chandermani Mishra"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="chandermanimishra91@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message <i className="ri-send-plane-fill"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 