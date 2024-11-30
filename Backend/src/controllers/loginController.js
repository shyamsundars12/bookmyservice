const Employee = require('../models/EmployeeModel');
const Customer = require('../models/CustomerModel');
const Admin = require('../models/AdminModel');

module.exports = {
  validateUser: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      let user;
      if (role === "customer") {
        user = await Customer.findOne({ email }, { password: true });
      } else if (role === "Employee") {
        user = await Employee.findOne({ email }, { password: true });
      } else if (role === "Admin" || role === "admin") {
        user = await Admin.findOne({ email }, { password: true });
      }

      // Check if user exists
      if (!user) {
        return res.json({ message: true });
      }

      // Validate password
      if (user.password === password) {
        return res.json({ message: true, id: user._id });
      } else {
        return res.json({ message: true });
      }
    } catch (err) {
      console.error("Error in validateUser:", err);
      res.status(500).send(err.message);
    }
  },

  checkExists: async (req, res) => {
    try {
      const { email, role } = req.body;

      let user;
      if (role === "customer") {
        user = await Customer.findOne({ email });
      } else if (role === "Employee") {
        user = await Employee.findOne({ email });
      } else if (role === "Admin" || role === "admin") {
        user = await Admin.findOne({ email });
      }

      // Check if user exists
      res.json({ message: user ? true : false });
    } catch (err) {
      console.error("Error in checkExists:", err);
      res.status(500).send(err.message);
    }
  },
};
