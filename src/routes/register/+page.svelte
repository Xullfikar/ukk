<script lang="ts">
  import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
  } from "sveltestrap";

  import type { ActionData } from "./$types";
  export let form: ActionData;
</script>

<Col class="col-lg-7 mx-auto">
  <Card class="shadow-lg border-0 rounded-lg mt-5">
    <CardHeader>
      <h3 class="text-center font-weight-light my-4">Register</h3>
    </CardHeader>
    <CardBody>
      <Form action="" method="POST">
        <FormGroup>
          <Label class="small mb-1">Nama</Label>
          <Input
            class="py-4"
            type="text"
            name="nama"
            placeholder="Enter nama"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label class="small mb-1">Username</Label>
          <Input
            class="py-4"
            type="text"
            name="username"
            placeholder="Enter username"
            value={form?.username}
            required
          />
          {#if form?.usernameReady}<p class="text-danger">*username sudah ada</p>{/if}
        </FormGroup>
        <FormGroup>
          <Label class="small mb-1">Password</Label>
          <Input
            class="py-4"
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
          {#if form?.incorrect}<p class="text-danger">*password tidak sesuai</p>{/if}
        </FormGroup>
        <FormGroup>
          <Label class="small mb-1">Konfirmasi Password</Label>
          <Input
            class="py-4"
            type="password"
            name="Kpassword"
            placeholder="Enter konfirmasi password"
            required
          />
          {#if form?.incorrect}<p class="text-danger">*password tidak sesuai</p>{/if}
        </FormGroup>
        <FormGroup>
          <Label class="small mb-1">Telepon</Label>
          <Input
            class="py-4"
            type="number"
            name="telepon"
            placeholder="Enter telepon"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label class="small mb-1">NIK</Label>
          <Input
            class="py-4"
            type="number"
            name="nik"
            placeholder="Enter nik"
            required
            value={form?.nik}
          />
          {#if form?.nikReady}<p class="text-danger font-monospace">*NIK sudah digunakan sebelumnya</p>{/if}
        </FormGroup>
        <FormGroup class="mt-4 mb-0">
          <Button color="primary" type="submit" block>
            Create Account
          </Button>
        </FormGroup>
      </Form>
    </CardBody>
    <CardFooter class="text-center small">
      <a href="/login">Have an account? Go to login</a>
    </CardFooter>
  </Card>
</Col>
<div class="pb-5" />
