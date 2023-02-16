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
    Icon
  } from "sveltestrap";

  import type { PageData } from "./$types";

  export let data: PageData;
  $: ({ pengaduans } = data);

  let searchStr: any;
  let open = false;
  let Idi: any;
  let total: Array<string> = [];

  function id(id: BigInt) {
    open = !open;
    Idi = id;
  }
  const toggle = () => (open = !open);

  console.log(Object.keys(total).length);
  

</script>

<div class="d-flex justify-content-between align-items-center">
  <h2>Dashboard</h2>
  <Icon name="plus-square-fill" />
    <Button color="primary" href="/masyarakat/buat_pengaduan"
      ><h6><Icon name="plus-square-fill" /> <b>Buat Pengaduan</b></h6></Button
    >
</div>

<Card color="secondary" body class="mt-2 mb-4">
  <h6><b>Dashboard</b></h6>
</Card>

<Row>
  <Col>
    <Card class="mb-3 text-white" color="danger">
      <CardHeader>
        <CardTitle>Ditolak</CardTitle>
      </CardHeader>
      <CardBody>
        <CardSubtitle>Total</CardSubtitle>
        <CardText />
        <Button>Periksa</Button>
      </CardBody>
      <CardFooter>
        <a class="small text-white stretched-link" href="/masyarakat/ditolak">
          Pengaduan Ditolak
        </a>
      </CardFooter>
    </Card>
  </Col>
  <Col>
    <Card class="mb-3 text-white" color="warning">
      <CardHeader>
        <CardTitle>Dalam Proses</CardTitle>
      </CardHeader>
      <CardBody>
        <CardSubtitle>Total</CardSubtitle>
        <CardText />
        <Button>Periksa</Button>
      </CardBody>
      <CardFooter>
        <a class="small text-white stretched-link" href="/masyarakat/proses">
          Pengaduan Dalam Proses
        </a>
      </CardFooter>
    </Card>
  </Col>
  <Col>
    <Card class="mb-3 text-white" color="success">
      <CardHeader>
        <CardTitle>Selesai</CardTitle>
      </CardHeader>
      <CardBody>
        {#each pengaduans as pengaduan}
          {#if pengaduan.status == "SELESAI"}
            {total.push(pengaduan.status)}
            {/if}
            {/each}
            <h3>{total.length}</h3>
      </CardBody>
      <CardFooter>
        <a class="small text-white stretched-link" href="/masyarakat/selesai">
          Pengaduan Selesai
        </a>
      </CardFooter>
    </Card>
  </Col>
</Row>



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
                </table>
              </Modal>
            {/if}
          {/if}
        {/each}
      </tbody>
    </Table>
  </CardBody>
</Card>
