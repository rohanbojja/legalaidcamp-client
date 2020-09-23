<script>

import {onMount} from 'svelte';
import {formdata} from "../../stores/formdata";
import axios from "axios";
import { text } from 'svelte/internal';
let sops=[];
let barCouncils = [];
let areaOfLaws = [];
let userDetails = {};
let lawyerDetails={};
lawyerDetails.languages=[];
lawyerDetails.areasOfLaw=[];
let languages=[];
let verifiedPhone;
onMount(()=>{
        console.log("FORM DATA:");
        console.log("Phone number:");
        console.log(firebase.auth().currentUser.phoneNumber)
        verifiedPhone = firebase.auth().currentUser.phoneNumber;
        console.log($formdata);
		if(!$formdata){
            axios.get('http://localhost:8080/api/formdata')
                .then(function (response) {
                    // handle success
                    formdata.set(response["data"]);
                    sops = $formdata["states"];
                    barCouncils = $formdata["barCouncils"];
                    areaOfLaws = $formdata["areaOfLaws"];
                    languages = $formdata["languages"];
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
            areaOfLaws = $formdata["areaOfLaws"];
            languages = $formdata["languages"];
        }
        
    });

function createLawyer(){
    alert(JSON.stringify(userDetails, null, 2));
    alert(JSON.stringify(lawyerDetails, null, 2));
    // Post data here. Make two post callas to /api/users and /api/cases
    const instance = axios.create({
            baseURL: 'http://localhost:8080/api/'
        });
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken){
            instance.defaults.headers.common['idToken'] = idToken;
            instance.defaults.headers.post['Content-Type'] = 'application/json';
            instance.post('http://localhost:8080/api/users',JSON.stringify(userDetails, null, 2)).then(function (response) {
                    // handle success
                    console.log("User data sent: ");
                    console.log(response["data"]);
                    instance.post('http://localhost:8080/api/onboardLawyer',JSON.stringify(lawyerDetails, null, 2))
                            .then(function (response) {
                                console.log("Case data sent: ");
                                console.log(response["data"]);                    
                            });
                }
            );
    });
}

</script>
{#if $formdata!=null}
<form on:submit|preventDefault="{createLawyer}">

    <label for="displayName">Full Name</label>
    <input type="text" class="form-control" id="displayName" bind:value={userDetails.displayName}><br>
    
    <label for="phoneNumber" disabled>Phone Number</label>
    <input type="text" id="phoneNumber" class="form-control" bind:value={verifiedPhone} disabled><br>
    
    <label for="emailAddress">Email Address</label>
    <input type="email" id="emailAddress" class="form-control" bind:value={userDetails.emailAddress}><br>

    <label for="sop">State</label>
    <select id="sop" class="custom-select" bind:value={lawyerDetails.stateOfPractice}>
        {#each sops as state}
			<option value={state.id} selected>
				{state.stateName}
			</option>
		{/each}
    </select>

    <br><br>
    
    <label for="city">City</label>
    <input type="text" id="city" class="form-control" bind:value={lawyerDetails.city}><br>
    
    <label for="areaOfLaw">Areas Of Law</label>
    <select multiple id="areaOfLaw" class="custom-select" bind:value={lawyerDetails.areasOfLaw} >
        {#each areaOfLaws as aol}
			<option value={aol.id} selected>
				{aol.areaOfLaw}
			</option>
		{/each}
    </select>

    <br><br>

    <label for="language">Language</label>
    <select multiple id="language" class="custom-select" bind:value={lawyerDetails.languages}>
        {#each languages as language}
			<option value={language.id} selected>
				{language.languageName}
			</option>
		{/each}
        </select>

<br>
    <br>
    <label for="bc">Bar Council</label>
    <select id="bc" width="500px" class="custom-select" labelText="Bar council"  bind:value={lawyerDetails.barCouncil}>
        {#each $formdata.barCouncils as question}
			<option value={question.id} selected>
				{question.barCouncilName}
			</option>
		{/each}
        </select>
        <br>
        <br>
        <label>
            <input type="checkbox" aria-label="Allow Visitors" bind:checked="{lawyerDetails.allowVisits}">
            Allow Visitors?
        </label>
        <br>
        <label>
            <input type="checkbox" aria-label="Allow Calls" bind:checked="{lawyerDetails.allowCalls}">
            Allow Calls?
        </label>
        <br>
        <label>
            <input type="checkbox" aria-label="Active?" bind:checked="{lawyerDetails.profileStatus}">
            Active?
        </label>
        <br>
        <label for="officeAddress">
            Office Address:<br>
            
        </label>
        <textarea id="officeAddress" class="form-control"></textarea>
        <br>
        <label>
            Office Pincode:<br>
            <input id="officePincode" class="form-control" type="text">
        </label>
        <input type="submit" class="form-control" style="margin-top:25px">
        
</form>
{:else}
    LOADING...
{/if}
