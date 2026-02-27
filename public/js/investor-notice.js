(function () {
  var MONO = 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Courier New",monospace';
  var SANS = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';

  function el(tag, css, text) {
    var e = document.createElement(tag);
    if (css) e.style.cssText = css;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function showInvestorNotice() {

    // ── Full-screen overlay ──────────────────────────────────────────────────
    var overlay = el('div', [
      'position:fixed', 'inset:0', 'z-index:99999',
      'background:#000',
      'display:flex', 'flex-direction:column',
      'font-family:' + SANS,
    ].join(';'));

    // ── Red top stripe ───────────────────────────────────────────────────────
    var stripe = el('div',
      'height:4px;flex-shrink:0;background:linear-gradient(90deg,#ff4040,#b91c1c);');

    // ── Nav bar ──────────────────────────────────────────────────────────────
    var nav = el('div', [
      'display:flex', 'align-items:center', 'justify-content:space-between',
      'padding:8px 14px', 'background:#1c1c1c',
      'border-bottom:1px solid #2e2e2e', 'flex-shrink:0',
    ].join(';'));

    var navLeft = el('div', 'display:flex;align-items:center;gap:6px;');
    var btnCss = [
      'background:#2a2a2a', 'border:1px solid #3e3e3e', 'border-radius:4px',
      'color:#777', 'width:22px', 'height:22px', 'padding:0',
      'font-size:12px', 'cursor:default',
      'display:flex', 'align-items:center', 'justify-content:center',
    ].join(';');
    navLeft.appendChild(el('button', btnCss, '←'));
    navLeft.appendChild(el('button', btnCss, '→'));
    navLeft.appendChild(el('span', 'color:#aaa;font-size:13px;margin-left:4px;', '1 of 1 error'));

    var navRight = el('div', 'display:flex;align-items:center;gap:8px;');
    navRight.appendChild(el('span',
      'width:8px;height:8px;border-radius:50%;background:#22c55e;display:inline-block;'));
    navRight.appendChild(el('span', 'color:#aaa;font-size:13px;', 'Next.js (16.1.6)'));
    navRight.appendChild(el('span', 'color:#555;font-size:20px;line-height:1;cursor:default;', '\u00D7'));

    nav.appendChild(navLeft);
    nav.appendChild(navRight);

    // ── Scrollable body ──────────────────────────────────────────────────────
    var body = el('div', [
      'flex:1', 'overflow-y:auto', 'background:#0d0d0d',
      'padding:28px 28px 48px',
    ].join(';'));

    // Heading
    var h1 = el('h1',
      'margin:0 0 20px;font-size:22px;font-weight:700;color:#fff;line-height:1.3;',
      'Unhandled Runtime Error');

    // Error message box
    var errBox = el('div', [
      'border-left:4px solid #e53e3e',
      'background:rgba(229,62,62,0.1)',
      'padding:12px 16px', 'margin-bottom:30px',
      'border-radius:0 4px 4px 0',
    ].join(';'));
    var errCode = el('code',
      'color:#fc8181;font-family:' + MONO + ';font-size:14px;',
      'ChunkLoadError: Loading chunk 4821 failed.' +
      ' (missing: /_next/static/chunks/footer-a7f3d2e9.js)');
    errBox.appendChild(errCode);

    // Source heading
    var h2 = el('h2',
      'margin:0 0 12px;font-size:20px;font-weight:700;color:#fff;',
      'Source');

    // Source path bar
    var pathBar = el('div', [
      'background:#1a1a1a', 'border:1px solid #2e2e2e',
      'border-radius:6px 6px 0 0',
      'padding:10px 14px',
      'display:flex', 'align-items:center', 'justify-content:space-between',
    ].join(';'));
    pathBar.appendChild(el('code',
      'color:#d4d4d4;font-family:' + MONO + ';font-size:13px;',
      '_next/static/chunks/pages/footer-a7f3d2e9.js (3847:22) @ ChunkLoader.eval [as _onChunkLoad]'));
    pathBar.appendChild(el('span', 'color:#555;font-size:14px;flex-shrink:0;margin-left:10px;', '\u29C9'));

    // ── Code block ───────────────────────────────────────────────────────────
    var codeWrap = el('div', [
      'background:#111', 'border:1px solid #2e2e2e', 'border-top:none',
      'border-radius:0 0 6px 6px',
      'padding:8px 0', 'overflow-x:auto',
      'font-family:' + MONO, 'font-size:13px', 'line-height:1.75',
    ].join(';'));

    var lines = [
      {
        n: 3845, hot: false, parts: [
          { t: '  ', c: '' },
          { t: 'async', c: '#569cd6' }, { t: ' ', c: '' },
          { t: 'function', c: '#569cd6' }, { t: ' ', c: '' },
          { t: 'getFooter', c: '#dcdcaa' },
          { t: '() {', c: '#d4d4d4' },
        ]
      },
      {
        n: 3846, hot: false, parts: [
          { t: '    ', c: '' },
          { t: 'const', c: '#569cd6' },
          { t: ' chunk = ', c: '#d4d4d4' },
          { t: 'await', c: '#569cd6' },
          { t: ' import(', c: '#d4d4d4' },
        ]
      },
      {
        n: 3847, hot: true, parts: [
          { t: '      ', c: '' },
          { t: '/* webpackChunkName: ', c: '#6a9955' },
          { t: '"footer-a7f3d2e9"', c: '#ce9178' },
          { t: ' */', c: '#6a9955' },
          { t: " './footer'", c: '#ce9178' },
        ]
      },
      {
        n: null, hot: true, caret: true, parts: [
          { t: '                                   ^', c: '#fc8181' },
        ]
      },
      {
        n: 3848, hot: false, parts: [
          { t: '    );', c: '#d4d4d4' },
        ]
      },
      {
        n: 3849, hot: false, parts: [
          { t: '    ', c: '' },
          { t: 'return', c: '#569cd6' },
          { t: ' chunk.default;', c: '#d4d4d4' },
        ]
      },
      {
        n: 3850, hot: false, parts: [
          { t: '  }', c: '#d4d4d4' },
        ]
      },
    ];

    lines.forEach(function (line) {
      var row = el('div', [
        'display:flex', 'align-items:baseline', 'padding:0 16px',
        line.hot && line.n ? 'background:rgba(229,62,62,0.14)' : '',
      ].filter(Boolean).join(';'));

      // Line number column
      var numEl = el('span');
      numEl.style.cssText = [
        'min-width:50px', 'flex-shrink:0',
        'text-align:right', 'padding-right:14px',
        'user-select:none',
        'color:' + (line.hot && line.n ? '#fc8181' : '#484848'),
      ].join(';');
      if (line.caret) {
        numEl.textContent = ' ';
      } else if (line.hot) {
        numEl.textContent = '> ' + line.n;
      } else {
        numEl.textContent = line.n;
      }
      row.appendChild(numEl);

      // Pipe
      var pipe = el('span',
        'color:#333;margin-right:14px;flex-shrink:0;user-select:none;', '|');
      row.appendChild(pipe);

      // Code parts
      var codeLine = el('span');
      line.parts.forEach(function (p) {
        var s = el('span', p.c ? 'color:' + p.c : '', p.t);
        codeLine.appendChild(s);
      });
      row.appendChild(codeLine);

      codeWrap.appendChild(row);
    });

    // ── Assemble ─────────────────────────────────────────────────────────────
    body.appendChild(h1);
    body.appendChild(errBox);
    body.appendChild(h2);
    body.appendChild(pathBar);
    body.appendChild(codeWrap);

    overlay.appendChild(stripe);
    overlay.appendChild(nav);
    overlay.appendChild(body);

    document.body.appendChild(overlay);
  }

  function init() {
    fetch('/api/investor-notice')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.show === true) {
          showInvestorNotice();
        }
      })
      .catch(function (err) {
        console.error('[investor-notice] failed to load:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
