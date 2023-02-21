<script lang="ts">
    import {
        Breadcrumb,
        BreadcrumbItem,
        Card,
        CardHeader,
        CardBody,
        Table,
        Button
    } from "sveltestrap";

    // import { utils, write } from "xlsx";
    // import saveAs from "file-saver";
    import { jsPDF } from "jspdf";
    import autoTable from 'jspdf-autotable';
    import { onMount } from "svelte";

    import type { PageData } from "./$types";
    export let data: PageData;
    let table: HTMLTableElement;

    $: ({ pengaduans, userDetail } = data);
    
    const doc = new jsPDF();
    const generateLaporan = () => {
        autoTable(doc, { html: table})
        doc.save("table.pdf");
    }
</script>

<div class="d-flex justify-content-between align-items-center mb-2">
    <h2>Generate Laporan</h2>
    <Button color="primary" class="px-5" on:click={() => generateLaporan()}><h6><b>Print</b></h6></Button>
</div>

<Breadcrumb>
    <BreadcrumbItem>
        <a href="/admin">Dashboard</a>
    </BreadcrumbItem>
    <BreadcrumbItem active>Report</BreadcrumbItem>
</Breadcrumb>

<Card>
    <CardHeader class="bg-secondary">All Data</CardHeader>
    <CardBody>
            <table class="bordered" bind:this={table}>
            <thead>
                <tr>
                    <th>NIK Pelapor</th>
                    <th>Nama Pelapor</th>
                    <th>Judul Pengaduan</th>
                    <th>Isi Pengaduan</th>
                    <th>Tanggal Pengaduan</th>
                    <th>Tanggapan</th>
                    <th>Tanggal Tanggapan</th>
                    <th>Penaggung Jawab</th>
                    <th>Status Verification</th>
                </tr>
            </thead>
            <tbody>
                {#each pengaduans as pengaduan}
                    <tr>
                        <td>{pengaduan.user.nik}</td>
                        <td>{pengaduan.user.nama}</td>
                        <td>{pengaduan.judul}</td>
                        <td>{pengaduan.isi}</td>
                        <td>{pengaduan.tanggal}</td>
                        <td>
                            {#each pengaduan.Tanggapan as tanggapan, i}
                                {i+1} : {tanggapan.tanggapan}<br>
                            {/each}
                        </td>
                        <td>
                            {#each pengaduan.Tanggapan as tanggapan, i}
                                {i+1} : {tanggapan.tanggal}<br>
                            {/each}
                        </td>
                        {#if pengaduan.status != "PENDING"}
                            <td>{pengaduan.Tanggapan[0].user.nama}</td>
                        {:else}
                            <td>Belum ditanggapi</td>
                        {/if}
                        <td>{pengaduan.status}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </CardBody>
</Card>
