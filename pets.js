const loadPetsByCategory = (category) => {
    const apiUrl = `https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            showPetsByCategory(data.data);
        })
        .catch((error) => console.log(error));
};

const showPetsByCategory = (pets) => {
    const petContainer = document.getElementById("pet-deals");
    petContainer.innerHTML = "";

    if (!pets || pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="images/error.webp"/> 
          <h2 class="text-center text-xl font-bold">No Information Available</h2>
        </div>
            <p class="text-gray-500 text-center text-sm sm:text-base md: text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.
            </p>`;
    }
    else {
        petContainer.classList.add("grid");

        pets.forEach((pet) => {
            const Viewpet = document.createElement("div");
            Viewpet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 ">${pet.pet_name}</h3>
            <p class="text-gray-600 text-sm mb-2">Breed: ${pet.breed || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Birth: ${pet.date_of_birth || "N/A"}</p>
            <p class="text-gray-600 text-sm mb-2">Gender: ${pet.gender}</p>
            <p class="text-gray-600 text-sm mb-2">Price: $${pet.price || "N/A"}</p>
            <div class="flex justify-around">
              <button id="" class="like-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
              <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
            </div>
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
const loadLikedPhotos =(image) =>
    {
      fetch(`https://openapi.programming-hero.com/api/peddy/${pets.image}`)
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
    }

    const adoptPet = (petId, button) => {
        // Show the adoption modal and set initial message
        const adoptContent = document.querySelector(".adopt-content");
        adoptContent.innerHTML = `<p class="text-4xl font-bold">Congrats!</p>
        <p class="text-lg">Adoption process has started for your pet!</p>
        <div id="countdown"></div>`;
        const adoptModal = document.getElementById("adoptModal");
        adoptModal.showModal();
    
        let countdown = 3; // Countdown from 3
        const countdownDiv = document.getElementById("countdown");
    
        const interval = setInterval(() => {
            countdownDiv.innerHTML = countdown;
            countdown--;
    
            // After countdown reaches 0
            if (countdown < 0) {
                clearInterval(interval);
                button.textContent = "Adopted";
                setTimeout(() => {
                    adoptModal.close();
                });
            }
        }, 1000);
    };

document.getElementById("dogs-btn").addEventListener("click", () => loadPetsByCategory("dog"));
document.getElementById("cats-btn").addEventListener("click", () => loadPetsByCategory("cat"));
document.getElementById("rabbits-btn").addEventListener("click", () => loadPetsByCategory("rabbit"));
document.getElementById("birds-btn").addEventListener("click", () => loadPetsByCategory("bird"));
document.getElementById("Like-btn").addEventListener("click", () => loadLikedPhotos("Liked-Picture"));
