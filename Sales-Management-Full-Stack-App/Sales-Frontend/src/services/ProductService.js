import axios from "axios";

const baseUrl_For_Admin = "http://localhost:8080/Admin";

class ProductService {

 getAllProducts()
 {
  return axios.get(`${baseUrl_For_Admin}/getAllProducts`);
 }
 deleteProductById(id)
 {
  return axios.delete(`${baseUrl_For_Admin}/delete-product/${id}`);
 }

 AddProduct(product)
 {
  return axios.post(`${baseUrl_For_Admin}/add-new-product`, product);
 }

 getProductById(id)
 {
  return axios.get(`${baseUrl_For_Admin}/product/${id}`)
 }
 
 updateProduct(id, product)
 {
   return axios.put(`${baseUrl_For_Admin}/update-product/${id}`, product); 
 }
}

export default new ProductService