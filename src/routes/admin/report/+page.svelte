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

    import { jsPDF } from "jspdf";
    import autoTable from 'jspdf-autotable';

    import type { PageData } from "./$types";
    export let data: PageData;
    let table: HTMLTableElement;
    const tanggal = new Date().toLocaleDateString();

    $: ({ pengaduans, userDetail } = data);
    
    const doc = new jsPDF({
        orientation: "l"
    });
    const generateLaporan = () => {
        doc.text("Laporan Pengaduan", 15, 10)
        doc.text("Tanggal cetak: " + tanggal, 15, 18)
        autoTable(doc, { html: table, startY: 21})
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
        <div class="table-responsive mx-sm-1">
            <table class="table-bordered" bind:this={table}>
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
        </div>
    </CardBody>
</Card>
