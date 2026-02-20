const pool = require('../config/database');
const { validateCustomer } = require('../utils/validators');

async function getAll(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM customers ORDER BY name ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get all customers error:', error);
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const customerData = req.body;

    // Validate customer data
    const validation = validateCustomer(customerData);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors.join(', ') });
    }

    const { name, birth_date, email, phone, profession, country, state, city, street, number, postal_code } = customerData;

    const result = await pool.query(
      `INSERT INTO customers (name, birth_date, email, phone, profession, country, state, city, street, number, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [name, birth_date, email, phone, profession, country, state, city, street, number, postal_code]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create customer error:', error);
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const customerData = req.body;

    // Validate customer data
    const validation = validateCustomer(customerData);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors.join(', ') });
    }

    const { name, birth_date, email, phone, profession, country, state, city, street, number, postal_code } = customerData;

    const result = await pool.query(
      `UPDATE customers 
       SET name = $1, birth_date = $2, email = $3, phone = $4, profession = $5, 
           country = $6, state = $7, city = $8, street = $9, number = $10, postal_code = $11,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $12
       RETURNING *`,
      [name, birth_date, email, phone, profession, country, state, city, street, number, postal_code, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update customer error:', error);
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAll, create, update };
