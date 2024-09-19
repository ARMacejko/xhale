import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Ensure Supabase is correctly initialized

const PackageTagForm = () => {
  const [packageTag, setPackageTag] = useState('');
  const [batchTag, setBatchTag] = useState('');
  const [showBatchInput, setShowBatchInput] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Check if package tag exists in the database
    const { data, error } = await supabase
      .from('packages') // Replace with your actual packages table
      .select('*')
      .eq('package_number', packageTag);

    if (error) {
      setError('An error occurred while checking the package tag.');
      return;
    }

    if (data.length > 0) {
      // Package tag exists, display related batch data
      setMessage(`Package found. Batch: ${data[0].batch_id}`); // Display related batch ID or other details
    } else {
      // Package tag not found, show batch input
      setShowBatchInput(true);
    }
  };

  // Function to handle batch submission if package tag not found
  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Insert the batch and package tag into the database
    const { data: batchData, error: batchError } = await supabase
      .from('batches') // Replace with your actual batches table
      .insert([{ batch_number: batchTag }]);

    if (batchError) {
      setError('Error creating batch.');
      return;
    }

    const newBatchId = batchData[0].id; // Assuming the inserted batch has an 'id' field

    // Now, insert the package tag and link it to the new batch
    const { error: packageError } = await supabase
      .from('packages') // Replace with your actual packages table
      .insert([{ package_number: packageTag, batch_id: newBatchId }]);

    if (packageError) {
      setError('Error linking package to batch.');
      return;
    }

    setMessage('Batch and package tag created successfully!');
    setShowBatchInput(false); // Hide the batch input
  };

  return (
    <div>
      <h2>Submit Package Tag</h2>

      <form onSubmit={handlePackageSubmit}>
        <input
          type="text"
          value={packageTag}
          onChange={(e) => setPackageTag(e.target.value)}
          placeholder="Enter package tag"
          required
        />
        <button type="submit">Submit Package Tag</button>
      </form>

      {showBatchInput && (
        <form onSubmit={handleBatchSubmit}>
          <input
            type="text"
            value={batchTag}
            onChange={(e) => setBatchTag(e.target.value)}
            placeholder="Enter batch tag"
            required
          />
          <button type="submit">Submit Batch Tag</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default PackageTagForm;
