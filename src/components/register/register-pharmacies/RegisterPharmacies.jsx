import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useRef, useState} from "react";
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
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {addAlert, delAlert} from "../../../redux/AlertsBox";

const libraries = ["places"];


const RegisterPharmacies = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [workingTime24, setWorkingTime24] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [center, setCenter] = useState(null);
    const [addressLocation, setAddressLocation] = useState("");
    const [addressLocationRu, setAddressLocationRu] = useState("");
    const [address_validate, setAddress_validate] = useState(false);
    const [region, setRegion] = useState("");
    const [region_validate, setRegion_validate] = useState(false);
    const [logoHospital, setLogoHospital] = useState(null);
    const [weekend, setWeekend] = useState([]);
    const [logoValidate, setLogoValidate] = useState(false);
    const ref2 = useRef(null);
    const [daysList, setDaysList] = useState([]);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

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
        } else if (isNaN(Number(values.phone1))) {
            errors.phone1 = "Required";
        }

        if (!values.phone2) {
            errors.phone2 = "Required";
        } else if (isNaN(Number(values.phone2))) {
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
            hospital_type: "",
            phone1: "",
            phone2: "",
            start_time: null,
            end_time: null,
            working_days: [],
        },
        validate,
        onSubmit: (values) => {
            if (logoHospital) {
                axios.post(`${baseUrl}checkuser/`, {phone: values.phone1}).then((response) => {

                }).catch((error) => {
                    if (error.response.status === 302) {
                        let idAlert = Date.now();
                        let alert = {
                            id: idAlert,
                            text: "Ushbu raqam ro'yxatdan o'tgan!",
                            img: "./images/red.svg",
                            color: "#ffefe7",
                        };
                        dispatch(addAlert(alert));
                        setTimeout(() => {
                            dispatch(delAlert(idAlert));
                        }, 5000);
                    } else {
                        setPageNumber(2);
                    }
                });
            } else {
                ref2.current?.scrollIntoView({
                    behavior: "smooth",
                });
                setLogoValidate(true)
            }
        },
    });

    const getInputPhoto = (event) => {
        setLogoValidate(false);
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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            let locMy = {lat: latitude, lng: longitude};
            setCenter(locMy);
        });

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
            setCenter({lat: latitude, lng: longitude});
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
                    placeholder={t("address_input")}
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
        setLoader(true);
        axios.post(`${baseUrl}auth/register/pharmacy/`, allInfoHospital,
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {
            window.location.pathname = "/profile-pharmacy";
            localStorage.setItem("profile", true);
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }).catch((error) => {
            setLoader(false);
        });
    };

    if (!isLoaded) return <Loader/>;
    if (loader) return <Loader/>;
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
                    <div
                        className={`line ${pageNumber === 1 || pageNumber === 2  ? "line-active" : ""}`}></div>
                    <div
                        className={`num ${pageNumber === 1 || pageNumber === 2 ? "num-active" : ""}`}>
                        1
                        <div className={`name ${pageNumber === 1 || pageNumber === 2 ? "active-name" : ""}`}>
                            {t("about_pharma")}
                        </div>
                    </div>

                    <div className={`line ${pageNumber === 2 ? "line-active" : ""}`}></div>
                    <div className={`num ${pageNumber === 2 ? "num-active" : ""}`}>
                        2
                        <div className={`name ${pageNumber === 2 ? "active-name" : ""}`}>
                            {t("location_pharma")}
                        </div>
                    </div>
                    <div className={`line ${pageNumber === 2 ? "line-active" : ""}`}></div>
                </div>
                <div onClick={() => navigate("/register")} className="prev-mobile">
                    <img src="./images/arrow.png" alt=""/>
                </div>
            </div>

            {pageNumber === 1 &&
            <div className="register-page-one">
                <div ref={ref2} className="title">
                    {t("pharma_title")}
                </div>
                <div className="des">
                    {t("pharma_des")}
                </div>
                <div className="logo-hospital">
                    <div className={`logo-image ${logoValidate ? "required-logo" : ""}`}>
                        {logoHospital ? <img className="logo-clinic" src={logoHospital} alt=""/> :
                            <img className="logo-camera" src="./images/Exclude.png" alt=""/>
                        }
                    </div>

                    {!logoHospital && <div className="label">
                        {t("addImage")}
                        <input onChange={getInputPhoto} type="file"/>
                    </div>}

                    {logoHospital && <div onClick={() => setLogoHospital(null)} className="label">
                        {t("delImage")}
                        <img src="./images/cancel.png" alt=""/>
                    </div>}
                </div>

                <div className="inputs-box">
                    <TextField error={formOne.errors.nameUz === "Required"}
                               value={formOne.nameUz}
                               onChange={formOne.handleChange}
                               name="nameUz"
                               sx={{m: 1, minWidth: "100%"}} size="small"
                               id="outlined-basic"
                               label="Dorixona nomini kiriting (uz) " variant="outlined" className="textField"/>
                </div>

                <div className="inputs-box">
                    <TextField error={formOne.errors.nameRu === "Required"} value={formOne.nameRu}
                               onChange={formOne.handleChange}
                               name="nameRu" sx={{m: 1, minWidth: "100%"}} size="small"
                               id="outlined-basic"
                               label="Введите название аптеки (ru) " variant="outlined" className="textField"/>
                </div>

                <div className="des-input">
                    {t("des_pharma")}
                </div>

                <div className="label-text">
                    <div className="sides">
                        <div className="label-bold">{t("working-time")}</div>
                    </div>
                    <div className="sides"></div>
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <FormControl sx={{m: 1, width: "100%"}} className="selectMui" size="small">
                            <InputLabel id="demo-multiple-checkbox-label">{t("working_days")}</InputLabel>
                            <Select
                                error={formOne.errors.working_days === "Required"}
                                name="working_days"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={weekend}
                                onChange={handleChangeMore}
                                input={<OutlinedInput label={t("working_days")}/>}
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
                                    id="c1-13"
                                    type="checkbox"
                                />
                            </div>
                            <label htmlFor="c1-13">
                                {t("open24_register")}
                            </label>
                        </div>
                    </div>
                </div>

                {workingTime24 ? "" : <div className="select-box-working-time">
                    <div className="select-sides">
                        <label htmlFor="">{t("start_time")}</label>
                        <input
                            className={`working_time ${formOne.errors.start_time === "Required" ? "working_time_required" : ""}`}
                            name="start_time" onChange={formOne.handleChange} value={formOne.start_time}
                            type="time"/>
                    </div>
                    <div className="select-sides">
                        <label htmlFor="">{t("end_time")}</label>
                        <input
                            className={`working_time ${formOne.errors.end_time === "Required" ? "working_time_required" : ""}`}
                            name="end_time" onChange={formOne.handleChange} value={formOne.end_time} type="time"/>
                    </div>
                </div>}

                <div className="label-text">
                    <div className="sides">
                        <div className="label-bold">{t("contact_pharma")}</div>
                    </div>
                    <div className="sides"></div>
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <TextField
                            error={formOne.errors.phone1 === "Required"}
                            value={formOne.phone1}
                            onChange={formOne.handleChange}
                            name="phone1"
                            type="number"
                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                            label={t("phone1")} variant="outlined" className="textField"/>
                    </div>
                    <div className="select-sides">
                        <TextField
                            error={formOne.errors.phone2 === "Required"}
                            value={formOne.phone2}
                            onChange={formOne.handleChange}
                            name="phone2"
                            type="number"
                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                            label={t("phone2")} variant="outlined" className="textField"/>
                    </div>
                </div>

                <div className="btn-box">
                    <div onClick={() => formOne.handleSubmit()} className="next-page-btn">
                        {t("next_btn")}
                        <img src="./images/next-btn.png" alt=""/>
                    </div>
                </div>
            </div>}


            {pageNumber === 2 &&
            <div className="register-page-two">
                <div className="title">
                    {t("pharma_loc")}
                </div>
                <div className="des">
                    {t("pharma_loc_des")}
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                            <InputLabel id="demo-select-large-label">{t("region_register")}</InputLabel>
                            <Select
                                error={region_validate}
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={region}
                                label={t("region_register")}
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
                <div className="label-address">{t("location")}</div>
                <div className={`address-box ${address_validate ? "validate_location" : ""}`}>
                    {i18next.language === "uz" && addressLocation ? addressLocation : ""}
                    {i18next.language === "ru" && addressLocationRu ? addressLocationRu : ""}
                    {!addressLocation && !addressLocationRu && <p>{t("map_des")}</p>}
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
                        {t("prev_btn")}
                    </div>
                    <div onClick={sendAllInfo} className="next-page-btn">
                        {t("success_btn")}
                        <img src="./images/next-btn.png" alt=""/>
                    </div>
                </div>
            </div>}
        </div>
    </div>
};

export default RegisterPharmacies