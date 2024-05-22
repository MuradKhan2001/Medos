import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {
    TextField, MenuItem, InputLabel, FormControl, Select, Checkbox, OutlinedInput,
    ListItemText
} from "@mui/material";
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
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
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addAlert, delAlert} from "../../../redux/AlertsBox";

const libraries = ["places"];


const PharmacyProfile = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [workingTime24, setWorkingTime24] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [center, setCenter] = useState({lat: 41.295695, lng: 69.239730});
    const [addressLocation, setAddressLocation] = useState("");
    const [addressLocationRu, setAddressLocationRu] = useState("");
    const [address_validate, setAddress_validate] = useState(false);
    const [region, setRegion] = useState("");
    const [region_validate, setRegion_validate] = useState(false);
    const [logoHospital, setLogoHospital] = useState(null);
    const [weekend, setWeekend] = useState([]);
    const [daysList, setDaysList] = useState([]);

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
    const regions = [
        {name: t("Andijan"), latitude: 40.813616, longitude: 72.283463},
        {name: t("Bukhara"), latitude: 39.767070, longitude: 64.455393},
        {name: t("Ferghana"), latitude: 40.372379, longitude: 71.797770},
        {name: t("Jizzakh"), latitude: 40.119300, longitude: 67.880140},
        {name: t("Namangan"), latitude: 41.004297, longitude: 71.642956},
        {name: t("Navoi"), latitude: 40.096634, longitude: 65.352255},
        {name: t("Kashkadarya"), latitude: 38.852124, longitude: 65.784203},
        {name: t("Samarkand"), latitude: 39.649307, longitude: 66.965182},
        {name: t("SyrDarya"), latitude: 40.376986, longitude: 68.713159},
        {name: t("Surkhandarya"), latitude: 37.931559, longitude: 67.564765},
        {name: t("Tashkent"), latitude: 41.295695, longitude: 69.239730},
        {name: t("Khorezm"), latitude: 41.522326, longitude: 60.623731},
        {name: t("Karakalpakstan"), latitude: 43.730521, longitude: 59.064533}
    ];

    const selectAddressIcon = {
        url: "./images/address.png",
        scaledSize: {width: 40, height: 50},
    };

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

    const validate = (values) => {
        const errors = {};

        if (!values.nameUz) {
            errors.nameUz = "Required";
        }

        if (!values.nameRu) {
            errors.nameRu = "Required";
        }

        if (!values.phone1) {
            errors.phone1 = "Required";
        }

        if (!values.phone2) {
            errors.phone2 = "Required";
        }

        if (!values.working_days.length > 0) {
            errors.working_days = "Required";
        }

        if (!workingTime24 && !values.start_time) {
            errors.start_time = "Required";
        }

        if (!workingTime24 && !values.end_time) {
            errors.end_time = "Required";
        }

        return errors;
    };

    const formOne = useFormik({
        initialValues: {
            nameUz: "",
            nameRu: "",
            phone1: "",
            phone2: "",
            start_time: "",
            end_time: "",
            working_days: [],
        },
        validate,
        onSubmit: (values) => {
            setPageNumber(2)
            console.log(values)
        },
    });

    const getInputPhoto = (event) => {
        const {target: {files}} = event;
        const file = files[0];

        function getBase64(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setLogoHospital(reader.result);
            };
            reader.onerror = function () {
                setLogoHospital(null);
            };

        }

        getBase64(file);
    };

    const getInformation = () => {
        axios.get(`${baseUrl}pharmacy-profile/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }
        ).then((response) => {

            formOne.setValues({
                nameUz: response.data.translations["uz"].name,
                nameRu: response.data.translations["ru"].name,
                phone1: response.data.phone1,
                phone2: response.data.phone2,
                start_time: response.data.start_time,
                end_time: response.data.end_time,
                working_days: response.data.working_days,
            });

            let week = response.data.working_days
            axios.get(`${baseUrl}days/`).then((response) => {

                let new_list = response.data.filter(day => {
                    return day.id && week.includes(day.id);
                }).map(day => day.translations[i18next.language].day);

                setWeekend(new_list)
            }).catch((error) => {
            });

            setLogoHospital(`https://api.medos.uz/` + response.data.image)

            setRegion(response.data.region)

            setAddressLocation(response.data.translations[i18next.language].address)

            let location = response.data.location.split(',');

            let locMy = {lat: Number(location[0]), lng: Number(location[1])};
            setCenter(locMy);
            setSelected(locMy)

            setWorkingTime24(response.data.open_24)
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            }
        });
    }

    useEffect(() => {
        getInformation()
        axios.get(`${baseUrl}days/`).then((response) => {
            setDaysList(response.data)
        }).catch((error) => {
        });
    }, []);

    const handleChangeMore = (event) => {
        const {
            target: {value},
        } = event;

        setWeekend(
            typeof value === 'string' ? value.split(',') : value,
        );

        let new_list = daysList.filter(day => {
            return day.translations[i18next.language].day && value.includes(day.translations[i18next.language].day);
        }).map(day => day.id);

        formOne.values.working_days = new_list
    };

    const ClicklLocation = (e) => {
        let latitude = e.latLng.lat();
        let longitude = e.latLng.lng();

        let locMy = {lat: latitude, lng: longitude};

        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;

        axios.get(`${url}`, {
            headers: {
                "Accept-Language": "uz",
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
            setAddress_validate(false)
        });

        axios.get(`${url}`, {
            headers: {
                "Accept-Language": "ru",
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

            setAddressLocationRu(fullAddress);
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

            axios.get(`${url}`, {headers: {"Accept-Language": "uz"},}).then((res) => {
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
                setAddress_validate(false)
            });
            axios.get(`${url}`, {headers: {"Accept-Language": "ru"},}).then((res) => {
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
                setAddressLocationRu(fullAddress);
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

    const sendAllInfo = () => {
        let loc = `${center.lat},${center.lng}`;
        let allInfoHospital = {
            translations: {
                uz: {
                    name: formOne.values.nameUz,
                    address: addressLocation
                },
                ru: {
                    name: formOne.values.nameRu,
                    address: addressLocationRu
                }
            },
            base64_image: logoHospital,
            phone1: formOne.values.phone1,
            phone2: formOne.values.phone2,
            start_time: formOne.values.start_time,
            end_time: formOne.values.end_time,
            open_24: workingTime24,
            location: loc,
            working_days: formOne.values.working_days,
            region: region
        };

        axios.post(`${baseUrl}pharmacy-profile/`, allInfoHospital, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {

            let idAlert = Date.now();
            let alert = {
                id: idAlert,
                text: "Malumotlar yangilandi!",
                img: "./images/green.svg",
                color: "#EDFFFA",
            };
            dispatch(addAlert(alert));
            setTimeout(() => {
                dispatch(delAlert(idAlert));
            }, 5000);

            getInformation()
        }).catch((error) => {
        });

    };

    if (!isLoaded) return <Loader/>;

    return <div className="profile-pharmacies-container">
        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>
        <div className="xbtn">
            <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
        </div>
        <div className="register-page">
            <div className="register-page-one">
                <div className="title">
                    Akkount sozlamalari
                </div>
                <div className="des">
                    Dorixona akkountingizni tahrirlashingiz mumkin
                </div>
                <div className="logo-hospital">
                    <div className="logo-image">
                        {logoHospital ? <img className="logo-clinic" src={logoHospital} alt=""/> :
                            <img className="logo-camera" src="./images/Exclude.png" alt=""/>
                        }

                    </div>

                    <div className="label">
                        Logo qo‘shish
                        <input onChange={getInputPhoto} type="file"/>
                    </div>
                </div>

                <div className="inputs-box">
                    <TextField error={formOne.errors.nameUz === "Required"}
                               value={formOne.values.nameUz}
                               onChange={formOne.handleChange}
                               name="nameUz"
                               sx={{m: 1, minWidth: "100%"}} size="small"
                               id="outlined-basic"
                               label="Shifoxona nomini kiriting (uz) " variant="outlined" className="textField"/>
                </div>

                <div className="inputs-box">
                    <TextField error={formOne.errors.nameRu === "Required"} value={formOne.values.nameRu}
                               onChange={formOne.handleChange}
                               name="nameRu" sx={{m: 1, minWidth: "100%"}} size="small"
                               id="outlined-basic"
                               label="Введите название больницы (ru) " variant="outlined" className="textField"/>
                </div>

                <div className="des-input">
                    Iltimos, shifoxona nomini rus tili va o'zbek tilida kiritng
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
                                error={formOne.errors.working_days === "Required"}
                                name="working_days"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={weekend}
                                onChange={handleChangeMore}
                                input={<OutlinedInput label="Ish kunlarini  belgilang"/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {daysList.map((item, index) => (
                                    <MenuItem key={item.id} value={item.translations[i18next.language].day}>
                                        <Checkbox
                                            checked={weekend.indexOf(item.translations[i18next.language].day) > -1}/>
                                        <ListItemText primary={item.translations[i18next.language].day}/>
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
                                    checked={workingTime24}
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
                        <input
                            className={`working_time ${formOne.errors.start_time === "Required" ? "working_time_required" : ""}`}
                            name="start_time" onChange={formOne.handleChange} value={formOne.values.start_time}
                            type="time"/>
                    </div>
                    <div className="select-sides">
                        <label htmlFor="">Ish vaqti boshlanishi</label>
                        <input
                            className={`working_time ${formOne.errors.end_time === "Required" ? "working_time_required" : ""}`}
                            name="end_time" onChange={formOne.handleChange} value={formOne.values.end_time}
                            type="time"/>
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
                        <TextField
                            error={formOne.errors.phone1 === "Required"}
                            value={formOne.values.phone1}
                            onChange={formOne.handleChange}
                            name="phone1"
                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                            label="Telefon raqam 1" variant="outlined" className="textField"/>
                    </div>
                    <div className="select-sides">
                        <TextField
                            error={formOne.errors.phone2 === "Required"}
                            value={formOne.values.phone2}
                            onChange={formOne.handleChange}
                            name="phone2"
                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                            label="Telefon raqam 2" variant="outlined" className="textField"/>
                    </div>
                </div>
            </div>
            <div className="register-page-two">
                <div className="select-box">
                    <div className="select-sides">
                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                            <InputLabel id="demo-select-large-label">Viloyatni tanlang</InputLabel>
                            <Select
                                error={region_validate}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={region}
                                label="Viloyatni tanlang"
                                onChange={(e) => setRegion(e.target.value)}
                            >

                                {regions.map((item, index) => {
                                    return <MenuItem key={index} onClick={() => {
                                        setRegion_validate(false)
                                        setCenter({lat: item.latitude, lng: item.longitude})
                                    }} value={index + 1}>{item.name}</MenuItem>
                                })}

                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="label-address">Manzil:</div>
                <div className={`address-box ${address_validate ? "validate_location" : ""}`}>
                    {i18next.language === "uz" && addressLocation ? addressLocation : ""}
                    {i18next.language === "ru" && addressLocationRu ? addressLocationRu : ""}
                    {!addressLocation && !addressLocationRu && <p>Manzilni xaritadan belgilang</p>}
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
                            <MarkerF icon={selectAddressIcon} position={selected}/>
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
                    <div onClick={() => navigate("/")} className="prev-btn">
                        <img src="./images/prev-btn.png" alt=""/>
                        Bekor qilish
                    </div>
                    <div onClick={() => {
                        if (addressLocation && region) {
                            sendAllInfo()
                        } else {
                            if (!addressLocation) setAddress_validate(true);
                            if (!region) setRegion_validate(true)
                        }
                    }} className="next-page-btn">
                        O'zgarishlarni saqlash
                        <img src="./images/next-btn.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default PharmacyProfile