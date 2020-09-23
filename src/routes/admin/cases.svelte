<script>
    import Banner from "../../components/Banner.svelte";
    import {formdata} from "../../stores/formdata";
    import axios from "axios";
    
    $: cases=[];

    function retrieveCases(){
        const instance = axios.create({
            baseURL: 'http://localhost:8080/api/'
        });
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken){
            instance.defaults.headers.common['idToken'] = idToken;
            instance.get("/admin/cases").then(function (response) {
                    // handle success
                    cases = response["data"]
                    console.log(response["data"]);
                }
            );
    });
    }
    retrieveCases();
</script>

<Banner></Banner>
<h1>All cases:</h1>
{#if cases}
    <table class="table table-responsive table-bordered table-striped">
        <thead>
            <tr>
                <th>Case ID</th>
                <th>Area of Law</th>
                <th>User ID</th>
                <th>Full name</th>
                <th>Description</th>
                <th>Language</th>
                <th>Created Date</th>
            </tr>
        </thead>
    {#each cases as courtCase}
        <tbody>
            <tr>
                <td>{courtCase.id}</td>
                <td>{$formdata["areaOfLaws"][courtCase.areaOfLaw-1].areaOfLaw}</td>
                <td>{courtCase.user["uid"]}</td>
                <td>{courtCase.user["displayName"]}</td>
                <td>{courtCase.description}</td>
                <td>{$formdata["languages"][courtCase.language-1].languageName}</td>
                <td>{courtCase.user["createdDate"]}</td>
            </tr>
        </tbody>
    {/each}
    </table>
{:else}
    LOADING...
{/if}