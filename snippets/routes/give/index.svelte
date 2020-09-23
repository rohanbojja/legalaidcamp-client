<script>
	import Banner from "../../components/Banner.svelte";
	import Signup from "../../components/Signup.svelte";
	import {currentUser} from '../../stores/user';
	import UserDetails from '../../components/UserDetails.svelte'
import { Button } from "carbon-components-svelte";
import AuthHeader from "../../components/AuthHeader.svelte";
</script>
<svelte:head>
	<title>About</title>
</svelte:head>
<!-- <center>
	<figure style="max-width:200px;">
		<img alt='Legal Aid Camp Logo' src='legal_aid_camp_logo.png'>
	</figure>
</center>
<h1 style="margin-top:50px">ENABLE JUSTICE FOR SOMEONE IN NEED!</h1> -->

<Banner/>
<h2 style="margin-top: 50px;margin-bottom: 25px">SIGNUP FOR LEGAL AID CAMP</h2>
{#if $currentUser}
	<UserDetails></UserDetails>
	<AuthHeader></AuthHeader>

	{:else}
	<Signup ></Signup>
{/if}
