import { defineComponent, defineAsyncComponent, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import * as comm from "../communicationManager/communicationManager.js";

// Import Stripe.js
import 'https://js.stripe.com/v3/';

export const HomePage = defineAsyncComponent(() =>
    Promise.all([
        fetch('./templates/home/homePage.html').then(response => response.text()),
        Promise.resolve(defineComponent({
            name: 'HomePage',
            props: {
                page: {
                    type: String,
                    default: "login"
                }
            },
            emits: ['updatePage'],
            setup(props, { emit }) {
                const getToken = () => {
                    return localStorage.getItem('token');
                };

                const stripe = ref(null);
                const elements = ref(null);
                const cardElement = ref(null);
                const cardHolderName = ref('');

                onMounted(() => {
                    // Initialize Stripe
                    stripe.value = Stripe('pk_test_51QBQ6tBiQOvBGJ1KH64AgpJMGMPLABelWmRTO4Wfxr3guDzXJC6dzhz6tl6Oor57TZMayt320weFOCygyzV6TARu00IhhxqQVT');
                    elements.value = stripe.value.elements();
                    cardElement.value = elements.value.create('card');
                    cardElement.value.mount('#card-element');
                });

                const goToRegister = () => {
                    emit('updatePage', 'register');
                };

                const updatePaymentMethod = async () => {
                    try {
                        // Realizas la llamada a tu API para crear el SetupIntent y obtener el client_secret
                        const response = await comm.createSetUpIntent(getToken());
                        const clientSecret = response.client_secret;  // Asegúrate de acceder a client_secret correctamente

                        console.log(clientSecret);  // Verifica que el client_secret es correcto

                        // Usas el clientSecret en el método de Stripe
                        const { setupIntent, error } = await stripe.value.confirmCardSetup(
                            clientSecret,
                            {
                                payment_method: {
                                    card: cardElement.value,
                                    billing_details: { name: cardHolderName.value }
                                }
                            }
                        );

                        if (error) {
                            console.error(error.message);
                            // Manejo de errores
                        } else {
                            console.log('Card verified successfully');
                            let paymentMethodResponse = await comm.addPaymentMethod(getToken(), setupIntent.payment_method)
                            console.log(paymentMethodResponse);
                            // Manejo de verificación exitosa
                        }
                    } catch (error) {
                        console.error('Error creating SetupIntent:', error);
                    }
                };

                return {
                    goToRegister,
                    cardHolderName,
                    updatePaymentMethod
                };
            }
        }))
    ]).then(([template, component]) => {
        component.template = template
        return component
    })
)