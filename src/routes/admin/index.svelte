<script>
    import Banner from "../../components/Banner.svelte";
    import {formdata} from "../../stores/formdata";
    import axios from "axios";
    import { goto } from '@sapper/app';
    import UserDetails from "../../components/UserDetails.svelte";
</script>

<Banner></Banner>

<button type="button" class="btn btn-info" on:click="{ 
    () =>{
        goto("admin/cases");
    }
}">Cases</button>
<button type="button" class="btn btn-light" on:click="{
    () =>{
        goto("admin/lawyers");
    }
}">Lawyers</button>
<button type="button" class="btn btn-dark">Dark</button>
<br><br>
<UserDetails></UserDetails>