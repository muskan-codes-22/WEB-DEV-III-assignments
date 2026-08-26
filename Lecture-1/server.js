const http= require("http");
const server = http.createServer((req,res)=>{
    if(req.url==="/"){
        res.end("welcome")
    }
    else if(req.url==="/about"){
        res.end("this is about section")

    }
    else if(req.url==="/contact"){
        res.end("this is contact section")

    }
    else{
        res.statusCode=404;
        res.end("404 error message page not found")
    }

});
server.listen(5000, ()=>{
    console.log("server listening  on port 5000");
});