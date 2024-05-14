import React from "react";
import Clinics from "../components/clinics/Clinics";
import Doctors from "../components/doctors/Doctors";
import Saved from "../components/saved/Saved";
import AboutClinic from "../components/about-clinic/About-clinic";
import Pharmacies from "../components/Pharmacies/Pharmacies";
import Login from "../components/login/login";
import AboutDoctor from "../components/about-doctor/About-doctor";
import AboutPharma from "../components/about-pharma/AboutPharma";
import Register from "../components/register/Register";
import RegisterHospital from "../components/register/register-hospital/RegisterHospital";
import RegisterDoctor from "../components/register/register-doctor/RegisterDoctor";
import RegisterPharmacies from "../components/register/register-pharmacies/RegisterPharmacies";
import Service from "../components/services/Services";
import ProfileDoctor from "../components/profile/profile-doctor/ProfileDoctor";
import ProfileHospital from "../components/profile/hospital-profile/HospitalProfile";


export const publicRoutes = [
    {
        path: "/",
        element: <Clinics/>
    },
    {
        path: "/doctors",
        element: <Doctors/>
    },
    {
        path: "/pharmacies",
        element: <Pharmacies/>
    },
    {
        path: "/saved",
        element: <Saved/>
    },
    {
        path: "/about-clinic",
        element: <AboutClinic/>
    },
    {
        path: "/about-doctor",
        element: <AboutDoctor/>
    },
    {
        path: "/about-pharmacies",
        element: <AboutPharma/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/register-hospital",
        element: <RegisterHospital/>
    },
    {
        path: "/register-doctor",
        element: <RegisterDoctor/>
    },
    {
        path: "/register-pharmacies",
        element: <RegisterPharmacies/>
    },
    {
        path: "/services",
        element: <Service/>
    },
];

export const allRoutes = [
    ...publicRoutes,
    {
        path: "/profile-doctor",
        element: <ProfileDoctor/>
    },
    {
        path: "/profile-hospital",
        element: <ProfileHospital/>
    },
    {
        path: "/profile-pharmacy",
        element: <ProfileDoctor/>
    },
];


