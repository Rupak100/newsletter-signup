// const express = require("express");
// const bodyParser = require("body-parser");
// // const mailchimp = require("@mailchimp/mailchimp_marketing");
const request = require("request");
const https = require("https");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/signup.html");
// });
// app.post("/", function (req, res) {
//     var email = req.body.first;
//     const fname = req.body.second;
//     const lname = req.body.third;
//     // console.log(email,pass);
//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: fname,
//                     LNAME: lname,
//                 }
//             }
//         ]
//     }
//     const jsonData=JSON.stringify(data);
//     const options ={
//          url:"https://us21.api.mailchimp.com/3.0/lists/7f0132107d",
//         method:"POST",
//         headers:{
//         Authorization:"Rupak:11daae84861131951d14f84e0e2ffedcf-us21"
//         },
//         body:jsonData


//     };
// //    const request= https.request(url,option,function(response){
// //         response.on("data",function(data){
// //             console.log(JSON.parse(data));
// //         })
// //     });
// //     request.write(jsonData);
// //     request.end();


// // request(options,(ree,response,body)=>{
// //   if(err){
// //     res.redirect(__dirname+"/failure.html");
// // }
// // else{
// //     if(response.statusCode===200){
// //             res.redirect(__dirname+"/success.html");
            
// //         }
// //         else{
// //             res.redirect(__dirname+"/failure.html");

// //         }
// //     }
  
// // });
// });




// app.listen(3000, function () {
//     console.log("Server started at port 3000");
// });




// 1daae84861131951d14f84e0e2ffedcf-us21
// 7f0132107d


//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running

//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});

//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "1daae84861131951d14f84e0e2ffedcf-us21",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us21"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {
//*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
const firstName = req.body.second;
const secondName = req.body.third;
const email = req.body.first;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "7f0132107d";
//Creating an object with the users data
const subscribingUser = {
 firstName:firstName ,
 lastName:secondName ,
 email:email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
})

// app.post("/f",function(req,res,next){
//     console.log("page");
//     res.redirect("/");
// });

app.post("/failure", function(req, res){
    res.redirect("/");
})
// app.listen(process.env.PORT||3000,function () {
//     console.log("Server is running at port 3000");
//    });

app.listen(process.env.PORT||3000,function(){
    console.log("Server running on port 3000");
})