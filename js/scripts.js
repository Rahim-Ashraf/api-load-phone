
const allPhones = (phones) => {
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
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <p class="font-bold text-2xl">$999</p>
                <div class="card-actions">
                <button class="btn btn-primary bg-blue-600 border-none">Show Details</button>
                </div>
            </div>
        `
        phoneCard.classList = "card w-96 bg-base-100 shadow-xl";
        phoneConteiner.appendChild(phoneCard)
    });
}
const loadPhone = async (phones) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phones}`);
    const data = await res.json();
    allPhones(data.data)
}
loadPhone("iphone");
const search = ()=>{
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value;
    loadPhone(searchValue)
}