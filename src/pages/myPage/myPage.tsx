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
                    <div style={{ flex: 2, display: 'flex', flexDirection: 'column'}}>
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
                    </div>

                    <div style={{ flex: 3, backgroundColor: '#e0e0e0' }}>
                

                <div>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ borderBottom: '1px solid #ccc' }}>
                        20210000</td>
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