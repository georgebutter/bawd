import * as React from "react";

export const CloseIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <polygon points="27.314 7.515 24.485 4.686 16 13.172 7.515 4.686 4.686 7.515 13.172 16 4.686 24.485 7.515 27.314 16 18.828 24.485 27.314 27.314 24.485 18.828 16 27.314 7.515" fill="currentColor"></polygon>
  </IconWrapper>
);
export const BoardIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M7,1H25a1,1,0,0,1,1,1V4H6V2A1,1,0,0,1,7,1Z" fill="currentColor" />
    <path d="M30,6H2A1,1,0,0,0,1,7V30a1,1,0,0,0,1,1H30a1,1,0,0,0,1-1V7A1,1,0,0,0,30,6ZM6,13.5A2.5,2.5,0,1,1,8.5,16,2.5,2.5,0,0,1,6,13.5ZM26.882,24.472A1,1,0,0,1,26,25H9a1,1,0,0,1-.633-1.774l11-9a1.017,1.017,0,0,1,.781-.215,1,1,0,0,1,.684.434l6,9A1,1,0,0,1,26.882,24.472Z" fill="currentColor" />
  </IconWrapper>
);
export const PostIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M29 1H3a2 2 0 00-2 2v26a2 2 0 002 2h26a2 2 0 002-2V3a2 2 0 00-2-2zM12.5 7A2.5 2.5 0 1110 9.5 2.5 2.5 0 0112.5 7zM6 24l4-7 4 3 6-7 6 11z" fill="currentColor" />
  </IconWrapper>
);
export const ContrastIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path fill="currentColor" d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zM2 16C2 8.6 7.7 2.6 15 2.1V30c-7.3-.6-13-6.6-13-14z" />
  </IconWrapper>
);
export const EyeIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path
      fill="currentColor" d="M31.376,14.2C29.239,11.433,23.463,5,16,5,8.442,5,2.717,11.438.608,14.2a2.936,2.936,0,0,0,.011,3.592C2.758,20.563,8.536,27,16,27s13.239-6.433,15.374-9.195A2.935,2.935,0,0,0,31.376,14.2ZM16,22a6,6,0,1,1,6-6A6,6,0,0,1,16,22Z"
    />
  </IconWrapper>
);
export const NoEyeIcon: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <path d="M31.381,14.2A30.77,30.77,0,0,0,26.8,9.439L21.8,14.447a5.982,5.982,0,0,1-7.343,7.343l-4.019,4.019A14.274,14.274,0,0,0,16.005,27c7.463,0,13.24-6.433,15.374-9.195A2.932,2.932,0,0,0,31.381,14.2Z" fill="currentColor"/>
    <path d="M30.707,1.293a1,1,0,0,0-1.414,0L23.461,7.125A15.124,15.124,0,0,0,16.005,5C8.448,5,2.722,11.438.614,14.2a2.933,2.933,0,0,0,.011,3.592,29.706,29.706,0,0,0,6.186,5.981L1.293,29.293a1,1,0,1,0,1.414,1.414l28-28A1,1,0,0,0,30.707,1.293ZM10.005,16a5.974,5.974,0,0,1,9.459-4.878l-8.336,8.336A5.939,5.939,0,0,1,10.005,16Z" fill="currentColor"/>
  </IconWrapper>
);

export const Logo: React.FC<IProps> = ({ size }) => (
  <IconWrapper size={size}>
    <defs><linearGradient x1="87.624%" y1="19.258%" x2="3.38%" y2="73.062%" id="a"><stop stop-color="#A5AFFB" offset="0%"/><stop stop-color="#6979F8" offset="100%"/></linearGradient></defs><path d="M26 0a1 1 0 01.953.697l.03.115 5 25.999a1 1 0 01-1.935.494l-.03-.117L29.02 22H12.057l.925 4.811a1 1 0 01-1.935.49l-.029-.113-5-26a1 1 0 01.855-1.18L7 0h19zM4.78 5.34L7.406 19H3.127l-1.163 4.263a1 1 0 01-1.953-.412l.024-.114L4.78 5.34zM12 5l2.478 11.516 5.218.116a7.57 7.57 0 001.604-.12c.48-.093.874-.276 1.184-.55.275-.237.484-.533.625-.888.227-.534.268-1.142.12-1.824a3.812 3.812 0 00-.811-1.697c-.4-.47-.916-.82-1.551-1.046.343-.189.587-.401.734-.636.262-.42.318-.98.166-1.684a3.707 3.707 0 00-.909-1.77c-.76-.81-1.848-1.24-3.264-1.293L12 5zm3.684 6.496l2.867.064c.501.016.903.09 1.206.221.543.235.879.652 1.008 1.251.152.708 0 1.182-.457 1.42-.252.13-.63.189-1.136.177l-2.828-.062-.66-3.07zm-.957-4.445l2.532.056c.557.013 1.028.083 1.413.21.454.182.739.54.854 1.077.104.484.02.818-.255 1.001-.274.183-.664.27-1.17.258l-2.827-.063-.547-2.539z" fill="url(#a)" fill-rule="nonzero"/>
  </IconWrapper>
)

const IconWrapper: React.FC<IProps> = ({ children, size = 32 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32">
    {children}
  </svg>
);


interface IProps {
  size?: number;
}
