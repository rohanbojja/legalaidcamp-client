<script>
	import Banner from '../components/Banner.svelte'
	import { goto } from '@sapper/app';
	import { Button } from "carbon-components-svelte";
	
    import axios from "axios";
	import { onMount } from 'svelte';
	import {formdata} from "../stores/formdata";
	const onSeek = () =>{
		goto("seek");
	}
	const onHelp = () =>{
		goto("give");
	}
	onMount(()=>{
		console.log("Loading form data.");
		console.log("FORM DATA:");
        console.log($formdata);
		if(!$formdata){
            axios.get('http://localhost:8080/api/formdata')
                .then(function (response) {
                    // handle success
                    formdata.set(response["data"]);
                    console.log($formdata);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
	});
</script>
<style>
	.div{
		padding: 50px;
		background-size: cover;
		background: linear-gradient(
			rgba(0,0,0,0.3),
			rgba(0,0,0,0.8) ) ,
			url('../background_2.jpeg');
	}
</style>

<svelte:head>
	<title>Legal Aid Camp</title>
</svelte:head>
<Banner/>
<h1 style="margin-top:50px">ENABLE JUSTICE FOR SOMEONE IN NEED!</h1>
<div class="div">
	<center style="width:100%">
		<Button class="btn btn-dark" on:click="{onSeek}">I need help!</Button>
		<Button class="btn btn-light" on:click="{onHelp}" kind="secondary">Start helping!</Button>
		<h2 style="margin-top:50px; color: white;text-shadow: 0px 0px 10px black;">HOW DOES LEGAL AID CAMP WORK?</h2>
	</center>
</div>

