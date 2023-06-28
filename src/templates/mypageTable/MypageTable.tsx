import colorSet from "src/styles/colorSet";
import Text from "src/atoms/text/Text";
import Font from "src/styles/font";

interface MypageTableProps {
    title?: string;
  }
  

const MypageTable: React.FC<MypageTableProps> = ({ title }) => {


    return (
        <table style={{ width: '700px',margin: '10px', borderCollapse: 'separate', borderSpacing: '0', borderRadius: '10px' }}>
        <tbody>
            <tr style={{ height: '70px', backgroundColor: colorSet.primary }}>
            <td style={{ width: '75%', borderTopLeftRadius: '10px' }}>
                <Text size={'1.3rem'} color={colorSet.colorless} font={Font.Medium} style={{paddingLeft:'20px'}} >
                {title}
                </Text>
            </td>
            <td style={{ width: '25%', borderTopRightRadius: '15px'}}>
            </td>
            </tr>
            <tr style={{ height: '70px' }}>
            <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '75%' }}>
                <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                23학번 과잠 구매 희망자 조사
                </Text>
            </td>
            <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
            <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                2023.02.14.
                </Text>
            </td>
            </tr>
            <tr style={{ height: '70px' }}>
            <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                공연동아리 지대로 연극 'ART'
                </Text>
            </td>
            <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
            <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                2023.02.13.
                </Text>
            </td>
            </tr>
            <tr style={{ height: '70px' }}>
            <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                2023년도 WING 신규 부원 모집!
                </Text>
            </td>
            <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
            <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                2023.02.13.
                </Text>
            </td>
            </tr>
            <tr style={{ height: '70px' }} >
            <td style={{ borderBottomLeftRadius: '10px', borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
            <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                23년도 인포팀 신규 부원 모집
                </Text>
            </td>
            <td style={{ borderBottomRightRadius: '10px', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
            <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                2023.02.13.
                </Text>
            </td>
            </tr>
        </tbody>
        </table>

    );
};

export default MypageTable;