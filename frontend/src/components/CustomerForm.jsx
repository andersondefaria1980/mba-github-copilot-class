import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import './CustomerForm.css';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    email: '',
    phone: '',
    profession: '',
    country: '',
    state: '',
    city: '',
    street: '',
    number: '',
    postal_code: '',
    monthly_income: '',
    bank_name: '',
    bank_account_number: '',
    bank_account_holder: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchCustomer();
    }
  }, [id]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/customers`);
      const customer = response.data.find(c => c.id === parseInt(id));
      if (customer) {
        // Format date for input
        const formattedDate = customer.birth_date 
          ? customer.birth_date.split('T')[0] 
          : '';
        setFormData({
          ...customer,
          birth_date: formattedDate
        });
      } else {
        setError('Customer not found');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load customer');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!validateEmail(formData.email)) {
      setError('Invalid email format');
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await api.put(`/api/customers/${id}`, formData);
      } else {
        await api.post('/api/customers', formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-form-container">
      <div className="form-header">
        <h1>{isEditMode ? 'Edit Customer' : 'New Customer'}</h1>
        <button onClick={() => navigate('/')} className="btn-back">
          Back to List
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="birth_date">Birth Date</label>
              <input
                id="birth_date"
                name="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="profession">Profession</label>
            <input
              id="profession"
              name="profession"
              type="text"
              value={formData.profession}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="monthly_income">Monthly Income</label>
            <input
              id="monthly_income"
              name="monthly_income"
              type="number"
              min="0"
              step="0.01"
              value={formData.monthly_income}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Bank Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bank_name">Bank Name</label>
              <input
                id="bank_name"
                name="bank_name"
                type="text"
                value={formData.bank_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bank_account_number">Account Number</label>
              <input
                id="bank_account_number"
                name="bank_account_number"
                type="text"
                value={formData.bank_account_number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bank_account_holder">Account Holder Name</label>
            <input
              id="bank_account_holder"
              name="bank_account_holder"
              type="text"
              value={formData.bank_account_holder}
              onChange={handleChange}
            />
          </div>

        <div className="form-section">
          <h2>Address</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                name="street"
                type="text"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="number">Number</label>
              <input
                id="number"
                name="number"
                type="text"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code">Postal Code</label>
              <input
                id="postal_code"
                name="postal_code"
                type="text"
                value={formData.postal_code}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Saving...' : isEditMode ? 'Update Customer' : 'Create Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
