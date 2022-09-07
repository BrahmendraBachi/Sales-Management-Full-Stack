import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Admin from './components/Admin';
import AllEmployees from './components/AllEmployees';
import Product_Types from './components/Product_Types';
import Products from './components/Products';
import Zones from './components/Zones';
import AddEmployee from './components/AddEmployee';
import AddZone from './components/AddZone';
import AddProductType from './components/AddProductType';
import AddProduct from './components/AddProduct';
import Employee from './components/Employee';
import ProductSold from './components/ProductSold';
import LogOut from './components/LogOut';
import CommisionModel from './components/CommisionModel';
import EditCommisionModel from './components/EditCommisionModel';
import SalesChart from './components/SalesChart';
import PieChart from './components/PieChart';
import ApprovalRequests from './components/ApprovalRequests';
import UploadCSV from './components/UploadCSV';
import ForgotPassword from './components/ForgotPassword';
function App() {
  return (
    <div className="App">
      <div>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login/:user" element={<Login />}></Route>
          <Route path="/Admin/:id" element={<Admin />}></Route>
          <Route path="/Employees/:id" element={<AllEmployees />}></Route>
          <Route path="/Product-Types/:id" element={<Product_Types />}></Route>
          <Route path="/Products/:id" element={<Products />}></Route>
          <Route path="/Zones/:id" element={<Zones />}></Route>
          <Route path="/add-employee/:id" element={<AddEmployee />}></Route>
          <Route path="/edit-employee/:id" element = {<AddEmployee />}></Route>
          <Route path="/add-zone/:id" element = {<AddZone />}></Route>
          <Route path="/edit-zone/:id" element = {<AddZone />}></Route>
          <Route path="/add-product-type/:id" element = {<AddProductType />}></Route>
          <Route path="/edit-product-type/:id" element = {<AddProductType />}></Route>
          <Route path="/add-product/:id" element={<AddProduct />}></Route>
          <Route path="/edit-product/:id" element={<AddProduct />}></Route>
          <Route path="/Employee/:id" element = {<Employee />}></Route>
          <Route path="/product-sold/:id" element = {<ProductSold />}></Route>
          <Route path="/Log-out" element = {<LogOut />}></Route>
          <Route path="/commision-model/:id" element = {<CommisionModel />}></Route>
          <Route path="/edit-commision/:id" element = {<EditCommisionModel />}></Route>
          <Route path="/sales-chart/:id" element = {<SalesChart />}></Route>
          <Route path="/Pie-Chart/:id" element = {<PieChart />}></Route>
          <Route path="/approval-requests/:id" element = {<ApprovalRequests />}></Route>
          <Route path="/upload-csv/:id" element = {<UploadCSV />}></Route>
          <Route path='/forgot-password/:id' element = {<ForgotPassword />}></Route>
        </Routes>
      </Router>
    </div>
    </div>
  );
}

export default App;
