// ** Navigation imports
// import apps from './apps'
import child from './child'
import myCourse from './myCourse'
import teacher from './teacher'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
// import dashboards from './dashboards'
// import uiElements from './ui-elements'

// ** Merge & Export
// const getUserData = JSON.parse(localStorage.getItem("userData"))

export default [...myCourse, ...teacher, ...child] 
