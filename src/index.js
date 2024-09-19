import React from 'react';
import ReactDOM from 'react-dom/client'; // This is the new import for createRoot
import './index.css'; // Assuming this file exists (It didn't)
import PackageTagForm from './PackageTagForm'; // Ensure this path is correct

// Create the root using the new API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <div>
      <h1>HEY</h1>
      <PackageTagForm />
    </div>
  </React.StrictMode>
);
