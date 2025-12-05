import { useState, useEffect } from 'react';
import { getAllContacts, createContact, updateContact, deleteContact } from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllContacts();
      setContacts(response.data);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Name, Phone, and Email are required');
      return;
    }

    try {
      if (editingContact) {
        await updateContact(editingContact.id, formData);
        showSuccessMessage('Contact updated successfully!');
        setEditingContact(null);
      } else {
        await createContact(formData);
        showSuccessMessage('Contact added successfully!');
      }
      
      setFormData({ name: '', phone: '', email: '', address: '' });
      await fetchContacts();
      setError(null);
    } catch (err) {
      setError('Failed to save contact');
      console.error('Error:', err);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        showSuccessMessage('Contact deleted successfully!');
        await fetchContacts();
      } catch (err) {
        setError('Failed to delete contact');
        console.error('Error:', err);
      }
    }
  };

  const handleCancel = () => {
    setEditingContact(null);
    setFormData({ name: '', phone: '', email: '', address: '' });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent mb-10">
          Contact Manager
        </h1>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-5 bg-gradient-to-r from-green-200 to-teal-200 border border-green-300 text-green-800 rounded-2xl shadow-lg transform transition-all duration-300">
            ✨ {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-5 bg-gradient-to-r from-red-200 to-pink-200 border border-red-300 text-red-800 rounded-2xl shadow-lg">
            ⚠️ {error}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8">
                {editingContact ? '✏️ Edit Contact' : '➕ Add New Contact'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {['name', 'phone', 'email', 'address'].map((field, idx) => {
                  const placeholders = ['Name', 'Phone', 'Email', 'Address (optional)'];
                  const types = ['text', 'tel', 'email', 'text'];
                  const required = idx < 3;

                  return (
                    <input
                      key={field || idx}
                      type={types[idx]}
                      placeholder={placeholders[idx]}
                      value={formData[field || 'name']}
                      onChange={(e) => setFormData({...formData, [field || 'name']: e.target.value})}
                      required={required}
                      className="w-full px-5 py-4 bg-white/60 border border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-300 placeholder-gray-400 transition"
                    />
                  );
                })}

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300"
                  >
                    {editingContact ? '💾 Update Contact' : '🚀 Add Contact'}
                  </button>

                  {editingContact && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-4 bg-gray-200/70 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Contact List Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/50">
              <div className="p-8 bg-gradient-to-r from-cyan-400 to-blue-500">
                <h2 className="text-3xl font-bold text-white mb-6">📔 Contact List</h2>
                
                <input
                  type="text"
                  placeholder="🔍 Search by name, email or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/50 placeholder-gray-200 text-gray-800"
                />
              </div>

              {loading ? (
                <div className="p-20 text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-400 border-t-transparent mx-auto"></div>
                  <p className="mt-6 text-xl text-gray-600">Loading your contacts...</p>
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-20 text-center text-2xl text-gray-400">
                  {searchQuery ? '😅 No contacts found' : '📭 No contacts yet!<br/>Add your first one!'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <th className="px-8 py-5 text-left rounded-tl-2xl">Name</th>
                        <th className="px-8 py-5 text-left">Phone</th>
                        <th className="px-8 py-5 text-left">Email</th>
                        <th className="px-8 py-5 text-center rounded-tr-2xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white/50">
                      {filteredContacts.map((contact, index) => (
                        <tr key={contact.id} className={`${index % 2 === 0 ? 'bg-white/70' : 'bg-purple-50/70'} hover:bg-pink-100 transition`}>
                          <td className="px-8 py-6 font-medium text-gray-800">{contact.name}</td>
                          <td className="px-8 py-6 text-gray-600">{contact.phone}</td>
                          <td className="px-8 py-6 text-gray-600">{contact.email}</td>
                          <td className="px-8 py-6 text-center">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() => handleEdit(contact)}
                                className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transform hover:scale-110 transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(contact.id)}
                                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transform hover:scale-110 transition"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600 text-lg">
          © {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 font-bold">Contact Manager</span> — Made with ❤️ and a lot of colors!
        </div>
      </div>
    </div>
  );
}

export default App;