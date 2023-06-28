import colorSet from "src/styles/colorSet";
import Text from "src/atoms/text/Text";
import Font from "src/styles/font";


interface MypageProfileProps {
    name?:string;
    id?:string;
    phone?:string;
    email?:string;
}
const MypageProfile: React.FC<MypageProfileProps> = ({ 
    name,
    id,
    phone,
    email }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text size="2.5rem" color={colorSet.text} font={Font.Medium} style={{ padding: '20px', justifyContent: 'center', alignItems: 'center', letterSpacing: '5px' }}>
          INFO
        </Text>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://picsum.photos/2000/3000" alt="이미지 설명" style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '20px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.4)' }} />
        </div>
        <div style={{ height: '50px' }}></div>
        <Text size="2.0rem" color={colorSet.text} font={Font.Bold} style={{ padding: '20px', justifyContent: 'center', alignItems: 'center' }}>
          {name}
        </Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
        <Text size="1.4rem" color={colorSet.secondaryText} font={Font.Regular} style={{ paddingTop: '20px', justifyContent: 'left', alignItems: 'left', borderBottom: '1px solid #ccc', lineHeight: '50px', marginLeft: '50px', marginRight: '50px', paddingLeft: '20px' }}>
          {id}
        </Text>
        <Text size="1.4rem" color={colorSet.secondaryText} font={Font.Regular} style={{ paddingTop: '20px', justifyContent: 'left', alignItems: 'left', borderBottom: '1px solid #ccc', lineHeight: '50px', marginLeft: '50px', marginRight: '50px', paddingLeft: '20px' }}>
          {phone}
        </Text>
        <Text size="1.2rem" color={colorSet.secondaryText} font={Font.Regular} style={{ paddingTop: '20px', justifyContent: 'left', alignItems: 'left', borderBottom: '1px solid #ccc', textAlign: 'left', lineHeight: '50px', marginLeft: '50px', marginRight: '50px', paddingLeft: '20px' }}>
          {email}
        </Text>
      </div>
    </div>
  );
};

export default MypageProfile;
