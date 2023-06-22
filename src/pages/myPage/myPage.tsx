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
                        <Text size="40px" color={colorSet.text} font={Font.Medium} style={{paddingTop:'20px',justifyContent: 'center', alignItems: 'center', letterSpacing: '10px'}}>
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
                        <Text size="30px" color={colorSet.text} font={Font.Bold} style={{paddingTop:'20px',justifyContent: 'center', alignItems: 'center'}}>
                            심수연
                        </Text>
                        </div>


                    <div style={{ display:'flex',  flexDirection:'column'}}>
                        <Text size="25px" color={colorSet.secondaryText} font={Font.Regular} style={{paddingTop:'20px',justifyContent: 'left', alignItems: 'left', borderBottom: '1px solid #ccc'}}>
                            20210000
                        </Text>
                        <Text size="25px" color={colorSet.secondaryText} font={Font.Regular} style={{paddingTop:'20px',justifyContent: 'left', alignItems: 'left', borderBottom: '1px solid #ccc'}}>
                            010-1234-1234
                        </Text>
                        <Text size="25px" color={colorSet.secondaryText} font={Font.Regular} style={{paddingTop:'20px',justifyContent: 'left', alignItems: 'left', borderBottom: '1px solid #ccc', textAlign: 'left'}}>
                            infoteam@gm.gist.ac.kr
                        </Text>
                    </div>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '1px', background: '#ccc', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}></div>
                    </div>

                    <div style={{ flex: 3,  display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                

                <div>
                    <table style={{ borderCollapse: 'collapse', width: '500px', margin:'10px', borderRadius:'10px' }}>
                  <tbody>
                  <tr style={{ height: '50px', backgroundColor: colorSet.primary, borderRadius: '10px 0 0 10px'}}>
                  <td style={{ borderBottom: '1px solid #ccc', width:'75%' }}>
                        내가 게시한 공지 목록</td>
                        <td style={{borderBottom: '1px solid #ccc', width: '25%' }}>
                        </td>
                    </tr>
                    <tr>
                      <td style={{ borderBottom: '1px solid #ccc', width:'75%' }}>
                        20210000</td>
                        <td style={{borderBottom: '1px solid #ccc', width: '25%' }}>
                        날짜
                        </td>
                    </tr>
                    
                    <tr>
                      <td style={{ borderBottom: '1px solid #ccc' }}>
                        010-1234-1234</td>
                    </tr>
                    <tr>
                      <td style={{ borderBottom: '1px solid #ccc' }}>
                        infoteam@gm.gist.ac.kr</td>
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