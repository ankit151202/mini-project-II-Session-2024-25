import React from 'react';

function TermsAndConditions() {
  const currentDate = new Date().toLocaleDateString();

  return React.createElement(
    'div',
    { style: containerStyle },
    React.createElement('h1', { style: headingStyle }, 'Terms and Conditions'),
    React.createElement(
      'p',
      { style: textStyle },
      'Welcome to NewsHub. By accessing or using our website, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, please do not use our service.'
    ),
    createSection('1. Use of Content', 'All content provided on this site is for informational purposes only. We do not guarantee the accuracy, completeness, or usefulness of any content.'),
    createSection('2. Intellectual Property', 'The content, layout, design, data, and graphics on this website are protected by intellectual property laws. You may not reuse or reproduce them without our permission.'),
    createSection('3. User Conduct', 'You agree not to use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of NewsHub.'),
    createSection('4. Modifications', 'We reserve the right to revise these terms at any time without notice. By continuing to use the website, you agree to be bound by the current version of these terms.'),
    createSection('5. Contact Us', 'If you have any questions about these Terms, please contact us at ', true),
    React.createElement(
      'p',
      { style: { ...textStyle, fontSize: '0.9rem', marginTop: '2rem', color: '#6b7280' } },
      'Last updated: ' + currentDate
    )
  );
}

// 📦 Helper function to create sections
function createSection(title, content, withLink) {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h2', { style: subheadingStyle }, title),
    React.createElement(
      'p',
      { style: textStyle },
      withLink
        ? [
            content,
            React.createElement(
              'a',
              {
                key: 'link',
                href: 'mailto:support@newshub.com',
                style: linkStyle,
              },
              'support@newshub.com'
            ),
            '.',
          ]
        : content
    )
  );
}

// 🎨 Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '2rem 1rem',
  lineHeight: '1.7',
  fontFamily: 'Arial, sans-serif',
  color: '#1f2937',
};

const headingStyle = {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: '#111827',
};

const subheadingStyle = {
  fontSize: '1.25rem',
  marginTop: '2rem',
  marginBottom: '0.5rem',
  color: '#111827',
};

const textStyle = {
  fontSize: '1rem',
  marginBottom: '1rem',
};

const linkStyle = {
  color: '#2563eb',
  textDecoration: 'none',
};

export default TermsAndConditions;
