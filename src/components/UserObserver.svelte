<script>
    import {onMount} from 'svelte'
    import {currentUser} from "../stores/user";
    onMount(()=>{
        console.log("EXEC.")
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var user = firebase.auth().currentUser;
            var name, email, photoUrl, uid, emailVerified;
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
            console.log("Logged in"+user.displayName);
            currentUser.set(user);
            console.log("Logged in2"+$currentUser.displayName);

        } else {
            currentUser.set(null);
            console.log("Not logged in.")
        }
        });
    })
</script>