<script>
    import axios from "axios";

    export const cAxios = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 1000
    });
</script>