import * as React from "react";

export const Close: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <polygon points="27.314 7.515 24.485 4.686 16 13.172 7.515 4.686 4.686 7.515 13.172 16 4.686 24.485 7.515 27.314 16 18.828 24.485 27.314 27.314 24.485 18.828 16 27.314 7.515" fill="currentColor"></polygon>
  </IconWrapper>
);
export const Board: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M7,1H25a1,1,0,0,1,1,1V4H6V2A1,1,0,0,1,7,1Z" fill="currentColor" />
    <path d="M30,6H2A1,1,0,0,0,1,7V30a1,1,0,0,0,1,1H30a1,1,0,0,0,1-1V7A1,1,0,0,0,30,6ZM6,13.5A2.5,2.5,0,1,1,8.5,16,2.5,2.5,0,0,1,6,13.5ZM26.882,24.472A1,1,0,0,1,26,25H9a1,1,0,0,1-.633-1.774l11-9a1.017,1.017,0,0,1,.781-.215,1,1,0,0,1,.684.434l6,9A1,1,0,0,1,26.882,24.472Z" fill="currentColor" />
  </IconWrapper>
);
export const Post: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M29 1H3a2 2 0 00-2 2v26a2 2 0 002 2h26a2 2 0 002-2V3a2 2 0 00-2-2zM12.5 7A2.5 2.5 0 1110 9.5 2.5 2.5 0 0112.5 7zM6 24l4-7 4 3 6-7 6 11z" fill="currentColor" />
  </IconWrapper>
);
export const Contrast: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path fill="currentColor" d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zM2 16C2 8.6 7.7 2.6 15 2.1V30c-7.3-.6-13-6.6-13-14z" />
  </IconWrapper>
);
export const Eye: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path
      fill="currentColor" d="M31.376,14.2C29.239,11.433,23.463,5,16,5,8.442,5,2.717,11.438.608,14.2a2.936,2.936,0,0,0,.011,3.592C2.758,20.563,8.536,27,16,27s13.239-6.433,15.374-9.195A2.935,2.935,0,0,0,31.376,14.2ZM16,22a6,6,0,1,1,6-6A6,6,0,0,1,16,22Z"
    />
  </IconWrapper>
);
export const NoEye: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M31.381,14.2A30.77,30.77,0,0,0,26.8,9.439L21.8,14.447a5.982,5.982,0,0,1-7.343,7.343l-4.019,4.019A14.274,14.274,0,0,0,16.005,27c7.463,0,13.24-6.433,15.374-9.195A2.932,2.932,0,0,0,31.381,14.2Z" fill="currentColor"/>
    <path d="M30.707,1.293a1,1,0,0,0-1.414,0L23.461,7.125A15.124,15.124,0,0,0,16.005,5C8.448,5,2.722,11.438.614,14.2a2.933,2.933,0,0,0,.011,3.592,29.706,29.706,0,0,0,6.186,5.981L1.293,29.293a1,1,0,1,0,1.414,1.414l28-28A1,1,0,0,0,30.707,1.293ZM10.005,16a5.974,5.974,0,0,1,9.459-4.878l-8.336,8.336A5.939,5.939,0,0,1,10.005,16Z" fill="currentColor"/>
  </IconWrapper>
);
export const Comment: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <g fill="currentColor">
      <path d="M30.544 15.601C28.824 21.553 22.292 26 14.5 26c-.923 0-1.856-.08-2.787-.211C13.859 27.778 17.057 29 20.5 29c1.098 0 2.194-.126 3.266-.374L29 31.767v-5.698c1.939-1.659 3-3.798 3-6.068 0-1.574-.506-3.076-1.456-4.4z"/>
      <path d="M3 27.618v-8.11c-1.938-2.001-3-4.474-3-7.008C0 6.159 6.505 1 14.5 1S29 6.159 29 12.5 22.495 24 14.5 24a18.2 18.2 0 01-3.552-.355L3 27.618z"/>
    </g>
  </IconWrapper>
);
export const Menu: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <g fill="currentColor">
      <path d="M30 15H2c-.6 0-1 .4-1 1s.4 1 1 1h28c.6 0 1-.4 1-1s-.4-1-1-1z"/>
      <path d="M30 6H2c-.6 0-1 .4-1 1s.4 1 1 1h28c.6 0 1-.4 1-1s-.4-1-1-1zM30 24H2c-.6 0-1 .4-1 1s.4 1 1 1h28c.6 0 1-.4 1-1s-.4-1-1-1z"/>
    </g>
  </IconWrapper>
);
export const Home: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M31 15a1 1 0 01-.625-.219L16 3.28 1.625 14.781a1 1 0 11-1.25-1.562l15-12a1 1 0 011.25 0l15 12A1 1 0 0131 15z" fill="currentColor"/>
    <path d="M16 5.842l-12 9.6V30a1 1 0 001 1h8v-8h6v8h8a1 1 0 001-1V15.442z" fill="currentColor"/>
  </IconWrapper>
);
export const Link: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <g fill="currentColor">
      <path d="M17.619 10.138l-2.241 2.24c-.06.061-.1.13-.158.193a4.958 4.958 0 012.816 1.393 5.008 5.008 0 010 7.072l-5.5 5.5a5 5 0 01-7.072-7.072l2.385-2.385a10.054 10.054 0 01-.23-4.011l-4.276 4.275a8 8 0 0011.314 11.314l5.5-5.5a7.99 7.99 0 00-2.538-13.019z"/>
      <path d="M17.343 3.343l-5.5 5.5a7.99 7.99 0 002.538 13.019l2.241-2.24c.06-.061.107-.129.162-.193a4.953 4.953 0 01-2.82-1.393 5.008 5.008 0 010-7.072l5.5-5.5a5 5 0 017.072 7.072l-2.383 2.382a10.086 10.086 0 01.241 4l4.263-4.263A8 8 0 0017.343 3.343z"/>
    </g>
  </IconWrapper>
);
export const Play: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path
      d="M28 2H4a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V6a4 4 0 00-4-4zM11 23V9l12.06 7z"
      fill="currentColor"
    />
  </IconWrapper>
);

