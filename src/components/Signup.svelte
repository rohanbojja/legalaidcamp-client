
<script>
    import { Select } from "carbon-components-svelte";
    import {TextInput} from "carbon-components-svelte";
    import { Button } from "carbon-components-svelte";
    import {currentUser} from '../stores/user';
    import {onMount} from 'svelte';
    import axios from "axios";
    import {formdata} from "../stores/formdata";

    //REQUIRED VALRIABLE DECLARATIONS

    let sops=[];
    let barCouncils = [];

    let values = {};
    onMount(()=>{
        firebaseAuthUI();
        console.log("FORM DATA:");
        console.log($formdata);
		if(!$formdata){
            axios.get('http://localhost:8080/api/formdata')
                .then(function (response) {
                    // handle success
                    formdata.set(response["data"]);
                    sops = $formdata["states"];
                    barCouncils = $formdata["barCouncils"];
                    console.log($formdata);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }else{
            sops = $formdata["states"];
            barCouncils = $formdata["barCouncils"];
        }
        
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
    
    const createLawyer= () => {
        alert(JSON.stringify(values, null, 2));
    }
</script>


{#if $formdata!=null}
<form on:submit|preventDefault="{createLawyer}">
    <TextInput labelText="Full name" id="fullName" bind:value={values.displayName}></TextInput><br>
    <TextInput labelText="Mobile number" bind:value={values.phoneNumber}></TextInput><br>
    <TextInput labelText="Email address" bind:value={values.emailAddress}></TextInput><br>
    <label for="sop">State of practice</label>
    <select id="sop" class="custom-select" labelText="State of practice" bind:value={values.state}>
        {#each sops as sop}
			<option value={sop} selected>
				{sop.stateName}
			</option>
		{/each}
    </select>
    <br>
    <label for="bc">Bar Council</label>
    <select id="bc" width="500px" class="custom-select" labelText="Bar council"  bind:value={values.bc}>
        {#each $formdata.barCouncils as question}
			<option value={question.id} selected>
				{question.barCouncilName}
			</option>
		{/each}
        </select>
        <br>
    
    <Button style="margin-top:25px" on:click="{createLawyer}">Create account</Button>
    <button type="submit">Register</button>
</form>
{:else}
    LOADING...
{/if}

<div id="firebaseui-auth-container"></div>
<div id="loader">Loading...</div>