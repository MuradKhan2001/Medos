import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {
    TextField, MenuItem, InputLabel, FormControl, Select, Checkbox, OutlinedInput,
    ListItemText
} from "@mui/material";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import {GOOGLE_MAPS_API_KEY} from "../googleMapsApi";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Loader from "../../loader/Loader";
import i18next from "i18next";
import {useTranslation} from "react-i18next";


const libraries = ["places"];


const RegisterPharmacies = () => {
    const [hospitalType, setHospitalType] = useState('');
    const [invalidService, setInvalidService] = useState(true);
    const [workingTime24, setWorkingTime24] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [center, setCenter] = useState(null);
    const [socialMedias, setSocialMedias] = useState([{id: Date.now(), link: ""}]);

    const [addressLocation, setAddressLocation] = useState("");
    const {t} = useTranslation();

    const [weekend, setWeekend] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            let locMy = {lat: latitude, lng: longitude};
            setCenter(locMy);
        });
    }, []);

    const handleChange = (event) => {
        setHospitalType(event.target.value);
    };

    const handleChangeMore = (event) => {
        const {
            target: {value},
        } = event;
        setWeekend(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Dushanba',
        'Seshanba',
        'Chorshanba',
        'Payshanba',
        'Juma',
        'Shanba',
        'Yakshanba'
    ];

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
        language: i18next.language,
    });

    const options = useMemo(
        () => ({
            disableDefaultUI: false,
            clickableIcons: false,
        }),
        []
    );

    const selectAddressIcon = {
        url: "./images/address.png",
        scaledSize: {width: 40, height: 50},
    };

    const ClicklLocation = (e) => {
        let latitude = e.latLng.lat();
        let longitude = e.latLng.lng();

        let locMy = {lat: latitude, lng: longitude};

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;

        axios.get(`${url}`, {
            headers: {
                "Accept-Language": i18next.language,
            },
        }).then((res) => {
            let city = res.data.address.city;
            let country = res.data.address.country;
            let suburb = res.data.address.suburb;
            let neighbourhood = res.data.address.neighbourhood;
            let county = res.data.address.county;
            let road = res.data.address.road;
            let fullAddress = `${country ? country + "," : ""} ${city ? city + "," : ""
            } ${suburb ? suburb + "," : ""} 
            ${neighbourhood ? neighbourhood + "," : ""} ${
                county ? county + "," : ""
            } ${road ? road : ""}`;

            setSelected(locMy);
            setAddressLocation(fullAddress)

        });
    };

    const PlacesAutocomplete = ({setSelected}) => {
        const {
            ready,
            value,
            setValue,
            suggestions: {status, data},
            clearSuggestions,
        } = usePlacesAutocomplete({
            requestOptions: {
                language: i18next.language,
            },
        });

        const handleSelect = async (address) => {
            const results = await getGeocode({address});
            const {lat, lng} = await getLatLng(results[0]);
            let locMy = {lat, lng};
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&lan=en`;

            axios.get(`${url}`, {headers: {"Accept-Language": i18next.language},}).then((res) => {
                let city = res.data.address.city;
                let country = res.data.address.country;
                let suburb = res.data.address.suburb;
                let neighbourhood = res.data.address.neighbourhood;
                let county = res.data.address.county;
                let road = res.data.address.road;
                let fullAddress = `${country ? country + "," : ""} ${
                    city ? city + "," : ""
                } ${suburb ? suburb + "," : ""} 
            ${neighbourhood ? neighbourhood + "," : ""} ${
                    county ? county + "," : ""
                } ${road ? road : ""}`;

                setSelected(locMy);
                setCenter({lat, lng});
                setAddressLocation(fullAddress)

            });
        };

        return (
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Manzilni kiriting..."
                />

                <div className="address-wrapper">
                    <div className="list-address">
                        {status === "OK" &&
                        data.map(({place_id, description}) => (
                            <ComboboxOption key={place_id} value={description}/>
                        ))}
                    </div>
                </div>
            </Combobox>
        );
    };

    const regions = [
        {name: "Andijon", latitude: 40.813616, longitude: 72.283463},
        {name: "Buxoro", latitude: 39.767070, longitude: 64.455393},
        {name: "Farg‘ona", latitude: 40.372379, longitude: 71.797770},
        {name: "Jizzax", latitude: 40.119300, longitude: 67.880140},
        {name: "Namangan", latitude: 41.004297, longitude: 71.642956},
        {name: "Navoiy", latitude: 40.096634, longitude: 65.352255},
        {name: "Qashqadaryo", latitude: 38.852124, longitude: 65.784203},
        {name: "Samarqand", latitude: 39.649307, longitude: 66.965182},
        {name: "Sirdaryo", latitude: 40.376986, longitude: 68.713159},
        {name: "Surxondaryo", latitude: 37.931559, longitude: 67.564765},
        {name: "Toshkent", latitude: 41.295695, longitude: 69.239730},
        {name: "Xorazm", latitude: 41.522326, longitude: 60.623731},
        {name: "Qoraqalpog‘iston", latitude: 43.730521, longitude: 59.064533}
    ];

    const addSocialMedia = () => {
        if (socialMedias.length < 5) {
            let newMedia = {id: Date.now(), link: ""};
            let newArr = socialMedias.concat(newMedia);
            setSocialMedias(newArr)
        } else alert("5 tagacha ijtimoiy tarmoq qo'sha olasiz")
    };

    const delSocialMedia = (id) => {
        let newArr = socialMedias.filter((item) => item.id !== id);
        setSocialMedias(newArr)
    };

    if (!isLoaded) return <Loader/>;

    return <div className="register-pharmacies-container">

        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>
        <div className="xbtn">
            <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
        </div>

        <div className="register-page">
            <div className="header-register">
                <div className="line-page-numbers">
                    <div className={`line ${pageNumber === 1 || pageNumber === 2 ? "line-active" : ""}`}></div>
                    <div className={`num ${pageNumber === 1 || pageNumber === 2 ? "num-active" : ""}`}>
                        1
                        <div className={`name ${pageNumber === 1 || pageNumber === 2 ? "active-name" : ""}`}>
                            Dorixona haqida
                        </div>
                    </div>

                    <div className={`line ${pageNumber === 2 ? "line-active" : ""}`}></div>
                    <div className={`num ${pageNumber === 2 ? "num-active" : ""}`}>
                        2
                        <div className={`name ${pageNumber === 2 ? "active-name" : ""}`}>
                            Dorixona manzili
                        </div>
                    </div>

                    <div className={`line ${pageNumber === 2 ? "line-active" : ""}`}></div>
                </div>
            </div>

            {pageNumber === 1 &&
            <div className="register-page-one">
                <div className="title">
                    Dorixona haqida ma'lumotlarni toldiring
                </div>
                <div className="des">
                    Dorixona akkountingizni ro‘yxatdan o‘tkazish uchun bu juda muhim
                </div>
                <div className="logo-hospital">
                    <div className="logo-image">
                        <img className="logo-camera" src="./images/Exclude.png" alt=""/>
                        {/*<img className="logo-clinic" src="./images/Logo-pharma.png" alt=""/>*/}
                    </div>
                    <div className="label">
                        Logo qo‘shish
                    </div>
                </div>

                <div className="inputs-box">
                    <TextField sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                               label="Dorixona to'liq nomini kiriting " variant="outlined" className="textField"/>
                </div>

                <div className="label-text">
                    <div className="sides">
                        <div className="label-bold">Ish vaqti</div>
                    </div>
                    <div className="sides"></div>
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <FormControl sx={{m: 1, width: "100%"}} className="selectMui" size="small">
                            <InputLabel id="demo-multiple-checkbox-label">Ish kunlarini belgilang</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={weekend}
                                onChange={handleChangeMore}
                                input={<OutlinedInput label="Ish kunlarini  belgilang"/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={weekend.indexOf(name) > -1}/>
                                        <ListItemText primary={name}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="select-sides">
                        <div className="check-box">
                            <div className="checkbox-wrapper-13">
                                <input
                                    onChange={(e) => {
                                        setWorkingTime24((prevState) => !prevState);
                                    }}
                                    id="c1-13"
                                    type="checkbox"
                                />
                            </div>
                            <label htmlFor="c1-13">
                                Ish faoliyati 24 soat yuritiladi
                            </label>
                        </div>
                    </div>
                </div>

                {workingTime24 ? "" : <div className="select-box-working-time">
                    <div className="select-sides">
                        <label htmlFor="">Ish vaqti boshlanishi</label>
                        <input type="time"/>
                    </div>
                    <div className="select-sides">
                        <label htmlFor="">Ish vaqti boshlanishi</label>
                        <input type="time"/>
                    </div>
                </div>}

                <div className="label-text">
                    <div className="sides">
                        <div className="label-bold">Dorixona bilan bog‘lanish</div>
                    </div>
                    <div className="sides"></div>
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <TextField sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                   label="Telefon raqam 1" variant="outlined" className="textField"/>
                    </div>
                    <div className="select-sides">
                        <TextField sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                   label="Telefon raqam 2" variant="outlined" className="textField"/>
                    </div>
                </div>

                <div className="label-text">
                    <div className="sides">
                        Ijtimoiy tarmoq sahifasi yoki veb sayt havolasi
                    </div>
                    <div className="sides"></div>
                </div>

                <div className="inputs-box-link">
                    <label htmlFor=""></label>

                    {socialMedias.map((item, index) => {
                        return <div key={index} className="inputs-social-media">
                            <TextField onChange={(e) => item.link = e.target.value} sx={{m: 1, minWidth: "50%"}}
                                       size="small"
                                       id="outlined-basic"
                                       label="https://" variant="outlined" className="textField"/>

                            {socialMedias.length > 1 && index !== 0 &&
                            <div onClick={() => delSocialMedia(item.id)} className="del-icon"><img
                                src="./images/del-icon.png" alt=""/></div>}
                        </div>
                    })}

                    <div className="des">Agar veb sayt mavjud bo‘lmasa ijtimoiy tarmoq sahifasining havolasini
                        kiriting
                    </div>

                    <div onClick={addSocialMedia} className="add-social-media">
                        Ijtomoiy sahifa qo‘shish
                    </div>

                    <div className="des">
                        Telegram, Whatsapp sahifasi havolasini qo‘shish orqali bemorlarni bog‘lanishini osonlashtiring
                    </div>
                </div>

                <div className="btn-box">
                    <div onClick={() => {
                        setPageNumber(2);
                    }} className="next-page-btn">
                        Tasdiqlash va davom etish
                        <img src="./images/next-btn.png" alt=""/>
                    </div>
                </div>
            </div>}


            {pageNumber === 2 &&
            <div className="register-page-two">
                <div className="title">
                    Dorixona qayerda joylashgan?
                </div>
                <div className="des">
                    Mijozlar sizni topishlari oson bo‘lishi uchun bu juda muhim
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                            <InputLabel id="demo-select-large-label">Viloyatni tanlang</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={hospitalType}
                                label="Viloyatni tanlang"
                                onChange={handleChange}
                            >

                                {regions.map((item, index) => {
                                    return <MenuItem key={index} onClick={() => {
                                        setCenter({lat: item.latitude, lng: item.longitude})
                                    }} value={item.name}>{item.name}</MenuItem>
                                })}

                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="label-address">Manzil:</div>
                <div className="address-box">
                    {addressLocation ? addressLocation : <p>Manzilni xaritadan belgilang</p>}
                </div>
                <div className="address-container">
                    <GoogleMap
                        zoom={9}
                        center={center}
                        options={options}
                        onClick={ClicklLocation}
                        mapContainerClassName="map-box"
                    >
                        {selected && (
                            <Marker icon={selectAddressIcon} position={selected}/>
                        )}

                        <div className="search-address">
                            <div className="places-container">
                                <PlacesAutocomplete setSelected={setSelected}/>
                                <img src="./images/search.png" alt=""/>
                            </div>
                        </div>
                    </GoogleMap>
                </div>

                <div className="btn-box">
                    <div onClick={() => setPageNumber(1)} className="prev-btn">
                        <img src="./images/prev-btn.png" alt=""/>
                        Orqaga qaytish
                    </div>
                    <div onClick={() => setPageNumber(2)} className="next-page-btn">
                        Tasdiqlash va davom etish
                        <img src="./images/next-btn.png" alt=""/>
                    </div>
                </div>
            </div>}

        </div>
    </div>
};

export default RegisterPharmacies