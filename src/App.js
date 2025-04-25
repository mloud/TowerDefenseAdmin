import React, { useEffect, useState } from 'react';
import { remoteConfig } from './firebase';

const App = () => {
  const [configData, setConfigData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Funkce pro načtení dat z Remote Config
    const fetchConfig = async () => {
      try {
        // Fetch and activate the latest config
        await remoteConfig.fetchAndActivate();
        
        // Get the specific key from Remote Config
        const stageName = remoteConfig.getString('stageName');
        const rewardValue = remoteConfig.getString('rewardValue');
        
        // Uložení do stavu
        setConfigData({ stageName, rewardValue });
      } catch (error) {
        console.error("Error fetching remote config:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Firebase Remote Config</h1>
      {configData ? (
        <div>
          <p>Stage Name: {configData.stageName}</p>
          <p>Reward Value: {configData.rewardValue}</p>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default App;