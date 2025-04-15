import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111827', color: '#d1d5db', padding: '3rem 1rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 250px' }}>
          <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>News Aggregator</h2>
          <p style={{ fontSize: '0.9rem' }}>Your daily source of trusted news from around the globe.</p>
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
            <li><a href="/about" style={linkStyle}>About</a></li>
            <li><a href="/contact" style={linkStyle}>Contact</a></li>
            <li><a href="/privacy" style={linkStyle}>Privacy Policy</a></li>
            <li><a href="/terms" style={linkStyle}>Terms of Service</a></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Follow Us</h3>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            
          </div>
        </div>
      </div>
      <div style={{ height: '1px', backgroundColor: '#1f2937', margin: '2rem 0' }}></div>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af' }}>
        &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
      </p>
    </footer>
  );
}

const linkStyle = {
  color: '#d1d5db',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.25rem'
};

const iconStyle = {
  fontSize: '1.2rem',
  textDecoration: 'none',
  color: '#d1d5db'
};
