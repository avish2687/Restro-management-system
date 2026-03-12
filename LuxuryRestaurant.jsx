import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Star, ChefHat, Award, Users, Sparkles, Wine, Utensils, Instagram, Facebook, Twitter, MessageCircle, X } from 'lucide-react';

const LuxuryRestaurant = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showBooking, setShowBooking] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Welcome to Restoran! How may I assist you today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Truffle Risotto', price: '$42', category: 'Signature', rating: 4.9, desc: 'Creamy arborio rice with black truffle shavings' },
    { name: 'Wagyu Beef Steak', price: '$85', category: 'Premium', rating: 5.0, desc: 'Japanese A5 wagyu with seasonal vegetables' },
    { name: 'Lobster Thermidor', price: '$68', category: 'Signature', rating: 4.8, desc: 'Fresh Atlantic lobster in brandy cream sauce' },
    { name: 'Seared Scallops', price: '$52', category: 'Seafood', rating: 4.9, desc: 'Pan-seared scallops with cauliflower purée' },
    { name: 'Duck Confit', price: '$48', category: 'Classic', rating: 4.7, desc: 'Slow-cooked duck leg with cherry reduction' },
    { name: 'Chocolate Soufflé', price: '$24', category: 'Dessert', rating: 5.0, desc: 'Dark chocolate soufflé with vanilla ice cream' }
  ];

  const chefs = [
    { name: 'Marcus Chen', title: 'Executive Chef', exp: '15 Years', specialty: 'French Cuisine' },
    { name: 'Isabella Romano', title: 'Pastry Chef', exp: '12 Years', specialty: 'Desserts' },
    { name: 'James Mitchell', title: 'Sous Chef', exp: '10 Years', specialty: 'Seafood' },
    { name: 'Sofia Laurent', title: 'Head Chef', exp: '14 Years', specialty: 'Italian Cuisine' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', text: 'An unforgettable dining experience! The ambiance and food were absolutely spectacular.', rating: 5 },
    { name: 'Michael Chen', text: 'Best restaurant in the city. The attention to detail is remarkable.', rating: 5 },
    { name: 'Emma Davis', text: 'From the moment we walked in, we knew this would be special. Exceeded all expectations!', rating: 5 }
  ];

  const handleChatSubmit = () => {
    if (!userInput.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', text: userInput }]);
    
    setTimeout(() => {
      let botResponse = '';
      const input = userInput.toLowerCase();
      
      if (input.includes('book') || input.includes('reservation')) {
        botResponse = 'I\'d be happy to help you make a reservation! Please click the "Book a Table" button to choose your preferred date and time.';
      } else if (input.includes('menu') || input.includes('food')) {
        botResponse = 'We offer exquisite French and Italian cuisine. Our signature dishes include Wagyu Beef Steak and Truffle Risotto. Would you like to see our full menu?';
      } else if (input.includes('hours') || input.includes('open')) {
        botResponse = 'We\'re open Tuesday to Sunday, 5:00 PM - 11:00 PM. We\'re closed on Mondays.';
      } else if (input.includes('location') || input.includes('address')) {
        botResponse = 'We\'re located at 123 Gourmet Street, Downtown District. You can find directions in our contact section!';
      } else {
        botResponse = 'Thank you for your message! For specific inquiries, please call us at (555) 123-4567 or visit our contact section.';
      }
      
      setChatMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);

    setUserInput('');
  };

  const handleBooking = () => {
    if (bookingData.name && bookingData.email && bookingData.phone && bookingData.date && bookingData.time && bookingData.guests) {
      alert('Reservation confirmed! We\'ll send you a confirmation email shortly.');
      setShowBooking(false);
      setBookingData({ name: '', email: '', phone: '', date: '', time: '', guests: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500" 
           style={{ 
             background: scrollY > 100 ? 'rgba(0,0,0,0.95)' : 'transparent',
             backdropFilter: scrollY > 100 ? 'blur(10px)' : 'none'
           }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ChefHat className="text-amber-400" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              RESTORAN
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'Menu', 'Chefs', 'Contact'].map(item => (
              <button key={item} className="hover:text-amber-400 transition-colors duration-300 font-light tracking-wider">
                {item}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowBooking(true)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/50 font-medium">
            Reserve Table
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-amber-950 opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        
        <div className="relative z-10 text-center px-6 animate-fade-in">
          <div className="mb-6 inline-block">
            <Sparkles className="text-amber-400 mx-auto mb-4 animate-pulse" size={48} />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent animate-slide-up">
            Culinary Excellence
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide animate-slide-up" style={{animationDelay: '0.2s'}}>
            Where every dish tells a story of passion and perfection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={() => setShowBooking(true)}
              className="bg-amber-500 text-black px-8 py-4 rounded-full hover:bg-amber-400 transition-all duration-300 shadow-2xl shadow-amber-500/50 font-semibold transform hover:scale-105">
              Book Your Experience
            </button>
            <button className="border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 font-semibold transform hover:scale-105">
              Explore Menu
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-amber-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, value: '15+', label: 'Awards Won' },
              { icon: Users, value: '50K+', label: 'Happy Guests' },
              { icon: ChefHat, value: '25+', label: 'Master Chefs' },
              { icon: Star, value: '4.9', label: 'Average Rating' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center transform hover:scale-110 transition-transform duration-300">
                <stat.icon className="mx-auto mb-4 text-amber-400" size={48} />
                <div className="text-4xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 font-light tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Utensils className="mx-auto mb-4 text-amber-400" size={48} />
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Signature Collection
            </h2>
            <p className="text-gray-400 text-lg font-light">Crafted with precision, served with passion</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item, idx) => (
              <div key={idx} 
                   className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20">
                <div className="h-48 bg-gradient-to-br from-amber-900 to-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                    <Star className="text-amber-400 fill-amber-400" size={20} />
                    <span className="text-white font-semibold">{item.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-amber-400">{item.name}</h3>
                    <span className="text-2xl font-bold text-amber-500">{item.price}</span>
                  </div>
                  <p className="text-gray-400 mb-4 font-light">{item.desc}</p>
                  <button className="w-full bg-amber-500/10 border border-amber-500 text-amber-400 py-2 rounded-lg hover:bg-amber-500 hover:text-black transition-all duration-300 font-medium">
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <ChefHat className="mx-auto mb-4 text-amber-400" size={48} />
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Our Master Chefs
            </h2>
            <p className="text-gray-400 text-lg font-light">Artists behind your unforgettable experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {chefs.map((chef, idx) => (
              <div key={idx} 
                   className="group relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-amber-500 transition-all duration-500 transform hover:scale-105">
                <div className="h-64 bg-gradient-to-br from-amber-900 to-gray-800 relative">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl font-bold text-amber-400 mb-1">{chef.name}</h3>
                    <p className="text-gray-300 text-sm font-light">{chef.title}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Experience</span>
                    <span className="text-amber-400 font-semibold">{chef.exp}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Specialty</span>
                    <span className="text-amber-400 font-semibold">{chef.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <MessageCircle className="mx-auto mb-4 text-amber-400" size={48} />
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Guest Experiences
            </h2>
            <p className="text-gray-400 text-lg font-light">What our patrons say about us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} 
                   className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-amber-500 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic font-light">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-amber-400">{test.name}</div>
                    <div className="text-gray-400 text-sm">Verified Guest</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <MapPin className="mx-auto mb-4 text-amber-400" size={48} />
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Visit Us
            </h2>
            <p className="text-gray-400 text-lg font-light">We're waiting to serve you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 text-center hover:border-amber-500 transition-all duration-300">
              <MapPin className="mx-auto mb-4 text-amber-400" size={40} />
              <h3 className="text-xl font-bold text-amber-400 mb-2">Location</h3>
              <p className="text-gray-300 font-light">123 Gourmet Street<br />Downtown District</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 text-center hover:border-amber-500 transition-all duration-300">
              <Clock className="mx-auto mb-4 text-amber-400" size={40} />
              <h3 className="text-xl font-bold text-amber-400 mb-2">Hours</h3>
              <p className="text-gray-300 font-light">Tue - Sun: 5:00 PM - 11:00 PM<br />Monday: Closed</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 text-center hover:border-amber-500 transition-all duration-300">
              <Phone className="mx-auto mb-4 text-amber-400" size={40} />
              <h3 className="text-xl font-bold text-amber-400 mb-2">Contact</h3>
              <p className="text-gray-300 font-light">(555) 123-4567<br />info@restoran.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <ChefHat className="text-amber-400" size={32} />
              <span className="text-2xl font-bold text-amber-400">RESTORAN</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Instagram className="text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" size={24} />
              <Facebook className="text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" size={24} />
              <Twitter className="text-gray-400 hover:text-amber-400 cursor-pointer transition-colors" size={24} />
            </div>
            <p className="text-gray-400 text-sm font-light">© 2024 Restoran. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full border border-amber-500/30 shadow-2xl shadow-amber-500/20 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-amber-400">Reserve Your Table</h3>
              <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors" 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors" 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none transition-colors" 
              />
              <input 
                type="date" 
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors" 
              />
              <select 
                value={bookingData.time}
                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors">
                <option value="">Select Time</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="9:00 PM">9:00 PM</option>
              </select>
              <select 
                value={bookingData.guests}
                onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none transition-colors">
                <option value="">Number of Guests</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
              <button 
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/50 transform hover:scale-105">
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-amber-500 to-amber-600 text-black p-4 rounded-full shadow-2xl shadow-amber-500/50 hover:scale-110 transition-transform duration-300 z-50">
        <MessageCircle size={28} />
      </button>

      {/* Chat Widget */}
      {showChat && (
        <div className="fixed bottom-24 right-8 w-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-amber-500/30 z-50 animate-slide-up overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageCircle className="text-black" size={24} />
              <span className="font-bold text-black">Restoran Assistant</span>
            </div>
            <button onClick={() => setShowChat(false)} className="text-black hover:text-gray-800">
              <X size={20} />
            </button>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black' 
                    : 'bg-gray-800 text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
              />
              <button 
                onClick={handleChatSubmit}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LuxuryRestaurant;