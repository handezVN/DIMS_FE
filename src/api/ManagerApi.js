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
