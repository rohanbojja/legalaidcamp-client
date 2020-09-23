import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import * as admin from 'firebase-admin';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
function initFirebase(){
	var serviceAccount = require("C:/legalaidcamp-b5e4d-firebase-adminsdk-qq2r6-6e368f13bd.json");
	admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://legalaidcamp-b5e4d.firebaseio.com"
      });
}

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
		initFirebase()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

