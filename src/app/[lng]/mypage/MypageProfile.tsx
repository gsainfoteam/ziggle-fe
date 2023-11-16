interface IconProps {
  size?: string;
  color?: string;
}

interface MypageProfileProps {
  name?: string;
  id?: string;
  phone?: string;
  email?: string;
  logout?: string;
  quit?: string;
}

const Account = ({ size, color }: IconProps) => {
  const sizeClass = size ? size : 'h-6 w-6';

  const colorClass = color ? `text-${color}` : 'text-gray-400';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-current ${sizeClass} ${colorClass}`}
      viewBox="0 0 24 24"
    >
      <g>
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
      </g>
    </svg>
  );
};

interface UnderLinedTextProps {
  text: string;
}

const UnderLinedText = ({ text }: UnderLinedTextProps) => {
  return (
    <div className="text-regular m-5 border-b border-gray-500 w-50 text-secondayText">
      {text}
    </div>
  );
};

export default async function MypageProfile({
  name,
  id,
  phone,
  email,
  logout = '',
  quit = '',
}: MypageProfileProps) {
  return (
    <div>
      <div className="flex flex-col items-center mr-20">
        <div className="text-4xl font-medium m-10">INFO</div>
        <div className="flex flex-col items-center">
          <Account size="300px" color="gray-400"></Account>
          <h3 className="text-3xl md:text-2.8xl font-bold p-10 flex justify-center items-center">
            {name}
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-8 text-secondayText text-xl border-b border-gray-300 pb-10 pl-2 pr-10 w-full mb-8">
            {id}
          </div>
          <div className="h-8 text-secondayText text-xl border-b border-gray-300 pb-10 pl-2 pr-10 w-full mb-0">
            {email}
          </div>
        </div>
        <div className="flex flex-row items-center ">
          <UnderLinedText text={logout}></UnderLinedText>
          <UnderLinedText text={quit}></UnderLinedText>
        </div>
      </div>
    </div>
  );
}
