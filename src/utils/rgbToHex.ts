// any를 썼는데, param으로 들어가는 color의 type이 string | number | Rgb이어서 그랬음 -> color.js는 굉장히 ts에 맞지 않는 라이브러리인듯
const rgbToHex = (rgb: any[]): string => {
  return (
    "#" +
    rgb
      .map((value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

export default rgbToHex;
