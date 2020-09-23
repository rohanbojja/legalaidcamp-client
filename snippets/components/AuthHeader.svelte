<script>
import { Button } from "carbon-components-svelte";
import {currentUser} from "../stores/user"

    function makeCall(){
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            const url = "http://localhost:3000/hello";
            const data = {
                name: "said",
                id:1
            };
            var idToken;
            const otherParams={
                headers:{
                    "auth_token" : idToken
                },
                body:data,
                method:"POST"
            }
            fetch(url,otherParams)
            .then(data => {return data.json()})
            .then(res=>{console.log(res)})
            .catch(error => {console.log(error)})
        }).catch(function(error) {
        // Handle error
        });
        
    }
</script>
{$currentUser.getIdToken()}
<Button on:click="{makeCall}">MAKE SERVER CALL</Button>