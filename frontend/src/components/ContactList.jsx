import React from 'react';

const ContactList = ({ contacts, onView, onEdit, onDelete, selectedId }) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
        <div className="text-8xl mb-6 opacity-50">📭</div>
        <p className="text-gray-700 font-bold text-xl mb-2">No contacts found</p>
        <p className="text-gray-500">Add your first contact to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {contacts.map((contact, index) => (
        <div
          key={contact.id}
          className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
            selectedId === contact.id
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl scale-105'
              : 'bg-white hover:shadow-xl'
          }`}
          onClick={() => onView(contact)}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Selection Indicator */}
          {selectedId === contact.id && (
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-2 h-16 bg-yellow-400 rounded-r-full animate-pulse"></div>
          )}

          <div className="flex items-center gap-4">
            {/* Avatar with Gradient */}
            <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
              selectedId === contact.id 
                ? 'bg-white text-purple-600 shadow-lg' 
                : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white'
            }`}>
              {contact.name.charAt(0).toUpperCase()}
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            
            {/* Contact Info */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-black text-lg mb-2 truncate transition-colors ${
                selectedId === contact.id ? 'text-white' : 'text-gray-800 group-hover:text-blue-600'
              }`}>
                {contact.name}
              </h3>
              <div className="space-y-1">
                <p className={`text-sm flex items-center gap-2 truncate ${
                  selectedId === contact.id ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  <span className="text-base">📧</span>
                  <span className="truncate">{contact.email}</span>
                </p>
                <p className={`text-sm flex items-center gap-2 ${
                  selectedId === contact.id ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  <span className="text-base">📞</span>
                  <span>{contact.phone}</span>
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 ml-2 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(contact);
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
                  selectedId === contact.id
                    ? 'bg-white/20 hover:bg-white/30 text-white'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                }`}
                title="Edit"
              >
                <span className="text-lg">✏️</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(contact.id);
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
                  selectedId === contact.id
                    ? 'bg-white/20 hover:bg-white/30 text-white'
                    : 'bg-red-100 hover:bg-red-200 text-red-600'
                }`}
                title="Delete"
              >
                <span className="text-lg">🗑️</span>
              </button>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
        </div>
      ))}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default ContactList;