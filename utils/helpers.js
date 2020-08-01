import url from './URL';

//flatten
export function flattenPoducts(data) {
 return data.map((item) => {
  //cloudinary
  // let image = item.image.url;

  //local deployment
  let image = (item.image && `${url}${item.image.url}`) || null;
  return {...item, image};
 });
}
// helper functions
export function featuredProducts(data) {
 return data.filter((item) => {
  return item.featured === true;
 });
}
export function paginate(products) {
 const itemPerPage = 3;
 const numberOfPages = Math.ceil(products.length / itemPerPage);

 //na podstawie obiekty z wlasciwoscia length, powstanie nowa tabela
 //o takiej wielkosci
 //z kazda iteracja zabiera 4 elementy i wklada do nowej tabeli
 // const newProducts = Array.from({length: numberOfPages}, () => {
 //  return products.splice(0, itemPerPage);
 // });

 //slice, pierwszy parametr to item- pomijamy
 const newProducts = Array.from({length: numberOfPages}, (_, index) => {
  console.log(index);
  const start = index * itemPerPage;
  return products.slice(start, start + itemPerPage);
 });

 return newProducts;
}
