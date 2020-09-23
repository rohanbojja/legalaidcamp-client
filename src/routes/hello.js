
import * as admin from 'firebase-admin';

export async function post(req, res, next) {
    var idToken = req['headers']['auth_token'];
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            console.log(uid);
            var  pp = req['headers']['auth_token'];
            res.end(JSON.stringify(uid));
        }).catch(function(error) {
            console.log("ERROR"+error);
        });
    
}