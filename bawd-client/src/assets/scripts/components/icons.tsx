import * as React from "react";

export const CloseIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <polygon points="27.314 7.515 24.485 4.686 16 13.172 7.515 4.686 4.686 7.515 13.172 16 4.686 24.485 7.515 27.314 16 18.828 24.485 27.314 27.314 24.485 18.828 16 27.314 7.515" fill="currentColor"></polygon>
  </IconWrapper>
);
export const BoardIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M7,1H25a1,1,0,0,1,1,1V4H6V2A1,1,0,0,1,7,1Z" fill="currentColor"></path>
    <path d="M30,6H2A1,1,0,0,0,1,7V30a1,1,0,0,0,1,1H30a1,1,0,0,0,1-1V7A1,1,0,0,0,30,6ZM6,13.5A2.5,2.5,0,1,1,8.5,16,2.5,2.5,0,0,1,6,13.5ZM26.882,24.472A1,1,0,0,1,26,25H9a1,1,0,0,1-.633-1.774l11-9a1.017,1.017,0,0,1,.781-.215,1,1,0,0,1,.684.434l6,9A1,1,0,0,1,26.882,24.472Z" fill="currentColor"></path>
  </IconWrapper>
);
export const PostIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M29 1H3a2 2 0 00-2 2v26a2 2 0 002 2h26a2 2 0 002-2V3a2 2 0 00-2-2zM12.5 7A2.5 2.5 0 1110 9.5 2.5 2.5 0 0112.5 7zM6 24l4-7 4 3 6-7 6 11z" fill="currentColor"/>
  </IconWrapper>
);

const IconWrapper: React.FC<IProps> = ({ children, size = 32 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
    {children}
  </svg>
);

interface IProps {
  size?: number;
}
