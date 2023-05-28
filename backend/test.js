import needle from 'needle';

// needle.post("http://localhost:3001/add-application",
//     {   
//         email: "nicole@gmail.com",
//         remark: "accept me ma'am",
//         commenter: "paula@gmail.com", 
//         link: "https://github.com/CMSC100/exercise-3-import-export-npm-usage-airanatividad/blob/main/functions.js",
//     },
//     (err, res) => {
//         console.log(res.body)
// })


// needle.get("http://localhost:3001/get-applications-by-email?email=aira@gmail.com", (err,res) => {
//     if (!err) {
//         console.log(res.body)
//     }
// })

// needle.get("http://localhost:3001/get-app-status-by-email?email=nicole@gmail.com",
//     (err,res) => {
//         if (!err) {
//             console.log(res.body)
//     }
// })


needle.post("http://localhost:3001/update-app-status-by-email",
    {   
        email: "nicole@gmail.com",
        status: "Pending",
    },
    (err, res) => {
        console.log(res.body)
})