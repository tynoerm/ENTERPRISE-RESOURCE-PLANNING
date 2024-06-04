import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import LoginComponent from './components/LoginComponent';
import AdminComponent from './components/AdminComponent';
import ManagerComponent from './components/ManagerComponent';
import UserComponent from './components/UserComponent';
import Register from './components/RegisterComponent';

import UserManagementComponent from './components/UserManagementComponent'

import SupplyChainManagementDashboard from './SupplyChainManagement/Dashboard';
import SupplyChainManagementDashboardUser from './SupplyChainManagement/User/DashboardUser';
import SupplyChainManagementDashboardManager from './SupplyChainManagement/Manager/DashboardManager';

import Procurement from './SupplyChainManagement/Procurement';
import ProcurementUser from './SupplyChainManagement/User/ProcurementUser';
import ProcurementManager from './SupplyChainManagement/Manager/ProcurementManager';


import LogisticsandShipping from './SupplyChainManagement/LogisticsandShipping';
import LogisticsandShippingUser from './SupplyChainManagement/User/LogisticsandShippingUser';
import LogisticsandShippingManager from './SupplyChainManagement/Manager/LogisticsandShippingManager';

import InventoryManagement from './SupplyChainManagement/InventoryManagement';
import InventoryManagementUser from './SupplyChainManagement/User/InventoryManagementUser';
import InventoryManagementManager from './SupplyChainManagement/Manager/InventoryManagementManager';



import HumanResourcesDashboard from './HumanResources/Dashboard';
import HumanResourcesDashboardClient from './HumanResources/Client/DashboardClient';
import HumanResourcesDashboardManager from './HumanResources/Manager/DashboardManager';

import PerfomanceManagement from './HumanResources/PerfomanceManagement';
import PerfomanceManagementClient from './HumanResources/Client/PerfomanceManagementClient';
import PerfomanceManagementManager from './HumanResources/Manager/PerfomanceManagementManager';

import Payroll from './HumanResources/Payroll';
import PayrollClient from './HumanResources/Client/PayrollClient';
import PayrollManager from './HumanResources/Manager/PayrollManager';

import Recruitment from './HumanResources/Recruitment';
import RecruitmentClient from './HumanResources/Client/RecruitmentClient';
import RecruitmentManager from './HumanResources/Manager/RecruitmentManager';

import NotFound from './NotFound';




//Accounting
import FinanceAccountingDashboard from './FinanceAccounting/Dashboard';
import FinanceAccountingDashboardClient from './FinanceAccounting/Client/DashboardClient';
import FinanceAccountingDashboardManager from './FinanceAccounting/Manager/DashboardManager';

import AccountsPayables from './FinanceAccounting/AccountsPayables';
import AccountsPayablesClient from './FinanceAccounting/Client/AccountsPayablesClient';
import AccountsPayablesManager from './FinanceAccounting/Manager/AccountsPayablesManager';

import AccountsReceivables from './FinanceAccounting/AccountsReceivables';
import AccountsReceivablesClient from './FinanceAccounting/Client/AccountsReceivablesClient';
import AccountsReceivablesManager from './FinanceAccounting/Manager/AccountsReceivablesManager';

import ExpenseAccount from './FinanceAccounting/ExpenseAccount';
import ExpenseAccountClient from './FinanceAccounting/Client/ExpenseAccountClient';
import ExpenseAccountManager from './FinanceAccounting/Manager/ExpenseAccountManager';





//SALES
import SalesCustomerRelation from './SalesCustomerRelation/Dashboard';
import SalesCustomerRelationClient from './SalesCustomerRelation/Client/DashboardClient';
import SalesCustomerRelationManager from './SalesCustomerRelation/Manager/DashboardManager';

import LeadManagement from './SalesCustomerRelation/LeadManagement';
import LeadManagementClient from './SalesCustomerRelation/Client/LeadManagementClient';
import LeadManagementManager from './SalesCustomerRelation/Manager/LeadManagementManager';

import OpportunityTracking from './SalesCustomerRelation/OpportunityTracking';
import OpportunityTrackingClient from './SalesCustomerRelation/Client/OpportunityTrackingClient';
import OpportunityTrackingManager from './SalesCustomerRelation/Manager/OpportunityTrackingManager';

import SalesForecasting from './SalesCustomerRelation/SalesForecasting';
import SalesForecastingClient from './SalesCustomerRelation/Client/SalesForecastingClient';
import SalesForecastingManager from './SalesCustomerRelation/Manager/SalesForecastingManager';

//MANUFACTURING PRODUCTION

import ManufacturingProductionDashboard from './ManufacturingProduction/Dashboard';
import ManufacturingProductionDashboardClient from './ManufacturingProduction/Client/DashboardClient';
import ManufacturingProductionDashboardManager from './ManufacturingProduction/Manager/BillofMaterialsManager';

import BillofMaterials from './ManufacturingProduction/BillofMaterials';
import BillofMaterialsClient from './ManufacturingProduction/Client/BillofMaterialsClient';
import BillofMaterialsManager from './ManufacturingProduction/Manager/BillofMaterialsManager';

import QualityControl from './ManufacturingProduction/QualityControl';
import QualityControlClient from './ManufacturingProduction/Client/QualityControlClient';
import QualityControlManager from './ManufacturingProduction/Manager/QualityControlManager';

import ProductionOrders from './ManufacturingProduction/ProductionOrders';
import ProductionOrdersClient from './ManufacturingProduction/Client/ProductionOrdersClient';
import ProductionOrdersManager from './ManufacturingProduction/Manager/ProductionOrdersManager';

import {useNavigate} from 'react-router-dom';




