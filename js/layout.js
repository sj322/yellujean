(function () {
  "use strict";

  const isSubPage = /\/pages\//.test(window.location.pathname) || window.location.pathname.endsWith("/pages");
  const base = isSubPage ? ".." : ".";
  const pagesBase = isSubPage ? "." : "pages";

  const navItems = [
    { key: "all", label: "\uC804\uCCB4", href: `${pagesBase}/new.html` },
    { key: "new", label: "NEW", href: `${pagesBase}/new.html` },
    { key: "top", label: "\uC0C1\uC758", href: `${pagesBase}/new.html?type=top` },
    { key: "pants", label: "\uD558\uC758", href: `${pagesBase}/new.html?type=pants` },
    { key: "outer", label: "\uC544\uC6B0\uD130", href: `${pagesBase}/new.html?type=outer` },
    { key: "set", label: "\uC14B\uC5C5", href: `${pagesBase}/new.html?type=set` },
    { key: "acc", label: "\uC561\uC138\uC11C\uB9AC", href: `${pagesBase}/acc.html` },
  ];

  const navItemsRight = [
    { key: "editorial", label: "Archive", href: `${pagesBase}/editorial.html` },
  ];

  const activePage = document.body.dataset.page || "home";

  function getBrandLogo(href, options = {}) {
    const { tag = "a", variant = "header" } = options;
    const isLink = tag === "a";
    const hrefAttr = isLink ? ` href="${href}"` : "";
    const logoSrc = `${base}/assets/Logo/Logo.jpg`;

    return `<${tag}${hrefAttr} class="brand-logo brand-logo--${variant}" aria-label="Logo">
      <img src="${logoSrc}" alt="Logo" class="brand-logo__img" />
    </${tag}>`;
  }

  function navLink(item) {
    const active = activePage === item.key ? ' class="is-active"' : "";
    return `<a href="${item.href}"${active}>${item.label}</a>`;
  }

  const utilityBar = `
    <div class="utility-bar">
      <div class="container utility-bar__inner">
        <span>26 S/S 시즌 오픈 · 무료배송 10만원 이상</span>
        <div class="utility-bar__links">
          <a href="#">고객센터</a>
          <a href="#">배송조회</a>
          <a href="#">KR</a>
        </div>
      </div>
    </div>`;

  const header = `
    <header class="header" id="header">
      <div class="container header__inner">
        <div class="header__left">
          <button class="header__menu-btn" aria-label="메뉴 열기" id="menuBtn">
            <span></span><span></span>
          </button>
          <nav class="header__nav header__nav--menu" aria-label="주요 카테고리">
            <div class="header__menu-item">
              <button class="header__menu-trigger" type="button">Menu</button>
              <ul class="header__submenu">
                ${navItems.map((item) => `<li>${navLink(item)}</li>`).join("")}
              </ul>
            </div>
          </nav>
        </div>
        ${getBrandLogo(`${base}/index.html`, { variant: "header" })}
        <div class="header__right">
          <nav class="header__nav" aria-label="보조 메뉴">
            ${navItemsRight.map(navLink).join("")}
          </nav>
          <div class="header__actions">
            <button class="header__icon-btn" aria-label="search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
            </button>
            <a href="#" class="header__icon-btn" aria-label="wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z"/></svg>
            </a>
            <a href="#" class="header__icon-btn" aria-label="account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>
            </a>
            <a href="#" class="header__icon-btn header__cart" aria-label="cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L5 3H2"/></svg>
              <span class="header__cart-count">2</span>
            </a>
          </div>
        </div>
      </div>
    </header>`;

  const mobileMenu = `
    <aside class="mobile-menu" id="mobileMenu" aria-hidden="true">
      <div class="mobile-menu__header">
        ${getBrandLogo("", { tag: "span", variant: "menu" })}
        <button id="menuClose" aria-label="메뉴 닫기">&times;</button>
      </div>
      <nav class="mobile-menu__nav">
        ${[...navItems, ...navItemsRight].map(navLink).join("")}
      </nav>
    </aside>
    <div class="overlay" id="overlay"></div>`;

  const footer = `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__main">
          <p class="footer__copyright"><strong>&copy; 2026 VLAH.DANG</strong></p>
          <nav class="footer__links" aria-label="footer links">
            <ul class="footer__link-group">
              <li><a href="#">ACCOUNT</a></li>
              <li><a href="#">ORDER STATUS</a></li>
              <li><a href="#">WISHLIST</a></li>
            </ul>
            <ul class="footer__link-group">
              <li><a href="#">CONTACT</a></li>
              <li><a href="#">Q&amp;A</a></li>
            </ul>
            <ul class="footer__link-group">
              <li><a href="#">SHIPPING &amp; PAYMENTS</a></li>
              <li><a href="#">TERMS &amp; CONDITIONS</a></li>
              <li><a href="#">PRIVACY POLICY</a></li>
            </ul>
          </nav>
        </div>
        <div class="footer__company">
          <span>&#49345;&#54840; &#48660;&#46972;&#45817;&#47112;&#51060;&#48660;</span>
          <span>&#45824;&#54364;&#51088; &#51076;&#50976;&#51652;</span>
          <span>&#51452;&#49548; 05023 &#49436;&#50872;&#53945;&#48324;&#49884; &#44305;&#51652;&#44396; &#44305;&#45208;&#47336;&#47196;30&#45208;&#44600; 28 (&#44396;&#51032;&#46041;) 201&#54840;</span>
          <span>&#44256;&#44061;&#49468;&#53552; 01097076461</span>
          <span>&#51060;&#47700;&#51068; yelluj00@naver.com</span>
          <span>&#49324;&#50629;&#51088;&#46321;&#47197;&#48264;&#54840; 102-19-52975</span>
          <span>&#53685;&#49888;&#54032;&#47588;&#50629; &#49888;&#44256; 2026-&#49436;&#50872;&#44305;&#51652;-1251</span>
          <a href="#">[&#49324;&#50629;&#51088;&#51221;&#48372;&#54869;&#51064;]</a>
          <span>&#54840;&#49828;&#54021; &#51228;&#44277; &#52852;&#54168;24(&#51452;)</span>
        </div>
      </div>
    </footer>`;

  if (document.body.dataset.layoutInjected !== "true") {
    document.body.insertAdjacentHTML("afterbegin", utilityBar + header + mobileMenu);
    const main = document.querySelector("main");
    if (main) {
      main.insertAdjacentHTML("afterend", footer);
    } else {
      document.body.insertAdjacentHTML("beforeend", footer);
    }
    document.body.dataset.layoutInjected = "true";
  }
})();