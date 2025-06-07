import React from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE}/api/posts`)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage("Error fetching posts"));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Instagram Clone</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;