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
        Breadcrumb,
        BreadcrumbItem
    } from "sveltestrap";

    import type { PageData } from "./$types";
    export let data: PageData;

    $: ({ pengaduans } = data);
    let searchStr = "";
    let open = false;
    let Idi: any;

    function id(id: BigInt) {
        open = !open;
        Idi = id;
    }
    const toggle = () => (open = !open);
</script>

<h2>Pengaduan Masuk</h2>

<Breadcrumb>
    <BreadcrumbItem>
      <a href="/admin">Dashboard</a>
    </BreadcrumbItem>
    <BreadcrumbItem active>Pengaduan Masuk</BreadcrumbItem>
  </Breadcrumb>

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
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Judul Pengaduan</th>
                    <th>Tanggal</th>
                    <th>Status Verification</th>
                </tr>
            </thead>
            <tbody>
                {#each pengaduans as pengaduan}
                {#if pengaduan.judul.toLowerCase().includes(searchStr.toLowerCase()) || pengaduan.user.nik?.includes(searchStr) || pengaduan.user.nama?.toLowerCase().includes(searchStr.toLowerCase())}
                        <tr on:click={() => id(pengaduan.id)}>
                            <td>{pengaduan.user.nik}</td>
                            <td>{pengaduan.user.nama}</td>
                            <td>{pengaduan.judul}</td>
                            <td>{pengaduan.tanggal}</td>
                            <td>{pengaduan.status}</td>
                        </tr>
                        {#if Idi == pengaduan.id}
                            <Modal isOpen={open} {toggle} scrollable>
                                <ModalHeader {toggle}>
                                    <h5>{pengaduan.judul}</h5>
                                </ModalHeader>
                                <ModalBody>
                                    <!-- svelte-ignore a11y-missing-attribute -->
                                    <img src={pengaduan.foto} width="100%" />
                                    <table class="mt-2">
                                        <tr>
                                            <th>NIK Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.user.nik}</td>
                                        </tr>
                                        <tr>
                                            <th>Nama Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.user.nama}</td>
                                        </tr>
                                        <tr>
                                            <th>Nomor Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.user.telepon}</td>
                                        </tr>
                                        <tr>
                                            <th>Isi Pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.isi}</td>
                                        </tr>
                                        <tr>
                                            <th>Tanggal Pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.tanggal}</td>
                                        </tr>
                                        <tr>
                                            <th>Status Verification:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.status}</td>
                                        </tr>
                                    </table>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="primary"
                                        href="/admin/tanggapan/{pengaduan.id}"
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
