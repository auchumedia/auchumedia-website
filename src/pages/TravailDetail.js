import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const BLACK = '#0a0a0a';
const BLUE = '#003DA5';

export default function TravailDetail() {
  const { slug } = useParams();
  const nom = slug.replace(/-/g, ' ');

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Nav />
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center', padding: '0 60px',
      }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'capitalize', color: 'rgba(10,10,10,0.45)', marginBottom: '20px' }}>
          {nom}
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue'", color: BLACK, fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.9, margin: '0 0 24px', textTransform: 'uppercase' }}>
          En construction.
        </h1>
        <p style={{ fontFamily: "'DM Sans'", fontSize: '15px', color: 'rgba(10,10,10,0.55)', maxWidth: '420px', lineHeight: 1.7, marginBottom: '32px' }}>
          Cette étude de cas s'en vient bientôt. En attendant, découvre nos autres mandats.
        </p>
        <Link to="/#travaux" style={{
          fontFamily: "'DM Sans'", fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#fff', background: BLUE, padding: '16px 32px',
          borderRadius: '6px',
        }}>
          ← Retour aux travaux
        </Link>
      </section>
      <Footer />
    </div>
  );
}
