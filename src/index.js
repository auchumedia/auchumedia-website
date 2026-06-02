* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #080808;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #080808; }
::-webkit-scrollbar-thumb { background: #003DA5; border-radius: 2px; }

a { text-decoration: none; color: inherit; }

/* ===== GLOBAL MOBILE FIXES ===== */
* { box-sizing: border-box; }

@media (max-width: 768px) {
  /* No horizontal overflow */
  html, body, #root { overflow-x: hidden; max-width: 100vw; }
  
  /* Hide scrollbars on carousels */
  div { scrollbar-width: none; }
  div::-webkit-scrollbar { display: none; }

  /* Section padding */
  section {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  /* Grids → single column */
  div[style*="grid-template-columns: 1fr 1fr"],
  div[style*="grid-template-columns: 1fr 2fr"],
  div[style*="grid-template-columns: 2fr 1fr"],
  div[style*="grid-template-columns: repeat(2"],
  div[style*="grid-template-columns: repeat(3"] {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }

  /* Nav sticky section — scrollable */
  div[style*="position: sticky"][style*="top: 68px"] {
    justify-content: flex-start !important;
    padding: 0 12px !important;
    overflow-x: auto !important;
  }

  /* Case study metrics — wrap nicely */
  div[style*="gap: 32px"][style*="flex-wrap: wrap"] {
    gap: 20px !important;
  }

  /* Hero padding */
  section[style*="min-height: 80vh"],
  section[style*="min-height: 85vh"] {
    padding: 120px 20px 60px !important;
  }

  /* Footer */
  footer div[style*="grid-template-columns"] {
    grid-template-columns: 1fr 1fr !important;
    padding: 32px 20px !important;
  }

  /* Home split */
  div[style*="display: flex; height: 100vh"] {
    flex-direction: column !important;
    height: auto !important;
  }
  div[style*="display: flex; height: 100vh"] > a {
    min-height: 50vh !important;
    padding: 48px 24px !important;
  }
}

/* Full bleed sections (case studies) */
#etudes-de-cas > div {
  width: 100vw !important;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw !important;
  margin-right: -50vw !important;
}

/* Service cards — 2 columns on mobile */
@media (max-width: 768px) {
  div[style*="grid-template-columns: repeat(3, 320px)"] {
    grid-template-columns: repeat(2, 1fr) !important;
    width: 100% !important;
  }
}
