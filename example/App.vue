<template>
  <Entity name="用户管理" :entity="entity">

    <h1 slot:title>222</h1>
  </Entity>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Entity, useEntity } from '../src'

let id = 0

type User = {
  name: string
  age: number
  gender: number
  mail: string
  id: number
}

const user : () => User = () => {
  id++
  return { 
    name: 'Name ' + id, 
    age: Math.round(Math.random() * 100),
    gender: Math.random() > 0.5 ? 1 : 0,
    mail: Math.round(Math.random() * Math.pow(10, 6)) + '@qq.com',
    id: id
  }
}

const users = [user()]

const createUser = (ud: Partial<User>) => {
  const u = user()
  users.push(u)
  return Promise.resolve(u)
}

const modifyUser = (ud: Partial<User>) => {
  const { id } = ud
  const u = users.find(u => u.id === id)
  if (!u) return Promise.reject()
  Object.assign(u, ud)
  return Promise.resolve(u)
}

const listUsers = () => {
  return Promise.resolve(users)
}

const removeUser = (ud: Partial<User>) => {
  const { id } = ud
  const idx = users.findIndex(u => u.id === id)
  if (idx < 0) return Promise.reject()
  users.splice(idx, 1)
  return Promise.resolve()
}



export default defineComponent({
  name: 'App',
  components: {
    Entity
  },
  setup () {
    const entity = useEntity<User>({
      createHandler: createUser,
      modifyHandler: modifyUser,
      listHandler: listUsers,
      removeHandler: removeUser,
      fields: [
        { name: 'Name', key: 'name', type: 'string' },
        { name: 'Gender', key: 'gender', type: 'enum' },
        { name: 'Age', key: 'age', type: 'number' },
        { name: 'Mail', key: 'mail', type: 'string' },
      ]
    })


    return {
      entity
    }

  }
})
</script>

<style>

</style>