function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = (role) => {
    setLoggedIn(true);
    setUserRole(role);
    setError('');
  };

  const logout = () => {
    setLoggedIn(false);
    setUserRole('');
    setUsername('');
    setPassword('');
  };

 

  return (
    <Router>
      <Routes>
     
      <Route path="" element={<LoginComponent/>} />
       
        <Route path="Register" element={<Register/>} />

        <Route path="AdminComponent" element={ <AdminComponent />} />
        <Route path="UserComponent" element={<UserComponent />} />
        <Route path="ManagerComponent" element={<ManagerComponent />} />

        <Route path="UserManagementComponent" element={<UserManagementComponent />} />


        <Route path="MainDashboard" element={!loggedIn?<Navigate to="/" />:<MainDashboard />} />

        <Route path="SupplyChainManagementDashboard" element={<SupplyChainManagementDashboard />} />
        <Route path="SupplyChainManagementDashboardUser" element={<SupplyChainManagementDashboardUser />} />
        <Route path="SupplyChainManagementDashboardManager" element={<SupplyChainManagementDashboardManager />} />

        <Route path="Procurement" element={<Procurement />} />
        <Route path="ProcurementUser" element={<ProcurementUser />} />
        <Route path="ProcurementManager" element={<ProcurementManager />} />

        <Route path="LogisticsandShipping" element={<LogisticsandShipping />} />
        <Route path="LogisticsandShippinUser" element={<LogisticsandShippingUser />} />
        <Route path="LogisticsandShippingManager" element={<LogisticsandShippingManager />} />

        <Route path="InventoryManagement" element={<InventoryManagement />} />
        <Route path="InventoryManagementUser" element={<InventoryManagementUser />} />
        <Route path="InventoryManagementManager" element={<InventoryManagementManager />} />



        <Route path="HumanResourcesDashboard" element={<HumanResourcesDashboard />} />
        <Route path="HumanResourcesDashboardClient" element={<HumanResourcesDashboardClient />} />
        <Route path="HumanResourcesDashboardManager" element={<HumanResourcesDashboardManager />} />
        
        <Route path="PerfomanceManagement" element={<PerfomanceManagement />} />
        <Route path="PerfomanceManagementClient" element={<PerfomanceManagementClient />} />
        <Route path=" PerfomanceManagementManager" element={<PerfomanceManagementManager />} />

        <Route path="Recruitment" element={<Recruitment />} />
        <Route path="RecruitmentClient" element={<RecruitmentClient />} />
        <Route path="RecruitmentManager" element={<RecruitmentManager />} />
    
        <Route path="Payroll" element={<Payroll />} />
        <Route path="PayrollClient" element={<PayrollClient />} />
        <Route path="PayrollManager" element={<PayrollManager />} />
       

         
        <Route path="FinanceAccountingDashboard" element={<FinanceAccountingDashboard />} />
        <Route path="FinanceAccountingDashboardClient" element={<FinanceAccountingDashboardClient />} />
        <Route path="FinanceAccountingDashboardManager" element={<FinanceAccountingDashboardManager />} />

        <Route path="AccountsPayables" element={<AccountsPayables />} />
        <Route path="AccountsPayablesClient" element={<AccountsPayablesClient />} />
        <Route path="AccountsPayablesManager" element={<AccountsPayablesManager />} />

        <Route path="AccountsReceivables" element={<AccountsReceivables />} />
        <Route path="AccountsReceivablesClient" element={<AccountsReceivablesClient />} />
        <Route path="AccountsReceivablesManager" element={<AccountsReceivablesManager />} />

        <Route path="ExpenseAccount" element={<ExpenseAccount />} />
        <Route path="ExpenseAccountClient" element={<ExpenseAccountClient />} />
        <Route path="ExpenseAccountManager" element={<ExpenseAccountManager/>} />
        



        <Route path="SalesCustomerRelation" element={<SalesCustomerRelation />} />
        <Route path="SalesCustomerRelationClient" element={<SalesCustomerRelationClient />} />
        <Route path="SalesCustomerRelationManager" element={<SalesCustomerRelationManager />} />

        <Route path="SalesFocusting" element={<SalesForecasting />} />
        <Route path="SalesFocustingClient" element={<SalesForecastingClient />} />
        <Route path="SalesFocustingManager" element={<SalesForecastingManager />} />

        <Route path="OpportunityTracking" element={<OpportunityTracking />} />
        <Route path="OpportunityTrackingClient" element={<OpportunityTrackingClient />} />
        <Route path="OpportunityTrackingManager" element={<OpportunityTrackingManager />} />

        <Route path="LeadManagement" element={<LeadManagement />} />
        <Route path="LeadManagementClient" element={<LeadManagementClient />} />
        <Route path="LeadManagementManager" element={<LeadManagementManager />} />


        <Route path="ManufacturingProductionDashboard" element={<ManufacturingProductionDashboard />} />
        <Route path="ManufacturingProductionDashboardClient" element={<ManufacturingProductionDashboardClient />} />
        <Route path="ManufacturingProductionDashboardManager" element={<ManufacturingProductionDashboardManager />} />
     
      
        <Route path="BillofMaterials" element={<BillofMaterials />} />
        <Route path="BillofMaterialsClient" element={<BillofMaterialsClient />} />
        <Route path="BillofMaterialsManager" element={<BillofMaterialsManager />} />

        <Route path="QualityControl" element={<QualityControl />} />
        <Route path="QualityControlClient" element={<QualityControlClient />} />
        <Route path="QualityControlManager" element={<QualityControlManager />} />

        <Route path="ProductionOrders" element={<ProductionOrders />} />
        <Route path="ProductionOrdersClient" element={<ProductionOrdersClient />} />
        <Route path="ProductionOrdersManager" element={<ProductionOrdersManager />} />
      


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
