// Function to inject the mobile menu into any page
function injectMobileMenu() {
  const menuHTML = `
    <style>
      @media (max-width: 768px) {
        .main-header {
          position: fixed;
          width: 100vw;
          top: 0;
          left: 0;
          z-index: 10000;
          background: var(--gradient-header);
        }
        
        /* Mobile slide-in panel from the right */
        .nav-links {
          position: fixed;
          top: 0;
          right: 0;
          left: auto;
          width: 90vw;
          max-width: 420px;
          height: 100vh;
          background: linear-gradient(180deg, #0d47a1, #002171);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding-top: 80px;
          transform: translateX(100%) scale(0.95);  /* start more scaled down for better effect */
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1), /* smooth easing */
                     opacity 400ms ease-in-out,
                     visibility 0s linear 400ms; /* delay visibility change */
          opacity: 0;
          visibility: hidden;
          z-index: 11000;
          box-shadow: -14px 0 40px rgba(13, 71, 161, 0.35);
          overflow-y: auto;
          will-change: transform, opacity; /* optimize animation performance */
          transform-origin: right center;
          backdrop-filter: blur(10px);  /* add blur effect to background */
        }
        .nav-links.active {
          visibility: visible;
          transform: translateX(0) scale(1);
          opacity: 1;
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1),
                     opacity 400ms ease-in-out,
                     visibility 0s;  /* immediate visibility */
          box-shadow: -14px 0 40px rgba(13, 71, 161, 0.35);
        }
        .nav-links.closing {
          visibility: hidden;
          transform: translateX(100%) scale(0.98);
          opacity: 0;
          transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1),
                    visibility 0s 500ms;
        }
        .nav-dropdown {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
  .account-btn {
          background: linear-gradient(180deg, rgba(13, 71, 161, 0.15), rgba(0, 33, 113, 0.25));
          border: 1px solid rgba(130, 177, 255, 0.1);
          color: white;
          cursor: pointer;
          padding: 14px 37px; /* increased vertical padding for taller buttons */
          border-radius: 9px;
          line-height: 1.2;
          margin-bottom: 12px;
          box-shadow: 0 2px 12px rgba(13, 71, 161, 0.15);
          transition: all 0.3s ease;
        }
        
        .account-btn:hover {
          background: linear-gradient(180deg, rgba(13, 71, 161, 0.25), rgba(0, 33, 113, 0.35));
          box-shadow: 0 4px 15px rgba(13, 71, 161, 0.25);
          transform: translateY(-1px);
        }

        .account-btn1 {
          background: linear-gradient(180deg, rgba(13, 71, 161, 0.2), rgba(0, 33, 113, 0.3));
          border: 1px solid rgba(130, 177, 255, 0.15);
          color: white;
          cursor: pointer;
          padding: 14px 59px; /* increased vertical padding for taller account button */
          border-radius: 9px;
          line-height: 1.2;
          box-shadow: 0 2px 12px rgba(13, 71, 161, 0.2);
          transition: all 0.3s ease;
        }
        
        .account-btn1:hover {
          background: linear-gradient(180deg, rgba(13, 71, 161, 0.3), rgba(0, 33, 113, 0.4));
          box-shadow: 0 4px 15px rgba(13, 71, 161, 0.3);
          transform: translateY(-1px);
        }
        
        .nav-links li > a {
          display: none;
        }
        /* make mobile nav buttons full-width and taller for easier tapping */
        .nav-links li,
        .nav-links li > button {
          display: block;
          width: 100%;
        }
        .nav-links button {
          box-sizing: border-box;
          width: calc(100% - 32px);
          margin: 0 16px 12px 16px;
          padding: 14px 18px;
          font-size: 1rem;
          text-align: left;
          border-radius: 10px;
        }
        .dropdown {
          all: initial;
          position: static;
          display: block;
          background: none !important;
          margin: 0;
          padding: 0;
          z-index: 10001;
          
        }
        .dropdown li a {
            margin-top: 14px;
            color: #e8f6ff;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            text-decoration: none;
            border-radius: 22px;
            font-size: 0.75rem;
            letter-spacing: 0.04em;
            font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
            font-weight: 500;
            margin-bottom: 12px;
            background: linear-gradient(120deg, rgba(13, 71, 161, 0.15), rgba(0, 33, 113, 0.25));
            box-shadow: 0 2px 12px rgba(13, 71, 161, 0.15);
            border: 1px solid rgba(130, 177, 255, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          .dropdown li a:hover, .dropdown li a:active {
            background: linear-gradient(120deg, rgba(13, 71, 161, 0.25), rgba(0, 33, 113, 0.35));
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(13, 71, 161, 0.25);
            border: 1px solid rgba(130, 177, 255, 0.2);
        }
        .dropdown li a:active {
          background: linear-gradient(120deg, rgba(13, 71, 161, 0.35), rgba(0, 33, 113, 0.45));
          color: #ffffff;
          transform: translateY(1px);
          box-shadow: 0 2px 8px rgba(13, 71, 161, 0.2);
          letter-spacing: 0.04em;
        }
        /* close/cancel button inside slide-in panel */
        .nav-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(90deg, rgba(13, 71, 161, 0.2), rgba(0, 33, 113, 0.25));
          border: 1px solid rgba(130, 177, 255, 0.1);
          color: #ffffff;
          font-size: 32px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          z-index: 11111;
          box-shadow: 0 4px 15px rgba(13, 71, 161, 0.25);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.95;
          backdrop-filter: blur(4px);
        }
        .nav-close:hover {
          background: linear-gradient(90deg, rgba(13, 71, 161, 0.3), rgba(0, 33, 113, 0.35));
          box-shadow: 0 6px 20px rgba(13, 71, 161, 0.35);
          transform: scale(1.1);
          opacity: 1;
        }
        .nav-close:focus { 
          outline: 2px solid rgba(130, 177, 255, 0.25);
          outline-offset: 2px;
          box-shadow: 0 6px 20px rgba(13, 71, 161, 0.35);
        }
        .nav-close:active {
          transform: scale(0.95);
        }
      }
      @media (min-width: 769px) {
        .main-header {
           background: linear-gradient(to left, #044bbdff, #000000ff);
        }
        .nav-links {
          position: static;
          width: auto;
          height: auto;
          background: none;
          display: flex;
          flex-direction: row;
          padding: 0;
          transform: none !important;
          transition: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          box-shadow: none;
          overflow: visible;
        }
        .nav-links li > button {
          display: none !important;
        }
        .nav-links li > a {
          display: block !important;
        }
        .dropdown {
          all: initial;
          position: absolute;
          display: block;
          top: 100%;
          left: 0;
          background: none !important;
          margin: 0;
          padding: 0;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-40px);
          transition: all 0.3s ease;
        }
        .nav-dropdown:hover > .dropdown, .nav-dropdown:focus-within > .dropdown {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        .dropdown li a {
          color: #ffffff;
          padding: 20px 36px;
          display: flex;
          align-items: center;
          text-decoration: none;
          border-radius: 16px;
          font-size: 1.15rem;
          letter-spacing: 0.03em;
          font-family: inherit;
          font-weight: 450;
          margin-bottom: 12px;
          background: linear-gradient(to bottom, rgba(13, 71, 161, 0.95), rgba(0, 33, 113, 0.95));
          box-shadow: 0 4px 15px rgba(13, 71, 161, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(130, 177, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .dropdown li a:hover {
          background: linear-gradient(to bottom, rgba(21, 101, 192, 0.95), rgba(13, 71, 161, 0.95));
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(13, 71, 161, 0.25);
          border: 1px solid rgba(130, 177, 255, 0.2);
          letter-spacing: 0.04em;
        }
      }
    </style>
    <header class="main-header">
      <nav class="main-nav">
        <div class="nav-logo">
          <a href="index.html"><img src="images/polybay.png" alt="Logo" height="40"></a>
        </div>
        <button class="nav-hamburger" id="navHamburger" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="navLinks">
          <button class="nav-close" id="navClose" aria-label="Close menu">×</button>
          <li>
            <a href="index.html">Home</a>
            <button class="account-btn" data-href="index.html">Home</button>
          </li>
          <li class="nav-dropdown">
            <a href="#">About Us</a>
            <button class="account-btn" data-toggle="dropdown">About Us</button>
            <ul class="dropdown">
              <li><a href="ourstory.html">Our Story</a></li>
              <li><a href="ourteam.html">Our Team</a></li>
              <li><a href="press.html">Press</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Programs</a>
            <button class="account-btn" data-toggle="dropdown">Programs</button>
            <ul class="dropdown">
              <li><a href="digital.html">Digital & Tech Skills</a></li>
              <li><a href="business.html">Business Skills</a></li>
              <li><a href="vocational.html">Vocational Skills</a></li>
              <li><a href="soft.html">Soft & Employability Skills</a></li>
              
            </ul>
          </li>
          <li>
            <a href="dashboard.html">Dashboard</a>
            <button class="account-btn" data-href="dashboard.html">Dashboard</button>
          </li>
          <li class="nav-dropdown">
            <a href="#">Contact Us</a>
            <button class="account-btn" data-toggle="dropdown">Contact Us</button>
            <ul class="dropdown">
              <li><a href="support.html">Customer Support</a></li>
              <li><a href="map.html">Store Locations</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#">Account</a>
            <button class="account-btn1" data-toggle="dropdown">Account</button>
            <ul class="dropdown">
              <li><a href="login.html">Login</a></li>
              <li><a href="signup.html">Sign Up</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
    `;

  // Insert the menu at the beginning of the body
  document.body.insertAdjacentHTML('afterbegin', menuHTML);

  // Add event listeners for mobile menu functionality
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  let menuOpen = false;
  navHamburger.addEventListener('click', () => {
    navHamburger.classList.toggle('active');
    // toggle aria-expanded for screen readers
    const expanded = navHamburger.getAttribute('aria-expanded') === 'true';
    navHamburger.setAttribute('aria-expanded', (!expanded).toString());

    if (!menuOpen) {
      navLinks.classList.add('active');
      navLinks.classList.remove('closing');
      // prevent body scroll while menu is open
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
      menuOpen = true;
    } else {
      navLinks.classList.remove('active');
      navLinks.classList.add('closing');
      document.body.classList.remove('mobile-menu-open');
      document.body.classList.add('mobile-menu-closing');
      // match the CSS transition (400ms) with a small buffer
      setTimeout(() => {
        navLinks.classList.remove('closing');
        document.body.classList.remove('mobile-menu-closing');
        document.body.style.overflow = '';
        menuOpen = false;
      }, 450);
    }
  });

  // Add close button handler (top-right cancel inside the panel)
  const navClose = document.getElementById('navClose');
  if (navClose) {
    navClose.addEventListener('click', () => {
      if (!menuOpen) return;
      navHamburger.classList.remove('active');
      navHamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
      navLinks.classList.add('closing');
      document.body.classList.remove('mobile-menu-open');
      document.body.classList.add('mobile-menu-closing');
      setTimeout(() => {
        navLinks.classList.remove('closing');
        document.body.classList.remove('mobile-menu-closing');
        document.body.style.overflow = '';
        menuOpen = false;
      }, 380);
    });
  }

  // Close menu when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (!menuOpen) return;
      if (navClose) navClose.click();
    }
  });

  // Close menu when clicking any anchor link inside the mobile panel (helpful for single-page flows)
  navLinks.addEventListener('click', (e) => {
    const target = e.target;
    if (!menuOpen) return;
    const anchor = (target && (target.tagName === 'A')) ? target : (target && target.closest ? target.closest('a') : null);
    if (anchor) {
      // Prevent any '#'-only links from causing navigation/scroll
      if (anchor.getAttribute('href') === '#') {
        e.preventDefault();
        // Keep menu open — toggling of dropdowns is handled separately
        return;
      }
      // trigger same closing sequence for real navigation links
      if (navHamburger.classList.contains('active')) navHamburger.classList.remove('active');
      navHamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('active');
      navLinks.classList.add('closing');
      document.body.classList.remove('mobile-menu-open');
      document.body.classList.add('mobile-menu-closing');
      setTimeout(() => {
        navLinks.classList.remove('closing');
        document.body.classList.remove('mobile-menu-closing');
        document.body.style.overflow = '';
        menuOpen = false;
      }, 380);
    }
  });

  // Add click event listeners to dropdown parent links only (mobile only)
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dropdown => {
    const parentLink = dropdown.querySelector('a[href="#"]');
    if (parentLink) {
      parentLink.addEventListener('click', function (e) {
        // Always prevent default for dropdown parent links so they don't navigate
        e.preventDefault();
        if (window.innerWidth <= 768) { // Only for mobile view
          const dropdownContent = dropdown.querySelector('.dropdown');
          dropdownContent.style.display =
            dropdownContent.style.display === 'block' ? 'none' : 'block';
        }
        // On desktop, hover/focus handles showing the dropdown; click does nothing
      });
    }
  });

  // Mobile buttons: data-href navigates, data-toggle toggles dropdown
  const mobileButtons = document.querySelectorAll('.nav-links button[data-href], .nav-links button[data-toggle]');
  mobileButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('data-href');
      const toggle = btn.getAttribute('data-toggle');
      if (href) {
        // If this is the dashboard link, require auth
        if (href === 'dashboard.html') {
          const isFirebaseAvailable = (typeof window.firebase !== 'undefined' && firebase.auth);
          const user = isFirebaseAvailable ? firebase.auth().currentUser : null;
          if (!user) {
            // prevent navigation and prompt login
            e.preventDefault();
            showAuthRequiredPrompt();
            return;
          }
        }
        // navigate and close menu
        window.location.href = href;
        return;
      }
      if (toggle === 'dropdown') {
        const parentLi = btn.closest('.nav-dropdown');
        if (!parentLi) return;
        const dd = parentLi.querySelector('.dropdown');
        if (!dd) return;
        // toggle display
        dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  // Ensure dropdown links close the menu on click
  const mobileDropdownLinks = document.querySelectorAll('.nav-links .dropdown a');
  mobileDropdownLinks.forEach(a => {
    a.addEventListener('click', () => {
      if (menuOpen) {
        navHamburger.classList.remove('active');
        navHamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        navLinks.classList.add('closing');
        document.body.classList.remove('mobile-menu-open');
        document.body.classList.add('mobile-menu-closing');
        setTimeout(() => {
          navLinks.classList.remove('closing');
          document.body.classList.remove('mobile-menu-closing');
          document.body.style.overflow = '';
          menuOpen = false;
        }, 380);
      }
    });
  });

  // --- Authentication check for Dashboard link ---
  // Shows a small modal/toast prompting the user to log in when they try
  // to access the dashboard while signed out.
  function showAuthRequiredPrompt() {
    if (document.getElementById('authRequiredPrompt')) return;
    const overlay = document.createElement('div');
    overlay.id = 'authRequiredPrompt';
    overlay.innerHTML = `
      <div class="auth-prompt-backdrop">
        <div class="auth-prompt-card" role="dialog" aria-labelledby="authPromptTitle" aria-modal="true">
          <h3 id="authPromptTitle">You must log in to access this feature</h3>
          <p>Please sign in to view your dashboard and progress.</p>
          <div class="auth-prompt-actions">
            <button id="authPromptLogin" class="auth-btn auth-btn-primary">Log In</button>
            <button id="authPromptCancel" class="auth-btn">Cancel</button>
          </div>
        </div>
      </div>
    `;
    // basic styles (keeps file self-contained)
    const style = document.createElement('style');
    style.id = 'authPromptStyle';
    style.innerHTML = `
      #authRequiredPrompt .auth-prompt-backdrop{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.35);z-index:120000}
      .auth-prompt-card{background:#fff;color:#111;padding:20px 22px;border-radius:12px;max-width:360px;width:92%;box-shadow:0 10px 40px rgba(0,0,0,0.25);text-align:center}
      .auth-prompt-card h3{margin:0 0 8px;font-size:1.05rem}
      .auth-prompt-card p{margin:0 0 16px;color:#333}
      .auth-prompt-actions{display:flex;gap:12px;justify-content:center}
      .auth-btn{padding:8px 14px;border-radius:8px;border:1px solid #cfcfcf;background:#f6f6f6;cursor:pointer}
      .auth-btn-primary{background:linear-gradient(90deg,#044bbd,#001f7a);color:#fff;border:none}
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    const loginBtn = document.getElementById('authPromptLogin');
    const cancelBtn = document.getElementById('authPromptCancel');
    loginBtn.addEventListener('click', () => {
      // go to login page
      window.location.href = 'login.html';
    });
    cancelBtn.addEventListener('click', () => {
      const el = document.getElementById('authRequiredPrompt');
      if (el) el.remove();
      const st = document.getElementById('authPromptStyle');
      if (st) st.remove();
    });

    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      const el = document.getElementById('authRequiredPrompt');
      if (el) el.remove();
      const st = document.getElementById('authPromptStyle');
      if (st) st.remove();
    }, 6000);
  }

  // Attach click handlers to dashboard links/buttons to require auth
  const dashboardAnchors = document.querySelectorAll('a[href="dashboard.html"]');
  dashboardAnchors.forEach(a => {
    a.addEventListener('click', (e) => {
      const isFirebaseAvailable = (typeof window.firebase !== 'undefined' && firebase.auth);
      const user = isFirebaseAvailable ? firebase.auth().currentUser : null;
      if (!user) {
        e.preventDefault();
        showAuthRequiredPrompt();
      }
      // if user exists, allow navigation
    });
  });

  const dashboardButtons = document.querySelectorAll('button[data-href="dashboard.html"]');
  dashboardButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const isFirebaseAvailable = (typeof window.firebase !== 'undefined' && firebase.auth);
      const user = isFirebaseAvailable ? firebase.auth().currentUser : null;
      if (!user) {
        e.preventDefault();
        showAuthRequiredPrompt();
        return;
      }
      // if user exists, allow existing mobileButtons handler to perform navigation
    });
  });
}

// Function to update account menu based on auth state
function updateAccountMenu(user) {
  const accountDropdown = document.querySelector('.nav-dropdown:last-child .dropdown');
  if (!accountDropdown) return;

  if (user) {
    // User is signed in
    accountDropdown.innerHTML = `
      <li><a href="#" id="signOutBtn"><span id="signOutText">Sign Out</span></a></li>
    `;
    // Add sign out functionality
    const signOutBtn = document.getElementById('signOutBtn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Create progress bar overlay
        let loaderOverlay = document.createElement('div');
        loaderOverlay.id = 'loaderOverlay';
        loaderOverlay.innerHTML = `
          <div class="progressbar-overlay">
            <div class="progressbar-container">
              <div class="progressbar-label">Signing Out...</div>
              <div class="progressbar-bg">
                <div class="progressbar-fill" id="signOutProgressBar"></div>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(loaderOverlay);
        // Add progress bar styles
        if (!document.getElementById('progressBarStyle')) {
          const style = document.createElement('style');
          style.id = 'progressBarStyle';
          style.innerHTML = `
            .progressbar-overlay {
              position: fixed;
              top: 0; left: 0;
              width: 100vw; height: 100vh;
              background: rgba(3, 37, 76, 0.55); /* deep blue backdrop */
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              backdrop-filter: blur(8px) saturate(140%);
            }
            .progressbar-container {
              background: rgba(255,255,255,0.06);
              border-radius: 20px;
              box-shadow: 0 10px 40px rgba(2,48,97,0.18);
              padding: 36px 44px;
              min-width: 320px;
              display: flex;
              flex-direction: column;
              align-items: center;
              border: 1px solid rgba(13,71,161,0.12);
            }
            .progressbar-label {
              font-size: 1.25rem;
              font-weight: 700;
              color: #0d47a1; /* primary blue */
              margin-bottom: 18px;
              letter-spacing: 0.6px;
              text-shadow: 0 2px 10px rgba(13,71,161,0.06);
            }
            .progressbar-bg {
              width: 100%;
              height: 18px;
              background: rgba(255,255,255,0.14);
              border-radius: 9px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(2,48,97,0.08);
              border: 1px solid rgba(255,255,255,0.04);
            }
            .progressbar-fill {
              height: 100%;
              width: 0%;
              background: linear-gradient(270deg, #044bbd, #0d47a1, #1e88e5, #044bbd);
              background-size: 400% 400%;
              border-radius: 9px;
              transition: width 0.2s linear;
              animation: gradientMove 2.2s ease-in-out infinite;
            }
            @keyframes gradientMove {
              0% {background-position:0% 50%;}
              50% {background-position:100% 50%;}
              100% {background-position:0% 50%;}
            }
            .progressbar-check {
              margin-top: 20px;
              width: 48px;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #ffffff;
              border-radius: 50%;
              box-shadow: 0 6px 18px rgba(2,48,97,0.14);
              animation: popCheck 0.45s ease;
            }
            @keyframes popCheck {
              0% {transform: scale(0.5); opacity:0;}
              80% {transform: scale(1.06); opacity:1;}
              100% {transform: scale(1); opacity:1;}
            }
          `;
          document.head.appendChild(style);
        }
        // Animate progress bar for 5 seconds
        const progressBar = document.getElementById('signOutProgressBar');
        let progress = 0;
        const duration = 5000; // 5 seconds
        const interval = 50;
        const step = 100 / (duration / interval);
        const progressInterval = setInterval(() => {
          progress += step;
          if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
          if (progress >= 100) {
            clearInterval(progressInterval);
            // Show checkmark animation before redirect
            const container = loaderOverlay.querySelector('.progressbar-container');
            if (container) {
              const checkDiv = document.createElement('div');
              checkDiv.className = 'progressbar-check';
              checkDiv.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="15" stroke="#044bbd" stroke-width="2" fill="#fff"/><path d="M10 17.5L15 22L22 13" stroke="#044bbd" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
              container.appendChild(checkDiv);
            }
            setTimeout(() => {
              firebase.auth().signOut().then(() => {
                window.location.href = 'index.html';
              }).catch((error) => {
                console.error('Sign Out Error', error);
                if (loaderOverlay) loaderOverlay.remove();
                const signOutText = document.getElementById('signOutText');
                if (signOutText) signOutText.textContent = 'Sign Out';
              });
            }, 700); // show checkmark for 0.7s
          }
        }, interval);
        // Change button text to progress bar
        const signOutText = document.getElementById('signOutText');
        if (signOutText) {
          signOutText.innerHTML = '<span style="display:inline-block;vertical-align:middle;color:#044bbd;font-weight:600;">Signing Out...</span>';
        }
      });
    }
  } else {
    // User is signed out
    accountDropdown.innerHTML = `
      <li><a href="login.html">Login</a></li>
      <li><a href="signup.html">Sign Up</a></li>
    `;
  }
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  injectMobileMenu();
  
  // Add Firebase auth state observer
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged((user) => {
      updateAccountMenu(user);
    });
  }
});
