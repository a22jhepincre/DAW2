<script setup>
import {useLoginForm} from "@/composable/useLoginForm.js";

const loginForm = useLoginForm();
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
          <q-card-section>
            <div class="text-h6 text-center">Inicio de Sesión</div>
          </q-card-section>

          <q-card-section>
            <q-input
              filled
              v-model="loginForm.email.value"
              label="Correo electrónico"
              type="email"
              required
              dense
            />
            <q-input
              filled
              v-model="loginForm.password.value"
              label="Contraseña"
              :type="loginForm.showPassword.value ? 'text' : 'password'"
              dense
              class="q-mt-md"
              required
            >
              <template v-slot:append>
                <q-icon
                  name="visibility"
                  v-if="!loginForm.showPassword.value"
                  @click="loginForm.showPassword.value = true"
                  class="cursor-pointer"
                />
                <q-icon
                  name="visibility_off"
                  v-else
                  @click="loginForm.showPassword.value = false"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn label="Iniciar Sesión" color="primary" @click="loginForm.handleLogin"/>
            <q-btn flat label="¿Olvidaste tu contraseña?" class="q-ml-sm"/>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
