import axios from 'axios'

const baseUrl_For_Admin = "http://localhost:8080/Admin";
const baseUrl_For_Employee = "http://localhost:8080/Employee"; 

class ZoneService{

 getAllZones()
 {
  return axios.get(`${baseUrl_For_Admin}/getAllZones`);
 }
 getZoneById(id)
 {
  return axios.get(`${baseUrl_For_Admin}/zone/${id}`);
 }
 AddZone(zone)
 {
  return axios.post(`${baseUrl_For_Admin}/Add_Zone`, zone);
 }
 updateZone(zone, id)
 {
  return axios.put(`${baseUrl_For_Admin}/updateZone/${id}`, zone)
 }

 deleteZone(id)
 {
  return axios.delete(`${baseUrl_For_Admin}/deleteZone/${id}`)
 }
}

export default new ZoneService