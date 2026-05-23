(function () {
  "use strict";

  const pageType = document.body.dataset.page;
  if (!pageType || pageType === "home" || pageType === "about" || pageType === "editorial") return;

  const config = PAGE_CONFIG[pageType];
  if (!config) return;

  const grid = document.getElementById("product-grid");
  const countEl = document.getElementById("product-count");
  const sortSelect = document.getElementById("sort-select");
  const filterBtns = document.querySelectorAll("[data-filter-type]");
  const emptyState = document.getElementById("empty-state");

  let currentType = "all";
  let currentSort = "newest";

  function getProducts() {
    let list = YELLUJEAN_PRODUCTS.filter(config.filter);

    if (currentType !== "all") {
      list = list.filter((p) => p.type === currentType);
    }

    switch (currentSort) {
      case "price-low":
        list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high":
        list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name, "ko"));
        break;
      default:
        list.sort((a, b) => b.id - a.id);
    }

    return list;
  }

  function renderProductCard(p) {
    const priceHtml = p.salePrice
      ? `<p class="product-card__price"><span class="product-card__price--sale">${formatPrice(p.salePrice)}</span> <span class="product-card__price--orig">${formatPrice(p.price)}</span></p>`
      : `<p class="product-card__price">${formatPrice(p.price)}</p>`;

    const badge = p.badge
      ? `<span class="product-card__badge${p.badge.includes("%") ? " product-card__badge--sale" : ""}">${p.badge}</span>`
      : "";

    return `
      <article class="product-card">
        <a href="#" class="product-card__link">
          <div class="product-card__img-wrap">
            <img src="${p.image}" alt="${p.name}" class="product-card__img" loading="lazy" />
            <img src="${p.imageHover}" alt="${p.name} 착용" class="product-card__img product-card__img--hover" loading="lazy" />
            ${badge}
            <button class="product-card__wish" aria-label="찜하기" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z"/></svg>
            </button>
          </div>
          <div class="product-card__info">
            <span class="product-card__category">${PRODUCT_TYPE_LABELS[p.type] || p.type}</span>
            <h3 class="product-card__name">${p.name}</h3>
            ${priceHtml}
          </div>
        </a>
      </article>`;
  }

  function render() {
    const products = getProducts();

    if (countEl) countEl.textContent = `${products.length}개 상품`;

    if (!grid) return;

    if (products.length === 0) {
      grid.innerHTML = "";
      emptyState?.classList.add("visible");
      return;
    }

    emptyState?.classList.remove("visible");
    grid.innerHTML = products.map(renderProductCard).join("");

    grid.querySelectorAll(".product-card__wish").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle("active");
        const svg = btn.querySelector("svg");
        if (btn.classList.contains("active")) {
          svg.setAttribute("fill", "currentColor");
          btn.style.color = "var(--color-accent)";
        } else {
          svg.setAttribute("fill", "none");
          btn.style.color = "";
        }
      });
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentType = btn.dataset.filterType;
      render();
    });
  });

  sortSelect?.addEventListener("change", () => {
    currentSort = sortSelect.value;
    render();
  });

  render();
})();

(function () {
  "use strict";

  if (document.body.dataset.page !== "editorial") return;

  const grid = document.getElementById("editorial-grid");
  if (!grid) return;

  const categoryLabels = {
    essay: "Essay",
    guide: "Guide",
    interview: "Interview",
    edit: "The Edit",
    lookbook: "Lookbook",
  };

  grid.innerHTML = YELLUJEAN_EDITORIALS.map((item) => {
    const featured = item.featured ? " editorial-list-card--featured" : "";
    return `
      <article class="editorial-list-card${featured}">
        <a href="#">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="editorial-list-card__body">
            <span class="editorial-list-card__cat">${categoryLabels[item.category] || item.category}</span>
            <time datetime="${item.date}">${item.date.replace(/-/g, ".")}</time>
            <h3>${item.title}</h3>
            <p>${item.excerpt}</p>
          </div>
        </a>
      </article>`;
  }).join("");
})();
