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

    $: ({ pengaduans, userDetail } = data);
    let searchStr = "";
    let open = false;
    let tambah = false;
    let Idi: any;
    let userId: any;

    function id(id: BigInt) {
        open = !open;
        Idi = id;
    }

    function uId(uId: String, nama: String) {
        tambah = !tambah; 
        userId = uId;
        if(uId != userDetail?.id) {
        alert("Hanya bisa ditanggapi oleh: " + nama)
        }
    }

    const toggle = () => (open = !open, tambah = false);   
</script>

<h2>Pengaduan Selesai</h2>

<Breadcrumb>
    <BreadcrumbItem>
      <a href="/admin">Dashboard</a>
    </BreadcrumbItem>
    <BreadcrumbItem active>Pengaduan Selesai</BreadcrumbItem>
  </Breadcrumb>

<Card class="mt-1 mb-4">
    <CardHeader class="bg-secondary">
        <div class="d-flex justify-content-between align-items-center">
            <b>Data Pengaduan</b>
            <div style="width: 200px;">
                <Input class="form-control me-2" type="search" placeholder="Search" bind:value={searchStr} />
            </div>
        </div>
    </CardHeader>
    <CardBody>
        <Table bordered responsive hover>
            {#if userDetail?.level == "ADMIN"}
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
                {#each pengaduans as pengaduan}
                {#if pengaduan.judul.toLowerCase().includes(searchStr.toLowerCase()) || pengaduan.user.nik?.includes(searchStr) || pengaduan.user.nama?.toLowerCase().includes(searchStr.toLowerCase()) || pengaduan.Tanggapan[0].user.nama.toLowerCase().includes(searchStr.toLowerCase())}
                        <tr on:click={() => id(pengaduan.id)}>
                            <td>{pengaduan.user.nik}</td>
                            <td>{pengaduan.user.nama}</td>
                            <td>{pengaduan.judul}</td>
                            <td>{pengaduan.tanggal}</td>
                            <td>{pengaduan.status}</td>
                            <td>{pengaduan.Tanggapan[0].user.nama}</td>
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
                                            <th>Isi pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.isi}</td>
                                        </tr>
                                        <tr>
                                            <th>Tanggal pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.tanggal}</td>
                                        </tr>
                                        <hr>
                                        {#each pengaduan.Tanggapan as tanggapan}
                                            <tr>
                                                <th>Tanggapan :</th>
                                            </tr>
                                            <tr>
                                                <td class="text-success">{tanggapan.tanggapan}</td>
                                            </tr>
                                            <tr>
                                                <th>Tanggal Ditanggapi :</th>
                                            </tr>
                                            <tr>
                                                <td class="text-success">{tanggapan.tanggal}</td>
                                            </tr>
                                            <tr>
                                                <th>Penanggung Jawab:</th>
                                            </tr>
                                            <tr>
                                                <td class="text-success">{tanggapan.user.nama}</td>
                                            </tr>
                                            <hr>
                                        {/each}
                                        <tr>
                                            <th>Status Verification:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.status}</td>
                                        </tr>
                                    </table>
                                </ModalBody>
                            </Modal>
                        {/if}
                    {/if}
                {/each}
            </tbody>
            {:else}
            <thead>
                <tr>
                    <th>NIK Pelapor</th>
                    <th>Nama Pelapor</th>
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
                                            <th>Isi pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.isi}</td>
                                        </tr>
                                        <tr>
                                            <th>Tanggal pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.tanggal}</td>
                                        </tr>
                                        <hr>
                                        {#each pengaduan.Tanggapan as tanggapan}
                                            <tr>
                                                <th>Tanggapan :</th>
                                            </tr>
                                            <tr>
                                                <td class="text-success">{tanggapan.tanggapan}</td>
                                            </tr>
                                            <tr>
                                                <th>Tanggal Ditanggapi :</th>
                                            </tr>
                                            <tr>
                                                <td class="text-success">{tanggapan.tanggal}</td>
                                            </tr>
                                            <tr>
                                                <th>Penanggung Jawab:</th>
                                            </tr>
                                            <tr>
                                                <td class="text-success">{tanggapan.user.nama}</td>
                                            </tr>
                                            <hr>
                                        {/each}
                                        <tr>
                                            <th>Status Verification:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success">{pengaduan.status}</td>
                                        </tr>
                                    </table>
                                </ModalBody>
                            </Modal>
                        {/if}
                    {/if}
                {/each}
            </tbody>
            {/if}
        </Table>
    </CardBody>
</Card>
