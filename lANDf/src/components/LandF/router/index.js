import index from '../main.vue'
import itemsearch from '../itemsearch.vue'
import lunch from '../lunch.vue'
import mine from '../mine.vue'

export default [
    {
        path: '/',
        name: 'landf',
        component:index,
        children: []
    }
    ,
    {
        path: '/landf/search',
        name: 'landfSearch',
        component:itemsearch
    }, {
        path: '/landf/lunch',
        name: 'landfLunch',
        component: lunch
    }, {
        path: '/landf/mine',
        name: 'landfMine',
        component: mine
  }

]
