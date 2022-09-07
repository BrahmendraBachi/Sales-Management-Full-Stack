import axios from 'axios';
const baseUrl_For_Admin = "http://localhost:8080/Admin";
const baseUrl_For_Employee = "http://localhost:8080/Employee"; 
class ProductTypeServices
{

 getAllProductTypes()
 {
  return axios.get(`${baseUrl_For_Admin}/getAllProductTypes`);
 }

 deleteProductTypeById(id)
 {
  return axios.delete(`${baseUrl_For_Admin}/product-type/delete/${id}`);
 }

 AddProductType(productType)
 {
  return axios.post(`${baseUrl_For_Admin}/add-product-type`,productType);
 }

 UpdateProductTypeById(productType, id)
 {
  return axios.put(`${baseUrl_For_Admin}/edit-product-type-by-Id/${id}`,productType);
 }

 getProductTypeById(id)
 {
  console.log("get Product Type By Id is "+id);
  return axios.get(`${baseUrl_For_Admin}/getProductTypeById/${id}`);
 } 

}
export default new ProductTypeServices