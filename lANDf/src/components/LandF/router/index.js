import index from '../main.vue'
import itemsearch from '../itemsearch.vue'
import lunch from '../lunch.vue'

export default [
    {
        path: '/landf',
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
    }

]
