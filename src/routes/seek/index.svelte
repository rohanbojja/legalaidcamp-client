<script>
	import Banner from "../../components/Banner.svelte";
	import Signup from "../../components/Signup.svelte";
	import {currentUser} from '../../stores/user';
	import UserDetails from '../../components/UserDetails.svelte'
import { Button } from "carbon-components-svelte";
import Step2 from "../../components/seek/step2.svelte";
import Step1 from "../../components/seek/step1.svelte";
</script>
<svelte:head>
	<title>Help!</title>
</svelte:head>
<!-- <center>
	<figure style="max-width:200px;">
		<img alt='Legal Aid Camp Logo' src='legal_aid_camp_logo.png'>
	</figure>
</center>
<h1 style="margin-top:50px">ENABLE JUSTICE FOR SOMEONE IN NEED!</h1> -->

<Banner/>
{#if $currentUser}
	<h1>Step (2/2)</h1>
	<Step2 />
	{:else}
	<h1>Step (1/2)</h1>
	<Step1 />
{/if}
