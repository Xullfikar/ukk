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
        Row
    } from "sveltestrap";

    import type { PageData } from "./$types"
    export let data : PageData
    $: ({pengaduan} = data)
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
            <td><Image src={pengaduan?.foto} height="250"/></td>
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
          <tr>
            <th class="align-baseline">Status Veriication</th>
            <td class="align-baseline">:</td>
            <td class="align-baseline">{pengaduan?.status}</td>
          </tr>
      </Table>
      <hr>
      <h5>Tanggapan:</h5>
        <FormGroup>
          <Input
            class="py-2"
            type="textarea"
            name="tanggapan"
            placeholder="Enter tanggapan"
          />
          <Input
            type="text"
            name="id_pengaduan"
            value={pengaduan?.id}
            hidden
          />
        </FormGroup>
      </CardBody>
    <CardFooter>
          <div class="d-flex flex-row-reverse flex-wrap align-items-center">
            <div class="ms-3">
              <Button type="submit" color="primary" class="px-5">Kirim</Button>
            </div>
            <div class="ms-3">
              <Input type="select" name="status" id="Status" class="px-5">
                <option value="PROSES">Proses</option>
                <option value="SELESAI">Selesai</option>
                <option value="TOLAK">Tolak</option>
              </Input>
            </div>
            <div class="">
              <Label for="Status">Status Verification :</Label>
            </div>
        </div>
    </CardFooter>
  </Form>
  </Card>
</div>