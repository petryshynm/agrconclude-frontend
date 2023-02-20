import { Account } from "../../layouts/account"
import { Paths } from "./paths"

export const protectedRoutes = [
    {
        path: Paths.ACCOUNT,
        render: <Account/>
    },
]

export const navLinks = [
    {
        label: "Account",
        path: Paths.ACCOUNT,
        isProtected: true,
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