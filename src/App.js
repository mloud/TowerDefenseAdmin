import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [configData, setConfigData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newConfig, setNewConfig] = useState({});
  const [configKeys, setConfigKeys] = useState([]);  // Store keys of the config

  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        const response = await axios.get('/api/remote-config');
        setConfigData(response.data);
        
        // Extract keys from the fetched config data
        if (response.data) {
          const keys = Object.keys(response.data);  // Get all keys in the config object
          setConfigKeys(keys);
        }
      } catch (error) {
        console.error('Error fetching remote config:', error);
      }
    };

    fetchRemoteConfig();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setNewConfig({ ...configData });
  };

  const handleSave = async () => {
    try {
      await axios.post('/api/remote-config', { parameters: newConfig });
      setConfigData(newConfig);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };

  return (
    <div>
      <h1>Tower Defense Remote Config Editor</h1>
      {isEditing ? (
        <div>
          <textarea
            value={JSON.stringify(newConfig, null, 2)}
            onChange={(e) => setNewConfig(JSON.parse(e.target.value))}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <pre>{JSON.stringify(configData, null, 2)}</pre>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}

      <h2>Config Keys</h2>
      <ul>
        {configKeys.length > 0 ? (
          configKeys.map((key, index) => (
            <li key={index}>{key}</li>
          ))
        ) : (
          <li>No config keys available</li>
        )}
      </ul>
    </div>
  );
};

export default App;