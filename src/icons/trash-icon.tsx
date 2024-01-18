import React, {ReactElement} from "react";

export function TrashIcon({width = 23, height = 23, fill = "none"}): ReactElement {
    return (
        <svg width={width} height={height} viewBox="0 0 23 23" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_290_273)">
                <path d="M3.83301 6.7085H19.1663" stroke="#5D5D5D" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
                <path d="M9.58301 10.5415V16.2915" stroke="#5D5D5D" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round"/>
                <path d="M13.417 10.5415V16.2915" stroke="#5D5D5D" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round"/>
                <path
                    d="M4.79199 6.7085L5.75033 18.2085C5.75033 18.7168 5.95226 19.2043 6.3117 19.5638C6.67115 19.9232 7.15866 20.1252 7.66699 20.1252H15.3337C15.842 20.1252 16.3295 19.9232 16.6889 19.5638C17.0484 19.2043 17.2503 18.7168 17.2503 18.2085L18.2087 6.7085"
                    stroke="#5D5D5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M8.625 6.70833V3.83333C8.625 3.57917 8.72597 3.33541 8.90569 3.15569C9.08541 2.97597 9.32917 2.875 9.58333 2.875H13.4167C13.6708 2.875 13.9146 2.97597 14.0943 3.15569C14.274 3.33541 14.375 3.57917 14.375 3.83333V6.70833"
                    stroke="#5D5D5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_290_273">
                    <rect width="23" height="23" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    );
}