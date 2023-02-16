<script>
    // @ts-nocheck
  
    import Card from "sveltestrap/src/Card.svelte";
    import CardBody from "sveltestrap/src/CardBody.svelte";
    import CardHeader from "sveltestrap/src/CardHeader.svelte";
    import CardFooter from "sveltestrap/src/CardFooter.svelte";
    import Form from "sveltestrap/src/Form.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Col from "sveltestrap/src/Col.svelte";
  </script>
  
  <h2>Tambah User</h2>

  <Card color="secondary" body class="mt-2">
    <h6><b><a href="/admin">Dashboard</a> / <a href="/admin/user">User</a> / Buat User</b></h6>
  </Card>

  <Col class="col-lg-7 mx-auto">
    <Card class="shadow-lg border-0 rounded-lg mt-5">
      <CardBody>
        <Form action="" method="POST">
          <FormGroup>
            <Label for="inputName" class="small mb-1">Nama</Label>
            <Input
              class="py-3"
              type="text"
              name="nama"
              id="inputName"
              placeholder="Enter nama"
            />
          </FormGroup>
          <FormGroup>
            <Label for="username" class="small mb-1">Username</Label>
            <Input
            class="py-3"
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPassword" class="small mb-1">Password</Label>
            <Input
            class="py-3"
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Enter password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="telepon" class="small mb-1">Telepon</Label>
            <Input
            class="py-3"
              type="number"
              name="telepon"
              id="telepon"
              placeholder="Enter telepon"
            />
          </FormGroup>
          <FormGroup>
            <Label for="nik" class="small mb-1">Nik</Label>
            <Input
            class="py-3"
              type="number"
              name="nik"
              id="nik"
              placeholder="Enter nik"
            />
          </FormGroup>
          <FormGroup>
            <Label for="level" class="small mb-1">Level</Label>
            <Input
            class="py-2"
              type="select"
              name="level"
              id="level"
            >
            <option value="PETUGAS">PETUGAS</option>
            <option value="MASYARAKAT">MASYARAKAT</option>
          </Input>
          </FormGroup>
          <FormGroup class="mt-4 mb-0">
            <Button color="primary" type="submit" block>
              Create
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  </Col>
  <div class="pb-5" />
  