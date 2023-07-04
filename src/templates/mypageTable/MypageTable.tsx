import colorSet from "src/styles/colorSet";
import Text from "src/atoms/text/Text";
import Font from "src/styles/font";

interface MypageTableProps {
    title?: string;
    article?:string;
    date?:string;
  }
  
const articles = [
    { article: "23학번 과잠 구매 희망자 조사", date: "2023.02.14." },
    { article: "공연동아리 지대로 연극 'ART'", date: "2023.02.13." },
    { article: "2023년도 WING 신규 부원 모집!", date: "2023.02.13." },
    { article: "23년도 인포팀 신규 부원 모집", date: "2023.02.13." }
  ];

const MypageTable: React.FC<MypageTableProps> = ({ title }) => {


    return (
    <div style={{ borderRadius:'10px', boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)' }}>
        <table style={{ width: '700px', borderCollapse: 'separate', borderSpacing: '0', borderRadius: '10px' }}>
        <tbody>
            <tr style={{ height: '70px', backgroundColor: colorSet.primary }}>
            <td style={{ width: '75%', borderTopLeftRadius: '10px' }}>
                <Text size={'1.3rem'} color={colorSet.colorless} font={Font.Medium} style={{paddingLeft:'20px'}} >
                {title}
                </Text>
            </td>
            <td style={{ width: '25%', borderTopRightRadius: '10px'}}>
            </td>
            </tr>

            {articles.map((articleObj, index) => {
                const isLastRow = index === articles.length - 1;
                const borderBottomRadius = isLastRow ? '10px' : '0px';
            return(
            <tr key={index} style={{ height: '70px' }}>
              <td style={{ borderBottomLeftRadius: borderBottomRadius,borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '75%' }}>
                <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{ paddingLeft: '20px' }}>
                  {articleObj.article}
                </Text>
              </td>
              <td style={{ borderBottomRightRadius: borderBottomRadius, borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                <Text size={'1.2rem'} color={colorSet.text} font={Font.Regular} style={{ padding: '10px', textAlign: 'center' }}>
                  {articleObj.date}
                </Text>
              </td>
            </tr>
            );
            })}

        </tbody>
        </table>
    </div>
    );
};

export default MypageTable;