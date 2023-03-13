
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') ,}
  //   ]
  // },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children:[
      {path:'',component:()=>import('pages/LoginPage.vue')}
    ]
  },
  {
    path: '/admin/login',
    component: () => import('layouts/adminLoginLayout.vue'),
    children:[
      {path:'',component:()=>import('pages/adminloginPage.vue')}
    ]
  },{
    path: '/admin/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children:[
      {path:'',component:()=>import('pages/Dashboard.vue')}
    ]
  },
  {
    path: '/',
    component: () => import('layouts/userDashboard.vue'),
    children:[
      {path:'',component:()=>import('pages/userDashboard.vue')}
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/userDashboard.vue'),
    children:[
      {path:'',component:()=>import('pages/userDashboard.vue')}
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/signup.vue'),
    children:[
      {path:'',component:()=>import('pages/signup.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/LoginPage.vue')
  }
]

export default routes
