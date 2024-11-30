const path = require('path');  // Required for working with paths
const fs = require('fs');       // Required for file system operations
const moment = require("moment-timezone");
const uploadImage = require("../Helper/imageUploader.js");
const ServiceModel = require('../models/ServiceModel');  // Adjust the path if necessary


module.exports = {
  createService: async (req, res) => {
    console.log(req.body);

    // Create a new service object based on the request body
    const service = new ServiceModel({
      name: req.body.name,
      price: req.body.price,
      time: req.body.time,
      desc: req.body.desc,
    });

    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const image = req.files.image; // Get the uploaded image
    const id = moment.utc().unix(); // Generate a unique ID based on the current UTC time
    let ext = image.name.substring(image.name.indexOf(".") + 1); // Get the file extension
    image.name = id + "." + ext; // Rename the image file with the unique ID
    
    const uploadDir = path.join(__dirname, '../assets/uploads'); // Correct the directory path
    console.log('Upload directory:', uploadDir);
    
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
      console.log('Uploads directory created:', uploadDir);
    }

    // Define the full path to save the image
    const imageUploadPath = path.join(uploadDir, image.name);
    
    try {
      // Move the uploaded file to the 'uploads' folder
      await image.mv(imageUploadPath); // Move file asynchronously
      console.log('Image moved successfully:', imageUploadPath);

      // Upload the image to the cloud (e.g., Cloudinary)
      const result = await uploadImage(id, 'Services', image.name);
      service.url = result.secure_url;
      service.imageId = result.public_id;

      // Save the new service to the database
      const newService = await service.save();
      res.json(newService); // Return the saved service as the response
    } catch (err) {
      console.error("Error during file upload or saving service:", err);
      res.status(500).send('Internal Server Error');
    }
  },

  // Other controller methods like getService, getServiceById, etc


  // Other functions (getService, getServiceById, etc.) remain the same..


  getService: async (req, res) => {
    try {
      const service = await ServiceModel.find({});
      res.json(service);
    } catch (err) {
      console.error("Error fetching services:", err);
      res.status(500).json({ message: err.message });
    }
  },

  getServiceById: async (req, res) => {
    const serId = req.body.serId;

    console.log('Fetching service by ID:', serId);
    try {
      const service = await ServiceModel.findById(serId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(service);
    } catch (err) {
      console.error("Error fetching service by ID:", err);
      res.status(500).json({ message: err.message });
    }
  },

  updateService: async (req, res) => {
    const id = req.body._id;
    const update = req.body;

    try {
      const service = await ServiceModel.findByIdAndUpdate(id, update, { new: true });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.send(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).send(error);
    }
  },

  InactiveService: async (req, res) => {
    const id = req.body._id;

    try {
      const service = await ServiceModel.findByIdAndUpdate(id, { isActive: false });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.send(service);
    } catch (error) {
      console.error("Error deactivating service:", error);
      res.status(500).send(error);
    }
  },

  ActiveService: async (req, res) => {
    const id = req.body._id;

    try {
      const service = await ServiceModel.findByIdAndUpdate(id, { isActive: true });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.send(service);
    } catch (error) {
      console.error("Error activating service:", error);
      res.status(500).send(error);
    }
  }
};
