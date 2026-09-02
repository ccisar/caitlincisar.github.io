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
        <span class="nav-status-dot" id="navPurrsonaDot" aria-hidden="true"></span>
        <a href="#" class="nav-status-link" id="navPurrsonaLink" data-modal="modal-purrsona" aria-label="Purrsona — click to customize" title="Your Purrsona — click to customize">
          <span class="ns-full" aria-hidden="true">Purrsona</span><span class="ns-compact nav-icon-badge" aria-hidden="true">✦</span>
        </a>
        <span class="nav-status-sep">/</span>
        <a href="#" class="nav-status-link" id="navOffDutyLink" data-modal="modal-offduty" aria-label="Off Duty — what I’m reading, listening to, and playing" title="Off Duty — what I’m reading, listening to, and playing">
          <span class="ns-full" aria-hidden="true">Off Duty</span><span class="ns-compact nav-icon-badge nav-icon-badge--pink" aria-hidden="true">⌬</span>
        </a>
        <span class="nav-status-sep">/</span>
        <span class="nav-status-time" id="navTime">--:--</span>
      </div>
      <ul class="nav-links">
        <li><a href="index.html"${isActive('index.html')}>Home</a></li>
        <li><a href="research.html"${isActive('research.html')}>Research &amp; Projects</a></li>
        <li><a href="artwork.html"${isActive('artwork.html')}>Artwork</a></li>
      </ul>
    </div>
  </nav>`;

  // ── FOOTER ──
  const footerHTML = `
    <footer>
      <div class="container">
        <div class="footer-inner">
          <div class="footer-status">
            <span class="footer-copyright">© 2026 Caitlin Cisar</span>
            <span class="footer-sep">/</span>
            <div class="footer-quote-wrap">
              <button type="button" class="footer-quote" id="footerQuoteBtn" aria-expanded="false" aria-describedby="footerQuotePop">
                <span class="fq-mark" aria-hidden="true">“</span>Build Something Extraordinary<span class="fq-mark" aria-hidden="true">”</span>
              </button>
              <div class="footer-quote-pop" id="footerQuotePop" role="tooltip" hidden>
                In memory of my dad, who inspired people to <em>“Be Extraordinary”</em> and who inspired me to become an engineer.
              </div>
            </div>
          </div>

          <div class="footer-links">
            <a href="#" data-modal="modal-contact">Contact</a>
            <a class="footer-icon" href="https://github.com/ccisar" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a class="footer-icon" href="https://www.linkedin.com/in/caitlin-cisar-634465159/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
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
            <span class="contact-external-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          </a>
          <a class="contact-row" href="https://www.linkedin.com/in/caitlin-cisar-634465159/" target="_blank" rel="noopener">
            <span class="contact-row-label">LinkedIn</span>
            <span class="contact-row-val">linkedin.com/in/caitlin-cisar</span>
            <span class="contact-external-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="modal-purrsona" hidden>
    <div class="modal-panel modal-panel-wide" role="dialog" aria-modal="true" aria-labelledby="purrsona-title">
      <div class="modal-bar">
        <span class="modal-bar-code">LCARS · 03·CAT</span>
        <h2 class="modal-title" id="purrsona-title">Purrsona</h2>
        <button type="button" class="modal-close" data-close aria-label="Close">×</button>
      </div>
      <div class="modal-body">
        <p class="purrsona-tagline">A tiny linguistics toy. Generate a regal cat name.</p>

        <div class="purrsona-grid">

          <!-- ── Left column: inputs ── -->
          <div class="purrsona-col">

            <section class="pcard">
              <header class="pcard-head"><span class="pcard-title">Theme bank</span></header>
              <div class="theme-bank" id="pg-theme-bank" role="radiogroup" aria-label="Theme">
                <button type="button" class="theme-row is-active" data-theme="space" role="radio" aria-checked="true">
                  <span class="theme-row-dot" aria-hidden="true"></span>
                  <span class="theme-row-label">Space</span>
                  <span class="theme-row-num">01</span>
                </button>
                <button type="button" class="theme-row" data-theme="cottagecore" role="radio" aria-checked="false">
                  <span class="theme-row-dot" aria-hidden="true"></span>
                  <span class="theme-row-label">Cottagecore</span>
                  <span class="theme-row-num">02</span>
                </button>
                <button type="button" class="theme-row" data-theme="cheese" role="radio" aria-checked="false">
                  <span class="theme-row-dot" aria-hidden="true"></span>
                  <span class="theme-row-label">Cheese</span>
                  <span class="theme-row-num">03</span>
                </button>
                <button type="button" class="theme-row" data-theme="chaos" role="radio" aria-checked="false">
                  <span class="theme-row-dot" aria-hidden="true"></span>
                  <span class="theme-row-label">Chaos</span>
                  <span class="theme-row-num">04</span>
                </button>
                <button type="button" class="theme-row" data-theme="human" role="radio" aria-checked="false">
                  <span class="theme-row-dot" aria-hidden="true"></span>
                  <span class="theme-row-label">Human names</span>
                  <span class="theme-row-num">05</span>
                </button>
              </div>
            </section>

            <section class="pcard">
              <header class="pcard-head"><span class="pcard-title">Modifiers</span></header>
              <div class="modifiers">
                <label class="mod-row">
                  <span class="mod-row-label">Diminutives</span>
                  <span class="pswitch">
                    <input type="checkbox" id="pg-diminutive" checked />
                    <span class="pswitch-track" aria-hidden="true"><span class="pswitch-thumb"></span></span>
                  </span>
                </label>
                <label class="mod-row">
                  <span class="mod-row-label">Titles</span>
                  <span class="pswitch">
                    <input type="checkbox" id="pg-title" checked />
                    <span class="pswitch-track" aria-hidden="true"><span class="pswitch-thumb"></span></span>
                  </span>
                </label>
              </div>
            </section>

            <section class="pcard">
              <header class="pcard-head">
                <span class="pcard-title">Seed or custom name <span class="pcard-title-sub">· optional</span></span>
              </header>
              <div class="seed-field" id="pg-seed-field">
                <span class="seed-prompt" aria-hidden="true">&gt;</span>
                <input
                  class="seed-input"
                  id="pg-custom"
                  type="text"
                  placeholder="oreo, pixel, pickles lover, etc."
                  maxlength="40"
                  autocomplete="off"
                  spellcheck="false"
                />
                <span class="seed-cursor" aria-hidden="true"></span>
              </div>
              <p class="seed-caption">
                Seed the generator with this word, or set it as your Purrsona directly.
              </p>
              <div class="seed-action-row">
                <button class="ppill ppill-cyan ppill-sm" id="pg-seed" type="button" title="Generate a name using this word as a seed">Seed</button>
                <button class="ppill ppill-green ppill-sm" id="pg-setown" type="button" title="Set this word as your Purrsona directly">Set</button>
              </div>
            </section>

            <section class="pcard identity-card pcard-fill" id="pgIdentity">
              <header class="pcard-head"><span class="pcard-title">Currently online as</span></header>
              <div class="identity-body">
                <div class="identity-top">
                  <div class="purrsona-identity-name" id="pgIdentityName">Visitor</div>
                </div>
              </div>
            </section>

          </div>

          <!-- ── Right column: output + status ── -->
          <div class="purrsona-col purrsona-col-wide">

            <section class="pcard pcard-output">
              <header class="pcard-head">
                <span class="pcard-title">Output</span>
                <span class="pcard-status" id="pg-status">Standby</span>
              </header>
              <div class="output-name-row" aria-live="polite">
                <span class="hr-row">
                  <span class="hr-txt" id="pg-name">&nbsp;</span>
                  <span class="hr-block hr-block-cyan" id="pg-name-block" aria-hidden="true"></span>
                </span>
              </div>
              <div class="output-divider" aria-hidden="true"></div>
              <div class="output-tags" id="pg-tags"></div>
            </section>

            <div class="paction-row">
              <button class="ppill ppill-cyan ppill-split" id="pg-btn" type="button">
                <span class="ppill-label">Generate</span>
                <span class="ppill-sub" id="pg-btn-theme">Space</span>
              </button>
              <button class="ppill ppill-green" id="pg-setuser" type="button" title="Set this generated name as your Purrsona">
                <span class="ppill-label">Set as User</span>
              </button>
              <button class="ppill ppill-ghost" id="pg-copy" type="button" title="Copy name to clipboard">Copy</button>
              <button class="ppill ppill-ghost" id="pg-reset" type="button" title="Clear your Purrsona and go back to Visitor">Reset</button>
            </div>

            <section class="pcard pcard-fill">
              <header class="pcard-head">
                <span class="pcard-title">Session log</span>
                <span class="pcard-hint">Click to recall</span>
              </header>
              <div class="session-log">
                <p class="session-log-empty" id="pg-session-empty">No names yet. Hit Generate and your history will show here.</p>
                <div class="session-log-list" id="pg-session-list" hidden></div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="modal-offduty" hidden>
    <div class="modal-panel modal-panel-wide" role="dialog" aria-modal="true" aria-labelledby="offduty-title">
      <div class="modal-bar">
        <span class="modal-bar-code">LCARS · 06·NOW</span>
        <h2 class="modal-title" id="offduty-title">Off Duty</h2>
        <button type="button" class="modal-close" data-close aria-label="Close">×</button>
      </div>
      <div class="modal-body">
        <div class="purrsona-console">
          <div class="pc-row purrsona-tabs tk-tabs" role="tablist">
            <button class="purrsona-tab is-active" id="tk-tab-startrek" data-tk-tab="startrek" role="tab" aria-selected="true" aria-controls="tk-panel-startrek" type="button">Star Trek</button>
            <button class="purrsona-tab" id="tk-tab-listening" data-tk-tab="listening" role="tab" aria-selected="false" aria-controls="tk-panel-listening" type="button">Listening</button>
            <!-- Gaming and TV are on hold. Drop their tab buttons and panels back in (see git history) when there's real content for them. -->
            <button class="purrsona-tab" id="tk-tab-reading" data-tk-tab="reading" role="tab" aria-selected="false" aria-controls="tk-panel-reading" type="button">Reading</button>
          </div>

          <!-- Real entries. Update whenever the shelf changes. -->
          <div class="pc-row tk-panel tk-panel-books" id="tk-panel-reading" role="tabpanel" aria-labelledby="tk-tab-reading" hidden>
            <div class="tk-books-scroll">
              <div class="tk-book-group">
                <p class="tk-book-group-label"><span class="tk-group-icon tk-group-icon-spin" aria-hidden="true"></span>Currently reading</p>

                <div class="tk-book">
                  <span class="tk-book-n">1</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Midnight Train</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-fiction">Fiction</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Matt Haig</div>
                    <p class="tk-book-desc">A life lived and examined.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">2</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The AI Con</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-nonfiction">Non-Fiction</span>
                        <span class="proj-chip proj-chip-genre">Socio-tech</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Emily M. Bender &amp; Alex Hanna</div>
                    <p class="tk-book-desc">Perspectives on “AI.”</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">3</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Bohemians</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-nonfiction">Non-Fiction</span>
                        <span class="proj-chip proj-chip-genre">History of Literature</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Ben Tarnoff</div>
                    <p class="tk-book-desc">Mark Twain and the San Francisco writers who reinvented American literature.</p>
                  </div>
                </div>
              </div>

              <div class="tk-book-group">
                <p class="tk-book-group-label"><span class="tk-group-icon tk-group-icon-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6L12 2z"/></svg></span>Recommended</p>

                <div class="tk-book">
                  <span class="tk-book-n">1</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Sophie’s World</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-fiction">Fiction</span>
                        <span class="proj-chip proj-chip-genre">Philosophy</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Jostein Gaarder</div>
                    <p class="tk-book-desc">A history of philosophy, framed as one serious inquiry: who are you?</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">2</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Because Internet</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-nonfiction">Non-Fiction</span>
                        <span class="proj-chip proj-chip-genre">Linguistics</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Gretchen McCulloch</div>
                    <p class="tk-book-desc">How digital communication is shaping the English language.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">3</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Midnight Library</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-fiction">Fiction</span>
                        <span class="proj-chip proj-chip-genre">Fantasy</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Matt Haig</div>
                    <p class="tk-book-desc">The infinite possibilities of a single life.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">4</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Human-in-the-Loop Machine Learning</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-nonfiction">Non-Fiction</span>
                        <span class="proj-chip proj-chip-genre">Machine Learning</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Robert Munro Monarch</div>
                    <p class="tk-book-desc">How humans and machines work together.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">5</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Ten Steps to Nanette</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-nonfiction">Non-Fiction</span>
                        <span class="proj-chip proj-chip-genre">Biography</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Hannah Gadsby</div>
                    <p class="tk-book-desc">A memoir situation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pc-row tk-panel tk-panel-books" id="tk-panel-listening" role="tabpanel" aria-labelledby="tk-tab-listening" hidden>
            <div class="tk-books-scroll">
              <div class="tk-book-group">
                <p class="tk-book-group-label"><span class="tk-group-icon tk-group-icon-eq" aria-hidden="true"><i></i><i></i><i></i></span>Songs on repeat</p>

                <div class="tk-book">
                  <span class="tk-book-n">1</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Crazy Maybe</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Dubstep</span>
                        <span class="proj-chip proj-chip-genre">Bass</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Feed Me, Kill The Noise &amp; Anjulie</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">2</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">2080</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Glitch-Hop</span>
                        <span class="proj-chip proj-chip-genre">Electronic</span>
                      </div>
                    </div>
                    <div class="tk-book-author">The Polish Ambassador &amp; Ryan Herr</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">3</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Heaven, Iowa</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Pop Punk</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Fall Out Boy</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">4</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">MOS 6581</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Ambient</span>
                        <span class="proj-chip proj-chip-genre">Downtempo</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Carbon Based Lifeforms</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">5</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">6 Foot 7 Foot</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Hip-Hop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Lil Wayne</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">6</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Nightmare</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Dubstep</span>
                        <span class="proj-chip proj-chip-genre">Bass</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Nyxen</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">7</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Because You Move Me</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Melodic Techno</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Tinlicker &amp; Helsoot</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">8</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">BOA</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Hip-Hop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Megan Thee Stallion</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">9</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">333 266</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Ambient</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Amb</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">10</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Forgot About Dre</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Hip-Hop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Dr. Dre &amp; Eminem</div>
                  </div>
                </div>
              </div>

              <div class="tk-book-group">
                <p class="tk-book-group-label"><span class="tk-group-icon tk-group-icon-orbit" aria-hidden="true"><svg viewBox="0 0 24 24"><circle class="tk-orbit-ring" cx="12" cy="12" r="8.5"></circle><circle class="tk-orbit-dot" cx="12" cy="3.4" r="2.1"></circle></svg></span>Albums on repeat</p>

                <div class="tk-book">
                  <span class="tk-book-n">1</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">From Under the Cork Tree</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Pop Punk</span>
                        <span class="proj-chip proj-chip-genre">Emo</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Fall Out Boy</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">2</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Tha Carter III</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Hip-Hop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Lil Wayne</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">3</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Man on the Moon: The End of Day</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Hip-Hop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Kid Cudi</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">4</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Music To Refine To: A Remix Companion to Severance</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Electronic</span>
                        <span class="proj-chip proj-chip-genre">Score</span>
                      </div>
                    </div>
                    <div class="tk-book-author">ODESZA &amp; Theodore Shapiro</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">5</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Invasion of Privacy</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Hip-Hop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Cardi B</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">6</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Phantasmal Farm</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Glitch-Hop</span>
                        <span class="proj-chip proj-chip-genre">Electronic</span>
                      </div>
                    </div>
                    <div class="tk-book-author">The Polish Ambassador</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">7</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">World of Sleepers</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Ambient</span>
                        <span class="proj-chip proj-chip-genre">Downtempo</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Carbon Based Lifeforms</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">8</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Rise and Fall of a Midwest Princess</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Pop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Chappell Roan</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">9</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Complètement fou</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">French Pop</span>
                        <span class="proj-chip proj-chip-genre">Electropop</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Yelle</div>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">10</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Tron: Legacy Soundtrack</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Electronic</span>
                        <span class="proj-chip proj-chip-genre">Score</span>
                      </div>
                    </div>
                    <div class="tk-book-author">Daft Punk</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gaming and TV panels are on hold. See git history for the last version. -->

          <div class="pc-row tk-panel tk-panel-books" id="tk-panel-startrek" role="tabpanel" aria-labelledby="tk-tab-startrek">
            <div class="tk-books-scroll">
              <div class="tk-book-group">
                <p class="tk-book-group-label"><span class="tk-group-icon tk-group-icon-scan" aria-hidden="true"><svg viewBox="0 0 24 24"><rect class="tk-scan-track" x="3" y="3" width="18" height="18" rx="2"></rect><rect class="tk-scan-rect" x="3" y="3" width="18" height="18" rx="2"></rect></svg></span>The Next Generation: Philosophical Inquiry Watchlist</p>

                <div class="tk-book">
                  <span class="tk-book-n">1</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Darmok</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Xenolinguistics</span>
                        <span class="proj-chip proj-chip-genre">Common Ground</span>
                        <span class="proj-chip proj-chip-genre">Metaphor</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S5E02</div>
                    <p class="tk-book-desc">“Darmok and Jalad at Tanagra” is a linguist’s paradise.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">2</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Inner Light</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Identity</span>
                        <span class="proj-chip proj-chip-genre">Simulation Theory</span>
                        <span class="proj-chip proj-chip-genre">Reality</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S5E25</div>
                    <p class="tk-book-desc">Picard lives an entire second life in a single unconscious moment.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">3</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Measure of a Man</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Artificial Intelligence</span>
                        <span class="proj-chip proj-chip-genre">Identity</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S2E09</div>
                    <p class="tk-book-desc">A courtroom has to decide whether Data is Starfleet property or a person.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">4</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Tapestry</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Identity</span>
                        <span class="proj-chip proj-chip-genre">Free Will</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S6E15</div>
                    <p class="tk-book-desc">Who are you without your mistakes?</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">5</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Elementary, Dear Data + Ship in a Bottle</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Simulation Theory</span>
                        <span class="proj-chip proj-chip-genre">Identity</span>
                        <span class="proj-chip proj-chip-genre">Existence</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S2E03 + S6E12</div>
                    <p class="tk-book-desc">The Star Trek version of brain-in-a-vat. “All this might be just an elaborate simulation...”</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">6</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Second Chances</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Identity</span>
                        <span class="proj-chip proj-chip-genre">Duplication &amp; Fission</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S6E24</div>
                    <p class="tk-book-desc">Which Riker is the true Riker and which is the clone? Does it even matter? His beard is still the goat.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">7</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Outcast</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Identity</span>
                        <span class="proj-chip proj-chip-genre">Autonomy</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S5E17</div>
                    <p class="tk-book-desc">A genderless society that punishes those who don’t conform.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">8</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Half a Life</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Autonomy</span>
                        <span class="proj-chip proj-chip-genre">Mortality</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S4E22</div>
                    <p class="tk-book-desc">A culture that ends every life at sixty.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">9</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Offspring</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Personhood</span>
                        <span class="proj-chip proj-chip-genre">Identity</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S3E16</div>
                    <p class="tk-book-desc">Data builds a daughter and has to fight, again, for her right to exist.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">10</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Time’s Arrow</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Time Travel</span>
                        <span class="proj-chip proj-chip-genre">Mortality</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S5E26 + S6E01</div>
                    <p class="tk-book-desc">Data’s own severed head turns up five hundred years before he was built.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">11</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">The Quality of Life</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Sentience</span>
                        <span class="proj-chip proj-chip-genre">Personhood</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S6E09</div>
                    <p class="tk-book-desc">Where do you draw the line between a tool and a life?</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">12</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Remember Me</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Reality</span>
                        <span class="proj-chip proj-chip-genre">Solipsism</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S4E05</div>
                    <p class="tk-book-desc">“If there’s nothing wrong with me… maybe there’s something wrong with the universe.”</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">13</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">I, Borg</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Individuality</span>
                        <span class="proj-chip proj-chip-genre">Otherness</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S5E23</div>
                    <p class="tk-book-desc">A rescued drone starts saying “I” instead of “we.” </p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">14</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Pen Pals</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Prime Directive</span>
                        <span class="proj-chip proj-chip-genre">Ethics</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S2E15</div>
                    <p class="tk-book-desc">And a rule that says do nothing.</p>
                  </div>
                </div>

                <div class="tk-book">
                  <span class="tk-book-n">15</span>
                  <div class="tk-book-body">
                    <div class="tk-book-head">
                      <div class="tk-book-title">Cause and Effect</div>
                      <div class="tk-book-chips">
                        <span class="proj-chip proj-chip-genre">Causality</span>
                        <span class="proj-chip proj-chip-genre">Determinism</span>
                      </div>
                    </div>
                    <div class="tk-book-author">S5E18</div>
                    <p class="tk-book-desc">"All hands abandon ship!", "All hands abandon ship!", "All hands abandon ship!", ...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

  // ── OFF DUTY HEIGHT SYNC ──
  // Purrsona's console is organic. Its two-column grid stacks on narrow
  // viewports, and the session log grows and shrinks, so its true content
  // height moves with viewport width, not just viewport height. Off Duty
  // has no equivalent content to drive its own height. Instead of
  // hardcoding a pixel number that only matches Purrsona at one viewport
  // size, measure Purrsona's real (unclipped) height live and feed it
  // back into Off Duty's tab panels as their min-height. Both modals still
  // share the same 88vh cap, so they end up the same size everywhere.
  function syncOffDutyHeight() {
    try {
      const purrsonaPanel = document.querySelector('#modal-purrsona .modal-panel');
      const offDutyPanel  = document.querySelector('#modal-offduty .modal-panel');
      const tkPanels      = document.querySelectorAll('#modal-offduty .tk-panel');
      if (!purrsonaPanel || !offDutyPanel || !tkPanels.length) return;

      // Reads a panel's true content height, temporarily un-hiding + un-capping
      // it off-screen (visibility:hidden, not display:none) if it isn't already open.
      function measure(panel, patch) {
        const overlay = panel.closest('.modal-overlay');
        const wasHidden = overlay.hidden;
        const prevVisibility = overlay.style.visibility;
        if (wasHidden) { overlay.style.visibility = 'hidden'; overlay.hidden = false; }
        const prevMaxHeight = panel.style.maxHeight;
        panel.style.maxHeight = 'none';
        if (patch) patch();
        const height = panel.scrollHeight;
        panel.style.maxHeight = prevMaxHeight;
        if (wasHidden) { overlay.hidden = true; overlay.style.visibility = prevVisibility; }
        return height;
      }

      const purrsonaHeight = measure(purrsonaPanel);

      // Off Duty's own chrome (bar, padding, tagline, tabs row, hint) is fixed.
      // Remove the active tab panel entirely to isolate that overhead (min-height:0
      // alone isn't enough; the panel's own content, like the book list, would
      // still hold it open). .modal-panel-wide also carries its own 608px
      // min-height floor, which would otherwise mask how short the chrome
      // actually is once the tab panel is gone. Neutralize that too so this
      // reads the real number, then give the panels back whatever's left so
      // the total lands on Purrsona's height.
      const activeTk = document.querySelector('#modal-offduty .tk-panel:not([hidden])') || tkPanels[0];
      const prevDisplay = activeTk.style.display;
      const prevPanelMinHeight = offDutyPanel.style.minHeight;
      const overhead = measure(offDutyPanel, () => {
        activeTk.style.display = 'none';
        offDutyPanel.style.minHeight = '0px';
      });
      activeTk.style.display = prevDisplay;
      offDutyPanel.style.minHeight = prevPanelMinHeight;

      // A fixed height (not just min-height) so a content-heavy tab, like the
      // Reading list, can't push the panel taller than Purrsona and break
      // the match. Its own internal scroll (already in place on
      // .tk-books-scroll / .tk-list) absorbs whatever doesn't fit.
      // Purrsona's *natural* height can itself exceed the modal's 88vh cap
      // (.modal-panel { max-height: 88vh }) on a short viewport. Matching
      // it blindly would force the tk-panel taller than that cap too, so
      // .modal-panel scrolls as a second, outer scrollbar alongside the
      // list's own. Clamp to whatever actually fits under that cap instead;
      // getComputedStyle resolves the vh unit to real px even while hidden.
      // Floor (not round) and shave off an extra px of slack. Rounding a
      // few sub-values up could otherwise land target a hair over what
      // actually fits and reopen that outer scrollbar by a sliver.
      const capPx = parseFloat(getComputedStyle(offDutyPanel).maxHeight);
      const maxTarget = isFinite(capPx) ? Math.max(0, Math.floor(capPx - overhead) - 1) : Infinity;
      const target = Math.min(Math.max(0, Math.round(purrsonaHeight - overhead)), maxTarget);
      tkPanels.forEach(p => { p.style.height = target + 'px'; p.style.minHeight = target + 'px'; });
    } catch (e) { /* falls back to the static CSS min-height */ }
  }

  let offDutySyncRaf = null;
  window.addEventListener('resize', () => {
    if (offDutySyncRaf) cancelAnimationFrame(offDutySyncRaf);
    offDutySyncRaf = requestAnimationFrame(syncOffDutyHeight);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncOffDutyHeight);
  } else {
    syncOffDutyHeight();
  }

  // ── POP-OUT MODALS ──
  (function () {
    let lastFocus = null;

    function openModal(id) {
      const m = document.getElementById(id);
      if (!m) return;
      if (id === 'modal-offduty' || id === 'modal-purrsona') syncOffDutyHeight();
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

  // ── FOOTER QUOTE: click to reveal the backstory ──
  (function () {
    const btn = document.getElementById('footerQuoteBtn');
    const pop = document.getElementById('footerQuotePop');
    if (!btn || !pop) return;

    function closePop() {
      pop.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
    function openPop() {
      pop.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (pop.hidden) openPop(); else closePop();
    });
    document.addEventListener('click', (e) => {
      if (!pop.hidden && e.target !== btn && !pop.contains(e.target)) closePop();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePop(); });
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

    // ── Theme bank: click-to-select rows stand in for the old <select> ──
    let currentTheme = 'space';
    const themeRows     = Array.from(document.querySelectorAll('#pg-theme-bank .theme-row'));
    const btnThemeLabel = document.getElementById('pg-btn-theme');

    function selectTheme(theme) {
      currentTheme = theme;
      themeRows.forEach(row => {
        const active = row.dataset.theme === theme;
        row.classList.toggle('is-active', active);
        row.setAttribute('aria-checked', active ? 'true' : 'false');
        if (active && btnThemeLabel) btnThemeLabel.textContent = row.querySelector('.theme-row-label').textContent;
      });
    }
    themeRows.forEach(row => row.addEventListener('click', () => selectTheme(row.dataset.theme)));

    function generateName() {
      const customRaw    = document.getElementById('pg-custom').value.trim();
      const useDiminuti  = document.getElementById('pg-diminutive').checked;
      const useTitle     = document.getElementById('pg-title').checked;

      let base = pick(DB.themes[currentTheme]);

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

      const tags = [THEME_LABELS[currentTheme]];
      if (didDiminutive) tags.push("diminutive");
      if (didTitle)      tags.push("titled");
      if (customRaw)     tags.push("custom word");

      return { name, tags };
    }

    // ── Output card: the name plays the same block-text reveal as the
    //    homepage hero, replaying on every new result; tags render as chips ──
    const nameEl   = document.getElementById('pg-name');
    const blockEl  = document.getElementById('pg-name-block');
    const tagsEl   = document.getElementById('pg-tags');
    const statusEl = document.getElementById('pg-status');

    function playReveal() {
      [nameEl, blockEl].forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
      });
    }

    function renderTags(tags) {
      tagsEl.innerHTML = tags.map(t => `<span class="ptag">${t}</span>`).join('');
    }

    function setOutputStatus(text) {
      if (!statusEl) return;
      statusEl.textContent = text;
    }

    // ── Session log: keeps recent results, shows as many as fit without
    //    growing anything. The right column's card only ever affects the
    //    modal's overall size once it grows TALLER than the left column
    //    (that's when CSS Grid's row-stretch would kick in and inflate
    //    both columns together). Short of that line, the card just fills
    //    with its own content and nothing else moves. So rows are added
    //    one at a time and the add is undone the instant the right column
    //    would pass the left column's height. That's the real ceiling. ──
    const sessionLog = [];
    const SESSION_LOG_MAX = 12; // history retained; how many are shown is fit live
    const logEmptyEl = document.getElementById('pg-session-empty');
    const logListEl  = document.getElementById('pg-session-list');
    const logWrapEl  = document.querySelector('.pcard-fill > .session-log');
    const logRightColEl = logWrapEl.closest('.purrsona-col');
    const logLeftColEl  = document.querySelector('.purrsona-col:not(.purrsona-col-wide)');

    function sessionLogRowHTML(entry, i) {
      return '<button type="button" class="session-log-row" data-log-index="' + i + '">' +
        '<span class="session-log-name">' + entry.name + '</span>' +
        '<span class="session-log-theme">' + (THEME_LABELS[entry.theme] || entry.theme) + '</span>' +
        '</button>';
    }

    function renderSessionLog() {
      if (!sessionLog.length) {
        logEmptyEl.hidden = false;
        logListEl.hidden = true;
        logListEl.innerHTML = '';
        return;
      }
      logEmptyEl.hidden = true;
      logListEl.hidden = false;
      logListEl.innerHTML = '';

      const leftColHeight = logLeftColEl
        ? logLeftColEl.getBoundingClientRect().height
        : Infinity; // stacked mobile layout: columns don't share a row, no ceiling to respect

      for (let i = 0; i < sessionLog.length; i++) {
        logListEl.insertAdjacentHTML('beforeend', sessionLogRowHTML(sessionLog[i], i));
        if (logRightColEl.getBoundingClientRect().height > leftColHeight + 0.5) {
          logListEl.removeChild(logListEl.lastElementChild);
          break;
        }
      }
    }

    // Re-fit the visible row count if the viewport changes size while open
    // (e.g. resizing across the mobile breakpoint, or orientation change).
    let logResizeRaf = null;
    window.addEventListener('resize', () => {
      if (!sessionLog.length) return;
      if (logResizeRaf) cancelAnimationFrame(logResizeRaf);
      logResizeRaf = requestAnimationFrame(renderSessionLog);
    });

    logListEl.addEventListener('click', e => {
      const row = e.target.closest('[data-log-index]');
      if (!row) return;
      const entry = sessionLog[Number(row.dataset.logIndex)];
      if (!entry) return;
      showResult(entry.name, entry.tags, { record: false });
    });

    function showResult(name, tags, opts) {
      opts = opts || {};
      nameEl.textContent = name;
      renderTags(tags);
      playReveal();
      setOutputStatus('Standby');
      if (opts.record !== false) {
        sessionLog.unshift({ name: name, tags: tags, theme: currentTheme });
        sessionLog.length = Math.min(sessionLog.length, SESSION_LOG_MAX);
        renderSessionLog();
      }
    }

    function render() {
      const result = generateName();
      showResult(result.name, result.tags);
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

    // Slugify a name into a shell-safe handle (used for the terminal prompt).
    function slugUser(raw) {
      return raw.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 24) || 'visitor';
    }

    // ── Identity: paints the nav dot and nav label ──
    function applyIdentity(display) {
      const navLink   = document.getElementById('navPurrsonaLink');
      const navDot    = document.getElementById('navPurrsonaDot');
      const idName    = document.getElementById('pgIdentityName');

      // Only the full-word (desktop) label swaps to the display name;
      // the mobile-compact icon badge stays put so it keeps working as a small tap target.
      if (navLink) {
        const full = navLink.querySelector('.ns-full');
        if (full) full.textContent = display || 'Purrsona';
      }
      if (idName)  idName.textContent  = display || 'Visitor';

      // Dot color is fixed blue now (was per-persona hue); still track is-set for its size bump.
      if (navDot) navDot.classList.toggle('is-set', !!display);
    }

    // Save (or clear, with display=null) the visitor's Purrsona everywhere.
    function persistIdentity(display) {
      try {
        if (display) {
          localStorage.setItem('purrsona-display', display);
          localStorage.setItem('purrsona-user', slugUser(display));
        } else {
          localStorage.removeItem('purrsona-display');
          localStorage.removeItem('purrsona-user');
        }
      } catch (e) { /* private mode */ }
      const slug = display ? slugUser(display) : 'visitor';
      window.dispatchEvent(new CustomEvent('purrsona-user-set', { detail: { slug, display: display || null } }));
      applyIdentity(display);
    }

    function flashButton(btn, text, ms) {
      const original = btn.textContent;
      btn.textContent = text;
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, ms || 2000);
    }

    document.getElementById('pg-setuser').addEventListener('click', () => {
      const name = nameEl.textContent.trim();
      if (!name) return;
      persistIdentity(name);
      setOutputStatus('Committed');
      // Split button (label + icon span). Swap just the label so the icon survives the flash.
      const btn = document.getElementById('pg-setuser');
      const label = btn.querySelector('.ppill-label');
      const original = label.textContent;
      label.textContent = 'You’re set ✓';
      btn.classList.add('copied');
      setTimeout(() => { label.textContent = original; btn.classList.remove('copied'); }, 2200);
    });

    document.getElementById('pg-seed').addEventListener('click', render);

    document.getElementById('pg-setown').addEventListener('click', () => {
      const input = document.getElementById('pg-custom');
      const name = input.value.trim();
      const btn = document.getElementById('pg-setown');
      if (!name) {
        input.focus();
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 420);
        return;
      }
      persistIdentity(name);
      flashButton(btn, 'You’re set ✓', 2200);
    });

    document.getElementById('pg-reset').addEventListener('click', () => {
      persistIdentity(null);
      setOutputStatus('Standby');
      flashButton(document.getElementById('pg-reset'), 'Reset ✓', 1800);
    });

    // ── Init: restore whatever was set on a previous visit/page, and pre-fill
    //    the output card without counting it as a session-log run ──
    let initialDisplay = null;
    try { initialDisplay = localStorage.getItem('purrsona-display'); } catch (e) { /* private mode */ }
    applyIdentity(initialDisplay);

    const initial = generateName();
    showResult(initial.name, initial.tags, { record: false });
  })();

  // ── OFF DUTY WIDGET ──
  (function () {
    const tabs = document.querySelectorAll('#modal-offduty [data-tk-tab]');
    if (!tabs.length) return;
    function selectTab(name) {
      tabs.forEach(btn => {
        const active = btn.dataset.tkTab === name;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
        const panel = document.getElementById('tk-panel-' + btn.dataset.tkTab);
        if (panel) panel.hidden = !active;
      });
    }
    tabs.forEach(btn => btn.addEventListener('click', () => selectTab(btn.dataset.tkTab)));
  })();

  // ── TIMELINE RAIL: signal starts at rest; click near the center line to start/stop it ──
  (function () {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    timeline.addEventListener('click', (e) => {
      const rect = timeline.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      if (Math.abs(e.clientX - center) <= 16) {
        timeline.classList.toggle('is-running');
      }
    });
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
