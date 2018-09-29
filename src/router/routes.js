
import Dome from '@/views/listView/dome';

export default [
  {
    path: "/",
    redirect: 'dome',
    component: { template: '<router-view />' },
    children: [
      {
        path:"dome",
        component: Dome
      }
    ]
  },

];
