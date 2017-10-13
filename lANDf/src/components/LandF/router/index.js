import index from '../main.vue'
// import itemsearch from '../itemsearch.vue'
// import lunch from '../lunch.vue'
// import mine from '../mine.vue'
import detail from '../detail.vue'

export default [
    {
        path: '/',
        name: 'landf',
        component:index
    }
    ,
    {
        path: 'search/:lost/:itemname',
        name: 'landfSearch',
        component:resolve =>require(['../itemsearch.vue'],resolve),
    }, {
        path: 'lunch',
        name: 'landfLunch',
        component: resolve =>require(['../lunch.vue'],resolve),


    }, {
        path: 'mine',
        name: 'landfMine',
        component: resolve=>require(['../mine.vue'],resolve),

    },{
        path:'detail/:id/:state',
        name:'landfitemdetail',
        component:detail,
    }

]
