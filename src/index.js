const baseUrl = 'https://platzi-avo.vercel.app';
const API = `${baseUrl}/api/avo`;

//Fetch
const fetchData = await fetch(API);
const response = await fetchData.json();

const allNodes = [];

//Avocado list
response.data.map((item) => {
   const image = document.createElement('img');
   image.src = baseUrl + item.image;
   image.alt = item.attributes.shape;
   const title = document.createElement('h2');
   title.textContent = item.name;
   title.classList = 'text-2xl';
   const price = document.createElement('p');
   price.textContent = new Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency: 'USD',
   }).format(item.price);

   const container = document.createElement('div');
   container.classList =
      'flex flex-col items-center shadow-md max-w-sm justify-self-center rounded-xl cursor-pointer';
   container.onclick = () => modal(item);

   container.append(image, title, price);
   allNodes.push(container);
});

//Select Parent and add to DOM
const container = document.querySelector('#container');
container.append(...allNodes);

//Modal for info
const modal = (item) => {
   const modalElement = document.createElement('div');
   modalElement.classList =
      'fixed flex justify-center items-center inset-0 w-full h-screen bg-black bg-opacity-50';
   modalElement.onclick = () => close();

   const modalContent = document.createElement('article');
   modalContent.innerHTML = `
   <article class="relative flex flex-col items-center w-96 h-auto bg-white rounded-xl">
      <img src="${baseUrl + item.image}" alt="${item.attributes.shape}" />
      <section class="p-2 text-center">
         <h2 class="text-2xl">${item.name}</h2>
         <h3 class="mt-2 text-xl">${item.attributes.shape}</h3>
         <p class="mt-2 p-4">${item.attributes.description}<p>
         <p class="mt-2 italic opacity-50">${item.attributes.taste}</p>
      </section>
   </article>`;

   const close = () => {
      modalElement.remove();
   };

   modalElement.append(modalContent);

   const main = document.querySelector('#main');
   main.append(modalElement);
};
