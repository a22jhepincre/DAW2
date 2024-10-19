import { defineComponent, defineAsyncComponent, ref, reactive, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import * as comm from '../communicationManager/communicationManager.js'

export const RegisterPage = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/authenticate/registerPage.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'RegisterPage',
            props: {
                page: {
                    type: String,
                    default: "register"
                }
            },
            emits: ['updatePage'],
            setup(props, { emit }) {
                const formData = reactive({
                    username: '',
                    email: '',
                    password: '',
                    passwordRepeat: ''
                });

                const errors = reactive({
                    username: '',
                    email: '',
                    password: '',
                    passwordRepeat: ''
                });

                const validateUsername = () => {
                    errors.username = formData.username.length < 3 ? 'Username must be at least 3 characters long' : '';
                };

                const validateEmail = () => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    errors.email = !emailRegex.test(formData.email) ? 'Please enter a valid email address' : '';
                };

                const validatePassword = () => {
                    errors.password = formData.password.length < 4 ? 'Password must be at least 4 characters long' : '';
                };

                const validatePasswordRepeat = () => {
                    errors.passwordRepeat = formData.password !== formData.passwordRepeat ? 'Passwords do not match' : '';
                };

                const isFormValid = computed(() => {
                    return formData.username.length >= 3 &&
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
                        formData.password.length >= 4 &&
                        formData.password === formData.passwordRepeat;
                });

                const goToLogin = () => {
                    emit('updatePage', 'login');
                };

                const showFormData = async () => {
                    validateUsername();
                    validateEmail();
                    validatePassword();
                    validatePasswordRepeat();

                    if (isFormValid.value) {
                        console.log('Form Data:', formData);
                        console.log('correcto');
                        let result = await comm.insertUser(formData);
                        console.log(result);
                        // Aquí puedes añadir la lógica para enviar los datos al servidor
                    } else {
                        console.log('Please correct the errors in the form');
                    }
                };

                return {
                    formData,
                    errors,
                    goToLogin,
                    showFormData,
                    validateUsername,
                    validateEmail,
                    validatePassword,
                    validatePasswordRepeat,
                    isFormValid
                };
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)