<script lang="ts">
  import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Row,
    Table,
    Modal,
    Icon,
  } from "sveltestrap";

  import type { PageData } from "./$types";
  import DashboardCard from "$lib/component/DashboardCard.svelte";

  export let data: PageData;
  $: ({ pengaduans, tanggapans } = data);

  let searchStr = "";
  let open = false;
  let Idi: any;

  function id(id: BigInt) {
    open = !open;
    Idi = id;
  }
  const toggle = () => (open = !open);
</script>

<div class="d-flex justify-content-between align-items-center mb-2">
  <h2>Dashboard</h2>
  <Icon name="plus-square-fill" />
  <Button color="primary" href="/masyarakat/buat_pengaduan"
    ><h6><Icon name="plus-square-fill" /> <b>Buat Pengaduan</b></h6></Button
  >
</div>

<Row>
  <div class="col-xl-4 col-md-6">
    <DashboardCard
      cardTitle="Pengaduan Diproses"
      cardColor="warning"
      cardHref="/masyarakat/proses"
    />
  </div>
  <div class="col-xl-4 col-md-6">
    <DashboardCard
      cardTitle="Pengaduan Selesai"
      cardColor="success"
      cardHref="/masyarakat/selesai"
    />
  </div>
  <div class="col-xl-4 col-md-6">
    <DashboardCard
      cardTitle="Pengaduan Ditolak"
      cardColor="danger"
      cardHref="/masyarakat/ditolak"
    />
  </div>
</Row>

<Card class="mt-2 mb-4">
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
      <thead>
        <tr>
          <th>Judul</th>
          <th>Tanggal</th>
          <th>Status Verification</th>
        </tr>
      </thead>
      <tbody>
        {#each pengaduans as pengaduan}
            {#if pengaduan.judul.toLowerCase().includes(searchStr.toLowerCase())}
              <tr on:click={() => id(pengaduan.id)}>
                <td>{pengaduan.judul}</td>
                <td>{pengaduan.tanggal}</td>
                <td>{pengaduan.status}</td>
              </tr>
              {#if Idi == pengaduan.id}
                <Modal
                  body
                  header={pengaduan.judul}
                  isOpen={open}
                  {toggle}
                  scrollable
                >
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <img src={pengaduan.foto} width="100%" />
                  <table class="mt-2">
                    <tr>
                      <th>Isi Pengaduan:</th>
                    </tr>
                    <tr>
                      <td>{pengaduan.isi}</td>
                    </tr>
                    <tr>
                      <th>Status Verification:</th>
                    </tr>
                    <tr>
                      <td>{pengaduan.status}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Pengaduan:</th>
                    </tr>
                    <tr>
                      <td>{pengaduan.tanggal}</td>
                    </tr>
                    <hr />
                    {#each tanggapans as tanggapan}
                      {#if Idi == tanggapan.id_pengaduan}
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
                        <hr />
                      {/if}
                    {/each}
                  </table>
                </Modal>
              {/if}
            {/if}
        {/each}
      </tbody>
    </Table>
  </CardBody>
</Card>
