import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {useFormik} from "formik";
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
import {useSelector, useDispatch} from "react-redux";
import {delAlert, addAlert} from "../../../redux/AlertsBox";


const libraries = ["places"];


const ProfileHospital = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [hospital, setHospital] = useState('');
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [hospitalType, setHospitalType] = useState('');
    const [invalidService, setInvalidService] = useState(true);
    const [workingTime24, setWorkingTime24] = useState(false);
    const [selected, setSelected] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [center, setCenter] = useState({lat: 41.295695, lng: 69.239730});
    const [socialMedias, setSocialMedias] = useState([{key: "web", url: ""}]);
    const [service, setService] = useState([
        {service: "", options: [], sub_services_list: [{sub_service: "", price: ""}]}
    ]);
    const [addressLocation, setAddressLocation] = useState("");
    const [addressLocationRu, setAddressLocationRu] = useState("");
    const [address_validate, setAddress_validate] = useState(false);
    const [weekend, setWeekend] = useState([]);
    const [region, setRegion] = useState("");
    const [region_validate, setRegion_validate] = useState(false);
    const [logoHospital, setLogoHospital] = useState(null);
    const [daysList, setDaysList] = useState([]);
    const [hospitalList, setHospitalList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [tg, setTg] = useState(false)
    const [ins, setIns] = useState(false)
    const [face, setFace] = useState(false)
    const [you, setYou] = useState(false)
    const [tik, setTik] = useState(false)

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

    const options = useMemo(
        () => ({
            disableDefaultUI: false,
            clickableIcons: false,
        }),
        []
    );

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
        language: i18next.language,
    });

    const validate = (values) => {
        const errors = {};

        if (!values.hospital_type) {
            errors.hospital_type = "Required";
        }

        if (!values.type) {
            errors.type = "Required";
        }

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
            about_video: "",
            type: "",
            hospital_type: "",
            phone1: "",
            phone2: "",
            emergency_number: "",
            start_time: "",
            end_time: "",
            working_days: [],
        },
        validate,
        onSubmit: (values) => {
            setPageNumber(2);
        },
    });

    const getInformation = () => {
        axios.get(`${baseUrl}hospital-profile/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }
        ).then((response) => {

            formOne.setValues({
                nameUz: response.data.translations["uz"].name,
                nameRu: response.data.translations["ru"].name,
                type: response.data.type,
                about_video: response.data.about_video,
                hospital_type: response.data.hospital_type,
                phone1: response.data.phone1,
                phone2: response.data.phone2,
                emergency_number: response.data.emergency_number,
                start_time: response.data.start_time,
                end_time: response.data.end_time,
                working_days: response.data.working_days,
            });

            localStorage.setItem("nameUz", response.data.translations["uz"].name)
            localStorage.setItem("nameRu", response.data.translations["ru"].name)

            setSocialMedias(response.data.hospital_socials)
            response.data.hospital_socials.map((item, index) => {
                if (item.key === "telegram") setTg(true)
                if (item.key === "instagram") setIns(true)
                if (item.key === "facebook") setFace(true)
                if (item.key === "youtube") setYou(true)
                if (item.key === "tiktok") setTik(true)
            });

            let week = response.data.working_days
            axios.get(`${baseUrl}days/`).then((response) => {

                let new_list = response.data.filter(day => {
                    return day.id && week.includes(day.id);
                }).map(day => day.translations[i18next.language].day);

                setWeekend(new_list)
            }).catch((error) => {
            });

            setHospital(response.data.type)

            setInvalidService(response.data.gender);

            setLogoHospital(`https://api.medos.uz/` + response.data.image)

            setRegion(response.data.region)

            setHospitalType(response.data.hospital_type)

            setAddressLocation(response.data.translations[i18next.language].address)

            let location = response.data.location.split(',');

            let locMy = {lat: Number(location[0]), lng: Number(location[1])};
            setCenter(locMy);
            setSelected(locMy)

            setWorkingTime24(response.data.open_24)

            setService(response.data.hospital_services)


        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
            }
        });
    };

    useEffect(() => {
        getInformation()
        axios.get(`${baseUrl}days/`).then((response) => {
            setDaysList(response.data)
        }).catch((error) => {
        });

        axios.get(`${baseUrl}hospital-type/`).then((response) => {
            setHospitalList(response.data)
        }).catch((error) => {
        });

        axios.get(`${baseUrl}speciality/`).then((response) => {
            setServiceList(response.data)
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

    const addSocialMedia = (key) => {
        if (key === "telegram") {
            setTg(true)
        }
        if (key === "instagram") {
            setIns(true)
        }
        if (key === "facebook") {
            setFace(true)
        }
        if (key === "tiktok") {
            setTik(true)
        }
        if (key === "youtube") {
            setYou(true)
        }
        let newMedia = {key, url: ""};
        let newArr = socialMedias.concat(newMedia);
        setSocialMedias(newArr)
    };

    const delSocialMedia = (ind, key) => {
        if (key === "telegram") {
            setTg(false)
        }
        if (key === "instagram") {
            setIns(false)
        }
        if (key === "facebook") {
            setFace(false)
        }
        if (key === "tiktok") {
            setTik(false)
        }
        if (key === "youtube") {
            setYou(false)
        }

        let newArr = socialMedias.filter((item, index) => index !== ind);
        setSocialMedias(newArr)
    };

    const addService = () => {
        let newService = {service: "", options: [], sub_services_list: [{sub_service: "", price: ""}]}
        let newArr = service.concat(newService);
        setService(newArr)
    };
    const delService = (ind) => {
        let newArr = service.filter((item, index) => index !== ind);
        setService(newArr)
    };
    const sendAllInfo = () => {
        let loc = `${center.lat},${center.lng}`
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
            disabled: invalidService,
            type: formOne.values.type,
            hospital_type: formOne.values.hospital_type,
            phone1: formOne.values.phone1,
            phone2: formOne.values.phone2,
            emergency_number: formOne.values.emergency_number,
            start_time: formOne.values.start_time,
            end_time: formOne.values.end_time,
            open_24: workingTime24,
            location: loc,
            working_days: formOne.values.working_days,
            services: service,
            socials: socialMedias,
            region: region,
            about_video: formOne.values.about_video,
        }
        axios.post(`${baseUrl}hospital-profile/`, allInfoHospital, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            let idAlert = Date.now();
            let alert = {
                id: idAlert,
                text: t("alert_profile"),
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

    return <div className="profile-hospital-container">
        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>
        <div className="xbtn">
            <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
        </div>
        <div className="register-page">

            <div className="title">
                {t("profile_title")}
            </div>
            <div className="des">
                {t("profile_des")}
            </div>
            <div className="header">
                <div onClick={() => setPageNumber(1)} className={`item-menu ${pageNumber === 1 ? "active" : ""}`}>
                    {t("all_info")}
                </div>
                <div onClick={() => setPageNumber(2)}
                     className={`item-menu ${pageNumber === 2 ? "active" : ""}`}>
                    {t("nav4")}
                </div>
            </div>

            {pageNumber === 1 &&
                <>
                    <div className="register-page-one">
                        <div className="logo-hospital">
                            <div className="logo-image">
                                {logoHospital ? <img className="logo-clinic" src={logoHospital} alt=""/> :
                                    <img className="logo-camera" src="./images/Exclude.png" alt=""/>
                                }
                            </div>
                            <div className="label">
                                {t("change_image")}
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
                                       label="Shifoxona nomini kiriting (uz) " variant="outlined"
                                       className="textField"/>
                        </div>

                        <div className="inputs-box">
                            <TextField error={formOne.errors.nameRu === "Required"} value={formOne.values.nameRu}
                                       onChange={formOne.handleChange}
                                       name="nameRu" sx={{m: 1, minWidth: "100%"}} size="small"
                                       id="outlined-basic"
                                       label="Введите название больницы (ru) " variant="outlined"
                                       className="textField"/>
                        </div>

                        <div className="des-input">
                            {t("name_des")}
                        </div>

                        <div className="select-box">
                            <div className="select-sides">
                                <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                             className="selectMui">
                                    <InputLabel id="demo-select-large-label">{t("clinic")}</InputLabel>
                                    <Select
                                        error={formOne.errors.type === "Required"}
                                        name="type"
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={hospital}
                                        label={t("clinic")}
                                        onChange={(e) => {
                                            formOne.handleChange(e);
                                            setHospital(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={1}>
                                            {t("hospital_type1")}
                                        </MenuItem>
                                        <MenuItem value={2}>
                                            {t("hospital_type2")}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="select-sides">
                            </div>
                        </div>

                        <div className="label-text">
                            <div className="sides"></div>
                            <div className="sides">{t("disable")}</div>
                        </div>

                        <div className="select-box">
                            <div className="select-sides">
                                <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                             className="selectMui">
                                    <InputLabel id="demo-select-large-label">{t("hospital_type")}</InputLabel>
                                    <Select
                                        error={formOne.errors.hospital_type === "Required"}
                                        name="hospital_type"
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={hospitalType}
                                        label={t("hospital_type")}
                                        onChange={(e) => {
                                            formOne.handleChange(e);
                                            setHospitalType(e.target.value)
                                        }}
                                    >
                                        {hospitalList.map((item) => {
                                            return <MenuItem key={item.id} value={item.id}>
                                                {item.translations[i18next.language].name}
                                            </MenuItem>
                                        })}

                                    </Select>
                                </FormControl>
                            </div>

                            <div className="select-sides">
                                <div className="on-of">
                                    <div onClick={() => setInvalidService(true)}
                                         className={`of ${invalidService ? "on" : ""}`}>
                                        Mavjud
                                    </div>
                                    <div onClick={() => setInvalidService(false)}
                                         className={`of ${!invalidService ? "on" : ""}`}>
                                        Mavjud emas
                                    </div>
                                </div>
                            </div>
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
                                        {daysList.map((item) => (
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
                                    name="start_time" onChange={formOne.handleChange} value={formOne.values.start_time}
                                    type="time"/>
                            </div>
                            <div className="select-sides">
                                <label htmlFor="">{t("end_time")}</label>
                                <input
                                    className={`working_time ${formOne.errors.end_time === "Required" ? "working_time_required" : ""}`}
                                    name="end_time" onChange={formOne.handleChange} value={formOne.values.end_time}
                                    type="time"/>
                            </div>
                        </div>}

                        <div className="label-text">
                            <div className="sides">
                                <div className="label-bold">{t("contact_des")}</div>
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
                                    label={t("phone1")} variant="outlined" className="textField"/>
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

                        <div className="select-box">
                            <div className="select-sides">
                                <TextField
                                    value={formOne.values.emergency_number}
                                    onChange={formOne.handleChange}
                                    name="emergency_number"
                                    sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                                    label={t("phone3")} variant="outlined" className="textField"/>
                            </div>
                            <div className="select-sides">
                            </div>
                        </div>

                        <div className="des-input">
                            {t("phone3_des")}
                        </div>

                        <div className="label-text">
                            <div className="sides">
                                {t("social_media")}
                            </div>
                            <div className="sides"></div>
                        </div>

                        <div className="inputs-box-link">
                            {socialMedias.map((item, index) => {
                                return <div key={index} className="inputs-social-media">

                                    {item.key === "telegram" && <img src="./images/social-media/telegram.png" alt=""/>}
                                    {item.key === "web" && <img src="./images/social-media/web.png" alt=""/>}
                                    {item.key === "instagram" && <img src="./images/social-media/instagram.png" alt=""/>}
                                    {item.key === "facebook" && <img src="./images/social-media/facebook.png" alt=""/>}
                                    {item.key === "youtube" && <img src="./images/social-media/youtube.png" alt=""/>}
                                    {item.key === "tiktok" && <img src="./images/social-media/tiktok.png" alt=""/>}

                                    <TextField onChange={(e) => {
                                        item.url = e.target.value
                                        let newSocial = [...socialMedias]
                                        setSocialMedias(newSocial)
                                    }} sx={{m: 1, minWidth: "43%"}}
                                               value={item.url}
                                               size="small"
                                               id="outlined-basic"
                                               label="https://" variant="outlined" className="textField"/>

                                    {socialMedias.length > 1 && index !== 0 &&
                                        <div onClick={() => delSocialMedia(index, item.key)} className="del-icon"><img
                                            src="./images/del-icon.png" alt=""/></div>}
                                </div>
                            })}

                            <div className="add-social-media">
                                {!tg && <div onClick={() => addSocialMedia("telegram")} className="social-mdeia-icon">
                                    <div className="sloy">
                                        <img src="./images/add.png" alt=""/>
                                    </div>
                                    <img src="./images/social-media/telegram.png" alt=""/>
                                </div>}

                                {!ins && <div onClick={() => addSocialMedia("instagram")} className="social-mdeia-icon">
                                    <div className="sloy">
                                        <img src="./images/add.png" alt=""/>
                                    </div>
                                    <img src="./images/social-media/instagram.png" alt=""/>
                                </div>}

                                {!face && <div onClick={() => addSocialMedia("facebook")} className="social-mdeia-icon">
                                    <div className="sloy">
                                        <img src="./images/add.png" alt=""/>
                                    </div>
                                    <img src="./images/social-media/facebook.png" alt=""/>
                                </div>}

                                {!you && <div onClick={() => addSocialMedia("youtube")} className="social-mdeia-icon">
                                    <div className="sloy">
                                        <img src="./images/add.png" alt=""/>
                                    </div>
                                    <img src="./images/social-media/youtube.png" alt=""/>
                                </div>}

                                {!tik && <div onClick={() => addSocialMedia("tiktok")} className="social-mdeia-icon">
                                    <div className="sloy">
                                        <img src="./images/add.png" alt=""/>
                                    </div>
                                    <img src="./images/social-media/tiktok.png" alt=""/>
                                </div>}
                            </div>

                            <div className="des">
                                {t("social_des")}
                            </div>
                        </div>

                        <br/>
                        <div className="inputs-box-link">
                            <div className="sides">
                                {t("media_clinic")}
                            </div>
                            <div className="sides"></div>
                        </div>

                        <div className="select-box">
                            <div className="select-sides">
                                <TextField value={formOne.values.about_video}
                                           onChange={formOne.handleChange}
                                           name="about_video" sx={{m: 1, minWidth: "100%"}} size="small"
                                           id="outlined-basic"
                                           label="https:// " variant="outlined"
                                           className="textField"/>
                            </div>
                        </div>
                    </div>

                    <div className="register-page-two">
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
                    </div>
                </>}

            {pageNumber === 2 &&
                <div className="register-page-three">
                    {service.map((item, index) => {
                        return <div key={index} className="service">
                            <div className="select-box">
                                <div className="select-sides">
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                                        <InputLabel id="demo-select-large-label">{t("service_type")}</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={item.service}
                                            label={t("service_type")}
                                            onChange={(e) => {
                                                item.service = e.target.value;
                                                item.options = serviceList.filter((item) => item.id === e.target.value)[0].options;
                                                let change = [...service];
                                                setService(change);
                                            }}
                                        >
                                            {serviceList.map((item, index) => {
                                                return <MenuItem key={item.id} value={item.id}>
                                                    {item.translations[i18next.language].name}
                                                </MenuItem>
                                            })}

                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="select-sides">
                                    {service.length > 1 && index !== 0 &&
                                        <img onClick={() => delService(index)} src="./images/del-icon.png" alt=""/>}
                                </div>
                            </div>

                            {item.sub_services_list.map((itemService, indexService) => {
                                return <div key={indexService} className="select-box">
                                    <div className="select-sides">
                                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                                            <InputLabel id="demo-select-large-label">{t("service_name")}</InputLabel>
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={itemService.sub_service}
                                                label={t("service_name")}
                                                onChange={(e) => {
                                                    let change = [...service];
                                                    setService(change);
                                                    itemService.sub_service = e.target.value
                                                }}
                                            >
                                                {item.options.map((item) => {
                                                    return <MenuItem key={item.id} value={item.id}>
                                                        {item.translations[i18next.language].name}
                                                    </MenuItem>
                                                })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="select-sides">
                                        <TextField onChange={(e) => {
                                            itemService.price = e.target.value;
                                            let change = [...service];
                                            setService(change);
                                        }}
                                                   sx={{m: 1, minWidth: "80%"}}
                                                   size="small" id="outlined-basic"
                                                   value={itemService.price}
                                                   label={t("service_price")} variant="outlined" className="textField"/>

                                        {item.sub_services_list.length > 1 && indexService !== 0 &&
                                            <img onClick={() => {
                                                item.sub_services_list = item.sub_services_list.filter((item, index) => index !== indexService);
                                                let change = [...service];
                                                setService(change);
                                            }} src="./images/del-icon.png" alt=""/>}
                                    </div>
                                </div>
                            })}

                            <div onClick={() => {
                                item.sub_services_list = item.sub_services_list.concat({sub_service: "", price: ""});
                                let change = [...service];
                                setService(change);
                            }} className="add-social-media">
                                {t("add_service")}
                            </div>
                            <div className="des-btn">
                                {t("add_service_des")}
                            </div>
                        </div>
                    })}
                    <div onClick={addService} className="add-social-media">
                        {t("create_service")}
                    </div>
                    <div className="des-btn">
                        {t("create_service_des")}
                    </div>
                </div>}

            <div className="btn-box">
                <div onClick={() => navigate("/")} className="prev-btn">
                    {t("cancel")}
                </div>

                <div onClick={sendAllInfo} className="next-page-btn">
                    {t("save_edit")}
                </div>
            </div>

        </div>
    </div>
};

export default ProfileHospital