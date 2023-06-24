import Navbar from "src/templates/navbar/Navbar";
import colorSet from "src/styles/colorSet";
import Area from "src/atoms/containers/area/Area";
import Footer from "src/templates/footer/Footer";
import Content from "src/atoms/containers/content/Content";
import Text from "src/atoms/text/Text";
import Font from "src/styles/font";
const myPage = () => {

    return (
    <>
            <Area>
            <Navbar background-color={colorSet.primary}></Navbar>
            
            <Content>

            <div style={{ display: 'flex' }}>
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column',position: 'relative', margin:'10px'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Text size="30px" color={colorSet.text} font={Font.Medium} style={{paddingTop:'20px',justifyContent: 'center', alignItems: 'center', letterSpacing: '5px'}}>
                            INFO
                        </Text>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center'                        
                            }}>

                            <img src="https://picsum.photos/2000/3000" alt="이미지 설명" 
                            style={{ width: '200px', height: '200px', borderRadius: '50%', marginTop: '20px',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                            }} />

                        </div>
                        <div style={{height: '50px'}}></div>
                        <Text size="25px" color={colorSet.text} font={Font.Bold} style={{paddingTop:'20px',justifyContent: 'center', alignItems: 'center'}}>
                            이정우
                        </Text>
                        </div>


                    <div style={{ display:'flex',  flexDirection:'column'}}>
                        <Text size="20px" color={colorSet.secondaryText} font={Font.Regular} 
                        style={{paddingTop:'20px',
                        justifyContent: 'left', alignItems: 'left', borderBottom: '1px solid #ccc', 
                        lineHeight:'50px',
                        marginLeft:'50px',marginRight:'50px'
                        , paddingLeft:'20px'}}>
                            20210000
                        </Text>
                        <Text size="20px" color={colorSet.secondaryText} font={Font.Regular} 
                        style={{paddingTop:'20px',
                        justifyContent: 'left', 
                        alignItems: 'left', 
                        borderBottom: '1px solid #ccc', 
                        lineHeight:'50px',
                        marginLeft:'50px',marginRight:'50px'
                        , paddingLeft:'20px'}}>
                            010-1234-1234
                        </Text>
                        <Text size="20px" color={colorSet.secondaryText} font={Font.Regular} 
                        style={{paddingTop:'20px',justifyContent: 'left', 
                        alignItems: 'left', borderBottom: '1px solid #ccc', 
                        textAlign: 'left', lineHeight:'50px'
                        , marginLeft:'50px',marginRight:'50px'
                        , paddingLeft:'20px'}}>
                            infoteam@gm.gist.ac.kr
                        </Text>
                    </div>
                    <div style={{ paddingLeft: '40px', paddingTop: '40px', margin:'20px' }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '1px', background: '#ccc', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}></div>
                    </div>
                    </div>
                    <div style={{ flex: 3,  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
                

                <div>

                    <table style={{ width: '500px', margin: '10px', borderCollapse: 'separate', borderSpacing: '0', borderRadius: '10px' }}>
                    <tbody>
                        <tr style={{ height: '50px', backgroundColor: colorSet.primary }}>
                        <td style={{ width: '75%', borderTopLeftRadius: '10px' }}>
                            <Text size={'17px'} color={colorSet.colorless} font={Font.Medium} style={{paddingLeft:'20px'}} >
                            내가 게시한 공지 목록
                            </Text>
                        </td>
                        <td style={{ width: '25%', borderTopRightRadius: '15px'}}>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                        <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '75%' }}>
                            <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            23학번 과잠 구매 희망자 조사
                            </Text>
                        </td>
                        <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.14.
                            </Text>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                        <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            공연동아리 지대로 연극 'ART'
                            </Text>
                        </td>
                        <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.13.
                            </Text>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                        <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            2023년도 WING 신규 부원 모집!
                            </Text>
                        </td>
                        <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.13.
                            </Text>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }} >
                        <td style={{ borderBottomLeftRadius: '10px', borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            23년도 인포팀 신규 부원 모집
                            </Text>
                        </td>
                        <td style={{ borderBottomRightRadius: '10px', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.13.
                            </Text>
                        </td>
                        </tr>
                    </tbody>
                    </table>

                </div>

                <div>

                    <table style={{ width: '500px', margin: '10px', borderCollapse: 'separate', borderSpacing: '0', borderRadius: '10px' }}>
                    <tbody>
                        <tr style={{ height: '50px', backgroundColor: colorSet.primary }}>
                        <td style={{ width: '75%', borderTopLeftRadius: '10px' }}>
                            <Text size={'17px'} color={colorSet.colorless} font={Font.Medium} style={{paddingLeft:'20px'}} >
                            내 관심 게시물 목록
                            </Text>
                        </td>
                        <td style={{ width: '25%', borderTopRightRadius: '15px'}}>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                        <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '75%' }}>
                            <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            23학번 과잠 구매 희망자 조사
                            </Text>
                        </td>
                        <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.14.
                            </Text>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                        <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            공연동아리 지대로 연극 'ART'
                            </Text>
                        </td>
                        <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.13.
                            </Text>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                        <td style={{ borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            2023년도 WING 신규 부원 모집!
                            </Text>
                        </td>
                        <td style={{ borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.13.
                            </Text>
                        </td>
                        </tr>
                        <tr style={{ height: '50px' }} >
                        <td style={{ borderBottomLeftRadius: '10px', borderLeft: '1px solid #ccc', borderBottom: '1px solid #ccc' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{paddingLeft:'20px'}}>
                            23년도 인포팀 신규 부원 모집
                            </Text>
                        </td>
                        <td style={{ borderBottomRightRadius: '10px', borderRight: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '25%' }}>
                        <Text size={'15px'} color={colorSet.text} font={Font.Regular} style={{padding:'10px', textAlign:'center'}}>
                            2023.02.13.
                            </Text>
                        </td>
                        </tr>
                    </tbody>
                    </table>

                </div>
            </div>
        </div>


            </Content>
            <Footer></Footer>
            </Area>
    </>
    );
};

export default myPage;