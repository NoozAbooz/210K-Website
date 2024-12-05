import React from 'react';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MailIcon className="h-6 w-6 text-pink-400" />
              <span>team1234@vexrobotics.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <PhoneIcon className="h-6 w-6 text-pink-400" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPinIcon className="h-6 w-6 text-pink-400" />
              <span>123 Robot Street, Tech City, TC 12345</span>
            </div>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
            ></textarea>
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}