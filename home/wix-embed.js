/* TerpVault home page beta: shows the hosted home page full screen inside the Wix page. */
(function () {
  /* Review mode: the time stamp makes edits show within a minute. Swap for a fixed ?v= before a release. */
  var SRC = 'https://themantobeat.github.io/terpvault-ar/home/?t=' + Math.floor(Date.now() / 60000);
  class TvHome extends HTMLElement {
    connectedCallback() {
      if (this._f) return;
      var f = document.createElement('iframe');
      f.src = SRC;
      f.title = 'TerpVault';
      f.setAttribute('allow', 'xr-spatial-tracking; fullscreen');
      f.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100vh;height:100dvh;border:0;margin:0;padding:0;z-index:9000;background:#0b0c0c;display:block';
      document.body.appendChild(f);
      this._f = f;
      this._o = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    disconnectedCallback() {
      if (this._f) { this._f.remove(); this._f = null; }
      document.documentElement.style.overflow = this._o || '';
    }
  }
  /* Log In bridge: the hosted page asks this Wix page to open its own login bar (Google sign-in pop-up). */
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://themantobeat.github.io' || !e.data || e.data.tv !== 'login') return;
    var b = document.querySelector('.wixui-login-social-bar, [data-testid="login-bar"]');
    if (b) b.click();
  });
  ['tv-home', 'wix-default-custom-element'].forEach(function (t) {
    if (!customElements.get(t)) customElements.define(t, class extends TvHome {});
  });
})();
