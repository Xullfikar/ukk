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
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
  } from "sveltestrap";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

  import type { LayoutData } from "./$types";
  export let data: LayoutData;
</script>

  <Navbar color="primary" dark expand="md">
    <NavbarBrand href="/">Pengaduan Masyarakat</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          <NavLink href="/">Dashboard</NavLink>
        </NavItem>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>Pengaduan</DropdownToggle>
            <DropdownMenu end>
              <DropdownItem href="/masyarakat/buat_pengaduan">Buat Pengaduan</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/masyarakat/ditolak">Pengaduan Ditolak</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/masyarakat/proses">Pengaduan Diproses</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/masyarakat/selesai">Pengaduan Selesai</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>{data.userDetail.level}</DropdownToggle>
          <form method="POST" action="/logout">
            <DropdownMenu end>
              <DropdownItem>Nama: {data.userDetail.nama}</DropdownItem>
              <DropdownItem>NIK: {data.userDetail.nik}</DropdownItem>
              <DropdownItem>No Telp: {data.userDetail.telepon}</DropdownItem>
              <DropdownItem divider />
              <DropdownItem type="submit"
                >Logout</DropdownItem
              >
            </DropdownMenu>
          </form>
        </Dropdown>
      </Nav>
    </Collapse>
  </Navbar>

  <Container fluid class="mt-3">    
    <slot />
  </Container>
