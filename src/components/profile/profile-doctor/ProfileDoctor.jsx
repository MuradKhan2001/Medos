import "./style.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    Select,
    Checkbox,
    OutlinedInput,
    ListItemText,
    Autocomplete
} from "@mui/material";
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {GOOGLE_MAPS_API_KEY} from "../googleMapsApi";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption} from "@reach/combobox";
import "@reach/combobox/styles.css";
import Loader from "../../loader/Loader";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import {useFormik} from "formik";
import Textarea from '@mui/joy/Textarea';
import {useDispatch, useSelector} from "react-redux";
import {addAlert, delAlert} from "../../../redux/AlertsBox";

const libraries = ["places"];


const ProfileDoctor = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const cyrillicToTranslit = new CyrillicToTranslit();
    const [hospitalType, setHospitalType] = useState('');
    const [invalidService, setInvalidService] = useState(true);
    const [selected, setSelected] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [center, setCenter] = useState({lat: 41.295695, lng: 69.239730});
    const [socialMedias, setSocialMedias] = useState([{key: "web", url: ""}]);
    const [addressLocation, setAddressLocation] = useState("");
    const [addressLocationRu, setAddressLocationRu] = useState("");
    const [address_validate, setAddress_validate] = useState(false);
    const [weekend, setWeekend] = useState([]);
    const [subSpecialty, setSubSpecialty] = useState([]);
    const [daysList, setDaysList] = useState([])
    const [region, setRegion] = useState("");
    const [region_validate, setRegion_validate] = useState(false);
    const [logoHospital, setLogoHospital] = useState(null);
    const [specialty, setSpecialty] = useState("");
    const [specialtyList, setSpecialtyList] = useState([]);
    const [subSpecialtyList, setSubSpecialtyList] = useState([]);
    const [hospitalList, setHospitalList] = useState([]);

    const [tg, setTg] = useState(false);
    const [ins, setIns] = useState(false);
    const [face, setFace] = useState(false);
    const [you, setYou] = useState(false);
    const [tik, setTik] = useState(false);
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

    const validate = (values) => {
        const errors = {};

        if (!values.first_name) {
            errors.first_name = "Required";
        }

        if (!values.last_name) {
            errors.last_name = "Required";
        }

        if (!values.middle_name) {
            errors.middle_name = "Required";
        }

        if (!values.bio_uz && pageNumber === 3) {
            errors.bio_uz = "Required";
        }

        if (!values.bio_ru && pageNumber === 3) {
            errors.bio_ru = "Required";
        }

        if (!values.start_time) {
            errors.start_time = "Required";
        }

        if (!values.end_time) {
            errors.end_time = "Required";
        }

        if (!values.specialty) {
            errors.specialty = "Required";
        }

        if (!values.experience && pageNumber === 3) {
            errors.experience = "Required";
        }

        if (!values.working_days.length > 0) {
            errors.working_days = "Required";
        }

        return errors;
    };

    const formOne = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            middle_name: "",
            bio_uz: "",
            bio_ru: "",
            phone1: "",
            start_time: "",
            end_time: "",
            working_days: [],
            consultation_fee: "",
            second_consultation_fee: "",
            specialty: "",
            hospital: "",
            sub_speciality: [],
            experience: ""
        },
        validate,
        onSubmit: (values) => {
            sendAllInfo()
        },
    });

    const getInformation = () => {
        axios.get(`${baseUrl}doctor-profile/`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }
        ).then((response) => {

            formOne.setValues({
                first_name: response.data.translations[i18next.language].first_name,
                last_name: response.data.translations[i18next.language].last_name,
                middle_name: response.data.translations[i18next.language].middle_name,
                bio_uz: response.data.translations["uz"].bio,
                bio_ru: response.data.translations["ru"].bio,
                phone1: response.data.phone,
                start_time: response.data.start_time,
                end_time: response.data.end_time,
                working_days: response.data.working_days,
                consultation_fee: response.data.consultation_fee,
                second_consultation_fee: response.data.second_consultation_fee,
                specialty: response.data.specialty,
                hospital: response.data.hospital.id,
                sub_speciality: response.data.sub_speciality,
                experience: response.data.experience
            });
            localStorage.setItem("nameUz", response.data.translations["uz"].first_name + " "
                + response.data.translations["uz"].last_name)

            localStorage.setItem("nameRu", response.data.translations["ru"].first_name + " "
                + response.data.translations["ru"].last_name)

            setSocialMedias(response.data.doctor_socials)
            response.data.doctor_socials.map((item, index) => {
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

            let newSubSpecialty = response.data.sub_speciality;
            axios.get(`${baseUrl}speciality/${response.data.specialty}/`).then((response) => {
                setSubSpecialtyList(response.data)
                let new_list = response.data.filter(day => {
                    return day && newSubSpecialty.includes(day.id);
                }).map(day => day.translations[i18next.language].name);

                setSubSpecialty(new_list)
            });

            setSpecialty(response.data.specialty)

            setInvalidService(response.data.gender);

            setLogoHospital(`https://api.medos.uz/` + response.data.image)

            setRegion(response.data.region)

            setHospitalType([response.data.hospital.id, response.data.hospital.translations[i18next.language].name]);

            setAddressLocation(response.data.translations[i18next.language].address)

            let location = response.data.location.split(',');

            let locMy = {lat: Number(location[0]), lng: Number(location[1])};
            setCenter(locMy);
            setSelected(locMy)

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
        })

        axios.get(`${baseUrl}hospital-short/`).then((response) => {
            setHospitalList(response.data)
        })

        axios.get(`${baseUrl}speciality/`).then((response) => {
            setSpecialtyList(response.data)
        })
    }, []);

    const getSubSpecialty = (id) => {
        axios.get(`${baseUrl}speciality/${id}/`).then((response) => {
            setSubSpecialtyList(response.data)
        }).catch((error) => {
        });
    };

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

    const handleChangeMoreSpeciality = (event) => {
        const {
            target: {value},
        } = event;

        setSubSpecialty(
            typeof value === 'string' ? value.split(',') : value,
        );

        let new_list = subSpecialtyList.filter(day => {
            return day.translations[i18next.language].name && value.includes(day.translations[i18next.language].name);
        }).map(day => day.id);

        formOne.values.sub_speciality = new_list
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

    const getHospital = (e) => {
        setRegion(e.target.value)
        axios.get(`${baseUrl}hospital-short/?region=${e.target.value}`).then((response) => {
            setHospitalList(response.data)
        })
    };

    const sendAllInfo = () => {
        let loc = `${center.lat},${center.lng}`;
        let allInfoHospital = {
            translations: {
                uz: {
                    first_name: cyrillicToTranslit.transform(formOne.values.first_name),
                    last_name: cyrillicToTranslit.transform(formOne.values.last_name),
                    middle_name: cyrillicToTranslit.transform(formOne.values.middle_name),
                    bio: formOne.values.bio_uz,
                    address: addressLocation
                },
                ru: {
                    first_name: cyrillicToTranslit.reverse(formOne.values.first_name),
                    last_name: cyrillicToTranslit.reverse(formOne.values.last_name),
                    middle_name: cyrillicToTranslit.reverse(formOne.values.middle_name),
                    bio: formOne.values.bio_ru,
                    address: addressLocationRu
                }
            },
            base64_image: logoHospital,
            gender: invalidService,
            phone: formOne.values.phone1,
            start_time: formOne.values.start_time,
            end_time: formOne.values.end_time,
            location: loc,
            working_days: formOne.values.working_days,
            socials: socialMedias,
            region: region,
            consultation_fee: formOne.values.consultation_fee,
            second_consultation_fee: formOne.values.second_consultation_fee,
            specialty: formOne.values.specialty,
            hospital: formOne.values.hospital,
            sub_speciality: formOne.values.sub_speciality,
            experience: formOne.values.experience
        };
        axios.post(`${baseUrl}doctor-profile/`, allInfoHospital, {
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

            localStorage.setItem("nameUz", `${response.data.translations["uz"].first_name} ${response.data.translations["uz"].last_name}`);
            localStorage.setItem("nameRu", `${response.data.translations["ru"].first_name} ${response.data.translations["ru"].last_name}`);
        }).catch((error) => {
            console.log(error)
        });
    };

    if (!isLoaded) return <Loader/>;

    return <div className="profile-doctor-container">
        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>
        <div className="xbtn">
            <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
        </div>
        <div className="register-page">
            <div className="register-page-one">
                <div className="title">
                    {t("profile_title")}
                </div>
                <div className="des">
                    {t("profile_des")}
                </div>
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
                <div className="select-box">
                    <div className="select-sides">
                        <TextField error={formOne.errors.last_name === "Required"}
                                   value={formOne.values.last_name}
                                   onChange={formOne.handleChange}
                                   name="last_name"
                                   sx={{m: 1, minWidth: "100%"}} size="small"
                                   id="outlined-basic"
                                   label={t("lastName")} variant="outlined" className="textField"/>

                    </div>
                    <div className="select-sides">
                        <TextField error={formOne.errors.first_name === "Required"}
                                   value={formOne.values.first_name}
                                   onChange={formOne.handleChange}
                                   name="first_name"
                                   sx={{m: 1, minWidth: "100%"}} size="small"
                                   id="outlined-basic"
                                   label={t("firstName")} variant="outlined" className="textField"/>
                    </div>
                </div>
                <div className="select-box">
                    <div className="select-sides">
                        <TextField error={formOne.errors.middle_name === "Required"}
                                   value={formOne.values.middle_name}
                                   onChange={formOne.handleChange}
                                   name="middle_name"
                                   sx={{m: 1, minWidth: "100%"}} size="small"
                                   id="outlined-basic"
                                   label={t("surname")} variant="outlined" className="textField"/>
                    </div>
                    <div className="select-sides">

                    </div>
                </div>
                <div className="label-text">
                    <div className="sides">{t("gender2")}</div>
                    <div className="sides">
                    </div>
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <div className="on-of">
                            <div onClick={() => setInvalidService(true)} className={`of ${invalidService ? "on" : ""}`}>
                                {t("men")}
                            </div>
                            <div onClick={() => setInvalidService(false)}
                                 className={`of ${!invalidService ? "on" : ""}`}>
                                {t("women")}
                            </div>
                        </div>
                    </div>
                    <div className="select-sides">
                        <TextField
                            error={formOne.errors.phone1 === "Required"}
                            value={formOne.values.phone1}
                            onChange={formOne.handleChange}
                            name="phone1"
                            sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                            label={t("phone")} variant="outlined" className="textField"/>
                    </div>
                </div>

                <div className="label-text">
                    <div className="sides">
                        <div className="label-bold">{t("reception")}</div>
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
                    </div>
                </div>

                <div className="select-box-working-time">
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
                </div>

                <div className="label-text">
                    <div className="sides">
                        <div className="label-bold">{t("contact_label")}</div>
                    </div>
                    <div className="sides"></div>
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
                    <div className="des">{t("social_des2")}</div>
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
            </div>
            <div className="register-page-three">
                <div className="select-box">
                    <div className="select-sides">
                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                            <InputLabel id="demo-select-large-label">{t("main_speciality")}</InputLabel>
                            <Select
                                label={t("main_speciality")}
                                error={formOne.errors.specialty === "Required"}
                                name="specialty"
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={specialty}
                                onChange={(e) => {
                                    formOne.handleChange(e)
                                    setSpecialty(e.target.value)
                                    setSubSpecialty([])
                                    getSubSpecialty(e.target.value);
                                }}
                            >
                                {specialtyList.map((item) => {
                                    return <MenuItem key={item.id}
                                                     value={item.id}>{item.translations[i18next.language].name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="select-sides">
                        <FormControl sx={{m: 1, width: "100%"}} className="selectMui" size="small">
                            <InputLabel id="demo-multiple-checkbox-label">{t("speciality")}</InputLabel>
                            <Select
                                name="sub_speciality"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={subSpecialty}
                                onChange={handleChangeMoreSpeciality}
                                input={<OutlinedInput label={t("speciality")}/>}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {subSpecialtyList.map((item, index) => (
                                    <MenuItem key={item.id} value={item.translations[i18next.language].name}>
                                        <Checkbox
                                            checked={subSpecialty.indexOf(item.translations[i18next.language].name) > -1}/>
                                        <ListItemText primary={item.translations[i18next.language].name}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <TextField error={formOne.errors.experience === "Required"}
                                   value={formOne.values.experience}
                                   onChange={formOne.handleChange}
                                   name="experience"
                                   sx={{m: 1, minWidth: "100%"}} size="small"
                                   id="outlined-basic"
                                   label={t("experience_register")} variant="outlined" className="textField"/>

                    </div>
                    <div className="select-sides">
                    </div>
                </div>

                <div className="select-box">
                    <div className="select-sides">
                        <TextField
                            value={formOne.values.consultation_fee}
                            onChange={formOne.handleChange}
                            name="consultation_fee"
                            sx={{m: 1, minWidth: "80%"}} size="small"
                            id="outlined-basic"
                            label={t("consultation_fee")} variant="outlined" className="textField"/>

                        <div className="price">UZS</div>
                    </div>
                    <div className="select-sides">
                        <TextField
                            value={formOne.values.second_consultation_fee}
                            onChange={formOne.handleChange}
                            name="second_consultation_fee"
                            sx={{m: 1, minWidth: "80%"}} size="small"
                            id="outlined-basic"
                            label={t("second_consultation_fee")} variant="outlined" className="textField"/>

                        <div className="price">UZS</div>
                    </div>
                </div>
                <div className="bottom-validate">
                    <div className="select-sides">
                    </div>
                    <div className="select-sides">
                        <div className="des-no-validate">
                            {t("des")}
                        </div>
                    </div>
                </div>

                <div className="input-for-more-info">
                    <div className="des-info">
                        {t("des_bio")}
                    </div>
                    <label htmlFor="more-info">O‘zingiz haqingizda batafsilroq yozing (uz)</label>
                    <Textarea
                        error={formOne.errors.bio_uz === "Required"}
                        value={formOne.values.bio_uz}
                        onChange={formOne.handleChange}
                        name="bio_uz"
                        className="textarea_bio"
                        placeholder="Yutuqlaringiz, ta’lim olgan joylaringiz haqida va h.k. "
                        sx={{m: 1, minWidth: "100%"}} size="small"
                    />

                    <label htmlFor="more-info">Напишите больше о себе (ru)</label>
                    <Textarea
                        error={formOne.errors.bio_ru === "Required"}
                        value={formOne.values.bio_ru}
                        onChange={formOne.handleChange}
                        name="bio_ru"
                        className="textarea_bio"
                        placeholder="О ваших достижениях, местах обучения и т.д."
                        sx={{m: 1, minWidth: "100%"}} size="small"
                    />
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
                                onChange={getHospital}
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

                    <div className="select-sides">
                        <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectMui">
                            <Autocomplete
                                disablePortal
                                error={formOne.errors.hospital === "Required"}
                                name="hospital"
                                labelid="demo-select-small-label"
                                size="small"
                                value={hospitalType}
                                onChange={(e, value) => {
                                    formOne.values.hospital = value ? value[0] : null;
                                    setHospitalType(value)
                                }}
                                id="combo-box-demo"
                                options={hospitalList.map((item) => [item.id, item.translations[i18next.language].name])}
                                getOptionLabel={(option) => option ? option[1] : ""}
                                isOptionEqualToValue={(option, value) => true}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        {option[1]}
                                    </li>
                                )}

                                renderInput={(params) => <TextField {...params} label={t("work_place2")}/>}
                            />
                        </FormControl>
                    </div>
                </div>

                {
                    !formOne.values.hospital && <>
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
                    </>
                }
                <div className="btn-box">
                    <div onClick={() => setPageNumber(2)} className="prev-btn">
                        {t("cancel")}
                    </div>

                    <div onClick={() => formOne.handleSubmit()} className="next-page-btn">
                        {t("save_edit")}
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default ProfileDoctor