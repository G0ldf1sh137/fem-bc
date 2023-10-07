// HTML References
const breedSel = document.querySelector(".breeds");
const breedName = document.querySelector(".breed-name");
const dogImage = document.querySelector(".dog-image");
const loader = document.querySelector(".loader");
const dogButton = document.querySelector("button");

const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";

let breeds = [];

// pass in the name of the dog and return a url request string
function getDogUrl(dog) {
  breedName.innerText = dog;
  return `https://dog.ceo/api/breed/${dog}/images/random`;
}

async function init() {
  await getBreeds();
  createBreedOptions();
  // Get random dog on page load
  const randIndex = Math.floor(Math.random() * breeds.length);
  const randDog = breeds[randIndex];
  breedSel.selectedIndex = randIndex;
  const randDogImgUrl = getDogUrl(randDog);
  await getImage(randDogImgUrl);
}

// make api call to get list of breeds and set array
async function getBreeds() {
  const res = await fetch(BREEDS_URL);
  const resJson = await res.json();
  breeds = Object.keys(resJson.message);
}

// loop breeds, create option elements and append to selector
function createBreedOptions() {
  breeds.forEach((breed) => {
    const opt = document.createElement("option");
    opt.value, (opt.innerText = breed);
    breedSel.appendChild(opt);
  });
}

// when selector changes, get new dog based on new value
breedSel.addEventListener("change", async (event) => {
  await getDog(event.target.value);
});

// when button is clicked, get new dog based on current value
dogButton.addEventListener("click", async () => {
  const currDog = breeds[breedSel.selectedIndex];
  await getDog(currDog);
});

// takes string of dog name, hide image, show loader, get new image
async function getDog(dog) {
  // console.log(`getDog(${dog})`);
  loader.classList.add("show");
  dogImage.classList.remove("show");
  const reqUrl = getDogUrl(dog);
  await getImage(reqUrl);
}

// make api call to get image, load and display new image
async function getImage(url) {
  const req = await fetch(url);
  const reqJson = await req.json();
  dogImage.src = reqJson.message;
  dogImage.classList.add("show");
  loader.classList.remove("show");
}

init();
