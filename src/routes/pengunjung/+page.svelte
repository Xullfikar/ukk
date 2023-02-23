<script lang="ts">
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

  import { fade } from 'svelte/transition';

  let isOpen = false;

  function handleUpdate(event: any) {
    isOpen = event.detail.isOpen;
}
    import type { PageData } from "./$types";
    export let data: PageData;
    $: ({ pengaduans } = data);

    let search = "";
</script>


<Navbar color="primary" class="fixed-top" dark expand="md">
    <NavbarBrand href="/">Pengaduan Masyarakat</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" bind:value={search}>
        </NavItem>
        <NavItem>
          <NavLink href="/register">Register</NavLink>
        </NavItem>
        <NavItem>
          <Button color="dark" href="/login">Login</Button>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
  <div class="container">

<div style="height: 90px;" />
{#each pengaduans as pengaduan}
    {#if pengaduan.status == "SELESAI" || pengaduan.status == "TOLAK"}
    {#if pengaduan.judul.toLowerCase().includes(search.toLowerCase()) 
    || pengaduan.isi.toLowerCase().includes(search.toLowerCase()) 
    || pengaduan.user.nama.toLowerCase().includes(search.toLowerCase())
    || pengaduan.tanggal.toLowerCase().includes(search.toLowerCase())
    }
        <div class="card mb-3" transition:fade="{{duration: 500}}">
            <div class="row g-0">
                <div class="col-md-4">
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img src={pengaduan.foto} class="img-fluid rounded-start" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{pengaduan.judul}</h5>
                        <p class="card-text">{pengaduan.isi}</p>
                        <p class="card-text">
                            <small class="text-muted font-monospace"
                                >Dilaporkan oleh: {pengaduan.user.nama}</small
                            >
                        </p>
                        <p class="card-text">
                            <small class="text-muted font-monospace"
                                >Tanggal Pengaduan: {pengaduan.tanggal}</small
                            >
                        </p>
                        <h5 class="card-title">Tanggapan:</h5>
                        <ol>
                            {#each pengaduan.Tanggapan as tanggapan}
                                <li>
                                    {tanggapan.tanggapan},
                                    <small class="text-muted font-monospace"
                                        >{pengaduan.Tanggapan[0].tanggal}</small
                                    >
                                </li>
                            {/each}
                        </ol>
                        <p class="card-text">
                            <small class="text-muted font-monospace"
                                >Ditanggapi oleh: {pengaduan.Tanggapan[0].user
                                    .nama}</small
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
    {/if}
{/each}
  </div>
