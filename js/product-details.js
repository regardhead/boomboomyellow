function populateProductDetails(e){document.title=`BoomBoomYellow | ${e.name}`,document.querySelector('meta[name="description"]').setAttribute("content",`Order ${e.name} from BoomBoomYellow. Halal and myOrganic certified free-range chicken. Explore ingredients, nutrition facts, and preparation instructions.`),document.querySelector('meta[property="og:title"]').setAttribute("content",`${e.name} - BoomBoomYellow`),document.querySelector('meta[property="og:description"]').setAttribute("content",`Order ${e.name} from BoomBoomYellow. Halal and myOrganic certified free-range chicken.`),document.querySelector('meta[property="og:url"]').setAttribute("content",`https://www.boomboomyellow.com/product-details.html?id=${e.id}`),e.images&&e.images[0]&&document.querySelector('meta[property="og:image"]')?.setAttribute("content",e.images[0]),document.querySelector('meta[name="twitter:title"]').setAttribute("content",`BoomBoomYellow | ${e.name}`),document.querySelector('meta[name="twitter:description"]').setAttribute("content",`Order ${e.name} from BoomBoomYellow. Halal and myOrganic certified free-range chicken.`),document.querySelector('link[rel="canonical"]').setAttribute("href",`https://www.boomboomyellow.com/product-details.html?id=${e.id}`);let t={"@context":"https://schema.org","@type":"Product","@id":`https://www.boomboomyellow.com/products/${e.id}`,name:e.name,description:e.description||`Details about ${e.name} from BoomBoomYellow`,url:`https://www.boomboomyellow.com/product-details.html?id=${e.id}`,image:e.images.map(e=>({"@type":"ImageObject",url:e})),brand:{"@type":"Brand",name:"BoomBoomYellow","@id":"https://www.boomboomyellow.com/#business"},category:"Free-Range Chicken",offers:{"@type":"Offer",availability:"https://schema.org/InStock",areaServed:"MY",deliveryLeadTime:{"@type":"QuantitativeValue",maxValue:3,unitCode:"DAY"},itemCondition:"https://schema.org/NewCondition",priceValidUntil:new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString().split("T")[0]},additionalProperty:[{"@type":"PropertyValue",name:"Storage",value:e.storage?.join(", ")||"Keep refrigerated"},{"@type":"PropertyValue",name:"Certification",value:"Halal certified"}],hasMerchantReturnPolicy:{"@type":"MerchantReturnPolicy",returnPolicyCategory:"https://schema.org/MerchantReturnFiniteReturnWindow",returnTime:"P7D"}};e.nutritionInfo&&(t.nutrition={"@type":"NutritionInformation",servingSize:e.nutritionInfo.servingSize,servingsPerContainer:e.nutritionInfo.servingsPerContainer,calories:e.nutritionInfo.calories,proteinContent:e.nutritionInfo.protein,fatContent:e.nutritionInfo.fat,carbohydrateContent:e.nutritionInfo.carbohydrates}),e.variations&&e.variations.length>0&&(t.hasVariant=e.variations.map(e=>({"@type":"Product",name:e.name,description:e.description}))),e.certifications&&e.certifications.length>0&&(t.hasCredential=e.certifications.map(e=>({"@type":"Credential",credentialCategory:e.name,description:e.description}))),document.getElementById("product-schema").textContent=JSON.stringify(t),document.querySelector(".product-details__name").textContent=e.name;let r=calculateDeliveryDate();document.querySelector(".product-details__bold-date").textContent=r,populateList(".product-details__variations-list",e.variations),populateList(".product-details__min-order-quantity-list",e.minOrderQuantity),populateList(".product-details__certifications-list",e.certifications),populateList(".product-details__reports-list",e.reports),populateList(".product-details__packaging-details",e.packagingInfo),populateList(".product-details__ingredients-list",e.ingredients),populateList(".product-details__storage-instructions",e.storage),populateList(".product-details__preparation-steps",e.preparation)}function calculateDeliveryDate(){let e=new Date,t=new Date(e.getTime()+2592e5);return t.setHours(t.getHours()+8),t.toLocaleDateString("en-MY",{day:"numeric",month:"long",year:"numeric"})}function populateList(e,t){let r=document.querySelector(e);r.innerHTML="",t.forEach(e=>{let t=document.createElement("li");if("object"==typeof e&&(e.url||e.pdf)){let o=document.createElement("a");o.href=e.url||e.pdf,o.textContent=e.name||"Download",o.target="_blank",t.appendChild(o)}else"string"==typeof e?t.innerHTML=e:t.textContent=e;r.appendChild(t)})}function setupImageSlider(e){let t=0,r=document.querySelector(".product-details__image"),o=document.querySelector(".product-details__slider-arrow--left"),i=document.querySelector(".product-details__slider-arrow--right"),n=document.querySelector(".product-details__image-preview-section");function a(){r.src=e[t],r.alt=`Product Image ${t+1}`,l()}function l(){let r=window.innerWidth<=736?4:8,o=Math.floor(t/r),i=o*r,l=Math.min(i+r,e.length);n.innerHTML="";for(let d=i;d<l;d++){let c=document.createElement("img");c.src=e[d],c.alt=`Preview Image ${d+1}`,c.classList.add("product-details__preview-image"),d===t&&c.classList.add("product-details__preview-image--active"),c.addEventListener("click",()=>{t=d,a()}),n.appendChild(c)}}o.addEventListener("click",()=>{t=(t-1+e.length)%e.length,a()}),i.addEventListener("click",()=>{t=(t+1)%e.length,a()}),a(),window.addEventListener("resize",l)}function populateNutritionInfo(e){let t=document.querySelector(".product-details__nutrition-table tbody");t.innerHTML="";let r=document.createElement("tr");r.innerHTML=`
        <td colspan="3">
            Serving Size: ${e.servingSize}<br>
            Serving per Container: ${e.servingsPerContainer}
        </td>
    `,t.appendChild(r);let o=document.createElement("tr");o.innerHTML=`
        <th>Average Composition</th>
        <th>Per: 100 g</th>
        <th>Per Serving: ${e.servingSize}</th>
    `,t.appendChild(o),e.nutritionFacts.forEach((e,r)=>{let o=document.createElement("tr");o.className=r%2==0?"product-details__nutrition-table-row--even":"",o.innerHTML=`
            <td>${e.name}</td>
            <td>${e.per100g}</td>
            <td>${e.perServing}</td>
        `,t.appendChild(o)})}function renderRelatedProducts(e){let t=document.querySelector(".product-details__product-grid");fetch("data/productData.json").then(e=>e.json()).then(r=>{let o=r.filter(t=>t.id!==e).slice(0,8);t.innerHTML=o.map(createProductItem).join("")}).catch(e=>{console.error("Error loading related products:",e),t.innerHTML="<p>Error loading related products. Please try again later.</p>"})}function createProductItem(e){let t=e.images[0]||"";return`
        <div class="product-details__product-item">
            <a href="product-details.html?id=${e.id}" class="product-details__product-link">
                <div class="product-details__product-image">
                    <img src="${t}" alt="">
                </div>
                <div class="product-details__product-info">
                    <p class="product-details__product-name">${e.name}</p>
                </div>
            </a>
        </div>
    `}function setupDropdowns(){let e=document.querySelectorAll(".product-details__dropdown");e.forEach(e=>{let t=e.querySelector(".product-details__dropdown-title");t.addEventListener("keydown",t=>{"Enter"===t.key||" "===t.key?(t.preventDefault(),toggleDropdown(e)):"Escape"===t.key&&e.classList.contains("product-details__dropdown--expanded")&&toggleDropdown(e)}),e.addEventListener("click",r=>{(r.target===e||r.target===t||r.target.parentNode===t)&&toggleDropdown(e)})})}function toggleDropdown(e){let t=e.querySelector(".product-details__dropdown-title"),r=e.classList.contains("product-details__dropdown--expanded");t.setAttribute("aria-expanded",!r),e.classList.toggle("product-details__dropdown--expanded")}function setupFullscreenImage(){let e=document.querySelector(".product-details__image"),t=document.body,r=0,o=[];e.addEventListener("click",()=>{let i=Array.from(document.querySelectorAll(".product-details__image-preview-section img")).findIndex(t=>t.src===e.src);!function e(i){r=i,o=Array.from(document.querySelectorAll(".product-details__image-preview-section img")).map(e=>e.src);let n=document.createElement("div");n.classList.add("product-details__fullscreen-image"),n.innerHTML=`
            <img src="${o[r]}" alt="Fullscreen Product Image">
            <button class="product-details__close-fullscreen" aria-label="Close fullscreen image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="m12.12 10 4.07-4.06a1.5 1.5 0 1 0-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 1 0-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L10 12.12l4.06 4.07a1.45 1.45 0 0 0 1.06.44 1.5 1.5 0 0 0 1.06-2.56Z"/>
                </svg>
            </button>
            <button class="product-details__fullscreen-arrow product-details__fullscreen-arrow--left" aria-label="Previous image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="currentColor" width="36" height="36">
                    <path d="M21.559,12.062 L15.618,17.984 L21.5221,23.944 C22.105,24.533 22.1021,25.482 21.5131,26.065 C21.2211,26.355 20.8391,26.4999987 20.4571,26.4999987 C20.0711,26.4999987 19.6851,26.352 19.3921,26.056 L12.4351,19.034 C11.8531,18.446 11.8551,17.4999987 12.4411,16.916 L19.4411,9.938 C20.0261,9.353 20.9781,9.354 21.5621,9.941 C22.1471,10.528 22.1451,11.478 21.5591,12.062 L21.559,12.062 Z"/>
                </svg>
            </button>
            <button class="product-details__fullscreen-arrow product-details__fullscreen-arrow--right" aria-label="Next image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="currentColor" width="36" height="36">
                    <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"/>
                </svg>
            </button>
        `,t.appendChild(n);let a=n.querySelector("img"),l=n.querySelector(".product-details__fullscreen-arrow--left"),d=n.querySelector(".product-details__fullscreen-arrow--right");function c(){a.src=o[r]}l.addEventListener("click",e=>{e.stopPropagation(),r=(r-1+o.length)%o.length,c()}),d.addEventListener("click",e=>{e.stopPropagation(),r=(r+1)%o.length,c()}),n.addEventListener("click",e=>{(e.target===n||e.target.closest(".product-details__close-fullscreen"))&&t.removeChild(n)})}(i)})}document.addEventListener("DOMContentLoaded",()=>{fetch("data/productData.json").then(e=>e.json()).then(e=>{let t=new URLSearchParams(window.location.search),r=parseInt(t.get("id"))||1,o=e.find(e=>e.id===r);o?(populateProductDetails(o),setupImageSlider(o.images),populateNutritionInfo(o.nutritionInfo),renderRelatedProducts(o.id)):console.error("Product not found")}).catch(e=>{console.error("Error loading product data:",e)}),setupDropdowns(),setupFullscreenImage()});