import HomeController from './HomeController'
import EmployeeController from './EmployeeController'
import DashboardController from './DashboardController'
import ShopController from './ShopController'
import Settings from './Settings'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
EmployeeController: Object.assign(EmployeeController, EmployeeController),
DashboardController: Object.assign(DashboardController, DashboardController),
ShopController: Object.assign(ShopController, ShopController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers