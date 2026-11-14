/* TerpVault home page beta: shows the hosted home page full screen inside the Wix page. */
(function () {
  var SRC = 'https://themantobeat.github.io/terpvault-ar/home/?v=2';
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
  ['tv-home', 'wix-default-custom-element'].forEach(function (t) {
    if (!customElements.get(t)) customElements.define(t, class extends TvHome {});
  });
})();
