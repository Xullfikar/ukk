<script lang="ts">
    import {
        Card,
    } from "sveltestrap";

    import type { PageData } from "./$types"
    export let data : PageData
    $: ({pengaduan} = data)
</script>

<h2>Buat Tanggapan</h2>

<Card color="secondary" body class="mt-2">
  <h6><b><a href="/admin">Dashboard</a> / Buat Tanggapan</b></h6>
</Card>

<Card class="shadow-lg border-0 rounded-lg mt-5">
    
</Card>