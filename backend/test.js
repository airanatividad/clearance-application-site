import needle from 'needle';

needle.post("http://localhost:3001/add-application",
    {   
        submission_id: '6471e6037b34a74501c5717f',
        commenter_id: '6471e6037b34a74501c5717f',
        submitter_id:'6471e6037b34a74501c5717f',
        app_id: '6471e6037b34a74501c5717f',
        fname: "Andrea", 
        mname: "Paula",
        lname: "Natividad",
        email: "andrea@gmail.com",
        link: "https://github.com/CMSC100/exercise-3-import-export-npm-usage-airanatividad/blob/main/functions.js",
    },
    (err, res) => {
        console.log(res.body)
})