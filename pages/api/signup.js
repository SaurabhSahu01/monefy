import { createUser } from "@/src/utils/firebaseadmin";

export default async function handler(req, res){
    if(req.method === "POST"){
        const username = req.body.username;
        const password = req.body.password;

        createUser(username, password).then(response => {
            res.status(200).json({
                message: "user created"
            })
        }).catch(err => {
            res.status(500).json({
                message: "user couldn't be created"
            })
        })
    }
    else{
        res.status(405).json({
            status: 405,
            error: 'GET method Not Allowed'
        });
    }
}