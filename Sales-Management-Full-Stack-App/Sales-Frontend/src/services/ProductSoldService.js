import axios from "axios";

const baseUrl_For_Admin = "http://localhost:8080/Admin";
const baseUrl_For_Employee = "http://localhost:8080/Employee";



class ProductTypeServices{
  getAllProductServices()
  {
   return axios.get(`${baseUrl_For_Admin}/productSold`);
  }

  sellProduct(ids)
  {
   return axios.post(`${baseUrl_For_Employee}/sellProduct`,ids);
  }

  getAllProductsSoldById(id)
  {
   return axios.get(`${baseUrl_For_Employee}/products-sold-by-id/${id}`);
  }
}

export default new ProductTypeServices;