const express = require('express');
const firebaseAdmin = require('firebase-admin');

// Initialize Firebase Admin SDK using environment variables
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

// Initialize Express
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Function to fetch Remote Config from Firebase
const fetchRemoteConfig = async () => {
  try {
    const remoteConfig = await firebaseAdmin.remoteConfig().getTemplate();
    return remoteConfig.parameters; // Only return parameters
  } catch (error) {
    throw new Error('Failed to fetch remote config');
  }
};

// API endpoint to get remote config
app.get('/api/remote-config', async (req, res) => {
  try {
    const config = await fetchRemoteConfig();
    res.status(200).json(config);
  } catch (error) {
    console.error('Error fetching remote config:', error);
    res.status(500).send('Error fetching remote config');
  }
});

// API endpoint to save remote config
app.post('/api/remote-config', async (req, res) => {
  try {
    const { parameters } = req.body;
    await firebaseAdmin.remoteConfig().setTemplate({ parameters });
    res.status(200).json({ message: 'Config updated successfully' });
  } catch (error) {
    console.error('Error saving remote config:', error);
    res.status(500).send('Error saving remote config');
  }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});