(function () {
  "use strict";

  function getBrandLogo(href, options = {}) {
    const { tag = "a", variant = "header", showTagline = false } = options;
    const isLink = tag === "a";
    const hrefAttr = isLink ? ` href="${href}"` : "";
    const tagline =
      showTagline || variant === "footer"
        ? '<span class="brand-logo__tagline">official store</span>'
        : "";

    return `<${tag}${hrefAttr} class="brand-logo brand-logo--${variant}" aria-label="yellujean">
      <span class="brand-logo__wordmark" aria-hidden="true">
        <span class="brand-logo__yellu">yellu</span><span class="brand-logo__jean">jean</span>
      </span>
      ${tagline}
    </${tag}>`;
  }

  const isSubPage = /\/pages\//.test(window.location.pathname) || window.location.pathname.endsWith("/pages");
  const base = isSubPage ? ".." : ".";
  const pagesBase = isSubPage ? "." : "pages";

  const navItems = [
    { key: "new", label: "NEW", href: `${pagesBase}/new.html` },
    { key: "women", label: "WOMEN", href: `${pagesBase}/women.html` },
    { key: "men", label: "MEN", href: `${pagesBase}/men.html` },
    { key: "acc", label: "ACC", href: `${pagesBase}/acc.html` },
  ];

  const navItemsRight = [
    { key: "about", label: "ABOUT", href: `${pagesBase}/about.html` },
    { key: "editorial", label: "EDITORIAL", href: `${pagesBase}/editorial.html` },
    { key: "sale", label: "SALE", href: `${pagesBase}/sale.html` },
  ];

  const activePage = document.body.dataset.page || "home";

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
          <nav class="header__nav" aria-label="주요 카테고리">
            ${navItems.map(navLink).join("")}
          </nav>
        </div>
        ${getBrandLogo(`${base}/index.html`, { variant: "header" })}
        <div class="header__right">
          <nav class="header__nav" aria-label="보조 메뉴">
            ${navItemsRight.map(navLink).join("")}
          </nav>
          <div class="header__actions">
            <button class="header__icon-btn" aria-label="검색">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
            </button>
            <a href="#" class="header__icon-btn" aria-label="마이페이지">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>
            </a>
            <a href="#" class="header__icon-btn header__cart" aria-label="장바구니">
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
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            ${getBrandLogo(`${base}/index.html`, { variant: "footer", showTagline: true })}
            <p>yellujean 공식 온라인 스토어.<br />직접 기획·생산하는 자사 브랜드입니다.</p>
          </div>
          <div class="footer__cols">
            <div class="footer__col">
              <h4>Shop</h4>
              <ul>
                <li><a href="${pagesBase}/new.html">신상품</a></li>
                <li><a href="${pagesBase}/women.html">여성</a></li>
                <li><a href="${pagesBase}/men.html">남성</a></li>
                <li><a href="${pagesBase}/acc.html">액세서리</a></li>
                <li><a href="${pagesBase}/sale.html">세일</a></li>
              </ul>
            </div>
            <div class="footer__col">
              <h4>Info</h4>
              <ul>
                <li><a href="${pagesBase}/about.html">브랜드 소개</a></li>
                <li><a href="${pagesBase}/editorial.html">에디토리얼</a></li>
                <li><a href="#">매장 안내</a></li>
                <li><a href="#">채용</a></li>
              </ul>
            </div>
            <div class="footer__col">
              <h4>Support</h4>
              <ul>
                <li><a href="#">고객센터</a></li>
                <li><a href="#">배송·반품</a></li>
                <li><a href="#">사이즈 가이드</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div class="footer__col footer__col--contact">
              <h4>Contact</h4>
              <p>1588-0000</p>
              <p>평일 10:00 – 18:00</p>
              <div class="footer__social">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="YouTube">YT</a>
              </div>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p>© 2026 yellujean. All rights reserved.</p>
          <div class="footer__legal">
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">사업자정보</a>
          </div>
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
