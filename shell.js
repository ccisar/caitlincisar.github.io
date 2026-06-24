// ─────────────────────────────────────────────────────────────────
//  SHARED SHELL
//  Single source of truth for the nav, footer, and the Contact +
//  Purrsona pop-outs across every page. Include on a page with:
//      <script src="shell.js" defer></script>
//  The page only needs <div class="night-grid"></div> and its own
//  <main> content; this file injects everything around it.
// ─────────────────────────────────────────────────────────────────
(function () {

  // ── Which page are we on? (drives the active nav link) ──
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isActive = file => (page === file ? ' class="active"' : '');

  // ── NAV ──
  const navHTML = `
  <nav>
    <div class="nav-inner">
      <div class="nav-status">
        <span class="nav-status-dot"></span>
        <span class="nav-status-label">online</span>
        <span class="nav-status-sep">/</span>
        <a href="#" class="nav-status-link" data-modal="modal-purrsona">Purrsona</a>
        <span class="nav-status-sep">/</span>
        <span class="nav-status-time" id="navTime">--:--</span>
      </div>
      <ul class="nav-links">
        <li><a href="index.html"${isActive('index.html')}>Home</a></li>
        <li><a href="research.html"${isActive('research.html')}>Research &amp; Projects</a></li>
        <li><a href="artwork.html"${isActive('artwork.html')}>Artwork</a></li>
        <li><a href="#" data-modal="modal-contact">Contact</a></li>
      </ul>
    </div>
  </nav>`;

  // ── FOOTER ──
  const footerHTML = `
    <footer>
      <div class="container">
        <div class="footer-inner">
          <p>© 2026 Caitlin Cisar</p>
          <div class="footer-links">
            <a href="https://github.com/ccisar" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/caitlin-cisar-634465159/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="#" data-modal="modal-contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>`;

  // ── MODALS (Contact + Purrsona) ──
  const modalsHTML = `
  <div class="modal-overlay" id="modal-contact" hidden>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div class="modal-bar">
        <span class="modal-bar-code">LCARS · 04·MSG</span>
        <h2 class="modal-title" id="contact-title">Contact</h2>
        <button type="button" class="modal-close" data-close aria-label="Close">×</button>
      </div>
      <div class="modal-body">
        <p class="modal-lede">Open a channel.</p>
        <div class="contact-list">
          <button type="button" class="contact-row contact-copy" id="contact-email" data-copy="caitlin.cisar@gmail.com" title="Click to copy email address">
            <span class="contact-row-label">Email</span>
            <span class="contact-row-val">caitlin.cisar@gmail.com</span>
            <span class="contact-copy-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="11" height="11" rx="2"></rect>
                <path d="M5 15V5a2 2 0 0 1 2-2h10"></path>
              </svg>
            </span>
          </button>
          <a class="contact-row" href="https://github.com/ccisar" target="_blank" rel="noopener">
            <span class="contact-row-label">GitHub</span>
            <span class="contact-row-val">github.com/ccisar</span>
          </a>
          <a class="contact-row" href="https://www.linkedin.com/in/caitlin-cisar-634465159/" target="_blank" rel="noopener">
            <span class="contact-row-label">LinkedIn</span>
            <span class="contact-row-val">linkedin.com/in/caitlin-cisar</span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="modal-purrsona" hidden>
    <div class="modal-panel modal-panel-wide" role="dialog" aria-modal="true" aria-labelledby="purrsona-title">
      <div class="modal-bar">
        <span class="modal-bar-code">LCARS · 03·CAT</span>
        <h2 class="modal-title" id="purrsona-title">Mini Purrsona Generator</h2>
        <button type="button" class="modal-close" data-close aria-label="Close">×</button>
      </div>
      <div class="modal-body">
        <p class="purrsona-tagline">A tiny linguistics toy. Generate a regal cat name.</p>

        <div class="purrsona-controls">
          <div class="purrsona-field">
            <span class="purrsona-label">Theme</span>
            <select class="purrsona-select" id="pg-theme">
              <option value="space">Space</option>
              <option value="cottagecore">Cottagecore</option>
              <option value="cheese">Cheese</option>
              <option value="chaos">Chaos</option>
              <option value="human">Human Names</option>
            </select>
          </div>

          <div class="purrsona-field">
            <span class="purrsona-label">Custom word</span>
            <input
              class="purrsona-input"
              id="pg-custom"
              type="text"
              placeholder="oreo, pixel, biscuit…"
              maxlength="30"
              autocomplete="off"
              spellcheck="false"
            />
          </div>

          <label class="purrsona-check">
            <input type="checkbox" id="pg-diminutive" checked />
            Diminutives
          </label>
          <label class="purrsona-check">
            <input type="checkbox" id="pg-title" checked />
            Titles
          </label>
        </div>

        <div class="purrsona-checkrow">
          <button class="purrsona-btn" id="pg-btn" type="button">Generate ↯</button>
          <button class="purrsona-btn purrsona-btn-copy" id="pg-copy" type="button" title="Copy name to clipboard">Copy</button>
        </div>

        <div class="purrsona-userrow">
          <button class="purrsona-btn purrsona-btn-user" id="pg-setuser" type="button" title="Use this name as your handle in the research terminal">Set as user</button>
        </div>

        <div class="purrsona-output" aria-live="polite">
          <div class="purrsona-name" id="pg-name">&nbsp;</div>
          <div class="purrsona-sub"  id="pg-sub">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>`;

  // ── Inject into the page ──
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', modalsHTML);
  const main = document.querySelector('main');
  if (main) main.insertAdjacentHTML('beforeend', footerHTML);

  // ── DENVER TIME ──
  (function () {
    function updateNavTime() {
      const now = new Date();
      const t = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Denver',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).format(now);
      // derive the zone abbreviation so it tracks DST (mdt in summer, mst in winter)
      const zoneParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Denver', timeZoneName: 'short'
      }).formatToParts(now);
      const zone = ((zoneParts.find(p => p.type === 'timeZoneName') || {}).value || '').toLowerCase();
      const el = document.getElementById('navTime');
      if (el) el.textContent = t + (zone ? ' ' + zone : '');
    }
    updateNavTime();
    setInterval(updateNavTime, 1000);
  })();

  // ── POP-OUT MODALS ──
  (function () {
    let lastFocus = null;

    function openModal(id) {
      const m = document.getElementById(id);
      if (!m) return;
      lastFocus = document.activeElement;
      m.hidden = false;
      document.body.classList.add('modal-open');
      requestAnimationFrame(() => m.classList.add('show'));
      const focusable = m.querySelector('select, input, button, a');
      if (focusable) focusable.focus();
    }

    function closeModal(m) {
      if (!m || m.hidden) return;
      m.classList.remove('show');
      document.body.classList.remove('modal-open');
      setTimeout(() => { m.hidden = true; }, 220);
      if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); openModal(btn.dataset.modal); });
    });
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
    });
    document.querySelectorAll('.modal-overlay').forEach(ov => {
      ov.addEventListener('click', e => { if (e.target === ov) closeModal(ov); });
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not([hidden])').forEach(closeModal);
      }
    });

    // ── Copy-to-clipboard rows (e.g. the contact email) ──
    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      }
      return fallbackCopy(text);
    }
    function fallbackCopy(text) {
      return new Promise((resolve, reject) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy') ? resolve() : reject(); }
        catch (e) { reject(e); }
        finally { document.body.removeChild(ta); }
      });
    }
    document.querySelectorAll('[data-copy]').forEach(btn => {
      const valEl = btn.querySelector('.contact-row-val');
      const original = valEl ? valEl.textContent : '';
      btn.addEventListener('click', () => {
        copyText(btn.dataset.copy).then(() => {
          btn.classList.add('copied');
          if (valEl) valEl.textContent = 'Copied ✓';
          setTimeout(() => {
            btn.classList.remove('copied');
            if (valEl) valEl.textContent = original;
          }, 1600);
        }).catch(() => {});
      });
    });
  })();

  // ── PURRSONA WIDGET ──
  (function () {
    const DB = {
      themes: {
        space:       ["nova","quasar","photon","pulsar","cosmos","orbit","comet","solstice","neutron","halo","lumen","aster","nebula","vega","rigel","sirius","andromeda","eclipse","meteor","galaxy","stardust","zenith","aurora","corona","equinox","supernova","ion","proton","quark","void","lyra","draco","titan","europa","callisto","parallax","apogee","zodiac","radiant","flare","orville","enterprise","DS9", "voyager", "discovery","cerritos","borg","vulcan","klingon","venus","mercury","pluto"],
        cottagecore: ["moss","thistle","wren","acorn","meadow","clover","fern","bramble","willow","birch","marlow","sage","heather","ivy","hollow","brook","fawn","nettle","juniper","primrose","sorrel","foxglove","daisy","poppy","linden","rowan","hawthorn","elderflower","honeysuckle","toadstool","lavender","chamomile","marigold","robin","sparrow","hedgerow","thatch","hearth","tansy","dewdrop"],
        cheese:      ["brie","gouda","stilton","havarti","asiago","cheddar","colby","romano","fontina","ricotta","muenster","camembert","mozzarella","parmesan","feta","gorgonzola","provolone","manchego","gruyere","emmental","jarlsberg","pecorino","mascarpone","burrata","halloumi","paneer","edam","roquefort","chevre","cotija","pepperjack","queso","pimento","creamcheese","cottagecheese","stringcheese","cheesecurds","fondue","swiss","limburger"],
        chaos:       ["glitch","mayhem","goblin","rocket","pixel","gremlin","spam","squad","plasma","beam","chaos","twitch","blaze","frenzy","havoc","rampage","turbo","zap","boom","crash","riot","rebel","venom","vortex","cyclone","thunder","nitro","fire","maniac","explosion","implosion","static","entropy","pandemonium","hazard","kaboom","meltdown","ruckus","anarchy","snafu"],
        human:       ["mabel","felix","beatrice","winston","nell","opal","hazel","theodore","ruby","otis","winifred","milo","clara","arthur","edith","george","seth","dorothy","harold","agnes","walter","florence","ernest","pearl","mildred","herbert","vera","cecil","gladys","leonard","jenny","mark","rupert","prudence","clark","arnold","cora","dwayne","lottie","edmund"]
      },
      diminutives: [
        "ito","ita","ette","ling","let","kins","kin","ino","ina",
        "ers","ster","ski","sy","sie","zie","zo","y","ie",
        "paws","bean","beans","bun","buns","belle","bug","boop","bop","boo","cub","pup","paw",
        "cake","cakey","snack","snacks","chip","chips","crumb","berry","muff","pie","tart","scone","jam","nugget",
        "doodle","doodles","noodle","noodles","wiggle","snuggle","cuddle","fluff","fluffy","fuzzle",
        "tron","bot","droid","zilla","oid","spark","core","byte","prime","scope","nator","borg",
        "aroo","arooz","wump","wumpy","pants","pantses","meister","man","o","ums","umsies","kinses"
      ],
      titles: [
        "Sir","Lady","Lord","Dame","Baron","Baroness","Viscount","Viscountess","Count","Countess",
        "Marquess","Marchioness","Duke","Duchess","Prince","Princess","King","Queen","Emperor","Empress",
        "Captain","Commander","Commodore","Admiral","Major","Colonel","General","Marshal","Warden","Ranger","Constable",
        "Lieutenant","Corporal","Private","Ensign","Sergeant","First Officer",
        "Professor","Doctor","Chief","Director","Master","Mistress","Archon","Chancellor","Dean","Officer","Engineer",
        "Mr.","Mrs.","Ms.","Miss","Mx.","Dude","Bro","Buddy","Pal","Boss","Coach","Neighbor","Homie","Bestie","Champ",
        "Mayor","Sheriff","Detective","Agent","Spy","Ninja","Sensei","Guru","Judge","Overlord","Manager","Intern",
        "Counselor","Guide","Mentor","Leader","Captain-General",
        "Saint","Oracle","Sage","Wizard","Witch","Magister","Magus","Seer","Prophet","Sorcerer","Warlock","Shaman",
        "Cleric","Priest","Priestess","Cardinal","Pope","Reverend",
        "Champion","Hero","Legend","Icon","Celebrity","Star","Superstar","Rockstar","Idol","Queen Bee",
        "Kingpin","Big Cheese","Top Cat","Number One","Chosen One","Boss Cat"
      ]
    };

    const THEME_LABELS = {
      space:       "celestial",
      cottagecore: "cottagecore",
      cheese:      "cheese-coded",
      chaos:       "internet gremlin",
      human:       "old-fashioned charmer"
    };

    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function toTitleCase(str) {
      return str
        .toLowerCase()
        .split(/\s+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }

    function generateName() {
      const theme        = document.getElementById('pg-theme').value;
      const customRaw    = document.getElementById('pg-custom').value.trim();
      const useDiminuti  = document.getElementById('pg-diminutive').checked;
      const useTitle     = document.getElementById('pg-title').checked;

      let base = pick(DB.themes[theme]);

      let didDiminutive = false;
      if (useDiminuti) {
        base = base + pick(DB.diminutives);
        didDiminutive = true;
      }

      let phrase = base;
      if (customRaw) {
        phrase = Math.random() < 0.5
          ? `${customRaw} ${base}`
          : `${base} ${customRaw}`;
      }

      let didTitle = false;
      if (useTitle) {
        phrase = `${pick(DB.titles)} ${phrase}`;
        didTitle = true;
      }

      const name = toTitleCase(phrase);

      const parts = [THEME_LABELS[theme]];
      if (didDiminutive) parts.push("diminutive");
      if (didTitle)      parts.push("titled");
      if (customRaw)     parts.push("custom word");

      return { name, sub: parts.join(" · ") };
    }

    function render() {
      const { name, sub } = generateName();
      const nameEl = document.getElementById('pg-name');
      const subEl  = document.getElementById('pg-sub');

      nameEl.classList.remove('flash');
      void nameEl.offsetWidth;
      nameEl.classList.add('flash');

      nameEl.textContent = name;
      subEl.textContent  = sub;
    }

    document.getElementById('pg-btn').addEventListener('click', render);

    document.getElementById('pg-copy').addEventListener('click', () => {
      const name = document.getElementById('pg-name').textContent.trim();
      if (!name || name === ' ') return;
      navigator.clipboard.writeText(name).then(() => {
        const btn = document.getElementById('pg-copy');
        btn.textContent = 'Copied ✓';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
      });
    });

    document.getElementById('pg-custom').addEventListener('keydown', e => {
      if (e.key === 'Enter') render();
    });

    // Slugify a generated name into a shell-style handle.
    function slugUser(raw) {
      return raw.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 24) || 'visitor';
    }

    document.getElementById('pg-setuser').addEventListener('click', () => {
      const name = document.getElementById('pg-name').textContent.trim();
      if (!name) return;
      const user = slugUser(name);
      try { localStorage.setItem('purrsona-user', user); } catch (e) { /* private mode */ }
      window.dispatchEvent(new CustomEvent('purrsona-user-set', { detail: user }));
      const btn = document.getElementById('pg-setuser');
      btn.textContent = 'You’re ' + user + ' ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Set as user'; btn.classList.remove('copied'); }, 2200);
    });

    render();
  })();

  // ── SCROLL REVEAL ──
  (function () {
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  })();

})();
