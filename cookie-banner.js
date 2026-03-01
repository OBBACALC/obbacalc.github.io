/**
 * OBBACalc Cookie Consent Banner
 * Implements Google Consent Mode v2
 * No dependencies — pure vanilla JS
 */
(function() {
  const CONSENT_KEY = 'obbacalc_cookie_consent';
  const stored = localStorage.getItem(CONSENT_KEY);

  // Apply consent state to Google tag
  function applyConsent(granted) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: 'denied', // we never use ads
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }

  // If already decided, apply and exit
  if (stored === 'accepted') { applyConsent(true); return; }
  if (stored === 'rejected') { applyConsent(false); return; }

  // Otherwise build and show banner
  const style = document.createElement('style');
  style.textContent = `
    #obbacalc-cookie-banner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: #0D1F3C;
      color: white;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      z-index: 9999;
      box-shadow: 0 -4px 24px rgba(0,0,0,0.25);
      flex-wrap: wrap;
      font-family: 'DM Sans', sans-serif;
      border-top: 3px solid #C9952A;
      animation: slideUp 0.3s ease;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    #obbacalc-cookie-banner .cb-text {
      flex: 1;
      min-width: 260px;
      font-size: 14px;
      color: rgba(255,255,255,0.85);
      line-height: 1.5;
    }
    #obbacalc-cookie-banner .cb-text a {
      color: #F0B940;
      text-decoration: none;
      font-weight: 600;
    }
    #obbacalc-cookie-banner .cb-text strong {
      color: white;
    }
    #obbacalc-cookie-banner .cb-buttons {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }
    #obbacalc-cookie-banner .cb-accept {
      background: #C9952A;
      color: #0D1F3C;
      border: none;
      padding: 9px 22px;
      border-radius: 7px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s;
    }
    #obbacalc-cookie-banner .cb-accept:hover { background: #F0B940; }
    #obbacalc-cookie-banner .cb-reject {
      background: transparent;
      color: rgba(255,255,255,0.7);
      border: 1.5px solid rgba(255,255,255,0.25);
      padding: 9px 18px;
      border-radius: 7px;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }
    #obbacalc-cookie-banner .cb-reject:hover {
      border-color: rgba(255,255,255,0.6);
      color: white;
    }
    @media (max-width: 600px) {
      #obbacalc-cookie-banner { flex-direction: column; align-items: flex-start; }
      #obbacalc-cookie-banner .cb-buttons { width: 100%; }
      #obbacalc-cookie-banner .cb-accept,
      #obbacalc-cookie-banner .cb-reject { flex: 1; text-align: center; }
    }
  `;
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.id = 'obbacalc-cookie-banner';
  banner.innerHTML = `
    <div class="cb-text">
      <strong>We use cookies</strong> — We use Google Analytics to understand how visitors use our calculators. 
      No personal data is sold. Calculator inputs never leave your browser. 
      <a href="/privacy.html">Privacy Policy</a> · <a href="/disclaimer.html">Disclaimer</a>
    </div>
    <div class="cb-buttons">
      <button class="cb-reject" id="cb-reject-btn">Reject Analytics</button>
      <button class="cb-accept" id="cb-accept-btn">Accept Cookies</button>
    </div>
  `;

  function dismiss(accepted) {
    localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'rejected');
    applyConsent(accepted);
    banner.style.animation = 'none';
    banner.style.transition = 'transform 0.25s ease, opacity 0.25s ease';
    banner.style.transform = 'translateY(100%)';
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 300);
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(banner);
    document.getElementById('cb-accept-btn').addEventListener('click', () => dismiss(true));
    document.getElementById('cb-reject-btn').addEventListener('click', () => dismiss(false));
  });
})();
