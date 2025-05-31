import React from 'react';

const TeacherWelcome = () => {
  const styles = {
    container: {
      height: '100vh',
      background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', sans-serif",
    },
    card: {
      backgroundColor: '#fff',
      padding: '40px',
      maxWidth: '600px',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      animation: 'fadeIn 1.2s ease',
    },
    heading: {
      fontSize: '2.4rem',
      color: '#00796b',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '1.1rem',
      color: '#444',
      lineHeight: '1.6',
    },
    message: {
      marginTop: '20px',
      fontSize: '1.2rem',
      color: '#1b5e20',
      fontWeight: 'bold',
    },
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
  };

  // Inline animation injection
  const fadeInStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <>
      <style>{fadeInStyle}</style>
      <div style={styles.container}>
        <div style={{ ...styles.card, animation: 'fadeIn 1.2s ease' }}>
          <h1 style={styles.heading}>Welcome to LWS, Educator!</h1>
          <p style={styles.paragraph}>
            We’re thrilled to welcome you to our learning ecosystem. Your wisdom and guidance will spark the minds of tomorrow.
          </p>
          <p style={styles.paragraph}>
            Let's shape the future of education, together. 🌟📚
          </p>
          <div style={styles.message}>
            Your journey of inspiration starts now.
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherWelcome;