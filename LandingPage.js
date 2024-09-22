import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Adjust the path as needed

const LandingPage = () => {
    const [user, setUser] = useState(null);
    const [packageTag, setPackageTag] = useState('');
    const [batchTag, setBatchTag] = useState('');

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle the submission, e.g., check for batch tag
        console.log('Package Tag:', packageTag);
        console.log('Batch Tag:', batchTag);
    };

    return (
        <div>
            <h1>Welcome, {user ? user.email : 'Guest'}!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Package Tag:
                        <input 
                            type="text" 
                            value={packageTag} 
                            onChange={(e) => setPackageTag(e.target.value)} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Batch Tag:
                        <input 
                            type="text" 
                            value={batchTag} 
                            onChange={(e) => setBatchTag(e.target.value)} 
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LandingPage;
