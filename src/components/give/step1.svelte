<script>
    import { Select } from "carbon-components-svelte";
    import {TextInput} from "carbon-components-svelte";
    import { Button } from "carbon-components-svelte";
    import {currentUser} from '../../stores/user';
    import {onMount} from 'svelte';
    import axios from "axios";
    import {formdata} from "../../stores/formdata";

    //REQUIRED VALRIABLE DECLARATIONS
    onMount(()=>{
        firebaseAuthUI();
    });
        
    function firebaseAuthUI(){
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
        },
        uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
        }
    },
    // // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // signInFlow: 'popup',
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
    };
    ui.start('#firebaseui-auth-container', uiConfig);
    }
</script>
<div id="firebaseui-auth-container"></div>
<div id="loader">Loading...</div>