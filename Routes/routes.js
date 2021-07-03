const authRoute = require('./authRoutes')
const dashboardRoute = require('./dashboardRoutes')
const playground = require('../playground/play')
const routes = [
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/dashboard',
        handler:dashboardRoute
    },
    {
        path:'/playground',
        handler:playground
    },
    {
        path:'/',
        handler:(req,res,next)=>{
            res.json('hellow world')
        }
    }
]
module.exports=app =>{
    routes.forEach(r =>{
       if(r.path === '/'){
           app.get(r.path,r.handler)
       }else{
        app.use(r.path,r.handler)
       }
    })
}
