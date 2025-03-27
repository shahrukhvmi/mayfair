import defaultlogo from "/public/assets/images/mayfair-weightloss-clinic-logo.svg";
import logo2 from "/public/assets/images/lsc-logo.png";
import { usePage } from "@inertiajs/react";
export default function ApplicationLogo(props) {
    const { activeCompany } = usePage().props;
    let logo;
    if (activeCompany) {
        logo = activeCompany.compnaysetting?.logoimage;
    }
    return <img src={logo ? logo : defaultlogo} {...props} />;
}
