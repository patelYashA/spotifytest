module.exports = {
  database: {
    options: {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    },
  },
  user: {
    roles: ["Admin", "User", "Sub-Admin", "Sales-Commission-Agent"],
  },
  roles: {
    admin: "Admin",
    user: "User",
    subAdmin: "Sub-Admin",
    salesCommissionAgent: "Sales-Commission-Agent",
  },
};
