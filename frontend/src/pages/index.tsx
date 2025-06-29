import React from 'react';

const PDF_URL = '/ludus.pdf'; // Place your PDF in /public/ludus.pdf

const Home: React.FC = () => {
    return (
        <main
            style={{
                minHeight: '100vh',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                padding: '2rem',
            }}
        >
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0, letterSpacing: '-1px' }}>
                    DigitalLudus
                </h1>
                <p style={{ color: '#666', marginTop: '1rem', fontSize: '1.1rem' }}>
                    The digital companion to your Latin textbook, <b>Ludus</b>.
                </p>
            </header>
            <section style={{ width: '100%', maxWidth: 900, boxShadow: '0 2px 16px #0001', borderRadius: 8, overflow: 'hidden', background: '#fafafa' }}>
                <iframe
                    src={PDF_URL}
                    title="Ludus Textbook PDF"
                    style={{
                        width: '100%',
                        height: '80vh',
                        border: 'none',
                        background: '#fff',
                        display: 'block',
                    }}
                />
            </section>
            <footer style={{ marginTop: '2rem', color: '#aaa', fontSize: '0.95rem' }}>
                &copy; {new Date().getFullYear()} DigitalLudus
            </footer>
        </main>
    );
};

export default Home;