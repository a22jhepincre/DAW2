import {ref, reactive, onMounted, onBeforeUnmount} from "vue";

export function useLoginForm() {
  const email = ref("");
  const password = ref("");
  const showPassword = ref(false);

  const handleLogin = () => {
    if (!email.value || !password.value) {
      return alert("Por favor, completa todos los campos.");
    }
    console.log("Iniciando sesión con:", {
      email: email.value,
      password: password.value,
    });
  };

  onMounted(async () => {

  });

  onBeforeUnmount(() => {
  });

  return {
    email,
    password,
    showPassword,


    handleLogin
  };
}
