<script lang="ts">
    import {
      Button,
      Card,
      CardBody,
      CardFooter,
      CardHeader,
      CardSubtitle,
      CardText,
      CardTitle,
      Col,
      Input,
      Row,
      Table,
      Modal,
      Icon,
      ModalFooter,
      ModalHeader,
      ModalBody
    } from "sveltestrap";
  
    import type { PageData } from "./$types";
    export let data: PageData;
    $: ({ users } = data);
  
    let searchStr: any;
    let open = false;
    let Idi: any;
  
    function id(id: string) {
      open = !open;
      Idi = id;
    }
    const toggle = () => (open = !open);
  </script>
  
  <div class="d-flex justify-content-between align-items-center">
    <h2>User</h2>
    <Icon name="plus-square-fill" />
      <Button color="primary" href="/admin/user/buat_user"
        ><h6><Icon name="plus-square-fill" /> <b>Tambah User</b></h6></Button
      >
  </div>
  
  <Card color="secondary" body class="mt-2 mb-4">
    <h6><b><a href="/masyarakat">Dashboard</a> / User</b></h6>
  </Card>
  
  <Card class="mt-3 mb-4">
    <CardHeader class="bg-secondary">
      <div class="d-flex justify-content-between align-items-center">
        <b>Data User</b>
        <div style="width: 200px;">
          <Input placeholder="Search" bind:value={searchStr} />
        </div>
      </div>
    </CardHeader>
    <CardBody>
      <Table bordered responsive hover>
        <thead>
          <tr>
            <th class="text-center">NIK</th>
            <th class="text-center">Nama</th>
            <th class="text-center">Level</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            {#if user.nama.includes(searchStr)}
              {#if user.level != "ADMIN"}
              <tr on:click={() => id(user.id)}>
                <td class="col-4">{user.nik}</td>
                <td class="col-4">{user.nama}</td>
                <td class="col-4">{user.level}</td>
              </tr>
              {#if Idi == user.id}
                <Modal
                  isOpen={open}
                  {toggle}
                  scrollable
                >
                <ModalHeader {toggle}>
                  <h5>{user.nama}</h5>
                </ModalHeader>
                <ModalBody>
                  <table class="mt-2">
                    <tr>
                      <th>Username:</th>
                    </tr>
                    <tr>
                      <td class="text-success">{user.username}</td>
                    </tr>
                    <tr>
                      <th>NIK:</th>
                    </tr>
                    <tr>
                      <td class="text-success">{user.nik}</td>
                    </tr>
                    <tr>
                      <th>No Handphone:</th>
                    </tr>
                    <tr>
                      <td class="text-success">{user.telepon}</td>
                    </tr>
                    <tr>
                      <th>Level:</th>
                    </tr>
                    <tr>
                      <td class="text-success">{user.level}</td>
                    </tr>
                  </table>
                </ModalBody>
                  <ModalFooter>
                    <div class="d-flex justify-content-between">
                      <div>
                        <Button color="primary">Do Something</Button>
                      </div>
                      <div>  
                        <form action="?/deleteUser&id={user.id}" method="post">
                          <Button color="danger" type="submit">DELETE</Button>
                        </form>
                      </div>
                    </div>
                  </ModalFooter>
                </Modal>
              {/if}
            {/if}
            {/if}
          {/each} 
        </tbody>
      </Table>
    </CardBody>
  </Card>
  