import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { supabase } from './supabaseClient'; // Make sure Supabase is correctly initialized

const App = () => {
  const [session, setSession] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);

    // Listen for changes to the session
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogin = async () => {
    // Redirect to Google OAuth login
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });

    if (error) {
      console.log('Error logging in: ', error.message);
    }
  };

  return (
    <div>
      {session ? (
        <div>
          <h1>Welcome back!</h1>
          <p>You're logged in!</p>
        </div>
      ) : (
        <div>
          <h1>Please Log In</h1>
          <button onClick={handleLogin}>Log in with Google</button>
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
