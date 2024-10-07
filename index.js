const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            displayPets(data.pets);
        })
        .catch((error) => console.log(error));
};

let petsData = [];

const displayPets = (pets) => {
    const petContainer = document.getElementById("pet-deals");
    petContainer.innerHTML = "";


    petsData = pets;

    if (!pets || pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="images/error.png" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Category </h2> 
        </div>`;

    }
    else {
        petContainer.classList.add("grid");

        pets.forEach((pet) => {
            const Viewpet = document.createElement("div");
            Viewpet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 "> ${pet.pet_name}</h3>
            <p class="text-gray-600 text-sm mb-2">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Birth: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Gender: ${pet.gender}</p>
            <p class="text-gray-600 text-sm mb-2">Price: $${pet.price || "N/A"}</p>
            <div class="flex justify-around">
              <button id="" class="like-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
              <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
            </div>
          </div>`;

            const likeButton = Viewpet.querySelector('.like-btn')
            likeButton.addEventListener('click', () => {
                LikedImages.push(pet.image)
                displayLikedImages();
            });

            petContainer.append(Viewpet);
        });
    }
};


let LikedImages = [];

displayLikedImages = () => {
    const likedPicutureContainer = document.getElementById('Liked-Picture')
    likedPicutureContainer.innerHTML = '';

    LikedImages.forEach((imageSrc) => {
        const imgEle = document.createElement('img');

        imgEle.src = imageSrc
        imgEle.alt = 'liked-pet';
        imgEle.className = 'liked-image mb-2';
        likedPicutureContainer.appendChild(imgEle);
    });
};

const loadDetails = async (petId) => {
    console.log(petId)
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(url)
    const data = await res.json();
    displayDetails(data.petData)
}
const displayDetails = (petData) => {
    console.log(petData);
    const detailsContainer = document.getElementById("modal-content");
    document.getElementById("customModal").showModal();

    detailsContainer.innerHTML = `

          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out w-full">
            <img src="${petData.image}" alt="${petData.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-bold mb-2 "> ${petData.pet_name}</h3>
            <div class="grid grid-cols-2">
                <p class="text-gray-600 text-sm mb-2">Breed: ${petData.breed || "N/A"}</p>
                <p class="text-gray-600 text-sm mb-2">Birth: ${petData.date_of_birth || "N/A"}</p>
                <p class="text-gray-600 text-sm mb-2">Gender: ${petData.gender}</p>
                <p class="text-gray-600 text-sm mb-2">Price: ${petData.price || "N/A"}</p>
                <p class="text-gray-600 text-sm mb-2">Vaccinated status: ${petData.vaccinated_status || "N/A"}</p>
            </div>
            <p class="text-gray-600 font-bold mb-2">Details Information</p>
            <p class="text-gray-600 text-sm mb-2">Details Information: ${petData.pet_details || "N/A"}</p>

          </div>
    `
};


const sortByPrice = () => {

    const sortedPets = petsData.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price) : 0;
        const priceB = b.price ? parseFloat(b.price) : 0;
        return priceB - priceA; 
    });

    const petContainer = document.getElementById("pet-deals");
    petContainer.innerHTML = '';

    sortedPets.forEach(pet => {
        const showPet = document.createElement("div");
        showPet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 "> ${pet.pet_name}</h3>
            <p class="text-gray-600 text-sm mb-2">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Birth: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Gender: ${pet.gender}</p>
            <p class="text-gray-600 text-sm mb-2 price">Price: $${pet.price || "N/A"}</p>
            <div class="flex justify-around">
              <button class="like-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
              <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
            </div>
          </div>`;
        petContainer.appendChild(showPet);
    });
};
document.getElementById("sort-price-btn").addEventListener("click", sortByPrice);

loadCategories();