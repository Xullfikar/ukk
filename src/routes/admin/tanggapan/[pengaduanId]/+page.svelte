<script lang="ts">
  import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Input,
    CardFooter,
    Button,
    Image,
    Table,
    Label,
    Row,
  } from "sveltestrap";

  import type { PageData, ActionData } from "../[pengaduanId]/$types";
  export let data: PageData;
  $: ({ pengaduan, tanggapans } = data);
  export let form: ActionData;
</script>

<h2>Buat Tanggapan</h2>

<Card color="secondary" body class="mt-2">
  <h6><a href="/admin">Dashboard</a> / Buat Tanggapan</h6>
</Card>

<div class="container">
  <Card class="shadow-lg border-0 rounded-lg mt-4 mb-4">
    <Form method="POST">
      <CardHeader>
        <h5>{pengaduan?.judul}</h5>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <tr>
            <th class="align-baseline">Foto Laporan</th>
            <td class="align-baseline">:</td>
            <td><Image src={pengaduan?.foto} height="250" /></td>
          </tr>
          <tr>
            <th class="align-baseline">NIK Pelapor</th>
            <td class="align-baseline">:</td>
            <td>{pengaduan?.user.nik}</td>
          </tr>
          <tr>
            <th class="align-baseline">Nama Pelapor</th>
            <td class="align-baseline">:</td>
            <td>{pengaduan?.user.nama}</td>
          </tr>
          <tr>
            <th class="align-baseline">Nomor Pelapor</th>
            <td class="align-baseline">:</td>
            <td class="align-baseline">{pengaduan?.user.telepon}</td>
          </tr>
          <tr>
            <th class="align-baseline">Isi Pengaduan</th>
            <td class="align-baseline">:</td>
            <td>{pengaduan?.isi}</td>
          </tr>
          <tr>
            <th class="align-baseline">Tanggal Pengaduan</th>
            <td class="align-baseline">:</td>
            <td class="align-baseline">{pengaduan?.tanggal}</td>
          </tr>
          <tr><td><hr></td><td><hr></td><td><hr></td></tr>
          {#each tanggapans as tanggapan, i}
          <tr>
            <th>Tanggapan ke-{i + 1}</th>
          </tr>  
          <tr>
              <th class="align-baseline">Isi:</th>
              <td class="align-baseline">:</td>
              <td class="align-baseline">{tanggapan.tanggapan}</td>
            </tr>
            <tr>
              <th class="align-baseline">Tanggal:</th>
              <td class="align-baseline">:</td>
              <td class="align-baseline">{tanggapan.tanggal}</td>
            </tr>
            <tr><td><hr></td><td><hr></td><td><hr></td></tr>
          {/each}
          <tr>
            <th class="align-baseline">Status Veriication</th>
            <td class="align-baseline">:</td>
            <td class="align-baseline">{pengaduan?.status}</td>
          </tr>
        </Table>
        <hr />
        <h5>Tanggapan:</h5>
        <FormGroup>
          <Input
            class="py-2"
            type="textarea"
            name="tanggapan"
            placeholder="Enter tanggapan"
            required
            value={form?.tanggapan}
          />
          <Input type="text" name="id_pengaduan" value={pengaduan?.id} hidden />
        </FormGroup>
        {#if form?.missingStatus}<p class="text-danger">*Status harus dipilih atau ditingkatkan</p>{/if}
      </CardBody>
      <CardFooter>
        <div class="d-flex flex-row-reverse align-items-center">
          <div class="ms-3">
            <Button type="submit" color="primary" class="px-5">Kirim</Button>
          </div>
          <div class="ms-3">
            <select name="status" id="Status" class="px-4 py-1">
              {#if pengaduan?.status == "PENDING"}
                <option selected hidden value="">Pilih Status</option>
                <option value="PROSES">Proses</option>
                <option value="TOLAK">Tolak</option>
              {:else if pengaduan?.status == "PROSES"}
                <option value="" selected hidden>Proses</option>
                <option value="SELESAI">Selesai</option>
              {:else if pengaduan?.status == "SELESAI"}
                <option value="SELESAI" selected hidden>Selesai</option>
              {:else if pengaduan?.status == "TOLAK"}
              <option value="TOLAK" selected hidden>Tolak</option>
              {/if}
            </select>
          </div>
        </div>
      </CardFooter>
    </Form>
  </Card>
</div>
