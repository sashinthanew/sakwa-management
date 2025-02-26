const express = require("express");
const Supplier = require("../models/Supplier");
const router = express.Router();

// ➤ Get All Suppliers
router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    console.log("Found suppliers:", suppliers); // Debug log
    res.json(suppliers);
  } catch (error) {
    console.error("Error in GET /suppliers:", error);
    res.status(500).json({ message: error.message });
  }
});

// ➤ Get a Single Supplier Profile
router.get("/:id", async (req, res) => {
  try {
    console.log("Looking for supplier with ID:", req.params.id); // Debug log
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      console.log("Found supplier:", supplier); // Debug log
      res.json(supplier);
    } else {
      res.status(404).json({ message: "Supplier not found" });
    }
  } catch (error) {
    console.error("Error in GET /suppliers/:id:", error);
    res.status(500).json({ message: error.message });
  }
});

// ➤ Add a New Supplier
router.post("/", async (req, res) => {
  try {
    console.log("Received supplier data:", req.body);

    // Validate required fields
    if (!req.body.supplierName || !req.body.vehicleType || !req.body.supplierQuantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert supplierQuantity to Number
    const supplierQuantity = Number(req.body.supplierQuantity);
    if (isNaN(supplierQuantity)) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    const supplier = new Supplier({
      supplierName: req.body.supplierName,
      vehicleType: req.body.vehicleType,
      supplierQuantity: supplierQuantity,
      profilePhoto: req.body.profilePhoto || '',
      address: req.body.address || '',
      phone: req.body.phone || '',
      email: req.body.email || '',
      department: req.body.department || '',
      workTime: req.body.workTime || '',
      workDates: req.body.workDates || '',
      arrivalTime: req.body.arrivalTime || ''
    });

    console.log("Created supplier object:", supplier);

    const newSupplier = await supplier.save();
    console.log("Saved supplier:", newSupplier);
    res.status(201).json(newSupplier);
  } catch (error) {
    console.error("Error saving supplier:", error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors
    });
  }
});

// ➤ Update a Supplier
router.put("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      supplier.supplierName = req.body.supplierName || supplier.supplierName;
      supplier.vehicleType = req.body.vehicleType || supplier.vehicleType;
      supplier.supplierQuantity = req.body.supplierQuantity || supplier.supplierQuantity;
      supplier.profilePhoto = req.body.profilePhoto || supplier.profilePhoto;

      const updatedSupplier = await supplier.save();
      res.json(updatedSupplier);
    } else {
      res.status(404).json({ message: "Supplier not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ➤ Delete a Supplier
router.delete("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier removed successfully" });
  } catch (error) {
    console.error("Delete supplier error:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
