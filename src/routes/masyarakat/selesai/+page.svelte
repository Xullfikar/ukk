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
    Breadcrumb,
    BreadcrumbItem
  } from "sveltestrap";

  import type { PageData } from "./$types";
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

<h2>Pengaduan Selesai</h2>

<Breadcrumb>
  <BreadcrumbItem>
    <a href="/masyarakat">Dashboard</a>
  </BreadcrumbItem>
  <BreadcrumbItem active>Selesai</BreadcrumbItem>
</Breadcrumb>

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
