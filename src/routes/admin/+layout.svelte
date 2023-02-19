<script lang="ts">
  // @ts-nocheck
  import {
    Container,
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
    Button
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
        {#if data.userDetail?.level == "ADMIN"}
        <NavItem>
          <NavLink href="/admin/user">User</NavLink>
        </NavItem>
        {/if}
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>Pengaduan</DropdownToggle>
            <DropdownMenu end>
              <DropdownItem href="/admin/masuk">Pengaduan Masuk</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/admin/ditolak">Pengaduan Ditolak</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/admin/diproses">Pengaduan Diproses</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/admin/selesai">Pengaduan Selesai</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        {#if data.userDetail?.level == "ADMIN"}
        <NavItem>
          <NavLink href="/">Report</NavLink>
        </NavItem>
        {/if}
        <Dropdown nav inNavbar>
          <DropdownToggle nav caret>{data.userDetail.level}</DropdownToggle>
          <form method="POST" action="/logout">
            <DropdownMenu end>
              <DropdownItem>{data.userDetail.nama}</DropdownItem>
              <DropdownItem>{data.userDetail.nik}</DropdownItem>
              <DropdownItem>{data.userDetail.telepon}</DropdownItem>
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
