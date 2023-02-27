<script lang="ts">
  // @ts-nocheck
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
  } from "sveltestrap";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="primary" class="fixed-top" dark expand="md">
  <NavbarBrand href="/">Pengaduan Masyarakat</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="/register">Register</NavLink>
      </NavItem>
      <NavItem>
        <Button color="dark" href="/login">Login</Button>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>

<div class="card px-4 py-5 my-5 text-center">
  <h1 class="display-5 fw-bold text-success" style="text-shadow: 1px 2px black;">Fast <small class="text-danger">Response</small></h1>
  <div class="col-lg-6 mx-auto">
    <p class="lead mb-4">Aplikasi ini adalah sebuah layanan tempat pengaduan masyarakat, dengan tampilan yang menarik dilengkapi dengan 2 tema yaitu: DARK dan LIGHT, Aplikasi dapat diakses melalui perangkat apa saja sehingga memudahkan pengguna saat melaporkan sebuah pengaduan tanpa harus membuka laptop/dektop terlebih dahulu.</p>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <Button color="primary" class="btn btn-primary btn-lg px-4 gap-3" href="/login">Masuk</Button>
      <Button color="" class="btn btn-outline-secondary btn-lg px-4" href="/register">Daftar</Button>
    </div>
  </div>
</div>
<div class="container">
  <slot />
</div>
