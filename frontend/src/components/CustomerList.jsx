import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/customers');
      setCustomers(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const formatAddress = (customer) => {
    const parts = [
      customer.street,
      customer.number,
      customer.city,
      customer.state,
      customer.country,
      customer.postal_code
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '-';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading customers...</div>;
  }

  return (
    <div className="customer-list-container">
      <header className="header">
        <h1>Customer Registration System</h1>
        <div className="header-actions">
          <span>Welcome, {user}!</span>
          <button onClick={() => navigate('/customers/new')} className="btn-primary">
            New Customer
          </button>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {customers.length === 0 ? (
        <div className="empty-state">
          <p>No customers found.</p>
          <button onClick={() => navigate('/customers/new')} className="btn-primary">
            Add First Customer
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birth Date</th>
                <th>Profession</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{formatDate(customer.birth_date)}</td>
                  <td>{customer.profession || '-'}</td>
                  <td className="address-cell">{formatAddress(customer)}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/customers/edit/${customer.id}`)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
