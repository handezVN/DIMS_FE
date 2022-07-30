import axios from 'axios';

export const getListHotels = async (token) => {
    const res = await axios.get('api/HotelManage/List-Hotels', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const getHotelPhotos = async (token, hotelId) => {
    const res = await axios.get(`api/HotelManage/List-A-Hotel-Photos?hotelId=${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const addHotelPhotos = async (listImage, token) => {
    const res = await axios.post(`api/HotelManage/Add-A-Hotel-Photos`, listImage, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const RemovePhotos = async (photoId, token) => {
    const res = await axios.delete(`api/HotelManage/Remove-A-Hotel-Photo?PhotoId=${photoId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const RemoveCategory = async (categoryId, token) => {
    const res = await axios.delete(`api/HotelManage/Remove-A-Hotel-Cate?categoriID=${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
export const UpdateMainPhoto = async (hotelId, photoId, token) => {
    const res = await axios.put(
        `api/HotelManage/Update-Hotel-MainPhoto?hotelId=${hotelId}&photoId=${photoId}`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const getHotelCategory = async (token, hotelId) => {
    const res = await axios.get(`api/HotelManage/List-A-cate-Photos?hotelId=${hotelId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const UpdateHotelCategory = async ({
    token,
    hotelId,
    categoryId,
    categoryName,
    cateDescrpittion,
    priceDefault,
    quanity,
}) => {
    const res = await axios.put(
        `api/HotelManage/Update-Hotel-Cate`,
        {
            categoryId: categoryId,
            hotelId: hotelId,
            categoryName: categoryName,
            cateDescrpittion: cateDescrpittion,
            priceDefault: priceDefault,
            quanity: quanity,
            status: true,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const addCategoryPhotos = async (hotelId, categoryId, list, token) => {
    const res = await axios.post(
        `api/HotelManage/Add-A-cate-Photos`,
        {
            hotelId: hotelId,
            categoryId: categoryId,
            photos: list,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const AddHotelCategory = async ({ token, hotelId, categoryName, cateDescrpittion, priceDefault, quanity }) => {
    const res = await axios.post(
        `api/HotelManage/Add-A-Hotel-Cates`,
        [
            {
                hotelId: hotelId,
                categoryName: categoryName,
                cateDescrpittion: cateDescrpittion,
                priceDefault: priceDefault,
                quanity: quanity,
            },
        ],
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const addRoom = async (hotelId, list, token) => {
    const res = await axios.post(
        `api/HotelManage/Add-Rooms`,
        {
            hotelId: hotelId,
            rooms: list,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
export const getStatusAllRooms = async (token, hotelId) => {
    const res = await axios.get(`api/HostManage/Host-A-Hotel-All-Room-Status-Today?hotelId=${hotelId}&today=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const cleanRoom = async (roomId, token) => {
    const res = await axios.put(
        `api/HostManage/Update-Clean-Status?roomID=${roomId}`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res;
};

export const getRoomInfo = async (roomId, token) => {
    const res = await axios.get('api/HostManage/Host-A-Detail-Room', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            RoomId: roomId,
            today: today,
        },
    });
    return res.data;
};
export const getUsedMenu = async (bookingDetailId, token) => {
    const res = await axios.get(`api/HostManage/Get-User-Menu?BookingDetailID=${bookingDetailId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const removeRoom = async (roomId, token) => {
    const res = await axios.delete(`api/HotelManage/Remove-A-Room?RoomId=${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
export const updateRoomInfo = async (roomId, roomName, hotelId, categoryId, floor, token) => {
    const res = await axios.put(
        `api/HotelManage/Update-A-Room`,
        {
            roomId: roomId,
            roomName: roomName,
            hotelId: hotelId,
            categoryId: categoryId,
            floor: floor,
            roomDescription: 'string',
            status: true,
        },
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res;
};

export const getMoneyCheckOut = async (hotelid, from, to, token) => {
    const res = await axios.get(
        `api/HostManage/Get-Money-Checkout-info-By-Filter?hotelId=${hotelid}&startDate=${from}&endDate=${to}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const getMoneyNonCheckOut = async (hotelid, from, to, token) => {
    const res = await axios.get(
        `api/HostManage/Get-Money-not-Checkout-info-By-Filter?hotelId=${hotelid}&startDate=${from}&endDate=${to}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const getBooking = async (hotelId, currentPage, PageSize, token) => {
    const res = await axios.get(
        `api/HostManage/Get-All-Book-By-Page?hotelId=${hotelId}&currentPage=${currentPage}&PageSize=${PageSize}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    return res.data;
};

export const getBookingDetail = async (bookingId, token) => {
    const res = await axios.get(`api/HostManage/Get-A-Book-Full-Detail?bookingID=${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const getListCategory = async (hotelid, token) => {
    const res = await axios.get(`api/HotelManage/List-A-Hotel-Cates?hotelId=${hotelid}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
export const AddPriceCategory = async (list, token) => {
    const res = await axios.post(`api/HotelManage/Add-A-SpecialPrice`,list,{
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
