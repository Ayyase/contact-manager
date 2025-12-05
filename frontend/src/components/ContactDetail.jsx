import React from 'react';

const ContactDetail = ({ contact, onEdit, onDelete, onClose }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b-4 border-gradient-to-r from-blue-600 to-purple-600">
        <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
          <span className="text-4xl">👤</span> Contact Details
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 hover:bg-red-100 w-12 h-12 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 transform hover:scale-110 hover:rotate-90"
          title="Close"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Card - Glassmorphism */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-10 rounded-3xl shadow-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          
          {/* Content */}
          <div className="relative flex items-center gap-8">
            <div className="w-24 h-24 bg-white text-purple-600 rounded-3xl flex items-center justify-center text-5xl font-black shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 flex-shrink-0">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-4xl font-black mb-3 text-white truncate drop-shadow-lg">{contact.name}</h3>
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <p className="text-blue-100 text-sm font-bold">Contact ID: #{contact.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className="space-y-4">
          {/* Email */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all"></div>
            <label className="block text-xs font-black text-blue-600 uppercase tracking-wider mb-3">
              📧 Email Address
            </label>
            <a 
              href={`mailto:${contact.email}`}
              className="text-gray-800 hover:text-blue-600 font-bold text-xl hover:underline truncate block transition-colors"
            >
              {contact.email}
            </a>
          </div>

          {/* Phone */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl group-hover:bg-purple-400/20 transition-all"></div>
            <label className="block text-xs font-black text-purple-600 uppercase tracking-wider mb-3">
              📞 Phone Number
            </label>
            <a 
              href={`tel:${contact.phone}`}
              className="text-gray-800 hover:text-purple-600 font-bold text-xl hover:underline block transition-colors"
            >
              {contact.phone}
            </a>
          </div>

          {/* Address */}
          {contact.address && (
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-2xl group-hover:bg-green-400/20 transition-all"></div>
              <label className="block text-xs font-black text-green-600 uppercase tracking-wider mb-3">
                📍 Address
              </label>
              <p className="text-gray-800 font-bold text-lg leading-relaxed">{contact.address}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-2xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
              <label className="block text-xs font-black text-orange-600 uppercase tracking-wider mb-2">
                🕐 Created
              </label>
              <p className="text-gray-700 font-bold text-sm">{formatDate(contact.created_at)}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-2xl border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-lg transform hover:scale-105">
              <label className="block text-xs font-black text-pink-600 uppercase tracking-wider mb-2">
                🔄 Updated
              </label>
              <p className="text-gray-700 font-bold text-sm">{formatDate(contact.updated_at)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={onEdit}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="text-2xl">✏️</span> 
            <span className="text-lg">Edit Contact</span>
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-black py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="text-2xl">🗑️</span> 
            <span className="text-lg">Delete Contact</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default ContactDetail;