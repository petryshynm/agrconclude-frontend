import { AboutUs } from "../../layouts/AboutUs"
import { Account } from "../../layouts/Account/Account"
import { Contacts } from "../../layouts/Contacts"
import { Faq } from "../../layouts/FAQ"
import { Main } from "../../layouts/Main"
import { NotFound } from "../../layouts/NotFound"

import {ReactComponent as AccountIcon} from '../../resources/icons/account.svg';

import { Paths } from "./paths"

export const defaultRoutes = [
    {
        path:Paths.HOME , 
        render: <Main/>
    },
    {
        path:Paths.ABOUT_US , 
        render: <AboutUs/>
    },
    {
        path:Paths.CONTACTS , 
        render: <Contacts/>
    },
    {
        path:Paths.FAQ , 
        render: <Faq/>
    },
    {
        path: Paths.REST , 
        render: <NotFound/>
    }
]

export const protectedRoutes = [
    {
        path: Paths.ACCOUNT,
        render: <Account/>
    },
]

export const navLinks = [
    {
        label: "Account",
        path: Paths.ACCOUNT.replace("/:tab", "/profile"),
        isProtected: true,
        icon: <AccountIcon/>,
    },
    {
        label: "About us",
        path: Paths.ABOUT_US,
        isProtected: false,
    },
    {
        label: "Contacts",
        path: Paths.CONTACTS,
        isProtected: false,
    },
    {
        label: "F.A.Q.",
        path: Paths.FAQ,
        isProtected: false,
    },
]