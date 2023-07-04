import Area from "src/atoms/containers/area/Area";
import Content from "src/atoms/containers/content/Content";
import MypageTable from "src/templates/mypageTable/MypageTable";
import MypageProfile from "src/templates/mypageProfile/MypageProfile";
import MypageSeperate from "src/templates/mypageSeperate/MypageSeperate";


const myPage = () => {

    return (
    <>
            <Area>
                
                    <Content style={{width:'1000px',height:'1000px', display:'flex',flexDirection:'column', alignItems:'center'}}>

                        <div style={{ display: 'flex',height:'1000px', alignItems:'center'}}>
                            <div style={{ flex: 2, display: 'flex', flexDirection: 'column',position: 'relative', margin:'10px'}}>

                                    <MypageProfile name="이정우" id="20220000" phone="010-1234-1234" email="infoteam@gm.gist.ac.kr"/>

                                    <MypageSeperate/>
                            </div>

                            <div style={{ flex: 3,  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
                                <div style={{padding:'50px'}}>
                                    <MypageTable title="내가 게시한 공지 목록"/>
                                    </div>

                                    <div>
                                    <MypageTable title="내 관심 게시물 목록"/>

                                </div>
                            </div>
                        </div>

                </Content>
    </Area>
    </>
    );
};

export default myPage;