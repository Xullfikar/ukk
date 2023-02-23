<script lang="ts">
  import {
    Card,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
  } from "sveltestrap";
  import CardFooter from "sveltestrap/src/CardFooter.svelte";

  // let imageGenerated: any;
  let files: any;
  let avatar: any;
  const onFileSelected = (e: any) => {
    let image = e.target.files[0];
    let imageGenerated = true;
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target?.result ?? "";
    };
  };
</script>

<Col class="col-lg-7 mx-auto">
  <Card class="shadow-lg border-0 rounded-lg mt-5">
    <CardBody>
      <Form method="POST">
        <FormGroup>
          <Label for="inputJudul" class="small mb-1"
            ><h6>Judul Pengaduan</h6></Label
          >
          <Input
            class="py-4"
            type="text"
            name="judul"
            id="inputJudul"
            placeholder="Enter judul pengaduan"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="inputIsi" class="small mb-1"><h6>Isi Pengaduan</h6></Label
          >
          <Input
            class="py-4"
            type="textarea"
            name="isi"
            id="inputIsi"
            placeholder="Enter isi pengaduan"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="foto" class="small mb-1"
            ><h6>Foto Bukti Pengaduan</h6></Label
          >
          <Input
            accept="image/png, image/jpeg"
            bind:files
            on:change={(e) => onFileSelected(e)}
            id="image"
            name="image"
            type="file"
            required
          />
          <small>Max 300kb*</small>
          {#if files}
            {#if Number(files[0].size) / 1024 > 300}
              <p class="text-danger">File too big!</p>
            {/if}
          {/if}
          <Input
            type="text"
            name="foto"
            id="foto"
            value={avatar}
            style="display: none"
            readonly
          />
        </FormGroup>
        <FormGroup class="mt-4 mb-0">
          {#if !files}
            <Button color="primary" block type="submit" disabled>Kirim</Button>
          {:else if Number(files[0].size) / 1024 > 300}
            <Button color="primary" block type="submit" disabled>Kirim</Button>
          {:else}
            <Button color="primary" block type="submit">Kirim</Button>
          {/if}
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
</Col>
