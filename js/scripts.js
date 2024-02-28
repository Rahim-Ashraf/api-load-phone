const detailsModal = async(s) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${s}`);
    const data = await res.json();
    const phoneDetails = data.data;
    const modalDetailsId = document.getElementById("modal-details");
    modalDetailsId.innerHTML = `
        <div  class="flex justify-center py-4">
        <img src="${phoneDetails.image}" alt="">
        </div>
        <h2></h2>
        <p></p>
        <p>Storage: ${phoneDetails.mainFeatures.storage}</p>
        <p>Display Size: ${phoneDetails.mainFeatures.displaySize}</p>
        <p>GPS: ${phoneDetails.others?.GPS || "No GPS"}</p>

    `
    phone_details_modal.showModal()
}

const loadPhones = (phones) => {

    const phoneConteiner = document.getElementById("phone-conteiner");
    phoneConteiner.innerText = ""

    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>Brand: ${phone.brand}</p>
                <p class="font-bold text-2xl">$999</p>
                <div class="card-actions">
                <button onclick="detailsModal('${phone.slug}')" class="btn btn-primary bg-blue-600 border-none">Show Details</button>
                </div>
            </div>
        `
        phoneCard.classList = "card w-96 bg-base-100 shadow-xl";
        phoneConteiner.appendChild(phoneCard)
    });
}

const allPhones = (phones) => {
    if (phones.length > 6) {
        const SlicePhones = phones.slice(0, 6)
        loadPhones(SlicePhones)
        const showMore = document.getElementById("show-more");
        showMore.classList.remove("hidden")
    }
}
const loadPhone = async (phones) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phones}`);
    const data = await res.json();
    allPhones(data.data)
}
loadPhone("iphone");
const search = () => {
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value;
    loadPhone(searchValue)
}

const showMoreClick = async (phones) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phones}`);
    const data = await res.json();
    loadPhones(data.data)
}

const showMoreBtn = document.getElementById("show-more-btn");
showMoreBtn.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value;
    if (!searchValue) {
        showMoreClick("iphone");
    } else {
        showMoreClick(searchValue)
    }
    document.getElementById("show-more").classList.add("hidden")
})