export const Plus: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path fill="currentColor" d="M9 17h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1h-6V9c0-.6-.4-1-1-1s-1 .4-1 1v6H9c-.6 0-1 .4-1 1s.4 1 1 1z"/>
  </IconWrapper>
);

export const ArrowUp: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path
      d="M18.947 15.21l9.832 9.74a4.103 4.103 0 010 5.84A4.188 4.188 0 0125.832 32H6.168C3.866 32 2 30.151 2 27.87a4.11 4.11 0 011.22-2.92l9.833-9.74a4.196 4.196 0 015.894 0z"
      fill="currentColor"
    />
  </IconWrapper>
);

export const ArrowDown: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path
      d="M18.947 16.79l9.832-9.74a4.103 4.103 0 000-5.84A4.188 4.188 0 0025.832 0H6.168C3.866 0 2 1.849 2 4.13a4.11 4.11 0 001.22 2.92l9.833 9.74a4.196 4.196 0 005.894 0z"
      fill="currentColor"
    />
  </IconWrapper>
);

export const Logo: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <defs>
      <linearGradient x1="87.624%" y1="19.258%" x2="3.38%" y2="73.062%" id="a">
      <stop stopColor="#A5AFFB" offset="0%"/>
      <stop stopColor="#6979F8" offset="100%"/>
      </linearGradient>
    </defs>
    <path d="M26 0a1 1 0 01.953.697l.03.115 5 25.999a1 1 0 01-1.935.494l-.03-.117L29.02 22H12.057l.925 4.811a1 1 0 01-1.935.49l-.029-.113-5-26a1 1 0 01.855-1.18L7 0h19zM4.78 5.34L7.406 19H3.127l-1.163 4.263a1 1 0 01-1.953-.412l.024-.114L4.78 5.34zM12 5l2.478 11.516 5.218.116a7.57 7.57 0 001.604-.12c.48-.093.874-.276 1.184-.55.275-.237.484-.533.625-.888.227-.534.268-1.142.12-1.824a3.812 3.812 0 00-.811-1.697c-.4-.47-.916-.82-1.551-1.046.343-.189.587-.401.734-.636.262-.42.318-.98.166-1.684a3.707 3.707 0 00-.909-1.77c-.76-.81-1.848-1.24-3.264-1.293L12 5zm3.684 6.496l2.867.064c.501.016.903.09 1.206.221.543.235.879.652 1.008 1.251.152.708 0 1.182-.457 1.42-.252.13-.63.189-1.136.177l-2.828-.062-.66-3.07zm-.957-4.445l2.532.056c.557.013 1.028.083 1.413.21.454.182.739.54.854 1.077.104.484.02.818-.255 1.001-.274.183-.664.27-1.17.258l-2.827-.063-.547-2.539z" fill="url(#a)" fillRule="nonzero"/>
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
