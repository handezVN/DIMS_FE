import axios from 'axios';

export const searchLocation = async (input) => {
    const res = await axios.get(`api/GuestManage/Search-Loaction?LocationName=${input}`);
    return res.data;
};

export const searchHotelbyLocation = async ({ type, name, date, night }) => {
    const res = await axios.get(`api/GuestManage/Search-Hotel`, {
        params: {
            location: type,
            locationName: name,
            arrivalDate: date,
            totalNight: night,
        },
    });
    return res.data;
};

export const searchAvaiableHotel = async ({ hotelid, quantity, date, night }) => {
    const res = await axios.get(`api/GuestManage/Avaiable-Hotel-Cate`, {
        params: {
            hotelId: hotelid,
            peopleQuanity: quantity,
            ArrivalDate: date,
            TotalNight: night,
        },
    });
    return res.data;
};
