"use client";
import React, { useEffect } from "react";
import style from "./page.module.css";
import { motion } from "framer-motion";
import { fetchData } from "../../../actions/fetch";

const AuthLayout = ({ children }: any) => {
    return (
        <motion.div
            className={`login_container w-full min-h-screen flex justify-center items-center px-4  ${style.main_back_color}`}
        >
            {children}
        </motion.div>
    );
};

export default AuthLayout;
