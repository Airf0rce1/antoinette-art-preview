/* ============================================================
   Antoinette Jordaine ARt — cookie / GDPR consent banner
   Shared across all pages. Shows once on first visit, then
   remembers the visitor's choice in localStorage so it does
   not reappear. The site sets no advertising or tracking
   cookies; this notice covers essential technical data and
   third-party resources (Google Fonts, the contact form).
   ============================================================ */
(function () {
  var KEY = 'aj-cookie-consent';
  try {
    if (localStorage.getItem(KEY)) return; // already chosen
  } catch (e) { /* storage blocked: still show the banner */ }

  // ---- styles ----
  var css = ''
    + '.aj-cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;'
    + 'background:#1A1A1A;color:#FAFAF7;'
    + 'box-shadow:0 -2px 24px rgba(0,0,0,.25);'
    + 'transform:translateY(110%);transition:transform .6s cubic-bezier(0.22,1,0.36,1);}'
    + '.aj-cc.show{transform:none;}'
    + '.aj-cc-inner{max-width:1240px;margin:0 auto;padding:20px 28px;'
    + 'display:flex;gap:22px;align-items:center;justify-content:space-between;flex-wrap:wrap;}'
    + '.aj-cc p{margin:0;font-family:"Hanken Grotesk",system-ui,sans-serif;'
    + 'font-size:14px;line-height:1.6;color:rgba(250,250,247,.85);max-width:70ch;}'
    + '.aj-cc a{color:#FFE066;text-decoration:underline;text-underline-offset:2px;}'
    + '.aj-cc-actions{display:flex;gap:12px;flex-shrink:0;}'
    + '.aj-cc button{font-family:"Josefin Sans",sans-serif;letter-spacing:.18em;'
    + 'text-transform:uppercase;font-size:12px;padding:11px 22px;border:1px solid rgba(250,250,247,.4);'
    + 'background:none;color:#FAFAF7;cursor:pointer;transition:background .3s,color .3s,border-color .3s;}'
    + '.aj-cc button:hover{border-color:#FFE066;color:#FFE066;}'
    + '.aj-cc button.primary{background:#FAFAF7;color:#1A1A1A;border-color:#FAFAF7;}'
    + '.aj-cc button.primary:hover{background:#1565C0;border-color:#1565C0;color:#FAFAF7;}'
    + '@media(max-width:640px){.aj-cc-inner{flex-direction:column;align-items:flex-start;gap:16px;}'
    + '.aj-cc-actions{width:100%;}.aj-cc button{flex:1;}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- markup ----
  var bar = document.createElement('div');
  bar.className = 'aj-cc';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie and privacy notice');
  bar.innerHTML = ''
    + '<div class="aj-cc-inner">'
    + '<p>We use only essential technical data to run this website, and third-party services '
    + '(such as Google Fonts and our contact form) may process limited data, like your IP address, '
    + 'to function. We do not use advertising or tracking cookies. By continuing you agree to this. '
    + 'Read our <a href="contact.html">Privacy Policy</a>.</p>'
    + '<div class="aj-cc-actions">'
    + '<button type="button" class="decline">Decline</button>'
    + '<button type="button" class="primary accept">Accept</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(bar);

  // reveal after paint
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { bar.classList.add('show'); });
  });

  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* ignore */ }
    bar.classList.remove('show');
    setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 650);
  }
  bar.querySelector('.accept').addEventListener('click', function () { choose('accepted'); });
  bar.querySelector('.decline').addEventListener('click', function () { choose('declined'); });
})();
