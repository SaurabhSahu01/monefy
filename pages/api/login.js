import { verifyUser } from "@/src/utils/firebaseadmin";

export default async function handler(req, res){
    if(req.method === "POST"){
        const username = req.body.username;
        const password = req.body.password;

        const verification = verifyUser(username, password);
        verification.then(response => {
            if(response === true){
                res.status(200).json({
                    authentication : "verified"
                })
            }
            else if(response === false){
                res.status(200).json({
                    authentication : "not verified"
                })
            }
            else{
                res.status(504).json({
                    error: "entry doesn't exist"
                })
            }
        })
    }
    else{
        res.status(405).json({
            status: 405,
            error: 'GET method Not Allowed'
        });
    }
}