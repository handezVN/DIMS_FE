import axios from 'axios';

export const finalPayment = async ({
    token,
    hotelId,
    fullName,
    phoneNumber,
    arrivalDate,
    totalNight,
    peopleQuanity,
    voucherId,
    currencyRate,
    email,
    roomsId,
    description,
    tokenid,
}) => {
    console.log({
        token: token,
        hotelId: hotelId,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        arrivalDate: arrivalDate,
        totalNight: totalNight,
        peopleQuanity: peopleQuanity,
        description: description,
        voucherId: voucherId,
        currencyRate: currencyRate,
        bookingDetails: roomsId,
    });
    const res = await axios.post(
        `api/UserBookingManage/user-Online-Payment`,
        {
            token: token,
            hotelId: hotelId,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            arrivalDate: arrivalDate,
            totalNight: totalNight,
            peopleQuanity: peopleQuanity,
            description: description,
            voucherId: voucherId,
            currencyRate: currencyRate,
            bookingDetails: roomsId,
        },
        {
            headers: { Authorization: `Bearer ${tokenid}` },
        },
    );
    return res.data;
};
