import React from 'react';
import ASXLogoLight from 'src/assets/images/asx-logo-dark.svg';
import ASXLogoDark from 'src/assets/images/asx-logo-light.svg';
import { FaGoogle, FaTwitterSquare, FaYahoo, FaBold, FaHospitalSymbol, FaBuilding } from 'react-icons/fa';

export const contentMap = {
    asx: {
        type: 'svg',
        srcLight: ASXLogoLight,
        srcDark: ASXLogoDark,
        name: 'asx',
        alt: 'asx-logo'
    },
    twitter: {
        type: 'icon',
        src: <FaTwitterSquare />,
        name: 'twitter',
        alt: 'companies-twitter'
    },
    company: {
        type: 'icon',
        src: <FaBuilding />,
        name: 'company-url',
        alt: 'company'
    },
    yahoo: {
        type: 'icon',
        src: <FaYahoo />,
        name: 'yahoo',
        alt: 'yahoo-finance'
    },
    google: {
        type: 'icon',
        src: <FaGoogle />,
        name: 'google',
        alt: 'google-finance'
    },
    bloomberg:  {
        type: 'icon',
        src: <FaBold />,
        name: 'bloomberg',
        alt: 'bloomberg'
    },
    hotcopper: {
        type: 'icon',
        src: <FaHospitalSymbol />,
        name: 'hotcopper',
        alt: 'hotcopper'
    }

}

export default contentMap;