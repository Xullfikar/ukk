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
      Button
    } from "sveltestrap";

    import type { ActionData } from "./$types";
    export let form: ActionData;
  </script>
  
  <div class="col-lg-5 mx-auto">
    <Card class="shadow-lg border-0 rounded-lg mt-5">
      <CardHeader>
        <h3 class="text-center font-weight-light my-4">Login</h3>
      </CardHeader>
      <CardBody>
        <Form method="POST">
          <FormGroup>
            <Label for="username" class="small mb-1">Username</Label>
            <Input
              class="py-4"
              type="text"
              name="username"
              id="username"
              placeholder="Enter username address" 
              value={form?.username}
              required
              />
              {#if form?.noUsername}<p class="text-danger font-monospace">*Username tidak ditemukan</p>{/if}
          </FormGroup>
          <FormGroup>
            <Label for="password" class="small mb-1">Password</Label>
            <Input
              class="py-4"
              type="password"
              name="password"
              id="password"
              placeholder="Enter password" 
              required 
              />
              {#if form?.missingLogin}<p class="text-danger font-monospace">*Password salah</p>{/if}
          </FormGroup>
          <FormGroup
            class="d-flex align-items-center justify-content-center mt-4 mb-0">
            <Button color="primary" type="submit" block>Login</Button>
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter class="text-center small">
        <a href="/register">Need an account? Sign up!</a>
      </CardFooter>
    </Card>
  </div>
