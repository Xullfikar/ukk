<script lang="ts">
    import {
        Button,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Col,
        Input,
        Row,
        Table,
        Modal,
        Icon,
        ModalHeader,
        ModalBody,
        ModalFooter,
    } from "sveltestrap";

    import DashboardCard from "$lib/component/DashboardCard.svelte";

    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ tanggapans } = data);
    let searchStr: any;
    let open = false;
    let Idi: any;

    function id(id: BigInt) {
        open = !open;
        Idi = id;
    }
    const toggle = () => (open = !open);   
</script>

<h2>Dashboard</h2>

<Card color="secondary" body class="mt-2 mb-4">
    <h6><a href="/admin">Dashboard</a> / Pengaduan Diproses</h6>
</Card>

<Card class="mt-1 mb-4">
    <CardHeader class="bg-secondary">
        <div class="d-flex justify-content-between align-items-center">
            <b>Data Pengaduan</b>
            <div style="width: 200px;">
                <Input placeholder="Search" bind:value={searchStr} />
            </div>
        </div>
    </CardHeader>
    <CardBody>
        <Table bordered responsive hover>
            <thead>
                <tr>
                    <th>NIK Pelapor</th>
                    <th>Nama Pelapor</th>
                    <th>Judul Pengaduan</th>
                    <th>Tanggal</th>
                    <th>Status Verification</th>
                    <th>Penanggung Jawab</th>
                </tr>
            </thead>
            <tbody>
                {#each tanggapans as tanggapan}
                    {#if tanggapan.pengaduan.judul.includes(searchStr)}
                        <tr on:click={() => id(tanggapan.pengaduan.id)}>
                            <td>{tanggapan.pengaduan.user.nik}</td>
                            <td>{tanggapan.pengaduan.user.nama}</td>
                            <td>{tanggapan.pengaduan.judul}</td>
                            <td>{tanggapan.pengaduan.tanggal}</td>
                            <td>{tanggapan.pengaduan.status}</td>
                            <td>{tanggapan.user.nama}</td>
                        </tr>
                        {#if Idi == tanggapan.pengaduan.id}
                            <Modal isOpen={open} {toggle} scrollable>
                                <ModalHeader {toggle}>
                                    <h5>{tanggapan.pengaduan.judul}</h5>
                                </ModalHeader>
                                <ModalBody>
                                    <!-- svelte-ignore a11y-missing-attribute -->
                                    <img src={tanggapan.pengaduan.foto} width="100%" />
                                    <table class="mt-2">
                                        <tr>
                                            <th>NIK Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{tanggapan.pengaduan.user.nik}</td>
                                        </tr>
                                        <tr>
                                            <th>Nama Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{tanggapan.pengaduan.user.nama}</td>
                                        </tr>
                                        <tr>
                                            <th>Nomor Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{tanggapan.pengaduan.user.telepon}</td>
                                        </tr>
                                        <tr>
                                            <th>Isi tanggapan.pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{tanggapan.pengaduan.isi}</td>
                                        </tr>
                                        <tr>
                                            <th>Tanggal tanggapan.pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{tanggapan.pengaduan.tanggal}</td>
                                        </tr>
                                        <tr>
                                            <th>Status Verification:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{tanggapan.pengaduan.status}</td>
                                        </tr>
                                    </table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="primary"
                                        href="/admin/tanggapan/buat_tanggapan/{tanggapan.pengaduan.id}"
                                        >Beri Tanggapan</Button
                                    >
                                </ModalFooter>
                            </Modal>
                        {/if}
                    {/if}
                {/each}
            </tbody>
        </Table>
    </CardBody>
</Card>
