<script>

import {onMount} from 'svelte';
import {formdata} from "../../stores/formdata";
import axios from "axios";

let sops=[];
let areaOfLaws = [];
let userDetails = {};
let caseDetails={};
let languages=[];
let verifiedPhone;
function getHelp(){
    alert(JSON.stringify(userDetails, null, 2));
    alert(JSON.stringify(caseDetails, null, 2));
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
                    instance.post('http://localhost:8080/api/cases',JSON.stringify(caseDetails, null, 2))
                            .then(function (response) {
                                console.log("Case data sent: ");
                                console.log(response["data"]);                    
                            });
                }
            );
    });
}
onMount(()=>{
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
            areaOfLaws = $formdata["areaOfLaws"];
            languages = $formdata["languages"];
        }
        
    });
</script>

{#if $formdata!=null}
<form on:submit|preventDefault="{getHelp}">
    <!-- 
        Common user details
     -->
    <label for="displayName">Full Name</label>
    <input type="text" class="form-control" id="displayName" bind:value={userDetails.displayName}><br>
    
    <label for="phoneNumber" disabled>Phone Number</label>
    <input type="text" id="phoneNumber" class="form-control" bind:value={verifiedPhone} disabled><br>
    
    <label for="emailAddress">Email Address</label>
    <input type="email" id="emailAddress" class="form-control" bind:value={userDetails.emailAddress}><br>
    
    <label for="sop">State</label>
    <select id="sop" class="custom-select" bind:value={caseDetails.state}>
        {#each sops as state}
			<option value={state.id} selected>
				{state.stateName}
			</option>
		{/each}
    </select>

    <br><br>
    
    <label for="city">City</label>
    <input type="text" id="city" class="form-control" bind:value={caseDetails.city}><br>
    
    <label for="areaOfLaw">Area Of Law</label>
    <select id="areaOfLaw" class="custom-select" bind:value={caseDetails.areaOfLaw}>
        {#each areaOfLaws as aol}
			<option value={aol.id} selected>
				{aol.areaOfLaw}
			</option>
		{/each}
    </select>

    <br><br>

    <label for="description">Description</label>
    <textarea id="description" class="form-control" bind:value={caseDetails.description}></textarea><br>

    <label for="language">Language</label>
    <select id="language" class="custom-select" bind:value={caseDetails.language}>
        {#each languages as language}
			<option value={language.id} selected>
				{language.languageName}
			</option>
		{/each}
        </select>

    <input type="submit" style="margin-top:25px">
</form>
{:else}
    LOADING...
{/if}