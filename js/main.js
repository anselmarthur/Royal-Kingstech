/**
 * ROYAL KINSTECH LIMITED COMPANY - LOGO & BRANDED JAVASCRIPT
 * Dynamic Top Utility Bar, Mobile Drawer, Leaflet Map, Active Section Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
  initTopUtilityBar();
  initHeaderScroll();
  initMobileDrawer();
  initActiveNavHighlight();
  initLeafletMap();
  initCardInteractivity();
});

/**
 * Dynamic Top Utility Bar Scroll Transition
 * Height: ~40px & opacity: 1 on scroll up / top page load
 * Height: 0, opacity: 0, overflow: hidden on scroll down
 */
function initTopUtilityBar() {
  const utilityBar = document.getElementById('top-utility-bar');
  if (!utilityBar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 60 && currentScrollY > lastScrollY) {
      // Scrolling Down
      utilityBar.classList.add('minimized');
    } else if (currentScrollY < lastScrollY || currentScrollY <= 20) {
      // Scrolling Up or Near Top
      utilityBar.classList.remove('minimized');
    }

    lastScrollY = currentScrollY;
  });
}

/**
 * Sticky Header Background Opacity Shift on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.header-sticky');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Responsive Mobile Drawer Menu Toggle & Smooth Scroll
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Highlight Active Nav Item based on Scroll Position
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Leaflet Interactive Map for Ablekuma Headquarters (5.603944, -0.341167)
 */
function initLeafletMap() {
  const mapElement = document.getElementById('map-element');
  if (!mapElement) return;

  // Ablekuma Headquarters Exact Coordinates (5°36'14.2"N 0°20'28.2"W -> 5.603944, -0.341167)
  const ablekumaCoords = [5.603944, -0.341167];

  try {
    const map = L.map('map-element', {
      center: ablekumaCoords,
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Custom Gold & Royal Blue Map Pin Marker
    const brandIcon = L.divIcon({
      className: 'custom-brand-pin',
      html: `<div style="
        width: 32px;
        height: 32px;
        background: #2563EB;
        border: 3px solid #D4AF37;
        border-radius: 50%;
        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #D4AF37;
        font-size: 14px;
      "><i class="fa-solid fa-building"></i></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker(ablekumaCoords, { icon: brandIcon }).addTo(map)
      .bindPopup(`
        <div style="color: #0F0F0F; font-family: sans-serif; text-align: center; padding: 6px;">
          <strong style="color: #1E3A8A; font-size: 14px; font-weight: 800;">ROYAL KINSTECH LIMITED – Ablekuma Headquarters</strong><br>
          <span style="font-size: 12px; color: #4B5563;">Digital Address: GC-192-0746 | Ablekuma, Accra</span>
        </div>
      `)
      .openPopup();
  } catch (err) {
    console.log('Leaflet map initialization fallback:', err);
  }
}

/**
 * Micro-animations & Card hover enhancements
 */
function initCardInteractivity() {
  const cards = document.querySelectorAll('.value-card, .re-card, .sector-badge-card, .contact-card, .it-service-box, .news-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
