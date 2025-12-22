//Biblioteca para panejo de peticiones a la api de paypal
const axios = require('axios');
//Servicio de manejo de payapal en modo sandbox
//Servicio :generar orden de pago
exports.paypal_api_link = async (total, cod_unico_boleto) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total || '10'
          }
        }
      ],
      application_context: {
        brand_name: "TicketMagic",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:8100/tabs-user/pago-realizado?cod_unico_boleto=${cod_unico_boleto}`,
        cancel_url: `http://localhost:8100/tabs-user/pago-cancelado?cod_unico_boleto=${cod_unico_boleto}`
      }
    };

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const { data: { access_token } } = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
      params,
      {
        auth: {
          username: process.env.PAYPAL_ID,
          password: process.env.PAYPAL_SECRET
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const approveLink = response.data.links.find(link => link.rel === 'approve')?.href;
    console.log("Link para aprobar:", approveLink);
    return approveLink;

  } catch (error) {
    if (error.response?.data) {
      console.error("PayPal error:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error al crear la orden:", error.message);
    }
  }
};
//Servicio: capturar orden
exports.capture_order= async (token)=>{
    const response= await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {}, {
        auth:{
          username: process.env.PAYPAL_ID,
          password: process.env.PAYPAL_SECRET
        }
      }
    )
    return response
};