<script>
    import Banner from "../../components/Banner.svelte";
    import {formdata} from "../../stores/formdata";
    import axios from "axios";
    
    $: cases=[];

    function retrieveLawyers(){
        const instance = axios.create({
            baseURL: 'http://localhost:8080/api/'
        });
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken){
            instance.defaults.headers.common['idToken'] = idToken;
            instance.get("/admin/lawyers").then(function (response) {
                    // handle success
                    cases = response["data"]
                    console.log(response["data"]);
                }
            );
    });
    }
    retrieveLawyers();
</script>

<Banner></Banner>
<h1>All cases:</h1>
{#if cases}
    <table class="table table-responsive table-bordered table-striped">
        <thead>
            <tr>
                <th>Lawyer ID</th>
                <th>Verified</th>
                <th>Bar Council Name</th>
                <th>City</th>
                <th>Created Date</th>
                <th colspan="2">Actions</th>
            </tr>
        </thead>
    {#each cases as lawyer}
        <tbody>
            <tr>
                <td>{lawyer.uid}</td>
                <td>{lawyer.verified}</td>
                <td>{lawyer.barCouncil["barCouncilName"]}</td>
                <td>{lawyer.city}</td>
                <td>{lawyer.createdDate}</td>
                <td>
                    <button type="button" class="btn btn-dark">Verify</button>
                    
                </td>
                <td>
                    <button type="button" class="btn btn-dark">Suspend</button>
                </td>
            </tr>
        </tbody>
    {/each}
    </table>
{:else}
    LOADING...
{/if}