<script>
    import {currentUser} from "../stores/user"
import { Button } from "carbon-components-svelte";
function logout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}
</script>

{#if $currentUser}
<h1>{$currentUser.displayName}</h1>
<h2>{$currentUser.email}</h2>
<h2>{$currentUser.phoneNumber}</h2>
<Button on:click="{logout}">Logout</Button>
    
{/if}