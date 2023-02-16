<script lang="ts">
  import { Card, CardBody, CardHeader, Input, Table, Modal } from "sveltestrap";

  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ pengaduans } = data);

  let searchStr: any;
  let open = false;
  let Idi: any;

  function id(id: BigInt) {
    open = !open;
    Idi = id;
  }
  const toggle = () => (open = !open);
</script>

<h2>Pengaduan Ditolak</h2>

<Card color="secondary" body class="mt-2 mb-4">
  <h6><b><a href="/masyarakat">Dashboard</a> / Ditolak</b></h6>
</Card>

<Card class="mt-3 mb-4">
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
          <th>Judul</th>
          <th>Tanggal</th>
          <th>Status Verification</th>
        </tr>
      </thead>
      <tbody>
        {#each pengaduans as pengaduan}
          {#if pengaduan.judul.includes(searchStr)}
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
                </table>
              </Modal>
            {/if}
          {/if}
        {/each}
      </tbody>
    </Table>
  </CardBody>
</Card>
