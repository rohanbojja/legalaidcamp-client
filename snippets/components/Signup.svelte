
<script>
    import { Select } from "carbon-components-svelte";
    import {TextInput} from "carbon-components-svelte";
    import { Button } from "carbon-components-svelte";
    import {currentUser} from '../stores/user';
    import {onMount} from 'svelte';
    onMount(()=>{
        firebaseAuthUI();
    })
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

    let questions = [
		{ id: 1, text: `Delhi` },
		{ id: 2, text: `Telangana` },
		{ id: 3, text: `Kerela` }
    ];
    
    function createAccount(){
        
    }
    let _fullName="";
</script>
<!-- $: {
    console.log(_fullName)
}
$: { currentUser.set({name: _fullName})} -->
<form>
    <TextInput labelText="Full name" id="fullName" bind:value={_fullName}></TextInput><br>
    <TextInput labelText="Mobile number" id="mobileNumber"></TextInput><br>
    <TextInput labelText="Email address" id="emailAddress"></TextInput><br>
    <Select labelText="State of practice">
        {#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
    </Select>
    <Select labelText="Bar council">
        {#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
    </Select>
    
    <Button style="margin-top:25px" on:click="{createAccount}">Create account</Button>
</form>

<center><h1>OR</h1></center>
<div id="firebaseui-auth-container"></div>
<div id="loader">Loading...</div>