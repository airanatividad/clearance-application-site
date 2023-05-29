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


// needle.post("http://localhost:3001/add-application",
//     {   
//         email: "nicole@gmail.com",
//         remark: "accept me ma'am",
//         commenter: "paula@gmail.com", 
//         link: "https://github.com/CMSC100/exercise-3-import-export-npm-usage-airanatividad/blob/main/functions.js",
//     },
//     (err, res) => {
//         console.log(res.body);
//     }
// );


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