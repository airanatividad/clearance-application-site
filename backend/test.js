import needle from 'needle';

// needle.post("http://localhost:3001/add-student",
//   {
//     fname: "First",
//     mname: "Middle",
//     lname: "Last",
//     studno: "2023-12345",
//     email: "nicole@gmail.com",
//     password: "password123",
//     status: "Pending",
//     usertype: 1,
//     applications: [], // reference to Application
//     // adviser: null,
//   },
//   (err, res) => {
//     console.log(res.body);
//   }
// );


needle.post("http://localhost:3001/add-application",
    {   
        email: "annatividad@up.edu.ph",
        remark: "accept me ma'am",
        commenter: "annatividad@up.edu.ph", 
        link: "https://github.com/CMSC100/exercise-3-import-export-npm-usage-airanatividad/blob/main/functions.js",
    },
    (err, res) => {
        console.log(res.body);
    }
);


// needle.get("http://localhost:3001/get-applications-by-email?email=nicole@gmail.com", (err,res) => {
//     if (!err) {
//         console.log(res.body)
//     }
// })

// needle.post("http://localhost:3001/update-user-status-by-email",
//   {
//     email: "nicole@gmail.com",
//     status: "Approved",
//   },
//   (err, res) => {
//     console.log(res.body);
//   }  
// );

// needle.get("http://localhost:3001/get-app-status-by-email?email=nicole@gmail.com",
//     (err,res) => {
//         if (!err) {
//             console.log(res.body)
//     }
// })


// needle.post("http://localhost:3001/update-app-status-by-email",
//     {   
//         email: "nicole@gmail.com",
//         status: "Pending",
//     },
//     (err, res) => {
//         console.log(res.body)
// })


// needle.post("http://localhost:3001/update-remarks-by-email",
//     {   
//         email: "nicole@gmail.com",
//         remark: "okay done",
//         commenter: "aira@gmail.com"
//     },
//     (err, res) => {
//         console.log(res.body)
// })

// needle.post("http://localhost:3001/update-submission-link-by-email",
//     {   
//         email: "nicole@gmail.com",
//         link: "github.com",
//     },
//     (err, res) => {
//         console.log(res.body)
// })

// needle.get("http://localhost:3001/get-applications-by-status?status=Pending", (err,res) => {
//     if (!err) {
//         console.log(res.body)
//     }
// })

// needle.get("http://localhost:3001/get-applications", (err,res) => {
//     if (!err) {
//         for (let app in res.body) {
//             console.log(res.body[app].remarks) //get remarks
//             console.log(res.body[app].submission) //get submission
//         }
//     }
// })

// needle.get("http://localhost:3001/get-pending-users", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/update-user-status-by-email", {
//     email: "jella@gmail.com",
//     status: "Approved"
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/update-adviser-by-studno", {
//     studno: "13213213",
//     adviser_id: "6472c7cc20bfd0d3f2609acc"
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/add-approver", {
//     fname: "Monina Gazelle",
//     mname: "Charina", 
//     lname: "Carandang", 
//     email: "mbcarandang2@up.edu.ph",
//     password: "monina", 
//     status: "Approved",
//     usertype: 2
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/delete-user-by-email", {
//     email: "mbcarandang2@up.edu.ph",
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/update-user-by-email", {
//     fname: "Maxine Ellinor",
//     mname: "Mendoza", 
//     lname: "Gustoir", 
//     email: "maxine@gmail.com",
//     password: "maxine1", 
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.get("http://localhost:3001/get-approver-by-name?mname=Mendoza&lname=Gustoir", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/update-app-status-by-email", {
//     email: "nicole@gmail.com",
//     status: "Open", 
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.get("http://localhost:3001/get-app-status-by-email?email=jella@gmail.com", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/add-application", {
//     email: "jella@gmail.com",
//     remark: "hi maam pls approve againnn",
//     commenter: "jella@gmail.com", 
//     link: "github2.com"
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.get("http://localhost:3001/get-current-application-by-email?email=jella@gmail.com", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/return-application-by-email", {
//     email: "jella@gmail.com", //student
//     remark: "heyy ur approved congrats",
//     commenter: "maxine@gmail.com", 
//     step: 4,
//     status: "Cleared"
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/update-submission-link-by-email", {
//     email: "jella@gmail.com", //student
//     step: 2,
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })


// needle.get("http://localhost:3001/get-user-adviser-by-email?email=annatividad@up.edu.ph", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/update-adviser-by-email", {
//     email: "ok@ok.com", //student
//     adviser: "647b9182cb12ea8d8822ec08",
// }, (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.get("http://localhost:3001/get-remark-of-adviser?email=annatividad@up.edu.ph", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.get("http://localhost:3001/get-remark-of-co?email=annatividad@up.edu.ph", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.get("http://localhost:3001/get-app-status-by-email?email=annatividad@up.edu.ph", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.get("http://localhost:3001/get-current-application-by-email?email=annatividad@up.edu.ph", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })

// needle.post("http://localhost:3001/delete-application?email=annatividad@up.edu.ph", (err,res) => {
//     if (!err) {
//         console.log(res.body);
//     }
// })
