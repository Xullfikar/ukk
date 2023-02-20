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

    $: ({ pengaduans, userDetail} = data);
    let searchStr = "";
    let open = false;
    let Idi: any;

    function id(id: BigInt) {
        open = !open;
        Idi = id;
    }
    const toggle = () => (open = !open);
</script>

<h2>Dashboard</h2>

<Row>
    <div class="col-xl-3 col-md-6">
        <DashboardCard
            cardTitle="Pengaduan Masuk"
            cardColor="primary"
            cardHref="/admin/masuk"
        />
    </div>
    <div class="col-xl-3 col-md-6">
        <DashboardCard
            cardTitle="Pengaduan Diproses"
            cardColor="warning"
            cardHref="/admin/diproses"
        />
    </div>
    <div class="col-xl-3 col-md-6">
        <DashboardCard
            cardTitle="Pengaduan Selesai"
            cardColor="success"
            cardHref="/admin/selesai"
        />
    </div>
    <div class="col-xl-3 col-md-6">
        <DashboardCard
            cardTitle="Pengaduan Ditolak"
            cardColor="danger"
            cardHref="/admin/ditolak"
        />
    </div>
</Row>

<Card class="mt-1 mb-4">
    <CardHeader class="bg-secondary">
        <div class="d-flex justify-content-between align-items-center">
            <b>Data Semua Pengaduan</b>
            <div style="width: 200px;">
                <Input placeholder="Search" bind:value={searchStr} />
            </div>
        </div>
    </CardHeader>
    <CardBody>
        <Table bordered responsive hover>
            {#if userDetail?.level == "ADMIN"}
            <thead>
                <tr>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Judul Pengaduan</th>
                    <th>Tanggal</th>
                    <th>Status Verification</th>
                    <th>Penanggung Jawab</th>
                </tr>
            </thead>
            <tbody>
                {#each pengaduans as pengaduan}
                {#if pengaduan.judul.toLowerCase().includes(searchStr.toLowerCase()) || pengaduan.user.nik?.includes(searchStr) || pengaduan.user.nama?.toLowerCase().includes(searchStr.toLowerCase()) || pengaduan.Tanggapan[0]?.user.nama.toLowerCase().includes(searchStr.toLowerCase())}
                <tr on:click={() => id(pengaduan.id)}>
                            <td>{pengaduan.user.nik}</td>
                            <td>{pengaduan.user.nama}</td>
                            <td>{pengaduan.judul}</td>
                            <td>{pengaduan.tanggal}</td>
                            <td>{pengaduan.status}</td>
                            {#if pengaduan.status != "PENDING"}
                            <td>{pengaduan.Tanggapan[0].user.nama}</td>
                            {:else}
                            <td>Belum Ditanggapi</td>
                            {/if}
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
                                            <td class="text-success"
                                                >{pengaduan.user.nik}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Nama Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.user.nama}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Nomor Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.user.telepon}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Isi Pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.isi}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Tanggal Pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.tanggal}</td
                                            >
                                        </tr>
                                        <hr />
                                            {#each pengaduan.Tanggapan as tanggapan}
                                                        <tr>
                                                            <th>Tanggapan :</th>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="text-success"
                                                                >{tanggapan.tanggapan}</td
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                >Tanggal
                                                                Ditanggapi :</th
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="text-success"
                                                                >{tanggapan.tanggal}</td
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                >Penanggung
                                                                Jawab:</th
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="text-success"
                                                                >{tanggapan.user
                                                                    .nama}</td
                                                            >
                                                        </tr>
                                                        <hr />
                                            {/each}
                                        <tr>
                                            <th>Status Verification:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.status}</td
                                            >
                                        </tr>
                                    </table>
                                </ModalBody>
                                {#if pengaduan.status != "SELESAI" && pengaduan.status != "TOLAK"}
                                {#if pengaduan.status == "PENDING"}
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            href="/admin/tanggapan/{pengaduan.id}"
                                            >Beri Tanggapan</Button
                                        >
                                    </ModalFooter>
                                    {:else}
                                    {#if pengaduan.Tanggapan[0].user.id == userDetail?.id}
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            href="/admin/tanggapan/{pengaduan.id}"
                                            >Beri Tanggapan</Button
                                        >
                                    </ModalFooter>
                                    {/if}
                                    {/if}
                                {/if}
                            </Modal>
                        {/if}
                    {/if}
                {/each}
            </tbody>
            {:else}
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
                <!-- {#if pengaduan.status != "PENDING"} -->
                {#if pengaduan.status == "PENDING" || pengaduan.Tanggapan[0].user.id == userDetail?.id}
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
                                            <td class="text-success"
                                                >{pengaduan.user.nik}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Nama Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.user.nama}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Nomor Pelapor:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.user.telepon}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Isi Pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.isi}</td
                                            >
                                        </tr>
                                        <tr>
                                            <th>Tanggal Pengaduan:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.tanggal}</td
                                            >
                                        </tr>
                                        <hr />
                                            {#each pengaduan.Tanggapan as tanggapan}
                                                        <tr>
                                                            <th>Tanggapan :</th>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="text-success"
                                                                >{tanggapan.tanggapan}</td
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                >Tanggal
                                                                Ditanggapi :</th
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="text-success"
                                                                >{tanggapan.tanggal}</td
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                >Penanggung
                                                                Jawab:</th
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="text-success"
                                                                >{tanggapan.user
                                                                    .nama}</td
                                                            >
                                                        </tr>
                                                        <hr />
                                            {/each}
                                        <tr>
                                            <th>Status Verification:</th>
                                        </tr>
                                        <tr>
                                            <td class="text-success"
                                                >{pengaduan.status}</td
                                            >
                                        </tr>
                                    </table>
                                </ModalBody>
                                {#if pengaduan.status != "SELESAI" && pengaduan.status != "TOLAK"}
                                    {#if pengaduan.Tanggapan[0].user.id == userDetail?.id}
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            href="/admin/tanggapan/{pengaduan.id}"
                                            >Beri Tanggapan</Button
                                        >
                                    </ModalFooter>
                                    {/if}
                                {/if}
                            </Modal>
                        {/if}
                    {/if}
                    {/if}
                    <!-- {/if} -->
                {/each}
            </tbody>
            {/if}
        </Table>
    </CardBody>
</Card>
