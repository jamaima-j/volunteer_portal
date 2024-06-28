import React from 'react';
//this works, but html file has to be moved to public for use with iframe
const AdminPortal = () => {
  return (
    <div>
      <iframe
        src="/admin_portal.html"
        title="Admin Portal"
        style={{ width: '100%', height: '100vh', border: 'none'}}
      ></iframe>
    </div>
  );
};

export default AdminPortal;